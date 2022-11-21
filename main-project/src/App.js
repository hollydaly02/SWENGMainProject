import { useEffect, useState, useRef } from "react";
import * as d3 from 'd3';
import "./App.css";

function App() {
  const [githubData, setGithubData] = useState([]);
  const [githubUser, setGithubUser] = useState("");

  const [data] = useState([200, 250, 60, 150, 100, 175]);
  const svgRef = useRef();

  useEffect(() => {
    fetchData();
    // setting up svg container
    const w = 400;
    const h = 300;
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', '#d3d3d3')
      .style('overflow', 'visible')
      .style('margin-top', '75px')
      .style('margin-left', '50px');
    
    // setting the scaling
    const xScale = d3.scaleBand()
      .domain(data.map((val,i) => i))
      .range([0, w])
      .padding(0.5); // between bars
    const yScale = d3.scaleLinear()
      .domain([0, h])
      .range([h, 0]);
    
    // setting the axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length) // number of labels on bottom
      .tickFormat(i => i + 1);
    const yAxis = d3.axisLeft(yScale)
      .ticks(5);
    svg.append('g')
      .call(xAxis)
      .attr('transform', 'translate(0, ${h})'); // shift x-axis to bottom of bar chart
    svg.append('g')
      .call(yAxis);

    // setting the svg data (actually draw the data)
    svg.selectAll('.bar')
      .data(data)
      .join('rect')
        .attr('x', (v, i) => xScale(i)) // sets up x scale with xScale function
        .attr('y', yScale) // sets up y scale with yScale function
        .attr('width', xScale.bandwidth())
        .attr('height', val => h - yScale(val)); // makes height of bar

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
      <svg ref={svgRef}></svg>
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
