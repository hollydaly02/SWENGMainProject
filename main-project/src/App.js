import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [githubData, setGithubData] = useState([]);
  const [githubUser, setGithubUser] = useState("");

  const [githubRepo, setGithubRepo] = useState([]);

  var count = 0;
  const SanFrancisco1Date = [];
  const SanFrancisco1Time = [];
  const SanFrancisco2Date = [];
  const SanFrancisco2Time = [];

  const Dublin1Date = [];
  const Dublin1Time = [];
  const Dublin2Date = [];
  const Dublin2Time = [];

  const Delhi1Date = [];
  const Delhi1Time = [];
  const Delhi2Date = [];
  const Delhi2Time = [];

  const Redmond1Date = [];
  const Redmond1Time = [];
  const Redmond2Date = [];
  const Redmond2Time = [];

  /*Start San Francisco*/
  var userSanFrancisco1 ="levkk";
  var repoSanFrancisco1 ="pgcat";
  var userSanFrancisco2 ="mdo";
  var repoSanFrancisco2 ="github-buttons";
  /*End San Francisco*/

  /*Start Dublin*/
  var userDublin1 ="orta";
  var repoDublin1 ="orta.github.com";
  var userDublin2 ="joreilly";
  var repoDublin2 ="Confetti";
  /*End Dublin*/

  /*Start Dehli*/
  var userDehli1 ="Prince-Mendiratta";
  var repoDehli1 ="BotsApp";
  var userDehli2 ="Swati4star";
  var repoDehli2 ="Images-to-PDF";
  /*End Dehli*/

  /*Start Redmond*/
  var userRedmond1 ="zhengthomastang";
  var repoRedmond1 ="zhengthomastang.github.io";
  var userRedmond2 ="fjxmlzn";
  var repoRedmond2 ="opacus";
  /*End Redmond*/

  const usernames = [userSanFrancisco1,userSanFrancisco2,userDublin1,userDublin2,userDehli1,userDehli2,userRedmond1,userRedmond2];
  const repositories = [repoSanFrancisco1,repoSanFrancisco2,repoDublin1,repoDublin2,repoDehli1,repoDehli2,repoRedmond1,repoRedmond2];

  const iterateThroughPages = async () => {
    for(var j=0;j<usernames.length;j++){
      var count = 0;  
      var pageCount = 1;
    for (let i = 0; true; i++) {
      const response = await fetch(
        `https://api.github.com/repos/${usernames[j]}/${repositories[j]}/commits?per_page=100&page=${pageCount}`,{
          method: "GET",
          headers: {
            Authorization: `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` 
          }
        }
      );
      const responseLocation = await fetch(
        `https://api.github.com/users/${usernames[j]}`,{
          method: "GET",
          headers: {
            Authorization: `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` 
          }
        }
      );

      const jsonUserInfo = await responseLocation.json();
      setGithubData(jsonUserInfo);
      const jsonResponsePage = await response.json();
      if (Object.keys(jsonResponsePage).length === 0) {
        console.log("NEW This is empty!");
        console.log("Number of commits on this master branch: \n" + count / 2);
        console.log(
          "All the commit dates: \n" +
          SanFrancisco1Date +
            "\n\nDate array length: \n" +
            SanFrancisco1Date.length
        );
        console.log(
          "All the commit times: \n" +
          SanFrancisco1Time +
            "\n\nTime array length: \n" +
            SanFrancisco1Time.length
        );
        console.log("NEW: I HAVE ENDED THIS");
        break;
      } else {
        console.log("NEW Page count is : \n" + pageCount);
        const index=j;
        getObject(jsonResponsePage,index);
        pageCount++;
      }
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
  function getObject(theObject,index) {
    var result = null;
    if (theObject instanceof Array) {
      for (var i = 0; i < theObject.length; i++) {
        result = getObject(theObject[i],index);
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
            if(index===0){
              SanFrancisco1Date.push(day+"-"+month+"-"+year);
              SanFrancisco1Time.push(theObject[prop].substring(11, 16));
            }else if(index ===1){
              SanFrancisco2Date.push(day+"-"+month+"-"+year);
              SanFrancisco2Time.push(theObject[prop].substring(11, 16));
            }else if(index ===2){
              Dublin1Date.push(day+"-"+month+"-"+year);
              Dublin1Time.push(theObject[prop].substring(11, 16));
            }else if(index ===3){
              Dublin2Date.push(day+"-"+month+"-"+year);
              Dublin2Time.push(theObject[prop].substring(11, 16));
            }else if(index ===4){
              Delhi1Date.push(day+"-"+month+"-"+year);
              Delhi1Time.push(theObject[prop].substring(11, 16));
            }else if(index ===5){
              Delhi2Date.push(day+"-"+month+"-"+year);
              Delhi2Time.push(theObject[prop].substring(11, 16));
            }else if(index ===6){
              Redmond1Date.push(day+"-"+month+"-"+year);
              Redmond1Time.push(theObject[prop].substring(11, 16));
            }else if(index ===7){
              Redmond2Date.push(day+"-"+month+"-"+year);
              Redmond2Time.push(theObject[prop].substring(11, 16));
            }
          }
        }
        if (
          theObject[prop] instanceof Object ||
          theObject[prop] instanceof Array
        ) {
          result = getObject(theObject[prop],index);
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
