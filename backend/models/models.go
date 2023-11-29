package models

type FingerAssessment struct {
	User           string  `json:"user"`
	Test           string  `json:"test"`
	Hand           string  `json:"hand"`
	Grip           string  `json:"grip"`
	BodyWeightUnit string  `json:"bodyWeightUnit"`
	BodyWeight     int     `json:"bodyWeight"`
	MaxMVC         float64 `json:"maxMVC"`
	Plot           []struct {
		Weight float64 `json:"weight"`
		Id     string  `json:"id"`
	} `json:"plot"`
}
