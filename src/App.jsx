import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([
    { id: 1, class: "Math", department: "Science" },
    { id: 2, class: "English", department: "Language" },
    { id: 3, class: "History", department: "Social Studies" },
  ]);

  const [classData, setClassData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  async function getClassData() {
    const response = await fetch("http://localhost:5000/classes");
    const jsonData = await response.json();
    console.log(jsonData);
    setClassData(jsonData);
  }
  async function getDepartmentData() {
    const response = await fetch("http://localhost:5000/departments");
    const jsonData = await response.json();
    console.log(jsonData);
    setDepartmentData(jsonData);
  }

  useEffect(() => {
    getClassData();
    getDepartmentData();
  }, []);

  return (
    <div className="overflow-x-auto w-3/4 m-auto mt-14 ">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
              ID
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
              Class
            </th>
            <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
              Department
            </th>
            <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr key={Math.random()}>
            <td>
              {classData.map((item) => {
                return (
                  <div
                    className="px-6 py-4 whitespace-nowrap text-center"
                    key={item.class_id}
                  >
                    {item.class_id}
                  </div>
                );
              })}
            </td>
            <td>
              {classData.map((item) => {
                return (
                  <div
                    className="px-6 py-4 whitespace-nowrap text-center"
                    key={item.class_id}
                  >
                    {item.name}
                  </div>
                );
              })}
            </td>

            <td>
              {classData.map((classItem) => {
                function overseasSolver() {
                  for (const item of departmentData) {
                    if (item.department_id === classItem.department_id) {
                      console.log(item.name);
                      return item.name;
                    }
                  }
                }
                const departmentName = overseasSolver();
                return (
                  <div
                    className="px-6 py-4 whitespace-nowrap text-center"
                    key={classItem.department_id}
                  >
                    {departmentName}
                  </div>
                );
              })}
            </td>
            {classData.map((item) => {
              return (
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium flex text-center justify-center"
                  value={item.class_id}
                  key={item.class_id}
                >
                  <button
                    className="text-indigo-600 hover:text-indigo-900 mr-2 "
                    onClick={(e) => console.log(e)}
                  >
                    Update
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
