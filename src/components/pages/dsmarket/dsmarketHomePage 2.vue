<template>
  <div>
    <div v-if="isMobileCheck == 'true' || isTabletCheck == 'true'">
      <homeMainSlider :banners="LoadBanners" />
      <mobileCategoryBlock />
      <categoryGrid :banners="LoadBanners" />
      <div class="margin_bottom mb-2"></div>
    </div>
    <div v-else>
      <div class="ds-mrkt-slr-bx pt-20">
        <div class="container">
          <div class="ds-mrkt-slr-bx-cnt">
            <div class="flex-bx-tp-1">
              <div class="div-1-250">
                <div class="side-menu patternHead">
                  <div class="ds category-heading">
                    <h2>
                      <router-link to="/all-category" class="d-inline-flex">
                        <i class="material-icons">list</i>
                        <span>Market Categories</span>
                      </router-link>
                    </h2>
                    <div class="category-menu-list">
                      <ul v-if="categories">
                        <li
                          class="right-menu"
                          v-for="(category, index) in categories"
                          :key="index"
                        >
                          <router-link
                            :to="{
                              path: 'store',
                              query: {
                                categories: category.categoryname,
                                l1value: category.categoryname,
                                l1id: category.category_id
                              }
                            }"
                            class="linkTo"
                          >
                            <div class="categoryItem">
                              <span>{{ category.categoryname }}</span>
                              <i
                                v-if="category.categories.length > 0"
                                class="material-icons"
                                >arrow_forward_ios</i
                              >
                            </div>
                          </router-link>
                          <div
                            class="cat-dropdown"
                            v-if="category.categories.length > 0"
                          >
                            <div
                              class="list-heading"
                              v-for="(sub_category,
                              index) in category.categories"
                              :key="index"
                            >
                              <router-link
                                :to="
                                  getUrl(category, sub_category, 'sub_category')
                                "
                                class="category-title"
                                >{{ sub_category.categoryname }}</router-link
                              >

                              <ul v-if="sub_category.categories.length > 0">
                                <li
                                  class=""
                                  v-for="(third_category,
                                  index) in sub_category.categories"
                                  :key="index"
                                >
                                  <router-link
                                    :to="
                                      getUrl(
                                        category,
                                        sub_category,
                                        'third_category',
                                        third_category
                                      )
                                    "
                                  >
                                    {{ third_category.categoryname }}
                                  </router-link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>

                        <li class="right-menu rx-parent">
                          <router-link to="/all-category" class="linkTo"
                            >View All</router-link
                          >
                        </li>
                      </ul>
                      <div class="loader" v-else>
                        <div class="circle-loader"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="div-2-auto">
                <div class="carousel-bx-cnt adjustTo">
                  <homeMainSlider :banners="LoadBanners"></homeMainSlider>
                </div>
              </div>
              <div class="div-1-250">
                <newProducts></newProducts>
              </div>
            </div>
          </div>
        </div>
      </div>
      <singleAds></singleAds>
      <div class="ds-grd-1">
        <categoryGrid :banners="LoadBanners"></categoryGrid>
      </div>
    </div>
  </div>
</template>
<script>
import ThirdCategory from "./third_category";
import { Carousel, Slide } from "vue-carousel";
import newProducts from "./dsmarketNewproducts";
import categoryGrid from "./categoryGrids";
import { mapState } from "vuex";
import singleAds from "./singleofferadd";

import { isMobile, isTablet } from "mobile-device-detect";
import homeMainSlider from "../../pages/homePage/homeMainSlider";
import mobileCategoryBlock from "../../../mobileComponents/mobileCategoryBlock";

export default {
  props: ["page", "images"],
  data() {
    return {
      categoryLoaded: false,
      isMobileCheck: isMobile ? "true" : "false",
      isTabletCheck: isTablet ? "true" : "false"
    };
  },
  components: {
    newProducts,
    Carousel,
    Slide,
    categoryGrid,
    singleAds,
    homeMainSlider,
    mobileCategoryBlock
  },
  computed: {
    ...mapState({
      categories: state => state.dsmarket.HomePageCategories
    }),
    LoadBanners() {
      return this.$store.getters.GET_DSBANNER_SLIDER;
    }
  },
  methods: {
    getUrl(category, sub_category, type, third_category = "") {
      const catname = category.categoryname.replace(/[&]/g, "%26");
      const sub_catname = sub_category.categoryname.replace(/[&]/g, "%26");

      var third_url = "";
      if (type == "third_category") {
        const third_catname = third_category.categoryname.replace(
          /[&]/g,
          "%26"
        );
        third_url =
          "&categories=" +
          third_catname +
          "&l3value=" +
          third_catname +
          "&l3id=" +
          third_category.category_id;
      }
      return (
        "/store?categories=" +
        catname +
        "&l1value=" +
        catname +
        "&l1id=" +
        category.category_id +
        "&categories=" +
        sub_catname +
        "&l2value=" +
        sub_catname +
        "&l2id=" +
        sub_category.category_id +
        third_url
      );
    },
    loadCategories() {
      this.$store.dispatch("loadDsmarketCategories");
    }
  },

  created() {
    const data = {
      type: "market"
    };
    this.$store.dispatch("homePageBanner", data);
    this.loadCategories();
  }
};
</script>
<style>
.cat-dropdown {
  padding: 20px;
  width: 634px;
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
}
.list-heading {
  width: 33%;
  margin-bottom: 18px;
}
.ds.category-heading {
  display: block;
  padding: 0;
  margin: 0;
}

.category-title {
  font-weight: bold;
}
.ds-mrkt-slr-bx .ds-mrkt-slr-bx-cnt {
  padding-bottom: 10px;
}
.patternHead {
  background: #fff;
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 10px;
}
.ds-mrkt-slr-bx .VueCarousel-pagination {
  position: absolute;
  bottom: -20px;
  left: 0px;
}
.ds-mrkt-slr-bx .carousel-bx-cnt {
  padding-bottom: 10px;
}
.adjustTo {
  max-width: 679px;
  margin: 0 auto;
  width: 100%;
}
.ds-mrkt-slr-bx .VueCarousel-dot {
  padding: 0px !important;
  margin-right: 5px;
}
.ds-mrkt-slr-bx .VueCarousel-dot:focus {
  outline: none !important;
}
.ds-mrkt-slr-bx .side-menu {
  position: relative;
}
.market-adv {
  padding: 13px 0px 0px 13px;
  display: none;
}
.ds-mrkt-slr-bx .category-heading > h2 {
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#f5f5f7),
    to(#e6e6eb)
  );
  background: -webkit-linear-gradient(top, #f5f5f7, #e6e6eb);
  background: linear-gradient(180deg, #f5f5f7, #e6e6eb);
  background-color: #f5f5f5;
  color: #191919;
  font-size: 13px;
  font-weight: 600;
  line-height: 26px;
  padding: 7px;
  border-radius: 0;
  position: relative;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.ds-mrkt-slr-bx .category-heading > h2 span {
  margin-left: 5px;
}
.ds-mrkt-slr-bx .category-menu-list > ul {
  background: #fff;
  border-radius: 0px 0px 4px 4px;
  margin-top: -2px;
  list-style: none;
}
.ds-mrkt-slr-bx .category-menu-list ul > li,
.ds-mrkt-slr-bx .cat-dropdown > li > a {
  position: relative;
  text-align: left;
  list-style: none;
}
.category-menu-list {
  margin-top: 9px;
}
.linkTo {
  padding: 9px 9px 11.5px 9px !important;
  display: block;
  text-transform: capitalize;
  color: #555555 !important;
  overflow: hidden;
  padding: 0;
  font-size: 13px;
  text-decoration: none !important;
  font-weight: 500;
  border-bottom: 1px solid #eee;
}
.ds-mrkt-slr-bx .categoryItem {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  position: relative;
}
.ds-mrkt-slr-bx .categoryItem span {
  line-height: 1.3;
}
.linkTo:hover .categoryItem::after {
  position: absolute;
  width: 8px;
  height: 100%;
  background: #fff;
  /* content: ''; */
  right: -4px;
  top: 0;
}
.linkTo:hover {
  background-color: #f5f5f5;
  position: relative;
}
.ds-mrkt-slr-bx .categoryItem i {
  font-size: 11px;
  line-height: 1;
}
.ds-mrkt-slr-bx .cat-dropdown {
  position: absolute;
  top: 0;
  left: 100%;
  background: #fff;
  z-index: 999;
  min-width: 710px;
  width: 100%;
  background: #fff;
  border: 1px solid #f0f0f0;
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  visibility: hidden;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.ds-mrkt-slr-bx .cat-dropdown > li > a {
  padding: 0 10px;
  position: relative;
  text-align: left;
  list-style: none;
}
.ds-mrkt-slr-bx .cat-dropdown > li > a {
  display: block;
  text-transform: capitalize;
  border-bottom: 1px solid #ebebeb;
  color: #7a7a7a !important;
  height: 45px;
  line-height: 45px;
  overflow: hidden;
  padding: 0;
  font-size: 14px;
  text-decoration: none !important;
}
.category-menu-list > ul > li:hover .cat-dropdown {
  opacity: 1;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  visibility: visible;
}

.category-menu-list > ul > li.rx-parent > a {
  font-size: 13px;
  font-weight: 600;
  color: #333 !important;
  border-bottom: 0px !important;
}
.cat-dropdown .category-title {
  line-height: 19px;
  font-size: 14px;
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
}
.cat-dropdown ul li {
  line-height: 20px;
  font-size: 12px;
  color: #333;
}
.cat-dropdown ul li a:hover,
.cat-dropdown ul li a:focus {
  opacity: 0.85;
}
.carousel-bx-cnt .VueCarousel-wrapper {
  border-radius: 5px;
}
.loader {
  position: relative;
  right: 25%;
  height: 60px;
}
.circle-loader {
  position: absolute;
  bottom: 0;
  right: 20%;

  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 5px solid rgba(206, 190, 190, 0.2);
  border-top: 5px solid #ff9a7a;
  animation: animate 1.5s infinite linear;
}
@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
