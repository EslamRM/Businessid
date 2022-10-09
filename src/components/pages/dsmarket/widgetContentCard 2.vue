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

    <div class="pdpPrice sectionView col-sm-12 p-0 fl">
      <div class="headType col-sm-12 col-md-3 col-xl-4 display_mob p-0 fl">
        Highlights
      </div>
      <div class="col-sm-12 col-md-9 col-xl-8 p-0 fl display_mob">
        <p class v-if="product.offerprice > 0">
          <span class="heading">Was:</span>
          <span class="value">
            <span class="preReductionPrice">
              <span>
                <span class="currency null">{{
                  currencySymbol(100, product.currency)[0]
                }}</span>
                <span class="value">{{
                  currencySymbol(product.unitprice, product.currency)[1]
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
                  <span v-if="product.unitprice != '0.00'">
                    <span class="ma-ref-price" v-if="product.offerprice > 0">
                      {{ currency(product.offerprice, product.currency) }}
                    </span>
                    <span class="ma-ref-price" v-else>{{
                      currency(product.unitprice, product.currency)
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
        <p class v-if="product.offerpercentage > 0">
          <span class="heading">Saving:</span>
          <span class="value">
            <span class="savingsRow">
              <span class="savingsPrice">
                <span>
                  <span class="currency null">
                    {{ currencySymbol(100, product.currency)[0] }}
                  </span>
                  <span class="value">
                    {{ (product.unitprice * product.offerpercentage) / 100 }}
                  </span>
                </span>
              </span>
              <span class="discountTag">
                <span class="bg"></span>
                <span class="value">{{ product.offerpercentage }}% Off</span>
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
            <span v-if="product.unitprice != '0.00'">
              <span class="ma-ref-price" v-if="product.offerprice > 0">
                {{ currency(product.offerprice, product.currency) }}
              </span>
              <span class="ma-ref-price" v-else>{{
                currency(product.unitprice, product.currency)
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
                    currencySymbol(product.unitprice, product.currency)[1]
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
      <div v-if="product.market_type == 'demand'" class="ifsingleBtn">
        <div class="cartbtnBig">
          <md-button class="md-accent md-theme-default"
            >Send quotation</md-button
          >
        </div>
      </div>
      <div v-else>
        <div v-if="product.unitprice > 0" class="btnWrap">
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
          <div class="cartbtnBig">
            <md-button
              class="md-accent md-theme-default"
              @click="addToCart(product)"
              >Add To Cart</md-button
            >
          </div>
        </div>
        <div v-else>
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
              <span>Ask For Quotation</span>
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
export default {
  props: ["product"],
  data () {
    return {
      showSnackbar: false,
      position: "left",
      productName: "",
      addedToCart: false,
    };
  },
  computed: {},
  methods: {
    addToCart (product) {
      const token = localStorage.getItem("token");
      if (token) {
        this.addedToCart = true;
        const data = {
          productid: product.productid,
          quantity: "1",
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
}
.btnWrap button {
  width: 100%;
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
  padding-right: 1px;
  height: 36px;
  font-size: 13px;
  line-height: 30px;
  width: 180px;
}
.cartbtnBig button.md-button.md-accent.md-theme-default.md-theme-default {
  height: 36px;
  width: 160px;
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
  width: 100%;
  display: inline-flex;
  margin-left: 1.2em;
}
.cartbtnBig button {
  font-weight: 500;
  font-size: 15px;
  height: 41px;
  margin: 0;
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
}
.tag-bx-1 {
  margin-top: 15px;
}
.mob_highlights {
  display: none;
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
    max-width: 255px;
  }

  .cartbtnBig button.md-button.md-accent.md-theme-default.md-theme-default {
    width: 160px;
    margin-right: 0px;
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
</style>
