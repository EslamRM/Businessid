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
    loadDsmarketCategories({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_market_categories")
          .then(response => {
            console.log(response.data);
            commit("SET_CATEGORIES", response.data.categories);
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    loadDsmarketAllCategories({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_all_market_categories")
          .then(response => {
            console.log(response.data);
            commit("SET_ALL_CATEGORIES", response.data.categories);
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
