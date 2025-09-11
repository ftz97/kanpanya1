"use client";

import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
import { useEffect, useRef } from "react";

type SankeyNode = { name: string };
type SankeyLink = { source: number; target: number; value: number };

const data = {
  nodes: [
    { name: "Clients" },
    { name: "Commerçants" },
    { name: "Réductions" },
    { name: "Tickets Diamant" },
  ] as SankeyNode[],
  links: [
    { source: 0, target: 1, value: 120 },
    { source: 1, target: 2, value: 80 },
    { source: 1, target: 3, value: 40 },
  ] as SankeyLink[],
};

export default function SankeyChart() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 500;
    const height = 300;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // reset

    const sankeyGen = sankey<SankeyNode, SankeyLink>()
      .nodeWidth(20)
      .nodePadding(20)
      .extent([
        [1, 1],
        [width - 1, height - 6],
      ]);

    const { nodes, links } = sankeyGen({
      nodes: data.nodes.map((d) => Object.assign({}, d)),
      links: data.links.map((d) => Object.assign({}, d)),
    });

    // Links
    svg
      .append("g")
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", "#9CA3AF")
      .attr("stroke-width", (d: any) => Math.max(1, d.width))
      .attr("fill", "none")
      .attr("opacity", 0.6);

    // Nodes
    svg
      .append("g")
      .selectAll("rect")
      .data(nodes)
      .join("rect")
      .attr("x", (d: any) => d.x0)
      .attr("y", (d: any) => d.y0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .attr("width", (d: any) => d.x1 - d.x0)
      .attr("fill", "#10B981");

    // Labels
    svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("x", (d: any) => d.x0 - 6)
      .attr("y", (d: any) => (d.y0 + d.y1) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text((d: any) => d.name)
      .filter((d: any) => d.x0 < width / 2)
      .attr("x", (d: any) => d.x1 + 6)
      .attr("text-anchor", "start");
  }, []);

  return <svg ref={svgRef} width="100%" height="300"></svg>;
}