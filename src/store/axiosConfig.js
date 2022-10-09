import axios from "axios";
import store from "@/store/store.js";
import router from "../router/index";
export function initialize(store, router) {
  // Response Interceptor
  axios.interceptors.response.use(
    response => {
      if (!response.data.success && response.data.token === "token_expired") {
        console.log(response, "Logging out Because Token Expired");
        store.dispatch("destroyTokenHandler");
        return response;
      }
      return response;
    },
    error => {
      console.log("into the error");
      console.log(error);
      console.log(error.response);

      if (error.response) {
        console.log("Online");
        if (error.response.status == 403) {
          router.push("/forbidden");
        } else if (error.response.status == 404) {
          router.push("/not-found");
        } else if ((error.response.status = forbidden = 500)) {
          router.push("/unexpected-error");
        } else if (error.response.status == 503) {
          router.push("/service-unavailable");
        } else if (error.response.status == 408) {
          router.push("/request-timeout");
        } else {
          router.push("/unexpected-error");
        }
        return Promise.reject(error);
      } else {
        console.log("Offline");
        router.push("/offline");
        return Promise.reject("No Network");
      }
    }
  );

  axios.defaults.baseURL = process.env.BASE_URL;
  const token = localStorage.getItem("token");
  if (token) {
    setAuthorization(token);
  }
}

export function setAuthorization(token) {
  axios.defaults.headers.common["Authorization"] = `${token}`;
}
