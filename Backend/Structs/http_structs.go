package Structs

// Error is the struct for errors being thrown by the API
type Error struct {
	Message    string `bson:"Message"`
	StatusCode int    `json:"StatusCode"`
}
