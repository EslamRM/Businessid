import axios from "axios";

export default {
  state: {
    newsFeed: null,
    //token:JSON.parse(localStorage.getItem("token")) || null,s
    postFileUrl: null,
    profileIconUrl: null,
    profileFeed: null,
    profileTimeline: null,
    post: null //get single post
  },

  getters: {
    getNewsFeed(state) {
      return state.newsFeed;
    },
    getsignlePost(state) {
      return state.post;
    },
    getProfileFeed(state) {
      return state.profileFeed;
    },
    getProfileTimeline(state) {
      return state.profileTimeline;
    },
    getProfileUrl(state) {
      return state.postFileUrl;
    },
    getProfileIconUrl(state) {
      return state.profileIconUrl;
    },
    getShared(state, data) {
      return state.newsFeed;
    }
    // GET_LIKES(state){
    //      return state.liked;
    // }
  },

  mutations: {
    SET_SIGNLE_POST(state, post) {
      state.post = post;
    },
    SET_NEWS_FEED(state, news) {
      state.newsFeed = news;
    },
    SET_PROFILE_URL(state, url) {
      state.postFileUrl = url;
    },
    SET_PROFILE_ICON_URL(state, url) {
      state.profileIconUrl = url;
    },
    APPEND_NEWS_FEED(state, news) {
      state.newsFeed = [...state.newsFeed, ...news];
    },
    SET_SHARE(state, data) {
      state.newsFeed.unshift(...data);
    },
    SET_POST(state, data) {
      state.newsFeed.unshift(...data);
      state.profileTimeline.unshift(...data);
    },
    DELETE_POST(state, id) {
      var lists = state.newsFeed.filter(feed => {
        return feed.pk_post_id != id;
      });
      state.newsFeed = lists;
    },
    DELETE_TIMELINE_POST(state, id) {
      var lists = state.profileTimeline.filter(feed => {
        return feed.pk_post_id != id;
      });
      state.profileTimeline = lists;
    },
    SET_PROFILE_FEED(state, news) {
      state.profileFeed = news;
    },
    APPEND_PROFILE_FEED(state, news) {
      state.profileFeed = [...state.profileFeed, ...news];
    },
    SET_PROFILE_TIMELINE(state, news) {
      state.profileTimeline = news;
    },
    APPEND_PROFILE_TIMELINE(state, news) {
      state.profileTimeline = [...state.profileTimeline, ...news];
    },
    SET_EMPTY(state) {
      state.newsFeed = [];
    }
  },

  actions: {
    reportPost({ commit, getters }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("common/report", {
            ...data
          })
          .then(response => {
           
           
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    AddPost({ commit, getters }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_post_data", {
            ...data
          })
          .then(response => {
            console.log(response.data);
            resolve(response.data.results);
            commit("SET_POST", response.data.results);
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    DeletePost({ commit, getters }, data) {
      if (data.model == "Timeline") {
        commit("DELETE_TIMELINE_POST", data.postid);
      } else {
        commit("DELETE_POST", data.postid);
      }

      return new Promise((resolve, reject) => {
        axios
          .post("api_delete_post", {
            postid: data.postid
          })
          .then(response => {
            resolve(response.data.results);
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    LoadPosts({ commit, getters }, page) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_get_newsfeed_posts", {
            page: page
          })
          .then(response => {
            resolve(response.data);
            const { posts, postFileUrl, profileIconUrl } = response.data;

            if (page > 1) {
              commit("APPEND_NEWS_FEED", posts);
            } else {
              commit("SET_NEWS_FEED", posts);
              commit("SET_PROFILE_URL", postFileUrl);
              commit("SET_PROFILE_ICON_URL", profileIconUrl);
            }
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //get single post
    getPost({ commit, getters }, postid) {
      //const authrisation_toekn  = getters.GET_TOKEN;
      return new Promise((resolve, reject) => {
        axios
          .post("api_get_newsfeed_post", {
            postid
          })
          .then(response => {
            resolve(response.data);

            const { post } = response.data;
            commit("SET_SIGNLE_POST", post);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //PROFILE FEED POST
    profile_feed({ commit, getters }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_get_profile_feed", {
            ...data
          })
          .then(response => {
            resolve(response.data);
            const { posts } = response.data;

            if (data.page > 1) {
              commit("APPEND_PROFILE_FEED", posts);
            } else {
              commit("SET_PROFILE_FEED", posts);
            }
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //profile timeline
    profile_timeline({ commit, getters }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_profile_timeline", {
            ...data
          })
          .then(response => {
            resolve(response.data);
            const { posts } = response.data;

            if (data.page > 1) {
              commit("APPEND_PROFILE_TIMELINE", posts);
            } else {
              commit("SET_PROFILE_TIMELINE", posts);
            }
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //save post
    savePost({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_favorite", {
            ...data
          })
          .then(response => {
            resolve(response.data);
            commit("SET_POST", response.data.results);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //share post
    sharePost({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_share_post", {
            ...data
          })
          .then(response => {
            console.log(response.data.results[0]);

            commit("SET_SHARE", response.data.results);
            resolve(response.data.results);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },

    //delete comment
    deleteComment({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_delete_comment", {
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
    LoadComment({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("api_load_comment", {
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

    //make newsfeed empty
    EmptyNewsFed({ commit }) {
      commit("SET_EMPTY");
    }
  }
};
