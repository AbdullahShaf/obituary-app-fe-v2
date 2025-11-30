"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SideMenuAdmin from "../../components/appcomponents/SideMenuAdmin";
import adminService from "../../../services/admin-service";
import { toast } from "react-hot-toast";
import ModalCemetery from "../../components/appcomponents/ModalCemetery";

const Cemeteries = () => {
  const [isShowModal1, setIsShowModal1] = useState(false);
  const [editId, setEditId] = useState(null);
  const [whichScreen, setWhichScreen] = useState(1);
  const whichTab = "Cemeteries";
  const [loading, setLoading] = useState(true);
  const [cemeteries, setCemeteries] = useState([]);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await adminService.getCemeteries();
      setCemeteries(res?.data ?? []);
    } catch (error) {
      toast.error("Error fetching cemeteries");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchList();
  }, [])

  const deleteCemetery = async (id) => {
    if (!confirm("Are you sure you want to delete this cemetery?")) {
      return;
    }
    setLoading(true);
    try {
      await adminService.deleteCemetery(id);
      toast.success("Cemetery deleted successfully");
      fetchList();
    } catch (error) {
      toast.error("Error deleting cemetery");
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#ECF0F3] pt-[80px] flex">
      <SideMenuAdmin setWhichScreen={setWhichScreen} headerCheck={2} whichtab={whichTab} />
      <div className="flex-1 p-6">
        <h1 className="text-[24px] font-semibold text-[#0073e6] mb-6">
          Cemeteries
        </h1>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              setIsShowModal1(true);
              setEditId(null);
            }}
            className="w-[180px] h-[50px] rounded-[10px] bg-[#09C1A3] text-white font-semibold text-md"
          >
            Add Cemetery
          </button>
        </div>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto text-[13px]">
            <thead>
              <tr className="uppercase font-semibold text-gray-600 h-[70px] border-b border-gray-300">
                <th className="text-center px-4 text-left">Name</th>
                <th className="text-center px-4 text-left">Address</th>
                <th className="text-center px-4 text-left">City</th>
                <th className="text-center px-4 text-left">Region</th>
                <th className="text-center px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading === true ? (
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    <p className="text-[#6D778E]">Loading...</p>
                  </td>
                </tr>
              ) : cemeteries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    <p className="text-[#6D778E]">No cemeteries found</p>
                  </td>
                </tr>
              ) : (
                cemeteries.map((cemetery, index) => (
                  <tr
                    key={cemetery.id}
                    className={`border-b text-gray-600 text-center ${index % 2 === 0 ? "bg-white" : "bg-[#f4f6f9]"}`}
                  >
                    <td className="px-4 py-4">{cemetery?.name || "N/A"}</td>
                    <td className="px-4 py-4">{cemetery?.address || "N/A"}</td>
                    <td className="px-4 py-4">{cemetery?.city || "N/A"}</td>
                    <td className="px-4 py-4">{cemetery?.region || "N/A"}</td>
                    <td className="px-2 py-4 font-semibold cursor-pointer">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => {
                            setIsShowModal1(true);
                            setEditId(cemetery);
                          }}
                        >
                          <Image
                            src="/eye.png"
                            width={18}
                            height={18}
                            alt="Edit"
                            className="inline-block"
                          />
                        </button>
                        <button onClick={() => deleteCemetery(cemetery?.id)} className="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#000000" d="M8 9h1v9H8V9zm7 0h1v9h-1V9zM5 4h14v2H5V4zm3-1h8v1H8V3zM7 7h10v13H7V7zm2 0v12h6V7H9z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalCemetery
        isShowModal={isShowModal1}
        setIsShowModal={setIsShowModal1}
        editId={editId}
        refetch={fetchList}
      />
    </div>
  );
};

export default Cemeteries;

