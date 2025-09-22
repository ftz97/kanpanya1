"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { AreaOption } from "./SearchValidate";

type Props = {
  validatedAreas: AreaOption[];
};

const rawData: Record<string, number[]> = {
  // Martinique
  "fort-de-france": [320, 250, 400, 380, 500, 650, 420],
  "le-lamentin": [210, 190, 300, 280, 350, 420, 310],
  "schoelcher": [180, 220, 260, 310, 400, 500, 350],
  "saint-pierre": [120, 140, 180, 200, 250, 300, 220],
  "sainte-marie": [90, 110, 150, 170, 220, 280, 190],
  "le-marin": [80, 100, 130, 150, 200, 250, 170],
  "rue-victor-hugo": [80, 60, 90, 100, 150, 200, 130],
  "rue-de-la-republique": [70, 50, 80, 90, 140, 180, 120],
  "centre-ville-fdf": [200, 180, 250, 280, 350, 450, 300],
  "terres-sainville": [150, 170, 200, 230, 300, 380, 250],
  
  // Guadeloupe
  "pointe-a-pitre": [280, 220, 350, 320, 450, 580, 380],
  "basse-terre": [190, 170, 280, 260, 320, 400, 290],
  "les-abymes": [160, 200, 240, 290, 380, 480, 330],
  "rue-frebault": [60, 50, 80, 90, 130, 180, 110],
  
  // France métropolitaine
  "paris": [1200, 1000, 1500, 1400, 1800, 2200, 1600],
  "lyon": [800, 700, 1000, 950, 1200, 1500, 1100],
  "marseille": [600, 550, 750, 700, 900, 1100, 800],
  
  // International
  "london": [1500, 1300, 1800, 1700, 2200, 2600, 1900],
  "new-york": [2000, 1800, 2500, 2300, 3000, 3500, 2700],
  "tokyo": [1800, 1600, 2200, 2000, 2600, 3000, 2300],
};

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const colors = ["#17BFA0", "#FF6B6B", "#4E79A7", "#F2C94C"];

export default function ComparisonChart({ validatedAreas }: Props) {
  if (validatedAreas.length === 0) return null;

  const data = days.map((day, i) => {
    const entry: Record<string, any> = { day };
    validatedAreas.forEach((area) => {
      entry[area.label] = rawData[area.value]?.[i] || 0;
    });
    return entry;
  });

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#eee" />

          {validatedAreas.map((area, idx) => (
            <Line
              key={area.value}
              type="monotone"
              dataKey={area.label}
              name={area.label}
              stroke={colors[idx % colors.length]}
              strokeWidth={3}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Explication dynamique */}
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">Explication :</h2>
        {validatedAreas.map((area, idx) => (
          <p key={area.value} className="text-sm">
            <span
              className="inline-block w-3 h-3 mr-2 rounded"
              style={{ backgroundColor: colors[idx % colors.length] }}
            />
            {area.label} → courbe {idx + 1}, données de fréquentation hebdomadaire
          </p>
        ))}
      </div>
    </div>
  );
}
