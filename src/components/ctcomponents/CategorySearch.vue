<template>
  <div>
    <div class="searchFilterWrap">
      <i class="material-icons">search</i>

      <input
        v-model="txtSearch"
        @input="searchCategory"
        placeholder="Search By Category"
        class="searchFilter"
        @keydown.enter.prevent="enter"
        @keydown.down="down"
        @keydown.up="up"
      />
    </div>

    <div id="result" v-if="showResult" class="auto-scrol-bx">
      <ul v-if="items.length">
        <li
          :class="{ 'is-active': i === arrowCounter }"
          v-for="(item, i) in items"
          :key="item.category_id"
          @click="clickCategory(item.category_id, item.categoryname)"
        >
          {{ item.categoryname }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import ClickOutside from "vue-click-outside";
import { mapState } from "vuex";
import axios from "axios";
import debounce from "lodash.debounce";
import uniqby from "lodash.uniqby";
import map from "lodash.map";
export default {
  props: ["clearText"],
  name: "Search",
  data() {
    return {
      urlSearchValue: "",
      txtSearch: "",
      modelName: "",
      showResult: false,
      items: [],
      arrowCounter: 0,
      autocompleteItems: []
    };
  },
  watch: {
    isSubmitted: function(to, from) {
      console.log(to);
      if (to == true) {
        this.txtSearch = "";
      }
    }
  },
  computed: {
    ...mapState({
      items: state => state.store.AutoCompleteItems
    })
  },
  watch: {
    txtSearch: function() {
      console.log(this.txtSearch);
      if (this.txtSearch == "") {
        this.items = [];
        this.showResult = false;
      }
    },
    clearText: function(to, from) {
      if (to == true) {
        this.txtSearch = "";
      }
    }
  },
  methods: {
    hide() {
      this.showResult = false;
      this.txtSearch = "";
      this.showResult = false;
    },
    searchCategory() {
      const name = this.txtSearch;

      if (name === "") {
        this.txtSearch = "";

        this.showResult = false;
        this.items = [];
      } else {
        this.$store
          .dispatch("SearchCategory", name)
          .then(response => {
            if (response.success == true) {
              this.showResult = true;
              this.items = response.categories;
            }
          })
          .catch(error => console.log(error));
      }
    },

    clickCategory(id, name) {
      this.txtSearch = name;
      this.$emit("onClickSearch", id, name);
      this.showResult = false;
    },
    handleFocusOut() {
      this.showResult = false;
    },
    enter() {
      this.txtSearch = this.items[this.arrowCounter].categoryname;
      const id = this.items[this.arrowCounter].category_id;
      this.$emit("onClickSearch", id, this.txtSearch);

      this.showResult = false;
      this.arrowCounter = -1;
    },

    //When up pressed while suggestions are open
    up(e) {
      e.preventDefault();
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },

    //When up pressed while suggestions are open
    down(e) {
      e.preventDefault();
      console.log("object");
      if (this.arrowCounter < this.items.length - 1)
        this.arrowCounter = this.arrowCounter + 1;
    }
  },
  directives: {
    ClickOutside
  },
  created() {
    (this.txtSearch = this.search), (this.modelName = this.model);
  }
};
</script>
<style scoped>
.searchbtn {
  border: none;
  background-color: #fe5722;
  color: #f7f7f7;
  font-weight: 600;
  line-height: 23px;
  margin-left: -1px;
}
.searchFilter {
  margin: 0px auto;
  width: 100%;
}
.searchFilterWrap {
  padding: 0px 8px;
  /* margin-bottom:15px */
}
#result {
  margin: 0px auto;
  background-color: #fff;
  width: 93%;
  /* position: absolute; */
  z-index: 2;
  /* margin: 0px auto; */
  margin-left: 8px;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
#result ul li {
  padding: 8px 0px;
  text-transform: capitalize;
  padding-left: 10px;
}
#result ul li.is-active,
#result ul li:hover {
  background-color: #d2d2d2;
  cursor: pointer;
  font-weight: 600;
}

@media screen and (max-width: 768px) {
  .searchFilterWrap {
    padding: 0px 0px !important;
  }
  .searchFilter {
    padding-left: 30px !important;
  }

  .drawer .searchFilter {
    padding-left: 30px !important;
  }
}
</style>
