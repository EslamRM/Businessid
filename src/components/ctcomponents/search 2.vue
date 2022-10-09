<template>
  <div class="search-wrap">
    <div class="searchFilterWrap">
      <input
        v-model="txtSearch"
        v-on:keyup="searchProduct"
        placeholder="Search Product"
        class="searchFilter"
      />
      <!-- <button class="md-button md-theme-default searchbtn" @click="searchData">Search</button> -->
    </div>

    <div id="result" v-if="showResult" class="auto-scrol-bx">
      <ul v-if="items.length > 0">
        <li
          v-for="item in items"
          :key="item.productid"
          @click="searchData(item.name)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["model", "search"],
  name: "Search",
  data () {
    return {
      urlSearchValue: "",
      txtSearch: "",
      modelName: "",
      showResult: false,
      items: []
    };
  },
  computed: {
    // ...mapState({
    //   items: state => state.store.AutoCompleteItems
    // })
  },
  methods: {
    searchProduct () {
      if (this.txtSearch.length) {
        const data = {
          search: this.txtSearch,
          page: 1
        };
        this.$store
          .dispatch("SearchProduct", data)
          .then(response => {
            this.showResult = true;

            if (response.data.success == true) {
              this.items = response.data.products;
            } else if (response.data.success == false) {
              this.items = [];
            }
          })
          .catch(error => console.log(error));
      } else {
        this.showResult = false;
      }
    },
    searchData (name) {
      this.txtSearch = name;
      this.$emit("onSearch", name);
      this.showResult = false;
    }
  },

  created () {
    (this.txtSearch = this.search), (this.modelName = this.model);
  }
};
</script>
<style scoped>
.searchbtn {
  height: 26px !important;
  font-size: 11px;
  left: 3px;
  right: 0;
  min-width: 150px;
  font-weight: 600;
  color: rgb(254, 87, 34) !important;
  /* background-color: rgba(254, 87, 34,0.12);
    text-transform: capitalize; */
}

#result {
  margin: 0px auto;
  background-color: #fff;
  width: 93%;
  position: absolute;
  z-index: 2;
  /* margin: 0px auto; */
  margin-left: 8px;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
#result ul {
  /* padding: 0px 12px; */
}
#result ul li {
  padding: 8px 0px;

  text-transform: capitalize;
  padding-left: 10px;
}
#result ul li:hover {
  background-color: #fe5722;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
}
.searchFilter {
  width: 96%;
  padding-left: 0.55em;
}
.searchFilterWrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  margin-top: 18px;
}
</style>
