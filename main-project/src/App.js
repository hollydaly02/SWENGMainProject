import { useEffect, useState, useRef } from "react";
import * as d3 from 'd3';
import "./App.css";

function App() {
  const [githubData, setGithubData] = useState([]);
  const [githubUser, setGithubUser] = useState("");

  const [data] = useState([200, 250, 60, 150, 100, 175]);
  const svgRef = useRef();

  const createBarChart = async () => {
    // setting up svg container
    const w = 600;
    const h = 300;

    // Remove the old svg
    d3.select('#barchart-container')
    .select('svg')
    .remove();

    const svg = d3.select("#barchart-container").append("svg")
      .attr('width', w)
      .attr('height', h)
      .style('background', '#d3d3d3')
      .style('overflow', 'visible')
      .style('margin-top', '80px')
      .style('margin-left', '80px');
    
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
      .attr("transform", "translate(0," + h + ")") // shift x-axis to bottom of bar chart
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
  }

  const createLineChart = async () => {
    // read data from csv and format variables
    let data = await d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv')
    var parseTime = d3.timeParse("%Y-%m-%d");
  
    data.forEach((d) => {
      d.date = parseTime(d.date);
      d.value = +d.value;
    });
    console.log(data)

    // set the dimensions and margins of the graph
    var margin = { top: 80, right: 20, bottom: 20, left: 100 },
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // Remove the old svg
    d3.select('#linechart-container')
      .select('svg')
      .remove();

    // append the svg object to the body of the page
    var svg = d3.select("#linechart-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // add X axis and Y axis
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    x.domain(d3.extent(data, (d) => { return d.date; }));
    y.domain([0, d3.max(data, (d) => { return d.value; })]);
  
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));
      
    // add the Line
    var valueLine = d3.line()
    .x((d) => { return x(d.date); })
    .y((d) => { return y(d.value); });
  
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", valueLine);

    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 3)
      .attr("d", valueLine);
  }

  const createPieChart = async () => {
    const data = [{ label: 'Rainy', value: 10 }, { label: 'Sunny', value: 20 }, { label: 'Cloudy', value: 30 }];
    const outerRadius = 200;
    const innerRadius = 0;
    const margin = {
      top: 50, right: 50, bottom: 50, left: 300,
    };

    const width = 2 * outerRadius + margin.left + margin.right;
    const height = 2 * outerRadius + margin.top + margin.bottom;

    const colorScale = d3     
      .scaleSequential()      
      .interpolator(d3.interpolateCool)      
      .domain([0, data.length]);

    // Remove the old svg
    d3.select('#pie-container')
      .select('svg')
      .remove();

    // Create new svg
    const svg = d3
      .select('#pie-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = svg
      .selectAll()
      .data(pieGenerator(data))
      .enter();

    // Append arcs
    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (_, i) => colorScale(i))
      .style('stroke', '#ffffff')
      .style('stroke-width', 0);

    // Append text labels
    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.label)
      .style('fill', (_, i) => colorScale(data.length - i))
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
    
  } 

  useEffect(() => {
    createBarChart();
    createLineChart();
    createPieChart();
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
    <div class="parent">
      <div id="barchart-container" />
      <div id="linechart-container" />
      <div id="pie-container" />
    </div>
  );
}

function myfunc(location){
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
