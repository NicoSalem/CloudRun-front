
import './App.css';
import React, { useEffect, useState } from "react";
import {Buffer} from 'buffer';


function App() {

  const [messageList, setMessageList] = useState([])
  const [dbEntries, setDbEntries] = useState([])
  const [redis_messageList, set_redis_messageList] = useState([])

  const [inputData, setInputData] = useState()

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

  function getInputData(value){
    setInputData(value.target.value)
  }

  const basicPost = async (endpoint) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': '$(gcloud auth application-default print-access-token)' },
      body: JSON.stringify({
        "messages": [
            {
                "data":  inputData,
            }
        ]
      })
    };
    fetch(endpoint, requestOptions)
  }

  const basicFetch = async (endpoint) => {
    const req = await fetch(endpoint);
    const json = req.json();
    return json;
  }

  return (
    <div className="App">

      <div className='introduction'>
        <h1>Hello from the front end</h1>
        <button onClick={handleClick}>get messages</button>
        <br></br><br></br>

        <div className='input_and_btn'>
          <input type='text' onChange={getInputData}></input>
          <button onClick={btn_send_pubsub}>send message</button>
        </div>
        
      </div>
      
      <div className='mainSection'>
        <div className='left'>
            <h3>Pub sub messages</h3>
              {messageList.map(entry => {
                return <p> {JSON.stringify(entry)} </p>
              })}
        </div>

        <div className='right'>
          <h3>Pub sub messages - from REDIS</h3>
          <p>{ redis_messageList }</p>
        </div>

      </div>
      {/* <h3>Db entries</h3>
      {dbEntries.map(entry => {
        return <p> {JSON.stringify(entry)} </p>
      })} */}
      
      
    </div>
  );
}

export default App;






// TODO
// INSTEAD OF POSTING TO PPUBSUB FROM FRONT END POST TO BACKEND AND HAVE BACKEND POST TO PUBSUB.
// EASIER IN TERMS OF AUTHENTICATION.
// link https://cloud.google.com/pubsub/docs/publisher#node.js




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