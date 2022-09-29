package Structs

// Recommendation - The struct for the Recommendation type.
type Recommendation struct {
	Id                int64   `bson:"id"`
	Author            string  `bson:"author"`
	Relationship      string  `bson:"relationship"`
	PositionAtTheTime string  `bson:"positionAtTheTime"`
	Content           string  `bson:"content"`
	Rating            float64 `bson:"rating"`
	Timestamp         int64   `bson:"timestamp"`
	ProjectId         int64   `bson:"projectId"`
}

type User struct {
	Id          int64  `bson:"id"`
	Email       string `bson:"email"`
	Name        string `bson:"name"`
	ImageUrl    string `bson:"imageUrl"`
	AccessToken string `bson:"accessToken"`
	IsAdmin     bool   `bson:"isAdmin"`
}

type MongoOptions struct {
	sort    string
	filters []string
}
