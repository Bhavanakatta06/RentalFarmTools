// src/api.ts
import axios from "axios";

interface RefreshResponse {
  token: string;
}

const api = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json", // ✅ ensure JSON body is parsed
  },
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  // ✅ Only attach if token is valid
  if (token && token !== "null" && token !== "undefined" && token.includes(".")) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle expired tokens automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const res = await axios.post<RefreshResponse>(
            "http://localhost:8081/api/auth/refresh",
            { refreshToken },
            { headers: { "Content-Type": "application/json" } }
          );

          const newToken = res.data.token;
          localStorage.setItem("accessToken", newToken);

          // Retry original request with new token
          error.config.headers = error.config.headers || {};
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return api.request(error.config);
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
