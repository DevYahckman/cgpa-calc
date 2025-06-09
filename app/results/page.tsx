"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Top from "../components/top/Top";


interface Course {
  name: string;
  score: string;
  credits: string;
}

interface SemesterResult {
  semester: string;
  courses: Course[];
}

export default function ResultsPage() {
  const [results, setResults] = useState<SemesterResult[]>([]);
  const [editingSemester, setEditingSemester] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedResults = JSON.parse(
      localStorage.getItem("semesterResults") || "[]"
    );
    setResults(storedResults);
  }, []);

  const handleEdit = (semester: string) => {
    // Navigate to edit page with semester data
    const semesterData = results.find((result) => result.semester === semester);
    if (semesterData) {
      // Store the semester data temporarily for editing
      localStorage.setItem("editingSemester", JSON.stringify(semesterData));
      router.push(`/edit/${encodeURIComponent(semester)}`);
    }
  };

  const handleSave = (updatedSemester: SemesterResult) => {
    const updatedResults = results.map((result) =>
      result.semester === updatedSemester.semester ? updatedSemester : result
    );
    setResults(updatedResults);
    localStorage.setItem("semesterResults", JSON.stringify(updatedResults));
    setEditingSemester(null);
  };
  

  const getGradeFromScore = (score: number) => {
    if (score >= 70) return "A";
    if (score >= 60) return "B";
    if (score >= 50) return "C";
    if (score >= 45) return "D";
    if (score >= 40) return "E";
    return "F";
  };

  const getGradePointFromScore = (score: number) => {
    if (score >= 70) return 4;
    if (score >= 60) return 3;
    if (score >= 50) return 2;
    if (score >= 45) return 1;
    return 0;
  };

  const calculateGPA = (courses: Course[]) => {
    const totalCredits = courses.reduce(
      (sum, course) => sum + Number.parseFloat(course.credits),
      0
    );
    const totalGradePoints = courses.reduce((sum, course) => {
      const score = Number.parseFloat(course.score);
      const gradePoint = getGradePointFromScore(score);
      return sum + gradePoint * Number.parseFloat(course.credits);
    }, 0);
    return (totalGradePoints / totalCredits).toFixed(2);
  };

  const getGradePoint = (grade: string) => {
    const gradePoints: { [key: string]: number } = {
      A: 4,
      B: 3,
      C: 2,
      D: 1,
      F: 0,
    };
    return gradePoints[grade.toUpperCase()] || 0;
  };
  console.log(handleSave, editingSemester, getGradePoint);

  return (
    <div>
      <Top
        heading={"Your Academic Journey at a Glance"}
        subHeading={
          "Review your semester results, track your GPA, and stay motivated as you move closer to your academic goals."
        }
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 sm:p-10">
              <div className=" items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  Your Results
                </h1>
              
              </div>
              {results.map((result) => (
                <div
                  key={result.semester}
                  className="mb-8 bg-gray-50 rounded-lg p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {result.semester}
                    </h3>
                    <button
                      onClick={() => handleEdit(result.semester)}
                      className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="space-y-2">
                    {result.courses.map((course, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="font-medium text-gray-700">
                          {course.name}
                        </span>
                        <span className="text-gray-600">
                          Score: {course.score} (
                          {getGradeFromScore(Number.parseFloat(course.score))}),
                          Credits: {course.credits}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">
                        Semester GPA
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {calculateGPA(result.courses)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/record"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
            >
              Add New Semester
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
