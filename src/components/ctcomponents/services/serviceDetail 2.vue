<template>
  <div>
    <div class="prdct-det-page-bx page-padd-cmn" v-if="dataIsLoaded">
      <div class="wrp-tp-23">
        <div class="container">
          <!-- <productDetailContent></productDetailContent> -->
          <div class="flex-bx-tp-1">
            <div class="div-2-auto detail-col">
              <div class="flex-bx-tp-1 product-info">
                <div class="div-1-480">
                  <div class="detail-pg-sldr">
                    <widgetSlider :product="product" />
                  </div>
                </div>
                <div class="div-2-auto pl-4">
                  <div class="ch-tittle-wrap">
                    <h4 class="product-name-tp-1">{{ product.name }}</h4>
                  </div>
                  <div class="pdpPrice sectionView">
                    <div class="headType">Highlights :</div>
                    <div class="sectionDetail">
                      <p class v-if="product.offerprice > 0">
                        <span class="heading">Was:</span>
                        <span class="value">
                          <span class="preReductionPrice">
                            <span>
                              <span class="currency null">{{ product.currency }}</span>
                              <span class="value">
                                {{
                                product.unitprice
                                }}
                              </span>
                            </span>
                          </span>
                        </span>
                      </p>
                      <p class>
                        <span class="heading">Now:</span>
                        <span class="value">
                          <span class="sellingPriceContainer">
                            <span class="sellingPrice">
                              <span>
                                <span class="currency null"></span>
                                <span class="ma-ref-price" v-if="product.offerprice > 0">
                                  {{ product.currency }}
                                  {{ product.offerprice }}
                                </span>
                                <span class="ma-ref-price" v-else>
                                  {{ product.currency }}
                                  {{ product.unitprice }}
                                </span>

                                <span class="ma-reference-price">/&nbsp; {{ product.unit }}&nbsp;</span>
                                <span
                                  class="ma-min-order"
                                  v-if="
                                    product.minimumorder > 0 &&
                                      product.minimumorder != ''
                                  "
                                >
                                  | &nbsp;
                                  {{ product.minimumorder }} Piece/Pieces
                                  <span
                                    class="ma-reference-price"
                                  >(Min.Ord)</span>
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
                                <span class="currency null">AED</span>
                                <span class="value">
                                  {{
                                  (product.unitprice *
                                  product.offerpercentage) /
                                  100
                                  }}
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
                      </p>
                    </div>
                  </div>
                  <div class="d-block mt-5">
                    <router-link exact to="/qutationForm">
                      <md-button class="md-raised md-accent sendBtnBig">
                        <i class="material-icons">email</i>
                        <span>Ask For Quotation</span>
                      </md-button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

            <div class="div-1-230 div-1-230-cnt">
              <Supplier :product="product" />
            </div>
          </div>
          <div class="descripionWrap">
            <div class="full-width advDetails">
              <h4>DESCRIPTION</h4>
              <div class="content-area">
                <p class="desc-txt">{{ product.information }}</p>
              </div>
            </div>

            <div class="full-width advDetails" v-if="product.latitude != null">
              <h4>Location map</h4>
              <div class="content-area location-map">
                <GoogleMap :latitude="product.latitude" :longitude="product.longitude" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loader" v-else>
      <div class="circle-loader" v-if="showLoader"></div>
    </div>
  </div>
</template>
<script>
import GoogleMap from "../../services/map";
import singleSlider from "../../ctcomponents/gridSlider1";
import widgetSlider from "../../pages/dsmarket/widgetDetailSlider";
import Supplier from "../../pages/dsmarket/widgetSuplierCard";
import { mapState } from "vuex";
export default {
  components: {
    singleSlider,
    widgetSlider,
    GoogleMap,
    Supplier
  },

  data() {
    return {
      dataIsLoaded: false,
      markers: [],
      showLoader: false,
      images: {
        thumbs: [],
        normal_size: [],
        large_size: []
      },
      zoomerOptions: {
        zoomFactor: 3,
        pane: "container",
        hoverDelay: 300,
        namespace: "zoomer",
        move_by_click: false,
        scroll_items: 10,
        choosed_thumb_border_color: "#213a63"
      }
    };
  },
  computed: {
    ...mapState({
      product: state => state.store.serviceDetail
    })
  },
  created() {
    this.showLoader = true;
    const productId = atob(this.$route.params.productId);
    this.$store
      .dispatch("serviceDetails", productId)

      .then(response => {
        this.showLoader = false;
        this.dataIsLoaded = true;
      })
      .catch(error => console.log(error));
  }
};
</script>
<style scoped>
.cal-btn .md-ripple .md-button-content {
  align-items: center;
  display: flex;
}
.product-name-tp-1 {
  display: inline;
  font-size: 1.77rem;
  line-height: 1.4;
  color: #363f4d;
  font-style: normal;
  font-weight: 400;
  margin: 0 0 5px;
  text-transform: capitalize;
}
.detail-sldr-bx {
  width: 92%;
}
.price {
  margin-top: 0.625rem;
  margin-bottom: 0.3125rem;
  font-size: 2.2rem;
  line-height: 1.5625rem;
  padding: 0.125rem 0;
  font-weight: 600;
}
.prop-detail {
  font-size: 1.44rem;
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  line-height: 1;
  width: 35%;
}
.prop-detail .icon-wrap {
  width: 39px;
  height: 39px;
}
.prop-detail span {
  font-size: 14px;
  font-weight: 600;
  padding-left: 10px;
  padding-right: 10px;
}
.prop-detail i {
  display: inline-block;
  font-size: 3.5rem;
  vertical-align: middle;
  color: #888;
}
.small-loc {
  font-size: 15px;
  text-transform: capitalize;
}
.small-loc i {
  vertical-align: middle;
  margin-right: 0.3em;
}
.pdpPrice {
  display: table;
}
.pdpPrice > p > span {
  display: table-cell;
  vertical-align: middle;
}
.pdpPrice > p {
  display: table-row;
}

.pdpPrice .heading {
  padding-right: 8px;
  font-size: 12px;
  color: rgb(178, 187, 210);
}
.ma-ref-price {
  font-size: 20px;
  font-family: "ProximaBold";
  color: #333;
  line-height: 24px;
}

.pdpPrice > p > span {
  display: table-cell;
  vertical-align: middle;
}
.pdpPrice .preReductionPrice {
  font-size: 1rem;
}

.preReductionPrice {
  color: rgb(126, 133, 155);
  font-size: 0.916666rem;
  text-decoration: line-through;
}
.sectionDetail > p {
  display: flex;
  align-items: center;
}
.pdpPrice .savingsRow {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.pdpPrice .savingsPrice {
  font-weight: 600;
  font-size: 1.08333rem;
  margin-right: 6px;
}
.discountTag {
  color: rgb(56, 174, 4);
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: bold;
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
.dealer-info {
  margin-top: 2.3em;
}
.dealer {
  align-items: center;
}
.dealer img {
  width: auto;
  height: 7.5rem;
  padding: 10px;
}
.dealer .name {
  font-size: 14px;
  font-weight: 500;
}
.button-wrap {
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
}
.button-wrap .btn-act {
  width: 100%;
  border-radius: 0;
}
.button-wrap .btn-act i {
  vertical-align: middle;
  position: relative;
  top: -1px;
  margin-right: 0.2em;
}
.advDetails h4 {
  text-transform: uppercase;
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 0.9em;
}
.advDetails .productSpecs {
  font-size: 15px;
  color: #555555;
}
.advDetails .productSpecs .type {
  font-weight: 500;
}
.advDetails .productSpecs .row {
  margin-bottom: 0.625rem;
}
.row.line {
  font-size: 14px;
}
.row.line .sec {
  display: inline-flex;
}
.section-btm {
  margin-top: 4em;
}
.content-area {
  margin-bottom: 1em;
}
.desc-txt {
  line-height: 1.7;
  color: #555;
  font-size: 13px;
}
.amenities-list .amenities {
  display: inline-flex;
  padding: 9px 11px;
  background-color: rgba(0, 0, 0, 0.13);
  border-radius: 21px;
  margin-right: 0.33em;
}
.autocomplete-input {
  padding: 8px;
  width: 100%;
  border: 1px solid #eaeaea;
}
.search-map {
  height: 20px;
  margin: 0px auto;
  display: block;
  margin-top: 13px;
}
.location-map {
  height: 450px;
  position: relative;
  overflow: hidden;
}
.location-map iframe {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgb(229, 227, 223);
}
.payment .type1 {
  font-size: 0.9em;
  font-weight: 500;
  color: #888;
  margin-right: 0.7em;
}
.payment ul li {
  padding: 9px;
  background: #d9d9d9;
  border-radius: 4px;
  border: 2px dooted #d4d3d3;
  display: inline-flex;
  margin-right: 1em;
  font-weight: 600;
  font-size: 14px;
}
.wrp-tp-23 {
  padding-top: 1.1em;
}
.flex-bx-tp-1 {
  height: 100%;
  flex-flow: row;
}
.product-info {
  padding: 15px;
}
.detail-col {
  position: relative;
  background-color: #fff;
  flex-flow: column;
}
.div-1-480 {
  width: 480px;
}
.detail-pg-sldr {
  padding: 10px;
}
.ch-tittle-wrap {
  padding: 7px 0px;
  background: #fff;
}
.sectionView {
  display: block;
  margin-top: 7px;
}
.headType {
  font-weight: 600;
  color: #878787;
  width: 110px;
  padding-right: 10px;
  float: left;
  font-size: 13px;
}
.sectionDetail {
  flex: 1;
  margin-left: 110px;
}
.div-1-230-cnt {
  flex-flow: column;
  background: #fff;
  border-left: none;
  flex: 0 0 255px;
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
.sendBtnBig i {
  font-size: 20px;
  position: relative;
  top: 3px;
}
.sendBtnBig span {
  position: relative;
  top: -2px;
  padding-left: 3px;
}
.descripionWrap {
  background-color: #fff;
  margin-top: 10px;
}
.advDetails {
  width: 100%;
  flex: 1 0 100%;
  padding: 19px;
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 10px;
}

.advDetails h4 {
  color: #555555;
  font-weight: 600;
  font-size: 16px;
}
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
</style>
