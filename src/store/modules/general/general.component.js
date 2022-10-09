import axios from "axios";
export default {
  state: {
    units: "",
    showHeader: true
  },

  getters: {},

  mutations: {
    SET_UNITS(state, data) {
      state.units = data;
    },
    ToggleHeader(state) {
      state.showHeader = !state.showHeader;
    }
  },

  actions: {
    ToggleHeader({ commit }) {
      commit("ToggleHeader");
    },
    GET_COUNTRY({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api_country")
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    GET_CITY({ commit }, parent_id) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api_country", { parentid: parent_id })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    GET_LEAGAL_STATUS({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api_legalstatus")
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    GET_ACTIVITIES({ commit }, activities) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api_activities", { name: activities })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    FILE_UPLOAD({ commit }, file) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api_fileupload_google", { file: file, access_key: "uaect1234" })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    //get units
    GET_UNITS({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api_product_units", {
            ...data
          })

          .then(response => {
            commit("SET_UNITS", response.data.result);
            resolve(response.data.result);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
