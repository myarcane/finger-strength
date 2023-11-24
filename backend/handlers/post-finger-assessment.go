package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/myarcane/finger-strength/github"
	"github.com/myarcane/finger-strength/models"
)


type commitResponse = struct {
userId string
message string
status int
err error
}

func returnHttpError(w http.ResponseWriter, err string, status int) {
	fmt.Println(err)
	http.Error(w, err, status)
}

// Commits a new assessment JSON file
func commitNewAssessmentJSON(r *http.Request, filePath string) commitResponse {
	var payload models.FingerAssessment
	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		return commitResponse{userId: "", message: "Error decoding paylod assessment:", status: http.StatusBadRequest, err: err}
	}

	payloadString, err := json.Marshal(payload)	

	if err != nil {
		return commitResponse{userId: "", message: "Error marshalling paylod assessment:", status: http.StatusInternalServerError, err: err}
    }

	commitMessage := fmt.Sprintf("Commit finger strength assessment %s", filePath)

	err = github.CommitFile(github.Token, github.Owner, github.Repo, github.Branch, filePath, commitMessage, string(payloadString), "")

	if err != nil {
		return commitResponse{userId: "", message: "Error commiting assessment on github:", status: http.StatusServiceUnavailable, err: err}
	}

	return commitResponse{userId: payload.User, message: fmt.Sprintf("Success commiting assessment on github for user: %s", payload.User), status: http.StatusOK, err: nil}
}

// Commits the muted users JSON file
func commitNewUsersJSON(date string, id string, filePath string) commitResponse {
	body, sha, err := github.ReadFile(github.Owner,github.Repo, "data/users.json")

	if err != nil {
		return commitResponse{userId: "", message: fmt.Sprintf("Error while reading github users file: %s", err.Error()), status: http.StatusServiceUnavailable, err: err}
	}
	
	var users map[string]interface{}
	json.Unmarshal([]byte(body), &users)

	if (users[id] == nil) {
		users[id] = []interface{}{map[string]string{"date": date, "assessment": filePath},}
	} else {
		users[id] = append(users[id].([]interface{}), map[string]string{"date": id, "assessment": filePath})
	}
     
	newUsersJson, err := json.Marshal(users)

	if err != nil {
       return commitResponse{userId: "", message: fmt.Sprintf("Error marshalling users JSON: %s", err.Error()), status: http.StatusInternalServerError, err: err}
    }

	err = github.CommitFile(github.Token, github.Owner, github.Repo, github.Branch, "data/users.json", "Update users JSON", string(newUsersJson), sha)

	if err != nil {
		return commitResponse{userId: "", message: fmt.Sprintf("Error commiting users JSON: %s", err.Error()), status: http.StatusServiceUnavailable, err: err}
	}

	return commitResponse{userId: id, message: fmt.Sprintf("Success commiting users JSON for user: %s", id), status: http.StatusOK, err: nil}
}

// PostFingerAssessment handles POST requests to /api/post-finger-assessment
func PostFingerAssessment(w http.ResponseWriter, r *http.Request) {
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		returnHttpError(w, "Only POST requests are allowed", http.StatusMethodNotAllowed)
		return
	}

	iso8601Time := time.Now().Format(time.RFC3339)
	filePath := fmt.Sprintf("data/%s.json", iso8601Time)

	// Commiting new assessment JSON file
	newAssessmentResponse := commitNewAssessmentJSON(r, filePath)

	if newAssessmentResponse.err != nil {
		returnHttpError(w, fmt.Sprintf("%s %s", newAssessmentResponse.message, newAssessmentResponse.err.Error()), newAssessmentResponse.status)
		return
	}

	fmt.Println(newAssessmentResponse.message)

	// Commiting users JSON file
	newUsersResponse := commitNewUsersJSON(iso8601Time, newAssessmentResponse.userId, filePath)
  

	if newUsersResponse.err != nil {
		returnHttpError(w, fmt.Sprintf("%s %s", newUsersResponse.message, newUsersResponse.err.Error()), newUsersResponse.status)
	}

	fmt.Println(newUsersResponse.message)

	// Send a response
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("POST request received successfully"))
}