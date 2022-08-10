
import './App.css';
import React, { useEffect, useState } from "react";
import {Buffer} from 'buffer';


function App() {

  const [messageList, setMessageList] = useState([])
  const [dbEntries, setDbEntries] = useState([])
  const [redis_messageList, set_redis_messageList] = useState([])

  const handleClick =  async () => {
    var db = await basicFetch("https://cloud-sql-microservice-svuotfutja-uk.a.run.app/db");
    var msgs = await basicFetch("https://pubsub-microservice-svuotfutja-uk.a.run.app/pmsgs");
    var redis_msgs = await basicFetch("https://redis-microservice-svuotfutja-ue.a.run.app/redis-pubsub-msgs");

    console.log(db)
    console.log(msgs)

    setMessageList(msgs);
    setDbEntries(db);
    set_redis_messageList(redis_msgs);
    console.log(redis_msgs)
  }

  const btn_send_pubsub =  async () => {
    await basicPost("https://pubsub-microservice-svuotfutja-uk.a.run.app/send-pubsub-msg-from-backend");
    // await basicPost("https://cloudrun-cicd1-back-svuotfutja-ue.a.run.app/get-pubsub-msgs2");
  }

  return (
    <div className="App">
      <h1>Hello from the front end</h1>
      <button onClick={handleClick}>retrieve db entreis and pub sub messages</button>
      <br></br><br></br>
      <button onClick={btn_send_pubsub}>send Pub sub message</button>
      <h3>Db entries</h3>
      {dbEntries.map(entry => {
        return <p> {JSON.stringify(entry)} </p>
      })}
      <h3>Pub sub messages</h3>
      {messageList.map(entry => {
        return <p> {JSON.stringify(entry)} </p>
      })}
      <h3>Pub sub messages - from REDIS</h3>
      <p>{ redis_messageList }</p>
    </div>
  );
}

export default App;



const basicFetch = async (endpoint) => {
  const req = await fetch(endpoint);
  const json = req.json();
  return json;
}


// TODO
// INSTEAD OF POSTING TO PPUBSUB FROM FRONT END POST TO BACKEND AND HAVE BACKEND POST TO PUBSUB.
// EASIER IN TERMS OF AUTHENTICATION.
// link https://cloud.google.com/pubsub/docs/publisher#node.js

const basicPost = async (endpoint) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': '$(gcloud auth application-default print-access-token)' },
    body: JSON.stringify({
      "messages": [
          {
              "data":  Buffer.from("hello from react pubsub").toString('base64'),
          }
      ]
    })
  };
  fetch(endpoint, requestOptions)
}


/**
 * setting up publish method for pub sub
 */
//  const topicNameOrId = 'projects/groovy-autumn-290918/topics/my-first-topic';
//  const data = JSON.stringify({myMessage: 'this is my pubsub message'});
 
//  // Imports the Google Cloud client library
//  const {PubSub} = require('@google-cloud/pubsub');
 
//  // Creates a client; cache this for further use
//  const pubSubClient = new PubSub();
 
//  async function publishMessage() {
//    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
//    const dataBuffer = Buffer.from(data);
 
//    try {
//      const messageId = await pubSubClient
//        .topic(topicNameOrId)
//        .publishMessage({data: dataBuffer});
//      console.log(`Message ${messageId} published.`);
//    } catch (error) {
//      console.error(`Received error while publishing: ${error.message}`);
//      process.exitCode = 1;
//    }
//  }