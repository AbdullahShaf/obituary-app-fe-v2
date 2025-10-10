import axios from "./axios";

const adminService = {
  // Get all users (admin only)
  getAllUsers: async () => {
    try {
      const response = await axios.get("/admin/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Get admin dashboard stats
  getAdminStats: async () => {
    try {
      const response = await axios.get("/admin/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      throw error;
    }
  },

  // Delete user (admin only)
  deleteUser: async (userId: number) => {
    try {
      const response = await axios.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  // Update user role (admin only)
  updateUserRole: async (userId: number, role: string) => {
    try {
      const response = await axios.patch(`/admin/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error;
    }
  },

  // Create superadmin account
  createSuperadmin: async (email: string, password: string) => {
    try {
      const response = await axios.post("/user/create-superadmin", {
        email: email,
        password: password,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating superadmin:", error);
      throw error;
    }
  },

  // Get funeral companies with statistics
  getFuneralCompanies: async () => {
    try {
      const response = await axios.get("/admin/funeral-companies");
      return response.data;
    } catch (error) {
      console.error("Error fetching funeral companies:", error);
      throw error;
    }
  },

  // Get companies with approval request
  getCompaniesWithApprovalRequest: async () => {
    try {
      const response = await axios.get("/admin/compines-for-approval");
      return response.data;
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  },

  // PATCH Approve company's request
  approveCompanyRequest: async (id: string, status: "DRAFT" | "PUBLISHED") => {
    try {
      const response = await axios.patch(`/admin/approve-request/${id}`, { status });
      return response;
    } catch (error) {
      console.error("Error in aprroval:", error);
    }
  },

  // Get florist companies with statistics
  getFloristCompanies: async () => {
    try {
      const response = await axios.get("/admin/florist-companies");
      return response.data;
    } catch (error) {
      console.error("Error fetching florist companies:", error);
      throw error;
    }
  },

  // Get contacts
  getContacts: async () => {
    try {
      const response = await axios.get("/admin/contact-list");
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts :", error);
      throw error;
    }
  },

  // Update user permissions
  updateUserPermissions: async (userId: number, permissions: {
    createObituaryPermission: boolean;
    assignKeeperPermission: boolean;
    sendGiftsPermission: boolean;
    sendMobilePermission: boolean;
  }) => {
    try {
      const response = await axios.patch(`/admin/users/${userId}/permissions`, permissions);
      return response.data;
    } catch (error) {
      console.error("Error updating user permissions:", error);
      throw error;
    }
  },

  // Block/Unblock user
  blockUser: async (userId: number, isBlocked: boolean) => {
    try {
      const response = await axios.patch(`/admin/users/${userId}/block`, { isBlocked });
      return response.data;
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
      throw error;
    }
  },

  // Update user notes
  updateUserNotes: async (userId: number, notes: string) => {
    try {
      const response = await axios.patch(`/admin/users/${userId}/notes`, { notes });
      return response.data;
    } catch (error) {
      console.error("Error updating user notes:", error);
      throw error;
    }
  },

  // Get florist financials
  getFloristFinancials: async () => {
    try {
      const response = await axios.get(`/admin/florist-financials`);
      return response.data;
    } catch (error) {
      console.error("Error fetching florist financials:", error);
      throw error;
    }
  },

  // Update admin convenience fields
  updateAdminFields: async (userId: number, fields: {
    adminRating?: string;
    hasFlorist?: boolean;
    isPaid?: boolean;
  }) => {
    try {
      const response = await axios.patch(`/admin/users/${userId}/admin-fields`, fields);
      return response.data;
    } catch (error) {
      console.error("Error updating admin fields:", error);
      throw error;
    }
  },

  // Get all users
  getUsers: async () => {
    try {
      const response = await axios.get(`/admin/users`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Delete obituary
  deleteObituary: async (obituaryId: number) => {
    try {
      const response = await axios.delete(`/admin/obituaries/${obituaryId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting obituary:", error);
      throw error;
    }
  },

  // Toggle obituary visibility (hide/unhide)
  toggleObituaryVisibility: async (obituaryId: number, isHidden: boolean) => {
    try {
      const response = await axios.patch(`/admin/obituaries/${obituaryId}/visibility`, { isHidden });
      return response.data;
    } catch (error) {
      console.error("Error toggling obituary visibility:", error);
      throw error;
    }
  },

  // Toggle memory page visibility (block/unblock)
  toggleMemoryVisibility: async (obituaryId: number, isMemoryBlocked: boolean) => {
    try {
      const response = await axios.patch(`/admin/obituaries/${obituaryId}/memory-visibility`, { isMemoryBlocked });
      return response.data;
    } catch (error) {
      console.error("Error toggling memory visibility:", error);
      throw error;
    }
  },

  // Update obituary admin notes
  updateObituaryNotes: async (obituaryId: number, adminNotes: string) => {
    try {
      const response = await axios.patch(`/admin/obituaries/${obituaryId}/admin-notes`, { adminNotes });
      return response.data;
    } catch (error) {
      console.error("Error updating obituary notes:", error);
      throw error;
    }
  },

  createSponosor: async (formData: any) => {
    const endpoint = "/admin/create-sponsor";
    const response = await axios.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  editSponosor: async (formData: any, id: any) => {
    const endpoint = `/admin/edit-sponsor/${id}`;
    const response = await axios.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getSponosors: async () => {
    const endpoint = "/admin/sponsor-list";
    const response = await axios.get(endpoint);
    return response.data;
  },

// services/admin-service.ts
  deleteSponsor: async (id: any) => {
    try {
      const endpoint = "/admin/delete-sponsor/" + id;
      const response = await axios.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error deleting sponsor:", error);
      throw error;
    }
  }
};

export default adminService; 