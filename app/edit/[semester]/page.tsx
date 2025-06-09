"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
// import GradingScale from "@/components/grading-scale"

interface Course {
  name: string
  score: string
  credits: string
}

// Add the helper functions:
const getGradeFromScore = (score: number) => {
  if (score >= 70) return "A"
  if (score >= 60) return "B"
  if (score >= 50) return "C"
  if (score >= 45) return "D"
  if (score >= 40) return "E"
  return "F"
}

interface SemesterResult {
  semester: string
  courses: Course[]
}

export default function EditPage() {
  const [semester, setSemester] = useState("")
  const [courses, setCourses] = useState<Course[]>([{ name: "", score: "", credits: "" }])
  const [originalSemester, setOriginalSemester] = useState("")
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    // Load the semester data from localStorage
    const editingData = localStorage.getItem("editingSemester")
    if (editingData) {
      const semesterData: SemesterResult = JSON.parse(editingData)
      setSemester(semesterData.semester)
      setCourses(semesterData.courses.length > 0 ? semesterData.courses : [{ name: "", score: "", credits: "" }])
      setOriginalSemester(semesterData.semester)
    } else {
      // Fallback: try to find the semester in stored results
      const storedResults = JSON.parse(localStorage.getItem("semesterResults") || "[]")
      const decodedSemester = decodeURIComponent(params.semester as string)
      const semesterData = storedResults.find((result: SemesterResult) => result.semester === decodedSemester)

      if (semesterData) {
        setSemester(semesterData.semester)
        setCourses(semesterData.courses.length > 0 ? semesterData.courses : [{ name: "", score: "", credits: "" }])
        setOriginalSemester(semesterData.semester)
      }
    }
  }, [params.semester])

  const addCourse = () => {
    setCourses([...courses, { name: "", score: "", credits: "" }])
  }

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      const updatedCourses = courses.filter((_, i) => i !== index)
      setCourses(updatedCourses)
    }
  }

  const updateCourse = (index: number, field: keyof Course, value: string) => {
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

    // Get existing results
    const existingResults: SemesterResult[] = JSON.parse(localStorage.getItem("semesterResults") || "[]")

    // Update the specific semester
    const updatedResults = existingResults.map((result) => {
      if (result.semester === originalSemester) {
        return { semester, courses }
      }
      return result
    })

    // Save updated results
    localStorage.setItem("semesterResults", JSON.stringify(updatedResults))

    // Clean up temporary edit data
    localStorage.removeItem("editingSemester")

    // Navigate back to results
    router.push("/results")
  }

  const handleCancel = () => {
    localStorage.removeItem("editingSemester")
    router.push("/results")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="">
          <div className="md:flex-shrink-0">
            <Image
              className="h-48 w-full object-cover md:w-48"
              src="/placeholder.svg?height=200&width=200"
              alt="Edit results illustration"
              width={200}
              height={200}
            />
          </div>
          <div className="p-8 w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Edit Semester Results</h2>
     
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Courses</h3>
                {courses.map((course, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md relative">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-600">Course {index + 1}</span>
                      {courses.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCourse(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
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
                        className="block w-1/2 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                        min="0"
                        max="100"
                      />
                      <input
                        type="number"
                        placeholder="Credits"
                        value={course.credits}
                        onChange={(e) => updateCourse(index, "credits", e.target.value)}
                        className="block w-1/2 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                        min="1"
                        step="1"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addCourse}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Another Course
              </button>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


