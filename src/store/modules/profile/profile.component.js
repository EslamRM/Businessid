import axios from "axios";
import Vue from "vue";
export default {
  state: {
    loader: false,
    globalDashboardLoader: false,
    dashboard_access: null,
    dashboard_menu: [],
    dashboard_market_category: null,
    dashboard_market_type: null,
    notifications: null,
    title: null,
    user_access: null,
    profilePage: "",
    profileFeed: "",
    isLoading: false,
    photos: null,
    videos: null,
    banners:"",
  },

  getters: {
    getProfilephotos(state) {
      return state.photos;
    },
    getProfilevideos(state) {
      return state.videos;
    },
    getDashboardAccess(state) {
      return state.dashboard_access;
    }
  },

  mutations: {
    TURN_ON_LOADER(state, data) {
      if (!data) {
        setTimeout(() => {
          state.loader = false;
        }, 1500);
      } else {
        state.loader = true;
      }
    },
    SET_DASHBOARD_ACCESS(state, data) {
      state.dashboard_access = data;
    },
    SET_DASHBOARD_TITLE(state, data) {
      state.title = data;
    },
    SET_DASHBOARD_MARKET_TYPE(state, data) {
      state.dashboard_market_type = data;
    },
    SET_DASHBOARD_MARKET_CATEGORY(state, data) {
      state.dashboard_market_category = data;
    },
    SET_DASHBOARD_MENU(state, data) {
      state.dashboard_menu = data;
    },
    SET_PROFILE_PAGE(state, data) {
      state.profilePage = data;
    },
    SET_PROFILE_FEED(state, data) {
      state.profileFeed = data;
    },
    SET_PROFILE_PHOTOS(state, result) {
      state.photos = result;
    },
    APPEND_PROFILE_PHOTOS(state, result) {
      state.photos = [...state.photos, ...result];
    },
    SET_PROFILE_VIDEOS(state, result) {
      state.videos = result;
    },
    APPEND_PROFILE_VIDEOS(state, result) {
      state.videos = [...state.videos, ...result];
    },

    SET_GLOBAL_DASH_LOADER(state, data) {
      state.globalDashboardLoader = data;
    },
    SET_BANNER_ADDS(state,data)
    {
      state.banners=data;
    }
  },

  actions: {
    // Dashboard Access
    async dashboard_access({ commit, state }) {
      try {
        await commit("TURN_ON_LOADER", true);
        const res = await axios.post("/dashboard/access");
        const { success, message, result, title, user_access } = await res.data;
        if (!success) return false;

        await commit("SET_DASHBOARD_ACCESS", result);
        await commit("SET_DASHBOARD_TITLE", title);
        await commit(
          "SET_DASHBOARD_MARKET_TYPE",
          result.filter(el => el.type === "market_type" && el.access === "1")
        );
        await commit(
          "SET_DASHBOARD_MARKET_CATEGORY",
          result.filter(
            el => el.type === "market_category" && el.access === "1"
          )
        );
        await commit(
          "SET_DASHBOARD_MENU",
          result.filter(el => el.type === "menu" && el.access === "1")
        );
        await commit("TURN_ON_LOADER", false);
        return true;
      } catch (error) {
        if (error) {
          console.log(error);
          return false;
        }
      }
    },

    // 1. Check if dashboard_access function exists in state bcz when you login first time it might not be called.
    // 2. If not then dipatch that action and wait for it's response.
    // 3. If user is logged out he/she would not be able to make post request so if that is the case then return next("/login")

    // 4. Entered Further in Loop: Get the regex of the path from "to"
    // 5. Match the path from dashboard_access with this regex with .test(path-from-dashboard_access)
    // 6. It will return the object that is matched => Check if the permission object is undefined
    //    or it's access = 0 or its FALSE
    // 7. If yes the redirect to Login which will redirect to HomePage if you're already logged in.
    // 8. If none of the above i.e. You have access to that page then CONGO you made it there.
    // By Abhishek M. Patel (abhishekpatel167@gmail.com)

    async check_user_permission({ dispatch, commit, state }, { to, next }) {
      try {
        console.log(to);
        if (!state.dashboard_access) {
          const res = await dispatch("dashboard_access");
          if (!res)
            return next({
              path: "/"
            });
        }
        const pathRegex = await to.matched[1].regex;
        const permission = await state.dashboard_access.find(o =>
          pathRegex.test(o.path)
        );

        if (permission) {
          console.log(permission, "permission");
          if (permission.type === "market_type" && permission.access === "0") {
            console.log(permission, "permission");
            return next({
              // name: "logIn",
              // params: {
              //   redirectUrl: "/profilePage"
              // }
              path: "/"
            });
          } else if (
            permission.type === "market_category" &&
            permission.access === "0"
          ) {
            console.log(permission, "permission");
            return next({
              // name: "logIn",
              // params: {
              //   redirectUrl: "/profilePage"
              // }
              path: "/"
            });
          } else if (permission.type === "menu" && permission.access === "0") {
            console.log(permission, "permission");
            return next({
              // name: "logIn",
              // params: {
              //   redirectUrl: "/profilePage"
              // }
              path: "/"
            });
          }
        }
        // if (!permission || permission.type === "module") {
        //   return next();
        // }

        // if (!permission || !permission.access === "0" || !permission.access) {
        //   console.log(permission, "permission");
        //   return next({
        //     name: "logIn",
        //     params: {
        //       redirectUrl: "/profilePage"
        //     }
        //   });
        // }
        console.log("permission", permission);
        return next();
      } catch (error) {
        if (error) console.log(error);
      }
    },

    profile_info({ commit, getters }, id) {
      return new Promise((resolve, reject) => {
        axios
          .post("profile", {
            profileid: id
          })
          .then(response => {
            commit("SET_PROFILE_PAGE", response.data);
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //profile image

    profile_picture({ commit, getters }, file) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_profile_picture_update", {
            file
          })
          .then(response => {
            resolve(response);
            console.log(response);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    //cover base64 image
    cover_base64_picture({ commit, getters }, file) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_fileuploadbase64", {
            file
          })
          .then(response => {
            if (response.data.success == true) {
              resolve(response.data.results.files.fileUrl);
              const file = response.data.results.files.fileUrl;
            } else {
              console.log(
                "Something went wrong while uploading profile picture"
              );
            }
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //cover  image
    cover_picture({ commit, getters }, files) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_cover_picture_update", {
            files
          })
          .then(response => {
            resolve(response);
            // if(response.data.success==true)
            // {
            //     resolve(response.data.results.files.fileUrl);
            //     const file = response.data.results.files.fileUrl;
            // }
            // else
            // {
            //     console.log("Something went wrong while uploading profile picture")
            // }
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //profile photos

    profile_photos({ commit, getters }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_profile_images", {
            ...data
          })
          .then(response => {
            resolve(response.data);
            const { posts } = response.data;
            if (data.page > 1) {
              commit("APPEND_PROFILE_PHOTOS", posts);
            } else {
              commit("SET_PROFILE_PHOTOS", posts);
            }
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //profile videos

    profile_videos({ commit, getters }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_profile_videos", {
            ...data
          })
          .then(response => {
            resolve(response.data);
            const { posts } = response.data;
            if (data.page > 1) {
              commit("APPEND_PROFILE_VIDEOS", posts);
            } else {
              commit("SET_PROFILE_VIDEOS", posts);
            }
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //advertising listing 
    GET_BANNER_ADDS({ commit, getters }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("vendor/ads-manager", {
           ...data
          })
          .then(response => {
             
            
              commit("SET_BANNER_ADDS", response.data.result);
              resolve( response.data.result);
            
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    //add advertising  
    ADD_BANNER_ADDS({ commit, getters }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("vendor/post-add", {
            ...data
          })
          .then(response => {
             
            
              //commit("SET_BANNER_ADDS", response.data.result);
              resolve( response.data);
            
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

     //delete advertising  
     DELETE_BANNER_ADDS({ commit, getters }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("vendor/delete-ads", {
            ...data
          })
          .then(response => {
             
            
              //commit("SET_BANNER_ADDS", response.data.result);
              resolve( response.data);
            
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    // async notificationListing({ commit }, data) {
    //   await commit("SET_GLOBAL_DASH_LOADER", true);
    //   try {
    //     const response = await axios.post("/notifications", data);
    //     const { success, result, badge_counts, message } = await response.data;
    //     if (!success) return;
    //     await commit("SET_NOTIFICATIONS", { badge_counts, list: result });
    //     await commit("SET_GLOBAL_DASH_LOADER", false);
    //     console.log(response);
    //     return { message, success };
    //   } catch (error) {
    //     if (!error) return false;
    //     console.log(error);
    //     return false;
    //   }
    // },
  }
};
