import axios from "axios";
axios.defaults.baseURL = process.env.BASE_URL;
export default {
  state: {
    products: null,
    properties: null,
    services: null,
    autos: null,
    propertyDetails: [],
    productCategories: null,
    productDimensions: null,
    productBrands: null,
    propertyCategories: null,
    isDetailPage: false, //for toggling product details page
    productDetails: "", //for the product detailspage,
    serviceDetail: "",
    autoCategory: "",
    autoFeatures: "",
    similarProducts: "",
    attributes: "",
    AutoCompleteItems: [],
    productShipping: [],
    productStockLocation: [],
    currencyRates: "",
  },

  getters: {
    getProducts(state) {
      return state.products;
    },
    getProperties(state) {
      return state.properties;
    },
    getServices(state) {
      return state.services;
    },
    getAutos(state) {
      return state.autos;
    },
    getProductCategories(state) {
      return state.productCategories;
    },
    getProductBrands(state) {
      return state.productBrands;
    },
    getCurrencyRates(state) {
      return state.currencyRates;
    }
  },

  mutations: {
    SET_PRODUCT_SHIPPING(state, result) {
      state.productShipping = result;
    },
    SET_PRODUCT_STOCK_LOCATION(state, result) {
      state.productStockLocation = result;
    },
    SET_ATTRIBUTES(state, result) {
      state.attributes = result;
    },
    SET_PRODUCTS(state, result) {
      state.products = result;
    },
    APPEND_PRODUCTS(state, result) {
      state.products = [...state.products, ...result];
    },
    SET_PROPERTIES(state, result) {
      state.properties = result;
    },
    APPEND_PROPERTIES(state, result) {
      state.properties = [...state.properties, ...result];
    },
    SET_SERVICES(state, result) {
      state.services = result;
    },
    APPEND_SERVICES(state, result) {
      state.services = [...state.services, ...result];
    },
    SET_AUTOS(state, result) {
      state.autos = result;
    },
    APPEND_AUTOS(state, result) {
      state.autos = [...state.autos, ...result];
    },
    SET_PRODUCT_CATEGORIES(state, result) {
      state.productCategories = result;
    },
    SET_PRODUCT_DIMENSIONS(state, result) {
      state.productDimensions = result;
    },
    SET_PROPERTY_CATEGORIES(state, result) {
      state.propertyCategories = result;
    },
    SET_PRODUCT_BRAND(state, result) {
      state.productBrands = result;
    },
    SET_PRODUCT_DETAILS(state, data) {
      state.productDetails = data;
    },
    SET_PROPERTY_DETAILS(state, data) {
      state.propertyDetails = data;
    },
    SET_SERVICE_DETAILS(state, data) {
      state.serviceDetail = data;
    },
    SET_CATEGORY_TYPE(state, data) {
      state.autoCategory = data;
    },
    SET_AUTO_FEATURE(state, data) {
      state.autoFeatures = data;
    },
    SET_SIMILAR_PRODUCT(state, data) {
      state.similarProducts = data;
    },
    SET_SEARCH(state, data) {
      state.AutoCompleteItems = data;
    },
    SET_CURRENCY_RATES(state, data) {
      state.currencyRates = data;
    }
    
  },

  actions: {
    LoadProducts({ commit, getters }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_products", {
            ...data
          })
          .then(response => {
            resolve(response.data);
            const { products, postFileUrl, profileIconUrl } = response.data;

            if (data.page > 1) {
              commit("APPEND_PRODUCTS", products);
            } else {
              commit("SET_PRODUCTS", products);
            }
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    LoadProperties({ commit, getters }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_properties", {
            ...data
          })
          .then(response => {
            resolve(response.data);
            const { properties } = response.data;

            if (data.page > 1) {
              commit("APPEND_PROPERTIES", properties);
            } else {
              commit("SET_PROPERTIES", properties);
            }
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //load property types
    propertyCategories({ commit, getters }, parentid) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("property-types", {
            parentid
          })
          .then(response => {
            resolve(response.data);
            commit("SET_PROPERTY_CATEGORIES", response.data.result);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    //load property types
    propertyCategories({ commit, getters }, parentid) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("property-types", {
            parentid
          })
          .then(response => {
            resolve(response.data);
            commit("SET_PROPERTY_CATEGORIES", response.data.result);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //load service
    LoadServices({ commit, getters }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_services", {
            ...data
          })
          .then(response => {
            resolve(response.data);
            const { products } = response.data;

            if (data.page > 1) {
              commit("APPEND_SERVICES", products);
            } else {
              commit("SET_SERVICES", products);
            }
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //load autos
    LoadAutos({ commit, getters }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_autos", {
            ...data
          })
          .then(response => {
            resolve(response.data);
            const { autos } = response.data;

            if (data.page > 1) {
              commit("APPEND_AUTOS", autos);
            } else {
              commit("SET_AUTOS", autos);
            }
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //load PRODUCT CATEGORIES
    loadCategories({ commit, getters }, parentid) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_categories", {
            parentid
          })
          .then(response => {
            resolve(response.data);
            commit("SET_PRODUCT_CATEGORIES", response.data.category);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //load PRODUCT DIMENSIONS
    loadDimensions({ commit, getters }, category_id) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_dimensions", {
            category_id
          })
          .then(response => {
            resolve(response.data);
            commit("SET_PRODUCT_DIMENSIONS", response.data.dimensions);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //load product brand

    loadBrand({ commit, getters }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_product_brands", {
            ...data
          })
          .then(response => {
            commit("SET_PRODUCT_BRAND", response.data.result);
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //get currency rates
    loadCurrencyRates({ commit, getters }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .get("api_currency_rates")
          .then(response => {
            commit("SET_CURRENCY_RATES", response.data.result);
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //load product shipping
    getProductShipping({ commit, getters }, search) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_product_shipping", {
            search
          })
          .then(response => {
            resolve(response.data);
            commit("SET_PRODUCT_SHIPPING", response.data);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //load product stock location

    getProductStockLocation({ commit, getters }, search) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_product_stock_location", {
            search
          })
          .then(response => {
            resolve(response.data);
            commit("SET_PRODUCT_STOCK_LOCATION", response.data);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //load property details
    propertyDetails({ commit, getters }, productid) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_product_details", {
            productid
          })
          .then(response => {
            resolve(response.data.products);
            commit("SET_PROPERTY_DETAILS", response.data.products);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    //load product details
    productDetails({ commit, getters }, productid) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_product_details", {
            productid
          })
          .then(response => {
            resolve(response.data.products);
            commit("SET_PRODUCT_DETAILS", response.data.products);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //load SERCIVE details
    serviceDetails({ commit, getters }, productid) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_product_details", {
            productid
          })
          .then(response => {
            resolve(response.data.products);
            commit("SET_SERVICE_DETAILS", response.data.products);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    //load SERCIVE details
    loadCategoryType({ commit, getters }, parentid) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_auto_types", {
            parentid
          })
          .then(response => {
            resolve(response.data);
            commit("SET_CATEGORY_TYPE", response.data.result);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //load similar products
    //load SERCIVE details
    similarProducts({ commit, getters }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_related_items", {
            ...data
          })
          .then(response => {
            resolve(response.data);
            commit("SET_SIMILAR_PRODUCT", response.data.relatedProducts);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //load auto features

    loadAutoFeatures({ commit, getters }, categoryid) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_auto_category_features", {
            categoryid
          })
          .then(response => {
            commit("SET_AUTO_FEATURE", response.data.result);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //product attributes
    loadProductAttributes({ commit, getters }, child_category_id) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_product_attributes", {
            child_category_id
          })
          .then(response => {
            resolve(response.data.result);
            commit("SET_ATTRIBUTES", response.data.result);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    SearchProduct({ commit }, data) {
      return new Promise((resolve, reject) => {
        const url = "api_products";
        if (data.model == "auto") {
        }
        axios
          .post(url, {
            search: data.search,
            page: data.page
          })
          .then(response => {
            resolve(response);
            //commit("SET_SEARCH", response.data);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //search category
    SearchCategory({ commit }, search) {
      return new Promise((resolve, reject) => {
        const url = "api_all_market_categories";

        axios
          .post(url, {
            search
          })
          .then(response => {
            resolve(response.data);
            //commit("SET_SEARCH", response.data);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //select category
    SelectCategory({ commit }, category_id) {
      return new Promise((resolve, reject) => {
        const url = "api_select_category";

        axios
          .post(url, {
            category_id
          })
          .then(response => {
            resolve(response.data);
            //commit("SET_SEARCH", response.data);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //set data to detials page

    detailsPage({ commit }, data) {
      commit("SET_PRODUCT_DETAILS", data);
    }
  }
};
