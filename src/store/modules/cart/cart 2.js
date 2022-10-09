import axios from "axios";
import Vue from "vue";
export default {
  state: {
    cart: [],
    default_checkout_address: "",
    showInvalidQtyToast:false,

  },

  getters: {
    getCartCount(state) {
      var length = 0;
      if (state.cart) {
        state.cart.forEach(item => {
          length += item.items.length;
        });
      }
      return length;
    },
    getCart(state) {
      return state.cart;
    }
  },

  mutations: {
    toggleToastMessage(state,data)
    {
      state.showInvalidQtyToast = data;
    },
    SET_DEFAULT_ADDRESS(state, data) {
      state.default_checkout_address = data;
    },
    SET_CART(state, data) {
      //state.cart = [...state.cart, ...data];
      state.cart = data;
    },
    EMPTY_CART(state) {
      state.cart = [];
    },
    RemoveCart(state, data) {
      const result = state.cart.map(item => {
        item.items.find(val => {
          val.fk_product_id != data.productid;
        });
      });
    }
  },

  actions: {
     //hide toast

     HideToastError({commit},data){
     
      commit("toggleToastMessage",data)
    },
    //error toast for invalid qty true/false
    ShowToastError({commit,dispatch},data){
      commit("toggleToastMessage",data)
      setTimeout(() => {
        dispatch('HideToastError',false)
      }, 3000)
    },
    //get all cart items
    getCart({ commit, getters }) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_get_cart")
          .then(response => {
            commit("SET_CART", response.data.result);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //update qty

    UpdateCart({ commit, getters, dispatch }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_update_quantity", {
            ...data
          })
          .then(response => {
            resolve(response);
            // dispatch("getCart");
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    AddToCart({ commit, getters, dispatch }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_addto_cart", {
            ...data
          })
          .then(response => {
            resolve(response);
            dispatch("getCart");
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    //remove cart
    RemoveCart({ commit, getters, dispatch }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_remove_cart", {
            ...data
          })
          .then(response => {
            resolve(response);
            dispatch("getCart");
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    //remove cart staticialy from objects
    DeleteCart({ commit }, data) {
      commit("RemoveCart", data);
    },

    //checkoout
    checkout({ commit, getters, dispatch }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_checkout", {
            ...data
          })
          .then(response => {
            resolve(response);
            // dispatch("getCart");
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // place order
    place_order({ commit, getters, dispatch }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("checkout", {
            ...data
          })
          .then(response => {
            resolve(response);
            // dispatch("getCart");
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // update_order_status
    update_order_status({ commit, getters, dispatch }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_market/update_order_status", {
            ...data
          })
          .then(response => {
            resolve(response);
            // dispatch("getCart");
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //order summary
    cart_summary({ commit, getters, dispatch }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_cart_summary", {
            ...data
          })
          .then(response => {
            resolve(response.data);
            // dispatch("getCart");
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    //get checout address
    checkout_address({ commit, getters, dispatch }) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("billing/address/get")
          .then(response => {
            console.log(response.data);
            resolve(response.data);
            // dispatch("getCart");
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //add checout address
    add_checkout_address({ commit, getters, dispatch }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("billing/address/add", data)
          .then(response => {
            resolve(response.data);
            // dispatch("getCart");
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //get Single checout address
    address_details({ commit, getters, dispatch }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("billing/address/details", data)
          .then(response => {
            console.log(response.data);
            resolve(response.data);
            // dispatch("getCart");
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //update checout address
    update_checkout_address({ commit, getters, dispatch }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("billing/address/update", data)
          .then(response => {
            resolve(response.data);
            // dispatch("getCart");
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // select default Address
    select_default_address({ commit }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("billing/address/select", data)
          .then(response => {
            resolve(response.data);
            if (response.data.success)
              commit("SET_DEFAULT_ADDRESS", data.addressid);
            // dispatch("getCart");
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    //get payment option

    payment_options({ commit, getters, dispatch }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_payment_option", {
            ...data
          })
          .then(response => {
            resolve(response.data);
            // dispatch("getCart");
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //empty all cart
    emptyCart({ commit }) {
      commit("EMPTY_CART");
    }
  }
};
