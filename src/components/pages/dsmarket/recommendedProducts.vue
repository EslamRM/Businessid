<template>
  <div class="rc-bx-tp-1">
    <div class="category-heading recBox">
      <h2>
        <span>Related Products</span>
      </h2>
    </div>
    <div class="sliderType2 padd">
      <carousel
        :perPage="6"
        :autoplay="false"
        :autoplayHoverPause="true"
        :paginationSize="0"
        paginationActiveColor="#bf1d2e"
        paginationColor="#213a63"
        easing="linear"
        :loop="true"
        :navigationEnabled="true"
        navigationNextLabel="<i class='material-icons btn-st-1'>keyboard_arrow_right</i>"
        navigationPrevLabel="<i class='material-icons btn-st-1'>keyboard_arrow_left</i>"
      >
        <slide v-for="(newProduct, index) in similarProduct" :key="index">
          <div class="sldr-cnt-bx">
            <div class="imageHolder">
              <div class="bravo-offer-image">
                <div class="place"></div>

                <router-link
                  class="product-link"
                  :to="{
                    name: 'product-details',
                    params: {
                      product: slugName(newProduct.name),
                      productId: encodeProductId(newProduct.productid),
                    },
                  }"
                >
                  {{
                    newProduct.type === "item"
                      ? newProduct.variations.colors[0].files[0]
                      : newProduct.images[0].file
                  }}
                  <div class="offer-image">
                    <img
                      class="inner-img"
                      :src="
                        newProduct.type === 'item'
                          ? newProduct.variations.colors[0].files[0]
                          : newProduct.images[0].file
                      "
                      :alt="
                        newProduct.type === 'item'
                          ? newProduct.variations.colors[0].files[0]
                          : newProduct.images[0].file
                      "
                    />
                  </div>
                </router-link>
              </div>
              <div class="main-section contentWrapProduct">
                <span class="product-brand">{{ newProduct.brand }}</span>
                <div class="product-name">{{ newProduct.name }}</div>
                <div class="price-wrap">
                  <div class="bravo-offer-moq">
                    <span class="sellingCurrency">{{
                      currencySymbol(100, newProduct.currency)[0]
                    }}</span>
                    <span
                      class="sellingPrice"
                      v-if="
                        newProduct.type === 'item'
                          ? newProduct.variations.colors[0].sizes[0]
                              .offerprice > 0
                          : newProduct.offerprice > 0
                      "
                    >
                      {{
                        currencySymbol(
                          newProduct.type === "item"
                            ? newProduct.variations.colors[0].sizes[0]
                                .offerprice
                            : newProduct.offerprice,
                          newProduct.currency
                        )[1]
                      }}
                    </span>
                    <span class="sellingPrice" v-else>
                      {{
                        currencySymbol(
                          newProduct.type === "item"
                            ? newProduct.variations.colors[0].sizes[0].price
                            : newProduct.price,
                          newProduct.currency
                        )[1]
                      }}
                    </span>
                  </div>
                  <div
                    class="bravo-offer-moq offer"
                    v-if="
                      newProduct.type === 'item'
                        ? newProduct.variations.colors[0].sizes[0].offerprice >
                          0
                        : newProduct.offerprice > 0
                    "
                  >
                    {{ currencySymbol(100, newProduct.currency)[0] }}
                    <span class="offerPrice">{{
                      currencySymbol(
                        newProduct.type === "item"
                          ? newProduct.variations.colors[0].sizes[0].offerprice
                          : newProduct.offerprice,
                        newProduct.currency
                      )[1]
                    }}</span>
                  </div>
                </div>
                <div
                  class="offer-discount"
                  v-if="newProduct.offerpercentage > 0"
                >
                  <span class="offer-discount-content"
                    >{{ newProduct.offerpercentage }}% OFF</span
                  >
                </div>
              </div>
              <md-button class="md-accent btnRedOutline">
                <router-link
                  :to="{
                    name: 'qutationForm',
                    params: {
                      productId: newProduct.productid,
                    },
                  }"
                  tag="span"
                  >Ask for quotation</router-link
                >
              </md-button>
              <!-- <md-button class="md-accent btnRedOutline">Ask For Quotation</md-button> -->
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  components: {},
  props: ["similarProduct"],
  data() {
    return {};
  },
  components: {
    Carousel,
    Slide,
  },
  computed: {
    slugName() {
      return (name) => this.$helpers.slugify(name);
    },

    encodeProductId() {
      return (productId) => btoa(productId);
    },
  },
};
</script>
<style scoped>
.sldr-cnt-bx .md-raised {
  height: 25px;
  font-size: 12px;
  margin-top: 20px;
  font-weight: 600;
}
.bravo-offer-moq .sellingCurrency {
  color: #7e818a;
  font-size: 13px;
}
.bravo-offer-moq .offerPrice {
  font-weight: normal;
}
.bravo-offer-moq span {
  font-size: 16px;
}
.product-brand {
  text-transform: capitalize;
  font-size: 11px;
  color: #7e808c;
  line-height: 16px;
  font-weight: 500;
  /* width: calc(100% - 30px); */
  text-overflow: ellipsis;
  white-space: nowrap;
  /* overflow: hidden; */
  display: inline-block;
}
.product-name {
  font-size: 13px;
  color: #272c3f;
  margin-bottom: 1px;
  text-transform: capitalize;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 171px;
  line-height: 1.3;
}
.price-wrap {
  margin-top: 5px;
}
.bravo-offer-moq.offer {
  font-size: 10px;
  margin-top: 1px;
  text-decoration: line-through;
  color: #a8abb2;
}
.bravo-offer-moq.offer .offerPrice {
  font-size: 10px;
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
.btn-st-1 {
  background: #213a63;
  color: #fff;
  font-size: 29px;
}
.recBox {
  padding: 7px;
  margin: 15px 0;
  padding-left: 25px;
  padding-top: 15px;
  padding-bottom: 10px;
}
.imageHolder {
  width: 100%;
  padding: 7px;
}
.btnRedOutline {
  height: 31px;

  border: none;

  color: rgba(255, 87, 34, 0.65) !important;
  background: rgba(255, 87, 34, 0.1);
}
.contentWrapProduct {
  min-height: 85px;
}
.inner-img {
  position: absolute;
  left: 0;
  margin: 0 auto;
  max-height: 100%;
  right: 0;
  bottom: 0;
}
.sliderType2.padd {
  padding: 0px 19px;
}
.sliderType2 .btn-st-1 {
  background: #fff;
  color: #111111;
  font-size: 29px;
}

@media screen and (max-width: 600px) {
  .recBox {
    padding-left: 15px;
    padding-bottom: 10px;
    padding-top: 5px;
  }
  .recBox span {
    font-size: 13px;
  }

  .btnRedOutline {
    margin-left: 0px;
  }
  .sliderType2.padd {
    padding: 0px 10px;
  }
  .bravo-offer-moq span {
    font-size: 14px;
  }

  .category-heading > h2 span {
    background: #fff;
    font-weight: 500;
  }

  .sellingPrice {
    color: #545766 !important;
  }
}
</style>
