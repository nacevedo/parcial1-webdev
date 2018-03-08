var express = require('express');
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var bodyParser = require('body-parser')
var ObjectId = require('mongodb').ObjectID;

user = process.env.mlabUser; 
password = process.env.mlabPassword;

console.log(user); 

const url = "mongodb://"+user+":"+password+"@ds243325.mlab.com:43325/nicolasdatabase";

const dbName = "nicolasdatabase";
/**
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection("parcial1");
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

const removeDocument = function(db, id,callback) {
  // Get the documents collection
  const collection = db.collection('sportsdates');
  console.log(id);
  // Delete document where a is 3
  collection.remove({"_id": ObjectId(id)}, function(err, result) {
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

function delDate(id,callback){
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  removeDocument(db, id,function() {
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




//Para buscar por lo que me dan 
const findDocumentsQ = function(db, query, callback) {
  // Get the documents collection
  const collection = db.collection("parcial1");
  // Find some documents
  collection.find(query).limit(20).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found " + docs.length + " records");
    // console.log(docs);
    callback(docs);
  });
};

function getFollowersQ(query, callback) {

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    findDocumentsQ(db, query, callback);

    client.close();
  });

}

router.get("/:nombre", function(req, res) {
  console.log(req.params);
  getFollowersQ(
    {nombre:req.params.query}, 
    (followers) => res.send(followers) 
  );
});
**/

/* GET instagram. */
router.get("/:user", function(req, res) {
  console.log(req.params.user);
  getFollowersQ(
    req.params.user, 
    (followers) => res.send(followers) 
    );
});

function getFollowersQ(user, callback) {
  // Use connect method to connect to the server
  console.log(user); 
  fetch("https://www.instagram.com/"+user+"/?__a=1")
  .then((res)=>res.json())
  .then((data)=> {
    console.log(data);
    if(data.error){
        window.alert("No ha sido posible encontrar al usuario especificado");
      }
    } )
    .catch(error  => {
      console.log('There has been a problem with your fetch operation: '+ error.message);
  });

}





module.exports = router;
