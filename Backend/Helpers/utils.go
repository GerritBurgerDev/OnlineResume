package Helpers

import (
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetProjectsForSkill(client *mongo.Client, skill string) []bson.M {
	opt := bson.M{
		"filters": []bson.M{
			{
				"stack": bson.M{
					"$in": []primitive.Regex{
						{
							Pattern: fmt.Sprintf("^%s$", skill),
							Options: "i",
						},
					},
				},
			},
		},
	}

	result := GetFromCollection(client, "OnlineResume", "Projects", opt)

	return result
}
