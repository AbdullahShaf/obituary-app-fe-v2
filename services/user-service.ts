import axios from "./axios";

const registerUser = async (userData: {
  email: string;
  password: string;
  role: string;
  company?: string;
  region?: string;
  city?: string;
}) => {
  try {
    const endpoint = "/user";

    const response = await axios.post(endpoint, userData);
    return response.data;
  } catch (error: unknown) {
    return error;
  }
};

const getMyUser = async () => {
  try {
    const endpoint = "/user/me";

    const response = await axios.get(endpoint);
    return response.data;
  } catch (error: unknown) {
    return new Error("Network error or no response");
  }
};

const updateMyUser = async (userData: {
  name?: string;
  email?: string;
  company?: string;
  region?: string;
  city?: string;
  secondaryCity?: string;
}) => {
  try {
    const endpoint = "/user/me";

    const response = await axios.patch(endpoint, userData);
    return response.data;
  } catch (error: unknown) {
    return new Error("Network error or no response");
  }
};

const updateUserAndCompany = async (formData: FormData, id: string) => {
  try {
    const endpoint = `/user/${id}`;

    const response = await axios.patch(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: unknown) {
    return new Error("Network error or no response");
  }
};

const deleteMyUser = async () => {
  try {
    const endpoint = "/user/me";

    const response = await axios.delete(endpoint);
    return response.data;
  } catch (error: unknown) {
    return new Error("Network error or no response");
  }
};

const changeSlug = async (slug: string) => {
  const endpoint = "/user/me/slug-key";

  const response = await axios.patch(
    endpoint,
    { slugKey: slug },
    { withCredentials: true }
  );

  return response.data;
};

const getMyCards = async () => {
  try {
    const endpoint = "/user/me/cards";

    const response = await axios.get(endpoint);
    return response.data;
  } catch (error: unknown) {
    return new Error("Network error or no response");
  }
};

const downloadCard = async (cardId: string) => {
  const endpoint = `/user/me/download/${cardId}`;

  const response = await axios.get(
    endpoint
  );

  return response.data;
};

const getMyKeeperStatus = async () => {
  try {
    const endpoint = "/user/me/keeper";

    const response = await axios.get(endpoint);
    return response.data;
  } catch (error: unknown) {
    return new Error("Network error or no response");
  }
};

const updateKeeperStatus = async (id: string) => {
  const endpoint = `/user/me/keeper/${id}`;

  const response = await axios.patch(
    endpoint
  );

  return response.data;
};

const saveContact = async (payload: any) => {
  const endpoint = `/post/contact`;

  const response = await axios.post(
    endpoint, payload
  );

  return response.data;
};

const saveObitNotification = async (payload: any) => {
  const endpoint = `/post/obit-notification`;

  const response = await axios.post(
    endpoint, payload
  );

  return response.data;
};

const getMyKeeperNotifications = async () => {
  try {
    const endpoint = "/user/me/keeper-gifts";

    const response = await axios.get(endpoint);
    return response.data;
  } catch (error: unknown) {
    return new Error("Network error or no response");
  }
};

const updateCardStatus = async (id: string) => {
  const endpoint = `/user/me/notify/${id}`;

  const response = await axios.post(
    endpoint
  );

  return response.data;
};

const userService = {
  registerUser,
  getMyUser,
  updateMyUser,
  deleteMyUser,
  changeSlug,
  updateUserAndCompany,
  getMyCards,
  downloadCard,
  getMyKeeperStatus,
  updateKeeperStatus,
  saveContact,
  saveObitNotification,
  getMyKeeperNotifications,
  updateCardStatus
};

export default userService;
