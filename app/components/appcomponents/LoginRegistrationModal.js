"use client";
import React, { useState, useEffect } from "react";
import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import userService from "@/services/user-service";
import { getSession } from "next-auth/react";

const LoginRegistrationModal = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialTab = "login",
}) => {
  const { login, user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Registration state
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [enableReceiveEmails, setEnableReceiveEmails] = useState(true); // First checkbox should be checked by default
  const [enableTermsOfUse, setEnableTermsOfUse] = useState(false); // Second checkbox should be unchecked

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      toast.error("Potrebna sta e-naslov in geslo");
      return;
    }

    try {
      const credentials = {
        email: loginEmail,
        password: loginPassword,
      };

      const response = await login(credentials);

      if (response?.error || response?.status === 401) {
        toast.error(response?.error || "Napačni vnos");
        return;
      }

      if (response?.success || response?.user) {
        toast.success("Prijava je uspela");
        // Refresh session to get updated user data
        await getSession();
        // Wait a bit for session to fully update, then execute pending action
        // Note: We don't redirect here because we want to stay on the memory page
        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess();
          }
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Prijava ni uspela. Poskusi znova.");
    }
  };

  const handleRegister = async () => {
    if (!regEmail || !regPassword || !regConfirmPassword) {
      toast.error("Vsa polja so obvezna");
      return;
    }

    if (!enableTermsOfUse) {
      toast.error("Sprejmi splošne pogoje in politiko zasebnosti");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail)) {
      toast.error("Napaka pri vnosu e-naslova");
      return;
    }

    const passwordRegex = /^.{6,}$/;
    if (!passwordRegex.test(regPassword)) {
      toast.error("Geslo mora biti dolgo vsaj 6 znakov");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      toast.error("Geslo se ne ujema!");
      return;
    }

    try {
      const payload = {
        email: regEmail,
        password: regPassword,
        role: "User",
      };

      const response = await userService.registerUser(payload);
      
      if (response.status === 409) {
        toast.error("Ta e-naslov je že v uporabi");
        return;
      }
      
      if (response.error) {
        toast.error(response.error || "Prišlo je do napake. Poskusi znova.");
        return;
      }

      toast.success(
        response.message || "Registracija je uspela! Lahko se prijaviš."
      );

      // Switch to login tab after successful registration
      setActiveTab("login");
      setLoginEmail(regEmail);
      setRegEmail("");
      setRegPassword("");
      setRegConfirmPassword("");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registracija ni uspela. Poskusi znova.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen bg-[#5B6575] z-[9999] flex items-center justify-center"
    >
      <div
        className="relative w-[340px] max-w-[340px] min-w-[280px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with tab and close button */}
        <div className="flex items-center justify-between mb-[6px] w-full">
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
            className="border-[1px] border-[#FFFFFF] text-white h-[42px] flex items-center justify-center bg-transparent rounded-[8px] font-normal text-[15px] leading-[100%] px-[25px] py-[12px] cursor-pointer flex-shrink-0"
          >
            {activeTab === "login" ? "REGISTRACIJA" : "PRIJAVA"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer w-[56px] h-[56px] flex items-center justify-center flex-shrink-0 ml-[30px]"
          >
            <img
              src="/white_cencel.png"
              alt="close"
              className="w-[56px] h-[56px]"
            />
          </button>
        </div>

        {/* Modal Content */}
        <div
          className="rounded-[12px] overflow-hidden bg-[url('/card_bg.jpg')] bg-cover bg-center px-[22px] tabletUserAcc:px-[60px] pt-[40px] pb-[40px] w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {activeTab === "login" ? (
            /* LOGIN FORM */
            <>
              <div className="flex items-center justify-center flex-col gap-[8px]">
                <h4 className="text-[28px] text-[#1E2125] font-normal leading-[100%]">
                  Prijava
                </h4>
                <h5 className="text-[18px] text-[#3C3E41] font-normal leading-[100%]">
                  v uporabniški račun
                </h5>
                <p className="text-[#5B6575] text-center text-[12px] leading-[16px] mt-[16px] w-full max-w-[297px] mx-auto">
                  Prijava je potrebna, da se ohrani pieteta do pokojnih<br />
                  in prepreči smetenje na spominski strani (spam).
                </p>
              </div>

              {/* Email field */}
              <div className="text-[#5B6575] text-[14px] leading-[20px] font-normal w-full mt-[24px] flex flex-col justify-start items-start">
                <div className="mb-[4px]">E-pošta</div>
                <div className="px-[10px] h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full h-full bg-transparent focus:outline-none text-[#1860A3] text-[16px]"
                    placeholder=""
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="text-[#5B6575] text-[14px] leading-[20px] font-normal w-full mt-[16px] flex flex-col justify-start items-start">
                <div className="mb-[4px]">Geslo</div>
                <div className="px-[10px] h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="h-[38px] w-full bg-transparent focus:outline-none text-[#1860A3] text-[16px]"
                    placeholder=""
                  />
                </div>
              </div>

              {/* Remember me and forgot password */}
              <div className="flex w-full justify-between items-center mt-[18px]">
                <label className="flex items-center justify-start font-normal text-[14px] text-[#5B6575] leading-[20px] tracking-[0.3px]">
                  <Checkbox
                    checked={rememberMe}
                    onChange={setRememberMe}
                    className="mr-[12px] flex-shrink-0 w-[18px] h-[18px] rounded-[2px] border-[2px] border-[#5B6575] bg-transparent data-[checked]:bg-[#5B6575] data-[checked]:border-[#5B6575] flex items-center justify-center"
                  >
                    {rememberMe && (
                      <CheckIcon className="w-[12px] h-[12px] text-white" strokeWidth={3} />
                    )}
                  </Checkbox>
                  Zapomni si
                </label>
                <a
                  href="https://www.osmrtnica.com/kontakt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-normal text-[14px] leading-[20px] tracking-[0.3px] text-[#5B6575]"
                >
                  Pozabljeno geslo
                </a>
              </div>

              {/* Login button */}
              <button
                type="button"
                onClick={handleLogin}
                className="bg-gradient-to-b from-[#0D94E8] to-[#1860A3] h-[48px] w-full mt-[30px] flex items-center justify-center text-[18px] font-normal leading-[18px] rounded-[8px] text-white"
              >
                Prijava
              </button>
            </>
          ) : (
            /* REGISTRATION FORM */
            <>
              <div className="flex items-center justify-center flex-col gap-[8px]">
                <h4 className="text-[28px] text-[#1E2125] font-normal leading-[100%]">
                  Registracija
                </h4>
                <h5 className="text-[18px] text-[#3C3E41] font-normal leading-[100%]">
                  novega uporabnika
                </h5>
              </div>

              {/* Email field */}
              <div className="text-[#5B6575] text-[14px] leading-[20px] font-normal w-full mt-[24px] flex flex-col justify-start items-start">
                <div className="mb-[4px]">E-pošta</div>
                <div className="px-[10px] h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full h-full bg-transparent focus:outline-none text-[#1860A3] text-[16px]"
                    placeholder=""
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="text-[#5B6575] text-[14px] leading-[20px] font-normal w-full mt-[16px] flex flex-col justify-start items-start">
                <div className="mb-[4px]">Geslo</div>
                <div className="px-[10px] h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="h-[38px] w-full bg-transparent focus:outline-none text-[#1860A3] text-[16px]"
                    placeholder=""
                  />
                </div>
              </div>

              {/* Confirm password field */}
              <div className="text-[#5B6575] text-[14px] leading-[20px] font-normal w-full mt-[16px] flex flex-col justify-start items-start">
                <div className="mb-[4px]">Ponovi geslo</div>
                <div className="px-[10px] h-[38px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white w-full">
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="h-[38px] w-full bg-transparent focus:outline-none text-[#1860A3] text-[16px]"
                    placeholder=""
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-col w-full mt-[18px] gap-[6px]">
                <label className="flex items-center justify-start font-normal text-[11px] text-[#5B6575] leading-[24px] cursor-pointer">
                  <Checkbox
                    checked={enableTermsOfUse}
                    onChange={setEnableTermsOfUse}
                    className="mr-[12px] flex-shrink-0 w-[18px] h-[18px] rounded-[2px] border-[2px] border-[#5B6575] bg-transparent data-[checked]:bg-[#5B6575] data-[checked]:border-[#5B6575] flex items-center justify-center"
                  >
                    {enableTermsOfUse && (
                      <CheckIcon className="w-[12px] h-[12px] text-white" strokeWidth={3} />
                    )}
                  </Checkbox>
                  <span className="text-[11px] leading-[24px] whitespace-nowrap">
                    Strinjam se s{" "}
                    <a
                      href="https://www.osmrtnica.com/splosni-pogoji"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      splošnimi pogoji
                    </a>{" "}
                    in{" "}
                    <a
                      href="https://www.osmrtnica.com/politika-zasebnosti"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      politiko zasebnosti
                    </a>
                  </span>
                </label>
              </div>

              {/* Registration button */}
              <button
                type="button"
                onClick={handleRegister}
                className="bg-gradient-to-b from-[#0D94E8] to-[#1860A3] h-[48px] w-full mt-[30px] flex items-center justify-center text-[18px] font-normal leading-[18px] rounded-[8px] text-white"
              >
                Registracija
              </button>

            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default LoginRegistrationModal;

