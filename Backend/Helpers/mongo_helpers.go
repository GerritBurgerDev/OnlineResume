package Helpers

import (
	"Backend/Interfaces"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// GetFromCollection returns all the documents in a collection that satisfy the options given
// client - the global mongoDB client
// dbName - the name of the database where the collection lives
// coll - the name of the collection you are trying to grab
// findOptions - the mongo options (sorting, filtering)
// returns an array of documents
func GetFromCollection[T bson.M](client *mongo.Client, dbName string, coll string, findOptions ...T) []bson.M {
	var sort bson.D
	filter := bson.D{{}}

	if findOptions != nil {
		if sorting, ok := findOptions[0]["sorting"]; ok {
			for _, val := range sorting.([]bson.M) {
				var testBson bson.E
				for k, v := range val {
					testBson = bson.E{k, v}
				}
				sort = append(sort, testBson)
			}
		}

		if filters, ok := findOptions[0]["filters"]; ok {
			for _, val := range filters.([]bson.M) {
				var filterBson bson.E
				for k, v := range val {
					filterBson = bson.E{k, v}
				}
				filter = append(filter, filterBson)
			}
		}
	}

	var opts *options.FindOptions
	if len(sort) != 0 {
		opts = options.Find().SetSort(sort)
	}

	collection := client.Database(dbName).Collection(coll)

	cursor, err := collection.Find(context.TODO(), filter, opts)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return []bson.M{{
				"Message":    "The document you are looking for could not be found",
				"Error":      err,
				"StatusCode": 404,
			}}
		}
		panic(err)
	}

	var results []bson.M
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}

	return results
}

// GetSingleFromCollection returns one documents in a collection that satisfy the options given
// client - the global mongoDB client
// dbName - the name of the database where the collection lives
// coll - the name of the collection you are trying to grab
// findOptions - the mongo options (sorting, filtering)
// returns a document
func GetSingleFromCollection[T bson.M](client *mongo.Client, dbName string, coll string, findOptions ...T) bson.M {
	var sort bson.D
	filter := bson.D{{}}

	if findOptions != nil {
		if sorting, ok := findOptions[0]["sorting"]; ok {
			for _, val := range sorting.([]bson.M) {
				var testBson bson.E
				for k, v := range val {
					testBson = bson.E{k, v}
				}
				sort = append(sort, testBson)
			}
		}

		if filters, ok := findOptions[0]["filters"]; ok {
			for _, val := range filters.([]bson.M) {
				var filterBson bson.E
				for k, v := range val {
					filterBson = bson.E{k, v}
				}
				filter = append(filter, filterBson)
			}
		}
	}

	var opts *options.FindOneOptions
	if len(sort) != 0 {
		opts = options.FindOne().SetSort(sort)
	}

	collection := client.Database(dbName).Collection(coll)

	var result bson.M
	err := collection.FindOne(context.TODO(), filter, opts).Decode(&result)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return bson.M{
				"Message":    "The document you are looking for could not be found",
				"Error":      err,
				"StatusCode": 404,
			}
		}
		panic(err)
	}

	return result
}

// AddSingleDocument inserts a single document into a collection in a specified database
// client - the global mongoDB client
// dbName - the name of the database where the collection lives
// coll - the name of the collection you are trying to grab
// doc - the document being added into the collection
// returns status object containing a StatusCode and a Message (possibly even an Error)
func AddSingleDocument[Document Interfaces.Document](client *mongo.Client, dbName string, coll string, doc Document) bson.M {
	collection := client.Database(dbName).Collection(coll)

	_, err := collection.InsertOne(context.TODO(), doc)
	if err != nil {
		return bson.M{
			"Message":    "Could not create your document, please try again.",
			"Error":      err,
			"StatusCode": 500,
		}
	}

	return bson.M{"Message": "Successfully added document", "StatusCode": 200}
}

func UpsertSingleDocument(client *mongo.Client, dbName string, coll string, update bson.D, filterOptions ...bson.M) bson.M {
	filter := bson.D{{}}

	if filterOptions != nil {
		if filters, ok := filterOptions[0]["filters"]; ok {
			for _, val := range filters.([]bson.M) {
				var filterBson bson.E
				for k, v := range val {
					filterBson = bson.E{k, v}
				}
				filter = append(filter, filterBson)
			}
		}
	}

	collection := client.Database(dbName).Collection(coll)
	opts := options.Update().SetUpsert(true)

	_, err := collection.UpdateOne(context.TODO(), filter, update, opts)
	if err != nil {
		return bson.M{
			"Message":    "Could not update your document, please try again.",
			"Error":      err,
			"StatusCode": 500,
		}
	}

	return bson.M{"Message": "Successfully updated document!", "StatusCode": 200}
}
