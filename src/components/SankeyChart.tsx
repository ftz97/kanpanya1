"use client";

import React from "react";
import { Sankey, ResponsiveContainer, Tooltip } from "recharts";

export default function SankeyChart() {
  const data = {
    nodes: [
      { name: "Source A" },
      { name: "Source B" },
      { name: "Target C" },
    ],
    links: [
      { source: 0, target: 2, value: 10 },
      { source: 1, target: 2, value: 5 },
    ],
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={data}
          nodePadding={20}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <Tooltip />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}