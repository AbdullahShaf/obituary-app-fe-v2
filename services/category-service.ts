import axios from "./axios";

const categoryService = {
  getAllCategories: async () => {
    try {
      const response = await axios.get("/category");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories", error);
      return [];
    }
  },
  deleteCategory: async (categoryId: number) => {
    try {
      const response = await axios.delete(`/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting category", error);
      return [];
    }
  },
  updateCategory: async (categoryId: number, categoryData: any) => {
    try {
      const response = await axios.put(`/category/${categoryId}`, categoryData);
      return response.data;
    } catch (error) {
      console.error("Error updating category", error);
      return [];
    }
  },
  createCategory: async (categoryData: any) => {
    try {
      const response = await axios.post("/category", categoryData);
      return response.data;
    } catch (error) {
      console.error("Error creating category", error);
      return [];
    }
  },
  getCategoryById: async (categoryId: number) => {
    try {
      const response = await axios.get(`/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching category", error);
      return [];
    }
  },
};

export default categoryService;
