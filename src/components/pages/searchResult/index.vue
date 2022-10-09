<template>
  <div>
    <div class="full-wrap result-wrap">
      <div class="container">
        <div class="head">
          <input
            type="search"
            v-model="keyword"
            class="search"
            @input="search()"
            @blur="hide()"
            @focus="isfocus = true"
            v-on:keyup.enter="searchResult()"
          /><i class="material-icons" @click="searchResult()">
            search
          </i>
          <div
            class="options"
            v-if="
              keyword &&
                isfocus &&
                keyword.length !== 0 &&
                filteroptions.length !== 0
            "
          >
            <ul>
              <li
                v-for="(result, index) in filteroptions"
                :key="index"
                @click="getsearch(result)"
              >
                <a>{{ result }}</a>
              </li>
            </ul>
          </div>
        </div>
        <!-- <v-select
          class="head"
          placeholder="Search"
          label="trade_name_en"
          v-model="keyword"
          :options="optionfilter"
          @search="search($event)"
          @input="searchResult($event)"
        >
          <template #open-indicator="{ attributes }">
            <i class="search-icon material-icons">search</i>
          </template>
        </v-select> -->
        <div class="full-wrap mb-4">
          <div class="filter-chip d-flex align-center">
            <router-link to="/searchResults">
              <div class="chips">
                <md-chip
                  md-clickable
                  class="section"
                  @click="activate(1)"
                  :class="{ active: active_el == 1 }"
                  ><i class="material-icons"> search </i>All</md-chip
                >
              </div>
            </router-link>
            <!-- <router-link to="/ShopResults">
              <div class="chips">
                <md-chip
                  md-clickable
                  class="section"
                  @click="activate(2)"
                  :class="{ active: active_el == 2 }"
                  ><i class="material-icons"> store </i>Shop</md-chip
                >
              </div>
            </router-link> -->
            <router-link to="/productsResults">
              <div class="chips">
                <md-chip
                  md-clickable
                  class="section"
                  @click="activate(3)"
                  :class="{ active: active_el == 3 }"
                  ><i class="material-icons"> category </i>Products</md-chip
                >
              </div>
            </router-link>
            <router-link to="/imagesResults">
              <div class="chips">
                <md-chip
                  md-clickable
                  class="section"
                  @click="activate(4)"
                  :class="{ active: active_el == 4 }"
                  ><i class="material-icons"> crop_original </i>Images</md-chip
                >
              </div>
            </router-link>
            <router-link to="/videosResults">
              <div class="chips">
                <md-chip
                  md-clickable
                  class="section"
                  @click="activate(5)"
                  :class="{ active: active_el == 5 }"
                  ><i class="material-icons"> switch_video </i>Videos</md-chip
                >
              </div>
            </router-link>
            <router-link to="/CompanyResults">
              <div class="chips">
                <md-chip
                  md-clickable
                  class="section"
                  @click="activate(6)"
                  :class="{ active: active_el == 6 }"
                  ><i class="material-icons"> business </i>Company</md-chip
                >
              </div>
            </router-link>
            <router-link to="/PersonalResults">
              <div class="chips">
                <md-chip
                  md-clickable
                  class="section"
                  @click="activate(7)"
                  :class="{ active: active_el == 7 }"
                  ><i class="material-icons"> person </i>Personal</md-chip
                >
              </div>
            </router-link>
          </div>
        </div>
        <div class="border-header">
          <span class="border"></span>
        </div>
        <div class="small mt-4">About {{ resultsLength }} results</div>
        <router-view
          :results="results"
          :keyword="keyword"
          :users="users"
        ></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vSelect from "vue-select";
export default {
  name: "searchIndex",
  data() {
    return {
      showOptions: false,
      isfocus: false,
      optionfilter: [],
      results: [],
      users: [],
      active_el: 1,
      keyword: this.$route.query.keyword,
      resultsLength: 0,
      page: 1
    };
  },
  components: {
    vSelect
  },
  computed: {
    filteroptions() {
      if (this.optionfilter) {
        return this.optionfilter.filter(item => {
          return this.keyword
            .toLowerCase()
            .split(" ")
            .every(v => item.toLowerCase().includes(v));
        });
      }
    }
  },
  methods: {
    activate(el) {
      this.active_el = el;
    },
    search() {
      return new Promise((resolve, reject) => {
        axios
          .post("https://businessid.net/api/v2/api_search_product", {
            keyword: this.keyword,
            page: this.page
          })
          .then(response => {
            resolve(response);
            this.results = [];
            this.users = [];
            this.optionfilter = [];
            this.results = response.data.products.products;
            this.users = response.data.products.users;
            this.resultsLength =
              this.results.length + Object.keys(this.users).length;
            this.results.forEach(result => {
              if (this.results.indexOf(result.name) === -1) {
                this.optionfilter.push(result.name);
              }
            });
            this.users.forEach(result => {
              if (this.users.indexOf(result.name) === -1) {
                this.optionfilter.push(result.name);
              }
            });
            console.log(response.data.products);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    searchResult() {
      this.$router.push({
        path: "/searchresults",
        query: { keyword: this.keyword }
      });
    },
    getsearch(word) {
      this.keyword = word;
    },
    hide() {
      setTimeout(() => {
        this.isfocus = false;
      }, 500);
    }
  },
  watch: {
    "$route.query.keyword": {
      handler: function(keyword) {
        if (keyword) {
          this.keyword = keyword;
          this.search();
        }
      },
      deep: true,
      immediate: true
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    },
    blur: {
      inserted(el) {
        el.blur();
      }
    }
  },
  created() {
    if (this.$route.query.keyword) {
      this.search();
    }
  }
};
</script>
<style scoped>
/* .hidethis {
  display: none;
} */
.result-wrap {
  font-size: 16px;
  line-height: 23px;
}
.section {
  height: 28px;
  line-height: 28px;
}
.section >>> .md-ripple {
  padding-left: 33px !important;
  padding-right: 20px !important;
}
.active {
  background: #ff5722 !important;
  color: #eee !important;
}
.VueCarousel {
  width: 58%;
  margin-top: 10px;
}
.bravo-normal-offer {
  padding: 0;
}
.md-card .md-title {
  font-size: 17px;
  text-align: left;
  color: #1a0dab;
}
.search-image {
  display: flex;
  height: 70px;
}
.search-image p {
  display: flex;
  width: 35%;
  line-height: 25px;
}
.result-wrap {
  margin-top: 3.3em;
}
.txt-head {
  font-size: 13px;
  font-weight: 600;
  color: #888;
  margin-right: 0.5em;
}
.filter-chip {
  margin-top: 2em;
}
.chips {
  margin-right: 0.4em;
  position: relative;
  text-align: right;
}
.chips i {
  position: absolute;
  top: 3px;
  left: 10px;
  font-size: 20px;
}
.head {
  width: 50%;
  position: relative;
}
.head .options {
  position: absolute;
  padding: 10px;
  z-index: 2;
  background: #fff;
  border-radius: 15px;
  border: 1px solid #ccc;
  width: 100%;
  margin-top: 5px;
}
.head .options li {
  padding: 10px;
  cursor: pointer;
}
.head .options li a:hover {
  color: tomato;
}
.head >>> .vs__dropdown-menu {
  height: auto;
  overflow-y: auto;
  float: left;
  position: absolute;
  transform: scale(1, 1);
  transition: transform ease 150ms;
  transform-origin: top;
  background-color: #ffffff;
  border-radius: 6px;
  border: solid 1px #eef0f1;
  box-shadow: 0 20px 40px 0 rgb(0 0 0 / 5%);
  padding: 12px 0;
  z-index: 20;
  margin-top: 8px;
  max-height: 360px;
  width: 100%;
  /* max-width: 332px; */
}
.head >>> .vs__dropdown-menu > * {
  transform: scale(1, 1);
  transition: transform ease 150ms;
  transform-origin: top;
  padding: 15.5px 24px;
  border-bottom: 1px solid #eef0f1;
  font-size: 16px;
  line-height: 24px;
  box-sizing: border-box;
  color: #2b2d2e;
  display: block;
  text-decoration: none;
  text-align: left;
  background: none;
}
.head >>> .vs__dropdown-menu > *:hover {
  font-weight: 600;
  color: #213a63;
}
.head >>> .vs__dropdown-toggle {
  height: 52px;
  border-radius: 20px;
  border: solid 1px #888 !important;
  padding: 10.5px 17.5px;
  box-sizing: border-box;
}
.head .search {
  border: 0.5px solid #ccc;
  border-radius: 20px;
  width: 100%;
  padding: 15px;
  height: 45px;
  font-size: 16px;
}
.head i {
  position: absolute;
  right: 3%;
  top: 13px;
  cursor: pointer;
}
.head i:hover {
  color: tomato;
}

.results h2 {
  color: darkblue;
  margin: 10px 0;
}
.small {
  color: grey;
  margin-top: 15px;
  font-size: 12px;
}
.border-header {
  margin-left: 0;
}
@media only screen and (max-width: 768px) {
  .md-search {
    bottom: 0;
  }
  .md-search >>> .md-dialog-container {
    width: 100%;
    background: #fff0;
  }
  .head {
    width: 100%;
  }
  .head .search {
    height: 35px;
  }
  .result-wrap {
    font-size: 12px;
    line-height: 20px;
  }
  .head .search {
    width: 100%;
  }
  .head i {
    right: 3%;
  }
  .section {
    font-size: 12px;
  }
  .section i {
    font-size: 11px;
    top: 8px;
    left: 5px;
  }
  .section >>> .md-ripple {
    padding-left: 20px !important;
    padding-right: 10px !important;
  }
  .filter-chip[data-v-7b8f28e3] {
    margin-top: 1em;
  }
}
@media only screen and (max-width: 568px) {
  .result-wrap {
    font-size: 8px;
    line-height: 15px;
  }
  .head i {
    top: 5px;
  }
  .search {
    height: 30px;
    font-size: 10px;
    padding: 10px;
  }
  .section {
    font-size: 8px;
    line-height: 22px;
    height: 20px;
  }
  .section i {
    font-size: 9px;
    top: 5px;
    left: 5px;
  }
  .section >>> .md-ripple {
    padding-left: 15px !important;
    padding-right: 7px !important;
  }
}
@media only screen and (max-width: 400px) {
  .small {
    font-size: 9px;
  }
  .search {
    height: 30px;
    font-size: 8px;
    padding: 10px;
  }
  .section {
    font-size: 5px;
    line-height: 13px;
    height: 13px;
  }
  .section i {
    font-size: 7px;
    top: 3px;
    left: 5px;
  }
  .section >>> .md-ripple {
    padding-left: 12px !important;
    padding-right: 6px !important;
  }
}
</style>
