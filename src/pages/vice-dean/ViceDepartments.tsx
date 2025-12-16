import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Stethoscope,
  HeartPulse,
  Pill,
} from "lucide-react";
import apiService from "@/components/api/apiService";
import endPoints from "@/components/api/endPoints";

interface Department {
  dptID: number;
  deptName: string;
  totalCrHr: number | null;
  departmentCode: string;
  icon: React.ReactNode;
  color: string;
}

// ✅ Fake data (mocked departments)
const fakeDepartments: Department[] = [
  {
    dptID: 1,
    deptName: "Nursing",
    totalCrHr: 120,
    departmentCode: "NUR",
    icon: <HeartPulse className="w-10 h-10" />,
    color: "from-green-500 to-emerald-600",
  },
  {
    dptID: 2,
    deptName: "Medicine",
    totalCrHr: 180,
    departmentCode: "MED",
    icon: <Stethoscope className="w-10 h-10" />,
    color: "from-red-500 to-pink-600",
  },
  {
    dptID: 3,
    deptName: "Computer Science",
    totalCrHr: 140,
    departmentCode: "CS",
    icon: <BookOpen className="w-10 h-10" />,
    color: "from-indigo-500 to-purple-600",
  },
];

export default function ViceDeanDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // For now: load fake data
    setDepartments(fakeDepartments);

    //Later: replace with API
    const getter = async () => {
      try {
        const response = await apiService.get(endPoints.departments);
        setDepartments(response);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };
    getter();
  }, []);

  return (
    <div className="space-y-12 px-8 py-8">
      {/* Hero Section */}
      <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 p-10 shadow-xl">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Department Management
        </h1>
        <p className="text-white mt-2 text-lg drop-shadow-md">
          Manage all academic departments and their courses
        </p>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
        {departments.map((dept) => (
          <div
            key={dept.dptID}
            onClick={() =>
              // navigate(`/vice-dean/departments/${dept.departmentCode}`)
              navigate(`/vice-dean/departments/math`)
            }
            className={`cursor-pointer h-62 rounded-3xl p-6 shadow-xl bg-gradient-to-r from-blue-500 to-blue-800 text-white flex flex-col justify-between transform hover:-translate-y-2 hover:shadow-2xl transition`}
          >
            <div className="flex items-center  gap-4">
              {dept.icon}
              <h2 className="text-2xl font-extrabold">{dept.deptName}</h2>
            </div>
            <div className="space-y-1">
              <p className="text-lg">📌 ID: {dept.dptID}</p>
              <p className="text-lg">🏷 Code: {dept.departmentCode}</p>
              <p className="text-lg">
                🎓 Total Credits:{" "}
                {dept.totalCrHr !== null ? dept.totalCrHr : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
