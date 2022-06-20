
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


const handleClick =  async () => {
  console.log(await basicFetch("https://api.kanye.rest/"))
  console.log('this is:');
  console.log(await basicFetch("http://localhost:3003/j"))
}

const basicFetch = async (endpoint) => {
  const req = await fetch(endpoint);
  const json = req.json();
  return json;
}

export default App;
