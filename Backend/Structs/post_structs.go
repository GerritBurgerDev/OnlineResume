package Structs

// Recommendation - The struct for the Recommendation type.
type Recommendation struct {
	Id                int64   `bson:"id"`
	Author            string  `bson:"author" validate:"nonzero"`
	AuthorId          string  `bson:"authorId" validate:"nonzero"`
	Relationship      string  `bson:"relationship" validate:"nonzero"`
	PositionAtTheTime string  `bson:"positionAtTheTime" validate:"nonzero"`
	Content           string  `bson:"content" validate:"nonzero"`
	Rating            float64 `bson:"rating" validate:"nonzero"`
	Timestamp         int64   `bson:"timestamp" validate:"nonzero"`
	ProjectId         int64   `bson:"projectId" validate:"nonzero"`
	State             string  `bson:"state"`
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
