package Helpers

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// GetEntireCollection returns all the documents in a collection
// client - the global mongoDB client
// dbName - the name of the database where the collection lives
// coll - the name of the collection you are trying to grab
func GetEntireCollection(client *mongo.Client, dbName string, coll string) []bson.M {
	collection := client.Database(dbName).Collection(coll)

	cursor, err := collection.Find(context.TODO(), bson.D{{}})
	if err != nil {
		panic(err)
	}

	var results []bson.M
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}

	return results
}

// GetSingleDocument returns a single the documents in a collection given a specific key and value
// client - the global mongoDB client
// dbName - the name of the database where the collection lives
// coll - the name of the collection you are trying to grab
// key - the key string to lookup
// value - the associated value for the given key
func GetSingleDocument(client *mongo.Client, dbName string, coll string, key string, value any) bson.M {
	collection := client.Database(dbName).Collection(coll)

	var result bson.M
	err := collection.FindOne(context.TODO(), bson.D{{key, value}}).Decode(&result)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return bson.M{"Error": "Not found"}
		}
		panic(err)
	}

	return result
}
