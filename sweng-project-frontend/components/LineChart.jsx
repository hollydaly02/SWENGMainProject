import React from "react";
import * as d3 from "d3";

const Chart = () => {
  const svg = React.useRef(null);
  React.useEffect(() => {
    drawChart(svg);
  }, [svg]);

  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
  function drawChart(svgRef) {
    // append the svg object to the body of the page
    var svg = d3
      .select(svgRef.current)
      .attr("viewbox", `0 0 ${height} ${width}`)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv"
    ).then(function (data) {
      // group the data: I want to draw one line per group
      const sumstat = d3.group(data, (d) => d.name); // nest function allows to group the calculation per level of a factor

      // Add X axis --> it is a date format
      const x = d3
        .scaleLinear()
        .domain(
          d3.extent(data, function (d) {
            return d.year;
          })
        )
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(5));

      // Add Y axis
      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return +d.n;
          }),
        ])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // color palette
      const color = d3
        .scaleOrdinal()
        .range([
          "#e41a1c",
          "#377eb8",
          "#4daf4a",
          "#984ea3",
          "#ff7f00",
          "#ffff33",
          "#a65628",
          "#f781bf",
          "#999999",
        ]);

      // Draw the line
      svg
        .selectAll(".line")
        .data(sumstat)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", function (d) {
          return color(d[0]);
        })
        .attr("stroke-width", 1.5)
        .attr("d", function (d) {
          return d3
            .line()
            .x(function (d) {
              return x(d.year);
            })
            .y(function (d) {
              return y(+d.n);
            })(d[1]);
        });
    });
  }

  return (
    // <div id="chart">
    <svg width={width} height={height} ref={svg} />
    // </div>
  );
};

export default Chart;
