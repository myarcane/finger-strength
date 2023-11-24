package models

type FingerAssessment struct {
	Date string `json:"date"`
	User string `json:"user"`
	Test string `json:"test"` 
	Hand string `json:"hand"`
	GripType string `json:"gripType"`
	UserUnit string `json:"userUnit"`
	UserWeight string `json:"userWeight"`
	MaxFingerStrength int `json:"maxFingerStrength"`
	AvgFingerStrength int `json:"avgFingerStrength"`
	Plot []struct {
		Weight int `json:"weight"`
		Time int `json:"time"`
	} `json:"plot"`
}