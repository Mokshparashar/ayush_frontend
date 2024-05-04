import  { useEffect, useRef, useState } from "react";

function Create({ setAddNewModal }) {
  const [className, setClassName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departmentData, setDepartmentData] = useState([]);
  const parent = useRef();
  const handleClassNameChange = (e) => {
    setClassName(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    console.log(e.target.value);
  };

  async function getDepartmentData() {
    const response = await fetch("http://localhost:5000/departments");
    const jsonData = await response.json();
    console.log(jsonData);
    setDepartmentData(jsonData);
  }

  useEffect(() => {
    getDepartmentData();
  }, []);

  function handleParentClick(e) {
    if (e.target === parent.current) setAddNewModal(false);
  }

  async function handleSubmit(e) {
    console.log(className, departmentData);
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          name: className,
          department_id: selectedDepartment,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    window.location.replace("http://localhost:5173");
  }
  return (
    <div
      className="w-lvw h-lvh  flex items-center justify-center absolute top-0 z-30 blur-bg transition-all duration-500"
      onClick={handleParentClick}
      ref={parent}
    >
      <div className="w-1/4 h-1/3 bg-white  border  box-shadow  p-8">
        <h2 className="text-xl font-semibold mb-4">Create a New Class</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="className"
              className="block text-sm font-medium text-gray-700"
            >
              Class Name:
            </label>
            <input
              type="text"
              id="className"
              value={className}
              onChange={handleClassNameChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300"
              required
            />
          </div>
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Department:
            </label>
            <select
              id="department"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300"
              required
            >
              <option value="">Select Department</option>
              {departmentData.map((department) => (
                <option
                  key={department.department_id}
                  value={department.department_id}
                >
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Create Class
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
