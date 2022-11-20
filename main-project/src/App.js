import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [githubData, setGithubData] = useState([]);
  const [githubUser, setGithubUser] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`https://api.github.com/users/${githubUser}`);
    const jsonData = await response.json();
    if (jsonData && jsonData.message !== "Not Found") {
      setGithubData(jsonData);
    } else if (githubUser !== "") {
      console.log("Username does not exist");
    } else {
      setGithubData({});
    }
  };

  return (
    <div className="homepage">
      <div className="header">
        <h1>Testing Users API</h1>
      </div>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search for User"
          onChange={(e) => setGithubUser(e.target.value)}
          className="input_search"
        />
        <button onClick={fetchData} className="search_button">
          Search Github
        </button>
      </div>
      <br></br>
      <div className="mainBody">
        <img src={githubData.avatar_url} height="100" width="100" />
        <br></br>
        <p>
          <span>Username:</span> {githubData.name}
        </p>
        <p>
          <span>Location:</span> {myfunc(githubData.location)}
        </p>
        <p>
          <span>Public Repos:</span> {githubData.public_repos}
        </p>
      </div>
    </div>
  );
}

function myfunc( location){
  if(location) {
    if(location.indexOf("San Francisco") !== -1){
      return "San Francisco"
    }
    else if(location.indexOf("Dublin") !== -1){
      return "Dublin"
    }
    else if(location.indexOf("Delhi") !== -1){
      return "Delhi"
    }
    else if(location.indexOf("Redmond") !== -1){
      return "Redmond"
    }
    else {
      return "Null"
    }
  }

}

export default App;
