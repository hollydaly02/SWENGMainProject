import * as React from "react";
import * as d3 from "d3";

function drawChart(svgRef: React.RefObject<SVGSVGElement>) {
  const data = [12, 5, 6, 6, 9, 10];
  const w = 600;
  const h = 300;
  const svg = d3.select(svgRef.current);

  svg
    .attr("width", w)
    .attr("height", h)
    .style("background", "#fce4ec")
    .style("overflow", "visible")
    .style("margin-top", "40px")
    .style("margin-bottom", "40px");

  // setting the scaling
  const xScale = d3
    .scaleBand()
    .domain(data.map((val, i) => `${i}`))
    .range([0, w])
    .padding(0.5); // between bars

  const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);

  // setting the axes
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(data.length) // number of labels on bottom
    .tickFormat((i) => i + 1);
  const yAxis = d3.axisLeft(yScale).ticks(5);

  svg
    .append("g")
    .call(xAxis)
    .attr("transform", "translate(0," + h + ")"); // shift x-axis to bottom of bar chart
  svg
    .append("g")
    .call(yAxis);

  // setting the svg data (actually draw the data)
  svg
    .selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("x", (v, i) => xScale(i.toString())!) // sets up x scale with xScale function
    .attr("y", yScale) // sets up y scale with yScale function
    .attr("width", xScale.bandwidth())
    .attr("height", (val) => h - yScale(val)); // makes height of bar
}

const Chart: React.FunctionComponent = () => {
  const svg = React.useRef<SVGSVGElement>(null);
  React.useEffect(() => {
    drawChart(svg);
  }, [svg]);

  return (
    <div id="chart">
      <svg ref={svg} />
    </div>
  );
};

export default Chart;
