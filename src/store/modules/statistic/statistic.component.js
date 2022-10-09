import axios from "axios";
import Vue from "vue";
axios.defaults.baseURL = process.env.BASE_URL;
export default {
  state: {
    profileIconUrl: process.env.BASE_URL + "assets/profile/",
    CoverUrl: process.env.BASE_URL + "assets/profile/cover/",
    statistics: [],
     showMobileFilter: false
  },

  getters: {
    getStatistics(state) {
      return state.statistics;
    },
    getToggleMobileFilterFlag(state) {
      return state.showMobileFilter;
    }

    // getProfileUrl(state)
    // {
    //     return state.postFileUrl;
    // },
    // getProfileIconUrl(state)
    // {
    //     return state.profileIconUrl;
    // },
    // GET_LIKES(state){
    //      return state.liked;
    // }
  },

  mutations: {
    SET_STATISTIC(state, data) {
      state.statistics = data;

      //Vue.set(state,state.statistics, data)
    },
    APPEND_STATISTIC(state, data) {
      state.statistics = [...state.statistics, ...data];
    },
    SHOW_MOBILE_FILTER(state, data) {
      state.showMobileFilter = data
    }
  },

  actions: {
    LoadStatistic({ commit, getters }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_get_statistics", {
            ...data
          })
          .then(response => {
            resolve(response.data);
            const { posts } = response.data;
            if (data.page > 1) {
              commit("APPEND_STATISTIC", posts);
            } else {
              commit("SET_STATISTIC", posts);
            }
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //follow user
    followUser({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_follow", {
            ...data
          })
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    AutoCompleteCompany({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_company_suggestion", {
            ...data
          })
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    showMobileFilter({ commit }, data) {
      commit("SHOW_MOBILE_FILTER", data)
    }
  }
};
