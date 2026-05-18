import { useEffect, useState } from "react";
import API from "../services/api";
import Chatbot from "./Chatbot";


function HRDashboard() {
  const [employees, setEmployees] = useState([]);

  const [search, setSearch] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");

      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold">
            HR Analytics Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Smart employee onboarding and
            workforce management system.
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-2xl"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <p className="text-gray-400">
            Total Employees
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {employees.length}
          </h2>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <p className="text-gray-400">
            Departments
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {
              [
                ...new Set(
                  employees.map(
                    (e) => e.department
                  )
                ),
              ].length
            }
          </h2>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <p className="text-gray-400">
            New Joiners
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {employees.length}
          </h2>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <p className="text-gray-400">
            AI Enabled
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Yes
          </h2>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Employee Overview
          </h2>

          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="pb-4">
                  Employee
                </th>

                <th className="pb-4">
                  Department
                </th>

                <th className="pb-4">
                  Position
                </th>

                <th className="pb-4">
                  Joining Date
                </th>
              </tr>
            </thead>

            <tbody>
              {employees
                .filter((emp) =>
                  emp.fullName
                    .toLowerCase()
                    .includes(
                      search.toLowerCase()
                    )
                )
                .map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b border-gray-800"
                  >
                    <td className="py-4">
                      {emp.fullName}
                    </td>

                    <td>
                      {emp.department}
                    </td>

                    <td>
                      {emp.position}
                    </td>

                    <td>
                      {emp.joiningDate}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-5">
            AI HR Insights
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-2xl">
              <h3 className="font-semibold">
                Hiring Trend
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                Engineering hiring is growing
                rapidly this quarter.
              </p>
            </div>

            <div className="bg-gray-800 p-4 rounded-2xl">
              <h3 className="font-semibold">
                Retention Analysis
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                Employee engagement improved
                compared to last month.
              </p>
            </div>

            <div className="bg-gray-800 p-4 rounded-2xl">
              <h3 className="font-semibold">
                AI Recommendation
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                Schedule onboarding workshops
                for new joiners.
              </p>
            </div>
          </div>
        </div>

        <div>
          <Chatbot />
        </div>
      </div>
    </div>
  );
}

export default HRDashboard;