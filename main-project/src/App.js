import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [githubData, setGithubData] = useState([]);
  const [githubUser, setGithubUser] = useState("");

  const [githubRepo, setGithubRepo] = useState([]);

  var count = 0;
  const date = [];
  const time = [];
  const iterateThroughPages = async () => {
    var pageCount = 1;
    for (let i = 0; true; i++) {
      const response = await fetch(
        `https://api.github.com/repos/${githubUser}/${githubRepo}/commits?per_page=100&page=${pageCount}`
      );
      const responseLocation = await fetch(
        `https://api.github.com/users/${githubUser}`
      );

      const jsonUserInfo = await responseLocation.json();
      setGithubData(jsonUserInfo);
      const jsonResponsePage = await response.json();
      if (Object.keys(jsonResponsePage).length === 0) {
        console.log("NEW This is empty!");
        console.log("Number of commits on this master branch: \n" + count / 2);
        console.log(
          "All the commit dates: \n" +
            date +
            "\n\nDate array length: \n" +
            date.length
        );
        console.log(
          "All the commit times: \n" +
            time +
            "\n\nTime array length: \n" +
            time.length
        );
        return console.log("NEW: I HAVE ENDED THIS");
      } else {
        console.log("NEW Page count is : \n" + pageCount);
        getObject(jsonResponsePage);
        pageCount++;
      }
    }
  };
  /*START
   *THE FOLLOWING GET THE TOTAL COMMITS FOR THAT PAGE AND ALSO ALL THE DATES THE COMMITS WERE MADE*/

  const jsonNull = require("./testingNull.json");
  // if (Object.keys(jsonNull).length === 0) {
  //   console.log("This is empty!");
  // }
  var testing = 0;
  function getObject(theObject) {
    var result = null;
    if (theObject instanceof Array) {
      for (var i = 0; i < theObject.length; i++) {
        result = getObject(theObject[i]);
        if (result) {
          break;
        }
      }
    } else {
      for (var prop in theObject) {
        if (prop === "date") {
          if (theObject[prop] === 1) {
            return theObject;
          }
          count++;
          if (count % 2 === 0) {
            var year= theObject[prop].substring(0, 4); //re-arrange the date format to dd-mm-yyyy rather than the github default of yyy-mm-dd
            var month=theObject[prop].substring(5, 7);
            var day=theObject[prop].substring(8, 10);
            date.push(day+"-"+month+"-"+year);
            time.push(theObject[prop].substring(11, 16));
          }
        }
        if (
          theObject[prop] instanceof Object ||
          theObject[prop] instanceof Array
        ) {
          result = getObject(theObject[prop]);
          if (result) {
            break;
          }
        }
      }
    }
    return result;
  }

  /*END*/

  return (
    <div className="homepage">
      <div className="header">
        <h1>Testing Users API</h1>
      </div>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setGithubUser(e.target.value)}
          className="inputSearch"
        />
        <input
          type="text"
          placeholder="Repository"
          onChange={(e) => setGithubRepo(e.target.value)}
          className="repoSearch"
        />
        <button onClick={iterateThroughPages} className="search_button">
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

function myfunc(location) {
  if (location) {
    if (location.indexOf("San Francisco") !== -1) {
      return "San Francisco";
    } else if (location.indexOf("Dublin") !== -1) {
      return "Dublin";
    } else if (location.indexOf("Delhi") !== -1) {
      return "Delhi";
    } else if (location.indexOf("Redmond") !== -1) {
      return "Redmond";
    } else {
      return "Null";
    }
  }
}
export default App;
