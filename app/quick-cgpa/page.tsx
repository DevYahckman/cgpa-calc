"use client";

import type React from "react";

import { useState } from "react";
import Top from "../components/top/Top";

export default function QuickCGPAPage() {
  const [tcp, setTcp] = useState("");
  const [tcu, setTcu] = useState("");
  const [cgpa, setCgpa] = useState<number | null>(null);

  const calculateCGPA = (e: React.FormEvent) => {
    e.preventDefault();
    const tcpValue = Number.parseFloat(tcp);
    const tcuValue = Number.parseFloat(tcu);
    if (tcpValue && tcuValue) {
      const result = tcpValue / tcuValue;
      setCgpa(Number.parseFloat(result.toFixed(2)));
    }
  };

  return (
    <div>
      <Top
        heading={"Quick CGPA Calculator"}
        subHeading={
          "Instantly calculate your cumulative GPA in seconds. Just input your semesters and let the numbers speak."
        }
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Quick CGPA Calculator
              </h2>
              <form className="space-y-6" onSubmit={calculateCGPA}>
                <div>
                  <label
                    htmlFor="tcp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total Credit Points (TCP)
                  </label>
                  <input
                    id="tcp"
                    name="tcp"
                    type="number"
                    required
                    value={tcp}
                    onChange={(e) => setTcp(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="tcu"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total Credit Units (TCU)
                  </label>
                  <input
                    id="tcu"
                    name="tcu"
                    type="number"
                    required
                    value={tcu}
                    onChange={(e) => setTcu(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Calculate CGPA
                  </button>
                </div>
              </form>

              {cgpa !== null && (
                <div className="mt-6 text-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    Your CGPA:
                  </h3>
                  <p className="mt-2 text-3xl font-bold text-blue-600">
                    {cgpa}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
