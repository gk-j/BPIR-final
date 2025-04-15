// EducationPieChart.js
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";
import { Link } from "react-router-dom";

const EducationPieChart = () => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    const csvUrl =
      "https://raw.githubusercontent.com/gk-j/BPIR/refs/heads/main/min_education.csv";

    Papa.parse(csvUrl, {
      download: true,
      skipEmptyLines: true,
      complete: (results) => {
        const raw = results.data;

        // Custom headers you provided
        const headers = [
          "Minimum Education Level",
          "Unique Postings (minimum)",
          "Unique Postings (max advertised)",
          "% of Total (minimum)"
        ];

        // Skip the first 2 rows, map the rest using the headers
        const cleaned = raw.slice(2).map((row) => {
          const obj = {};
          headers.forEach((key, index) => {
            obj[key] = row[index];
          });
          return obj;
        });

        // Extract data for the pie chart
        const levels = [];
        const percentages = [];

        cleaned.forEach((row) => {
          const level = row["Minimum Education Level"];
          const percent = parseFloat(row["% of Total (minimum)"]);

          if (level && !isNaN(percent)) {
            levels.push(level);
            percentages.push(percent);
          }
        });

        setLabels(levels);
        setValues(percentages);
      },
    });
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col items-center space-x-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Minimum Education Requirements in Job Postings</h2>
        <p className="text-center">This component displays a pie chart of job postings segmented by minimum education level required. It uses publicly available data to calculate the percentage of postings requiring different education levels such as high school, associate's degree, bachelor's degree, master's degree, and doctoral degree. The chart gives a quick view of how education requirements are distributed in the labor market.</p>
        <Link to="/" className="text-blue-500 underline mb-6">← Back</Link>
      <div className="flex flex-col space-y-1 text-left text-base leading-snug font-semibold">
        <div className="w-full flex justify-center">
            <div className="w-[600px] mx-auto">
      <Plot
        data={[
          {
            type: "pie",
            labels: labels,
            values: values,
            textinfo: "label+percent",
            hoverinfo: "label+percent+value",
            marker: {
              colors: ["#FF6384", "#36A2EB", "#FFCE56", "#8E44AD", "#2ECC71"],
            },
          },
        ]}
        layout={{
          title: "Minimum Education Requirement – Job Postings Distribution",
          height: 400,
          width: 600,
        }}
        config={{ responsive: true }}
      />
        </div>
      </div>
      </div>
    </div>
  </div>
  );
};

export default EducationPieChart;
