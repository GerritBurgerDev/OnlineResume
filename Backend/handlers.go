package main

import (
	"Backend/Helpers"
	"Backend/Structs"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"gopkg.in/validator.v2"
	"net/http"
	"strconv"
	"strings"
)

// GetAllRecommendations is a GET method
// returns an array of Posts.
func GetAllRecommendations(writer http.ResponseWriter, request *http.Request) {
	opt := bson.M{
		"filters": []bson.M{
			{
				"state": bson.M{
					"$ne": "removed",
				},
			},
		},
	}

	results := Helpers.GetFromCollection(client, "OnlineResume", "Recommendations", opt)

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

func GetRecommendationForProject(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	projectId, _ := strconv.Atoi(vars["projectId"])

	opt := bson.M{
		"filters": []bson.M{
			{
				"projectId": projectId,
			},
			{
				"state": bson.M{
					"$eq": "posted",
				},
			},
		},
	}

	result := Helpers.GetFromCollection(client, "OnlineResume", "Recommendations", opt)

	if result == nil {
		res := []Structs.Recommendation{}
		json.NewEncoder(writer).Encode(res)

		return
	}

	json.NewEncoder(writer).Encode(result)
}

// AddRecommendation is a POST method
// TODO: Body
// returns a status code and message
func AddRecommendation(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	var recommendation Structs.Recommendation
	json.NewDecoder(request.Body).Decode(&recommendation)

	if errs := validator.Validate(recommendation); errs != nil {
		writer.WriteHeader(400)
		json.NewEncoder(writer).Encode(bson.M{"Message": "Bad Request", "Errors": errs})
		return
	}

	optLastItem := bson.M{
		"sorting": []bson.M{
			{"id": -1},
		},
	}

	optRecommendation := bson.M{
		"sorting": []bson.M{
			{"id": -1},
		},
		"filters": []bson.M{
			{"id": recommendation.Id},
		},
	}

	lastItemBson := Helpers.GetSingleFromCollection(client, "OnlineResume", "Recommendations", optLastItem)
	var lastItem Structs.Recommendation
	bsonBytes, _ := bson.Marshal(lastItemBson)
	bson.Unmarshal(bsonBytes, &lastItem)

	result := Helpers.GetSingleFromCollection(client, "OnlineResume", "Recommendations", optRecommendation)

	recommendation.State = "pending"

	if result["StatusCode"] == 404 {
		recommendation.Id = lastItem.Id + 1
		res := Helpers.AddSingleDocument(client, "OnlineResume", "Recommendations", recommendation)
		json.NewEncoder(writer).Encode(res)

		return
	} else {
		update := bson.D{{
			"$set",
			bson.M{
				"author":            recommendation.Author,
				"relationship":      recommendation.Relationship,
				"content":           recommendation.Content,
				"positionAtTheTime": recommendation.PositionAtTheTime,
				"rating":            recommendation.Rating,
			},
		}}

		res := Helpers.UpsertSingleDocument(client, "OnlineResume", "Recommendations", update, optRecommendation)

		json.NewEncoder(writer).Encode(res)
		return
	}

	json.NewEncoder(writer).Encode(result)
}

func UpdateRecommendationState(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	var recommendation Structs.Recommendation
	json.NewDecoder(request.Body).Decode(&recommendation)

	optRecommendation := bson.M{
		"filters": []bson.M{
			{"id": recommendation.Id},
		},
	}

	update := bson.D{{
		"$set",
		bson.M{
			"state": recommendation.State,
		},
	}}

	res := Helpers.UpsertSingleDocument(client, "OnlineResume", "Recommendations", update, optRecommendation)

	json.NewEncoder(writer).Encode(res)
}

func RemoveRecommendation(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id, _ := strconv.Atoi(vars["id"])

	optRecommendation := bson.M{
		"filters": []bson.M{
			{"id": id},
		},
	}

	result := Helpers.GetSingleFromCollection(client, "OnlineResume", "Recommendations", optRecommendation)

	if result["StatusCode"] == 404 {
		writer.WriteHeader(404)
		json.NewEncoder(writer).Encode(bson.M{"Message": "Recommendation not found!"})

		return
	} else {
		update := bson.D{{
			"$set",
			bson.M{
				"state": "removed",
			},
		}}

		res := Helpers.UpsertSingleDocument(client, "OnlineResume", "Recommendations", update, optRecommendation)

		json.NewEncoder(writer).Encode(res)
		return
	}
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

	result := Helpers.GetProjectsForSkill(client, skill)

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

	var skills map[string]Structs.TechSkill
	bsonBytes, _ := bson.Marshal(result[0]["techSkills"])
	bson.Unmarshal(bsonBytes, &skills)

	for _, skill := range skills {
		projectsResult := Helpers.GetProjectsForSkill(client, skill.Name)

		projects := make([]string, 0)
		for _, proj := range projectsResult {
			project := fmt.Sprintf("%v", proj["name"])
			projects = append(projects, project)
		}

		skill.Projects = projects
		skills[strings.ToLower(skill.Name)] = skill
	}

	result[0]["techSkills"] = skills

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
			},
		}}

		res := Helpers.UpsertSingleDocument(client, "OnlineResume", "Users", update, optUser)
		res["isAdmin"] = result["isAdmin"]

		json.NewEncoder(writer).Encode(res)

		return
	}
}

// RootCall is a GET method
// returns a string.
func RootCall(writer http.ResponseWriter, request *http.Request) {
	json.NewEncoder(writer).Encode("Nothing to see here!")
}
