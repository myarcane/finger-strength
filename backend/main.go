package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/myarcane/finger-strength/handlers"
)

func CorsMiddleware(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set headers to allow cross-origin requests
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Call the next handler in the chain
		next.ServeHTTP(w, r)
	})
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("./dist")))

	http.Handle("/api/ws", http.HandlerFunc(handlers.GetLoadCellOutput))
	http.Handle("/api/post-finger-assessment", CorsMiddleware(http.HandlerFunc(handlers.PostFingerAssessment)))

	log.Println("Listening on :8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal(err)
		fmt.Sprintf("", err)
	}
}
