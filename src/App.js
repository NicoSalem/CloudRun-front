
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello world</h1>
      <h1>Is the CICD pipeline live???</h1>
      <button onClick={handleClick}>click me</button>
    </div>
  );
}

/**
 * setting up publish method for pub sub
 */
 const topicNameOrId = 'projects/groovy-autumn-290918/topics/my-first-topic';
 const data = JSON.stringify({myMessage: 'this is my pubsub message'});
 
 // Imports the Google Cloud client library
 const {PubSub} = require('@google-cloud/pubsub');
 
 // Creates a client; cache this for further use
 const pubSubClient = new PubSub();
 
 async function publishMessage() {
   // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
   const dataBuffer = Buffer.from(data);
 
   try {
     const messageId = await pubSubClient
       .topic(topicNameOrId)
       .publishMessage({data: dataBuffer});
     console.log(`Message ${messageId} published.`);
   } catch (error) {
     console.error(`Received error while publishing: ${error.message}`);
     process.exitCode = 1;
   }
 }

const handleClick =  async () => {
  console.log(await basicFetch("https://api.kanye.rest/"))
  console.log('this is:');
  console.log(await basicFetch("https://cloudrun-cicd1-back-svuotfutja-uc.a.run.app/db"))
  publishMessage();
}

const basicFetch = async (endpoint) => {
  const req = await fetch(endpoint);
  const json = req.json();
  return json;
}



publishMessage();

export default App;
