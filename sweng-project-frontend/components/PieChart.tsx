import * as React from "react";
import * as d3 from "d3";

function drawChart(svgRef: React.RefObject<SVGSVGElement>) {
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

    // Create new svg
    const svg = d3
      .select(svgRef.current)
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
