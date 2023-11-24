package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/myarcane/finger-strength/handlers"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./dist")))

	http.HandleFunc("/api/ws", handlers.GetLoadCellOutput)
	http.HandleFunc("/api/post-finger-assessment", handlers.PostFingerAssessment)

	log.Println("Listening on :8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal(err)
		fmt.Sprintf("", err)
	}
}
