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
	Id                int     `bson:"Id"`
	Author            string  `bson:"Author"`
	Relationship      string  `bson:"Relationship"`
	PositionAtTheTime string  `bson:"PositionAtTheTime"`
	Content           string  `bson:"Content"`
	Rating            float64 `bson:"Rating"`
	Timestamp         int     `bson:"Timestamp"`
}
