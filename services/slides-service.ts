import axios from "./axios";

const createSlide = async (formData: FormData) => {
  const endpoint = `/florist_slide/`;
  const response = await axios.post(endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

const deleteSlide = async (id: string) => {
  const endpoint = `/florist_slide?id=${id}`;
  const response = await axios.delete(endpoint);
  return response.data;
};

const slideService = {
  createSlide,deleteSlide
};

export default slideService;
