import axios from "axios";
export default {
  state: {
    vendorOrdersCount: {},
    activeTab: "",
    buyerOrdersCount: {},
    buyeractiveTab: ""
  },
  getters: {},

  mutations: {
    SET_VENDOR_ORDERS_COUNT(state, result) {
      state.vendorOrdersCount = result;
    },
    SET_VENDOR_ORDERS_ACTIVE_TAB(state, result) {
      state.activeTab = result;
    },
    SET_BUYER_ORDERS_COUNT(state, result) {
      state.buyerOrdersCount = result;
    },
    SET_BUYER_ORDERS_ACTIVE_TAB(state, result) {
      state.buyeractiveTab = result;
    }
  },
  actions: {
    // VENDORS ----> Manage Stock Location
    //add checout address
    add_stock_location({ commit, getters, dispatch }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("/vendor/stock-location/add", data)
          .then(response => {
            resolve(response.data);
            // dispatch("getCart");
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //update checout address
    update_stock_location({ commit, getters, dispatch }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("/vendor/addrestock-locationss/update", data)
          .then(response => {
            resolve(response.data);
            // dispatch("getCart");
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
