<template>
  <div v-if="!showBubbleLoader">
    <div class="lst-bx-wrp fltr-pg-1" style="backround-color: red">
      <div class="clearfix">
        <!-- <ProductDetails v-if="isDetailsPage" /> -->
        <div class="storetopPadd ch-main-layout">
          <!-- filter -->
          <div class="ch-left-layout2">
            <div class="left-category">
              <div class="alife-bc-category-nav">
                <div class="menu-container">
                  <div class="category-menu-wrapper">
                    <div class="menu">
                      <div class="cst-bx-v-1">
                        <div class="secton-title">
                          <h2>Country</h2>
                          <div
                            v-if="filters.location_country"
                            class="clear-text"
                            @click="clearFilter('country')"
                          >
                            Clear Filter
                          </div>
                        </div>

                        <div class="show-bx-1 ctSelect show_bx_2 margin_show">
                          <select
                            v-model="filters.location_country"
                            @change="onChangeCountry"
                          >
                            <option value="">Choose Country</option>
                            <option
                              :data-foo="country.pk_countries_id"
                              :value="country.name"
                              v-for="country in countries"
                              :key="country.name"
                            >
                              {{ country.name }}
                            </option>
                          </select>
                        </div>
                        <div class="show-bx-1 ctSelect show_bx_2 margin_show">
                          <select
                            v-model="filters.location_city"
                            @change="onChangeCity"
                          >
                            <option value="">Choose City</option>
                            <option
                              v-for="city in cities"
                              :data-foo="city.pk_countries_id"
                              :key="city.location"
                              :value="city.location"
                            >
                              {{ city.location }}
                            </option>
                          </select>
                        </div>
                        <div
                          class="show-bx-1 ctSelect show_bx_2 margin_show"
                          v-if="showArea"
                        >
                          <select
                            v-model="filters.location_area"
                            @change="onChangeArea"
                          >
                            <option value="">Choose Area</option>
                            <option
                              v-for="area in areas"
                              :key="area.location"
                              :value="area.location"
                            >
                              {{ area.location }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="cst-bx-v-1">
                        <div class="secton-title">
                          <h2>Select Market</h2>
                          <div
                            v-if="filters.market_type"
                            class="clear-text"
                            @click="clearFilter('market')"
                          >
                            Clear Filter
                          </div>
                        </div>
                        <div class="show-bx-1">
                          <div class="fltr-slct-bx">
                            <md-checkbox
                              class="smallOption"
                              v-model="filters.market_type"
                              @change="market_type($event)"
                              value=""
                              >All</md-checkbox
                            >
                          </div>
                          <div class="fltr-slct-bx">
                            <md-checkbox
                              class="smallOption"
                              v-model="filters.market_type"
                              @change="market_type($event)"
                              value="demand"
                              >All Demands</md-checkbox
                            >
                          </div>
                          <div class="fltr-slct-bx">
                            <md-checkbox
                              class="smallOption"
                              v-model="filters.market_type"
                              @change="market_type($event)"
                              value="supply"
                              >All Supplies</md-checkbox
                            >
                          </div>
                        </div>
                      </div>
                      <!-- <div class="cst-bx-v-1 posToTop">
                        <div class="secton-title">
                          <h2>Search</h2>
                        </div>
                        <Search
                          :search="filters.search"
                          :model="'products'"
                          @onSearch="SearchData"
                        />
                      </div> -->
                      <div class="cst-bx-v-1">
                        <div class="secton-title">
                          <h2>Category</h2>
                          <div
                            v-if="
                              filters.l1value ||
                                filters.l2value ||
                                filters.l3value ||
                                filters.l4value
                            "
                            class="clear-text"
                            @click="clearFilter('category')"
                          >
                            Clear Filter
                          </div>
                        </div>
                        <div class="show-bx-1 show_bx_1">
                          <CategorySearch
                            @onClickSearch="searchCategory"
                            :clearText="clearFilterText"
                          />
                        </div>
                        <div class="show-bx-1 ctSelect prstore show_bx_2">
                          <select @change="change_categories">
                            <option value="" data-foo="">All Categories</option>
                            <option
                              :value="category.category_id"
                              v-for="category in categories"
                              :key="category.category_id"
                              :data-foo="category.categoryname"
                              :selected="
                                category.categoryname == filters.l1value
                              "
                            >
                              {{ category.categoryname }}
                            </option>
                          </select>
                        </div>
                        <div
                          class="show-bx-1 ctSelect show_bx_2"
                          v-if="showSubcategory"
                        >
                          <select @change="change_subcategory">
                            <option value="" data-foo="">All categories</option>
                            <option
                              :data-foo="category.categoryname"
                              :value="category.category_id"
                              v-for="category in sub_categories"
                              :key="category.id"
                              :selected="
                                category.categoryname == filters.l2value
                              "
                            >
                              {{ category.categoryname }}
                            </option>
                          </select>
                        </div>
                        <div
                          class="show-bx-1 ctSelect show_bx_2"
                          v-if="showThirdcategory"
                        >
                          <select @change="change_thirdcategory">
                            <option value="" data-foo="">All categories</option>
                            <option
                              :data-foo="category.categoryname"
                              :value="category.category_id"
                              v-for="category in third_categories"
                              :key="category.id"
                              :selected="
                                category.categoryname == filters.l3value
                              "
                            >
                              {{ category.categoryname }}
                            </option>
                          </select>
                        </div>
                        <div
                          class="show-bx-1 ctSelect show_bx_2"
                          v-if="showFourthcategory"
                        >
                          <select @change="change_fourthcategory">
                            <option value="" data-foo="">All categories</option>
                            <option
                              :data-foo="category.categoryname"
                              :value="category.category_id"
                              v-for="category in fourth_categories"
                              :key="category.id"
                              :selected="
                                category.categoryname == filters.l4value
                              "
                            >
                              {{ category.categoryname }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="cst-bx-v-1">
                        <div class="secton-title">
                          <h2>Brand</h2>
                          <div
                            v-if="filters.brand.length"
                            class="clear-text"
                            @click="clearFilter('brand')"
                          >
                            Clear Filter
                          </div>
                        </div>
                        <div class="searchFilterWrap">
                          <i class="material-icons">search</i>
                          <input
                            v-model="search"
                            v-on:keyup="searchBrand"
                            type="text"
                            placeholder="Search Brand"
                            class="searchFilter"
                          />
                        </div>
                        <div
                          class="show-bx-1 brand auto-scrol-bx"
                          style="height: auto"
                        >
                          <div
                            class="fltr-slct-bx"
                            v-for="(brand, index) in brands"
                            :key="index"
                          >
                            <md-checkbox
                              class="smallOption"
                              v-if="brand.brand != ''"
                              @change="change_brand"
                              v-model="filters.brand"
                              :value="brand.brand"
                              >{{ brand.brand }}</md-checkbox
                            >
                          </div>
                        </div>
                      </div>
                      <div class="cst-bx-v-1">
                        <div class="secton-title">
                          <h2>Price</h2>
                          <div
                            v-if="
                              filters.min_price > 0 &&
                                filters.min_price != 10000
                            "
                            class="clear-text"
                            @click="clearFilter('price')"
                          >
                            Clear Filter
                          </div>
                        </div>
                        <div class="app-content">
                          <Range @drag="filterPriceRange" />
                        </div>
                      </div>

                      <div class="cst-bx-v-1 tagsChip">
                        <div class="secton-title">
                          <h2>Tags</h2>
                        </div>
                        <div class="tags-content">
                          <md-chips
                            @md-insert="insertTags"
                            v-model="filters.tags"
                            @md-delete="deleteTags"
                            md-placeholder="Tags"
                          ></md-chips>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- products based on category -->
          <div class="ch-right-layout">
            <div class="bx-tp-ct-lst">
              <div class="bx-tp-12-ch">
                <div class="bx-ch-12">
                  <div class="d-flex">
                    <span class="spn-tp-121">Products</span>
                  </div>
                </div>
                <div class="show-bx-1 ctSelect">
                  <i class="md-icon md-icon-font md-theme-default">swap_vert</i>
                  <select @change="onChangePrice($event)">
                    <option value="">Sort</option>
                    <option value="phtl" :selected="sort == 'phtl'">
                      Price - High to Low
                    </option>
                    <option value="plth" :selected="sort == 'plth'">
                      Price - Low to High
                    </option>
                    <option value="ohtl" :selected="sort == 'ohtl'">
                      % Off - High to Low
                    </option>
                    <option value="olth" :selected="sort == 'olth'">
                      % Off - Low to High
                    </option>
                  </select>
                </div>
                <div class="filter_products" @click="toggleSearchFilter">
                  <i class="md-icon md-icon-font md-theme-default"
                    >filter_alt</i
                  >
                </div>
                <div class="bx-ch-13 topPos">
                  <div class="switchView">
                    <span
                      class="swtc-bx-lnk-1"
                      :class="{ active: listActivated }"
                      @click="callToList"
                    >
                      <i class="material-icons">view_list</i>
                    </span>
                    <span
                      class="swtc-bx-lnk-1"
                      :class="{ active: gridActivated }"
                      @click="callToList"
                    >
                      <i class="material-icons">view_headline</i>
                    </span>
                  </div>
                  <!-- <md-field>
                          <md-select
                            v-model="sort"
                            @md-selected="onChangePrice($event)"
                            name="Sort"
                            id="Sort"
                            placeholder="Sort"
                            class="bigData"
                          >
                            <md-optgroup label="Price">
                              <md-option value="phtl"  selected="selected">High to Low </md-option>
                              <md-option value="plth">Low to High</md-option>
                            </md-optgroup>

                            <md-optgroup label="Offer">
                              <md-option value="ohtl">High to Low</md-option>
                              <md-option value="olth">Low to High</md-option>
                            </md-optgroup>
                          </md-select>
                        </md-field> -->
                </div>
              </div>
            </div>

            <div class="lst-bxing-1">
              <!-- <div class="filtered pb-2">
                <div class="filtered-by">Filtered By:</div>
                <div v-if="filters.brand.length">
                  <button
                    type="button"
                    v-for="(brand, index) in filters.brand"
                    :key="index"
                    class="filter-btn"
                  >
                    <span>Brand : {{ brand }}</span>
                  </button>
                </div>
                <div v-if="filters.categories.length">
                  <button
                    type="button"
                    v-for="(category, index) in filters.categories"
                    :key="index"
                    class="filter-btn"
                  >
                    <span>Category : {{ category }}</span>
                  </button>
                </div>
              </div> -->
              <div
                class="container-floor2"
                v-for="(category, index) in categories"
                :key="index"
                v-if="
                  productCt.some(char =>
                    char.includes(category.categoryname.split('&')[0])
                  )
                "
              >
                <div class="home-category-info-header col-sm-12 pr-0 pl-0">
                  <h3>{{ category.categoryname }}</h3>
                  <span class="home-category-info-header-line"></span>
                  <router-link
                    :to="
                      '/profilestore/category/' + profileName + '/' + profileId
                    "
                    class="vw-all-tp-1"
                  >
                    <md-button class="md-flat md-accent mob_margin"
                      >More >>
                    </md-button>
                  </router-link>
                </div>
                <div
                  v-infinite-scroll="loadMore"
                  :infinite-scroll-listen-for-event="true"
                  infinite-scroll-immediate-check="false"
                  infinite-scroll-disabled="busy"
                  infinite-scroll-distance="1500"
                >
                  <div :class="{ listactiveBox: gridActivated }">
                    <div class="list-wrapper">
                      <div class="listItemShow">
                        <div
                          class="offer-item"
                          v-for="(product, index) in products"
                          :key="product.id"
                          v-if="
                            product.categories[0].includes(
                              category.categoryname.split('&amp;')[0]
                            )
                          "
                        >
                          <ProductList :product="product" />
                        </div>
                      </div>
                    </div>
                    <div v-if="showImage" class="image-wrap">
                      <h2 class="nodata">NO PRODUCTS FOUND</h2>
                      <img
                        class="no-data-img"
                        src="../../../assets/images/data.png"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="loader">
                <div class="circle-loader" v-if="showLoader"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <md-dialog :md-active.sync="showMobileFilter">
      <md-dialog-title
        >Filter
        <i
          class="material-icons md-primary"
          style="cursor: pointer"
          @click="closeFilter"
          >close</i
        ></md-dialog-title
      >

      <md-dialog-content class="mb-3 mt-4">
        <div class="facetsWrapper">
          <div class="filter-name">
            <div class="heading">
              <button type="button" class="titleWrap mob_box_filter">
                <img
                  src="../../../assets/images/right-chevron.svg"
                  alt=""
                  class="chevron"
                />
                <div class="title">Country</div>
              </button>
              <div
                v-if="filters.location_country"
                class="clear-text"
                @click="clearFilter('country')"
              >
                Clear Filter
              </div>
            </div>

            <div class="selectedValues">
              <div class="drawer">
                <div
                  class="ctSelect show_bx_2 margin_show"
                  style="width: 100% !important ; float: none"
                >
                  <select
                    v-model="filters.location_country"
                    @change="onChangeCountry"
                  >
                    <option value="">Choose Country</option>
                    <option
                      :data-foo="country.pk_countries_id"
                      :value="country.name"
                      v-for="country in countries"
                      :key="country.name"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="selectedValues">
              <div class="drawer">
                <div
                  class="ctSelect show_bx_2 margin_show"
                  style="width: 100% !important ; float: none"
                >
                  <select
                    v-model="filters.location_city"
                    @change="onChangeCity"
                  >
                    <option value="">Choose City</option>
                    <option
                      v-for="city in cities"
                      :data-foo="city.pk_countries_id"
                      :key="city.location"
                      :value="city.location"
                    >
                      {{ city.location }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="selectedValues">
              <div class="drawer">
                <div
                  class="ctSelect show_bx_2 margin_show"
                  style="width: 100% !important ; float: none"
                  v-if="showArea"
                >
                  <select v-model="filters.location_area">
                    <option value="">Choose Area</option>
                    <option
                      v-for="area in areas"
                      :key="area.location"
                      :value="area.location"
                    >
                      {{ area.location }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="mob_border_filter"></div>
          </div>
          <div class="filter-name pb-zero">
            <div class="heading d-block">
              <button type="button" class="titleWrap mob_box_filter">
                <img
                  src="../../../assets/images/right-chevron.svg"
                  alt=""
                  class="chevron"
                />
                <div class="title">Select Market</div>
              </button>
              <div
                v-if="filters.market_type"
                class="clear-text"
                @click="clearFilter('market')"
              >
                Clear Filter
              </div>
            </div>
            <div class="selectedValues">
              <div class="drawer">
                <div class="fltr-slct-bx">
                  <md-checkbox
                    class="smallOption"
                    v-model="filters.market_type"
                    @change="market_type($event)"
                    value=""
                    >All</md-checkbox
                  >
                </div>
                <div class="fltr-slct-bx">
                  <md-checkbox
                    class="smallOption"
                    v-model="filters.market_type"
                    @change="market_type($event)"
                    value="demand"
                    >All Demands</md-checkbox
                  >
                </div>
                <div class="fltr-slct-bx">
                  <md-checkbox
                    class="smallOption"
                    v-model="filters.market_type"
                    @change="market_type($event)"
                    value="supply"
                    >All Supplies</md-checkbox
                  >
                </div>
              </div>
            </div>
            <div class="mob_border_filter"></div>
          </div>
          <div class="filter-name pb-category">
            <div class="heading">
              <button type="button" class="titleWrap mob_box_filter">
                <img
                  src="../../../assets/images/right-chevron.svg"
                  alt=""
                  class="chevron"
                />
                <div class="title">categories</div>
              </button>
              <div
                v-if="
                  filters.l1value ||
                    filters.l2value ||
                    filters.l3value ||
                    filters.l4value
                "
                class="clear-text"
                @click="clearFilter('category')"
              >
                Clear Filter
              </div>
            </div>

            <div class="selectedValues">
              <div class="drawer">
                <div class="">
                  <CategorySearch
                    @onClickSearch="searchCategory"
                    :clearText="clearFilterText"
                  />
                </div>

                <div
                  class="ctSelect mobile-drawer width_filter_mob"
                  v-if="showCategory"
                >
                  <select @change="change_categories">
                    <option value="" data-foo="">All Categories</option>
                    <option
                      :value="category.category_id"
                      v-for="category in categories"
                      :key="category.category_id"
                      :data-foo="category.categoryname"
                      :selected="category.categoryname == filters.l1value"
                    >
                      {{ category.categoryname }}
                    </option>
                  </select>
                </div>
                <div class="ctSelect width_filter_mob" v-if="showSubcategory">
                  <select @change="change_subcategory">
                    <option value="" data-foo="">All categories</option>
                    <option
                      :data-foo="category.categoryname"
                      :value="category.category_id"
                      v-for="category in sub_categories"
                      :key="category.id"
                      :selected="category.categoryname == filters.l2value"
                    >
                      {{ category.categoryname }}
                    </option>
                  </select>
                </div>
                <div class="ctSelect width_filter_mob" v-if="showThirdcategory">
                  <select @change="change_thirdcategory">
                    <option value="" data-foo="">All categories</option>
                    <option
                      :data-foo="category.categoryname"
                      :value="category.category_id"
                      v-for="category in third_categories"
                      :key="category.id"
                      :selected="category.categoryname == filters.l3value"
                    >
                      {{ category.categoryname }}
                    </option>
                  </select>
                </div>
                <div
                  class="ctSelect show_bx_2 width_filter_mob"
                  v-if="showFourthcategory"
                >
                  <select @change="change_fourthcategory">
                    <option value="" data-foo="">All categories</option>
                    <option
                      :data-foo="category.categoryname"
                      :value="category.category_id"
                      v-for="category in fourth_categories"
                      :key="category.id"
                      :selected="category.categoryname == filters.l4value"
                    >
                      {{ category.categoryname }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="mob_border_filter border_category"></div>
          </div>
          <div class="filter-name pb-zero">
            <div class="heading">
              <button type="button" class="titleWrap mob_box_filter">
                <img
                  src="../../../assets/images/right-chevron.svg"
                  alt=""
                  class="chevron"
                />
                <div class="title">Brand</div>
              </button>

              <div
                v-if="filters.brand.length"
                class="clear-text"
                @click="clearFilter('brand')"
              >
                Clear Filter
              </div>
            </div>
            <div class="selectedValues">
              <div class="drawer">
                <div class="searchFilterWrap">
                  <i class="material-icons">search</i>
                  <input
                    v-model="search"
                    v-on:keyup="searchBrand"
                    type="text"
                    placeholder="Search Brand"
                    class="searchFilter"
                  />
                </div>
                <!-- <div class="auto-scrol-bx">
                  <div
                    class="fltr-slct-bx"
                    v-for="(brand, index) in brands"
                    :key="index"
                  >
                    <md-checkbox
                      class="smallOption"
                      v-if="brand.brand != ''"
                      @change="change_brand"
                      v-model="filters.brand"
                      :value="brand.brand"
                      >{{ brand.brand }}</md-checkbox
                    >
                  </div>
                </div> -->
              </div>
            </div>
            <div class="mob_border_filter"></div>
          </div>

          <div class="filter-name pb-zero price_bottom_mob">
            <div class="heading">
              <button type="button" class="titleWrap mob_box_filter">
                <img
                  src="../../../assets/images/right-chevron.svg"
                  alt=""
                  class="chevron"
                />
                <div class="title pt_mob_price">Price</div>
              </button>
              <div
                v-if="filters.min_price > 0 && filters.min_price != 10000"
                class="clear-text"
                @click="clearFilter('price')"
              >
                Clear Filter
              </div>
            </div>
            <div class="selectedValues">
              <div class="drawer">
                <div class="app-content">
                  <Range @drag="filterPriceRange" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button @click="closeFilter(), getResult()">Apply</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
  <div class="md-layout-item" v-else>
    <BubbleLoader />
  </div>
</template>
<script>
import BubbleLoader from "../../pages/profileDashboard/components/loader.vue";
import navwithImageSlider from "../../ctcomponents/navwithImageSlider.vue";
import { isMobile, isTablet } from "mobile-device-detect";
import { Cropper } from "vue-advanced-cropper";
import VueTagsInput from "@johmun/vue-tags-input";
import ctListingBox from "../../ctcomponents/products/ctListingBox.vue";
import ProductList from "../../ctcomponents/products/productList.vue";
import ProductDetails from "../../pages/dsmarket/productDetailpage";
import Range from "../../services/range";
import { mapState } from "vuex";
import Search from "../../ctcomponents/search.vue";
import CategorySearch from "../../ctcomponents/CategorySearch.vue";
export default {
  name: "Products",
  data: () => ({
    isCropped: false,
    toggleDP: false,
    toggleDialog: false,
    img: "",
    file: "",
    clearFilterText: false,
    showCategory: false,
    isMobileCheck: isMobile ? "true" : "false",
    isTabletCheck: isTablet ? "true" : "false",
    showMobileFilter: false,
    categories: "",
    productCt: [],
    showBubbleLoader: false,
    sub_categories: "",
    third_categories: "",
    fourth_categories: "",
    showSubcategory: false,
    showThirdcategory: false,
    showFourthcategory: false,
    selectedDropdown: "",
    category: "",
    sub_category: "",
    third_category: "",
    rightSelect: "ijas",
    gridActivated: false,
    listActivated: true,
    listactive: false,
    countries: "",
    cities: [],
    areas: [],
    tag: "",
    sort: "",
    // items: [],
    filters: {
      sort: "",
      search: "",
      search_category: "",
      market_type: "",
      page: 0,
      categories: [],
      tags: [],
      price_sort: "",
      offer_sort: "",
      min_price: "",
      max_price: "",
      brand: [],
      location_country: "United Arab Emirates",
      location_city: "",
      location_area: "",
      l1value: "",
      l1id: "",
      l2value: "",
      l2id: "",

      l3value: "",
      l3id: "",
      l4value: ""
    },

    search: "",
    showImage: false,
    showArea: false,

    busy: false,
    showLoader: false,
    initialLoad: true
  }),
  components: {
    Cropper,
    CategorySearch,
    BubbleLoader,
    navwithImageSlider,
    ctListingBox,
    ProductDetails,
    VueTagsInput,
    Range,
    Search,
    ProductList
  },
  computed: {
    ProfileStoreFilter() {
      return this.$route.name === "profileStore";
    },
    products() {
      return this.$store.getters.getProducts;
    },
    brands() {
      if (this.initialLoad == false) {
        return this.$store.getters.getProductBrands;
      }
    },
    ...mapState({
      isDetailsPage: state => state.store.isDetailPage
    }),
    profileName() {
      return this.$route.params.name;
    },
    profileId() {
      return this.$route.params.id;
    }
  },
  methods: {
    showDP() {
      console.log("object");
      this.toggleDP = !this.toggleDP;
    },
    chooseFile() {
      this.toggleDialog = !this.toggleDialog;
    },
    chooseImage($event) {
      this.isCropped = true;
      const file = $event.target.files[0];
      this.img = URL.createObjectURL(file);
    },
    change({ coordinates, canvas }) {
      console.log(this.toggleDialog);
      console.log(coordinates, canvas);
      var img = canvas.toDataURL("image/png");
      this.file = img;
    },
    upload() {
      this.$store.dispatch("profile_picture", this.file);
    },
    // filter methods
    clearFilter(type) {
      switch (type) {
        case "country":
          this.filters.location_country = "";
          this.filters.location_city = "";
          this.filters.location_area = "";

        case "market":
          this.filters.market_type = "";

        case "brand":
          this.filters.brand = "";

        case "brand":
          this.filters.brand = "";

        case "price":
          this.filters.min_price = 0;
          this.filters.max_price = 10000;

        case "category":
          this.clearFilterText = true;
          this.showCategory = false;
          this.filters.l1value = "";
          this.filters.l2value = "";
          this.filters.l3value = "";
          this.filters.l4value = "";
          (this.filters.categories = ""), (this.filters.l1id = "");
          this.filters.l2id = "";
          this.filters.l3id = "";

          this.sub_categories = [];
          this.third_categories = [];
          this.fourth_categories = [];
          this.showSubcategory = false;
          this.showThirdcategory = false;
          this.showFourthcategory = false;

        default:
          this.filterPage();

          break;
      }
    },
    closeFilter() {
      this.showBubbleLoader = true;
      setTimeout(() => {
        this.showBubbleLoader = false;
      }, 2000);
      this.filterPage();
      this.showMobileFilter = false;
      // this.$store.dispatch("ToggleHeader");
    },
    toggleSearchFilter() {
      this.showMobileFilter = true;
      // this.$store.dispatch("ToggleHeader");
    },
    searchBrand() {
      this.initialLoad = false;
      this.LoadProductBrands();
    },
    filterPriceRange(min, max) {
      this.filters.min_price = min.toString();
      this.filters.max_price = max.toString();
      // this.filterPage();
    },
    //sort offer and price
    onChangePrice(event) {
      const data = event.target.value;

      switch (data) {
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

          break;

        default:
          break;
      }
      // this.filterPage();
    },
    callToList() {
      this.listActivated = !this.listActivated;
      this.gridActivated = !this.gridActivated;
      this.listactive = !this.listactive;
    },
    insertTags(str) {
      this.filterPage();
      this.filters.page = 0;
      this.loadMore();
    },
    getcity(id) {
      this.$store
        .dispatch("GET_CITY", id)
        .then(response => (this.cities = response.data.result));
    },
    getArea(id) {
      this.$store
        .dispatch("GET_CITY", id)
        .then(response => (this.areas = response.data.result));
    },
    getResult() {
      this.filterPage();
    },
    onChangeCity(event) {
      const country_id =
        event.target.options[event.target.options.selectedIndex].dataset.foo;

      this.filters.location_area = "";
      if (this.filters.location_city != "") {
        this.showArea = true;
      } else {
        this.showArea = false;
      }
      this.getArea(country_id);

      // this.filterPage();
    },
    onChangeCountry(event) {
      const country_id =
        event.target.options[event.target.options.selectedIndex].dataset.foo;

      this.filters.location_city = "";
      this.filters.location_area = "";
      this.getcity(country_id);

      // this.filterPage();
    },
    deleteTags() {
      this.filterPage();
    },
    change_categories(event) {
      this.category = "";
      this.filters.l1value = "";
      this.filters.l1id = "";
      this.filters.l2value = "";
      this.filters.l2id = "";
      this.filters.l3value = "";
      this.filters.l3id = "";
      this.filters.l4value = "";

      if (event.target.options.selectedIndex > -1) {
        let value =
          event.target.options[event.target.options.selectedIndex].dataset.foo;

        if (value != "") {
          this.filters.l1value = value;
          this.category = value;
          this.filters.categories = [this.category];
        } else {
          this.filters.l1value = "";
          this.filters.l2value = "";
          this.showThirdcategory = false;
          this.showFourthcategory = false;
          this.sub_categories = [];
          this.third_categories = [];
          this.fourth_categories = [];
        }
      }
      const id = event.target.value;
      this.filters.l1id = id;
      this.selectedDropdown = "category";

      if (this.category == "") {
        this.showSubcategory = false;
        this.filters.categories = [];
      } else {
        this.LoadProductCategory(id);
      }
      // this.filterPage();
    },
    change_subcategory(event) {
      this.sub_category = "";
      this.filters.l3id = "";
      const id = event.target.value;
      this.filters.l2id = id;
      if (event.target.options.selectedIndex > -1) {
        let value =
          event.target.options[event.target.options.selectedIndex].dataset.foo;

        if (value != "") {
          this.sub_category = value;
          this.filters.l2value = value;
          this.filters.categories = [this.category, this.sub_category];
        } else {
          this.filters.l2value = "";
          this.filters.l3value = "";
          this.filters.l4value = "";
          this.filters.categories = [this.category];
        }
      }
      this.selectedDropdown = "sub_category";

      this.third_categories = [];
      this.fourth_categories = [];
      this.showFourthcategory = false;
      if (this.sub_category == "") {
        this.showThirdcategory = false;
      } else {
        this.LoadProductCategory(id);
      }

      // this.filterPage();
    },
    change_thirdcategory(event) {
      this.selectedDropdown = "third_category";
      this.third_category = "";
      const id = event.target.value;
      if (event.target.options.selectedIndex > -1) {
        let value =
          event.target.options[event.target.options.selectedIndex].dataset.foo;
        this.filters.l3value = value;
        this.filters.l3id = id;
        if (value != "") {
          this.third_category = value;
          this.filters.categories = [
            this.category,
            this.sub_category,
            this.third_category
          ];
        } else {
          this.filters.l3value = "";
          this.filters.l4value = "";

          this.filters.categories = [this.category, this.sub_category];
        }
      }
      this.fourth_categories = [];

      if (this.third_category == "") {
        this.showFourthcategory = false;
      } else {
        this.LoadProductCategory(id);
      }

      // this.filterPage();
    },
    change_fourthcategory(event) {
      this.selectedDropdown = "fourth_category";
      this.fourth_category = "";
      const id = event.target.value;
      if (event.target.options.selectedIndex > -1) {
        let value =
          event.target.options[event.target.options.selectedIndex].dataset.foo;
        this.filters.l4value = value;
        if (value != "") {
          this.fourth_category = value;
          this.filters.categories = [
            this.category,
            this.sub_category,
            this.third_category,
            this.fourth_category
          ];
        } else {
          this.filters.l4value = "";
          this.fourth_category = value;
          this.filters.categories = [
            this.category,
            this.sub_category,
            this.third_category
          ];
        }
      }

      // this.filterPage();
    },

    // change_brand() {
    //   this.filterPage();
    // },
    market_type() {
      if (this.filters.market_type == null) {
        this.filters.market_type = "";
      }
      // this.filterPage();
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
    loadMore() {
      this.filters.page++;
      this.showImage = false;
      this.showLoader = true;

      this.busy = true;

      if (this.$route.params.id) {
        const id = this.$route.params.id;
        this.filters.profileid = id;
      }
      var data = { ...this.filters };
      // Object.keys(data).forEach((key, index) => {
      //   // debugger;
      //   if (
      //     key == "l1value" ||
      //     key == "l1id" ||
      //     key == "l2value" ||
      //     key == "l2id" ||
      //     key == "l3value" ||
      //     key == "l3id" ||
      //     key == "l4value"
      //   ) {
      //     delete this.filters[key];
      //   }
      // });
      this.$store
        .dispatch("LoadProducts", this.filters)
        .then(response => {
          this.showLoader = false;
          if (response.success == true) {
            this.showLoader = false;
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
    LoadProductCategory(id) {
      this.$store
        .dispatch("loadCategories", id)
        .then(response => {
          const { category, success } = response;
          if (this.selectedDropdown == "category") {
            this.sub_categories = category;
            if (success == true) {
              this.showSubcategory = true;
            } else {
              this.showSubcategory = false;
            }
          } else if (this.selectedDropdown == "sub_category") {
            this.third_categories = category;

            if (success == true) {
              this.showThirdcategory = true;
            } else {
              this.showThirdcategory = false;
            }
          } else if (this.selectedDropdown == "third_category") {
            this.fourth_categories = category;

            if (success == true) {
              this.showFourthcategory = true;
            } else {
              this.showFourthcategory = false;
            }
          } else {
            this.categories = category;
            this.checkCategory;
          }
        })
        .catch(error => console.log(error));
    },
    getOnLoadSubcategory(id) {
      this.$store
        .dispatch("loadCategories", id)
        .then(response => {
          const { category, success } = response;
          this.sub_categories = category;
        })
        .catch(error => console.log(error));
    },
    getOnLoadThirdcategory(id) {
      this.$store
        .dispatch("loadCategories", id)
        .then(response => {
          const { category, success } = response;
          this.third_categories = category;
        })
        .catch(error => console.log(error));
    },
    getOnLoadFourthcategory(id) {
      this.$store
        .dispatch("loadCategories", id)
        .then(response => {
          const { category, success } = response;
          if (category != undefined) {
            this.showFourthcategory = true;
          } else {
            this.showFourthcategory = false;
          }
          this.fourth_categories = category;
        })
        .catch(error => console.log(error));
    },

    LoadProductBrands() {
      const data = {
        product_type: "item",
        search: this.search
      };
      this.$store.dispatch("loadBrand", data);
    },
    searchCategory(id, name) {
      this.showCategory = true;
      this.clearFilterText = false;
      this.filters.categories = [];
      this.sub_categories = [];
      this.third_categories = [];
      this.fourth_categories = [];
      this.showSubcategory = false;
      this.showThirdcategory = false;
      this.showFourthcategory = false;
      this.filters.l2value = "";
      this.filters.l3value = "";
      this.filters.l4value = "";

      this.$store
        .dispatch("SelectCategory", id)
        .then(response => {
          const categories = response.categories;
          this.filters.l1value = categories[1].name;
          this.filters.l1id = categories[1].category_id;
          this.getOnLoadSubcategory(categories[1].category_id);
          this.showSubcategory = true;
          this.category = categories[1].name;

          if (categories[2] != undefined) {
            this.getOnLoadThirdcategory(categories[2].category_id);
            this.filters.l2value = categories[2].name;
            this.filters.l2id = categories[2].category_id;
            this.showThirdcategory = true;
            this.sub_category = categories[2].name;
          }
          if (categories[3] != undefined) {
            this.getOnLoadThirdcategory(categories[2].category_id);
            this.showThirdcategory = true;
            this.filters.l3value = categories[3].name;
            this.filters.l3id = categories[3].category_id;
            this.third_category = categories[3].name;
            this.getOnLoadFourthcategory(categories[3].category_id);
            // this.showFourthcategory = true;
          }
          if (categories[4] != undefined) {
            this.fourth_category = categories[4].name;
            this.getOnLoadFourthcategory(categories[3].category_id);
            this.showFourthcategory = true;
            this.filters.l4value = categories[4].name;
          }
          Object.keys(categories).forEach(element => {
            this.filters.categories.push(categories[element].name);
          });
          // this.filterPage();
        })
        .catch(error => console.log(error));
    },
    SearchData(name) {
      if (name == undefined) {
        this.filters.search = "";
      } else {
        this.filters.search = name;
      }
      this.filterPage();
    }
  },
  created() {
    setTimeout(() => {
      var pr = this.$store.getters.getProducts;
      for (const product of pr) {
        this.productCt.push(product.categories[0]);
      }
      return this.productCt;
    }, 2000);
    Object.keys(this.$route.query).forEach(key => {
      if (Object.keys(this.filters).includes(key)) {
        let query = this.$route.query[key];
        if (key == "offer_sort") {
          this.sort = "o" + query;
        }
        if (key == "price_sort") {
          this.sort = "p" + query;
        }

        if (key == "l1id") {
          this.showSubcategory = true;
          this.getOnLoadSubcategory(query);
        }

        if (key == "l2id") {
          this.showThirdcategory = true;
          this.getOnLoadThirdcategory(query);
        }
        if (key == "l3id") {
          this.showFourthcategory = true;
          this.getOnLoadFourthcategory(query);
        }
        if (key == "l1value") {
          this.category = query;
        }
        if (key == "l2value") {
          this.sub_category = query;
        }

        if (key == "l3value") {
          this.third_category = query;
        }
        if (key == "l4value") {
          this.fourth_category = query;
        }

        if (
          typeof this.filters[key] == "string" ||
          typeof this.filters[key] == "number"
        ) {
          this.filters[key] = query;
        } else {
          this.filters[key] = Array.isArray(query) ? query : [query];
        }
      }
    });

    this.LoadProductBrands();
    this.loadMore();
    this.$store
      .dispatch("GET_COUNTRY")
      .then(response => (this.countries = response.data.result));
    this.getcity(1);
    this.LoadProductCategory();
  }
};
</script>
<style scoped>
div.container-floor2 .list-wrapper .listItemShow > div:not(div.offer-item) {
  display: none !important;
}
.smallCarousel.prev {
  margin-right: -2.7em;
}
.change_dp {
  position: absolute;
  bottom: 15px;
  right: 11px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  background-color: #ffffff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  transform: translate3d(0, 11px, 0);
  transition-delay: 0.03s;
  transition-duration: 0.25s;
  transition-opacity: 0.15s;
}
.change_dp i {
  color: #ff5722;
}
.container-floor2 {
  min-height: 337px;
}
.container-floor2 >>> .listItemShow {
  grid-gap: 17px !important;
  margin-left: 25px;
  grid-template-columns: repeat(auto-fill, minmax(221px, 1fr));
}
.container-floor2 >>> .listactiveBox .listItemShow {
  grid-template-columns: repeat(2, 1fr);
}
.bx-tp-12-ch {
  margin-bottom: 30px;
  padding-bottom: 0;
}
.image-title {
  font-size: 20px;
  writing-mode: rl-tb;
  text-align: center;
  vertical-align: middle;
  color: white;
  position: absolute;
  top: 20px;
  left: 25%;
  margin-left: -50px;
  margin-bottom: -30px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
}
.icon_img {
  background: #fbfbfd;
  color: #ff5722;
  position: absolute;
  bottom: 35px;
  right: 5px;
  border-radius: 25%;
  margin-left: -50px;
  margin-bottom: -30px;
  width: 33px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;
}

.home-category-info-header {
  width: 100%;
  height: 53px;
  left: 0;
  overflow: hidden;
  margin-top: -18px;
  position: relative;
}
.home-category-info-header h3 {
  font-size: 15px;
}
.home-category-info-header-line {
  margin-right: 100px;
  border: 0.5px solid #eee;
}
.ch-left-layout {
  height: 357px;
}
.right-side {
  max-width: 250px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  vertical-align: top;
  width: 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-flow: column;
  flex-flow: column;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 250px;
  flex: 0 0 250px;
  padding: 0px 10px 0px 0px;
}
.filter-btn {
  display: inline-flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(64, 69, 83);
  border-radius: 2px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(241, 243, 249);
  font-size: 0.8571rem;
  font-weight: 700;
  padding: 8px 26px 8px 10px;
  position: relative;
  text-transform: capitalize;
  font-size: 11px;
}
.filtered {
  display: flex;
  align-items: center;
}
.filtered-by {
  font-size: 14px;
  font-weight: bold;
  padding-right: 10px;
}
.filter-btn span {
  font-weight: 600;
}
.filter-btn::after {
  content: "x";
  opacity: 0.4;
  border-radius: 100%;
  width: 12px;
  height: 12px;
  display: inline-block;
  line-height: 12px;
  font-size: 12px;
  position: absolute;
  top: 50%;
  margin-top: -6px;
  right: 6px;
}
.spn-tp-121 {
  padding-left: 0px;
  font-size: 16px;
}
.switchView {
  margin-right: 8px !important;
}
.show-bx-1 {
  margin-bottom: 0px !important;
  width: 150px;
}
.show-bx-1.brand {
  margin-bottom: 0px !important;
  width: 100%;
}
.show_bx_1 {
  width: 100%;
}
.show-bx-1 i {
  font-size: 20px !important;
  color: #a6a6ab !important;
  margin-right: -6px !important;
}
.show_bx_2 {
  margin-top: 15px;
  width: 224px;
  margin-left: 8px;
  float: left !important;
}
.margin_show {
  margin-top: 0px;
}
.filter_products {
  display: block;
  float: right !important;
  margin-right: 2px;
}

.filter_products i {
  width: 27px;
  height: 27px;
  margin-right: 10px;
  float: left;
  border: solid 1px #d2d2d2;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px !important;
  cursor: pointer;
}

.app-content {
  margin-top: 1px;
}
.ctSelect {
  margin-bottom: 10px !important;
  font-size: 10px;
}
.tags-content {
  margin: 0px 10px;
  position: relative;
  top: -18px;
}
.image-wrap {
  padding: 20px 0;
}
.select-allign {
  padding: 0px 10px;
}
.loader {
  position: relative;
  right: 0;
}
.nodata {
  text-align: center;
  color: #616161;
  font-weight: bolder;
}
.drawer {
  padding-bottom: 10px;
  max-height: 2000px;
  -webkit-transition: max-height 0.15s ease-in;
  transition: max-height 0.15s ease-in;
}
.drawer .wrapper {
  padding: 0 10px;
}

.inputWrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.textInput {
  border: 1px solid #e2e5f1;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 2px;
  font-size: 0.833333rem;
  font-weight: bold;
  text-transform: uppercase;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  min-width: 0;
}
.clear-text {
  display: inline-block;
  line-height: 1.6;
  font-weight: 600;
  color: rgb(237, 55, 0);
  text-transform: capitalize;
  font-size: 1.2rem;
  margin-left: 3px;
  cursor: pointer;
}
.between {
  text-transform: uppercase;
  font-size: 0.833333rem;
  margin: 0 8px;
  color: #b2bbd2;
}
.goButton {
  cursor: pointer;
  color: #fe5722;
  margin-left: 10px;
  text-transform: uppercase;
  font-weight: bold;
  background: none;
  border: none;
}
.no-data-img {
  height: 400px;
  display: block;
  margin: 0px auto;
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

.lst-bxing-1 {
  float: left;
  width: 100% !important;
}
.bx-tp-12-ch {
  display: block !important;
  float: left;
  padding-top: 10px !important;
}
.show-bx-1 .bx-tp-12-ch {
  float: left;
}
.bx-ch-12 {
  float: left;
}
.topPos {
  float: right;
}

.ctSelect {
  float: right;
}
.spn-tp-121 {
  margin-top: 6px !important;
}
.mob_border_filter {
  display: none;
}
.ch-left-layout2 {
  display: none;
}
@media screen and (max-width: 1000px) {
  .home-category-info-header {
    width: 100%;
    left: 0;
  }
}
@media screen and (max-width: 768px) {
  .home-category-info-header {
    width: 100%;
    left: 0;
  }
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
    font-size: 13px !important;
  }
  .ctSelect {
    width: 155px !important;
  }
  .width_filter_mob {
    width: 100% !important;
    margin: auto;
    margin-top: 10px;
  }
  .filter-name {
    overflow: hidden;
  }
  .spn-tp-121 {
    font-size: 16px;
  }

  .searchFilterWrap {
    padding: 0px;
  }

  .show_bx_2 {
    margin-left: 0px;
  }
}

@media screen and (max-width: 600px) {
  .container-floor2 >>> .listItemShow {
    grid-template-columns: repeat(auto-fill, minmax(162px, 1fr));
  }
  .container-floor2 >>> .listactiveBox .listItemShow {
    grid-template-columns: repeat(1, 1fr);
  }
  .fltr-slct-bx .md-checkbox {
    font-size: 14px !important;
  }
  .auto-scrol-bx {
    height: auto !important;
  }
  .selectedValues {
    padding-left: 0px;
    padding-right: 0px;
  }
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
  .switchView i {
    font-size: 22px;
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
  .width_filter_mob {
    width: 100% !important;
    margin: auto;
    margin-top: 10px;
  }
  .filter-name {
    padding-left: 10px;
    padding-right: 10px;
  }

  .pb-zero {
    padding-bottom: 5px;
  }

  .filter-name.pb-zero {
    padding-top: 0px;
  }

  .filter-name.pb-category {
    padding-bottom: 20px;
  }

  .filter-name.pb-category {
    padding-bottom: 13px;
    padding-top: 8px;
  }

  .ch-main-layout .ch-right-layout {
    padding-left: 0;
    padding-right: 0;
  }
  .search-filter-mobile-wrapper .facetsWrapper {
    margin-top: 52px;
  }

  .mob_border_filter {
    width: 100%;
    height: 1px;
    background-color: #f1f3f9;
    float: left;
    display: block;
    margin-top: 10px;
  }

  .border_category {
    margin-top: 20px;
  }

  .pt_mob_price {
    padding-top: 10px !important;
    margin-bottom: 8px !important;
  }
  .price_bottom_mob {
    padding-bottom: 15px;
  }

  .clear-text {
    /* padding-right: 6px !important; */
    min-width: 60px !important;
  }
}
@media screen and (max-width: 768px) {
  .ct-title {
    display: block;
    width: 100%;
    font-size: 13px;
    text-align: left;
    margin-bottom: 20px;
    margin-left: 25px;
    color: #333;
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
  .ctSelect.show_bx_2.margin_show {
    margin-top: 0px;
  }

  .clear-text {
    padding-right: 6px !important;
    min-width: 67px !important;
    margin-left: -15px;
  }
}

/* DIALOG CSS */
.md-dialog-content {
  min-width: 400px;
  max-height: 100%;
}
.md-dialog-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 14%);
  padding: 12px;
  margin-bottom: 0px;
}

.md-dialog-title i {
  color: #ff5821;
}
.md-dialog-content {
  padding: 0px;
}
.md-dialog-actions {
  background: #ff7d53;

  padding: 0px;
  justify-content: center;
}
.md-dialog-actions .md-button {
  flex: 1;
  margin: 6px;
  color: white;
}

.filter-name {
  background-color: transparent;
}
</style>
