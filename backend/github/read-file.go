package github

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type fileResponse struct {
	Content string `json:"content"`
	SHA     string `json:"sha"`
}

type ReadResponse struct {
	Content string
	Sha     string
	Err     error
	Status  int
}

func ReadFile(owner, repo, path string) ReadResponse {
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/contents/%s", owner, repo, path)

	resp, err := http.Get(url)
	if err != nil {
		return ReadResponse{Content: "", Sha: "", Err: err, Status: resp.StatusCode}
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return ReadResponse{Content: "", Sha: "", Err: fmt.Errorf("request failed with status code %d", resp.StatusCode), Status: resp.StatusCode}
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return ReadResponse{Content: "", Sha: "", Err: err, Status: resp.StatusCode}
	}

	var fileResp fileResponse
	err = json.Unmarshal(body, &fileResp)
	if err != nil {
		return ReadResponse{Content: "", Sha: "", Err: err, Status: resp.StatusCode}
	}

	// Decode the base64-encoded content
	content, err := base64.StdEncoding.DecodeString(fileResp.Content)
	if err != nil {
		return ReadResponse{Content: "", Sha: "", Err: err, Status: resp.StatusCode}
	}

	return ReadResponse{Content: string(content), Sha: fileResp.SHA, Err: nil, Status: resp.StatusCode}
}
