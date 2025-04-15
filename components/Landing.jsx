import { Link } from "react-router-dom";

export default function Landing() {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-row items-center space-x-6 text-white">
          <img
            src="https://roark.ai/_next/image?url=%2Flogos%2Froark-logo.png&w=1080&q=75"
            className="h-24 w-24"
            alt="Roark Logo"
          />
          <div className="flex flex-col space-y-1 text-left text-base leading-snug font-semibold">
            <Link to="/1">Median Advertised Salaries in STEM Occupations by U.S. County</Link>
            <Link to="/2">In-Demand Specialized Skills by Posting Share and Growth</Link>
            <Link to="/3">Minimum Education Requirements in Job Postings</Link>
            <Link to="/4">Occupational Job Postings vs Actual Hires – 2023</Link>
            <Link to="/5">Top Software Skills by Demand and Growth Potential</Link>
          </div>
        </div>
      </div>
    );
  }
  