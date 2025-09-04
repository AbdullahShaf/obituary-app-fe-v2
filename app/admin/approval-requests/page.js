"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SideMenuAdmin from "../../components/appcomponents/SideMenuAdmin";
import adminService from "../../../services/admin-service";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CompaniesWithApprovalReq = () => {
  const { ghostLogin } = useAuth();
  const router = useRouter();
  const { data: session } = useSession();
  const [whichScreen, setWhichScreen] = useState(1);
  const [whichTab, setWhichTab] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format dates safely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleDateString("en-GB");
    } catch (error) {
      return "N/A";
    }
  };
  console.log("session", session);

  // Fetch companies on mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await adminService.getCompaniesWithApprovalRequest();
        if (response.success) {
          setCompanies(response.companies);
        } else {
          toast.error("Failed to fetch companies");
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        toast.error("Failed to load companies");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handlePublish = async (id) => {
    try {
      const response = await adminService.approveCompanyRequest(id)

      if (response.data.success) {
        toast.success("Approved")
        setCompanies((curr) => {
          const updatedList = curr.filter((company) => company?.id != id);
          return updatedList;
        })
      }
    } catch (error) {
      toast.error("Something went wrong, Please try later!")
    }
  }

  const handleGhostLogin = async (userId) => {
    try {
      setLoading(userId)
      const adminId = session?.user?.me?.id;
      await ghostLogin({ userId, adminId });
    } catch (err) {
      console.error('Error in ghost-login', err);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#ECF0F3] pt-[80px] flex">
      {/* Sidebar */}
      <SideMenuAdmin setWhichScreen={setWhichScreen} headerCheck={2} whichtab={whichTab} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Title */}
        <h1 className="text-[24px] font-semibold text-[#0073e6] mb-6">
          Companies - Their page
        </h1>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto text-[13px]">
            <thead>
              <tr className="uppercase font-semibold text-gray-600 h-[70px] border-b border-gray-300">
                <th className="text-center px-4 text-left">Date</th>
                <th className="text-center px-2 text-left">C | F</th>
                <th className="text-center px-4 text-left">Company</th>
                <th className="text-center px-4 text-left">Local City</th>
                <th className="text-center px-4 text-left">Registered</th>
                <th className="text-center px-4 text-left">Open Their Page</th>
                <th className="text-center px-4 text-left">Last Change</th>
                <th className="text-center px-2 text-left">Online</th>
                <th className="text-center px-2 text-left">Publish</th>
                <th className="text-center px-4 text-left">Published</th>
              </tr>
            </thead>
            <tbody>
              {loading === true ? (
                <tr>
                  <td colSpan="10" className="text-center py-8">
                    <p className="text-[#6D778E]">Loading funeral companies...</p>
                  </td>
                </tr>
              ) : companies.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-8">
                    <p className="text-[#6D778E]">No funeral companies found</p>
                  </td>
                </tr>
              ) : (
                companies.map((company, index) => (
                  <tr
                    key={company.id}
                    className={`border-b text-gray-600 text-center ${index % 2 === 0 ? "bg-white" : "bg-[#f4f6f9]"}`}
                  >
                    <td className="px-4 py-4">{company?.sentTimestamp ? formatDate(company?.sentTimestamp) : "N/A"}</td>
                    <td className="px-2 py-4">{company?.type === "FLORIST" ? "F" : "C"}</td>
                    <td className="px-4 py-4">{company?.User?.company}</td>
                    <td className="px-4 py-4">{company?.city ?? "N/A"}</td>
                    <td className="px-4 py-4">{company?.createdTimestamp ? formatDate(company.createdTimestamp) : "N/A"}</td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => { handleGhostLogin(company?.userId) }}
                      >
                       { loading === company?.userId ? <span>Processing...</span> :<Image
                          src="/eye.png"
                          width={18}
                          height={18}
                          alt="Open page"
                          className="inline-block"
                        />}
                      </button>
                    </td>
                    <td className="px-4 py-4">{company?.modifiedTimestamp ? formatDate(company?.modifiedTimestamp) : "N/A"}</td>
                    <td className="px-2 py-4">
                      <Image
                        src={company?.status === "PUBLISHED" ? "/varify.png" : "/reject.png"}
                        width={18}
                        height={18}
                        alt="Open page"
                        className="inline-block"
                      />
                      {/* {company?.isOnline ? (
                        <div className="w-[20px] h-[20px] bg-green-200 rounded flex items-center justify-center">
                          <span className="text-green-600 font-bold">✓</span>
                        </div>
                      ) : (
                        <div className="w-[20px] h-[20px] bg-red-200 rounded flex items-center justify-center">
                          <span className="text-red-600 font-bold">✗</span>
                        </div>
                      )} */}
                    </td>
                    <td className="px-2 py-4  font-semibold cursor-pointer">
                      <button
                        onClick={() => handlePublish(company?.id)}
                      >
                        PUBLISH
                      </button>
                    </td>
                    <td className="px-4 py-4">{company?.approvedTimestamp ? formatDate(company?.approvedTimestamp) : "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompaniesWithApprovalReq;
