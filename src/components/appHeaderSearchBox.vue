<template>
  <!-- <v-select
    class="search-input"
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
  <div class="main-div">
    <div class="head">
      <input
        type="search"
        v-model="keyword"
        class="search"
        @input="search()"
        @blur="isfocus = false"
        @focus="isfocus = true"
        v-on:keyup.enter="searchResult(keyword)"
      /><i class="material-icons" @click="searchResult(keyword)">
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
            @click="keyword = result"
          >
            <a>{{ result }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import debounce from "lodash.debounce";
import axios from "axios";
export default {
  name: "AutocompleteBox",
  components: {
    vSelect
  },
  data: () => ({
    optionfilter: [],
    showSearch: false,
    inline: null,
    isFocused: false,
    companies: [],
    selectedCompany: null,
    results: [],
    users: [],
    keyword: "",
    resultsLength: 0,
    page: 1
  }),
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
    searchCategory() {
      this.isFocused = true;
    },
    handleBlur() {
      this.isFocused = false;
    },
    companySearch(search, loading) {
      loading(true);

      if (search.length < 2) {
        loading(false);
        return;
      }
      this.search(loading, search, this);
    },
    search: debounce(async (loading, search, vm, object, api) => {
      try {
        const res = await axios.post("/api_company_suggestion", {
          name: search
        });
        const { success, users } = await res.data;
        if (success) {
          vm.companies = users;
          loading(false);
          return;
        } else {
          loading(false);
          return;
        }
      } catch (error) {
        console.log(error);
        loading(false);
        return;
      }
    }, 400),
    goToCompanyProfile(op) {
      this.$router.push(`/profiletimeline/${op.trade_name_en}/${op.id}`);
      this.selectedCompany = null;
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
            console.log(this.keyword, response.data);
            this.results = response.data.products.products;
            this.users = response.data.products.users;
            this.resultsLength =
              this.results.length + Object.keys(this.users).length;
            this.optionfilter = [];
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
            console.log(this.optionfilter);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    searchResult(word) {
      this.$router.push({ path: "/searchresults", query: { keyword: word } });
      this.keyword = "";
      this.showSearch = false;
    }
  }
};
</script>

<style scoped>
.head {
  position: relative;
}
.head .search {
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 100%;
  padding: 10px;
}
.head .search:focus {
  border: 1px solid tomato;
}
.head i {
  position: absolute;
  right: 3%;
  top: 10px;
  cursor: pointer;
  font-size: 22px;
  color: #888;
}
.head i:hover {
  color: tomato;
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
  font-size: 16px;
}
.head .options li {
  padding: 10px;
}
.head .options li a:hover {
  color: tomato;
  cursor: pointer;
}
/* Search Bar CSS */
.search-input {
  /* width: 450px; */
  width: 200px;
}
.searchAll {
  width: 45px;
  height: 41px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}
.searchAll:hover {
  background: #ebf5ff;
}
.searchAll i {
  color: tomato;
  font-size: 24px;
}
.vs__actions {
  display: flex;
  align-items: center;
  padding: 0px 6px 0 3px;
  background-color: #c6cad9;
}
.vs--open .vs__open-indicator {
  transform: none;
}

.vs__dropdown-toggle {
  padding: 0px;
}

.search-icon {
  color: #ff5722;
  cursor: pointer;
}
@media only screen and (max-width: 768px) {
  .md-search {
    bottom: 0;
  }
  .md-search >>> .md-dialog-container {
    width: 100%;
    background: #fff0;
  }
  .head .search {
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 100%;
    padding: 5px;
  }
  .head i {
    position: absolute;
    right: 3%;
    top: 6px;
    cursor: pointer;
    font-size: 22px;
    color: #888;
  }
}
@media only screen and (max-width: 600px) {
  .search-input {
    width: 100%;
  }
  .head .search {
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 100%;
    padding: 5px;
  }
  .head i {
    position: absolute;
    top: 8px;
    cursor: pointer;
    font-size: 18px;
    color: #888;
  }
}
@media only screen and (max-width: 400px) {
  .search-input {
    width: 100%;
  }
  .head .search {
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 100%;
    padding: 5px;
  }
  .head i {
    position: absolute;
    top: 8px;
    cursor: pointer;
    font-size: 18px;
    color: #888;
  }
}
@media only screen and (max-width: 300px) {
  .head .search {
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 100%;
    padding: 5px;
  }
  .head i {
    position: absolute;
    top: 8px;
    cursor: pointer;
    font-size: 18px;
    color: #888;
  }
}
</style>
