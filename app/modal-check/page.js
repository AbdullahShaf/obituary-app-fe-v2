"use client";

import { useState } from "react";
import Layout from "../components/appcomponents/Layout";
import ModalNew from "../components/appcomponents/ModalNew";
import ModalNew2 from "../components/appcomponents/ModalNew2";
import ModalNew3 from "../components/appcomponents/ModalNew3";
import ModalNew4 from "../components/appcomponents/ModalNew4";
import ModalNew5 from "../components/appcomponents/ModalNew5";
import ModalNew6 from "../components/appcomponents/ModalNew6";
import MemoryModal from "../components/appcomponents/MemoryModal";
import InfoModal from "../components/appcomponents/InfoModal";
import Modal from "../components/ui/model";

const MemoryPage = ({ params }) => {
  const handleMemoryChange = () => {
    // Your logic here
  };

  const [select_id, setSelect_Id] = useState("");

  // Separate states for each modal
  const [isShowModal1, setIsShowModal1] = useState(false);
  const [isShowModal2, setIsShowModal2] = useState(false);
  const [isShowModal3, setIsShowModal3] = useState(false);
  const [isShowModal4, setIsShowModal4] = useState(false);
  const [isShowModal5, setIsShowModal5] = useState(false);
  const [isShowModal6, setIsShowModal6] = useState(false);
  const [isShowModal7, setIsShowModal7] = useState(false);
  const [isShowModal8, setIsShowModal8] = useState(false);
  const [memoryPopupOpen, setMemoryPopupOpen] = useState(false);
  const [infoPopupOpen, setInfoPopupOpen] = useState(false);

  console.log("isShowModal7", isShowModal7);
  console.log("isShowModal8", isShowModal8);
  return (
    <Layout
      from={"3"}
      onChangeMemory={handleMemoryChange}
      forFooter={"memorypage"}
    >
      <div className="bg-white w-full min-h-screen flex items-center justify-center px-4">
        <Modal
          onClose={() => setIsShowModal1(false)}
          open={isShowModal1}
          index={1}
        />
        <Modal
          onClose={() => setIsShowModal2(false)}
          open={isShowModal2}
          index={2}
        />
        <Modal
          onClose={() => setIsShowModal3(false)}
          open={isShowModal3}
          index={3}
        />
        <Modal
          onClose={() => setIsShowModal4(false)}
          open={isShowModal4}
          index={4}
        />
        <Modal
          onClose={() => setIsShowModal5(false)}
          open={isShowModal5}
          index={5}
        />
        <Modal
          onClose={() => setIsShowModal6(false)}
          open={isShowModal6}
          index={6}
        />
        <Modal
          onClose={() => setIsShowModal7(false)}
          open={isShowModal7}
          index={7}
        />
        <Modal
          onClose={() => setIsShowModal8(false)}
          open={isShowModal8}
          index={8}
        />

        {/* Button Box */}
        <div className="bg-zinc-400 shadow-md rounded-xl p-8 w-full max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Choose a Modal
          </h1>

          <div className="grid gap-4">
            <button
              onClick={() => setIsShowModal1(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Modal 1
            </button>
            <button
              onClick={() => setIsShowModal2(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Modal 2
            </button>
            <button
              onClick={() => setIsShowModal3(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Modal 3
            </button>
            <button
              onClick={() => setIsShowModal4(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Modal 4
            </button>

            <button
              onClick={() => setIsShowModal5(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Modal 5
            </button>
            <button
              onClick={() => setIsShowModal6(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Modal 6
            </button>
            <button
              onClick={() => setIsShowModal7(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Modal 7
            </button>
            <button
              onClick={() => setIsShowModal8(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Modal 8
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MemoryPage;
