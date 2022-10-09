import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import user from "./modules/user/user.component";
import homepage from "./modules/homepage/homepage.component";
import newsFeed from "./modules/newsFeed/newsfeed.component";
import general from "./modules/general/general.component";
import statistic from "./modules/statistic/statistic.component";
import ctshot from "./modules/ctshot/ctshot.component";
import profile from "./modules/profile/profile.component";
import store from "./modules/store/store";
import dsmarket from "./modules/dsmarket/dsmarket";
import AddItem from "./modules/dsmarket/addItems";
import Cart from "./modules/cart/cart";
import Dashboard from "./modules/dashboard/dashboard";
export default new Vuex.Store({
  namespaced: true,
  modules: {
    user,
    homepage,
    newsFeed,
    general,
    statistic,
    ctshot,
    profile,
    store,
    dsmarket,
    AddItem,
    Cart,
    Dashboard
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
});
