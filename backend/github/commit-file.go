package github

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type CreateFileRequest struct {
	Message string `json:"message"`
	Content string `json:"content"`
	SHA	 string `json:"sha,omitempty"`
}

type CreateFileResponse struct {
	Commit struct {
		Sha string `json:"sha"`
	} `json:"commit"`
}

func CommitFile(token, owner, repo, branch, filePath, commitMessage, fileContent, sha string) error {
		// Create the API request URL
		url := fmt.Sprintf("https://api.github.com/repos/%s/%s/contents/%s", owner, repo, filePath)
	
		// Encode the file content
		encodedContent := base64.StdEncoding.EncodeToString([]byte(fileContent))
	
		// Create the request body
		requestBody := CreateFileRequest{
			Message: commitMessage,
			Content: encodedContent,
			SHA: sha,
		}
		jsonBody, err := json.Marshal(requestBody)
		if err != nil {
			return err
		}
	
		// Create the HTTP client and request
		client := &http.Client{}
		req, err := http.NewRequest("PUT", url, bytes.NewBuffer(jsonBody))
		if err != nil {
			return err
		}
	
		// Set the required headers
		req.Header.Add("Authorization", "token "+token)
		req.Header.Add("Accept", "application/vnd.github.v3+json")
		req.Header.Add("Content-Type", "application/json")
	
		// Send the request
		resp, err := client.Do(req)
		if err != nil || resp.StatusCode != http.StatusOK {
			return err
		}
		defer resp.Body.Close()
	
		// Read the response body
		respBody, err := io.ReadAll(resp.Body)
		if err != nil {
			return err
		}

		fmt.Println("resp status:", resp.StatusCode)
	
		// Parse the response
		var response CreateFileResponse
		err = json.Unmarshal(respBody, &response)
		if err != nil {
			return err
		}
	
		// Print the commit SHA
		fmt.Println("Commit SHA:", response.Commit.Sha)
	
		return nil
	}
	