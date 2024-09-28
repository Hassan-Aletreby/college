import axios from "axios";
import toast from "react-hot-toast";
import serverErrorHandler from "../helpers/serverErrorHandler";

const axiosInstance = axios.create({
  baseURL: "https://ruxegubfleaphadbqgaz.supabase.co",
  headers: {
    "Content-Type": "application/json",
    apiKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eGVndWJmbGVhcGhhZGJxZ2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3ODg3MDgsImV4cCI6MjAzNjM2NDcwOH0.15e7CMQfLQsD4LM43ukjz46kZvDVkEy47JpyLPgeHKM",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const storedToken = localStorage.getItem("authToken");
    const token = storedToken ? JSON.parse(storedToken) : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        toast.error("الرجاء تسجيل الدخول للوصول إلى هذه الصفحة.");
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      } else {
        const message = serverErrorHandler(error);
        toast.error(message);
      }
    } else {
      toast.error("حدث خطأ في الاتصال. يرجى المحاولة لاحقاً.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
