import axios from "axios";

const BASE_URL = import.meta.env.BASE_URL;

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  secure: true,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("RefreshToken");
      try {
        const response = await axios({
          method: "post",
          url: `${BASE_URL}/auth/refreshtoken`,
          data: {
            refreshToken: refreshToken,
          },
          headers: {
            "Content-Type": "application/json",
          },
          secure: true,
        });
      } catch (err) {
        if (err.response.data.message === "Invalid Token") {
          localStorage.removeItem("AccessToken");
          localStorage.removeItem("RefreshToken");
          window.location.href = "/";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
