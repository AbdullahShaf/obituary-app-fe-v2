"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SideMenuAdmin from "../../components/appcomponents/SideMenuAdmin";
import adminService from "../../../services/admin-service";
import { toast } from "react-hot-toast";
import { TOAST_MESSAGE } from "../../../utils/toastMessage";
import FormModal from './FormModal';

const CompaniesWithApprovalReq = () => {
  const [isShowModal1, setIsShowModal1] = useState(false);
  const [editId, setEditId] = useState(null);
  const [whichScreen, setWhichScreen] = useState(1);
  const [whichTab, setWhichTab] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sponsors, setSponsors] = useState([]);

  const formatDate = (timestamp) => {
    const funeralDate = new Date(timestamp);
    if (isNaN(funeralDate.getTime())) return "";

    const day = funeralDate.getDate().toString().padStart(2, "0");
    const month = (funeralDate.getMonth() + 1).toString().padStart(2, "0");
    const year = funeralDate.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const fetchList = async () => {
    setLoading(true);
    const res = await adminService.getSponosors();
    setSponsors(res?.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchList();
  }, [])

  const deleteSponsor = async (id) => {
    setLoading(true);
    await adminService.deleteSponsor(id);
    setLoading(false);
    fetchList();
  }

  return (
    <div className="w-full min-h-screen bg-[#ECF0F3] pt-[80px] flex">
      <SideMenuAdmin setWhichScreen={setWhichScreen} headerCheck={2} whichtab={whichTab} />
      <div className="flex-1 p-6">
        <h1 className="text-[24px] font-semibold text-[#0073e6] mb-6">
          Sponsors
        </h1>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              setIsShowModal1(true);
              setEditId(null);
            }}
            className="w-[180px] h-[50px] rounded-[10px] bg-[#09C1A3] text-white font-semibold text-md"
          >
            Add Sponsor
          </button>
        </div>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto text-[13px]">
            <thead>
              <tr className="uppercase font-semibold text-gray-600 h-[70px] border-b border-gray-300">
                <th className="text-center px-4 text-left">Date</th>
                <th className="text-center px-2 text-left">What page</th>
                <th className="text-center px-4 text-left">City</th>
                <th className="text-center px-4 text-left">Advertiser</th>
                <th className="text-center px-4 text-left">C / P / A</th>
                <th className="text-center px-4 text-left">Start</th>
                <th className="text-center px-2 text-left">End</th>
                <th className="text-center px-2 text-left">Price</th>
                <th className="text-center px-4 text-left">Popup</th>
              </tr>
            </thead>
            <tbody>
              {loading === true ? (
                <tr>
                  <td colSpan="10" className="text-center py-8">
                    <p className="text-[#6D778E]">Loading...</p>
                  </td>
                </tr>
              ) : sponsors.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-8">
                    <p className="text-[#6D778E]">No sponsors found</p>
                  </td>
                </tr>
              ) : (
                sponsors.map((company, index) => (
                  <tr
                    key={company.id}
                    className={`border-b text-gray-600 text-center ${index % 2 === 0 ? "bg-white" : "bg-[#f4f6f9]"}`}
                  >
                    <td className="px-4 py-4">{company?.createdTimestamp ? formatDate(company?.createdTimestamp) : "N/A"}</td>
                    <td className="px-2 py-4">{company?.page}</td>
                    <td className="px-4 py-4 flex justify-center gap-3">
                      <span>{company?.cities} </span>
                    </td>
                    <td className="px-4 py-4">{company?.who}</td>
                    <td className="px-4 py-4">{company?.cpa}</td>
                    <td className="px-4 py-4">{company?.startDate ? formatDate(company?.startDate) : "N/A"}</td>
                    <td className="px-4 py-4">{company?.endDate ? formatDate(company?.endDate) : "N/A"}</td>
                    <td className="px-4 py-4">{company?.price}</td>
                    <td className="px-2 py-4  font-semibold cursor-pointer">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => {
                            setIsShowModal1(true);
                            setEditId(company);
                          }}
                        >
                          <Image
                            src="/eye.png"
                            width={18}
                            height={18}
                            alt="Open page"
                            className="inline-block"
                          />
                        </button>
                        <button onClick={() => deleteSponsor(company?.id)} className="ml-2">
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
      <FormModal
        isShowModal={isShowModal1}
        setIsShowModal={setIsShowModal1}
        editId={editId}
        refetch={fetchList}
      />
    </div>
  );
};

export default CompaniesWithApprovalReq;
