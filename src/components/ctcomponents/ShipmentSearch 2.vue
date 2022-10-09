<template>
  <div>
    <div class="searchFilterWrap" @focusout="handleFocusOut">
      <img src="./products/search.png" />
      <input
        v-on:blur="handleBlur"
        v-model="txtSearch"
        @input="searchCategory"
        placeholder="Search By Area / Amount"
        class="searchFilter"
        @keydown.enter="enter"
        @keydown.down="down"
        @keydown.up="up"
      />
    </div>

    <div id="result" v-if="showResult" class="auto-scrol-bx">
      <ul v-if="items.length">
        <li
          v-for="(item, i) in items"
          :key="i"
          @click="clickCategory(item)"
          :class="{ 'is-active': i === arrowCounter }"
        >
          <div class="w-100 d-flex align-center">
            <div class="d-inline-block addressShown">
              <span
                ><i class="md-icon icoWrap">attach_money</i>
                {{ item.amount }}</span
              >
              <span
                ><i class="md-icon icoWrap">location_on</i>
                {{ item.city }}</span
              >
              <span
                ><i class="md-icon icoWrap">access_time</i>
                {{ item.estimated_time + "" + item.estimated_unit }}</span
              >
            </div>
          </div>
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
      arrowCounter: 0,
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
  //   watch: {
  //       'txtSearch':function () {
  //           console.log(this.txtSearch)
  //          if(this.txtSearch=="")
  //          {
  //              this.items=[];
  //              this.showResult=false;
  //          }
  //       }
  //   },
  methods: {
    handleBlur () {
      //  this.txtSearch="";
      //  this.showResult = false;
    },
    searchCategory () {
      const name = this.txtSearch;

      if (name === "") {
        this.txtSearch = "";

        this.showResult = false;
        this.items = [];
      } else {
        this.$store
          .dispatch("getProductShipping", name)
          .then(response => {
            console.log(response);
            if (response.success == true) {
              this.showResult = true;
              this.items = response.result;
            }
          })
          .catch(error => console.log(error));
      }
    },
    clickCategory (name) {
      const { amount, city, estimated_time, estimated_unit } = name;
      this.txtSearch =
        " Delivery Charge : " +
        amount +
        " | City : " +
        city +
        " | Estimated Time : " +
        estimated_time +
        "" +
        estimated_unit;
      this.$emit("onClickSearch", name);
      this.showResult = false;
    },
    enter () {
      const { amount, city, estimated_time, estimated_unit } = this.items[
        this.arrowCounter
      ];
      this.txtSearch =
        " Delivery Charge : " +
        amount +
        " | City :" +
        city +
        " | Estimated Time :" +
        estimated_time +
        "" +
        estimated_unit;
      this.$emit("onClickSearch", this.items[this.arrowCounter]);
      this.showResult = false;
    },

    //When up pressed while suggestions are open
    up (e) {
      e.preventDefault();
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },

    //When up pressed while suggestions are open
    down (e) {
      e.preventDefault();
      console.log("object");
      if (this.arrowCounter < this.items.length - 1)
        this.arrowCounter = this.arrowCounter + 1;
    },
    handleFocusOut () {
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
  position: absolute;
  z-index: 2;
  /* margin: 0px auto; */
  margin-left: 8px;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
#result ul li {
  padding: 8px 0px;
  display: inline-flex;
  align-items: center;
  text-transform: capitalize;
  padding-left: 10px;
  width: 100%;
  font-size: 13px;
  line-height: 1.3;
}
#result ul li.is-active,
#result ul li:hover {
  background-color: #d2d2d2;
  cursor: pointer;
  font-weight: 600;
}
#result ul li:hover .icoWrap {
  font-weight: 500;
}
.icoWrap {
  width: 25px;
  height: 25px;
  display: inline-flex;
}
.icoWrap {
  margin: 0;
  color: #ff5722;
}
.addressShown {
  max-width: 100%;
  width: calc(100% - 25px);
}
</style>
