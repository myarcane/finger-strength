package github

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)


func ReadFile(owner, repo, path string) (string, string, error) {
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/contents/%s", owner, repo, path)

	resp, err := http.Get(url)
	if err != nil {
		return "", "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", "", fmt.Errorf("request failed with status code %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", "", err
	}

	type FileResponse struct {
		Content string `json:"content"`
		SHA     string `json:"sha"`
	}

	var fileResp FileResponse
	err = json.Unmarshal(body, &fileResp)
	if err != nil {
		return "", "", err
	}

	// Decode the base64-encoded content
	content, err := base64.StdEncoding.DecodeString(fileResp.Content)
	if err != nil {
		return "", "", err
	}

	return string(content), fileResp.SHA, nil
}
