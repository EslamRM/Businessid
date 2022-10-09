import axios from "axios";
import { initialize } from "../../axiosConfig";

export default {
  state: {
    retrievedTokenDetail:
      JSON.parse(localStorage.getItem("access_token")) || null,
    count: 1000,
    user_id: null,
    profileIconUrl: "",
    profile: "",
    loggedIn: false
  },

  getters: {
    auth(state) {
      return state.loggedIn;
    }
  },

  mutations: {
    SET_PROFILE(state, data) {
      state.profile = data;
    },
    retrieveToken(state, token) {
      state.retrievedTokenDetail = token;
    },
    setUserToken(state, token) {
      state.loggedIn = true;
    },
    setUserId(state, userid) {
      state.userid = userid;
    },
    destroyToken(state) {
      state.retrievedTokenDetail = null;
      state.profile = "";
    },
    SET_PROFILE_ICON_PATH(state, URL) {
      state.profileIconUrl = URL;
      // state.userToken = state.retrievedTokenDetail.result.token;
      // const profileIconUrl = "https://www.uaect.com/assets/profile/";
      // const CoverUrl = "https://www.uaect.com/assets/profile/cover/";
      // const profileLogo =
      //   profileIconUrl + state.retrievedTokenDetail.result.logo;
      // const profileCover = CoverUrl + state.retrievedTokenDetail.result.cover;
      // state.retrievedTokenDetail.result.logo = profileLogo;
      // state.retrievedTokenDetail.result.cover = profileCover;
      // console.log(state.retrievedTokenDetail);
    },
    SET_SWITCHED_USER_ID(state, data) {
      state.user_id = data;
    },
    SET_NOTIF_COUNT(state, data) {
      if (!state.profile || !state.profile.notification_badge_counts) return;
      state.profile.notification_badge_counts = data;
    }
  },

  actions: {
    LOGIN({ commit }, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post("/login", {
            ...userData
          })
          .then(response => {
            if (response.data.success == true) {
              console.log(response);
              console.log("js...response");
              const token = response.data;
              const usersToken = response.data.token;
              const userid = response.data.result.userid;
              console.log("Result Login:" + userid);
              localStorage.setItem("access_token", JSON.stringify(token));
              localStorage.setItem("token", usersToken);
              localStorage.setItem("switched_user_id", userid);
              initialize(null, null);
              console.log("logging local storage item");
              console.log(localStorage.getItem("token"));
              // axios.defaults.headers.common["Authorization"] = `Bearer ${usersToken}`
              commit("retrieveToken", token);
              commit("setUserToken", usersToken);
              commit("setUserId", userid);
              commit("SET_SWITCHED_USER_ID", userid);

              //commit("SET_PROFILE_ICON_PATH", response.data.profileIconUrl);
              //commit("SET_PROFILE", response.data.result);
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    REGISTER_PERSONAL({ commit }, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post("/register_personal", {
            ...userData
          })
          .then(response => {
            if (response.data.success == true) {
              console.log(response);

              const token = response.data;
              const usersToken = response.data.result.token;
              const userid = response.data.result.userid;

              localStorage.setItem("access_token", JSON.stringify(token));
              localStorage.setItem("token", usersToken);
              localStorage.setItem("switched_user_id", userid);
              initialize(null, null);
              // axios.defaults.headers.common["Authorization"] = `Bearer ${usersToken}`
              commit("retrieveToken", token);
              commit("setUserToken", usersToken);
              commit("SET_PROFILE_ICON_PATH", response.data.profileIconUrl);
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    REGISTER_BUSINESS({ commit }, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post("/register_business", {
            ...userData
          })
          .then(response => {
            if (response.data.success == true) {
              const token = response.data;
              const usersToken = response.data.result.token;
              const userid = response.data.result.userid;

              localStorage.setItem("access_token", JSON.stringify(token));
              localStorage.setItem("token", usersToken);
              localStorage.setItem("switched_user_id", userid);
              initialize(null, null);
              //axios.defaults.headers.common["Authorization"] = `Bearer ${usersToken}`
              commit("retrieveToken", token);
              commit("setUserToken", usersToken);
              commit("SET_PROFILE_ICON_PATH", response.data.profileIconUrl);
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    destroyTokenHandler(context) {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.userToken
      return new Promise((resolve, reject) => {
        context
          .dispatch("switchAccounts")
          .then(() => {
            axios
              .post("/logout")
              .then(response => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("token");
                localStorage.removeItem("switched_user_id");

                // delete axios.defaults.headers.common["Authorization"];
                console.log("logging local storage item");
                console.log(localStorage.getItem("access_token"));
                context.commit("destroyToken");
                resolve(response);
              })
              .catch(error => {
                localStorage.removeItem("access_token");
                context.commit("destroyToken");
                reject(error);
              });
          })
          .catch(err => console.log(err));
      });
    },
    getUserProfile() {},
    RetrievingLogedUserDetails({ commit }) {
      commit("RETRIEVING_LOG_DETAILS");
    },
    switchedUserId({ commit }) {
      commit("SET_SWITCHED_USER_ID", localStorage.getItem("switched_user_id"));
    },

    //for getting logged in user info
    loggedIn_profile({ commit, getters }) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      const user_id = localStorage.getItem("switched_user_id");
      if (user_id) {
        return new Promise((resolve, reject) => {
          axios
            .post("profile", {
              profileid: user_id
            })
            .then(response => {
              commit("SET_PROFILE", response.data);
              resolve(response.data);
            })
            .catch(error => {
              reject(error);
              console.log(error);
            });
        });
      }
    },

    async switchAccounts({ state }) {
      try {
        const company_id = await state.retrievedTokenDetail.result.userid;
        const res = await axios.post("/dashboard/switch-account", {
          company_id
        });
        if (res.data.success) {
          return true;
        }

        return false;
      } catch (error) {
        if (error) console.log(error);
        return false;
      }
    },
    async notificationCheck({ commit }) {
      try {
        const response = await axios.post("/check-notification");
        const { success } = await response.data;
        if (!success) return;
        await commit("SET_NOTIF_COUNT", "0");
        return true;
      } catch (error) {
        if (!error) return false;
        console.log(error);
        return false;
      }
    },
    setNotificationCount({ commit }, data) {
      commit("SET_NOTIF_COUNT", data);
    },
    CHANGE_PASSWORD({ commit }, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post("/profile/change_password", {
            ...userData
          })
          .then(response => {
            if (response.data.success == true) {
              console.log(response);
              console.log("js...response");
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }

  }
};
