package main

import (
	"context"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
	"net/http"
	"os"
	"time"
)

var client *mongo.Client
var ctx context.Context

// handleRequests listens for http requests and redirect to the function
// responsible for handling this route/request.
func handleRequests() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", RootCall).Methods("GET")
	router.HandleFunc("/common-data", GetCommonData).Methods("GET")
	router.HandleFunc("/recommendations", GetAllRecommendations).Methods("GET")
	router.HandleFunc("/recommendations", AddRecommendation).Methods("POST")
	router.HandleFunc("/recommendation/{id}", GetRecommendation).Methods("GET")

	cors := handlers.CORS(
		handlers.AllowedOrigins([]string{os.Getenv("ORIGIN_ALLOWED")}),
		handlers.AllowedMethods([]string{"GET", "DELETE", "POST", "PUT", "OPTIONS"}),
		handlers.AllowCredentials(),
	)

	router.Use(cors)

	log.Fatal(http.ListenAndServe(":8081", router))
}

func connectDatabase() (*mongo.Client, context.Context) {
	// TODO: use secrets for the connection details.
	uri := "mongodb+srv://test:test@onlineresume.arzk0xs.mongodb.net/?retryWrites=true&w=majority"

	getClient, err := mongo.NewClient(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ = context.WithTimeout(context.TODO(), 3*time.Second)
	err = getClient.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	return getClient, ctx
}

func setupEnvVariables() {
	// TODO: Update once app is hosted
	os.Setenv("ORIGIN_ALLOWED", "http://127.0.0.1:5173")
}

// main calls handleRequests which listens and routes all requests.
func main() {
	setupEnvVariables()

	client, ctx = connectDatabase()
	defer client.Disconnect(ctx)

	err := client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	handleRequests()
}
