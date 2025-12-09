import axios from "./axios";

const partnerService = {
  getAllPartners: async () => {
    try {
      const response = await axios.get("/partner");
      return response.data;
    } catch (error) {
      console.error("Error fetching partners", error);
      throw error;
    }
  },

  getAllPartnersPlusLocals: async () => {
    try {
      const response = await axios.get("/partner/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching partners", error);
      throw error;
    }
  },

  getLocalNewsPartners: async () => {
    try {
      const response = await axios.get("/partner/local-news-partner");
      return response.data;
    } catch (error) {
      console.error("Error fetching local news partners", error);
      throw error;
    }
  },

  getRegionalPartners: async (region: string) => {
    try {
      const response = await axios.get(`/partner/regional-partner/${region}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching regional partners", error);
      throw error;
    }
  },

  getPartnersByCategory: async (category: string) => {
    try {
      const response = await axios.get(`/partner/category-partner/${category}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching partners by category", error);
      throw error;
    }
  },

  deletePartner: async (partnerId: number) => {
    try {
      const response = await axios.delete(`/partner/${partnerId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting partner", error);
      throw error;
    }
  },

  updatePartner: async (partnerId: number, partnerData: any) => {
    try {
      const response = await axios.put(`/partner/${partnerId}`, partnerData);
      return response.data;
    } catch (error) {
      console.error("Error updating partner", error);
      throw error;
    }
  },

  createPartner: async (partnerData: any) => {
    try {
      const response = await axios.post("/partner", partnerData);
      return response.data;
    } catch (error) {
      console.error("Error creating partner", error);
      throw error;
    }
  },

  getPartnerById: async (partnerId: number) => {
    try {
      const response = await axios.get(`/partner/${partnerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching partner", error);
      throw error;
    }
  },
};

export default partnerService;
