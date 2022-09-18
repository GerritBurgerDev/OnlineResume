package main

import (
	"Backend/Helpers"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

// GetAllComments is a GET method
// returns an array of Posts.
func GetAllComments(writer http.ResponseWriter, request *http.Request) {
	results := Helpers.GetEntireCollection(client, "OnlineResume", "Comments")

	json.NewEncoder(writer).Encode(results)
}

// GetComment is a GET method
// Vars include {id int}
// returns Comment
func GetComment(writer http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id, _ := strconv.Atoi(vars["id"])

	result := Helpers.GetSingleDocument(client, "OnlineResume", "Comments", "Id", id)

	json.NewEncoder(writer).Encode(result)
}

// RootCall is a GET method
// returns a string.
func RootCall(writer http.ResponseWriter, request *http.Request) {
	json.NewEncoder(writer).Encode("Nothing to see here!")
}
