"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey } from "d3-sankey";

interface SankeyData {
  nodes: { name: string }[];
  links: { source: number; target: number; value: number }[];
}

interface SankeyChartProps {
  data: SankeyData;
  width?: number;
  height?: number;
}

export default function SankeyChart({ data, width = 600, height = 400 }: SankeyChartProps) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Clear previous content
    d3.select(ref.current).selectAll("*").remove();

    // ✅ Données Konpanya
    const graphData = {
      nodes: [
        { name: "Clients" },
        { name: "Commerçants" },
        { name: "Réductions" },
        { name: "Tickets Diamant" },
      ],
      links: [
        { source: "Clients", target: "Commerçants", value: 120 },
        { source: "Commerçants", target: "Réductions", value: 80 },
        { source: "Commerçants", target: "Tickets Diamant", value: 40 },
      ],
    };

    const svg = d3.select(ref.current);

    const sankeyGenerator = sankey<any, any>()
      .nodeId((d: any) => d.name) // ✅ match par nom
      .nodeWidth(20)
      .nodePadding(15)
      .extent([
        [1, 1],
        [width - 1, height - 6],
      ]);

    const { nodes, links } = sankeyGenerator(graphData);

    // Nœuds
    svg
      .append("g")
      .selectAll("rect")
      .data(nodes)
      .enter()
      .append("rect")
      .attr("x", (d) => d.x0!)
      .attr("y", (d) => d.y0!)
      .attr("height", (d) => d.y1! - d.y0!)
      .attr("width", (d) => d.x1! - d.x0!)
      .attr("fill", "#17BFA0");

    // Labels
    svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("x", (d) => d.x0! - 6)
      .attr("y", (d) => (d.y0! + d.y1!) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text((d) => d.name);

    // Liens avec courbe personnalisée
    svg
      .append("g")
      .attr("fill", "none")
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("d", (d: any) => {
        const sourceX = d.source.x1;
        const sourceY = d.source.y0 + d.width / 2;
        const targetX = d.target.x0;
        const targetY = d.target.y0 + d.width / 2;
        return `M${sourceX},${sourceY}C${(sourceX + targetX) / 2},${sourceY} ${(sourceX + targetX) / 2},${targetY} ${targetX},${targetY}`;
      })
      .attr("stroke", "#aaa")
      .attr("stroke-width", (d) => Math.max(1, d.width!))
      .attr("opacity", 0.5);
  }, [width, height]);

  return <svg ref={ref} width={width} height={height}></svg>;
}
