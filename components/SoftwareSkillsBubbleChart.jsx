import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';

const TopSoftwareSkills = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Papa.parse(
      'https://raw.githubusercontent.com/gk-j/BPIR/refs/heads/main/Top%20Software%20Programs.csv',
      {
        download: true,
        header: false, // treat all rows as data
        skipEmptyLines: true,
        complete: (results) => {
          const raw = results.data;
          const headers = [
            "Skills",
            "Postings",
            "% of Total Postings",
            "Profiles",
            "% of Total Profiles",
            "Projected Skill Growth",
            "Skill Growth Relative to Market"
          ];

          // Use row 2 onwards; skip fake header row (row 0)
          const cleaned = raw.slice(3).map(row => {
            const obj = {};
            headers.forEach((key, index) => {
              obj[key] = row[index];
            });
            return obj;
          });
        //   console.log(cleaned)
          const x = cleaned.map(d => parseFloat(d["% of Total Postings"].replace('%', '')));
          const y = cleaned.map(d => parseFloat(d["Projected Skill Growth"].replace('%', '')));
          const size = cleaned.map(d => Math.sqrt(parseFloat(d["Postings"])));
          const labels = cleaned.map(d => d["Skills"]+" ("+d["Skill Growth Relative to Market"]+")");
          console.log(size)
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
    <div className="h-screen w-screen flex justify-center items-center">
            <div className="flex flex-col items-center space-x-6 text-white">
            <h1>Top Software Skills by Demand and Growth Potential</h1>
            <Link to="/" className="text-blue-500 underline mb-6">← Back</Link>
              <div className="flex flex-col space-y-1 text-left text-base leading-snug font-semibold">
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
            width: 1000,
            margin: { t: 60, l: 80, r: 30, b: 70 }
          }}
      />
              </div>
            </div>
          </div>
    
  );
};

export default TopSoftwareSkills;