<template>
  <div v-if="!showBubbleLoader">
    <div class="lst-bx-wrp fltr-pg-1">
      <div class="storetopPadd ch-main-layout">
        <div class="ch-left-layout">
          <div class="left-category">
            <div class="alife-bc-category-nav">
              <div class="menu-container">
                <div class="category-menu-wrapper">
                  <div class="menu">
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Location</h2>
                        <button
                          class="md-button md-theme-default filtertoggleboxBtn"
                        >
                          <span class="material-icons">keyboard_arrow_up</span>
                        </button>
                      </div>
                      <div class="show-bx-1 reagion ctSelect">
                        <select
                          name="Country"
                          @change="onChangeCountry"
                          class=""
                        >
                          <option value="" data-foo="">Choose Country </option>
                          <option
                            :selected="country.name == filters.location_country"
                            :data-foo="country.name"
                            v-for="country in countries"
                            :id="country.pk_countries_id"
                            :key="country.name"
                            :value="country.pk_countries_id"
                          >
                            {{ country.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="cst-bx-v-1">
                      <div class="show-bx-1  ctSelect reagion">
                        <select
                          name="city"
                          id="city"
                          placeholder="City"
                          @change="onChangeCity"
                        >
                          <option data-foo="" value="">Choose City </option>
                          <option
                            :selected="city.location == filters.location_city"
                            :data-foo="city.location"
                            v-for="city in cities"
                            :key="city.pk_countries_id"
                            :value="city.pk_countries_id"
                          >
                            {{ city.location }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="cst-bx-v-1" v-if="showArea">
                      <div class="show-bx-1  ctSelect reagion">
                        <select
                          name="area"
                          id="area"
                          placeholder="Area"
                          v-model="filters.location_area"
                          @change="onChangeArea()"
                        >
                          <option value="">Choose Area </option>
                          <option
                            :selected="area.location == filters.location_area"
                            v-for="area in areas"
                            :key="area.pk_countries_id"
                            :value="area.location"
                          >
                            {{ area.location }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Types</h2>
                        <button
                          class="md-button md-theme-default filtertoggleboxBtn"
                        >
                          <span class="material-icons">keyboard_arrow_up</span>
                        </button>
                      </div>
                      <div class="show-bx-1">
                        <div class="fltr-slct-bx">
                          <div class="property_type">
                            <md-checkbox
                              class="smallOption"
                              @change="property_purpose($event, 2)"
                              v-model="filters.property_purpose"
                              value="property for rent"
                              >Rent</md-checkbox
                            >
                            <md-checkbox
                              class="smallOption"
                              @change="property_purpose($event, 1)"
                              v-model="filters.property_purpose"
                              value="property for sale"
                              >Sale</md-checkbox
                            >
                          </div>
                          <div class="secondLevel" v-if="isRent">
                            <div
                              v-for="(item, index) in secondLevel"
                              :key="index"
                            >
                              <md-checkbox
                                class="smallOption"
                                @change="category_type($event, item.id)"
                                v-model="filters.property_category"
                                :value="item.name"
                                >{{ item.name }}
                              </md-checkbox>
                            </div>
                          </div>
                        </div>
                        <div class="fltr-slct-bx">
                          <div class="secondLevel" v-if="isSale">
                            <md-checkbox
                              class="smallOption"
                              @change="category_type($event, item.id)"
                              v-model="filters.property_category"
                              v-for="(item, index) in secondLevel"
                              :key="index"
                              :value="item.name"
                              >{{ item.name }}</md-checkbox
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="secton-title" v-if="thirdLevel">
                      <b v-if="thirdLevel"> {{ filters.property_category }}</b>
                      <!-- <span class="clear-filter" v-if="filters.property_category">clear</span>   -->
                    </div>

                    <div class="show-bx-1">
                      <div class="fltr-slct-bx">
                        <md-checkbox
                          class="smallOption"
                          @change="property_type($event, item.id)"
                          v-model="filters.property_type"
                          v-for="(item, index) in thirdLevel"
                          :key="index"
                          :value="item.name"
                          >{{ item.name }}</md-checkbox
                        >
                      </div>
                    </div>

                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Price</h2>
                      </div>
                      <div class="app-content">
                        <Range @drag="sortPrice" />
                      </div>
                    </div>
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Bedrooms</h2>
                      </div>
                      <div class="show-bx-1  ctSelect">
                        <select
                          v-model="filters.bedrooms"
                          name="bedrooms"
                          @change="onChangeBedroom()"
                        >
                          <option value="">Select Bedroom</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </select>
                      </div>
                    </div>
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Bathrooms</h2>
                      </div>
                      <div class="show-bx-1  ctSelect">
                        <select
                          v-model="filters.bathrooms"
                          name="bathrooms"
                          @change="onChangeBathroom()"
                        >
                          <option value="">Select Bathroom</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </select>
                      </div>
                    </div>
                    <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Area Size</h2>
                      </div>
                      <div
                        class="dropdown__popup dropdown__popup--opened false "
                      >
                        <div class="show-bx-1 area-size ctSelectDoubled">
                          <div class="breakk left">
                            <select
                              v-model="filters.min_area_size"
                              name="bathrooms"
                              @change="onChangeMinAreaSize()"
                            >
                              <option value="">Min. area</option>
                              <option value="500">500 sqft</option>
                              <option value="600">600 sqft</option>
                              <option value="700">700 sqft</option>
                              <option value="800">800 sqft</option>
                              <option value="900">900 sqft</option>
                              <option value="1000">1,000 sqft</option>
                              <option value="1100">1,100 sqft</option>
                              <option value="1200">1,200 sqft</option>
                              <option value="1300">1,300 sqft</option>
                              <option value="1400">1,400 sqft</option>
                              <option value="1500">1,500 sqft</option>
                              <option value="1600">1,600 sqft</option>
                              <option value="1800">1,800 sqft</option>
                              <option value="2000">2,000 sqft</option>
                              <option value="2200">2,200 sqft</option>
                              <option value="2400">2,400 sqft</option>
                              <option value="2600">2,600 sqft</option>
                              <option value="2800">2,800 sqft</option>
                              <option value="3000">3,000 sqft</option>
                              <option value="3200">3,200 sqft</option>
                              <option value="3400">3,400 sqft</option>
                              <option value="3600">3,600 sqft</option>
                              <option value="3800">3,800 sqft</option>
                              <option value="4200">4,200 sqft</option>
                              <option value="4600">4,600 sqft</option>
                              <option value="5000">5,000 sqft</option>
                              <option value="5400">5,400 sqft</option>
                              <option value="5800">5,800 sqft</option>
                              <option value="6,200">6,200 sqft</option>
                              <option value="6600">6,600 sqft</option>
                              <option value="7000">7,000 sqft</option>
                              <option value="7400">7,400 sqft</option>
                              <option value="7800">7,800 sqft</option>
                              <option value="8200">8,200 sqft</option>
                              <option value="9000">9,000 sqft</option>
                            </select>
                          </div>
                          <div class="breakk right">
                            <select
                              v-model="filters.max_area_size"
                              name="araea_size"
                              @change="onChangeMaxAreaSize()"
                            >
                              <option value="">Max. area</option>
                              <option value="500">500 sqft</option>
                              <option value="600">600 sqft</option>
                              <option value="700">700 sqft</option>
                              <option value="800">800 sqft</option>
                              <option value="900">900 sqft</option>
                              <option value="1000">1,000 sqft</option>
                              <option value="1100">1,100 sqft</option>
                              <option value="1200">1,200 sqft</option>
                              <option value="1300">1,300 sqft</option>
                              <option value="1400">1,400 sqft</option>
                              <option value="1500">1,500 sqft</option>
                              <option value="1600">1,600 sqft</option>
                              <option value="1800">1,800 sqft</option>
                              <option value="2000">2,000 sqft</option>
                              <option value="2200">2,200 sqft</option>
                              <option value="2400">2,400 sqft</option>
                              <option value="2600">2,600 sqft</option>
                              <option value="2800">2,800 sqft</option>
                              <option value="3000">3,000 sqft</option>
                              <option value="3200">3,200 sqft</option>
                              <option value="3400">3,400 sqft</option>
                              <option value="3600">3,600 sqft</option>
                              <option value="3800">3,800 sqft</option>
                              <option value="4200">4,200 sqft</option>
                              <option value="4600">4,600 sqft</option>
                              <option value="5000">5,000 sqft</option>
                              <option value="5400">5,400 sqft</option>
                              <option value="5800">5,800 sqft</option>
                              <option value="6,200">6,200 sqft</option>
                              <option value="6600">6,600 sqft</option>
                              <option value="7000">7,000 sqft</option>
                              <option value="7400">7,400 sqft</option>
                              <option value="7800">7,800 sqft</option>
                              <option value="8200">8,200 sqft</option>
                              <option value="9000">9,000 sqft</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="ch-right-layout"
          v-infinite-scroll="loadMore"
          :infinite-scroll-listen-for-event="true"
          infinite-scroll-immediate-check="false"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="1500"
        >
          <ctpropertyListingBox
            @price_sort="OnCLickSortPrice"
            @toggleFilter="showMobile"
            :sort="sort"
          >
          </ctpropertyListingBox>
          <div v-if="showImage" class="image-wrap">
            <h2 class="nodata">NO PROPERTIES FOUND</h2>
            <img class="no-data-img" src="../../../assets/images/data.png" />
          </div>
          <!-- <div class="loader" v-if="showLoader">
            <div class="circle-loader"></div>
          </div> -->
        </div>
      </div>
    </div>
    <div v-if="showMobileFilter">
      <div class="search-filter-mobile-wrapper">
        <header>
          <h2>Filter</h2>
          <button type="button" class="closeButton" @click="closeFilter">
            <img src="../../../assets/images/close.svg" alt="close" />
          </button>
        </header>
        <div class="facetsWrapper">
          <div class="cst-bx-v-1">
            <div class="secton-title">
              <h2>Location</h2>
              <button class="md-button md-theme-default filtertoggleboxBtn">
                <span class="material-icons">keyboard_arrow_up</span>
              </button>
            </div>
            <div class="show-bx-1 reagion ctSelect">
              <select name="Country" @change="onChangeCountry" class="">
                <option value="" data-foo="">Choose Country </option>
                <option
                  :selected="country.name == filters.location_country"
                  :data-foo="country.name"
                  v-for="country in countries"
                  :id="country.pk_countries_id"
                  :key="country.name"
                  :value="country.pk_countries_id"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="cst-bx-v-1">
            <div class="show-bx-1  ctSelect reagion">
              <select
                name="city"
                id="city"
                placeholder="City"
                @change="onChangeCity"
              >
                <option data-foo="" value="">Choose City </option>
                <option
                  :selected="city.location == filters.location_city"
                  :data-foo="city.location"
                  v-for="city in cities"
                  :key="city.pk_countries_id"
                  :value="city.pk_countries_id"
                >
                  {{ city.location }}
                </option>
              </select>
            </div>
          </div>
          <div class="cst-bx-v-1" v-if="showArea">
            <div class="show-bx-1  ctSelect reagion">
              <select
                name="area"
                id="area"
                placeholder="Area"
                v-model="filters.location_area"
                @change="onChangeArea()"
              >
                <option value="">Choose Area </option>
                <option
                  :selected="area.location == filters.location_area"
                  v-for="area in areas"
                  :key="area.pk_countries_id"
                  :value="area.location"
                >
                  {{ area.location }}
                </option>
              </select>
            </div>
          </div>
          <div class="cst-bx-v-1">
            <div class="secton-title">
              <h2>Types</h2>
              <button class="md-button md-theme-default filtertoggleboxBtn">
                <span class="material-icons">keyboard_arrow_up</span>
              </button>
            </div>
            <div class="show-bx-1">
              <div class="fltr-slct-bx">
                <div class="property_type">
                  <md-checkbox
                    class="smallOption"
                    @change="property_purpose($event, 2)"
                    v-model="filters.property_purpose"
                    value="property for rent"
                    >Rent</md-checkbox
                  >
                  <md-checkbox
                    class="smallOption"
                    @change="property_purpose($event, 1)"
                    v-model="filters.property_purpose"
                    value="property for sale"
                    >Sale</md-checkbox
                  >
                </div>
                <div class="secondLevel" v-if="isRent">
                  <div v-for="(item, index) in secondLevel" :key="index">
                    <md-checkbox
                      class="smallOption"
                      @change="category_type($event, item.id)"
                      v-model="filters.property_category"
                      :value="item.name"
                      >{{ item.name }}
                    </md-checkbox>
                  </div>
                </div>
              </div>
              <div class="fltr-slct-bx">
                <div class="secondLevel" v-if="isSale">
                  <md-checkbox
                    class="smallOption"
                    @change="category_type($event, item.id)"
                    v-model="filters.property_category"
                    v-for="(item, index) in secondLevel"
                    :key="index"
                    :value="item.name"
                    >{{ item.name }}</md-checkbox
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="secton-title" v-if="thirdLevel">
            <b v-if="thirdLevel"> {{ filters.property_category }}</b>
            <!-- <span class="clear-filter" v-if="filters.property_category">clear</span>   -->
          </div>

          <div class="show-bx-1">
            <div class="fltr-slct-bx">
              <md-checkbox
                class="smallOption"
                @change="property_type($event, item.id)"
                v-model="filters.property_type"
                v-for="(item, index) in thirdLevel"
                :key="index"
                :value="item.name"
                >{{ item.name }}</md-checkbox
              >
            </div>
          </div>

          <div class="cst-bx-v-1">
            <div class="secton-title">
              <h2>Price</h2>
            </div>
            <div class="app-content">
              <Range @drag="sortPrice" />
            </div>
          </div>
          <div class="cst-bx-v-1">
            <div class="secton-title">
              <h2>Bedrooms</h2>
            </div>
            <div class="show-bx-1  ctSelect">
              <select
                v-model="filters.bedrooms"
                name="bedrooms"
                @change="onChangeBedroom()"
              >
                <option value="">Select Bedroom</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
            </div>
          </div>
          <div class="cst-bx-v-1">
            <div class="secton-title">
              <h2>Bathrooms</h2>
            </div>
            <div class="show-bx-1  ctSelect">
              <select
                v-model="filters.bathrooms"
                name="bathrooms"
                @change="onChangeBathroom()"
              >
                <option value="">Select Bathroom</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
            </div>
          </div>
          <div class="cst-bx-v-1">
            <div class="secton-title">
              <h2>Area Size</h2>
            </div>
            <div class="dropdown__popup dropdown__popup--opened false ">
              <div class="show-bx-1 area-size ctSelectDoubled">
                <div class="breakk left">
                  <select
                    v-model="filters.min_area_size"
                    name="bathrooms"
                    @change="onChangeMinAreaSize()"
                  >
                    <option value="">Min. area</option>
                    <option value="500">500 sqft</option>
                    <option value="600">600 sqft</option>
                    <option value="700">700 sqft</option>
                    <option value="800">800 sqft</option>
                    <option value="900">900 sqft</option>
                    <option value="1000">1,000 sqft</option>
                    <option value="1100">1,100 sqft</option>
                    <option value="1200">1,200 sqft</option>
                    <option value="1300">1,300 sqft</option>
                    <option value="1400">1,400 sqft</option>
                    <option value="1500">1,500 sqft</option>
                    <option value="1600">1,600 sqft</option>
                    <option value="1800">1,800 sqft</option>
                    <option value="2000">2,000 sqft</option>
                    <option value="2200">2,200 sqft</option>
                    <option value="2400">2,400 sqft</option>
                    <option value="2600">2,600 sqft</option>
                    <option value="2800">2,800 sqft</option>
                    <option value="3000">3,000 sqft</option>
                    <option value="3200">3,200 sqft</option>
                    <option value="3400">3,400 sqft</option>
                    <option value="3600">3,600 sqft</option>
                    <option value="3800">3,800 sqft</option>
                    <option value="4200">4,200 sqft</option>
                    <option value="4600">4,600 sqft</option>
                    <option value="5000">5,000 sqft</option>
                    <option value="5400">5,400 sqft</option>
                    <option value="5800">5,800 sqft</option>
                    <option value="6,200">6,200 sqft</option>
                    <option value="6600">6,600 sqft</option>
                    <option value="7000">7,000 sqft</option>
                    <option value="7400">7,400 sqft</option>
                    <option value="7800">7,800 sqft</option>
                    <option value="8200">8,200 sqft</option>
                    <option value="9000">9,000 sqft</option>
                  </select>
                </div>
                <div class="breakk right">
                  <select
                    v-model="filters.max_area_size"
                    name="araea_size"
                    @change="onChangeMaxAreaSize()"
                  >
                    <option value="">Max. area</option>
                    <option value="500">500 sqft</option>
                    <option value="600">600 sqft</option>
                    <option value="700">700 sqft</option>
                    <option value="800">800 sqft</option>
                    <option value="900">900 sqft</option>
                    <option value="1000">1,000 sqft</option>
                    <option value="1100">1,100 sqft</option>
                    <option value="1200">1,200 sqft</option>
                    <option value="1300">1,300 sqft</option>
                    <option value="1400">1,400 sqft</option>
                    <option value="1500">1,500 sqft</option>
                    <option value="1600">1,600 sqft</option>
                    <option value="1800">1,800 sqft</option>
                    <option value="2000">2,000 sqft</option>
                    <option value="2200">2,200 sqft</option>
                    <option value="2400">2,400 sqft</option>
                    <option value="2600">2,600 sqft</option>
                    <option value="2800">2,800 sqft</option>
                    <option value="3000">3,000 sqft</option>
                    <option value="3200">3,200 sqft</option>
                    <option value="3400">3,400 sqft</option>
                    <option value="3600">3,600 sqft</option>
                    <option value="3800">3,800 sqft</option>
                    <option value="4200">4,200 sqft</option>
                    <option value="4600">4,600 sqft</option>
                    <option value="5000">5,000 sqft</option>
                    <option value="5400">5,400 sqft</option>
                    <option value="5800">5,800 sqft</option>
                    <option value="6,200">6,200 sqft</option>
                    <option value="6600">6,600 sqft</option>
                    <option value="7000">7,000 sqft</option>
                    <option value="7400">7,400 sqft</option>
                    <option value="7800">7,800 sqft</option>
                    <option value="8200">8,200 sqft</option>
                    <option value="9000">9,000 sqft</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
          <footer>
          <button
            type="button"
            class="primaryControl ripple"
            @click="closeFilter"
            aria-label="Apply"
          >
           Apply
          </button>
        </footer>
      </div>
    </div>
  </div>
  <div class="md-layout-item" v-else>
    <BubbleLoader />
  </div>
</template>
<script>
import BubbleLoader from "../../pages/profileDashboard/components/loader";

import navwithImageSlider from "../../ctcomponents/navwithImageSlider";
import ctpropertyListingBox from "../../ctcomponents/property/ctpropertylisting";
import "vue-range-component/dist/vue-range-slider.css";
import Range from "../../services/range";
import Search from "../search";
export default {
  props: ["price"],
  name: "demands",
  data: () => ({
    array: [],
    isRent: false,
    isSale: false,
    countries: [],
    cities: [],
    areas: [],
    showImage: false,
    showBubbleLoader: false,
    showMobileFilter: false,

    filters: {
      page: 0,
      search: "",
      property_purpose: "property for rent",
      property_category_id: "",
      property_purpose_id: "",

      property_category: "",
      property_type: "",
      location_country: "United Arab Emirates",
      location_city: "",
      location_area: "",
      min_price: "",
      max_price: "",
      bedrooms: "",
      bathrooms: "",
      min_area_size: "",
      max_area_size: "",
      price_sort: "",
      offer_sort: "",
      country_id: "",
      city_id: ""
    },
    sort: "",
    showCity: false,
    showArea: false,
    busy: false,
    categories: [],
    secondLevel: [],
    thirdLevel: [],
    showLoader: true,
    boolean: false,
    string: null,
    novalue: null,
    disabled: true,
    obj1: { name: "obj1" },
    obj2: { name: "obj2" },
    obj: null,
    indeterminate: true
  }),
  components: {
    BubbleLoader,
    Search,
    Range,
    navwithImageSlider,
    ctpropertyListingBox
  },
  computed: {
    // categories() {
    //   return this.$store.getters.getPropertyCategories;
    // }
  },
  methods: {
    showMobile() {
      this.showMobileFilter = true;
    },
    closeFilter() {
      this.showBubbleLoader = true;
      setTimeout(() => {
        this.showBubbleLoader = false;
      }, 2000);
      this.showMobileFilter = false;
      this.$store.dispatch("ToggleHeader");
    },
    OnCLickSortPrice(value) {
      switch (value) {
        case "phtl":
          this.filters.price_sort = "htl";
          this.filters.offer_sort = "";

          break;
        case "plth":
          this.filters.price_sort = "lth";
          this.filters.offer_sort = "";

          break;
        case "ohtl":
          this.filters.offer_sort = "htl";
          this.filters.price_sort = "";

          break;
        case "olth":
          this.filters.offer_sort = "lth";
          this.filters.price_sort = "";

          break;
        case "":
          this.filters.offer_sort = "";
          this.filters.price_sort = "";

        default:
          break;
      }

      this.filterPage();
    },
    onChangeMinAreaSize() {
      this.filterPage();
    },
    onChangeMaxAreaSize() {
      this.filterPage();
    },
    onChangeBedroom() {
      this.filterPage();
    },
    onChangeBathroom() {
      this.filterPage();
    },

    sortPrice(min, max) {
      this.filters.min_price = min.toString();
      this.filters.max_price = max.toString();
      this.filterPage();
      //this.filters.price_min
    },
    onChangeCountry(event) {
      const id = event.target.value;
      this.filters.country_id = id;
      if (event.target.options.selectedIndex > -1) {
        const value =
          event.target.options[event.target.options.selectedIndex].dataset.foo;
        this.filters.location_country = value;
        if (value != "") {
          this.getCity("city", id);
        } else {
          this.filters.location_city = "";
          this.filters.location_area = "";

          this.filters.city_id = "";
        }
      }

      this.filterPage();
    },
    onChangeCity(event) {
      const id = event.target.value;
      this.filters.city_id = id;
      if (event.target.options.selectedIndex > -1) {
        const value =
          event.target.options[event.target.options.selectedIndex].dataset.foo;
        this.filters.location_city = value;
        if (value != "") {
          this.getCity("area", id);
          this.showArea = true;
        } else {
          this.filters.location_area = "";
          this.showArea = false;
        }
      }

      this.filterPage();
    },
    onChangeArea() {
      this.filterPage();
    },
    change_categories() {
      this.filterPage();
    },
    property_purpose(event, id) {
      this.filters.property_purpose_id = id.toString();
      this.filters.property_category = "";
      if (event == null) {
        this.filters.property_purpose = "";
        this.filters.property_purpose_id = "";
        this.filters.property_category = "";
        this.filters.property_category_id = "";
        this.filters.property_type = "";
        this.isRent = false;
        this.isSale = false;
        this.thirdLevel = false;
      }
      if (
        this.filters.property_purpose == null ||
        this.filters.property_purpose == ""
      ) {
        this.filters.property_purpose = "";
        this.filters.property_purpose_id = "";
        this.thirdLevel = [];
      }
      if (
        this.filters.property_category == null ||
        this.filters.property_category == ""
      ) {
        this.filters.property_category = "";
        this.filters.property_category_id = "";
        this.thirdLevel = [];
      }
      if (this.filters.property_purpose != null) {
        if (event == "property for rent") {
          this.isRent = true;
          this.isSale = false;
          this.getSecondLevelSale(id);
        } else if (event == "property for sale") {
          this.isSale = true;
          this.isRent = false;
          this.getSecondLevelSale(id);
        }
      } else {
        this.secondLevel = [];
      }
      this.filterPage();
    },
    category_type(event, id) {
      this.filters.property_category_id = id.toString();
      this.filters.property_type = "";
      if (event == null) {
        this.filters.property_category = "";
        this.filters.property_category_id = "";
        this.filters.property_type = "";

        this.thirdLevel = false;
      }
      if (this.filters.property_category == null) {
        this.filters.property_type = "";
      } else {
        this.getThirdLevel(id);
      }
      this.thirdLevel = [];
      this.filterPage();
    },
    property_type(event, id) {
      if (event == null) {
        this.filters.property_type = "";
      }
      this.filterPage();
    },
    getPropertyType() {
      this.$store
        .dispatch("propertyCategories")
        .then(response => (this.categories = response.result))
        .catch(error => console.log(error));
    },
    getSecondLevelSale(id) {
      this.$store
        .dispatch("propertyCategories", id)
        .then(response => (this.secondLevel = response.result))
        .catch(error => console.log(error));
    },
    getThirdLevel(id) {
      this.$store
        .dispatch("propertyCategories", id)
        .then(response => (this.thirdLevel = response.result))
        .catch(error => console.log(error));
    },
    getCountry() {
      this.$store
        .dispatch("GET_COUNTRY")
        .then(response => {
          this.countries = response.data.result;
        })
        .catch(error => console.log(error));
    },
    getCity(type, id) {
      this.$store
        .dispatch("GET_CITY", id)
        .then(response => {
          if (type == "city") {
            this.cities = response.data.result;
          } else {
            this.areas = response.data.result;
          }
        })
        .catch(error => console.log(error));
    },
    filterPage(should_change_url = "") {
      this.filters.page = 0;
      this.loadMore();
      let urlFilter = {};

      Object.keys(this.filters).forEach(key => {
        let topic = this.filters[key];
        if (topic.length) {
          urlFilter[key] = topic;
        }
      });

      this.$router.push({ query: urlFilter });
    },
    SearchData(name) {
      console.log(name);
      if (name == undefined) {
        this.filters.search = "";
      } else {
        this.filters.search = name;
      }
      this.filterPage();
    },
    loadMore() {
      this.filters.page++;
      console.log("loadmore");
      this.showImage = false;
      this.showLoader = true;
      this.busy = true;
      if (this.$route.params.id) {
        const id = this.$route.params.id;
        this.filters.profileid = id;
      }
      this.$store
        .dispatch("LoadProperties", this.filters)
        .then(response => {
          this.showLoader = false;
          if (response.success) {
            this.busy = false;
          } else if (response.success == false && this.filters.page == 1) {
            this.showImage = true;
          }
        })

        .catch(error => {
          this.busy = false;
          this.showLoader = false;
        });
    },
    loadurlData() {
      Object.keys(this.$route.query).forEach(key => {
        if (Object.keys(this.filters).includes(key)) {
          let query = this.$route.query[key];
          this.filters[key] = query;
          if (key == "offer_sort") {
            this.sort = "o" + query;
          }
          if (key == "price_sort") {
            this.sort = "p" + query;
          }
          if (key == "property_category_id") {
            this.getThirdLevel(query);
          }
          switch (key) {
            case "country_id":
              this.getCity("city", query);

              break;
            case "city_id":
              this.getCity("area", query);

              break;

            default:
              break;
          }
        }
      });
      if (this.$route.query.property_purpose) {
        if (this.$route.query.property_purpose == "property for rent") {
          this.isRent = true;
          this.getSecondLevelSale("2");
        } else if (this.$route.query.property_purpose == "property for sale") {
          if (this.$route.query.property_purpose_id) {
            this.isSale = true;
            this.getSecondLevelSale(this.$route.query.property_purpose_id);
          }
        }
      } else {
        this.isRent = true;
        this.getSecondLevelSale("2");
      }
    }
  },
  created() {
    this.loadurlData();
    this.getPropertyType();
    this.getCountry();
    this.loadMore();
    this.getCity("city", 1);
  }
};
</script>
<style scoped>
.property_type .smallOption {
  font-size: 13px;
  font-weight: bold;
}
.clear-filter {
}
.secondLevel {
  padding-left: 10px;
}
.area-size {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
select {
  width: 100%;
}
.image-wrap {
  padding: 20px 0;
}
.nodata {
  text-align: center;
  color: #616161;
  font-weight: bolder;
}
.no-data-img {
  width: 70%;
  display: block;
  margin: 0px auto;
}
.reagion {
  margin-bottom: 14px;
}
.loader {
  position: relative;
  right: 0;
}

.circle-loader {
  position: absolute;
  bottom: 0;
  left: 45%;
  top: 10px;
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

.md-checkbox .md-theme-default label {
  height: auto;
}
.app-content {
  margin-top: 10px;
}

.image-wrap {
  padding: 20px 0;
  float: left;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .search-filter-mobile-wrapper .facetsWrapper {
    margin-top: 50px;
  }
  .ch-left-layout {
    display: none;
  }
  .lst-bx-wrp {
    margin-left: -25px;
    margin-right: -25px;
  }

  .ctSelect select,
  .ctSelectDoubled select {
    font-size: 11px !important;
  }
  .ctSelect {
    width: 155px !important;
  }

  .spn-tp-121 {
    font-size: 16px;
  }

  .nodata {
    font-size: 18px;
  }
}

@media screen and (max-width: 600px) {
  .lst-bx-wrp {
    margin-left: 10px;
    margin-right: 10px;
  }
  .listItemShow {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(143px, 1fr)) !important;
  }
  .switchView {
    margin-right: 6px !important;
  }
  .filter_products i {
    margin-right: 4px !important;
  }
  .ctSelect {
    width: 130px !important;
  }
  .spn-tp-121 {
    font-size: 14px;
    margin-top: 8px !important;
  }

  .nodata {
    font-size: 14px;
  }
  .image-wrap {
    padding: 0px 0;
  }
}
@media screen and (max-width: 300px) {
  .ch-main-layout {
    padding-right: 40px;
  }

  .ctSelect {
    width: 100% !important;
    margin-top: 16px;
  }

  .filter_products {
    position: absolute;
    right: 8px;
  }

  .bx-tp-12-ch {
    position: relative;
  }
  .topPos {
    position: absolute;
    right: 50px;
  }
  .nodata {
    font-size: 13px;
  }
}
</style>
