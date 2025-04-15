import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const JobPostingsTable = () => {
  const [rows, setRows] = useState([]);

  const toNumber = (value) => {
    if (!value) return 0;
    const cleaned = value.replace(/,/g, "").trim();
    const num = Number(cleaned);
    return isNaN(num) ? 0 : num;
  };

  useEffect(() => {
    const csvUrl =
      "https://raw.githubusercontent.com/gk-j/BPIR/refs/heads/main/Job%20Postings%20vs%20Hiring.csv";

    fetch(csvUrl)
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split("\n");

        // ✅ Row 5 (index 4) is the header
        const headerLine = lines[4];
        const dataLines = lines.slice(5);

        const cleanedCsv = [headerLine, ...dataLines].join("\n");

        Papa.parse(cleanedCsv, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsed = results.data.map((row) => {
              const occupation = row["Occupation"];
              const postingsStr = row["Avg Monthly Postings (Jan 2023 - Dec 2023)"];
              const hiresStr = row["Avg Monthly Hires (Jan 2023 - Dec 2023)"];

              const postings = toNumber(postingsStr);
              const hires = toNumber(hiresStr);
              const gap = postings - hires;
              const percentDiff =
                postings === 0 ? 0 : ((gap / postings) * 100).toFixed(1);

              return {
                Occupation: occupation,
                Postings: postingsStr || "0",
                Hires: hiresStr || "0",
                Gap: gap.toLocaleString(),
                PercentDifference: `${percentDiff}%`,
              };
            });

            setRows(parsed);
          },
        });
      });
  }, []);

  const conditionalRowStyles = [
    {
      when: (row) => toNumber(row.Gap) > 0,
      style: { backgroundColor: "#e8f5e9" },
    },
    {
      when: (row) => toNumber(row.Gap) < 0,
      style: { backgroundColor: "#ffebee" },
    },
  ];

  const columns = [
    {
      name: "Occupation",
      selector: (row) => row.Occupation,
      sortable: true,
      wrap: true,
    },
    {
      name: "Avg Monthly Postings",
      selector: (row) => row.Postings,
      sortable: true,
      right: true,
    },
    {
      name: "Avg Monthly Hires",
      selector: (row) => row.Hires,
      sortable: true,
      right: true,
    },
    {
      name: "Gap (Postings - Hires)",
      selector: (row) => row.Gap,
      sortable: true,
      right: true,
    },
    {
      name: "% Difference",
      selector: (row) => row.PercentDifference,
      sortable: true,
      right: true,
    },
  ];

  return (
    
    <div className="h-screen w-screen flex justify-center items-center">
    <div className="flex flex-col items-center space-x-6 text-white">
    <h2 className="text-xl font-bold mb-4">Job Postings vs Hires – Interactive Table (2023)</h2>
    <p className="text-center">This interactive table compares average monthly job postings with average monthly hires for a variety of occupations. It highlights the gap between demand (postings) and supply (hires), and calculates the percent difference, with color-coded rows for over- or under-supply. The component provides stakeholders with insight into potential labor shortages or oversaturation in specific fields.</p>
    <Link to="/" className="text-blue-500 underline mb-6">← Back</Link>
      <div className="flex flex-col space-y-1 text-left text-base leading-snug font-semibold">
      <DataTable
        columns={columns}
        data={rows}
        pagination
        striped
        highlightOnHover
        responsive
        dense
        conditionalRowStyles={conditionalRowStyles}
      />
      </div>
    </div>
  </div>
  );
};

export default JobPostingsTable;
