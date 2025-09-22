"use client";

import React from "react";
import {
  Sankey,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SankeyNode {
  name: string;
}

interface SankeyLink {
  source: number;
  target: number;
  value: number;
}

interface SankeyChartProps {
  data: {
    nodes: SankeyNode[];
    links: SankeyLink[];
  };
  height?: number;
}

export default function SankeyChart({ data, height = 400 }: SankeyChartProps) {
  return (
    <div className="w-full h-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={data}
          nodePadding={20}
          margin={{ left: 20, right: 20, top: 20, bottom: 20 }}
          linkCurvature={0.5}
        >
          <Tooltip />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}