import React, { useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import Create from "./components/Create";
import Delete from "./components/Delete";
function App() {
  const [classData, setClassData] = useState([]);
  const [singleClassData, setSingleClassData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [addNewModal, setAddNewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  async function getClassData() {
    const response = await fetch("http://localhost:5000/classes");
    const jsonData = await response.json();
    console.log(jsonData);
    setClassData(jsonData);
  }

  async function getAllData() {
    const response = await fetch("http://localhost:5000");
    const jsonData = await response.json();
    setAllData(jsonData);
  }
  useEffect(() => {
    getClassData();

    getAllData();
  }, []);

  async function handleDelete(id) {
    setDeleteModal(true);
    // console.log(id);
    const response = await fetch(`http://localhost:5000/classes/${id}`, {
      method: "GET",
    });
    const jsonData = await response.json();
    // getAllData();
    console.log(jsonData);
    setSingleClassData(jsonData);
  }

  return (
    <>
      {deleteModal && (
        <Delete
          singleClassData={singleClassData}
          getAllData={getAllData}
          setDeleteModal={setDeleteModal}
        />
      )}
      {addNewModal && <Create setAddNewModal={setAddNewModal} />}
      <div className="overflow-x-auto w-3/4 m-auto mt-14 ">
        <div className="flex item-center justify-end mb-2">
          <button
            className="flex items-center bg-blue-500 text-white px-10 py-2 text-xl justify-around rounded-md hover:bg-white border-2 border-blue-500 hover:text-blue-500 transition-all duration-300"
            onClick={() => setAddNewModal(true)}
          >
            {" "}
            New <FiPlus className="ml-2" />
          </button>
        </div>
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
            {allData.map((item) => {
              return (
                <tr key={item.class_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item.class_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item.class_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item.department_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex text-center justify-center">
                    <button className="text-blue-500 hover:text-blue-900 text-2xl mr-4">
                      <CiEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-800 text-2xl"
                      onClick={() => handleDelete(item.class_id)}
                    >
                      <MdOutlineDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
