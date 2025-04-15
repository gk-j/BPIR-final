import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';

const SpecializedSkillsBubbleChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Papa.parse(
      'https://raw.githubusercontent.com/gk-j/BPIR/refs/heads/main/Job_Posting_Analytics_8_Occupations_in_3194_Counties_5318.csv',
      {
        download: true,
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
          const raw = results.data;
          const headers = [
            "Postings",
            "Top Specialized Skills",
            "% of Total Postings",
            "Profiles",
            "% of Total Profiles",
            "Projected Skill Growth",
            "Skill Growth Relative to Market"
          ];

          const cleaned = raw.slice(2).map(row => {
            const obj = {};
            headers.forEach((key, index) => {
              obj[key] = row[index];
            });
            return obj;
          });

          const x = cleaned.map(d => parseFloat(d["% of Total Postings"].replace('%', '')));
          const y = cleaned.map(d => parseFloat(d["Projected Skill Growth"].replace('%', '')));
          const size = cleaned.map(d => Math.sqrt(parseFloat(d["Top Specialized Skills"])));
          const labels = cleaned.map(d => d["Postings"]);

          setChartData([
            {
              x,
              y,
              mode: 'markers',
              text: labels,
              marker: {
                size,
                color: y,
                colorscale: 'YlGnBu',
                sizemode: 'area',
                sizeref: 2.0 * Math.max(...size) / (100 ** 2),
                sizemin: 4,
                showscale: true
              },
              type: 'scatter'
            }
          ]);
        }
      }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h3 className="text-xl font-semibold mb-4">
        In-Demand Specialized Skills by Posting Share and Growth
      </h3>
      <p className="text-center">This bubble chart highlights top specialized skills based on their percentage of total job postings and projected growth rate. Each bubble represents a skill, with its size proportional to its volume of mentions in job postings. This visualization helps users quickly identify skills that are both in high demand and expected to grow significantly, offering valuable insights for workforce planning and career alignment.</p>

      <Link to="/" className="text-blue-500 underline mb-6">← Back</Link>

      <div className="w-full flex justify-center items-center ml-10">
        <div className="mx-auto">
          <Plot
            data={chartData}
            layout={{
              title: {
                text: 'Top Specialized Skills by Growth & Share',
                font: { size: 20 }
              },
              xaxis: {
                title: {
                  text: '% of Total Postings',
                  font: { size: 16 }
                },
                tickfont: { size: 12 }
              },
              yaxis: {
                title: {
                  text: 'Projected Growth (%)',
                  font: { size: 16 }
                },
                tickfont: { size: 12 }
              },
              height: 600,
              width: 900,
              margin: { t: 60, l: 80, r: 30, b: 70 }
            }}
            config={{ responsive: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default SpecializedSkillsBubbleChart;
