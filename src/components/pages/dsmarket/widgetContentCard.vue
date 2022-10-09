<template>
  <div>
    <div class="ch-tittle-wrap">
      <div class="product-brand">{{ product.brand }}</div>
      <h2 class="ch-ttle">{{ product.name }}</h2>
    </div>
    <!-- <div class="brnd-bx-1 brd-tp-1">
      <span class="br-txt-1">
        For Reference:

        <a href="#" v-if="product.postedBy">{{product.postedBy.name}}</a>
      </span>

    </div>-->
    <div class="pdpPrice sectionView col-sm-12 p-0 fl" v-if="product.variations.colors[selectedVariation.colorId].pricing_type.includes('pricing')">
      <div class="headType col-sm-12 col-md-3 col-xl-4 display_mob p-0 fl">
        Highlights
      </div>
      <div class="col-sm-12 col-md-9 col-xl-8 p-0 fl display_mob">
        <p
          class
          v-if="
            product.variations.colors[selectedVariation.colorId].sizes[
              selectedVariation.sizeId
            ].offerprice > 0
          "
        >
          <span class="heading">Was:</span>
          <span class="value">
            <span class="preReductionPrice">
              <span>
                <span class="currency null">{{
                  currencySymbol(100, product.currency)[0]
                }}</span>
                <span class="value">{{
                  currencySymbol(
                    product.variations.colors[selectedVariation.colorId].sizes[
                      selectedVariation.sizeId
                    ].price,
                    product.currency
                  )[1]
                }}</span>
              </span>
            </span>
          </span>
        </p>
        <p class>
          <span class="heading">Now:</span>
          <span class="value">
            <span class="sellingPriceContainer">
              <span class="sellingpriceIn">
                <span>
                  <span class="currency null"></span>
                  <span
                    v-if="
                      product.unitprice != '0.00' ||
                      product.variations.colors[selectedVariation.colorId]
                        .sizes[selectedVariation.sizeId].price != '0.00'
                    "
                  >
                    <span
                      class="ma-ref-price"
                      v-if="
                        product.variations.colors[selectedVariation.colorId]
                          .sizes[selectedVariation.sizeId].offerprice > 0
                      "
                    >
                      {{
                        currency(
                          product.variations.colors[selectedVariation.colorId]
                            .sizes[selectedVariation.sizeId].offerprice,
                          product.currency
                        )
                      }}
                    </span>
                    <span class="ma-ref-price" v-else>{{
                      currency(
                        product.variations.colors[selectedVariation.colorId]
                          .sizes[selectedVariation.sizeId].price,
                        product.currency
                      )
                    }}</span>
                  </span>
                  <span class="ma-ref-price" v-else>Quotation Based</span>

                  <span class="ma-reference-price"
                    >/&nbsp; {{ product.unit }}&nbsp;</span
                  >
                  <br />
                  <span
                    class="ma-min-order"
                    v-if="
                      product.minimumorder > 0 && product.minimumorder != ''
                    "
                  >
                    {{ product.minimumorder }} Piece (s)
                    <span class="ma-reference-price">(Min.Ord)</span>
                  </span>
                </span>
              </span>

              <!-- <span class=" vatNote"
              >(Inclusive of VAT<strong class=""> + FREE delivery</strong
              >)
              </span>-->
            </span>
          </span>
        </p>
        <p class v-if="product.variations.colors[selectedVariation.colorId]
                        .sizes[selectedVariation.sizeId].offerpercentage > 0">
          <span class="heading">Saving:</span>
          <span class="value">
            <span class="savingsRow">
              <span class="savingsPrice">
                <span>
                  <span class="currency null">
                    {{ currencySymbol(100, product.currency)[0] }}
                  </span>
                  <span class="value">
                    {{
                      product.variations.colors[selectedVariation.colorId]
                        .sizes[selectedVariation.sizeId].price -
                        product.variations.colors[selectedVariation.colorId]
                        .sizes[selectedVariation.sizeId].offerprice
                    }}
                  </span>
                </span>
              </span>
              <span class="discountTag">
                <span class="bg"></span>
                <span class="value">{{ product.variations.colors[selectedVariation.colorId]
                        .sizes[selectedVariation.sizeId].offerpercentage }}% Off</span>
              </span>
            </span>
          </span>
        </p>
        <p class>
          <span class="heading">Vat :</span>
          <span class="value">
            <span class="savingsRow">
              <span class="savingsPrice">
                <span>
                  <span class="value vat">{{ product.vat_percentage }} %</span>
                </span>
              </span>
            </span>
          </span>
        </p>

        <div
          v-if="product.is_limited == 'limited' && quantity <= 0"
          class="orderInfo outstock"
        >
          Out of stock
        </div>
        <div v-else class="orderInfo instock">in stock</div>

        <!-- if stock use this class .instock -->
      </div>

      <!--------------------mobile_start------------------>

      <div class="col-sm-12 p-0 fl">
        <div class="fl mob_highlights">
          <div class="fr">
            <div
              v-if="product.is_limited == 'limited' && quantity <= 0"
              class="orderInfo outstock"
            >
              Out of stock
            </div>
            <div v-else class="orderInfo instock">in stock</div>

            <!-- if stock use this class .instock -->
          </div>
          <div class="fl col-sm-12 p-0">
            <span class="currency null"></span>
            <span
              v-if="
                product.variations.colors[selectedVariation.colorId].sizes[
                  selectedVariation.sizeId
                ].price != '0.00'
              "
            >
              <span
                class="ma-ref-price"
                v-if="
                  product.variations.colors[selectedVariation.colorId].sizes[
                    selectedVariation.sizeId
                  ].offerprice > 0
                "
              >
                {{
                  currency(
                    product.variations.colors[selectedVariation.colorId].sizes[
                      selectedVariation.sizeId
                    ].offerprice,
                    product.currency
                  )
                }}
              </span>
              <span class="ma-ref-price" v-else>{{
                currency(
                  product.variations.colors[selectedVariation.colorId].sizes[
                    selectedVariation.sizeId
                  ].price,
                  product.currency
                )
              }}</span>
            </span>
            <span class="ma-ref-price" v-else>Quotation Based</span>

            <span class="value">
              <span class="preReductionPrice">
                <span>
                  <span class="currency null">{{
                    currencySymbol(100, product.currency)[0]
                  }}</span>
                  <span class="value">{{
                    currencySymbol(
                      product.variations.colors[selectedVariation.colorId]
                        .sizes[selectedVariation.sizeId].price,
                      product.currency
                    )[1]
                  }}</span>
                </span>
              </span>
            </span>
            <span class="discountTag">
              <span class="value">({{ product.offerpercentage }}% Off)</span>
            </span>
          </div>
          <div class="fl">
            <span class="ma-reference-price"> {{ product.unit }}&nbsp;/</span>

            <span
              class="ma-min-order"
              v-if="product.minimumorder > 0 && product.minimumorder != ''"
            >
              {{ product.minimumorder }} Piece (s)
              <span class="ma-reference-price">(Min.Ord)</span>
            </span>
          </div>

          <!----->

          <div class="col-sm-12 p-0 fl margin_vat">
            <span class="heading">Vat:</span>
            <span class="value">
              <span class="savingsRow">
                <span class="savingsPrice">
                  <span>
                    <span class="value vat">{{ product.vat }}%</span>
                  </span>
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>

      <!--------------------mobile_end----------------->
    </div>

    <!-- <div class="ch-tittle-wrap">
      <span class="widget-main-action">
        <span class="ma-ref-price"
          > {{ currency(product.unitprice, product.currency) }} </span
        >
        <span class="ma-reference-price">/&nbsp; {{ product.unit }}&nbsp;</span>
        <span
          class="ma-min-order"
          v-if="product.minimumorder > 0 && product.minimumorder != ''"
        >
          | &nbsp;
          {{ product.minimumorder }} Piece/Pieces
          <span class="ma-reference-price">(Min.Ord)</span>
        </span>
      </span>
    </div>-->

    <div class="brnd-bx-1">
      <div class="bx-tp-tag-bx">
        <router-link
          v-for="(tag, index) in product.tags"
          :key="index"
          to="/"
          class="tag-bx-1"
          >{{ tag }}</router-link
        >
      </div>
      <div class="descr-bx-tp-1">
        <div class="bc-tp-11" v-if="product.till_date">
          <span class="br-txt-1">
            Validity Till:
            <span class="txt-clr-change">
              <span>{{ product.till_date }}</span>
            </span>
          </span>
        </div>
      </div>
      <div
        class="descr-bx-tp-1 brnd-bx-1"
        v-if="product.variations && product.variations.colors.length > 0"
      >
        <div
          class="
            md-layout
            md-layout-item
            md-size-30
            md-alignment-center-space-between
          "
          v-if="product.variations.colors[0].value"
        >
          <span class="heading">Color Options:</span>
          <span
            v-if="variation.color"
            class="material-icons clearIcon"
            @click="clearVariation"
            >close</span
          >
        </div>
        <div class="md-layout md-layout-item md-size-100 productVariations"
          v-if="product.variations.colors[0].value">
          <label
            v-for="(color, colorId) in product.variations.colors"
            :key="colorId"
          >
            <input
              type="radio"
              name="color"
              v-model="selectedVariation.colorId"
              @input="selectImageInGallery(colorId)"
              :value="colorId"
            />
            <div
              class="dot"
              :style="{
                'background-color': color.value,
              }"
            >
              <md-tooltip md-direction="top"> {{ color.name }} </md-tooltip>
            </div>
          </label>
        </div>

        <div v-if="selectedVariation.colorId >= 0">
          <span class="heading">Size Options:</span>
          <div class="md-layout md-layout-item md-size-100 productVariations">
            <label
              v-for="(size, sizeId) in product.variations.colors[
                selectedVariation.colorId
              ].sizes"
              :key="sizeId"
            >
              <input
                type="radio"
                name="size"
                v-model="selectedVariation.sizeId"
                :value="sizeId"
              />
              <div class="optionLabel">
                <md-tooltip md-direction="top"> {{ size.size }} </md-tooltip>
                <div class="letter">
                  {{
                    size.size.length > 10
                      ? size.size.substring(0, 10)
                      : size.size
                  }}
                </div>
              </div>
              <!-- <div class="dot optionsLabel">
                <md-tooltip md-direction="top"> {{ size.size }} </md-tooltip>
                <div class="letter">
                  {{
                    size.size.length > 2 ? size.size.substring(0, 2) : size.size
                  }}
                </div>
              </div> -->
            </label>
          </div>
        </div>
        <div v-if="selectedVariation.colorId >= 0 && product.variations.dimensions.colors[selectedVariation.colorId].sizes[selectedVariation.sizeId].dimensions.length!=0">
          <span class="heading">Size Details 
            <button class="md-button md-theme-default filtertoggleboxBtn size-details-button" @click="showSizeDetails=!showSizeDetails">
                <span class="material-icons">{{ showSizeDetails?'keyboard_arrow_down':'keyboard_arrow_right' }}</span>
            </button>
          </span>
          
          <div class="md-layout md-size-100" v-if="showSizeDetails">
            <div class="md-layout-item md-gutter md-layout md-size-100 dimension-field" 
            v-for="(dimension, key, index) in product.variations.dimensions.colors[selectedVariation.colorId].sizes[
              selectedVariation.sizeId
            ].dimensions"
              :key="index"
              >
              <div class="md-layout-item md-size-100">{{ dimension.name }}: {{ dimension.value }} {{ product.variations.measurement_unit }}</div>
            </div>
          </div>
          
        </div>
      </div>
      
      <div v-if="product.market_type == 'demand'" class="ifsingleBtn">
        <div class="cartbtnBig">
          <md-button class="md-accent md-theme-default"
            >Send quotation</md-button
          >
        </div>
      </div>
      <div v-else>
        <div
          v-if="
            product.variations.colors[selectedVariation.colorId].sizes[
              selectedVariation.sizeId
            ].price > 0
          "
          class="btnWrap"
        >
<div
            v-if="showCustomisation"
            class="md-layout md-alignment-center customize-box"
          >

            <div
              class="md-layout-item md-xsmall-size-100 md-size-100" style="text-align:center">
              <span class="custom-cost">{{ currency(product.variations.colors[selectedVariation.colorId].customization.customization_cost,product.currency) }}
               / 1 Qty,  Minimum Quantity : {{product.variations.colors[selectedVariation.colorId].customization.minimum_qty}}</span>
            </div>
              <input-component
              v-for="(dimension, id) in $v.customizeData.$each.$iter"
              :key="id"
                  :label="dimension.$model.name +' ('+product.variations.measurement_unit+')'"
                        type="number"
                        size="50"
                        :placeholder="'Select ' + dimension.$model.name"
                        v-model="dimension.$model.customvalue"
                        :error="submitted && !dimension.customvalue.required"
                      >
              </input-component>
            <div class=" md-layout-item md-xsmall-size-100 md-size-100" style="text-align:center;">
              <md-button
                class="md-accent md-theme-default"
                @click="customizeToCart(product)"
                style="background-color: rgb(247 237 234);padding: 0px 15px;"
                :disabled="submitted && $v.$invalid && !addedToCart"
                >Add Customized order to cart </md-button
              >
            </div>
          </div>
          <div class="cartbtnBig" v-if="product.variations.colors[selectedVariation.colorId].pricing_type.includes('pricing')">
            <md-button
              class="md-accent md-theme-default"
              @click="addToCart(product)"
              >Add To Cart </md-button
            >
          </div>

          <div class="cartbtnBig" v-if="product.variations.colors[selectedVariation.colorId].customization.active">
            <md-button
              class="md-primary md-theme-default"
              @click="showCustomisation = !showCustomisation"
              >Customize order</md-button
            >
          </div>

          <break></break>


        </div>

        <div v-if="product.variations.colors[selectedVariation.colorId].pricing_type.includes('quotation') &&
         product.variations.colors[selectedVariation.colorId].pricing_type.includes('pricing')"
        class="quotation-or">OR</div>
        <div 
          v-if="product.variations.colors[selectedVariation.colorId].pricing_type.includes('quotation')">

          <router-link
            :to="{
              name: 'qutationForm',
              params: {
                productId: product.productid,
              },
            }"
          >
            <md-button class="md-raised md-accent sendBtnBig">
              <i class="material-icons">email</i>
              Ask for quotation
            </md-button>
          </router-link>

        </div>
      </div>
    </div>
    <div class="supprt-bx-1-wrp">
      <!-- <table class="table-cnt-1">
            <tbody>
              <tr>
                <td>Seller Support&nbsp;:</td>
                <td>
                  <a href="#" class="lnk-tp-we-1">
                  uaect.com
                  </a>
                </td>
              </tr>
              <tr>
                <td>Payment&nbsp;:</td>
                <td>
                  This supplier supports On Delivery payments for offline orders.

                </td>
              </tr>
              <tr>
                <td>Shipping&nbsp;:</td>
                <td>uaect.com shipping Service</td>
              </tr>
            </tbody>
      </table>-->
      <div class="sectionView">
        <div class="headType">Seller</div>
        <div class="sectionDetail">
          <div class="support-inner">
            <span>
              <a href="#" class="lnk-tp-we-1">uaect.com</a>
            </span>
          </div>
        </div>
      </div>

      <div class="sectionView">
        <div class="headType">Payment</div>
        <div class="sectionDetail">
          <div class="support-inner">
            <span
              >This supplier supports On Delivery payments for offline
              orders.</span
            >
          </div>
        </div>
      </div>

      <div class="sectionView">
        <div class="headType">Shipping</div>
        <div class="sectionDetail">
          <div class="support-inner">
            <span>uaect.com shipping Service</span>
          </div>
        </div>
      </div>
    </div>
    <md-snackbar
      class="snack-bar"
      :md-position="position"
      :md-active.sync="showSnackbar"
      >{{ productName }} Is added to Cart</md-snackbar
    >
  </div>
</template>
<script>
import inputComponent from "@/components/ui-components/input.vue";
import { validationMixin } from 'vuelidate';
import {
  required,
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    customizeData:{
      required,
      $each:{
        customvalue:{
          required
        }
      }
    }
  },
  props: ["product"],
  data() {
    return {
      showSnackbar: false,
      showCustomisation: false,
      showSizeDetails:false,
      submitted: false,
      customizeData:[],
      position: "left",
      productName: "",
      addedToCart: false,
      selectedVariation: {
        colorId: 0,
        sizeId: 0,
      },
      variation: {
        files: [],
        name: "Red Color",
        pricing_type: "All",
        size: { size: "S", qty: "34", price: 34, offerprice: 34 },
        value: "#ff3737",
      },
    };
  },
  computed: {},
  created() {
    this.customizeData = this.product.variations.activateddimensions
  },
  components: {
    inputComponent
  },
  methods: {
    getName(id){
      return this.product.dimensions.filter((dimension)=>dimension.dimension_id==id).map(dimension=>dimension.name)[0];
    },
    getCustomOptions(id){
      return this.product.dimensions.filter((dimension)=>dimension.dimension_id==id).map(dimension=>dimension.optionalValue)[0].map(val=>val+' '+this.product.variations.measurement_unit);
    },
    addToCart(product) {
      this.showCustomisation = false;
      console.log('cart',this.product.variations.colors[this.selectedVariation.colorId]
                  .sizes[this.selectedVariation.sizeId]);
      const token = localStorage.getItem("token");
      if (token) {
        this.addedToCart = true;
        const data = {
          productid: product.productid,
          quantity: "1",
          variation: {
            files:
              this.product.variations.colors[this.selectedVariation.colorId]
                .files,
            pricing_type:'pricing',
            color:
              this.product.variations.colors[this.selectedVariation.colorId]
                .name,
            value:
              this.product.variations.colors[this.selectedVariation.colorId]
                .value,
            size: {
              size: this.product.variations.colors[
                this.selectedVariation.colorId
              ].sizes[this.selectedVariation.sizeId].size,
              qty: this.product.variations.colors[
                this.selectedVariation.colorId
              ].sizes[this.selectedVariation.sizeId].qty,
              price:
                this.product.variations.colors[this.selectedVariation.colorId]
                  .sizes[this.selectedVariation.sizeId].price,
              offerprice:
                this.product.variations.colors[this.selectedVariation.colorId]
                  .sizes[this.selectedVariation.sizeId].offerprice,
              offerpercentage:
                this.product.variations.colors[this.selectedVariation.colorId]
                  .sizes[this.selectedVariation.sizeId].offerpercentage,
            },
          },
        };
        this.$store
          .dispatch("AddToCart", data)
          .then((response) => {
            if (response.data.success == true) {
              this.addedToCart = false;
              this.showSnackbar = true;
              this.productName = product.name;
            }
          })
          .catch((error) => console.log(error));
      } else {
        this.$router.push("/login");
      }
    },
    customizeToCart(product){
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid){
        return
      }
      this.showCustomisation = false;
      const token = localStorage.getItem("token");
      if (token) {
        this.addedToCart = true;
        
        const data = {
          productid: product.productid,
          quantity: this.product.variations.colors[this.selectedVariation.colorId].customization.minimum_qty,
          variation: {
            files:
              this.product.variations.colors[this.selectedVariation.colorId]
                .files,
            pricing_type:'customization',
            color:
              this.product.variations.colors[this.selectedVariation.colorId]
                .name,
            value:
              this.product.variations.colors[this.selectedVariation.colorId]
                .value,
            customization: 
              {...this.product.variations.colors[this.selectedVariation.colorId].customization,
              ...{'values':this.customizeData.map(item=>{
                  return{
                    name:item.name,
                    value:item.customvalue
                  }
                  })
              }},
            measurement_unit:
              this.product.variations.measurement_unit  
          },
        };
        this.$store
          .dispatch("AddToCart", data)
          .then((response) => {
            if (response.data.success == true) {
              this.addedToCart = false;
              this.showSnackbar = true;
              this.productName = product.name;
            }
          })
          .catch((error) => console.log(error));
      } else {
        this.$router.push("/login");
      }
    },
    selectImageInGallery(colorId) {
      const imageToBeSelected =
        this.product.variations.colors[colorId].files[0];

      // Also, update the variation object to be passed in add to cart
      this.variation.file = imageToBeSelected;
      this.$emit("selectVariationImage", imageToBeSelected);
    },
    clearVariation() {
      this.variation = {
        color: null,
        size: null,
        file: null,
        price: null,
        variation_id: null,
      };

      const imageToBeSelected = this.product.images[0].file;
      this.$emit("selectVariationImage", imageToBeSelected);
    },
  },
};
</script>
<style scoped>
/* Abhishek */
/* Capitalize Snack Bar Content */
.snack-bar {
  text-transform: capitalize;
}
.wrp-tp-23 {
  padding-bottom: 20px;
}
.support-info {
  display: table;
}
.support-info .support-inner {
  display: table-row;
}
.support-info .support-inner span {
  display: table-cell;
  font-size: 13px;
}
.table-cnt-1 tr {
  font-size: 12px;
}
.product-brand {
  font-size: 1.4rem;
  color: #7e808c;
  margin-top: 4px;
}
.ch-tittle-wrap {
  padding: 7px 0px;
  background: #fff;
}
.ch-ttle {
  display: inline;
  font-size: 1.77rem;
  line-height: 1.4;
  color: #272c3f;
  font-style: normal;
  font-weight: 600;
  margin: 0 0 5px;
  text-transform: capitalize;
}
.brd-tp-1 {
  border-top: 1px solid #e6e7eb;
}
.brnd-bx-1 {
  padding: 15px 0px;
}
.br-txt-1 {
  font-size: 15px;
  color: #666;
  letter-spacing: 0;
  margin-left: 0;
  line-height: 20px;
  text-align: left;
  padding: 0;
  font-weight: 500;
}

.ma-ref-price {
  font-size: 21px;
  font-family: "ProximaBold";
  color: #545766;
  line-height: 1.4;
  margin-right: 0.2em;
}
.ma-reference-price {
  color: #7e818a;
  font-size: 14px;
  margin-left: 0px;
}
.ma-min-order {
  color: #1a1a1a;
  font-size: 14px;
  padding: 0px 10px;
}
.tag-bx-1 {
  background: #fff;
  margin-right: 0.3em;
  border-radius: 4rem;
  border: solid 1px #e0e0e0;
  box-sizing: border-box;
  color: #292d39 !important;
  display: inline-block;
  font-size: 11px;
  height: 2.5555rem;
  line-height: 2.5555rem;
  padding: 0 0.77775rem;
  position: relative;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  text-transform: uppercase;
  -webkit-transition: color 0.2s;
  letter-spacing: 1px;
}
.descr-bx-tp-1 {
  margin-top: 20px;
  margin-bottom: 20px;
}
.br-txt-1 {
  font-size: 15px;
  color: #666;
  letter-spacing: 0;
  margin-left: 0;
  line-height: 10px;
  text-align: left;
  padding: 0;
}
.txt-clr-change {
  color: #d11d2f;
}
.add-to-cart-btn {
  height: 30px;
  font-size: 14px;
  line-height: 1;
  padding: 0 8px;
  position: relative;
}
.btnWrap {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
}
.btnWrap break{
  flex-basis: 100%;
    width: 0px;
    height: 0px;
    overflow: hidden;
    display: inline-block;
}
.sendBtnBig span {
  position: relative;
  top: -2px;
  padding-left: 3px;
}
.sendBtnBig i {
  font-size: 20px;
  position: relative;
  top: 5px;
}
.supprt-bx-1 {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 130px;
}
.sectionView {
  display: block;
  margin-top: 7px;
  line-height: 1.4;
}
.headType {
  font-weight: 500;
  color: #535665;

  padding-right: 10px;
  float: left;
  font-size: 13px;
}
.sendBtnBig {
  width: 100%;
  max-width: 255px;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
  font-weight: 500;
  font-size: 15px;
  height: 41px;
}
.sectionDetail {
  flex: 1;
  margin-left: 110px;
}
.pdpPrice > p > span {
  display: table-cell;
  vertical-align: middle;
}
.pdpPrice > p {
  display: table-row;
}
button.md-button.md-raised.md-accent.sendBtnBig.md-theme-default {
  margin: auto;
  padding-right: 1px;
  height: 36px;
  font-size: 13px;
  line-height: 30px;
  width: 180px;
}
.cartbtnBig button.md-button.md-accent.md-theme-default.md-theme-default,.cartbtnBig button.md-button.md-primary.md-theme-default.md-theme-default {
  height: 36px;
  width: 180px;
  font-size: 13px;
}
.pdpPrice .heading {
  padding-right: 8px;
  font-size: 12px;
  color: #535665;
  /* max-width: 4.875rem; */
  /* CHANGED - As vat % was not fitting up correctly */
  max-width: 5.75rem;
  width: 100%;
  display: inline-block;
}
.pdpPrice > p > span {
  display: table-cell;
  vertical-align: middle;
}
.pdpPrice .preReductionPrice {
  font-size: 1.3rem;
}

.preReductionPrice {
  color: #a8abb2;
  text-decoration: line-through;
}
.pdpPrice p + p > span {
  padding-top: 8px;
}
.pdpPrice .savingsRow {
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
}
.pdpPrice .savingsPrice {
  font-weight: 600;
  font-size: 1.2rem;
  margin-right: 6px;
  color: #545766;
}
.discountTag {
  color: rgb(56, 174, 4);
  text-transform: uppercase;
  font-size: 0.95rem;
  font-weight: 400;
  position: relative;
  display: inline-block;
  line-height: 16px;
  padding: 0px 4px;
}
.discountTag .bg {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  opacity: 0.2;
  background-color: rgb(56, 174, 4);
}
.pdpPrice .vatNote {
  font-size: 10px;
  color: rgb(126, 133, 155);
  line-height: 1.6;
}
.pdpPrice .vatNote strong {
  color: rgb(56, 102, 223);
}
.support-inner {
  font-size: 13px;
}
.cartbtnBig {
  /* width: 100%; */
  display: inline-flex;
  /* margin-left: 1.2em; */
}
.cartbtnBig button {
  font-weight: 500;
  font-size: 15px;
  height: 41px;
}
.sellingpriceIn {
  font-weight: 500;
  color: #444;
  display: inline-flex;
  align-items: center;
}
.ifsingleBtn .cartbtnBig {
  margin-left: 0;
}
.orderInfo {
  font-size: 16px;
  display: block;
  margin-top: 11px;
  max-width: 125px;
  text-align: center;
}
.outstock {
  border: 1px dashed #ff6161;
  color: #ff6161;
}
.instock {
  border: 1px dashed #38ae04;
  color: #38ae04;
  margin-bottom: 10px;
}
.tag-bx-1 {
  margin-top: 15px;
}
.mob_highlights {
  display: none;
}
.customize-box
{
  margin-bottom: 12px;
  border: 1px solid #f1f1f1;
  padding: 15px;
  border-radius: 0.25em;
  width: 411px;
  background-color: #f4f9f3;
}
.customize-box .md-layout-item
{
  padding: 4px;
}
@media screen and (max-width: 768px) {
  button.md-button.md-raised.md-accent.sendBtnBig.md-theme-default {
    margin-top: 0px;
    margin-left: 0px;
  }
  .cartbtnBig {
    margin-left: 5px;
  }
  .product-brand {
    font-size: 12px;
  }

  .ch-ttle {
    font-size: 16px;
  }
  .ma-ref-price {
    font-size: 18px;
  }
}

@media screen and (max-width: 768px) {
  .display_mob {
    display: none;
  }
  .quotation-or
  {
    display: none;
  }
  .cartbtnBig button.md-button.md-accent.md-theme-default.md-theme-default {
    width: 160px;
    box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0);
    margin-left: 8px;
  }
  button.md-button.md-raised.md-accent.sendBtnBig.md-theme-default {
    width: 100%;
    margin-right: 5px;
    padding-left: 5px;
    margin-left: 1px;
    padding-right: 6px;
    box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0);
  }
  .cartbtnBig {
    margin-left: 3px;
    width: 48%;
  }

  .support-inner {
    font-size: 11px;
    font-weight: 400;
    color: #545766 !important;
  }

  .product-brand {
    font-size: 11px;
  }
  .ma-ref-price {
    font-size: 13px;
  }

  .ma-reference-price {
    font-size: 11px;
  }
  .ma-min-order {
    font-size: 11px;
  }
  .orderInfo {
    font-size: 11px;
    margin-top: 12px;
    padding-top: 2px;
    padding-bottom: 2px;
    position: absolute;
    top: -56px;
    right: 0px;
    padding-left: 7px;
    padding-right: 7px;
  }

  .brnd-bx-1 {
    padding-bottom: 0px;
  }
  .descr-bx-tp-1 {
    margin-top: 12px;
    margin-bottom: 7px;
  }
  .tag-bx-1 {
    margin-top: 9px;
    font-size: 10px;
    height: 2.3rem;
    line-height: 22px;
  }

  .sectionView {
    margin-top: 3px;
  }

  .headType {
    font-size: 11px;
  }

  .btnWrap {
    background: #fff;
    position: fixed;
    bottom: 39px;
    z-index: 9991;
    padding-top: 8px;
    border-bottom: solid 1px #f5f5f5;
    left: 0px;
    right: 0px;
    padding-bottom: 3px;

    padding-left: 10px;
  }
  .mob_highlights {
    display: block;
  }
  /*--------*/
  .ch-ttle {
    font-size: 13px;
    margin-top: 8px;
    float: left;
    font-weight: 600;
  }
  .display_mob {
    display: none;
  }

  .ma-min-order {
    padding: 0px 0px;
    font-size: 11px;
    color: #7e818a;
  }
  .margin_vat {
    margin-top: 5px;
  }
  .pdpPrice .heading {
    padding-right: 8px;
    font-size: 11px;
    max-width: 24px;
  }

  .supprt-bx-1-wrp {
    float: left;
    margin-top: -1px;
  }

  button.md-button.md-raised.md-accent.sendBtnBig.md-theme-default {
    width: 370px;
    max-width: 100%;
  }
  .cartbtnBig button.md-button.md-accent.md-theme-default.md-theme-default {
    width: 100%;
    margin-right: 10px;
  }
}

@media screen and (max-width: 600px) {
  button.md-button.md-raised.md-accent.sendBtnBig.md-theme-default {
    width: 100%;
    /* max-width: 255px; */
  }

  .cartbtnBig button.md-button.md-accent.md-theme-default.md-theme-default {
    width: 160px;
    margin-right: 0px;
  }
  .customize-box
  {
    width: 100%;
    position: absolute;
    bottom: 45px;
    overflow: scroll;
    border-top: #cdd3cb 1px solid;
    overflow-y: scroll;
    overflow-x: scroll;
    max-height: 50vh;
  }
}

@media screen and (max-width: 420px) and (min-width: 400px) {
  button.md-button.md-raised.md-accent.sendBtnBig.md-theme-default {
    padding-left: 20px;
    padding-right: 20px;
  }

  .cartbtnBig button.md-button.md-accent.md-theme-default.md-theme-default {
    width: 170px;
  }

  .btnWrap {
    padding-left: 9px;
  }
}

@media screen and (max-width: 360px) {
  button.md-button.md-raised.md-accent.sendBtnBig.md-theme-default {
    padding-left: 5px;
    padding-right: 7px;
  }

  .cartbtnBig button.md-button.md-accent.md-theme-default.md-theme-default {
    width: 145px;
  }

  .btnWrap {
    padding-left: 9px;
  }
}

@media screen and (max-width: 300px) {
  button.md-button.md-raised.md-accent.sendBtnBig.md-theme-default {
    padding-left: 10px;
    padding-right: 12px;
    margin-left: 0px;
  }

  .cartbtnBig button.md-button.md-accent.md-theme-default.md-theme-default {
    width: 100px;
    margin-left: 2px;
  }

  .btnWrap {
    padding-left: 6px;
    bottom: 35px;
    padding-bottom: 0px;
    padding-top: 7px;
  }
}

/* Product Variations CSS */
.dot {
  width: 34px;
  height: 34px;
  content: "";
  background-color: #fe5823;
  padding: 10px;
  border-radius: 50%;
  /* margin-top: 10px; */
  float: right;
  box-shadow: 1px 2px 11px 0 rgb(82 80 80 / 48%);
  cursor: pointer;
}

.optionLabel {
  background-color: #fe5823;
  padding: 10px;
  border-radius: 5px;
  /* margin-top: 10px; */
  box-shadow: 1px 2px 11px 0 rgb(82 80 80 / 48%);
  cursor: pointer;
}

.letter {
  text-transform: capitalize;
  text-align: center;
  color: white;
  font-weight: bold;
}

.productVariations input {
  display: none;
}

.productVariations label {
  padding: 8px;
}

.productVariations input[type="radio"]:checked + .dot {
  box-shadow: inset 0 0 0 2px rgb(84 87 102);
}
.productVariations input[type="radio"]:checked + .optionLabel {
  box-shadow: inset 0 0 0 2px rgb(84 87 102);
}

.clearIcon {
  cursor: pointer;
  font-size: 2rem;
  border: #ff5722 solid 1px;
  border-radius: 50%;
  color: rgb(84 87 102);
}
.customItem {
  margin: 12px 0;
}
.dimension-field
{
  margin:4px 0;
}
.size-details-button
{
  display: inline-block;
  position: relative;
  top: -12px;
}
.custom-cost
{
  font-family: "ProximaBold";
  color: #545766;
  line-height: 1.4;
}
.custom-qty{
  color: #a8abb2;
  font-size: 1.3rem;
}
.quotation-or
{
  text-align:center;padding:4px;
}
</style>
