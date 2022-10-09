import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "./assets/css/default.css";
import VueCarousel from "vue-carousel";
// import "nprogress/nprogress.css";
import "vue-datetime/dist/vue-datetime.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueDatePicker from "@mathieustan/vue-datepicker";
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";
import VueClipboard from "vue-clipboard2";
import VueSocialSharing from "vue-social-sharing";

Vue.use(VueSocialSharing);
Vue.use(VueClipboard);

import App from "./App";

import router from "./router";
import ProductZoomer from "vue-product-zoomer";
import Carousel3d from "vue-carousel-3d";
import store from "./store/store";
import infiniteScroll from "vue-infinite-scroll";
import VueTelInput from "vue-tel-input";
import VueTheMask from "vue-the-mask";
import VueLazyload from "vue-lazyload";
import Vuelidate from "vuelidate";
import VueConfirmDialog from "vue-confirm-dialog";
import VueProgressBar from "vue-progressbar";
import VueObserveVisibility from "vue-observe-visibility";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, fontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.use(VueObserveVisibility);
library.add(fas);
Vue.component("font", FontAwesomeIcon);

Vue.use(VueObserveVisibility);
Vue.use(VueSweetalert2);
Vue.use(VueConfirmDialog);
Vue.use(VueDatePicker);

Vue.use(Vuelidate);
// import VuePlyr from 'vue-plyr';
// import 'vue-plyr/dist/vue-plyr.css';
// Vue.use(VuePlyr)

// google map
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBL-6ljoMEKsptaPA7BxBAp_Z8m-QIh9Xk",

    //AIzaSyBL-6ljoMEKsptaPA7BxBAp_Z8m-QIh9Xk
    libraries: "places" // necessary for places input
  }
});
Vue.use(VueLazyload);

Vue.config.productionTip = false;

Vue.use(infiniteScroll);
Vue.use(Carousel3d);
Vue.component("v-select", vSelect);

Vue.use(VueTelInput, { validCharactersOnly: true });
Vue.use(VueMaterial);
Vue.use(VueCarousel);
Vue.use(ProductZoomer);
const options = {
  color: "#ff5722",
  failedColor: "#213c64",
  thickness: "2.5px",
  transition: {
    speed: "0.3s",
    opacity: "0.6s",
    termination: 700
  },
  autoRevert: true,
  location: "top",
  inverse: false
};

Vue.use(VueProgressBar, options);

Vue.material.locale.dateFormat = "DD/MM/YYYY";
import moment from "vue-moment";
import helpers from "../src/helpers/general";
import methods from "../src/helpers/mixins";
import LazyLoadDirective from "../src/helpers/LazyLoadDirective";
Vue.directive("lazyload", LazyLoadDirective);
import { initialize } from "../src/store/axiosConfig";

const generalHelpers = {
  install() {
    Vue.helpers = helpers;
    Vue.prototype.$helpers = helpers;
  }
};
initialize(store, router);

Vue.use(generalHelpers);
Vue.use(moment);
Vue.use(VueTheMask);
//filter for getting digit by comma
Vue.filter("getDigitSeperateComa", function(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});
Vue.mixin({
  methods
});
Vue.directive("click-outside", {
  bind() {
    this.event = event => this.vm.$emit(this.expression, event);

    this.el.addEventListener("click", this.stopProp);

    document.body.addEventListener("click", this.event);
  },

  unbind() {
    this.el.removeEventListener("click", this.stopProp);

    document.body.removeEventListener("click", this.event);
  },

  stopProp(event) {
    event.stopPropagation();
  }
});

Vue.config.devtools = true; //remove this after production
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
// router.beforeResolve((to, from, next) => {
//   if (to.name) {
//     NProgress.start();
//   }
//   next();
// });
// router.afterEach((to, from) => {
//   NProgress.done();
// });
