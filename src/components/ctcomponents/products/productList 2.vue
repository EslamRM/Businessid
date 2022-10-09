<template>
  <!-- <div class="bravo-normal-offer"> -->
  <div style="width: 100%; padding: 15px !important; border-radius: 5px">
    <div class="row-columns">
      <router-link
        class="full-width"
        :to="{
          name: 'product-details',
          params: {
            product: slugName(product.name),
            productId: encodeProductId(product.productid),
          },
        }"
      >
        <div class="bravo-offer-image">
          <!-- <div class="place"></div> -->
          <div class="ctlistItem" v-if="product.images.length">
            <img
              :src="product.images[0].file"
              :alt="product.name"
              class="fitItem"
            />
          </div>
        </div>
        <div class="main-section contentWrapProduct">
          <span class="product-brand">{{ product.brand }}</span>
          <div class="product-name">{{ product.name }}</div>
          <div class="price-wrap">
            <div class="bravo-offer-moq">
              <span
                class="sellingCurrency"
                v-if="product.unitprice !== '0.00'"
                >{{ currencySymbol(100, product.currency)[0] }}</span
              >
              <span class="sellingPrice" v-if="product.offerprice > 0">
                {{ currencySymbol(product.offerprice, product.currency)[1] }}
              </span>
              <span
                class="quotationBased"
                v-else-if="product.unitprice == '0.00'"
              >
                Quotation Based
              </span>
              <span class="sellingPrice" v-else>
                {{ currencySymbol(product.unitprice, product.currency)[1] }}
              </span>
            </div>
            <div class="bravo-offer-moq offer" v-if="product.offerprice > 0">
              {{ currencySymbol(product.offerprice, product.currency)[0] }}
              <span class="offerPrice">{{
                currencySymbol(product.unitprice, product.currency)[1]
              }}</span>
            </div>
          </div>
          <div class="offer-discount" v-if="product.offerpercentage > 0">
            <span class="offer-discount-content"
              >{{ product.offerpercentage }}% OFF</span
            >
          </div>
        </div>
      </router-link>
      <div v-if="product.market_type == 'demand'">
        <div class="cartbtnBig">
          <md-button class="md-accent md-theme-default"
            >Send quotation</md-button
          >
        </div>
      </div>
      <div v-else>
        <div class="cartbtnBig" v-if="product.unitprice > 0">
          <md-button
            v-if="addedToCart"
            disabled
            class="md-accent md-theme-default"
            >Adding To Cart...</md-button
          >
          <md-button
            v-else
            class="md-accent md-theme-default"
            @click="addToCart(product)"
            >Add To Cart</md-button
          >
        </div>
        <div class="cartbtnBig" v-else>
          <router-link
            :to="{
              name: 'qutationForm',
              params: {
                productId: product.productid,
              },
            }"
            tag="span"
          >
            <md-button class="md-accent md-theme-default">
              Ask for quotation
            </md-button>
          </router-link>
        </div>
      </div>
      <md-snackbar
        class="snack-bar"
        :md-position="position"
        :md-active.sync="showSnackbar"
        >{{ productName }} is added to Cart</md-snackbar
      >
    </div>
  </div>
</template>
<script>
import VLazyImage from "v-lazy-image";
export default {
  name: "ProductList",
  props: ["product"],
  components: { VLazyImage },
  data () {
    return {
      showSnackbar: false,
      position: "left",
      productName: "",
      addedToCart: false,
      askForQuotation: "/qutationForm"
    };
  },
  computed: {
    slugName () {
      return name => this.$helpers.slugify(name);
    },
    name () {
      return this.$route.params.name;
    },
    id () {
      return this.$route.params.id;
    },
    encodeProductId () {
      return productId => btoa(productId);
    }
  },
  methods: {
    gotoDetails (products) {
      const id = this.$route.params.id;
      const name = this.$route.params.name;
      const product = this.$helpers.slugify(products.name);
      const data = {
        details: products
      };
      this.$store.dispatch("detailsPage", data);
      this.$router.push({
        name: "product-details",
        params: { name, id, product }
      }); // -> /user/123
    },
    addToCart (product) {
      const token = localStorage.getItem("token");
      if (token) {
        this.addedToCart = true;
        const data = {
          productid: product.productid,
          quantity: "1"
        };
        this.$store
          .dispatch("AddToCart", data)
          .then(response => {
            if (response.data.success == true) {
              this.addedToCart = false;
              this.showSnackbar = true;
              this.productName = product.name;
            }
          })
          .catch(error => console.log(error));
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style scoped>
/* Abhishek */
/* Capitalize Snack Bar Content */
.snack-bar {
  text-transform: capitalize;
}
.listactiveBox .offer-item .full-width {
  display: flex;
}

.listactiveBox .offer-item .cartbtn {
  align-items: center;
  justify-content: center;
  animation-fill-mode: d;
  display: inline-flex;
}
.listactiveBox .offer-item .row-columns {
  display: block;
}
.listactiveBox .offer-item .cartbtnBig {
  text-align: right;
}
.listactiveBox .cartbtnBig button {
  width: 57%;
}
.bravo-offer-moq span.sellingPrice {
  font-weight: bold;
  color: #222;
}
.bravo-offer-moq span.quotationBased {
  /* font-weight: bold; */
  color: #9399ab;
}
.bravo-offer-moq .sellingCurrency {
  color: #9399ab;
  font-size: 13px;
}
.bravo-offer-moq .offerPrice {
  font-weight: normal;
}
.bravo-offer-moq span {
  font-size: 16px;
  font-weight: normal;
}
.product-brand {
  text-transform: capitalize;
  font-size: 1.23rem;
  color: #6d6d6d;
  line-height: 16px;
  font-weight: 500;
  /* width: calc(100% - 30px); */
  text-overflow: ellipsis;
  white-space: nowrap;
  /* overflow: hidden; */
  display: inline-block;
}
.product-name {
  font-size: 1.26rem;
  line-height: 16px;
  color: #222222;
  margin: 2.1px 0;
  text-transform: capitalize;
}
.price-wrap {
  margin-top: 7px;
}
.bravo-offer-moq.offer {
  font-size: 10px;
  display: inline-flex;
  align-items: center;
  text-decoration: line-through;
  color: rgb(34, 34, 34, 0.55);
}
.bravo-offer-moq.offer .offerPrice {
  font-size: 10px;
  padding-left: 2px;
}

.product-wrap {
  cursor: pointer;
}
.cartbtnBig button {
  border: none;
  height: 33px;
  width: 100%;
  margin-top: 0.5em;
  color: rgba(255, 87, 34, 0.65) !important;
  background: rgba(255, 87, 34, 0.1);
}
.image__wrapper {
  position: relative;
}

.loading {
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background-image: -webkit-linear-gradient(
    left,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-image: linear-gradient(
    left,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 175px;
  height: 175px;
  position: absolute;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  z-index: 1;
}
@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}
.image__wrapper.loaded .loading {
  opacity: 0;
  display: none;
}
@media screen and (max-width: 768px) {
  .cartbtnBig button {
    margin-left: 0px;
    margin-right: 0px;
    font-size: 13px;
  }
  .snack-bar {
    bottom: 40px;
  }
}
</style>
