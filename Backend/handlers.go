package main

import (
	"Backend/Helpers"
	"Backend/Structs"
	"context"
	"encoding/json"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"net/http"
	"strconv"
)

// GetAllRecommendations is a GET method
// returns an array of Posts.
func GetAllRecommendations(writer http.ResponseWriter, request *http.Request) {
	results := Helpers.GetEntireCollection(client, "OnlineResume", "Recommendations")

	json.NewEncoder(writer).Encode(results)
}

// GetRecommendation is a GET method
// Vars include {id int}
// returns Recommendation
func GetRecommendation(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id, _ := strconv.Atoi(vars["id"])

	result := Helpers.GetSingleDocument(client, "OnlineResume", "Recommendations", "Id", id)

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
	result := Helpers.AddSingleDocument(collection, recommendation)

	json.NewEncoder(writer).Encode(result)
}

func GetCommonData(writer http.ResponseWriter, request *http.Request) {
	result := Helpers.GetEntireCollection(client, "OnlineResume", "GlobalData")

	json.NewEncoder(writer).Encode(result[0])
}

// RootCall is a GET method
// returns a string.
func RootCall(writer http.ResponseWriter, request *http.Request) {
	json.NewEncoder(writer).Encode("Nothing to see here!")
}
