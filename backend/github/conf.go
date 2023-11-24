package github

import "os"

var Owner string = "myarcane"
var Repo string = "finger-strength"
var Branch string = "main"
var Token string = os.Getenv("GITHUB_TOKEN")
