"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SideMenuAdmin from "../../components/appcomponents/SideMenuAdmin";
import adminService from "../../../services/admin-service";
import { toast } from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import cancle_icon from "@/public/cancle_icon.png";
import { TOAST_MESSAGE } from "../../../utils/toastMessage";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [whichScreen, setWhichScreen] = useState(1);
  const [whichTab, setWhichTab] = useState("");
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null);

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  // Helper function to format time
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Fetch contacts data
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await adminService.getContacts();
      console.log('response', response);

      if (response && response.data && response?.data?.length) {
        setContacts(response?.data || []);
      } else {
        setError("Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Failed to fetch contacts");
      toast.error(TOAST_MESSAGE.FAILED_LOAD_CONTACTS);
    } finally {
      setLoading(false);
    }
  };



  // Fetch obituaries when component mounts
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <ContactViewModal modal={modal} setModal={setModal} />
      <div className="w-full min-h-screen bg-[#ECF0F3] pt-[80px] flex">
        {/* Sidebar */}
        <SideMenuAdmin setWhichScreen={setWhichScreen} headerCheck={2} whichtab={whichTab} />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Title */}
          <h1 className="text-[24px] font-semibold text-[#0073e6] mb-6">
            Contacts
          </h1>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full table-auto text-[13px]">
              <thead>
                <tr className="uppercase font-semibold text-gray-600 h-[70px] border-b border-gray-300">
                  <th className="text-center px-4 text-left">Date</th>
                  <th className="text-center px-2 text-left">Email</th>
                  <th className="text-center px-4 text-left">Name</th>
                  <th className="text-center px-4 text-left">subject</th>
                  <th className="text-center px-4 text-left">View</th>
                  {/* <th className="text-center px-4 text-left">Open Their Page</th>
                <th className="text-center px-4 text-left">Last Change</th>
                <th className="text-center px-2 text-left">Online</th>
                <th className="text-center px-2 text-left">Publish</th>
                <th className="text-center px-4 text-left">Published</th> */}
                </tr>
              </thead>
              <tbody>
                {loading === true ? (
                  <tr>
                    <td colSpan="10" className="text-center py-8">
                      <p className="text-[#6D778E]">Loading contacts...</p>
                    </td>
                  </tr>
                ) : contacts?.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-8">
                      <p className="text-[#6D778E]">No contacts found</p>
                    </td>
                  </tr>
                ) : (
                  contacts?.map((contact, index) => (
                    <tr
                      key={contact.id}
                      className={`border-b text-gray-600 text-center ${index % 2 === 0 ? "bg-white" : "bg-[#f4f6f9]"}`}
                    >
                      <td className="px-4 py-4">{contact?.createdTimestamp ? formatDate(contact?.createdTimestamp) : "N/A"}</td>
                      <td className="px-2 py-4">{contact?.email}</td>
                      <td className="px-4 py-4">{contact?.name}</td>
                      <td className="px-4 py-4">{contact?.subject}</td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => { setModal(contact) }}
                        >
                          {loading === contact.id ? <span>Processing...</span> : <Image
                            src="/eye.png"
                            width={18}
                            height={18}
                            alt="Open page"
                            className="inline-block"
                          />}
                        </button>
                      </td>
                      {/* <td className="px-2 py-4">
                      <Image
                        src={contact?.status === "PUBLISHED" ? "/varify.png" : "/reject.png"}
                        width={18}
                        height={18}
                        alt="Open page"
                        className="inline-block"
                      /> */}
                      {/* {contact?.isOnline ? (
                        <div className="w-[20px] h-[20px] bg-green-200 rounded flex items-center justify-center">
                          <span className="text-green-600 font-bold">✓</span>
                        </div>
                      ) : (
                        <div className="w-[20px] h-[20px] bg-red-200 rounded flex items-center justify-center">
                          <span className="text-red-600 font-bold">✗</span>
                        </div>
                      )} */}
                      {/* </td> */}
                      {/* <td className="px-2 py-4  font-semibold cursor-pointer">
                      <button
                        // onClick={() => handlePublish(contact?.id)}
                      >
                        PUBLISH
                      </button>
                    </td> */}
                      {/* <td className="px-4 py-4">{contact?.approvedTimestamp ? formatDate(contact?.approvedTimestamp) : "N/A"}</td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
  );
};

export default ContactList;


function ContactViewModal({ modal, setModal }) {
  return (
    <Modal
      isOpen={modal}
      onOpenChange={() => setModal(null)}
      scrollBehavior={"outside"}
      classNames={{
        backdrop: "bg-[#344054B2] bg-opacity-70",
      }}
    >
      <ModalContent className="flex items-center justify-center w-full mt-32">
        <div className="flex flex-col w-full items-center justify-center desktop:w-[600px]">
          <div className="flex  " />
          {/* {/ <div className="flex flex-col tablet:w-[600px] desktop:w-[600px] w-full mobile:w-[95%] bg-[#E8F0F6]  rounded-2xl  p-4  "> /} */}
          <div className="flex flex-col bg-[#E8F0F6]  rounded-2xl ">
            <div
              onClick={() => {
                setModal(null);
              }}
              className="self-end "
            >
              <Image
                src={cancle_icon}
                alt="imgCall"
                className="w-[46px] h-[46px] mobile:w-[33px] mobile:h-[33px] cursor-pointer relative top-4 right-4"
              />
            </div>
            <div className="flex w-[600px] mobile:w-[344px] z-50 mobile:px-[2px] px-7 pb-11 mobile:mt-11 mt-12  items-center justify-center">
              <div className=" mobile:w-[314px] overflow-y-auto overflow-x-hidden w-[511px] bg-[#E1E6EC]  rounded-2xl border-[#6D778E] border pt-4 mobile:px-6 px-4 pb-7 flex flex-col">

                <p className="text-[#3C3E41] mobile:hidden text-md mb-2.5">
                  <span className="font-semibold">Name: </span>{modal?.name}
                </p>
                <p className="text-[#3C3E41] mobile:hidden text-md mb-2.5">
                  <span className="font-semibold">Email: </span>{modal?.email}
                </p>
                <p className="text-[#3C3E41] mobile:hidden text-md mb-2.5">
                  <span className="font-semibold">Subject: </span>{modal?.subject}
                </p>
                <p className="text-[#3C3E41] mobile:hidden text-md mb-2.5">
                  <span className="font-semibold">Email: </span>{modal?.email}
                </p>

                <div className="text-[#6D778E]  leading-[20px] font-[400px] w-full h-[82px] flex flex-col justify-start items-start mb-2.5">
                  <div className="mb-2.5 h-full text-[#414141] font-semibold">Message: </div>
                  <div className="h-[max-content] w-full">
                      {modal?.message}
                  </div>
                </div>


              </div>
            </div>
            <div className="flex h-[20px]"></div>
          </div>
        </div>
      </ModalContent></Modal>

  )
}