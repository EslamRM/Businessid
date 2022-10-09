<template>
  <div>
    <div class="lst-bx-wrp fltr-pg-1">
      <div class="container clearfix">
        <div class="ch-main-layout">
          <div class="cust-wrapper">
            <div class="ch-left-layout statistics">
              <div class="left-category">
                <div class="alife-bc-category-nav">
                  <div class="menu-container">
                    <div class="category-menu-wrapper">
                      <div class="category-head">
                        Filter
                        <div
                          class="category-head-border"
                          data-reactid="7"
                        ></div>
                      </div>
                      <div class="menu filter-left">
                        <div class="cst-bx-v-1">
                          <div class="secton-title">
                            <h2>Location</h2>
                            <i class="material-icons">add</i>
                          </div>
                          <div class="md-layout-item md-size-100 select-allign">
                            <md-field>
                              <md-select
                                v-model="filters.country"
                                name="country"
                                id="country"
                                placeholder="Country"
                                @md-selected="onChangeCountry()"
                              >
                                <md-option value="">Choose country </md-option>
                                <md-option
                                  v-for="country in countries"
                                  :key="country.pk_countries_id"
                                  :value="country.pk_countries_id"
                                >
                                  {{ country.name }}
                                </md-option>
                              </md-select>
                            </md-field>
                          </div>
                          <div class="md-layout-item md-size-100 select-allign">
                            <md-field>
                              <md-select
                                v-model="filters.city"
                                name="city"
                                id="city"
                                placeholder="City"
                                @md-selected="onChangeCity()"
                              >
                                <md-option value="" selected disabled
                                  >Choose city
                                </md-option>
                                <md-option
                                  v-for="city in cities"
                                  :key="city.pk_countries_id"
                                  :value="city.pk_countries_id"
                                >
                                  {{ city.location }}
                                </md-option>
                              </md-select>
                            </md-field>
                          </div>
                        </div>
                        <div class="cst-bx-v-1">
                          <div class="secton-title">
                            <h2>Search by company</h2>
                            <i class="material-icons">add</i>
                          </div>
                          <div class="show-bx-1">
                            <div
                              class="md-layout-item md-size-100 select-allign"
                            >
                              <md-field>
                                <md-input
                                  autocomplete="off"
                                  v-model="name"
                                  placeholder="Company name"
                                  @keyup="autocomplete"
                                ></md-input>
                              </md-field>
                              <div
                                class="autocomplete-wrapper"
                                v-if="
                                  showAutoComplete && companies != undefined
                                "
                              >
                                <ul
                                  v-for="(company, index) in companies"
                                  :key="index"
                                >
                                  <li
                                    @click="
                                      bindValueSearchValue(
                                        company.trade_name_en
                                      )
                                    "
                                  >
                                    {{ company.trade_name_en }}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="cst-bx-v-1">
                          <div class="secton-title">
                            <h2>Type</h2>
                            <i class="material-icons">add</i>
                          </div>
                          <div class="show-bx-1">
                            <div class="fltr-slct-bx">
                              <md-checkbox
                                class="smallOption"
                                v-model="filters.user_type"
                                value=""
                                @change="check($event)"
                              >
                                All</md-checkbox
                              >
                            </div>
                            <div class="fltr-slct-bx">
                              <md-checkbox
                                class="smallOption"
                                v-model="filters.user_type"
                                value="company"
                                @change="check($event)"
                                >Company</md-checkbox
                              >
                            </div>
                            <div class="fltr-slct-bx">
                              <md-checkbox
                                class="smallOption"
                                v-model="filters.user_type"
                                value="trader"
                                @change="check($event)"
                                >Trader</md-checkbox
                              >
                            </div>
                            <div class="fltr-slct-bx">
                              <md-checkbox
                                class="smallOption"
                                v-model="filters.user_type"
                                value="personal"
                                @change="check($event)"
                                >Personal</md-checkbox
                              >
                            </div>
                          </div>
                        </div>

                        <div class="cst-bx-v-1">
                          <div class="secton-title">
                            <h2>Activities</h2>
                            <i class="material-icons">add</i>
                          </div>
                          <md-field style="padding:0px 10px;">
                            <vue-tags-input
                              class="myclass"
                              @before-adding-tag="onEnterActivity"
                              v-model="tag"
                              :tags="activities"
                              :autocomplete-items="autocompleteItems"
                              :add-only-from-autocomplete="true"
                              @tags-changed="update"
                              placeholder="Choose activities #shipping"
                            />
                          </md-field>
                        </div>

                        <div class="cst-bx-v-1">
                          <div class="secton-title">
                            <h2>Nationality</h2>
                            <i class="material-icons">add</i>
                          </div>
                          <div class="md-layout-item md-size-100 select-allign">
                            <md-field>
                              <md-select
                                v-model="filters.nationality"
                                name="country"
                                id="country"
                                placeholder="Nationality"
                                @md-selected="onChangeNationality()"
                              >
                                <md-option value=""
                                  >Choose nationality
                                </md-option>
                                <md-option
                                  v-for="country in countries"
                                  :key="country.pk_countries_id"
                                  :value="country.pk_countries_id"
                                >
                                  {{ country.name }}
                                </md-option>
                              </md-select>
                            </md-field>
                          </div>
                        </div>
                        <div class="cst-bx-v-1">
                          <div class="secton-title">
                            <h2>Gender</h2>
                            <i class="material-icons">add</i>
                          </div>
                          <div class="md-layout-item md-size-100 select-allign">
                            <md-field>
                              <md-select
                                v-model="filters.gender"
                                name="gender"
                                id="gender"
                                placeholder="Gender"
                                @md-selected="onChangeGender()"
                              >
                                <md-option value="male">Male</md-option>
                                <md-option value="female">Female</md-option>
                                <md-option value="other">Other</md-option>
                              </md-select>
                            </md-field>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="listing-on"
              v-infinite-scroll="loadMore"
              :infinite-scroll-listen-for-event="true"
              infinite-scroll-immediate-check="false"
              infinite-scroll-disabled="busy"
              infinite-scroll-distance="1500"
            >
              <statisticsList
                :posts="posts"
                v-if="isFilterd"
                v-on:follow="EventFollow"
                v-on:handleToggleFilter="handleToggleFilter"
              >
              </statisticsList>
              <div class="loader" v-if="showLoader">
                <div class="circle-loader"></div>
              </div>
            </div>
          </div>
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
        <div class="facesWrapper">
          <div class="menu filter-left">
            <div class="cst-bx-v-1">
              <div class="secton-title">
                <h2>Location</h2>
                <i class="material-icons">add</i>
              </div>
              <div class="md-layout-item md-size-100 select-allign">
                <md-field>
                  <md-select
                    v-model="filters.country"
                    name="country"
                    id="country"
                    placeholder="Country"
                    @md-selected="onChangeCountry()"
                  >
                    <md-option value="">Choose country </md-option>
                    <md-option
                      v-for="country in countries"
                      :key="country.pk_countries_id"
                      :value="country.pk_countries_id"
                    >
                      {{ country.name }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 select-allign">
                <md-field>
                  <md-select
                    v-model="filters.city"
                    name="city"
                    id="city"
                    placeholder="City"
                    @md-selected="onChangeCity()"
                  >
                    <md-option value="" selected disabled
                      >Choose city
                    </md-option>
                    <md-option
                      v-for="city in cities"
                      :key="city.pk_countries_id"
                      :value="city.pk_countries_id"
                    >
                      {{ city.location }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
            <div class="cst-bx-v-1">
              <div class="secton-title">
                <h2>Search by company</h2>
                <i class="material-icons">add</i>
              </div>
              <div class="show-bx-1">
                <div class="md-layout-item md-size-100 select-allign">
                  <md-field>
                    <md-input
                      autocomplete="off"
                      v-model="name"
                      placeholder="Company name"
                      @keyup="autocomplete"
                    ></md-input>
                  </md-field>
                  <div
                    class="autocomplete-wrapper"
                    v-if="showAutoComplete && companies != undefined"
                  >
                    <ul v-for="(company, index) in companies" :key="index">
                      <li @click="bindValueSearchValue(company.trade_name_en)">
                        {{ company.trade_name_en }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="cst-bx-v-1">
              <div class="secton-title">
                <h2>Type</h2>
                <i class="material-icons">add</i>
              </div>
              <div class="show-bx-1">
                <div class="fltr-slct-bx">
                  <md-checkbox
                    class="smallOption"
                    v-model="filters.user_type"
                    value=""
                    @change="check($event)"
                  >
                    All</md-checkbox
                  >
                </div>
                <div class="fltr-slct-bx">
                  <md-checkbox
                    class="smallOption"
                    v-model="filters.user_type"
                    value="company"
                    @change="check($event)"
                    >Company</md-checkbox
                  >
                </div>
                <div class="fltr-slct-bx">
                  <md-checkbox
                    class="smallOption"
                    v-model="filters.user_type"
                    value="trader"
                    @change="check($event)"
                    >Trader</md-checkbox
                  >
                </div>
                <div class="fltr-slct-bx">
                  <md-checkbox
                    class="smallOption"
                    v-model="filters.user_type"
                    value="personal"
                    @change="check($event)"
                    >Personal</md-checkbox
                  >
                </div>
              </div>
            </div>

            <div class="cst-bx-v-1">
              <div class="secton-title">
                <h2>Activities</h2>
                <i class="material-icons">add</i>
              </div>
              <md-field style="padding:0px 10px;">
                <vue-tags-input
                  class="myclass"
                  @before-adding-tag="onEnterActivity"
                  v-model="tag"
                  :tags="activities"
                  :autocomplete-items="autocompleteItems"
                  :add-only-from-autocomplete="true"
                  @tags-changed="update"
                  placeholder="Choose activities #shipping"
                />
              </md-field>
            </div>

            <div class="cst-bx-v-1">
              <div class="secton-title">
                <h2>Nationality</h2>
                <i class="material-icons">add</i>
              </div>
              <div class="md-layout-item md-size-100 select-allign">
                <md-field>
                  <md-select
                    v-model="filters.nationality"
                    name="country"
                    id="country"
                    placeholder="Nationality"
                    @md-selected="onChangeNationality()"
                  >
                    <md-option value="">Choose nationality </md-option>
                    <md-option
                      v-for="country in countries"
                      :key="country.pk_countries_id"
                      :value="country.pk_countries_id"
                    >
                      {{ country.name }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
            <div class="cst-bx-v-1">
              <div class="secton-title">
                <h2>Gender</h2>
                <i class="material-icons">add</i>
              </div>
              <div class="md-layout-item md-size-100 select-allign">
                <md-field>
                  <md-select
                    v-model="filters.gender"
                    name="gender"
                    id="gender"
                    placeholder="Gender"
                    @md-selected="onChangeGender()"
                  >
                    <md-option value="male">Male</md-option>
                    <md-option value="female">Female</md-option>
                    <md-option value="other">Other</md-option>
                  </md-select>
                </md-field>
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
</template>
<script>
import statisticsList from "../statistics/statisticsList";
import VueTagsInput from "@johmun/vue-tags-input";

import { mapState } from "vuex";
export default {
  name: "demands",
  data: () => ({
    showMobileFilter: false,
    optionType: ["Male", "Female", "Other"],
    showAutoComplete: false,
    name: "",
    key: 123,
    tag: "",
    activities: [],
    busy: false,
    companies: [],
    autocompleteItems: [],
    isAutocompleteFilterd: false,
    filters: {
      page: 0,
      search: "",
      user_type: null,
      country: null,
      city: null,
      activities: "",
      country: null,
      city: null,
      nationality: null,
      gender: null,
      company: null
    },

    isFilterd: false,
    user_type: "",
    countries: [],
    cities: [],
    showLoader: true
  }),
  components: {
    statisticsList,
    VueTagsInput
  },
  computed: {
    posts() {
      return this.$store.getters.getStatistics;
    }
  },

  methods: {
    closeFilter() {
      console.log("event");
      this.$store.dispatch("ToggleHeader");
      this.showMobileFilter = false;
    },
    handleToggleFilter() {
      console.log("event");
      this.showMobileFilter = true;
    },
    EventFollow() {
      // this.filters.page=0;
      // this.loadMore();
    },
    autocomplete() {
      this.showAutoComplete = true;
      const data = { name: this.name };
      this.filters.page = 0;
      this.filters.search = this.name;
      this.loadMore();
      this.$store
        .dispatch("AutoCompleteCompany", data)
        .then(response => {
          this.companies = response.users;
        })
        .catch(error => {
          console.log(error);
        });
    },
    bindValueSearchValue(name) {
      this.isAutocompleteFilterd = true;
      this.filters.search = name;
      this.name = name;
      this.showAutoComplete = false;
      this.filters.page = 0;
      this.loadMore();
    },
    //call filter
    filterData() {
      this.filters.page = 0;
      this.loadMore();
    },
    onChangeGender() {
      this.filters.page = 0;
      this.loadMore();
    },

    //for getting statistics
    loadMore() {
      this.busy = true;
      this.filters.page++;
      this.showLoader = true;
      this.$store
        .dispatch("LoadStatistic", this.filters)
        .then(response => {
          this.showLoader = false;
          if (response.posts) {
            this.showLoader = false;
            this.busy = false;
          }
        })
        .catch(error => {
          this.busy = false;
          this.showLoader = false;
        });
    },
    onEnterActivity(obj) {
      obj.addTag();
    },
    check(event) {
      this.filters.page = 0;
      this.loadMore();
    },
    update(newTags) {
      this.autocompleteItems = [];
      const activity = newTags.map(tags => {
        return tags.text;
      });
      this.filters.activities = "";
      this.filters.activities = activity;
      this.filterData();
      console.log(this.filters.activities);
    },
    initItems() {
      console.log("init");

      // var temp_data = this.filters.activities;
      this.filters.activities = "a";
      // if(temp_data)
      // {
      //     let data=[...temp_data,this.tag];
      // }

      // this.filters.activities=[this.tag];
      // this.filterData();
      if (this.tag.length < 2) return;
      this.$store
        .dispatch("GET_ACTIVITIES", this.tag)
        .then(response => {
          this.autocompleteItems = response.data.result.map(a => {
            return { text: a.title };
          });
        })
        .catch(error => console.log(error));
    },
    //onchoose of country
    onChangeCountry() {
      this.filters.city = "";
      const country_id = this.filters.country;
      this.$store
        .dispatch("GET_CITY", country_id)
        .then(response => (this.cities = response.data.result));
      this.filterData();
    },
    onChangeNationality() {
      this.filterData();
    },
    onChangeCity() {
      this.filterData();
    }
  },
  created() {
    this.loadMore();
    this.$store
      .dispatch("GET_COUNTRY")
      .then(response => (this.countries = response.data.result));
    this.isFilterd = true;
  },
  mounted() {
    //this.isFilterd=false;
  },
  watch: {
    name: function(val, oldVal) {
      // the callback will be called immediately after the start of the observation

      if (this.name.length <= 0) {
        if (this.isAutocompleteFilterd) {
          this.isAutocompleteFilterd = false;
          this.filters.search = "";
          this.filterData();
        }
      }
    },
    tag: "initItems",
    posts: {
      // the callback will be called immediately after the start of the observation

      immediate: true,
      handler(val, oldVal) {
        if (oldVal != undefined) {
          if (oldVal.length > 0) {
            this.isFilterd = true;
          }
        } else {
          this.isFilterd = true;
        }
        //  if(val!=undefined)
        //  {
        //    const dd = val[0]['isfollowing'];
        //    if(dd!=null)
        //    {
        //      this.isFilterd=true;
        //    }
        //  }
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.statistics .left-category {
  width: 100%;
}
.statistics .category-menu-wrapper {
  width: 100%;
}
.filter-padd {
  padding: 7px;
}
.select-allign {
  padding: 7px;
}
.select-allign .md-field {
  margin: 0;
  padding: 0;
  min-height: 35px;
}
.filter-left .cst-bx-v-1 {
  margin-bottom: 1.5em;
}

.listing-on {
  width: 100%;
  max-width: 100%;
  flex-direction: column;
  display: flex;
}
.md-layout-item input[type="text"].md-input:-webkit-input-placeholder {
  font-size: 12px !important;
}
.loader {
  position: relative;
  right: 25%;
  height: 60px;
}
.vue-tags-input {
  max-width: 100%;
  width: 100%;
}
.cust-wrapper {
  display: flex;
  margin-top: 15px;
  width: 100%;
  flex-direction: row;
}
.ti-input.ti-tag {
  background-color: #a2a2a2;
  color: #fff;
  border-radius: 2px;
  display: flex;
  padding: 3px 5px;
  margin: 2px;
  font-size: 0.85em;
  border-radius: 10px;
}
.vue-tags-input .ti-input {
  border: none !important;
}
.ti-input {
  border: none;
}
.autocomplete-wrapper {
  position: absolute;
  background-color: white;
  width: 93%;
  z-index: 2000;
  /* box-shadow: 0px 1px 1px #e6e6e6; */
  border: 1px solid #ece3e3;
}
.autocomplete-wrapper li {
  padding: 5px;
}
.autocomplete-wrapper li:hover {
  background-color: #fe5722;
  color: #fff;
  cursor: pointer;
}
.ch-left-layout.statistics {
  padding: 0px 13px 0px 0px;
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

@media only screen and (max-width: 768px) {
  .ch-left-layout.statistics {
    display: none;
  }
  .container {
    max-width: 100%;
    padding-left: 5px;
    padding-right: 5px;
  }
}

@media only screen and (max-width: 320px) {
  .container {
    padding-right: 45px;
  }
}
</style>
