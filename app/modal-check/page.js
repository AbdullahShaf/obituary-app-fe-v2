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
  const [memoryPopupOpen, setMemoryPopupOpen] = useState(false);
  const [infoPopupOpen, setInfoPopupOpen] = useState(false);

  const [isPopUP1, setIsPopUP1] = useState(false);
  const [isPopUP2, setIsPopUP2] = useState(false);
  const [isPopUP3, setIsPopUP3] = useState(false);
  const [isPopUP4, setIsPopUP4] = useState(false);
  const [isPopUP5, setIsPopUP5] = useState(false);
  const [isPopUP6, setIsPopUP6] = useState(false);
  const [isPopUP7, setIsPopUP7] = useState(false);
  const [isPopUP8, setIsPopUP8] = useState(false);
  return (
    <Layout
      from={"3"}
      onChangeMemory={handleMemoryChange}
      forFooter={"memorypage"}
    >
      <div className="bg-white w-full min-h-screen flex items-center justify-center px-4">
        {/* Modals */}
        <ModalNew
          isShowModal={isShowModal1}
          setIsShowModal={setIsShowModal1}
          select_id={select_id}
          set_Id={setSelect_Id}
        />

        <ModalNew2
          isShowModal={isShowModal2}
          setIsShowModal={setIsShowModal2}
          select_id={select_id}
          set_Id={setSelect_Id}
        />

        <ModalNew3
          isShowModal={isShowModal3}
          setIsShowModal={setIsShowModal3}
          select_id={select_id}
          set_Id={setSelect_Id}
        />

        <ModalNew4
          isShowModal={isShowModal4}
          setIsShowModal={setIsShowModal4}
          select_id={select_id}
          set_Id={setSelect_Id}
        />

        <ModalNew5
          isShowModal={isShowModal5}
          setIsShowModal={setIsShowModal5}
          select_id={select_id}
          set_Id={setSelect_Id}
        />
        <ModalNew6
          isShowModal={isShowModal6}
          setIsShowModal={setIsShowModal6}
          select_id={select_id}
          set_Id={setSelect_Id}
        />

        <MemoryModal
          isOpen={memoryPopupOpen}
          onClose={() => setMemoryPopupOpen(false)}
        />
        <InfoModal
          icon={"/giftbox.svg"}
          heading={"Company's name"}
          text={"ti podarja digitalno kartico"}
          name={"Name Lastname"}
          isOpen={infoPopupOpen}
          onClose={() => setInfoPopupOpen(false)}
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
              onClick={() => setMemoryPopupOpen(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Modal 7
            </button>
            <button
              onClick={() => setInfoPopupOpen(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Modal 8
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white w-full min-h-screen flex items-center justify-center px-4">
        <Modal onClose={() => setIsPopUP1(false)} open={isPopUP1} index={1} />
        <Modal onClose={() => setIsPopUP2(false)} open={isPopUP2} index={2} />
        <Modal onClose={() => setIsPopUP3(false)} open={isPopUP3} index={3} />
        <Modal onClose={() => setIsPopUP4(false)} open={isPopUP4} index={4} />
        <Modal onClose={() => setIsPopUP5(false)} open={isPopUP5} index={5} />
        <Modal onClose={() => setIsPopUP6(false)} open={isPopUP6} index={6} />
        <Modal onClose={() => setIsPopUP7(false)} open={isPopUP7} index={7} />
        <Modal onClose={() => setIsPopUP8(false)} open={isPopUP8} index={8} />

        {/* Button Box */}
        <div className="bg-zinc-400 shadow-md rounded-xl p-8 w-full max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Choose a Popup
          </h1>

          <div className="grid gap-4">
            <button
              onClick={() => setIsPopUP1(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Popup 1
            </button>
            <button
              onClick={() => setIsPopUP2(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Popup 2
            </button>
            <button
              onClick={() => setIsPopUP3(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Popup 3
            </button>
            <button
              onClick={() => setIsPopUP4(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Popup 4
            </button>

            <button
              onClick={() => setIsPopUP5(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Popup 5
            </button>
            <button
              onClick={() => setIsPopUP6(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Popup 6
            </button>
            <button
              onClick={() => setIsPopUP7(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Popup 7
            </button>
            <button
              onClick={() => setIsPopUP8(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Popup 8
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MemoryPage;
