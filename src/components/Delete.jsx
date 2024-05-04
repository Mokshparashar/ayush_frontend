import { useRef } from "react";
import { MdOutlineDeleteSweep } from "react-icons/md";
function Delete({ singleClassData, getAllData, setDeleteModal }) {
  const parent = useRef();
  function handleParentClick(e) {
    if (e.target == parent.current) {
      setDeleteModal(false);
    }
  }

  async function handleConfirmClick() {
    await fetch(
      `http://localhost:5000/classes/${singleClassData[0]?.class_id}`,
      {
        method: "DELETE",
      }
    );
    setDeleteModal(false);
    getAllData();
  }
  return (
    <div
      className="w-lvw h-lvh  flex items-center justify-center absolute top-0 z-30 blur-bg transition-all duration-500"
      onClick={handleParentClick}
      ref={parent}
    >
      <div className="w-1/4 h-1/3 bg-white  border  box-shadow  p-4 flex items-center justify-between flex-col">
        <MdOutlineDeleteSweep className="text-red-500 text-9xl" />

        <h1 className="text-xl text-center  w-full ">
          Are you deleting
          <span className="text-xl font-bold ">
            {"  " + singleClassData[0]?.name + "  "}
          </span>
          class ?
        </h1>
        <div>
          <button
            className="bg-gray-500 text-white w-28 h-10 rounded-md mr-4"
            onClick={() => setDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white w-28 h-10 rounded-md"
            onClick={handleConfirmClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
