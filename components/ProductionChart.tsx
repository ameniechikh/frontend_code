import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ProductionChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null); // Référence pour stocker l'instance du graphique

  useEffect(() => {
    // Nettoyer l'ancienne instance de graphique si elle existe
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Détruit le graphique existant
    }

    // Créer une nouvelle instance de graphique
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'line', // Type de graphique
          data: {
            labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'], // Jours de la semaine
            datasets: [
              {
                label: 'Production (pièces)', // Légende du graphique
                data: [100, 150, 200, 180, 220, 170, 250], // Données de production
                fill: false, // Pas de remplissage sous la courbe
                borderColor: 'rgba(75, 192, 192, 1)', // Couleur de la courbe
                tension: 0.1, // Lissage de la courbe
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Jour de la Semaine',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Nombre de Pièces',
                },
                min: 0,
              },
            },
          },
        });
      }
    }

    // Retourner une fonction de nettoyage pour nettoyer le graphique lorsque le composant est démonté
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Le tableau de dépendances vide garantit que l'effet ne se déclenche qu'une seule fois

  return (
    <div className="w-full h-64">
      <canvas ref={chartRef}></canvas> {/* Ceci est l'élément canvas pour Chart.js */}
    </div>
  );
};

export default ProductionChart;
