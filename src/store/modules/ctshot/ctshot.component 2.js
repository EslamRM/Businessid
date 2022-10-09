import axios from "axios";
import Vue from "vue";
export default {
  state: {
    postFileUrl: "https://www.uaect.com/assets/testUpload/",
    advFileUrl: "https://www.uaect.com/admin/assets/advertisement/",
    videoPosterPath: "https://www.uaect.com/assets/videothumb/",
    profileIconUrl: "https://www.uaect.com/assets/profile/",
    ctshots: [],
    DetailImage: [],
    RelatedImage: [],
    RelatedVideo: [],
    DetailVideo: [],
    NextVideos: []
  },

  getters: {
    getCtshots(state) {
      return state.ctshots;
    },
    getDetailImage(state) {
      return state.DetailImage;
    },
    getRelatedImage(state) {
      return state.RelatedImage;
    },
    getDetailVideo(state) {
      return state.DetailVideo;
    },
    getNextVideo(state) {
      return state.NextVideos;
    },

    geRelatedVideo(state) {
      return state.RelatedVideo;
    }
    // getProfileIconUrl(state)
    // {
    //     return state.profileIconUrl;
    // },
    // GET_LIKES(state){
    //      return state.liked;
    // }
  },

  mutations: {
    SET_SHOT(state, data) {
      state.ctshots = data;

      //Vue.set(state,state.statistics, data)
    },
    APPEND_CTSHOT(state, data) {
      state.ctshots = [...state.ctshots, ...data];
    },
    SET_IMAGE(state, data) {
      state.DetailImage = data;
    },
    SET_RELATED_IMAGE(state, data) {
      state.RelatedImage = data;
    },
    APPEND_RELATED_IMAGE(state, data) {
      state.RelatedImage = [...state.RelatedImage, ...data];
    },
    SET_VIDEO(state, data) {
      state.DetailVideo = data;
    },
    SET_NEXT_VIDEO(state, data) {
      state.NextVideos = data;
    },
    APPEND_NEXT_VIDEO(state, data) {
      state.NextVideos = [...state.NextVideos, ...data];
    },
    SET_RELATED_VIDEO(state, data) {
      state.RelatedVideo = data;
    },
    APPEND_RELATED_VIDEO(state, data) {
      state.RelatedVideo = [...state.RelatedVideo, ...data];
    }
  },

  actions: {
    //list ctshots
    Loadctshots({ commit, getters }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_get_ctshots", {
            ...data
          })
          .then(response => {
            resolve(response.data);
            const { posts } = response.data;
            if (data.page > 1) {
              commit("APPEND_CTSHOT", posts);
            } else {
              commit("SET_SHOT", posts);
            }
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    LoadImage({ commit, getters }, id) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_get_image", {
            post_file_id: id
          })
          .then(response => {
            resolve(response.data);
            const { image } = response.data;
            commit("SET_IMAGE", image);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    LoadRelatedImage({ commit, getters }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_get_related_image", {
            ...data
          })
          .then(response => {
            resolve(response.data);
            const { relatedImages } = response.data;
            if (data.page > 1) {
              commit("APPEND_RELATED_IMAGE", relatedImages);
            } else {
              commit("SET_RELATED_IMAGE", relatedImages);
            }
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    LoadVideo({ commit, getters }, id) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_get_video", {
            post_file_id: id
          })
          .then(response => {
            resolve(response.data);
            const { video } = response.data;
            commit("SET_VIDEO", video);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    LoadNextVideo({ commit, getters }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_get_next_videos", {
            ...data
          })
          .then(response => {
            const { nextVideos } = response.data;
            if (nextVideos) {
              if (data.page > 1) {
                commit("APPEND_NEXT_VIDEO", nextVideos);
              } else {
                commit("SET_NEXT_VIDEO", nextVideos);
              }
            } else {
              reject("error");
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    LoadRelatedVideo({ commit, getters }, data) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_get_related_video", {
            ...data
          })
          .then(response => {
            const { relatedVideo } = response.data;
            if (relatedVideo) {
              if (data.page > 1) {
                commit("APPEND_RELATED_VIDEO", relatedVideo);
              } else {
                commit("SET_RELATED_VIDEO", relatedVideo);
              }
            } else {
              reject(error);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
