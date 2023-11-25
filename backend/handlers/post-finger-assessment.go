package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/myarcane/finger-strength/github"
	"github.com/myarcane/finger-strength/models"
)

type commitResponse struct {
	UserID  string
	Message string
	Status  int
	Err     error
}

func returnHTTPError(w http.ResponseWriter, err string, status int) {
	fmt.Println(err)
	http.Error(w, err, status)
}

func commitNewAssessmentJSON(r *http.Request, filePath string) commitResponse {
	var payload models.FingerAssessment
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		return commitResponse{UserID: "", Message: "Error decoding payload assessment", Status: http.StatusBadRequest, Err: err}
	}

	payloadString, err := json.Marshal(payload)
	if err != nil {
		return commitResponse{UserID: "", Message: "Error marshalling payload assessment", Status: http.StatusInternalServerError, Err: err}
	}

	commitMessage := fmt.Sprintf("Commit finger strength assessment %s", filePath)

	if err := github.CommitFile(github.Token, github.Owner, github.Repo, github.Branch, filePath, commitMessage, string(payloadString), ""); err != nil {
		return commitResponse{UserID: "", Message: fmt.Sprintf("Error committing assessment on GitHub: %s", err.Error()), Status: http.StatusServiceUnavailable, Err: err}
	}

	return commitResponse{UserID: payload.User, Message: fmt.Sprintf("Success committing assessment on GitHub for user: %s", payload.User), Status: http.StatusOK, Err: nil}
}

func commitNewUsersJSON(date, id, filePath string) commitResponse {
	readResp := github.ReadFile(github.Owner, github.Repo, "data/users.json")

	if readResp.Err != nil && readResp.Status != http.StatusNotFound {
		return commitResponse{UserID: "", Message: fmt.Sprintf("Error reading GitHub users file: %s", readResp.Err.Error()), Status: http.StatusServiceUnavailable, Err: readResp.Err}
	}

	var users map[string]interface{}

	if readResp.Status == http.StatusOK {
		json.Unmarshal([]byte(readResp.Content), &users)
	} else {
		users = make(map[string]interface{})
	}

	if users[id] == nil {
		users[id] = []interface{}{map[string]string{"date": date, "assessment": filePath}}
	} else {
		users[id] = append(users[id].([]interface{}), map[string]string{"date": date, "assessment": filePath})
	}

	newUsersJSON, err := json.Marshal(users)

	if err != nil {
		return commitResponse{UserID: "", Message: fmt.Sprintf("Error marshalling users JSON: %s", err.Error()), Status: http.StatusInternalServerError, Err: err}
	}

	err = github.CommitFile(github.Token, github.Owner, github.Repo, github.Branch, "data/users.json", "Update users JSON", string(newUsersJSON), readResp.Sha)

	if err != nil {
		return commitResponse{UserID: "", Message: fmt.Sprintf("Error committing users JSON: %s", err.Error()), Status: http.StatusServiceUnavailable, Err: err}
	}

	return commitResponse{UserID: id, Message: fmt.Sprintf("Success committing users JSON for user: %s", id), Status: http.StatusOK, Err: nil}
}

func PostFingerAssessment(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		returnHTTPError(w, "Only POST requests are allowed", http.StatusMethodNotAllowed)
		return
	}

	iso8601Time := time.Now().Format(time.RFC3339)
	filePath := fmt.Sprintf("data/%s.json", iso8601Time)

	newAssessmentResponse := commitNewAssessmentJSON(r, filePath)

	if newAssessmentResponse.Err != nil {
		returnHTTPError(w, newAssessmentResponse.Message, newAssessmentResponse.Status)
		return
	}

	fmt.Println(newAssessmentResponse.Message)

	newUsersResponse := commitNewUsersJSON(iso8601Time, newAssessmentResponse.UserID, filePath)

	if newUsersResponse.Err != nil {
		returnHTTPError(w, newUsersResponse.Message, newUsersResponse.Status)
		return
	}

	fmt.Println(newUsersResponse.Message)

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("POST request received successfully"))
}
