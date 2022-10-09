<template>
  <div>
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
                        <i class="material-icons">arrow_drop_down</i>
                      </div>
                      <div class="show-bx-1 reagion ctSelect">
                        <select
                          name="Country"
                          @change="onChangeCountry"
                          class=""
                        >
                          <option value="" data-foo="">All Countries </option>
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
                    <div class="cst-bx-v-1" v-if="showCity">
                      <div class="show-bx-1  ctSelect reagion">
                        <select
                          name="city"
                          id="city"
                          placeholder="City"
                          @change="onChangeCity"
                        >
                          <option data-foo="" value="">All Cities </option>
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
                          <option value="">All Areas </option>
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
                    <div class="secton-title">
                      <h2>Service Type</h2>
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
                          >Service Demand</md-checkbox
                        >
                      </div>
                      <div class="fltr-slct-bx">
                        <md-checkbox
                          class="smallOption"
                          v-model="filters.market_type"
                          @change="market_type($event)"
                          value="supply"
                          >Service Supplies</md-checkbox
                        >
                      </div>
                    </div>
                    <!-- <div class="cst-bx-v-1">
                      <div class="secton-title">
                        <h2>Search</h2>
                      </div>
                      <Search :search="filters.search" @onSearch="SearchData" />
                    </div> -->
                    <div class="cst-bx-v-1 category">
                      <div class="secton-title">
                        <h2>Categories</h2>
                        <i class="material-icons">add</i>
                      </div>
                      <div class="show-bx-1 ">
                        <CategorySearch @onClickSearch="searchCategory" />
                      </div>

                      <div class="show-bx-1 ctSelect ">
                        <select @change="change_categories">
                          <option value="" data-foo="">All Categories</option>
                          <option
                            :selected="category.categoryname == filters.l1value"
                            :value="category.category_id"
                            v-for="category in categories"
                            :key="category.category_id"
                            :data-foo="category.categoryname"
                            >{{ category.categoryname }}</option
                          >
                        </select>
                      </div>
                      <div class="show-bx-1 ctSelect " v-if="showSubcategory">
                        <select @change="change_subcategory">
                          <option value="" data-foo="">All categories</option>
                          <option
                            :selected="category.categoryname == filters.l2value"
                            :data-foo="category.categoryname"
                            :value="category.category_id"
                            v-for="category in sub_categories"
                            :key="category.id"
                            >{{ category.categoryname }}</option
                          >
                        </select>
                      </div>
                      <div class="show-bx-1 ctSelect " v-if="showThirdcategory">
                        <select @change="change_thirdcategory">
                          <option value="" data-foo="">All categories</option>
                          <option
                            :selected="category.categoryname == filters.l3value"
                            :data-foo="category.categoryname"
                            :value="category.category_id"
                            v-for="category in third_categories"
                            :key="category.id"
                            >{{ category.categoryname }}</option
                          >
                        </select>
                      </div>
                      <div
                        class="show-bx-1 ctSelect "
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
                            >{{ category.categoryname }}</option
                          >
                        </select>
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
          <servicesListingbox @price_sort="OnCLickSortPrice" :sort="sort">
          </servicesListingbox>
          <div v-if="showImage" class="image-wrap">
            <h2 class="nodata">NO SERVICES FOUND</h2>
            <img class="no-data-img" src="../../../assets/images/data.png" />
          </div>
          <div class="loader">
            <div class="circle-loader" v-if="showLoader"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import servicesListingbox from "../../ctcomponents/services/servicesListingbox";
import Search from "../search";
import CategorySearch from "../CategorySearch";
export default {
  name: "demands",
  data: () => ({
    showImage: false,
    filters: {
      search_category: "",
      search: "",
      page: 0,
      market_type: "",
      categories: [],
      location_country: "",
      location_city: "",
      location_area: "",
      price_sort: "",
      offer_sort: "",
      l1value: "",
      l1id: "",
      l2value: "",
      l2id: "",

      l3value: "",
      l3id: "",
      l4value: ""
    },
    showCity: false,
    showArea: false,
    sort: "",
    categories: "",
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
    countries: [],
    array: [],
    busy: false,
    showLoader: true,
    boolean: false,
    string: null,
    novalue: null,
    disabled: true,
    obj1: { name: "obj1" },
    obj2: { name: "obj2" },
    obj: null,
    indeterminate: true,
    cities: "",
    areas: ""
  }),
  components: {
    servicesListingbox,
    Search,
    CategorySearch
  },
  computed: {
    //  categories() {
    //   return this.$store.getters.getProductCategories;
    // },
  },
  methods: {
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
        }
      }
      const id = event.target.value;
      this.filters.l1id = id;
      this.selectedDropdown = "category";

      this.showThirdcategory = false;
      this.showFourthcategory = false;
      this.sub_categories = [];
      this.third_categories = [];
      this.fourth_categories = [];
      if (this.category == "") {
        this.showSubcategory = false;
        this.filters.categories = [];
      } else {
        this.LoadProductCategory(id);
      }
      this.filterPage();
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

      if (this.sub_category == "") {
        this.showThirdcategory = false;
        this.showFourthcategory = false;
      } else {
        this.LoadProductCategory(id);
      }

      this.filterPage();
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

      this.filterPage();
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

      this.filterPage();
    },
    searchCategory(id, name) {
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
            this.showFourthcategory = true;
          }
          if (categories[4] != undefined) {
            this.getOnLoadFourthcategory(categories[3].category_id);
            this.showFourthcategory = true;
            this.fourth_category = categories[4].name;
            this.filters.l4value = categories[4].name;
          }
          Object.keys(categories).forEach(element => {
            this.filters.categories.push(categories[element].name);
          });
          this.filterPage();
        })
        .catch(error => console.log(error));
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

    LoadProductCategory() {
      this.$store.dispatch("loadCategories");
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
          this.showCity = true;
        } else {
          this.filters.location_city = "";
          this.filters.location_area = "";
          this.showCity = false;
          this.showArea = false;
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
          this.fourth_categories = category;
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
    loadMore() {
      this.filters.page++;
      this.showLoader = true;
      this.busy = true;
      if (this.$route.params.id) {
        const id = this.$route.params.id;
        this.filters.profileid = id;
      }
      Object.keys(this.filters).forEach((key, index) => {
        // debugger;
        if (
          key == "l1value" ||
          key == "l1id" ||
          key == "l2value" ||
          key == "l2id" ||
          key == "l3value" ||
          key == "l3id" ||
          key == "l4value"
        ) {
          delete this.filters[key];
        }
      });
      const data = {};
      Object.keys(this.filters).forEach(key => {});
      this.$store
        .dispatch("LoadServices", this.filters)
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
          } else {
            this.categories = category;
          }
        })
        .catch(error => console.log(error));
    },
    market_type() {
      if (this.filters.market_type == null) {
        this.filters.market_type = "";
      }
      this.filterPage();
    },
    loadurlData() {
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
          if (key == "l1value") {
            this.category = query;
          }
          if (key == "l2value") {
            this.sub_category = query;
          }
          if (key == "l3value") {
            this.third_category = query;
          }

          if (
            key == "market_type" ||
            key == "location_country" ||
            key == "price_sort" ||
            key == "offer_sort"
          ) {
            this.filters[key] = query;
          } else {
            this.filters[key] = Array.isArray(query) ? query : [query];
          }
        }
      });
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
    }
  },

  created() {
    this.loadurlData();
    this.LoadProductCategory();
    this.loadMore();
    this.getCountry();
  }
};
</script>
<style scoped>
.image-wrap {
  padding: 20px 0;
}

.select-allign {
  padding: 0px 10px;
}
.category .show-bx-1 {
  margin-bottom: 14px;
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
