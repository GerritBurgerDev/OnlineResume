package main

import (
	"context"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
	"net/http"
	"time"
)

var client *mongo.Client
var ctx context.Context

// handleRequests listens for http requests and redirect to the function
// responsible for handling this route/request.
func handleRequests() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", RootCall).Methods("GET")
	router.HandleFunc("/signin", CreateUser).Methods("POST")
	router.HandleFunc("/common-data", GetCommonData).Methods("GET")
	router.HandleFunc("/projects", GetAllProjects).Methods("GET")
	router.HandleFunc("/projects/{skill}", GetProjectsForSkill).Methods("GET")
	router.HandleFunc("/project/{id}", GetProject).Methods("GET")
	router.HandleFunc("/recommendations", GetAllRecommendations).Methods("GET")
	router.HandleFunc("/recommendations", AddRecommendation).Methods("POST")
	router.HandleFunc("/recommendation/{id}", RemoveRecommendation).Methods("DELETE")
	router.HandleFunc("/recommendation/{id}", GetRecommendation).Methods("GET")

	cors := cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://127.0.0.1:5173",
			"http://localhost:5173",
			"https://env-prod.d1gm648slbbgl6.amplifyapp.com",
		},
		AllowedMethods: []string{
			http.MethodPost,
			http.MethodDelete,
			http.MethodPut,
			http.MethodGet,
		},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})

	//router.Use(cors)
	handler := cors.Handler(router)

	log.Fatal(http.ListenAndServe(":8081", handler))
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

// main calls handleRequests which listens and routes all requests.
func main() {
	client, ctx = connectDatabase()
	defer client.Disconnect(ctx)

	err := client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	handleRequests()
}
