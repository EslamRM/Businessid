<template>
  <div v-if="results.length !== 0">
    <router-view></router-view>
    <div class="products-results mt-5">
      <div class="list-wrapper">
        <div class="listItemShow">
          <div
            data-v-eb306cea=""
            class="offer-item"
            v-for="(result, index) in results"
            :key="result.file"
          >
            <div
              data-v-6c39182c=""
              data-v-eb306cea=""
              style="width: 100%; padding: 15px !important; border-radius: 5px"
            >
              <div data-v-6c39182c="" class="row-columns">
                <a
                  data-v-6c39182c=""
                  @click="Getroute(result)"
                  style="cursor:pointer;"
                  class="full-width"
                  ><div data-v-6c39182c="" class="bravo-offer-image">
                    <div data-v-6c39182c="" class="ctlistItem">
                      <img
                        v-if="result.file"
                        class="inner-img smallCarousel"
                        :src="result.file"
                      />
                      <img
                        v-else
                        class="inner-img smallCarousel"
                        :src="result.variations.colors[0].files[0]"
                      />
                    </div>
                  </div>
                  <div
                    data-v-6c39182c=""
                    class="main-section contentWrapProduct"
                  >
                    <span
                      data-v-6c39182c=""
                      class="product-brand"
                      v-if="result.brand.length > 1"
                      >{{ result.brand }}</span
                    >
                    <span data-v-6c39182c="" class="product-brand" v-else>{{
                      result.type
                    }}</span>
                    <div data-v-6c39182c="" class="product-name">
                      {{ result.name.slice(0, 25) }}
                    </div>
                    <div data-v-6c39182c="" class="price-wrap">
                      <div data-v-6c39182c="" class="bravo-offer-moq">
                        <span data-v-6c39182c="" class="sellingCurrency">{{
                          result.currency
                        }}</span>
                        <span data-v-6c39182c="" class="sellingPrice">
                          {{ result.unitprice }}
                        </span>
                      </div>
                      <div data-v-6c39182c="" class="bravo-offer-moq offer">
                        {{ result.currency }}
                        <span data-v-6c39182c="" class="offerPrice">{{
                          result.offerprice
                        }}</span>
                      </div>
                    </div>
                    <!---->
                  </div></a
                >
                <div data-v-6c39182c="">
                  <div data-v-6c39182c="" class="cartbtnBig">
                    <button
                      data-v-6c39182c=""
                      type="button"
                      class="md-button md-accent md-theme-default md-theme-default"
                    >
                      <div class="md-ripple">
                        <div class="md-button-content">
                          <a @click="Getroute(result)">See Details</a>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="notFound">
    No Items Found
  </div>
</template>
<script>
export default {
  name: "productsResults",
  props: ["results", "keyword"],
  computed: {
    slugName() {
      return name => this.$helpers.slugify(name);
    },
    id() {
      return this.$route.params.id;
    },
    encodeProductId() {
      return productId => btoa(productId);
    }
  },
  methods: {
    Getroute(result) {
      if (result.type == "item") {
        this.$router.push(
          "/product-details/" +
            this.slugName(result.name) +
            "/" +
            this.encodeProductId(result.pk_product_id)
        );
      } else if (result.type == "property") {
        this.$router.push(
          "/property-detail/" +
            this.slugName(result.name) +
            "/" +
            this.encodeProductId(result.pk_product_id)
        );
      } else {
        this.$router.push(
          "/auto-details/" +
            this.slugName(result.name) +
            "/" +
            this.encodeProductId(result.pk_product_id)
        );
      }
    }
  }
};
</script>
<style>
.notFound {
  display: flex;
  font-size: 24px;
  color: tomato;
  justify-content: center;
  align-items: center;
}
.ctlistItem img.fitItem {
  height: 125px;
}
.inner-img.smallCarousel {
  width: 100%;
}
.offer-item {
  width: 100%;
  background: #fff;
  -webkit-box-shadow: 0 2px 8px 0 rgb(0 0 0 / 5%);
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 5%);
  border-radius: 6px;
}
.md-card {
  box-shadow: none;
  border: 0.5px solid #ccc;
}
.md-card .md-title {
  font-size: 20px;
  letter-spacing: 0;
  line-height: 30px;
}
.md-card .md-subhead {
  margin-top: 10px;
  font-size: 16px;
  line-height: 20px;
  color: #ff5722;
}
@media only screen and (max-width: 400px) {
  .inner-img.smallCarousel {
    width: 100%;
  }
  .notFound {
    font-size: 16px;
    margin-top: 30px;
  }
}
</style>
