import React, { useEffect, useRef } from "react";
import Plotly from 'plotly.js-dist-min'
import * as d3 from "d3";
import { Link } from "react-router-dom";

const JobMap = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const csvUrl =
      "https://raw.githubusercontent.com/gk-j/BPIR/refs/heads/main/Job_Postings_by_Location_STEM_Occupations_SOC_2021_in_3194_Counties_8653.csv";

    d3.csv(csvUrl).then((rows) => {
      const lat = [];
      const lon = [];
      const salary = [];
      const text = [];
      const name=[];
      rows.forEach((row) => {
        const county = row["County"];
        const countyName = row["County Name"];
        const latitude = parseFloat(row["latitude"]);
        const longitude = parseFloat(row["longitude"]);
        const medSalary = (row["Median Annual Advertised Salary"]);
        const cleanedSalary = parseFloat(medSalary.replace(/\$|,/g, ""));

        if ((latitude) && (longitude) && (medSalary)) {
          lat.push(latitude);
          lon.push(longitude);
          salary.push(cleanedSalary);
          name.push(countyName)
          text.push(`${countyName}<br>Salary: $${cleanedSalary}`);
        }
      });

      const data = [
        {
          type: "scattergeo",
          mode: "markers",
          lat: lat,
          lon: lon,
          text: text,
          marker: {
            size: 6,
            color: salary,
            colorscale: "Viridis",
            colorbar: {
              title: "Median Salary",
              tickprefix: "$",
            },
            line: {
              width: 0.5,
              color: "white",
            },
          },
        },
      ];

      const layout = {
        title: "Median Advertised Salaries by County (U.S.)",
        geo: {
          scope: "usa",
          showland: true,
          landcolor: "#EAEAAE",
          subunitcolor: "#d3d3d3",
          countrycolor: "#d3d3d3",
          countrywidth: 1.5,
          subunitwidth: 1,
          showlakes: true,
          lakecolor: "#fff"
        },
        margin: { t: 50, r: 0, l: 0, b: 0 }
      };

      Plotly.newPlot(chartRef.current, data, layout);
    });
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col items-center space-x-6 text-white">
        <h1>Median Advertised Salaries in STEM Occupations by U.S. County</h1>
        <Link to="/" className="text-blue-500 underline mb-6">← Back</Link>
          <div className="flex flex-col space-y-1 text-left text-base leading-snug font-semibold">
          <div ref={chartRef} style={{ width: "100%", height: "600px" }} />
          </div>
        </div>
      </div>
    );
};

export default JobMap;