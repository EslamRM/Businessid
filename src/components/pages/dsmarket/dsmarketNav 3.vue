<template>
  <div>
    <div
      :class="page == 'dragon-mart' || page == 'rakez' ? '' : 'ds-mr-nav-main'"
    >
      <div class="container padding_mob">
        <div class="scroll_dsmarketnav">
          <!-- if page is dragon mart -->
          <div v-if="page == 'dragon-mart'" class="storeOperator">
            <router-link to="dsmarket/dragon-mart">
              <figure>
                <img
                  src="../../../components/featureLogo/dragon.png"
                  class="fitItem"
                />
              </figure>
            </router-link>

            <Search @onSearch="SearchData" />
          </div>
          <div v-else-if="page == 'rakez'" class="storeOperator">
            <router-link to="dsmarket/rakez">
              <figure>
                <img
                  src="../../../components/featureLogo/rakez.png"
                  class="fitItem"
                />
              </figure>
            </router-link>

            <Search @onSearch="SearchData" />
          </div>
          <!-- condition ends -->

          <div v-else>
            <router-link to="/store" active-class="active" exact>
              <md-button class="md-primary">Products</md-button>
            </router-link>

            <router-link to="/autos" active-class="active" exact>
              <md-button class="md-primary">Autos</md-button>
            </router-link>
            <router-link to="/properties" active-class="active" exact>
              <md-button class="md-primary">Properties</md-button>
            </router-link>

            <router-link to="/services" active-class="active" exact>
              <md-button class="md-primary">Services</md-button>
            </router-link>

            <router-link to="/services" active-class="active" exact>
              <md-button class="md-primary">Foods</md-button>
            </router-link>
            <!-- <router-link to="/propertiesforsale" active-class="active" exact>
          <md-button class="md-primary">Item for sale</md-button>
        </router-link>
        <router-link to="/propertiesforrent" active-class="active" exact>
          <md-button class="md-primary">Item for rent</md-button>
        </router-link> 
         
          <router-link
            v-if="page != 'dragon-mart' || page != 'rakez'"
            to="/exports"
            active-class="active"
            exact
          >
            <md-button class="md-primary">Exports</md-button>
          </router-link>
          <router-link
            v-if="page != 'dragon-mart' || page != 'rakez'"
            to="/imports"
            active-class="active"
            exact
          >
            <md-button class="md-primary">Imports</md-button>
          </router-link>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from "../../ctcomponents/search";
export default {
  props: ["page"],
  components: { Search },
  methods: {
    SearchData() {}
  }
};
</script>
<style scoped>
.scroll_dsmarketnav {
  overflow-x: auto;
  white-space: nowrap;
  max-width: 100%;
}
.padding_mob {
  padding-left: 10px;
  padding-right: 10px;
}
.active .md-button {
  background: #f5843b !important;
}
.ds-mr-nav-main.market {
  background: red !important;
}
.storeOperator {
  border: 1px solid #eee;
  border-radius: 0px 0px 11px 11px;
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.1);
  border-top: 0;
  margin-bottom: 0.77em;
  display: flex;
  justify-content: space-between;
  padding: 5px 9px;
}
.storeOperator figure {
  width: 130px;
  min-width: 130px;
  height: 63px;
  margin: auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  vertical-align: middle;
  position: relative;
}
.searchFilterWrap {
  max-width: 421px;
  padding: 0;
}
.searchFilter {
  width: 96%;
  padding-left: 0.55em;
}

.home-category-info-header .vw-all-tp-1 .md-button {
  height: 35px;
}

.home-category-info-tab-word-content-res h3 {
  font-size: 13px;
}
.home-category-info-header-line {
  display: none;
}

@media screen and (max-width: 300px) {

.padding_mob{
    padding-right: 50px;
}

}
</style>
