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
      <!-- --------------------------------------ONLY FOR PRODUCT---------------------------------- -->
      <div
        class="ctlistItem"
        v-if="
          product.type === 'item' &&
            product.variations.colors[0].files.length > 0
        "
        @click="goToDetailsPage(product.name, product.item_id)"
      >
        <img
          :src="product.variations.colors[0].files[0]"
          :alt="product.name"
          class="fitItem"
        />
      </div>
      <!-- --------------------------------------ONLY FOR OTHER PRODUCTS eg: property, auto etc.---------------------------------- -->
      <div
        class="ctlistItem"
        v-if="product.type !== 'item' && product.images.length"
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

          <!---------------------------------------------------------- Product Price for Product Type -> ITEM  --------------->

          <div class="price-wrap" v-if="product.type === 'item'">
            <div class="bravo-offer-moq">
              <span
                class="sellingCurrency"
                v-if="product.variations.colors[0].sizes[0].price !== '0.00'"
                >{{ currencySymbol(100, product.currency)[0] }}</span
              >
              <span
                class="sellingPrice"
                v-if="product.variations.colors[0].sizes[0].offerprice > 0"
              >
                {{
                  currencySymbol(
                    product.variations.colors[0].sizes[0].offerprice,
                    product.currency
                  )[1]
                }}
              </span>
              <span
                class="quotationBased"
                v-else-if="
                  product.variations.colors[0].sizes[0].price == '0.00'
                "
              >
                Quotation Based
              </span>
              <span class="sellingPrice" v-else>
                {{
                  currencySymbol(
                    product.variations.colors[0].sizes[0].price,
                    product.currency
                  )[1]
                }}
              </span>
            </div>
            <div
              class="bravo-offer-moq offer"
              v-if="product.variations.colors[0].sizes[0].offerprice > 0"
            >
              {{
                currencySymbol(
                  product.variations.colors[0].sizes[0].offerprice,
                  product.currency
                )[0]
              }}
              <span class="offerPrice">{{
                currencySymbol(
                  product.variations.colors[0].sizes[0].price,
                  product.currency
                )[1]
              }}</span>
            </div>
          </div>

          <!---------------------------------------------------------- Product Price for Product Type -> NOT ITEM  --------------->

          <div class="price-wrap" v-else>
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

          <div
            class="offer-discount"
            v-if="
              product.type === 'item' &&
                product.variations.colors[0].sizes[0].offerpercentage > 0
            "
          >
            <span class="offer-discount-content"
              >{{ product.variations.colors[0].sizes[0].offerpercentage }}%
              OFF</span
            >
          </div>
          <div class="offer-discount">
            <span
              @click="$emit('changeStatus', product.status, product.item_id)"
              class="offer-discount-content"
              :class="{
                label_green: product.status === '1',
                label_red: product.status === '2'
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
              category: product.type === 'auto' ? moreDetails.category : ''
            }
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
          @click="(showRefresh = true), (showPaypal = false)"
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
    <md-dialog :md-active.sync="showRefresh" class="pricing-dialog">
      <md-dialog-title class="d-flex preview-title"
        ><h2 class="mx-auto" v-if="!showPaypal">Pricing</h2>
        <h3 class="mx-auto" v-if="showPaypal">Payment</h3>
        <div class="close">
          <i
            class="material-icons md-primary"
            style="cursor: pointer"
            @click="showRefresh = false"
            >close</i
          >
        </div>
      </md-dialog-title>

      <md-content md-dynamic-height class="mx-5 mb-5 row" v-if="!showPaypal">
        <div class="text-center p-3 no_posts col-md-4">
          <div class="pricing">
            <p style="font-size:24px">1</p>
            <sub>refresh 1 product for 1 times in a month</sub>
            <div style="font-size:60px;"><sup>AED</sup>50</div>
            <button @click="pay(50)">Subscripe</button>
          </div>
        </div>
        <div class="text-center p-3 no_posts col-md-4">
          <div class="pricing">
            <p style="font-size:24px">2</p>
            <sub>refresh 1 product for 2 times in a month</sub>
            <div style="font-size:60px;"><sup>AED</sup>80</div>
            <button @click="pay(80)">Subscripe</button>
          </div>
        </div>
        <div class="text-center p-3 no_posts col-md-4">
          <div class="pricing">
            <p style="font-size:24px">3</p>
            <sub>refresh 1 product for 3 times in a month</sub>
            <div style="font-size:60px;"><sup>AED</sup>110</div>
            <button @click="pay(110)">Subscripe</button>
          </div>
        </div>
        <div class="text-center p-3 no_posts col-md-4">
          <div class="pricing">
            <p style="font-size:24px">4</p>
            <sub>refresh 1 product for 4 times in a month</sub>
            <div style="font-size:60px;"><sup>AED</sup>130</div>
            <button @click="pay(130)">Subscripe</button>
          </div>
        </div>
        <div class="text-center p-3 no_posts col-md-4">
          <div class="pricing">
            <p style="font-size:24px">6</p>
            <sub>refresh 1 product for 6 times in a month</sub>
            <div style="font-size:60px;"><sup>AED</sup>160</div>
            <button @click="pay(160)">Subscripe</button>
          </div>
        </div>
        <div class="text-center p-3 no_posts col-md-4">
          <div class="pricing">
            <p style="font-size:24px">8</p>
            <sub>refresh 1 product for 8 times in a month</sub>
            <div style="font-size:60px;"><sup>AED</sup>320</div>
            <button @click="pay(320)">Subscripe</button>
          </div>
        </div>
      </md-content>
      <md-content md-dynamic-height class="mx-5 mb-5 row"
        ><div id="smart-button-container">
          <div style="text-align: center;">
            <div id="paypal-button-container"></div>
          </div>
        </div>
      </md-content>
    </md-dialog>
  </div>
</template>
<script>
import { ContentLoader } from "vue-content-loader";
export default {
  name: "ProductList",
  props: ["product"],
  components: { ContentLoader },
  data() {
    return {
      showRefresh: false,
      showPaypal: false
    };
  },
  computed: {
    moreDetails() {
      return this.product.more_details;
    },
    slugName() {
      return name => this.$helpers.slugify(name);
    },
    encodeProductId() {
      return productId => btoa(productId);
    }
  },
  methods: {
    pay(value) {
      this.showPaypal = true;
      paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "blue",
            layout: "vertical",
            label: "paypal"
          },

          createOrder: function(data, actions) {
            return actions.order.create({
              purchase_units: [
                { amount: { currency_code: "USD", value: value } }
              ]
            });
          },

          onApprove: function(data, actions) {
            return actions.order.capture().then(function(orderData) {
              this.paypal.type_id = this.advertising_id;
              this.paypal.action_type = this.action_type;
              this.paypal.transaction_id = this.advertising_id;
              console.log(
                "Capture result",
                orderData,
                JSON.stringify(orderData, null, 2)
              );

              // Show a success message within this page, e.g.
              const element = document.getElementById(
                "paypal-button-container"
              );
              element.innerHTML = "";
              element.innerHTML = "<h3>Thank you for your payment!</h3>";

              // Or go to another URL:  actions.redirect('thank_you.html');
            });
          },

          onError: function(err) {
            console.log(err);
          }
        })
        .render("#paypal-button-container");
      initPayPalButton();
    },
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
          productId: this.encodeProductId(id)
        }
      });
    }
  },
  mounted: function() {
    const script = document.createElement("script");
    const ClientID = process.env.PAYPAL_CLIENT_ID;
    script.src = `https://www.paypal.com/sdk/js?client-id=${ClientID}`;
    document.body.appendChild(script);
  }
};
</script>
<style scoped>
#smart-button-container {
  width: 400px;
  /* padding-top: 55px; */
}
.md-dialog >>> .md-dialog-container {
  border-radius: 10px !important;
  overflow: auto !important;
  max-height: 100% !important;
}
.md-dialog .md-dialog-title {
  border-bottom: 1px solid #ccc;
  padding-bottom: 7px;
}
.close {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e4e6eb;
  /* margin-left: auto; */
  padding: 7px;
}
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
.pricing-dialog sup,
.pricing-dialog sub {
  font-size: 12px;
  color: #213a63;
}
.pricing {
  line-height: 1.5;
  padding: 10px;
  margin: 10px;
  color: #213a63;
  border: 1px solid #eee;
  border-radius: 35px;
  box-shadow: 0 20px 40px 0 rgb(0 0 0 / 5%);
  transition: all 0.2s ease-in-out;
}
.pricing button {
  width: 80%;
  color: tomato;
  background: #fff5f4;
  border: 0;
  border-radius: 20px;
  display: block;
  padding: 10px 0;
  margin: 10px auto;
}
.pricing:hover {
  transform: scale(1.1);
}
.pricing button:hover {
  background: #ffe4e0;
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
