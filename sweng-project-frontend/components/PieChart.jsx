import React from "react";
import * as d3 from "d3";

const Chart = () => {
  const svg = React.useRef(null);
  React.useEffect(() => {
    drawChart(svg);
  }, [svg]);

  const outerRadius = 200;
  const innerRadius = 0;
  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 300,
  };

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  function drawChart(svgRef) {
    const data = [
      { label: "Rainy", value: 10 },
      { label: "Sunny", value: 20 },
      { label: "Cloudy", value: 30 },
    ];

    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateCool)
      .domain([0, data.length]);

    // Create new svg
    const svg = d3
      .select(svgRef.current)
      .attr(
        "viewbox",
        `0 0 ${height + margin.top + margin.bottom} ${
          width + margin.left + margin.right
        }`
      )
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.valueOf());

    const arc = svg
      .selectAll()
      .data(pieGenerator(data.map((d) => d.value)))
      .enter();

    // Append arcs
    arc
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", (_, i) => colorScale(i))
      .style("stroke", "#ffffff")
      .style("stroke-width", 0);

    // Append text labels
    arc
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text((d) => d.value)
      .style("fill", (_, i) => colorScale(data.length - i))
      .attr("transform", (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }

  return (
    // <div id="chart" ref={svg} />
    // <div id="chart">
    <svg width={width} height={height} ref={svg} />
    // </div>
  );
};

export default Chart;
