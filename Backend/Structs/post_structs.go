package Structs

// Comment - The struct for the Comment type.
type Comment struct {
	Id        int
	Title     string
	Author    string
	Content   string
	DateAdded int
}

// Recommendation - The struct for the Recommendation type.
type Recommendation struct {
	Id        int
	Author    string
	Content   string
	Rating    float64
	Timestamp int
}
