"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SideMenuAdmin from "../../components/appcomponents/SideMenuAdmin";
import { toast } from "react-hot-toast";
import FormModal from "./FormModal";
import partnerService from "@/services/partner-service";
import TickGreen from "@/public/ico_tick.png";
import CrossTick from "@/public/admin_table_cross.png";
import categoryService from "@/services/category-service";

const CompaniesWithApprovalReq = () => {
  const [isShowModal1, setIsShowModal1] = useState(false);
  const [editId, setEditId] = useState(null);
  const [whichScreen, setWhichScreen] = useState(1);
  const [whichTab, setWhichTab] = useState("");
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState([]);
  const [categories, setCategories] = useState([]);

  const formatDate = (timestamp) => {
    const funeralDate = new Date(timestamp);
    if (isNaN(funeralDate.getTime())) return "";

    const day = funeralDate.getDate().toString().padStart(2, "0");
    const month = (funeralDate.getMonth() + 1).toString().padStart(2, "0");
    const year = funeralDate.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const refetchItems = () => {
    fetchList();
    fetchCategories();
  };
  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await partnerService.getAllPartnersPlusLocals();
      if (res) {
        setPartners(res);
      }
    } catch (error) {
      console.error("Failed to fetch partners:", error);
      toast.error("Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categoryService.getAllCategories();
      if (res) {
        const obj = Object.fromEntries(res.map((item) => [item.id, item]));
        setCategories(obj);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchList();
  }, []);

  const deletePartner = async (id) => {
    if (!window.confirm("Are you sure you want to delete this partner?")) {
      return;
    }
    setLoading(true);
    try {
      await partnerService.deletePartner(id);
      toast.success("Partner deleted");
    } catch (error) {
      toast.error("Failed to delete partner");
    }
    setLoading(false);
    fetchList();
  };

  return (
    <div className="w-full min-h-screen bg-[#ECF0F3] pt-[80px] flex">
      <SideMenuAdmin
        setWhichScreen={setWhichScreen}
        headerCheck={2}
        whichtab={whichTab}
      />
      <div className="flex-1 p-6">
        <h1 className="text-[24px] font-semibold text-[#0073e6] mb-6">
          Partners
        </h1>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              setEditId(null);
              setIsShowModal1(true);
            }}
            className="w-[180px] h-[50px] rounded-[10px] bg-[#09C1A3] text-white font-semibold text-md"
          >
            Add Partner
          </button>
        </div>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto text-[13px]">
            <thead>
              <tr className="uppercase font-semibold text-gray-600 h-[70px] border-b border-gray-300">
                <th className="text-center px-4 text-left">Created</th>
                <th className="text-center px-4 text-left">Company</th>
                <th className="text-center px-2 text-left">Category</th>
                <th className="text-center px-2 text-left">Local News</th>
                <th className="text-center px-4 text-left">City</th>
                <th className="text-center px-4 text-left">Region</th>
                <th className="text-center px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading === true ? (
                <tr>
                  <td colSpan="10" className="text-center py-8">
                    <p className="text-[#6D778E]">Loading...</p>
                  </td>
                </tr>
              ) : partners?.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-8">
                    <p className="text-[#6D778E]">No partners found</p>
                  </td>
                </tr>
              ) : (
                partners?.map((company, index) => (
                  <tr
                    key={company.id}
                    className={`border-b text-gray-600 text-center ${
                      index % 2 === 0 ? "bg-white" : "bg-[#f4f6f9]"
                    }`}
                  >
                    <td className="px-4 py-4">
                      {company?.createdTimestamp
                        ? formatDate(company?.createdTimestamp)
                        : "N/A"}
                    </td>
                    <td className="px-2 py-4">{company?.name}</td>
                    <td className="px-4 py-4 flex justify-center gap-3">
                      <span>{categories[company?.category]?.name} </span>
                    </td>
                    <td className="px-4 py-4">
                      <span>
                        {company?.isLocalNews ? (
                          <Image
                            src={TickGreen}
                            width={20}
                            height={20}
                            alt="Tick"
                            className="inline-block"
                          />
                        ) : (
                          <Image
                            src={CrossTick}
                            width={20}
                            height={20}
                            alt="Cross"
                            className="inline-block"
                          />
                        )}{" "}
                      </span>
                    </td>
                    <td className="px-4 py-4">{company?.city}</td>
                    <td className="px-4 py-4">{company?.region}</td>
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
                        <button
                          onClick={() => deletePartner(company?.id)}
                          className="ml-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#000000"
                              d="M8 9h1v9H8V9zm7 0h1v9h-1V9zM5 4h14v2H5V4zm3-1h8v1H8V3zM7 7h10v13H7V7zm2 0v12h6V7H9z"
                            />
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
        refetch={refetchItems}
      />
    </div>
  );
};

export default CompaniesWithApprovalReq;
