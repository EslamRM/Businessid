<template>
  <div>
    <div class="container">
      <div class="">
        <div class="favorites mt-5">
          <div class="headerTitle">
            <h2>Favorite Items</h2>
          </div>
          <div
            v-infinite-scroll="loadMore"
            :infinite-scroll-listen-for-event="true"
            infinite-scroll-immediate-check="false"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="1500"
          >
            <div :class="{ listactiveBox: gridActivated }">
              <div class="list-wrapper mt-5">
                <div class="listItemShow">
                  <div
                    class="offer-item"
                    v-for="(product, index) in products"
                    :key="product.id"
                  >
                    <ProductList :product="product" />
                  </div>
                </div>
              </div>
              <div v-if="showImage" class="image-wrap mt-5">
                <h2 class="nodata">NO Items FOUND</h2>
                <img
                  class="no-data-img"
                  src="../../../assets/images/data.png"
                />
              </div>
              <div class="loader">
                <div class="circle-loader" v-if="showLoader"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductList from "../../ctcomponents/products/productList.vue";
export default {
  name: "favorites",
  data() {
    return {
      // products: null,
      gridActivated: false,
      listActivated: true,
      listactive: false,
      showArea: false,
      busy: false,
      showLoader: true,
      initialLoad: true,
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
      }
    };
  },
  components: {
    ProductList
  },
  methods: {
    callToList() {
      this.listActivated = !this.listActivated;
      this.gridActivated = !this.gridActivated;
      this.listactive = !this.listactive;
    },
    loadMore() {
      this.filters.page++;
      this.showImage = false;
      this.showLoader = true;

      this.busy = true;

      // if (this.$route.params.id) {
      //   const id = this.$route.params.id;
      //   this.filters.profileid = id;
      // }
      var data = { ...this.filters };
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
    }
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    }
  },
  created() {
    this.loadMore();
  }
};
</script>
<style>
.favorites .listItemShow .offer-item i {
  color: #ffd04a !important;
  font-size: 26px !important;
}
.headerTitle {
  background: #fff;
  display: flex;
  align-items: left;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  border: 1px solid #eee;
  border-radius: 15px;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 5%);
}
.listItemShow {
  grid-gap: 17px !important;
  grid-template-columns: repeat(auto-fill, minmax(221px, 1fr));
}
.favorites .offer-item {
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}
.listactiveBox .listItemShow {
  grid-template-columns: repeat(2, 1fr);
}
@media screen and (max-width: 600px) {
  .listItemShow {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(143px, 1fr));
  }
}
</style>
