var { Router } = require("express");
var { MongoClient, ObjectId } = require("mongodb");
const zipRoutes = Router();

function middleware2(req, res, next) {
  console.log("middleware 2 executed....");

  next();
}

function attachSystemTime(req, res, next) {
  res.setHeader("SagarServerDate", new Date());
  next();
}

zipRoutes.get("/", (req, res) => {
  // database connection here
  console.log("we are in get route");
  const client = new MongoClient(process.env.DB_CONNECTION_STRING);
  client.connect().then((connection) => {
    console.log("connection made");
    const db = connection.db("copierrental");
    db.collection("zips")
      .find()
      .toArray()
      .then((data) => {
        return res.json(data);
      });
  });
});

zipRoutes.post("/", (req, res) => {
  let song = req.body;

  const client = new MongoClient(process.env.DB_CONNECTION_STRING);
  client.connect().then((connection) => {
    console.log("connection made");
    const db = connection.db("copierrental");
    db.collection("zips")
      .insertOne(zip)
      .then((x) => {
        //
        if (x.acknowledged) {
          res.send("Zip Created");
        } else {
          res.send("Something went wrong");
        }
      });
  });
});

zipRoutes.delete("/", (req, res) => {
  let id = req.query.id; // read id as a string
  //logic to delete song with this id from the array

  const client = new MongoClient(process.env.DB_CONNECTION_STRING);
  client.connect().then((connection) => {
    console.log("connection made");
    const db = connection.db("copierrental");
    db.collection("zips")
      .deleteOne({ _id: new ObjectId(id) })
      .then((x) => {
        res.send("Zip Deleted.");
      });
  });
});

zipRoutes.put("/", (req, res) => {
  let id = req.query.id;
  let newSongData = req.body;

  const client = new MongoClient(process.env.DB_CONNECTION_STRING);
  client.connect().then((connection) => {
    console.log("connection made");
    const db = connection.db("copierrental");
    db.collection("zips")
      .updateOne({ _id: new ObjectId(id) }, { $set: newZipData })
      .then((x) => {
        res.send("record updated.");
      });
  });
});

module.exports = { zipRoutes };