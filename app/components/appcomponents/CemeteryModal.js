"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import DropdownWithSearch from "./DropdownWithSearch";
import { toast } from "react-hot-toast";
import cemetryService from "@/services/cemetry-service";
import { useAuth } from "@/hooks/useAuth";
import companyService from "@/services/company-service";

const createEmptyForm = (city = "") => ({
  name: "",
  address: "",
  city,
  imageFile: null,
  imagePreview: "",
});

const CemeteryModal = ({ isOpen, onClose, defaultCity = "", onSaved }) => {
  const { user } = useAuth();
  const [form, setForm] = useState(createEmptyForm(defaultCity));
  const [editingCemetery, setEditingCemetery] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [cityFilter, setCityFilter] = useState(defaultCity || "");
  const [cemeteries, setCemeteries] = useState([]);

  const canSubmit = form.name.trim() !== "" && form.city.trim() !== "";

  const closeModal = () => {
    setForm(createEmptyForm(defaultCity));
    setEditingCemetery(null);
    setCityFilter(defaultCity || "");
    setCemeteries([]);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      city: defaultCity || prev.city,
    }));
    setCityFilter(defaultCity || "");
  }, [defaultCity, isOpen]);

  useEffect(() => {
    if (!isOpen || !user?.id) {
      return;
    }
    let cancelled = false;
    const loadCompany = async () => {
      try {
        const response = await companyService.getFuneralCompany({
          userId: user.id,
        });
        if (!cancelled) {
          setCompanyId(response?.company?.id ?? null);
        }
      } catch (error) {
        setCompanyId(null);
      }
    };
    loadCompany();
    return () => {
      cancelled = true;
    };
  }, [isOpen, user]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    fetchCemeteries(cityFilter);
  }, [cityFilter, isOpen]);

  const fetchCemeteries = async (city) => {
    setListLoading(true);
    try {
      const params = city ? { city } : {};
      const response = await cemetryService.getCemeteries(params);
      setCemeteries(response?.cemetries || []);
    } catch (error) {
      console.error(error);
      toast.error("Napaka pri pridobivanju pokopališč");
    } finally {
      setListLoading(false);
    }
  };

  const handleInputChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const handleEdit = (cemetery) => {
    setEditingCemetery(cemetery);
    setForm({
      name: cemetery?.name || "",
      address: cemetery?.address || "",
      city: cemetery?.city || "",
      imageFile: null,
      imagePreview: typeof cemetery?.image === "string" ? cemetery.image : "",
    });
  };

  const handleSubmit = async () => {
    if (!canSubmit) {
      toast.error("Izpolnite ime in mesto pokopališča");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      if (companyId) {
        formData.append("companyId", String(companyId));
      }
      formData.append("cemeteries[0][name]", form.name.trim());
      formData.append("cemeteries[0][address]", form.address?.trim() || "");
      formData.append("cemeteries[0][city]", form.city);
      formData.append(
        "cemeteries[0][updated]",
        editingCemetery ? "true" : "false"
      );
      if (editingCemetery?.id) {
        formData.append("cemeteries[0][id]", editingCemetery.id);
      }
      if (form.imageFile) {
        formData.append("cemeteries[0][image]", form.imageFile);
      } else if (form.imagePreview && editingCemetery?.image === form.imagePreview) {
        formData.append("cemeteries[0][image]", form.imagePreview);
      }

      await cemetryService.createCemetry(formData);
      toast.success(
        editingCemetery ? "Pokopališče posodobljeno" : "Pokopališče dodano"
      );
      if (onSaved) {
        onSaved();
      }
      fetchCemeteries(form.city || cityFilter);
      setForm(createEmptyForm(form.city));
      setEditingCemetery(null);
    } catch (error) {
      console.error(error);
      const message =
        error?.response?.data?.message || "Shranjevanje pokopališča ni uspelo";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const renderCemeteryList = () => {
    if (listLoading) {
      return (
        <div className="text-[#6D778E] text-[14px] mt-4">Nalagam podatke...</div>
      );
    }
    if (!cemeteries.length) {
      return (
        <div className="text-[#6D778E] text-[14px] mt-4">
          V tem mestu še ni dodanih pokopališč.
        </div>
      );
    }
    return (
      <div className="mt-4 max-h-[200px] overflow-y-auto w-full border border-[#6D778E33] rounded-lg bg-white">
        {cemeteries.map((cemetery) => (
          <div
            key={cemetery.id}
            className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 border-[#E1E6EC]"
          >
            <div>
              <div className="text-[#1E2125] text-[15px] font-medium">
                {cemetery.name}
              </div>
              <div className="text-[#6D778E] text-[13px]">
                {cemetery.city}
                {cemetery.address ? ` • ${cemetery.address}` : ""}
              </div>
            </div>
            <button
              className="text-[#0A85C2] text-[13px] underline"
              onClick={() => handleEdit(cemetery)}
            >
              Uredi
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
      size="xl"
      scrollBehavior="outside"
      classNames={{
        backdrop: "bg-[#344054B2] bg-opacity-70",
      }}
    >
      <ModalContent className="bg-[#E8F0F6] rounded-2xl p-6">
        <ModalHeader className="flex flex-col gap-1 text-[#1E2125] text-2xl">
          {editingCemetery ? "Uredi pokopališče" : "Dodaj pokopališče"}
        </ModalHeader>
        <ModalBody>
          <div className="w-full bg-[#E1E6EC] rounded-2xl border border-[#6D778E] p-6 space-y-5">
            <div>
              <label className="text-[#414141] text-sm mb-2 block">
                Slika pokopališča (opcijsko)
              </label>
              <label className="flex flex-col items-center justify-center h-[120px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white cursor-pointer text-[#0D94E8]">
                <span className="text-[15px]">
                  {form.imageFile || form.imagePreview
                    ? "Zamenjaj sliko"
                    : "Dodaj sliko"}
                </span>
                <span className="text-[11px] text-[#939393] mt-1">
                  Format: jpg, png, webp
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
      {form.imagePreview && (
        <div className="mt-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={form.imagePreview}
            alt="Predogled pokopališča"
            className="rounded-md object-cover w-full h-[160px]"
          />
        </div>
      )}
            </div>

            <div className="space-y-3">
              <label className="text-[#414141] text-sm">
                Pokopališče (obvezno)
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="npr. Pokopališče v Gabrskem"
                className="w-full h-[48px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white px-4 text-[#1E2125] placeholder:text-[#ACAAAA] focus:outline-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[#414141] text-sm">
                Naslov (opcijsko)
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="npr. Gabrsko 59, Trbovlje"
                className="w-full h-[48px] rounded-[6px] bg-[#F2F8FF66] shadow-custom-dark-to-white px-4 text-[#1E2125] placeholder:text-[#ACAAAA] focus:outline-none"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[#414141] text-sm">
                Mesto (obvezno)
              </label>
              <DropdownWithSearch
                placeholder="Izberi mesto"
                onSelectCity={(value) => {
                  handleInputChange("city", value || "");
                  setCityFilter(value || "");
                }}
                selectedCity={form.city}
                defaultStyles={{
                  backgroundColor: "#F2F8FF66",
                  border: "1px solid #d4d4d4",
                }}
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[#6D778E] text-sm">Moja pokopališča</div>
              <button
                className="text-[#0A85C2] text-[13px] underline"
                onClick={() => fetchCemeteries(cityFilter)}
              >
                Osveži
              </button>
            </div>
            {renderCemeteryList()}
          </div>
        </ModalBody>
        <ModalFooter className="flex items-center justify-between">
          <div className="flex flex-col text-[12px] text-[#6D778E]">
            {!canSubmit && "Ime in mesto sta obvezna."}
            {editingCemetery && (
              <button
                className="text-[#0A85C2] underline mt-1 text-left"
                onClick={() => {
                  setEditingCemetery(null);
                  setForm(createEmptyForm(defaultCity || ""));
                }}
              >
                Prekliči urejanje
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded-lg border border-[#6D778E] text-[#6D778E]"
              onClick={closeModal}
            >
              Zapri
            </button>
            <button
              className={`px-5 py-2 rounded-lg text-white transition ${canSubmit
                ? "bg-gradient-to-b from-[#0D94E8] to-[#0A85C2]"
                : "bg-[#9FBBD4]"
                }`}
              disabled={!canSubmit || loading}
              onClick={handleSubmit}
            >
              {loading ? "Shranjujem..." : "Shrani"}
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CemeteryModal;

