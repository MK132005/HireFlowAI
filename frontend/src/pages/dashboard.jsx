import Chatbot from "./Chatbot";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const departmentData = [];

employees.forEach((emp) => {
  const existing = departmentData.find(
    (d) => d.name === emp.department
  );

  if (existing) {
    existing.value += 1;
  } else {
    departmentData.push({
      name: emp.department,
      value: 1,
    });
  }
});

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
];

  const [formData, setFormData] = useState({
    fullName: "",
    department: "",
    position: "",
    salary: "",
    joiningDate: "",
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "document") {
      setFormData({
        ...formData,
        document: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("fullName", formData.fullName);
      data.append("department", formData.department);
      data.append("position", formData.position);
      data.append("salary", formData.salary);
      data.append("joiningDate", formData.joiningDate);

      if (formData.document) {
        data.append("document", formData.document);
      }

      const res = await API.post(
        "/employees/add",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(res.data.message);

      fetchEmployees();

      setFormData({
        fullName: "",
        department: "",
        position: "",
        salary: "",
        joiningDate: "",
        document: null,
      });
    } catch (error) {
      console.log(error);

      alert("Failed to add employee");
    }
  };
  const handleDelete = async (id) => {
  try {
    await API.delete(`/employees/delete/${id}`);

    alert("Employee Deleted");

    fetchEmployees();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black text-white p-5 flex justify-between">
        <h1 className="text-2xl font-bold">
          Employee Dashboard
        </h1>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="p-10">
        <div className="bg-white p-6 rounded shadow mb-10">
  <h2 className="text-2xl font-bold mb-5">
    Department Analytics
  </h2>

  <PieChart width={400} height={300}>
    <Pie
      data={departmentData}
      cx={200}
      cy={150}
      outerRadius={100}
      fill="#8884d8"
      dataKey="value"
      label
    >
      {departmentData.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={
            COLORS[index % COLORS.length]
          }
        />
      ))}
    </Pie>

    <Tooltip />

    <Legend />
  </PieChart>
</div>
        <div className="bg-white p-6 rounded shadow mb-10">
          <h2 className="text-2xl font-bold mb-5">
            Add Employee
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="border p-3"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              className="border p-3"
              value={formData.department}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="position"
              placeholder="Position"
              className="border p-3"
              value={formData.position}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="salary"
              placeholder="Salary"
              className="border p-3"
              value={formData.salary}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="joiningDate"
              className="border p-3"
              value={formData.joiningDate}
              onChange={handleChange}
              required
            />

            <input
              type="file"
              name="document"
              className="border p-3"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="bg-black text-white p-3 rounded"
            >
              Add Employee
            </button>
          </form>
        </div>
       <input
  type="text"
  placeholder="Search Employee..."
  className="border p-3 mb-5 w-full"
  onChange={(e) => setSearch(e.target.value)}
/>

        <div className="grid grid-cols-3 gap-5">
          {employees
            .filter((emp) =>
                emp.fullName
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
            .map((emp) => (
            <div
              key={emp.id}
              className="bg-white p-5 rounded shadow"
            >
              <h2 className="text-2xl font-bold">
                {emp.fullName}
              </h2>

              <p>{emp.department}</p>

              <p>{emp.position}</p>

              <p>{emp.salary}</p>

              <p>{emp.joiningDate}</p>
              <button
                onClick={() => handleDelete(emp.id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-3"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <Chatbot />
    </div>
  );
}

export default Dashboard;