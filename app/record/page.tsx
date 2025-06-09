"use client";
import React from "react";
import Top from "../components/top/Top";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  

//   new**********************************************
 const [semester, setSemester] = useState("")
  const [courses, setCourses] = useState([{ name: "", score: "", credits: "" }])
  const router = useRouter()

  const addCourse = () => {
    setCourses([...courses, { name: "", score: "", credits: "" }])
  }

  const updateCourse = (index: number, field: string, value: string) => {
    const updatedCourses = courses.map((course, i) => {
      if (i === index) {
        return { ...course, [field]: value }
      }
      return course
    })
    setCourses(updatedCourses)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const existingResults = JSON.parse(localStorage.getItem("semesterResults") || "[]")
    const newResults = [...existingResults, { semester, courses }]
    localStorage.setItem("semesterResults", JSON.stringify(newResults))
    router.push("/results")
  }

  return (
    <div>
      <Top
        heading={"Add Your Academic Results "}
        subHeading={`Easily input your grades and keep track of your academic progress.Stay motivated and watch your GPA improve!`}
      />
      <div className="py-5">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Input Semester Results
        </h2>
         <form onSubmit={handleSubmit} className="space-y-6 md:p-10 md:px-28 p-5">
              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                  Semester
                </label>
                <input
                  type="text"
                  id="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              {courses.map((course, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                  <input
                    type="text"
                    placeholder="Course Name"
                    value={course.name}
                    onChange={(e) => updateCourse(index, "name", e.target.value)}
                    className="mb-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Score (0-100)"
                      value={course.score}
                      onChange={(e) => updateCourse(index, "score", e.target.value)}
                      className="mb-2 block w-1/2 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                      min="0"
                      max="100"
                    />
                    <input
                      type="number"
                      placeholder="Credits"
                      value={course.credits}
                      onChange={(e) => updateCourse(index, "credits", e.target.value)}
                      className="mb-2 block w-1/2 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addCourse}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Course
              </button>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Semester Results
                </button>
              </div>
            </form>
      </div>
    </div>
  );
};

export default Page;
