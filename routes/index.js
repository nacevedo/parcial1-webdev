var express = require('express');
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var bodyParser = require('body-parser')
var ObjectId = require('mongodb').ObjectID;


const url = process.env.url;
db = process.env.mlabDatabase; 
collection = process.env.collection; 
console.log(url);
console.log(collection);
const dbName = db;


const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('parcial1');
  // Find some documents
  collection.find().limit(20).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found " + docs.length + " records");
    // console.log(docs);
    callback(docs);
  });
};


const insertDocuments = function(db,d,callback) {
  // Get the documents collection
  const collection = db.collection('parcial1');


  // Insert some documents
  collection.insert(d, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted 1 documents into the collection");
    callback(result);
  });
}




function getFollowers(callback) {

  // Database Name
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    findDocuments(db, callback);
    client.close();
  });

}


function postDate(d,callback) {
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db,d, function() {
    client.close();
    callback();
  });
});
}






router.get("/", function(req, res) {
  getFollowers( 
    (followers) => res.send(followers) 
    );
});



router.post("/", function(req, res) {
  var body = req.body
  postDate(body, () => res.send('Todo en orden'));
});

router.delete("/:query", function (req, res) {
  var body = req.body
  delDate(req.params.query, () => res.send('Todo en orden'));
});








module.exports = router;
