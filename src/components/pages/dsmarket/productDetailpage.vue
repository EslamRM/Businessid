<template>
  <div>
    <dsNav></dsNav>
    <div class="container_padding">
      <breadcrumb v-if="dataIsLoaded" :product="product"></breadcrumb>
    </div>
    <div class="row_page-padd-cmn">
      <div class="prdct-det-page-bx page-padd-cmn">
        <div class="container container_padding">
          <!-- <ctPagination></ctPagination> -->
          <productDetailContent
            v-if="dataIsLoaded"
            :product="product"
            :similarProduct="similar"
          ></productDetailContent>
          <div class="loader" v-else>
            <div class="circle-loader" v-if="showLoader"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dsNav from "./dsmarketNav";
import { mapState } from "vuex";
import ctPagination from "../../ctcomponents/ctPagination";
import productDetailContent from "./productDetailContent";
import breadcrumb from "../dsmarket/breadCrumb";

export default {
  data() {
    return {
      dataIsLoaded: false,
      showLoader: false
    };
  },
  components: {
    ctPagination,
    dsNav,
    productDetailContent,
    breadcrumb
  },
  watch: {
    "$route.params.productId": function(productId) {
      this.loadProductandDetails();
    }
  },
  computed: {
    ...mapState({
      product: state => state.store.productDetails,
      similar: state => state.store.similarProducts
    })
  },
  methods: {
    loadProductandDetails() {
      this.dataIsLoaded = false;
      this.showLoader = true;
      const productId = atob(this.$route.params.productId);
      const data = {
        page: 1,
        productid: productId,
        product_type: "item"
      };
      this.$store.dispatch("similarProducts", data);
      this.$store
        .dispatch("productDetails", productId)

        .then(response => {
          this.showLoader = false;
          this.dataIsLoaded = true;
        })
        .catch(error => console.log(error));
    }
  },
  created() {
    this.loadProductandDetails();
  }
};
</script>
<style scoped>
.loader {
  position: relative;
  right: 25%;
  height: 60px;
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

.page-padd-cmn {
  padding-top: 20px;
  padding-bottom: 2.2em;
  float: left;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .container {
    max-width: 100%;
  }

  .page-padd-cmn {
    padding-top: 2.8em;
    padding-bottom: 5em;
  }
}

@media screen and (max-width: 768px) {
  .page-padd-cmn {
    padding-top: 0.2em;
    padding-bottom: 7.5em;
  }
  .row_page-padd-cmn {
    margin-left: -5px;
    margin-right: -5px;
  }
}

@media screen and (max-width: 300px) {
  .page-padd-cmn {
    padding-right: 40px;
    padding-bottom: 6.8em;
  }
  .company-type {
    width: 195px;
  }
}
</style>
