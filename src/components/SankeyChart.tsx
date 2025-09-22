"use client";

import { useEffect, useRef } from 'react';

export default function SankeyChart() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const width = 400;
    const height = 300;

    // Données de démonstration pour le flux commercial
    const data = {
      nodes: [
        { id: 'Centre-ville', x: 50, y: 100, width: 80, height: 40 },
        { id: 'Quartier Nord', x: 200, y: 50, width: 80, height: 40 },
        { id: 'Zone Est', x: 200, y: 150, width: 80, height: 40 },
        { id: 'Pizzeria', x: 350, y: 80, width: 60, height: 30 },
        { id: 'Coiffeur', x: 350, y: 120, width: 60, height: 30 },
        { id: 'Boutique', x: 350, y: 160, width: 60, height: 30 }
      ],
      links: [
        { source: 'Centre-ville', target: 'Pizzeria', value: 120 },
        { source: 'Centre-ville', target: 'Coiffeur', value: 80 },
        { source: 'Quartier Nord', target: 'Pizzeria', value: 90 },
        { source: 'Quartier Nord', target: 'Boutique', value: 60 },
        { source: 'Zone Est', target: 'Coiffeur', value: 70 },
        { source: 'Zone Est', target: 'Boutique', value: 50 }
      ]
    };

    // Nettoyer le SVG
    svg.innerHTML = '';

    // Dessiner les nœuds
    data.nodes.forEach(node => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', node.x.toString());
      rect.setAttribute('y', node.y.toString());
      rect.setAttribute('width', node.width.toString());
      rect.setAttribute('height', node.height.toString());
      rect.setAttribute('fill', '#3B82F6');
      rect.setAttribute('rx', '4');
      svg.appendChild(rect);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', (node.x + node.width / 2).toString());
      text.setAttribute('y', (node.y + node.height / 2).toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', 'white');
      text.setAttribute('font-size', '10');
      text.setAttribute('font-weight', 'bold');
      text.textContent = node.id;
      svg.appendChild(text);
    });

    // Dessiner les liens (simplifiés)
    data.links.forEach(link => {
      const sourceNode = data.nodes.find(n => n.id === link.source);
      const targetNode = data.nodes.find(n => n.id === link.target);
      
      if (sourceNode && targetNode) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = `M ${sourceNode.x + sourceNode.width} ${sourceNode.y + sourceNode.height / 2} 
                   L ${targetNode.x} ${targetNode.y + targetNode.height / 2}`;
        path.setAttribute('d', d);
        path.setAttribute('stroke', '#10B981');
        path.setAttribute('stroke-width', Math.max(2, link.value / 20).toString());
        path.setAttribute('fill', 'none');
        path.setAttribute('opacity', '0.7');
        svg.appendChild(path);
      }
    });

  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        ref={svgRef}
        width="400"
        height="300"
        className="border rounded-lg bg-gray-50"
      />
    </div>
  );
}