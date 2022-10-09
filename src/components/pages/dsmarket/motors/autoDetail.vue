<template>
  <div>
    <div class="container_padding">
      <breadcrumb></breadcrumb>
    </div>
    <div class="row_page-padd-cmn">
      <div class="prdct-det-page-bx page-padd-cmn">
        <div class="wrp-tp-23" v-if="dataIsLoaded">
          <div class="container container_padding">
            <!-- <productDetailContent></productDetailContent> -->
            <div>
              <div class="row_auto">
                <div
                  class="div-2-auto wrapper_auto_left col-sm-12 col-md-7 col-xl-9 pl-0 fl"
                >
                  <div class="flex-bx-tp-1 product-info">
                    <div class="div-1-100 autoOnly">
                      <WidgetSlider
                        :product="product"
                        v-if="product"
                      ></WidgetSlider>
                    </div>
                  </div>
                  <div class="row_features">
                    <div class="listing-summary">
                      <div class="prop-detail">
                        <p class="labelFor">Year</p>
                        <div class="icon-wrap">
                          <img src="../../../ctcomponents/autos/year.png" />
                        </div>
                        <span> {{ product.moreDetails.age }}</span>
                      </div>
                      <div class="prop-detail">
                        <p class="labelFor">KM</p>
                        <div class="icon-wrap">
                          <img src="../../../ctcomponents/autos/km.png" />
                        </div>
                        <span>{{ product.moreDetails.kilometers }}</span>
                      </div>
                      <div class="prop-detail">
                        <p class="labelFor">Transmission</p>
                        <div class="icon-wrap">
                          <img src="../../../ctcomponents/autos/trans.png" />
                        </div>
                        <span></span>
                      </div>
                      <div class="prop-detail">
                        <p class="labelFor">Color</p>
                        <div class="icon-wrap">
                          <img src="../../../ctcomponents/autos/color.png" />
                        </div>
                        <span>{{ product.moreDetails.color }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-5 col-xl-3 pr-0 fl mb_pl">
                  <div class="rightSticky">
                    <div class="small-loc mb-2">
                      <i class="material-icons add-to-cart-icn hero-orange-clr"
                        >room</i
                      >
                      {{ product.moreDetails.address }}
                    </div>
                    <h4 class="product-name-tp-1">
                      {{ product.name }}
                    </h4>
                    <div class="price">
                      {{ currencySymbol(100, product.currency)[0] }}
                      <span v-if="product.offerprice > 0">
                        {{
                          currencySymbol(
                            product.offerprice,
                            product.currency
                          )[1]
                        }}</span
                      >
                      <span v-else>
                        {{
                          currencySymbol(product.unitprice, product.currency)[1]
                        }}</span
                      >
                    </div>

                    <div class="full-width">
                      <div class="row productSpecs">
                        <div class="payment">
                          <ul>
                            <li v-if="product.moreDetails.payment_method != ''">
                              <span
                                ><i class="material-icons">payments</i></span
                              >
                              <div class="pay-wrap">
                                <label>Payment Method:</label>
                                <div class="typevalue">
                                  {{ product.moreDetails.payment_method }}
                                </div>
                              </div>
                            </li>
                            <!-- <li v-if="product.moreDetails.payment_method != ''">
                        <span><i class="material-icons">today</i></span>
                        <div class="pay-wrap">
                          <label>Payment Term:</label>
                          <div class="typevalue">
                            {{ product.moreDetails.payment_type }}
                          </div>
                        </div>
                      </li> -->
                            <li
                              v-if="
                                product.moreDetails.payment_method ==
                                  'Cheque' && product.moreDetails.no_of_cheques
                              "
                            >
                              <span><i class="material-icons">receipt</i></span>
                              <div class="pay-wrap">
                                <label>Number of checks:</label>
                                <div class="typevalue">
                                  {{ product.moreDetails.no_of_cheques }}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div class="agentWrap">
                      <div class="dealer-info">
                        <h3 class="stickHead">Agent Info</h3>
                        <div class="dealer car">
                          <div class="d-flex">
                            <img
                              src="../../../../assets/images/avatar.png"
                              alt="avatar-placeholder"
                              class="company-avatar"
                            />
                            <div class="name">
                              {{ product.postedBy.name }} - ({{
                                product.postedBy.phone
                              }})

                              <span> </span>
                              <div class="button-wrap">
                                <md-button class="btn-act">
                                  <i
                                    class="material-icons add-to-cart-icn hero-orange-clr"
                                    >mail_outline</i
                                  >
                                  EMAIL
                                </md-button>
                                <md-button class="btn-act">
                                  <i
                                    class="material-icons add-to-cart-icn hero-orange-clr"
                                    >local_phone</i
                                  >
                                  CALL
                                </md-button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="listedBy">
                    <h3 class="stickHead">Listed By</h3>
                    <Supplier :product="product" />
                  </div>
                </div>

                <div class="col-md-12 section-btm p-0 fl">
                  <div class="full-width advDetails">
                    <h4>Details</h4>
                    <div class="productSpecs content-area">
                      <!-- <div class="col-md-6" v-if="product.moreDetails.age != ''">
                      <div class="row line">
                        <div class="col-md-5 type sec">Age:</div>
                        <div class="col-md-7 desc sec">
                          {{ product.moreDetails.age }}
                        </div>
                      </div>
                    </div> -->

                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.age != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Age</span>
                          <div class="desc sec">
                            {{ product.moreDetails.age }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.auto_type != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Auto Type</span>
                          <div class="desc sec">
                            {{ product.moreDetails.auto_type }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.body_condition != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Body Condition</span>
                          <div class="desc sec">
                            {{ product.moreDetails.body_condition }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.body_type != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Body Type</span>
                          <div class="desc sec">
                            {{ product.moreDetails.body_type }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.capacity != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Capacity</span>
                          <div class="desc sec">
                            {{ product.moreDetails.capacity }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.category != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Category</span>
                          <div class="desc sec">
                            {{ product.moreDetails.category }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.color != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Color</span>
                          <div class="desc sec">
                            {{ product.moreDetails.color }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.cylinders != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Cylinders</span>
                          <div class="desc sec">
                            {{ product.moreDetails.cylinders }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.doors != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Doors</span>
                          <div class="desc sec">
                            {{ product.moreDetails.doors }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.drive_system != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Drive System</span>
                          <div class="desc sec">
                            {{ product.moreDetails.drive_system }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.engine_size != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Engine Size</span>
                          <div class="desc sec">
                            {{ product.moreDetails.engine_size }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.fuel_type != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Fuel Type</span>
                          <div class="desc sec">
                            {{ product.moreDetails.fuel_type }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.horsepower != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Horsepower</span>
                          <div class="desc sec">
                            {{ product.moreDetails.horsepower }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.kilometers != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Kilometers</span>
                          <div class="desc sec">
                            {{ product.moreDetails.kilometers }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.length != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Length</span>
                          <div class="desc sec">
                            {{ product.moreDetails.length }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.brand != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Brand</span>
                          <div class="desc sec">
                            {{ product.brand }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.make != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Make</span>
                          <div class="desc sec">
                            {{ product.moreDetails.make }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.manufacturer != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Manufacturer</span>
                          <div class="desc sec">
                            {{ product.moreDetails.manufacturer }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.mechanical_condition != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Mechanical Condition</span>
                          <div class="desc sec">
                            {{ product.moreDetails.mechanical_condition }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.model != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Model</span>
                          <div class="desc sec">
                            {{ product.moreDetails.model }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.regional_specs != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Regional Specs</span>
                          <div class="desc sec">
                            {{ product.moreDetails.regional_specs }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.transmission_type != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Transmission type</span>
                          <div class="desc sec">
                            {{ product.moreDetails.transmission_type }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.usage != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Usage</span>
                          <div class="desc sec">
                            {{ product.moreDetails.usage }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.warranty != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Warranty</span>
                          <div class="desc sec">
                            {{ product.moreDetails.warranty }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.wheels != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Wheels</span>
                          <div class="desc sec">
                            {{ product.moreDetails.wheels }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-sm-4 fl list_height"
                        v-if="product.moreDetails.year != ''"
                      >
                        <div class="outer-box typeFor sec">
                          <span>Year</span>
                          <div class="desc sec">
                            {{ product.moreDetails.year }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="full-width advDetails">
                    <h4>DESCRIPTION</h4>
                    <div class="content-area">
                      <p class="desc-txt" v-html="product.information">
                        <!-- {{ atob(product.information) }} -->
                      </p>
                    </div>
                  </div>

                  <div class="full-width advDetails">
                    <h4>Extras</h4>
                    <div class="content-area">
                      <ul class="amty-listStyle">
                        <li
                          class="amenitiesIn mob_width"
                          v-for="(extra, index) in product.moreDetails
                            .auto_features"
                          :key="index"
                        >
                          <span><i class="material-icons">done</i></span>
                          {{ extra }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="full-width advDetails">
                    <h4>Location map</h4>
                    <div class="content-area location-map">
                      <GoogleMap
                        :latitude="product.latitude"
                        :longitude="product.longitude"
                      />
                    </div>
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
    </div>
  </div>
</template>
<script>
import GoogleMap from "../../../services/map";
import singleSlider from "../../../ctcomponents/gridSlider1";
import WidgetSlider from "../productImage";
import Supplier from "../../dsmarket/widgetSuplierCard";
import { mapState } from "vuex";
import breadcrumb from "../breadCrumb";
export default {
  components: {
    singleSlider,
    WidgetSlider,
    GoogleMap,
    Supplier,
    breadcrumb
  },

  data () {
    return {
      dataIsLoaded: false,
      markers: [],
      showLoader: false,
      images: {
        thumbs: [],
        normal_size: [],
        large_size: []
      }
    };
  },

  computed: {
    ...mapState({
      product: state => state.store.serviceDetail
    })
  },
  created () {
    this.showLoader = true;
    const productId = atob(this.$route.params.autoId);
    this.$store
      .dispatch("serviceDetails", productId)

      .then(response => {
        this.showLoader = false;
        this.dataIsLoaded = true;
      })
      .catch(error => console.log(error));
  },

};
</script>
<style scoped>
.listedBy {
  margin-top: 25px;
}
.row_auto {
  margin-left: 0px;
  margin-right: 0px;
}
.row.line .type {
  text-transform: capitalize;
  font-weight: bold;
}
.page-padd-cmn {
  padding-top: 10px;
  padding-bottom: 2.2em;
  float: left;
  width: 100%;
}
.wrapper_auto_left {
  background-color: #fff;
  padding-right: 0px;
  overflow: hidden;
  padding-bottom: 20px;
}
.price {
  font-size: 21px;
  font-family: "ProximaBold";
  color: #545766;
  line-height: 1.4;
  margin-right: 0.2em;
}
.small-loc {
  font-size: 15px;
}
.small-loc i {
  vertical-align: middle;
  margin-right: 0.3em;
}

.payment ul li label {
  font-weight: 500;
  padding-right: 10px;
  float: left;
  font-size: 13px;
  color: #535665;
  margin-top: 2px;
}

.payment .typevalue {
  font-weight: 600;
  font-size: 13px;
  margin-right: 6px;
  color: #545766;
}
.advDetails .productSpecs {
  font-size: 15px;
  color: #555555;
}
.advDetails .productSpecs .type {
  font-weight: 500;
  font-size: 13px;
}
/* .advDetails .productSpecs .row {
  margin-bottom: 0.625rem;
} */
.row.line {
  font-size: 13px;
  align-items: center;
}
.autoListSummary > .col-md-6 {
  margin-bottom: 0.5em;
  align-items: center;
  align-self: center;
}
.row.line .sec {
  display: inline-flex;
  line-height: 1.2;
}
.section-btm {
  margin-top: 0em;
}
.content-area {
  margin-bottom: 1.5em;
}
.desc-txt {
  line-height: 22px;
  font-weight: 400;
  color: #272c3f;
}
.location-map {
  height: auto;
  position: relative;
  overflow: hidden;
  margin-top: -10px;
}
.location-map iframe {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgb(229, 227, 223);
}
.dealer.car {
  padding: 5px 0 5px 2px;
  border-bottom: 1px solid #eee;
}
.agentWrap .button-wrap {
  margin: auto;
  margin-left: 0px;
  margin-top: 7px;
}
.agentWrap .button-wrap .btn-act {
  min-width: 85px;
  border-radius: 3px;
  height: 30px;
  margin-right: 5px;
  font-size: 12px;
}
.agentWrap .button-wrap .btn-act i {
  margin-right: 0.1em;
  font-size: 18px;
}

.listing-summary.auto .prop-detail i {
  font-size: 2.9rem;
}
.row_features {
  margin-left: -5px;
  margin-right: -5px;
  margin-top: 0px;
}
.btn-act {
  border: 1px solid #eee;
  border-radius: 5px;
}
.wrp-tp-23 {
  padding-top: 1.1em;
}
.flex-bx-tp-1 {
  width: 100%;
  flex-flow: row;
}
.detail-col {
  position: relative;
  background-color: #fff;
  flex-flow: column;
  margin-right: 1.8em;
}
.product-info {
  padding: 15px;
  border-radius: 5px;
}
.div-1-100 {
  width: 100%;
}
.section-btm {
}
.advDetails {
  width: 100%;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 100%;
  flex: 1 0 100%;
  padding: 16px;
  background: #fff;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  overflow: hidden;
}
.stickHead {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 1em;
  color: #535665;
}
.payment {
  margin-top: 0.9em;
}
.labelFor {
  color: #535665;
  font-size: 13px;
}
.prop-detail span {
  font-size: 14px;
  font-weight: 600;
  color: #545766;
}
.wrapper_auto_left {
  border-radius: 5px;
}

.agentWrap {
  margin-top: 0px !important;
}
.advDetails h4 {
  font-weight: 500;
  text-transform: uppercase;

  margin-bottom: 0.9em;
  color: #545766;

  font-style: normal;
}
.amty-listStyle {
  padding-top: 4px;
}
.typeFor span {
  color: #7e808c;
  font-weight: 400;
  font-size: 13px;
  margin-bottom: 8px;
}
.desc.sec {
  font-size: 14px;
  color: #272c3f;
  font-weight: 500;
}

.rightSticky {
  /* position: sticky;
  top: 64px;
  bottom: 0;
  z-index: 2; */
  align-self: flex-start;
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
}
.product-name-tp-1 {
  display: inline;
  font-size: 1.77rem;
  line-height: 1.4;
  color: #272c3f;
  font-style: normal;
  font-weight: 600;
  margin: 0 0 5px;
  text-transform: capitalize;
}
.small-loc {
  font-size: 13px;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  color: #7e808c;
}
.small-loc i {
  vertical-align: middle;
  margin-right: 0.2em;
  margin-left: -4px;
}
.dealer {
  border-radius: 5px;
}
.dealer img {
  height: auto;
  margin-right: 0.1em;
}
.dealer .name {
  color: #272c40;
  font-weight: 400;
  font-size: 13px;
  margin-top: 9px;
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
.ds-mr-nav-main {
  display: none !important;
}
.list_height {
  min-height: 80px;
}
@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.autoOnly .preview-box img {
  position: relative !important;
}
@media screen and (max-width: 768px) {
  .desc.sec {
    font-size: 13px;
  }
  .row_auto {
    margin-left: -25px;
    margin-right: -25px;
  }
  .desc-txt {
    font-size: 13px;
  }
  .page-padd-cmn {
    margin-bottom: 30px;
  }

  .control-box {
    margin-top: 0px;
  }
  .product-name-tp-1 {
    font-size: 16px;
  }

  .price {
    font-size: 18px;
  }

  .dealer img {
    height: 68px;
    margin-right: 0.1em;
    width: 68px;
    border-radius: 100%;
    object-fit: fill;
  }

  .dealer.car {
    padding: 0px 0 3px 0px;
    border-bottom: 1px solid #eee;
  }

  .dealer .name {
    color: #272c40;
    font-weight: 400;
    font-size: 12px;
    margin-top: 7px;
    line-height: 18px;
  }

  .agentWrap .button-wrap .btn-act {
    font-size: 11px;
    margin-left: 0px;
  }

  .agentWrap .button-wrap {
    margin-top: 0px;
  }
  .listing-summary {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
    grid-gap: 5px;
    padding: 0 21px;
  }

  .labelFor {
    color: #535665;
    font-size: 12px;
    margin-bottom: 0px;
  }
  .prop-detail span {
    font-size: 13px;
    font-weight: 600;
    color: #545766;
  }

  .prop-detail .icon-wrap img {
    height: 28px;
  }
}

@media screen and (max-width: 600px) {
  .listedBy {
    margin-top: 10px;
  }
  .mb_pl {
    padding-left: 0px;
  }
  .row_auto {
    margin-left: 0px;
    margin-right: 0px;
  }
  .desc-box {
    width: 100%;
    padding-right: 0px;
  }

  .row_page-padd-cmn {
    margin-left: -5px;
    margin-right: -5px;
  }
  .wrp-tp-23 {
    padding-top: 0em;
  }
  .product-info {
    padding: 10px;
  }
  .wrapper_auto_left {
    -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
    box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
    padding-bottom: 10px;
  }

  .rightSticky {
    margin-top: 10px;
    -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
    box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
    padding: 10px;
  }

  .detail-sldr-bx .control .svg-inline--fa {
    display: none;
  }

  .prop-detail span {
    font-size: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .labelFor {
    font-size: 10px;
  }
  .prop-detail .icon-wrap img {
    height: 20px;
  }

  .prop-detail .icon-wrap {
    min-height: fit-content;
  }

  .prop-detail {
    padding-bottom: 0px;
    padding-top: 5px;
  }

  .listing-summary {
    grid-template-columns: repeat(auto-fill, minmax(69px, 1fr));
    grid-gap: 9px;
    padding: 0 15px;
  }

  .autoOnly .detail-sldr-bx .preview-box {
    min-height: 169px;
  }
  .detail-sldr-bx {
    padding: 10px;
  }

  .autoOnly .detail-sldr-bx .preview-box {
    min-height: 156px;
    margin-top: 10px;
    top: 0px;
  }
  .small-loc {
    font-size: 11px;
  }
  .small-loc i {
    font-size: 20px;
  }

  .product-name-tp-1 {
    font-size: 13px;
    float: left;
    display: block;
    margin-right: 8px;
  }

  .price {
    font-size: 14px;
  }
  .productSpecs {
    display: block;
  }

  .payment {
    margin-top: 5px;
  }

  .payment ul li label {
    padding-right: 5px;
    font-size: 11px;
  }
  .payment .typevalue {
    font-size: 11px;
    margin-right: 0px;
  }
  .stickHead {
    font-size: 12px;

    margin-bottom: 10px;
  }
  .dealer-info {
    margin-top: 0px !important;
  }
  .agentWrap .button-wrap .btn-act i {
    font-size: 16px;
  }
  .advDetails {
    padding: 10px;
  }

  .typeFor span {
    width: 50%;
    float: left;
    font-size: 11px;
    line-height: 15px;
  }
  .desc.sec {
    font-size: 11px;
    font-weight: 400;
    color: #272c3f;
    width: 50%;
    float: left;
    line-height: 15px;
  }
  .list_height {
    min-height: auto;
    padding-left: 5px;
    padding-right: 5px;
  }

  .typeFor {
    width: 100%;
    padding-bottom: 0px;
    border-bottom: 1px solid #eee;
    margin-bottom: 5px;
    margin-top: 2px;
    overflow: hidden;
  }

  .advDetails h4 {
    font-size: 12px;
  }
  .desc-txt {
    line-height: 20px;
    font-size: 11px;
  }
  .content-area {
    margin-bottom: 5px;
    height: auto;
  }

  .page-padd-cmn {
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 30px;
  }
  .mob_width {
    font-size: 12px !important;
  }
}

@media screen and (max-width: 300px) {
  .row_auto {
    margin-left: 0px;
    margin-right: 40px;
  }

  .dealer .name {
    font-size: 11px;
  }
  .md-button {
    min-width: 78px !important;
    margin-right: 7px !important;
  }
  .dealer img {
    margin-right: 0em;
  }

  .typeFor {
    padding-bottom: 2px;
  }
  .mob_width {
    width: 100% !important;
    font-size: 11px !important;
  }
}
</style>
