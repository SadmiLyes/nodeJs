//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

/*    db.collection('Todos').find({
        _id: new ObjectID("5a72e67693c92824488b0537")
    }).toArray().then((docs)=>{
      console.log('Todos');
      console.log(JSON.stringify(docs, undefined, 2))
    },(err)=>{
        console.log('Unable to ferch todos', err);
    });*/

/*    db.collection('Todos').find().count().then((count)=>{
        console.log('Todos count : ', count);
    },(err)=>{
        console.log('Unable to ferch todos', err);
    });*/

    db.collection('Users').find({name:'Lyes'}).toArray().then((docs)=>{
        console.log('Users : ', JSON.stringify(docs))
    }, (err) => {
        console.log('Unable to find user ', err);
    })

    //db.close();
});