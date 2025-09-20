"use client";

import { motion } from "framer-motion";

export default function RecommendationsTable({ filteredRecommendations }: { filteredRecommendations: any[] }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clics</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impressions</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredRecommendations.map((rec, index) => (
          <motion.tr
            key={rec.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="hover:bg-gray-50"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.clicks}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.impressions}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rec.ctr}%</td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
}
