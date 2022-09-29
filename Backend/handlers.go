package main

import (
	"Backend/Helpers"
	"Backend/Structs"
	"context"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"strconv"
)

// GetAllRecommendations is a GET method
// returns an array of Posts.
func GetAllRecommendations(writer http.ResponseWriter, request *http.Request) {
	results := Helpers.GetFromCollection(client, "OnlineResume", "Recommendations")

	json.NewEncoder(writer).Encode(results)
}

// GetRecommendation is a GET method
// Vars include {id int}
// returns Recommendation
func GetRecommendation(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id, _ := strconv.Atoi(vars["id"])

	opt := bson.M{
		"filters": []bson.M{
			{"id": id},
		},
	}

	result := Helpers.GetFromCollection(client, "OnlineResume", "Recommendations", opt)

	json.NewEncoder(writer).Encode(result)
}

// AddRecommendation is a POST method
// TODO: Body
// returns a status code and message
func AddRecommendation(writer http.ResponseWriter, request *http.Request) {
	collection := client.Database("OnlineResume").Collection("Recommendations")

	writer.Header().Set("Content-Type", "application/json")
	var recommendation Structs.Recommendation
	json.NewDecoder(request.Body).Decode(&recommendation)

	filters := options.FindOne().SetSort(bson.D{{"Id", -1}})
	var lastItem Structs.Recommendation
	collection.FindOne(context.TODO(), bson.D{{}}, filters).Decode(&lastItem)

	recommendation.Id = lastItem.Id + 1
	result := Helpers.AddSingleDocument(client, "OnlineResume", "Recommendations", recommendation)

	json.NewEncoder(writer).Encode(result)
}

// GetProject is a GET method
// Vars include {id int}
// returns Project
func GetProject(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id, _ := strconv.Atoi(vars["id"])

	opt := bson.M{
		"filters": []bson.M{
			{"id": id},
		},
	}

	result := Helpers.GetFromCollection(client, "OnlineResume", "Projects", opt)

	json.NewEncoder(writer).Encode(result)
}

// GetProjectsForSkill is a GET method
// Vars include {skill: string}
// returns all projects that used the given skill
func GetProjectsForSkill(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	skill, _ := vars["skill"]

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

	result := Helpers.GetFromCollection(client, "OnlineResume", "Projects", opt)

	json.NewEncoder(writer).Encode(result)
}

// GetAllProjects is a GET method
// returns an array of Projects.
func GetAllProjects(writer http.ResponseWriter, request *http.Request) {
	opt := bson.M{
		"sorting": []bson.M{
			{"endDate": -1},
			{"id": -1},
		},
	}

	results := Helpers.GetFromCollection(client, "OnlineResume", "Projects", opt)

	json.NewEncoder(writer).Encode(results)
}

// GetCommonData is a GET meethod
// Common data consists of tech skills, my biography and current employment.
// returns global data object
func GetCommonData(writer http.ResponseWriter, request *http.Request) {
	result := Helpers.GetFromCollection(client, "OnlineResume", "GlobalData")

	json.NewEncoder(writer).Encode(result[0])
}

// CreateUser is a POSt meethod
// Creates a user if they don't exist
// returns global data object
func CreateUser(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	var user Structs.User
	json.NewDecoder(request.Body).Decode(&user)

	optLastItem := bson.M{
		"sorting": []bson.M{
			{"endDate": -1},
			{"id": -1},
		},
	}

	optUser := bson.M{
		"sorting": []bson.M{
			{"endDate": -1},
			{"id": -1},
		},
		"filters": []bson.M{
			{"email": user.Email},
		},
	}

	lastItemBson := Helpers.GetSingleFromCollection(client, "OnlineResume", "Users", optLastItem)
	var lastItem Structs.User
	bsonBytes, _ := bson.Marshal(lastItemBson)
	bson.Unmarshal(bsonBytes, &lastItem)

	result := Helpers.GetSingleFromCollection(client, "OnlineResume", "Users", optUser)

	if result["StatusCode"] == 404 {
		user.Id = lastItem.Id + 1
		res := Helpers.AddSingleDocument(client, "OnlineResume", "Users", user)
		json.NewEncoder(writer).Encode(res)

		return
	} else {
		update := bson.D{{
			"$set",
			bson.M{
				"accessToken": user.AccessToken,
				"imageUrl":    user.ImageUrl,
				"isAdmin":     user.IsAdmin,
			},
		}}

		res := Helpers.UpsertSingleDocument(client, "OnlineResume", "Users", update, optUser)
		json.NewEncoder(writer).Encode(res)

		return
	}

	json.NewEncoder(writer).Encode(result)
}

// RootCall is a GET method
// returns a string.
func RootCall(writer http.ResponseWriter, request *http.Request) {
	json.NewEncoder(writer).Encode("Nothing to see here!")
}
