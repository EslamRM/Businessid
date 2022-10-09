<template>
  <div style="width: 100%; border-radius: 5px">
    <div class="bravo-offer-image">
      <span
        class="out_of_stock"
        v-if="
          product.quantity <= 0 &&
          product.type === 'item' &&
          product.is_limited === 'limited'
        "
        >Out Of Stock</span
      >
      <div
        class="ctlistItem"
        v-if="product.images.length"
        @click="goToDetailsPage(product.name, product.item_id)"
      >
        <img
          :src="product.images[0].file"
          :alt="product.name"
          class="fitItem"
        />
      </div>
    </div>
    <div class="content">
      <div class="wrap_store_content">
        <div class="main-section contentWrapProduct">
          <span class="product-brand">{{ product.brand }}</span>
          <div
            class="product-name"
            @click="goToDetailsPage(product.name, product.item_id)"
          >
            {{ product.name }}
          </div>

          <!---------------------------------------------------------- Product Price   --------------->

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

          <!---------------------------------------------------------- Product Offers And Active-Inactive Section   --------------->

          <div class="offer-discount" v-if="product.offerpercentage > 0">
            <span class="offer-discount-content"
              >{{ product.offerpercentage }}% OFF</span
            >
          </div>
          <div class="offer-discount">
            <span
              @click="$emit('changeStatus', product.status, product.item_id)"
              class="offer-discount-content"
              :class="{
                label_green: product.status === '1',
                label_red: product.status === '2',
              }"
              >{{ product.status === "1" ? "Active" : "In-Active" }}</span
            >
          </div>
        </div>
        <!---------------------------------------------------------- !!! Only for Auto Listing   --------------->

        <div v-if="product.type === 'auto' && moreDetails">
          <div>
            <div class="optionLine muted">
              {{ moreDetails.address }}
            </div>
            <div class="optionLine">
              <img src="./km.png" />
              <div class="resultIn">
                {{ moreDetails.kilometers ? moreDetails.kilometers : "N/A" }}
                <span>km</span>
              </div>
            </div>
            <div class="optionLine">
              <img src="./fuel.png" />
              <div class="resultIn">
                {{ moreDetails.fuel_type ? moreDetails.fuel_type : "N/A" }}
              </div>
            </div>
            <div class="optionLine">
              <img src="./trans.png" />
              <div class="resultIn">
                {{
                  moreDetails.transmission_type
                    ? moreDetails.transmission_type
                    : "N/A"
                }}
              </div>
            </div>
          </div>
        </div>

        <!---------------------------------------------------------- !!! Only for Auto Listing   --------------->
        <!---------------------------------------------------------- !!! Only for Property Listing   --------------->

        <div v-if="product.type === 'property' && moreDetails">
          <div>
            <div class="optionLine muted">
              {{ moreDetails.address }}
            </div>
            <div class="optionLine">
              <img src="./size.png" />
              <div class="resultIn">
                {{ moreDetails.area_size ? moreDetails.area_size : "N/A" }}
                {{ moreDetails.area_unit }}
                <span>km</span>
              </div>
            </div>
            <div class="optionLine">
              <img src="./bed.png" />
              <div class="resultIn">
                {{ moreDetails.bedrooms ? moreDetails.bedrooms : "N/A" }}
              </div>
            </div>
            <div class="optionLine">
              <img src="./bath.png" />
              <div class="resultIn">
                {{ moreDetails.bathrooms ? moreDetails.bathrooms : "N/A" }}
              </div>
            </div>
          </div>
        </div>

        <!---------------------------------------------------------- !!! Only for Property Listing   --------------->

        <!---------------------------------------------------------- Quantity   --------------->
        <div
          class="productQuantity"
          v-if="product.quantity > 0 && product.type === 'item'"
        >
          Available Quantity:
          <b> {{ product.quantity }}</b>
        </div>
      </div>

      <div class="cartbtnBig md-layout md-alignment-center-space-between">
        <!-- <i class="material-icons action_icon mr-3 md-layout-item">edit</i> -->
        <md-button
          :to="{
            path: getEditProductPath(product.type),
            query: {
              market_type: 'supply',
              productId: product.item_id,
              category: product.type === 'auto' ? moreDetails.category : '',
            },
          }"
          class="md-layout-item edit_button"
        >
          <i class="material-icons">edit</i>
        </md-button>
        <md-button
          class="md-accent edit_button md-layout-item"
          @click="$emit('deleteProduct', product.item_id)"
          ><i class="material-icons">delete</i>
        </md-button>

        <md-button
          class="md-accent md-theme-default edit_button md-layout-item"
        >
          <i class="material-icons f-s-19">refresh</i>
        </md-button>

        <!-- <i
          class="material-icons md-accent md-theme-default action_icon md-layout-item"
          @click="deleteProduct(product.item_id)"
          >delete</i
        > -->
      </div>
    </div>
  </div>
</template>
<script>
import { ContentLoader } from "vue-content-loader";
export default {
  name: "ProductList",
  props: ["product"],
  components: { ContentLoader },
  data() {
    return {};
  },
  computed: {
    moreDetails() {
      return this.product.more_details;
    },
    slugName() {
      return (name) => this.$helpers.slugify(name);
    },
    encodeProductId() {
      return (productId) => btoa(productId);
    },
  },
  methods: {
    getEditProductPath(type) {
      if (!this.moreDetails) console.log(type, "No cat");
      if (type === "item") {
        return "/dashboard/vendor/item";
      } else if (type === "auto") {
        if (this.moreDetails.category === "Cars")
          return "/dashboard/vendor/addAuto";
        if (this.moreDetails.category === "Accessories And Spare Parts")
          return "/dashboard/vendor/addAuto";
        if (this.moreDetails.category === "Boats")
          return "/dashboard/vendor/addAuto";
        if (this.moreDetails.category === "Heavy Vehicles")
          return "/dashboard/vendor/addAuto";
        if (this.moreDetails.category === "Motorcycles")
          return "/dashboard/vendor/addAuto";
        if (this.moreDetails.category === "Number Plates")
          return "/dashboard/vendor/addAuto";
      } else if (type === "property") {
        return "/dashboard/vendor/property";
      }
    },
    goToDetailsPage(name, id) {
      this.$router.push({
        name: "product-details",
        params: {
          product: this.slugName(name),
          productId: this.encodeProductId(id),
        },
      });
    },
  },
};
</script>
<style scoped>
.listactiveBox .offer-item .full-width {
  display: flex;
}
.wrap_store_content {
  min-height: 115px;
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

.cartbtnBig {
  margin-left: -2px;
  margin-right: -2px;
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
  cursor: pointer;
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
  color: rgba(255, 87, 34, 0.65);
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
  .out_of_stock {
    font-size: 12px;
  }

  .cartbtnBig button {
    margin-left: 0px;
    margin-right: 0px;
    font-size: 13px;
  }
  .snack-bar {
    bottom: 40px;
  }

  .edit_button {
    margin-left: 1px !important;
    margin-right: 1px !important;
    min-width: 40px !important;
    max-width: 84px !important;
    margin-bottom: 6px !important;
  }

  .bravo-offer-moq span {
    font-size: 14px;
  }
  .productQuantity {
    font-size: 13px;
  }

  .content {
    padding-bottom: 3px !important;
  }
}

/* Additional Css which is transferred from Products.vue to this base component. */
.content {
  padding: 10px;
}
.bravo-offer-image {
  overflow: visible;
  margin-bottom: 0px !important;
}
.ctlistItem {
  cursor: pointer;
  padding: 10px;
}
.fitItem {
  border-radius: 8px 8px 0 0;
  /* object-fit: cover !important; */
}
.label_green {
  background: #64dd17;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}

.label_red {
  background: #ff5733;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}

.out_of_stock {
  top: 15px;
  right: 15px;
  left: auto;
  margin: -0.5em -0.5em 0 0;
  position: absolute;
  z-index: 1;

  background: #ff5733;
  color: #fff;
  padding: 3px;
  border-radius: 3px;

  cursor: not-allowed;
}

.productQuantity {
  margin: 3px 0px;
}

.edit_button {
  border: solid 1px #e0e0e0 !important;
  color: white !important;
  margin-left: 2px;
  margin-right: 2px;
  height: 33px;
  margin-top: 0.5em;
  background-color: #fff !important;
  min-width: 40px;
}

.edit_button i {
  color: #e0e0e0;
  margin-top: 4.5px;
}

.edit_button:hover {
  background-color: #ff5722 !important;
  border-color: #ff5722 !important ;
}

.edit_button:hover i {
  color: #fff !important;
}

/* only for Auto Listing */
.optionLine {
  margin-bottom: 5px;
}
.optionLine {
  display: inline-flex;
  margin-right: 1.25rem;
  vertical-align: middle;
  width: 100%;
}

.optionLine img {
  height: 25px;
  margin-right: 0.34em;
}

.icoWrap {
  position: relative;
  display: flex;
  width: 25px;
  margin-right: 10px;
}

@media screen and (max-width: 600px) {
  .edit_button {
    min-width: 40px !important;
    max-width: 102px !important;
    margin-left: 2px !important;
    margin-right: 2px !important;
  }

  .out_of_stock {
    font-size: 10px;
  }
}

@media screen and (max-width: 420px) and (min-width: 400px) {
  .edit_button {
    min-width: 40px !important;
    max-width: 114px !important;
  }
}

@media screen and (max-width: 360px) {
  .edit_button {
    min-width: 40px !important;
    max-width: 96px !important;
  }
}

@media screen and (max-width: 300px) {
  .edit_button {
    min-width: 40px !important;
    max-width: 76px !important;
  }
  .out_of_stock {
    font-size: 10px;
  }
}
</style>
