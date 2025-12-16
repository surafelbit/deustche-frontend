import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Example data with added teacher field and department head
const departmentData = {
  math: {
    id: "math",
    name: "Mathematics",
    description: "All Mathematics courses for undergraduates.",
    departmentHead: "Dr. Emily Carter",
    years: [
      {
        id: "year1",
        name: "1st Year",
        semesters: [
          {
            id: "sem1",
            name: "Semester 1",
            courses: [
              {
                id: "c1",
                name: "Calculus I",
                code: "MATH101",
                creditHours: 3,
                prerequisites: [],
                teacher: "Dr. John Smith",
              },
              {
                id: "c2",
                name: "Linear Algebra I",
                code: "MATH102",
                creditHours: 3,
                prerequisites: [],
                teacher: "Prof. Jane Doe",
              },
              {
                id: "c3",
                name: "Intro to Programming",
                code: "CS101",
                creditHours: 2,
                prerequisites: [],
                teacher: "Dr. Alan Turing",
              },
            ],
          },
          {
            id: "sem2",
            name: "Semester 2",
            courses: [
              {
                id: "c4",
                name: "Calculus II",
                code: "MATH201",
                creditHours: 3,
                prerequisites: ["MATH101"],
                teacher: "Dr. John Smith",
              },
              {
                id: "c5",
                name: "Linear Algebra II",
                code: "MATH202",
                creditHours: 3,
                prerequisites: ["MATH102"],
                teacher: "Prof. Jane Doe",
              },
              {
                id: "c6",
                name: "Probability",
                code: "STAT101",
                creditHours: 2,
                prerequisites: [],
                teacher: "Dr. Emma Brown",
              },
            ],
          },
        ],
      },
      {
        id: "year2",
        name: "2nd Year",
        semesters: [
          {
            id: "sem3",
            name: "Semester 3",
            courses: [
              {
                id: "c7",
                name: "Real Analysis I",
                code: "MATH301",
                creditHours: 3,
                prerequisites: ["MATH201"],
                teacher: "Prof. Michael Lee",
              },
              {
                id: "c8",
                name: "Abstract Algebra I",
                code: "MATH302",
                creditHours: 3,
                prerequisites: [],
                teacher: "Dr. Sarah Johnson",
              },
            ],
          },
        ],
      },
    ],
  },
};

export default function DeanDepartmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dept = id ? departmentData[id] : null;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [showWithPrereqsOnly, setShowWithPrereqsOnly] = useState(false);

  if (!dept) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Department Not Found
        </h1>
      </div>
    );
  }

  // Collect unique teachers
  const allTeachers = [
    ...new Set(
      dept.years.flatMap((year) =>
        year.semesters.flatMap((sem) => sem.courses.map((c) => c.teacher))
      )
    ),
  ].sort();

  return (
    <div className="p-10 space-y-10">
      {/* Go Back Button */}
      <div>
        <Button
          className="bg-blue-600 text-white "
          onClick={() => navigate(-1)}
          variant="outline"
          size="sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Header */}
      <div className="bg-blue-500 p-8 rounded-2xl shadow-lg text-white">
        <h1 className="text-4xl font-bold">{dept.name}</h1>
        <p className="mt-2 text-lg">{dept.description}</p>
        <p className="mt-2 text-lg font-semibold">
          Department Head: {dept.departmentHead}
        </p>
      </div>

      {/* Filters Section */}
      <div className="space-y-4 max-w-md">
        {/* Search by course name or code */}
        <input
          type="text"
          placeholder="Search by course name or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700"
        />

        {/* Filter by teacher */}
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700"
        >
          <option value="">All Teachers</option>
          {allTeachers.map((teacher) => (
            <option key={teacher} value={teacher}>
              {teacher}
            </option>
          ))}
        </select>

        {/* Filter by prerequisites */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="prereqs-checkbox"
            checked={showWithPrereqsOnly}
            onChange={(e) => setShowWithPrereqsOnly(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="prereqs-checkbox"
            className="text-gray-800 dark:text-gray-100"
          >
            Show only courses with prerequisites
          </label>
        </div>
      </div>

      {/* Years & Semesters */}
      {dept.years.map((year) => (
        <div key={year.id} className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {year.name}
          </h2>

          {year.semesters.map((sem) => {
            let filteredCourses = sem.courses.filter(
              (c) =>
                (c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  c.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
                (selectedTeacher === "" || c.teacher === selectedTeacher) &&
                (!showWithPrereqsOnly || c.prerequisites.length > 0)
            );
            if (filteredCourses.length === 0) return null;

            return (
              <div
                key={sem.id}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 space-y-4"
              >
                <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
                  {sem.name}
                </h3>

                <table className="w-full border-collapse text-gray-800 dark:text-gray-200">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                      <th className="p-3 border">Course Code</th>
                      <th className="p-3 border">Course Name</th>
                      <th className="p-3 border">Credit Hours</th>
                      <th className="p-3 border">Prerequisites</th>
                      <th className="p-3 border">Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((course) => (
                      <tr
                        key={course.id}
                        className="hover:scale-102 hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-md transition-all duration-300 ease-in-out"
                      >
                        <td className="p-3 border font-mono">{course.code}</td>
                        <td className="p-3 border">{course.name}</td>
                        <td className="p-3 border text-center">
                          {course.creditHours}
                        </td>
                        <td className="p-3 border">
                          {course.prerequisites.length > 0
                            ? course.prerequisites.join(", ")
                            : "None"}
                        </td>
                        <td className="p-3 border">{course.teacher}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
