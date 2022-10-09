<template>
  <div>
    <div class="container">
      <div class="pt-20">
        <div class="ct-bread-crump p-0">
          <ul>
            <li><router-link to="#">Home</router-link></li>
            <li class="active">
              <router-link to="#">All Categories</router-link>
            </li>
          </ul>
        </div>
        <div v-if="categories">

         </div>

            <div v-else style="width:100%;margin:0px auto;">

            <Loader />

         </div>
        <div class="catListWrap">
          <!-- <ul class="catListWrapList">
            <li v-for="(category, index) in categories" :key="index">
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
                <md-button>
                  {{ category.categoryname }}
                </md-button>
              </router-link>
            </li>
          </ul> -->

          <div
            class="main-box"
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
            >
              {{ category.categoryname }}
            </router-link>
          </div>



          <!-- <table class="catListWrapList">
            <tr v-for="(category, index) in categories" :key="index" >
              <td class="anchor-wrap anchor1-wrap">
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
                <md-button>
                  {{ category.categoryname }}
                </md-button>
              </router-link>

              </td>
            </tr>

          </table> -->

          <div class="cgMain">
            <div
              class="item"
              v-for="(category, index) in categories"
              :key="index"
            >
              <h2 class="bigTitle">
                {{ category.categoryname }}
              </h2>
              <div class="subitemWrapper util-clearfix">
                <div class="subRow"  v-for="(sub_category, index) in category.categories"
                  :key="index">
                <div
                  class="subitem"

                >
                  <div class="subitemContWrapper">
                    <div class="head">
                      <router-link
                        :to="getUrl(category, sub_category, 'sub_category')"
                        >{{ sub_category.categoryname }}</router-link
                      ><span>({{ sub_category.categories.length }})</span>
                    </div>

                    <thirdCategory
                      :category="category"
                      :sub_category="sub_category"
                    />
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
</template>
<script>
import thirdCategory from "./third_category";
import { mapState } from "vuex";
import Loader from '../../ctcomponents/RoundedLoader'

export default {
  components: { thirdCategory,Loader },
  data() {
    return {
      showLess: true
    };
  },
  computed: {
    ...mapState({
      categories: state => state.dsmarket.AllCategories
    })
  },
  methods: {
    loadCategory() {
      this.$store.dispatch("loadDsmarketAllCategories");
    },
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
    }
  },

  created() {
    this.loadCategory();
  }
};
</script>
<style scoped>
.main-box {
  width: 23%;
  padding: 18px;
  margin-right: 10px;
  background-color: transparent;

  border: 1px solid #dbdbdb;
  cursor: pointer;
  margin-bottom: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 13px;
  line-height: 1.4;
      min-height: 75px;
}
.subRow{
 width: 48.5%;
    margin-right: 1.5%;
}
.main-box a {
  color: #213a63;
      width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.main-box:hover {
  background-color: #efefef;
}
.subitemContWrapper .main-wrapper {
  width: 33%;
  padding-right: 10px;
  padding-bottom: 20px;
  float: left;
}
.sub-cat-title {
  font-size: 15px;
}
.third-category-lists {
  width: 40%;
  float: left;
  padding-right: 10px;
}
.catListWrap {
  margin: 25px auto 30px;
  display: flex;
  flex-wrap: wrap;
}
/* .catListWrapList {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(247px, 1fr));
  grid-gap: 15px;
} */

.cgMain {
  background: #fff;
  width: 100%;
  margin-top: 3em;
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 6px;
}
.cgMain .item {
  position: relative;
  margin-top: 25px;
  border-bottom: 1px solid #e8e8e8;
}
.bigTitle {
  height: 21px;
  line-height: 20px;
  font-size: 20px;
  color: #191919;
  padding-right: 25px;
  background-color: #fff;
  margin-bottom: 19px;
  padding-left: 25px;
  font-weight: 500;
  position: relative;
}
.bigTitle a {
  /* color: #213a63; */
}
.subitemWrapper {
  margin-left: 36px;
      display: flex;
    flex-wrap: wrap;
}
.subitemContWrapper {
  margin-bottom: 25px;
  width: 100%;
  position: relative;
  display: inline-block;
}
.part ul {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(231px, 1fr));
  grid-gap: 3px;
}
.subitemContWrapper ul li {
  width: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  line-height: 18px;
  height: 18px;
}
.subitemContWrapper ul li a {
  font-size: 13px;
  width: 227px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #4a4a4a;
}
.activeCat button {
  background-color: rgb(225, 228, 235) !important;
}
.dividingTo {
  width: 100%;
}
.part {
  width: 49%;
  display: inline-block;
  margin-bottom: 2em;
}
.head {
  margin-bottom: 1.1em;
  font-weight: 600;
}
.head a {
  font-size: 15px;
  color: #213a63;
}
.head span {
  color: #939cb3;
  padding-left: 5px;
}
.anchor-wrap {
  width: 16.7%;
}
.catListWrapList td {
  height: 60px;
  position: relative;
  z-index: 1;
}
.catListWrapList td a {
  display: block;
  cursor: pointer;
  width: 100%;
  text-align: center;
}
.catListWrapList td .md-button {
  width: 100%;
  min-width: 100%;
  background-color: transparent;
  color: #213a63;
  border: 1px solid #dbdbdb;
  box-shadow: none;
  padding: 0;
}
table {
    border-collapse: collapse;
    width: 100%;
}
@media screen and (max-width: 768px) {
  .main-box {
    width: 31% !important;
  }
}
@media screen and (max-width: 500px) {
  .main-box {
    width: 100% !important;
  }
}
</style>
