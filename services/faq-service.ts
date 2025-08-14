import axios from "./axios";

const createFaq = async (data: any) => {
  const endpoint = `/faq`;
  const response = await axios.post(endpoint, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

const deleteFaq = async (id: number, companyId: string | number) => {
  const endpoint = `/faq/${id}?companyId=${companyId}`;
  const response = await axios.delete(endpoint, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

const faqService = {
  createFaq,
  deleteFaq,
};

export default faqService;
