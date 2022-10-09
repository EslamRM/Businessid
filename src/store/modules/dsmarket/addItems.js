import axios from "axios";
export default {
  state: {
    HomePageCategories: "",
    AllCategories: ""
  },
  getters: {},

  mutations: {
    SET_CATEGORIES(state, result) {
      state.HomePageCategories = result;
    },
    SET_ALL_CATEGORIES(state, result) {
      state.AllCategories = result;
    }
  },
  actions: {
    uploadProduct({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("vendor/item/add", {
            ...data
          })
          .then(response => {
            console.log(response);
            resolve(response);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    sendQuotation({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("quotation/ask", { ...data })
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    }
  }
};
