import "./App.css";
import { useState } from "react";

function App() {
  const [githubData, setGithubData] = useState([]);

  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");

  const [buttonData, setButtonData] = useState("");
  const [dateSelection, setDateSelection] = useState([]);
  /*START SAVED REPO INFO*/
  const [SanFrancisco1DateC, setSanFrancisco1Date] = useState([]);
  const [SanFrancisco1TimeC, setSanFrancisco1Time] = useState([]);
  const [SanFrancisco2DateC, setSanFrancisco2Date] = useState([]);
  const [SanFrancisco2TimeC, setSanFrancisco2Time] = useState([]);

  const [Dublin1DateC, setDublin1Date] = useState([]);
  const [Dublin1TimeC, setDublin1Time] = useState([]);
  const [Dublin2DateC, setDublin2Date] = useState([]);
  const [Dublin2TimeC, setDublin2Time] = useState([]);

  const [Delhi1DateC, setDelhi1Date] = useState([]);
  const [Delhi1TimeC, setDelhi1Time] = useState([]);
  const [Delhi2DateC, setDelhi2Date] = useState([]);
  const [Delhi2TimeC, setDelhi2Time] = useState([]);

  const [Redmond1DateC, setRedmond1Date] = useState([]);
  const [Redmond1TimeC, setRedmond1Time] = useState([]);
  const [Redmond2DateC, setRedmond2Date] = useState([]);
  const [Redmond2TimeC, setRedmond2Time] = useState([]);
  /*END SAVED REPO INFO*/
  /*START SAVED MATCHES ARRAYS*/
  const [sanFran1Matches, setSanFran1Matches] = useState([]);
  const [sanFran2Matches, setSanFran2Matches] = useState([]);
  const [dublin1Matches, setDublin1Matches] = useState([]);
  const [dublin2Matches, setDublin2Matches] = useState([]);
  const [delhi1Matches, setDelhi1Matches] = useState([]);
  const [delhi2Matches, setDelhi2Matches] = useState([]);
  const [redmond1Matches, setRedmond1Matches] = useState([]);
  const [redmond2Matches, setRedmond2Matches] = useState([]);
  /*END SAVED MATCHES ARRAYS*/
  var count = 0;

  let matchDates = [];
  /*Start San Francisco*/
  var userSanFrancisco1 = "levkk";
  var repoSanFrancisco1 = "pgcat";
  var userSanFrancisco2 = "mdo";
  var repoSanFrancisco2 = "github-buttons";
  /*End San Francisco*/

  /*Start Dublin*/
  var userDublin1 = "orta";
  var repoDublin1 = "orta.github.com";
  var userDublin2 = "joreilly";
  var repoDublin2 = "Confetti";
  /*End Dublin*/

  /*Start Dehli*/
  var userDehli1 = "Prince-Mendiratta";
  var repoDehli1 = "BotsApp";
  var userDehli2 = "Swati4star";
  var repoDehli2 = "Images-to-PDF";
  /*End Dehli*/

  /*Start Redmond*/
  var userRedmond1 = "zhengthomastang";
  var repoRedmond1 = "zhengthomastang.github.io";
  var userRedmond2 = "fjxmlzn";
  var repoRedmond2 = "opacus";
  /*End Redmond*/

  const usernames = [
    userSanFrancisco1,
    userSanFrancisco2,
    userDublin1,
    userDublin2,
    userDehli1,
    userDehli2,
    userRedmond1,
    userRedmond2,
  ];
  const repositories = [
    repoSanFrancisco1,
    repoSanFrancisco2,
    repoDublin1,
    repoDublin2,
    repoDehli1,
    repoDehli2,
    repoRedmond1,
    repoRedmond2,
  ];

  let tempArrayDates = [];
  let tempArrayTimes = [];
  let tempDateSelection = [];
  const iterateThroughPages = async () => {
    let tempArrayDates2 = [];
    let tempArrayTimes2 = [];
    for (var j = 0; j < usernames.length; j++) {
      count = 0;
      var pageCount = 1;
      tempArrayDates = [];
      tempArrayTimes = [];
      tempDateSelection = [];
      for (let i = 0; true; i++) {
        const response = await fetch(
          `https://api.github.com/repos/${usernames[j]}/${repositories[j]}/commits?per_page=100&page=${pageCount}`,
          {
            method: "GET",
            headers: {
              Authorization: `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`,
            },
          }
        );
        const responseLocation = await fetch(
          `https://api.github.com/users/${usernames[j]}`,
          {
            method: "GET",
            headers: {
              Authorization: `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`,
            },
          }
        );
        const jsonUserInfo = await responseLocation.json();
        setGithubData(jsonUserInfo);
        const jsonResponsePage = await response.json();
        if (Object.keys(jsonResponsePage).length === 0) {
          for (var k = 0; k < tempArrayDates.length; k++) {
            tempArrayDates2[k] = tempArrayDates[k].valueOf();
            tempArrayTimes2[k] = tempArrayTimes[k];
          }
          console.log("No more pages!");
          console.log(
            "Number of commits on this master branch: \n" + count / 2
          );
          console.log(
            "All the commit dates: \n" +
              tempArrayDates2 +
              "\n\nDate array length: \n" +
              tempArrayDates2.length
          );
          console.log(
            "All the commit times: \n" +
              tempArrayTimes2 +
              "\n\nTime array length: \n" +
              tempArrayTimes2.length
          );
          console.log("Ending this iteration.");
          dateRangeFinder();
          for (var l = 0; l < dateSelection.length; l++) {
            tempDateSelection[l] = dateSelection[l];
          }
          let finalMatches = findMatches(
            tempArrayDates2,
            tempArrayTimes2,
            tempDateSelection
          );
          if (j === 0) {
            setSanFrancisco1Date(tempArrayDates2);
            setSanFrancisco1Time(tempArrayTimes2);
            setSanFran1Matches(finalMatches);
          } else if (j === 1) {
            setSanFrancisco2Date(tempArrayDates2);
            setSanFrancisco2Time(tempArrayTimes2);
            setSanFran2Matches(finalMatches);
          } else if (j === 2) {
            setDublin1Date(tempArrayDates2);
            setDublin1Time(tempArrayTimes2);
            setDublin1Matches(finalMatches);
          } else if (j === 3) {
            setDublin2Date(tempArrayDates2);
            setDublin2Time(tempArrayTimes2);
            setDublin2Matches(finalMatches);
          } else if (j === 4) {
            setDelhi1Date(tempArrayDates2);
            setDelhi1Time(tempArrayTimes2);
            setDelhi1Matches(finalMatches);
          } else if (j === 5) {
            setDelhi2Date(tempArrayDates2);
            setDelhi2Time(tempArrayTimes2);
            setDelhi2Matches(finalMatches);
          } else if (j === 6) {
            setRedmond1Date(tempArrayDates2);
            setRedmond1Time(tempArrayTimes2);
            setRedmond1Matches(finalMatches);
          } else if (j === 7) {
            setRedmond2Date(tempArrayDates2);
            setRedmond2Time(tempArrayTimes2);
            setRedmond2Matches(finalMatches);
          }
          console.log("Next is the final matches");
          console.log(finalMatches);
          break;
        } else {
          console.log("NEW Page count is : \n" + pageCount);
          const index = j;
          getObject(jsonResponsePage, index);
          pageCount++;
        }
      }
    }
  };
  /*START
   *THE FOLLOWING GET THE TOTAL COMMITS FOR THAT PAGE AND ALSO ALL THE DATES THE COMMITS WERE MADE*/
  function getObject(theObject, index) {
    var result = null;
    if (theObject instanceof Array) {
      for (var i = 0; i < theObject.length; i++) {
        result = getObject(theObject[i], index);
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
            var year = theObject[prop].substring(0, 4); //re-arrange the date format to dd-mm-yyyy rather than the github default of yyy-mm-dd
            var month = theObject[prop].substring(5, 7);
            var day = theObject[prop].substring(8, 10);
            tempArrayDates.push(JSON.stringify(day + "-" + month + "-" + year));
            tempArrayTimes.push(theObject[prop].substring(11, 16));
          }
        }
        if (
          theObject[prop] instanceof Object ||
          theObject[prop] instanceof Array
        ) {
          result = getObject(theObject[prop], index);
          if (result) {
            break;
          }
        }
      }
    }
    return result;
  }
  /*END*/
  function dateRangeFinder() {
    var date1 = startingDate;
    var date2 = endingDate;
    let datesArr = [];
    if (date1 === "" && date2 === "") {
      return;
    } else {
      var date1Day = parseInt(date1.substring(0, 2));
      var date1Month = parseInt(date1.substring(3, 5)) - 1;
      var date1Year = parseInt(date1.substring(6, 10));
      var date2Day = parseInt(date2.substring(0, 2));
      var date2Month = parseInt(date2.substring(3, 5)) - 1;
      var date2Year = parseInt(date2.substring(6, 10));

      let startDate = new Date(date1Year * 1, date1Month * 1, date1Day * 1);
      let endDate = new Date(date2Year * 1, date2Month * 1, date2Day * 1);
      let tempDate = new Date(startDate.getTime());
      while (tempDate <= endDate) {
        var tempMonthString = new Date(tempDate).toString().substring(4, 7);
        if (tempMonthString === "Jan") {
          tempMonthString = "01";
        } else if (tempMonthString === "Feb") {
          tempMonthString = "02";
        } else if (tempMonthString === "Mar") {
          tempMonthString = "03";
        } else if (tempMonthString === "Apr") {
          tempMonthString = "04";
        } else if (tempMonthString === "May") {
          tempMonthString = "05";
        } else if (tempMonthString === "Jun") {
          tempMonthString = "06";
        } else if (tempMonthString === "Jul") {
          tempMonthString = "07";
        } else if (tempMonthString === "Aug") {
          tempMonthString = "08";
        } else if (tempMonthString === "Sep") {
          tempMonthString = "09";
        } else if (tempMonthString === "Oct") {
          tempMonthString = "10";
        } else if (tempMonthString === "Nov") {
          tempMonthString = "11";
        } else if (tempMonthString === "Dec") {
          tempMonthString = "12";
        }
        var tempDayString = new Date(tempDate).toString().substring(8, 10);
        var tempYearString = new Date(tempDate).toString().substring(11, 15);
        var tempFullDate =
          tempDayString + "-" + tempMonthString + "-" + tempYearString;
        datesArr.push(JSON.stringify(tempFullDate));
        tempDate.setDate(tempDate.getDate() + 1);
      }
      setDateSelection(datesArr);
      //console.log(datesArr);
      // let tempy1 = SanFrancisco1DateC;
      // let tempy2 = SanFrancisco1TimeC;
      // console.log("this is tempy");
      // console.log(tempy2);
      // setSanFran1Matches(findMatches(tempy1, tempy2, datesArr));
      // console.log(sanFran1Matches);
      // setSanFran2Matches(
      //   findMatches(SanFrancisco2DateC, SanFrancisco2TimeC, datesArr)
      // );
      // //console.log(sanFran2Matches);
      // setDublin1Matches(findMatches(Dublin1DateC, Dublin1TimeC, datesArr));
      // //console.log(dublin1Matches);
      // setDublin2Matches(findMatches(Dublin2DateC, Dublin2TimeC, datesArr));
      // //console.log(dublin2Matches);
      // setDelhi1Matches(findMatches(Delhi1DateC, Delhi1TimeC, datesArr));
      // //console.log(delhi1Matches);
      // setDelhi2Matches(findMatches(Delhi2DateC, Delhi2TimeC, datesArr));
      // //console.log(delhi1Matches);
      // setRedmond1Matches(findMatches(Redmond1DateC, Redmond1TimeC, datesArr));
      // //console.log(redmond1Matches);
      // setRedmond2Matches(findMatches(Redmond2DateC, Redmond2TimeC, datesArr));
      // //console.log(redmond1Matches);
      return;
    }
  }
  function findMatches(locationDateArray, locationTimeArray, datesArr) {
    matchDates = [];
    //console.log(locationDateArray);
    //console.log(locationTimeArray);
    //console.log(datesArr);

    var totalMatchingDateCounter = 0;
    for (var i = 0; i < datesArr.length; i++) {
      var matchingDateCounter = 0;
      const matchDateTimes = [];
      for (var j = 0; j < locationDateArray.length; j++) {
        if (datesArr[i] === locationDateArray[j]) {
          matchingDateCounter++;
          totalMatchingDateCounter++;
          matchDateTimes.push(locationTimeArray[j]);
        }
      }
      if (matchingDateCounter !== 0) {
        console.log("I am pushing");
        matchDates.push({
          date: datesArr[i].valueOf().replaceAll('"', ""),
          commitNum: matchingDateCounter,
          time: matchDateTimes.toString(),
        });
      }
    }
    return matchDates;
  }
  function listMatchingDates() {
    if (buttonData === 0) {
      console.log(sanFran1Matches);
    } else if (buttonData === 1) {
      console.log(sanFran2Matches);
    } else if (buttonData === 2) {
      console.log(dublin1Matches);
    } else if (buttonData === 3) {
      console.log(dublin2Matches);
    } else if (buttonData === 4) {
      console.log(delhi1Matches);
    } else if (buttonData === 5) {
      console.log(delhi2Matches);
    } else if (buttonData === 6) {
      console.log(redmond1Matches);
    } else if (buttonData === 7) {
      console.log(redmond2Matches);
    }
    return;
  }
  return (
    <div className="homepage">
      <div className="header">
        <h1>Github API Testings</h1>
      </div>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Enter Start Date"
          onChange={(e) => setStartingDate(e.target.value)}
          className="startDate"
        />
        <input
          type="text"
          placeholder="Enter End Date"
          onChange={(e) => setEndingDate(e.target.value)}
          className="endDate"
        />
        <button onClick={iterateThroughPages} className="search_button">
          Fetch Data
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
      </div>
      <div className="buttonSelectors">
        <div className="sanFran1">
          <button
            onClick={function (event) {
              setButtonData(0);
              listMatchingDates();
            }}
          >
            San Francisco 1
          </button>
        </div>
        <div className="sanFran2">
          <button
            onClick={function (event) {
              setButtonData(1);
              listMatchingDates();
            }}
          >
            San Francisco 2
          </button>
        </div>
        <div className="dublin1">
          <button
            onClick={function (event) {
              setButtonData(2);
              listMatchingDates();
            }}
          >
            Dublin 1
          </button>
        </div>
        <div className="dublin2">
          <button
            onClick={function (event) {
              setButtonData(3);
              listMatchingDates();
            }}
          >
            Dublin 2
          </button>
        </div>
        <div className="delhi1">
          <button
            onClick={function (event) {
              setButtonData(4);
              listMatchingDates();
            }}
          >
            Delhi 1
          </button>
        </div>
        <div className="delhi2">
          <button
            onClick={function (event) {
              setButtonData(5);
              listMatchingDates();
            }}
          >
            Delhi 2
          </button>
        </div>
        <div className="redmond1">
          <button
            onClick={function (event) {
              setButtonData(6);
              listMatchingDates();
            }}
          >
            Redmond 1
          </button>
        </div>
        <div className="redmond2">
          <button
            onClick={function (event) {
              setButtonData(7);
              listMatchingDates();
            }}
          >
            Redmond 2
          </button>
        </div>
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
