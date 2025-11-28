import axios from "./axios";

const partnerService = {

  getAllPartners: async () => {
    try {
      const response = await axios.get("/partner")
      return response.data
    } catch (error) {
      console.error("Error fetching partners", error)
    }
  },
  
  deletePartner: async (partnerId: number) => {
    try {
      const response = await axios.delete(`/partner/${partnerId}`)
      return response.data
    } catch (error) {
      console.error("Error deleting partner", error)
    }
  },

  updatePartner: async (partnerId: number, partnerData: any) => {
    try {
      const response = await axios.put(`/partner/${partnerId}`, partnerData)
      return response.data
    } catch (error) {
      console.error("Error updating partner", error)
    }
  },

createPartner: async (partnerData: any) => {
  try {
    const response = await axios.post("/partner", partnerData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating partner", error);
  }
},


  getPartnerById: async (partnerId: number) => {
    try {
      const response = await axios.get(`/partner/${partnerId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching partner", error)
    }
  },
  
}

export default partnerService
