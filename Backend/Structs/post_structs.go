package Structs

// Recommendation - The struct for the Recommendation type.
type Recommendation struct {
	Id                int     `bson:"Id"`
	Author            string  `bson:"Author"`
	Relationship      string  `bson:"Relationship"`
	PositionAtTheTime string  `bson:"PositionAtTheTime"`
	Content           string  `bson:"Content"`
	Rating            float64 `bson:"Rating"`
	Timestamp         int     `bson:"Timestamp"`
	ProjectId         int     `bson:"Timestamp"`
}

type MongoOptions struct {
	sort    string
	filters []string
}
