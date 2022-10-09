<template>
  <div>
    <div class="container_padding">
      <breadcrumb></breadcrumb>
    </div>
    <div class="row_page-padd-cmn">
      <div class="prdct-det-page-bx page-padd-cmn" v-if="dataIsLoaded">
        <div class="wrp-tp-23">
          <div class="container container_padding">
            <!-- <productDetailContent></productDetailContent> -->
            <div class="flex-bx-tp-1">
              <div class="row_properties">
                <div
                  class="div-2-auto wrapper_auto_left col-sm-12 col-md-7 col-xl-9 pl-0 fl"
                >
                  <div class="flex-bx-tp-1 product-info">
                    <div class="div-1-100">
                      <WidgetSlider
                        :product="product"
                        v-if="product"
                      ></WidgetSlider>
                    </div>
                  </div>
                  <div class="row_features">
                    <div class="listing-summary">
                      <div class="prop-detail">
                        <p class="labelFor">Type</p>
                        <div class="icon-wrap">
                          <img
                            src="../../dsmarket/properties/propert-type.png"
                          />
                        </div>
                        <span v-if="product.moreDetails.property_type=='Industrial for Rent'">Industrial</span>
                        <span v-if="product.moreDetails.property_type=='Office for Rent'">Office</span>
                        <span v-if="product.moreDetails.property_type=='Retail for Rent'">Retail</span>
                        <span v-if="product.moreDetails.property_type=='Staff Accommodation for Rent'">Staff Accommodation</span>
                        <span v-if="product.moreDetails.property_type=='Apartment/Flat for Rent'">Apartment</span>
                        <span v-if="product.moreDetails.property_type=='Villa/House for Rent'">Villa</span>
                        <span v-if="product.moreDetails.property_type=='Industrial for Sale'">Industrial</span>
                        <span v-if="product.moreDetails.property_type=='Office for Sale'">Office</span>
                        <span v-if="product.moreDetails.property_type=='Retail for Sale'">Retail</span>
                        <span v-if="product.moreDetails.property_type=='Staff Accommodation for Sale'">Staff Accommodation</span>
                        <span v-if="product.moreDetails.property_type=='Apartment/Flat for Sale'">Apartment</span>
                        <span v-if="product.moreDetails.property_type=='Villa/House for Sale'">Villa</span>
                      </div>
                      <div
                        class="prop-detail"
                        v-if="product.moreDetails.bedrooms != ''"
                      >
                        <p class="labelFor">Bedrooms</p>
                        <div class="icon-wrap">
                          <img
                            src="../../dsmarket/properties/bed.png"
                            class="bedroom"
                          />
                        </div>
                        <span>{{ product.moreDetails.bedrooms }}</span>
                      </div>
                      <div
                        class="prop-detail"
                        v-if="product.moreDetails.bathrooms != ''"
                      >
                        <p class="labelFor">Bathrooms</p>
                        <div class="icon-wrap">
                          <img
                            src="../../dsmarket/properties/bath.png"
                            class="bath"
                          />
                        </div>
                        <span>{{ product.moreDetails.bathrooms }}</span>
                      </div>
                      <div
                        class="prop-detail"
                        v-if="product.moreDetails.area_size != ''"
                      >
                        <p class="labelFor">size</p>
                        <div class="icon-wrap">
                          <img
                            src="../../dsmarket/properties/size.png"
                            class="size"
                          />
                        </div>
                        <span
                          >{{ product.moreDetails.area_size }}
                          {{ product.moreDetails.area_unit }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-5 col-xl-3 pr-0 fl mb_pl">
                  <div class="rightSticky">
                    <div
                      class="small-loc mb-2"
                      v-if="product.moreDetails.address != ''"
                    >
                      <i class="material-icons map-icn">room</i>
                      <span class="location-address">
                        {{ product.location_country }}
                        <i class="material-icons"> keyboard_arrow_right </i>
                        {{ product.location_city }}
                        <i class="material-icons"> keyboard_arrow_right </i>
                        {{ product.location_area }}
                        <i class="material-icons"> keyboard_arrow_right </i>
                        {{ product.moreDetails.address }}
                      </span>
                    </div>
                    <h4 class="product-name-tp-1">
                      {{ product.name }}
                    </h4>
                    <div class="price">
                      {{ product.currency }}
                      {{ product.unitprice | getDigitSeperateComa }}
                    </div>
                    <div class="full-width">
                      <div class="row productSpecs">
                        <div class="payment">
                          <ul>
                            <li>
                              <span
                                ><i class="material-icons">payments</i></span
                              >
                              <div class="pay-wrap">
                                <label>Payment Term:</label>
                                <div class="typevalue">
                                  {{ product.moreDetails.payment_term }}
                                </div>
                              </div>
                            </li>
                            <li>
                              <span><i class="material-icons">today</i></span>
                              <div class="pay-wrap">
                                <label>Payment Method:</label>
                                <div class="typevalue">
                                  {{ product.moreDetails.payment_method }}
                                </div>
                              </div>
                            </li>
                            <li v-if="product.moreDetails.no_of_cheques > 0">
                              <span><i class="material-icons">receipt</i></span>
                              <div class="pay-wrap">
                                <label>Number of checks:</label>
                                <div class="typevalue">
                                  {{ product.moreDetails.no_of_cheques }}
                                </div>
                              </div>
                            </li>
                            <!-- <li>
                        <div class="type1">Payment Plan:</div>
                        <div class="typevalue">
                          {{ product.moreDetails.payment_plan }}
                        </div>
                      </li>
                      <li>
                        <div class="type1">Payment Term:</div>
                        <div class="typevalue">
                          {{ product.moreDetails.payment_type }}
                        </div>
                      </li>
                      <li v-if="product.moreDetails.no_of_cheques > 0">
                        <div class="type1">Number of checks:</div>
                        <div class="typevalue">
                          {{ product.moreDetails.no_of_cheques }}
                        </div>
                      </li> -->
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
                              {{ product.moreDetails.contact_name }}
                              - (
                              <a
                                :href="
                                  'tel:' + product.moreDetails.contact_number
                                "
                                type="tel"
                                class="defaultColor"
                              >
                                {{ product.moreDetails.contact_number }}</a
                              >)
                              <div class="button-wrap">
                                <md-button class="md-raised btn-act">
                                  <i
                                    class="material-icons add-to-cart-icn hero-orange-clr"
                                    >mail_outline</i
                                  >
                                  EMAIL
                                </md-button>
                                <md-button class="md-raised btn-act">
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

                <div class="col-sm-12 section-btm p-0 fl">
                  <div class="full-width advDetails">
                    <h4>Details</h4>
                    <div class="productSpecs">
                      <div>
                        <div class="desc-box line">
                          <div class="outer-box typeFor sec">
                            <span>Property Purpose</span>
                            <div class="desc sec">
                              {{ product.moreDetails.property_purpose }}
                            </div>
                          </div>
                        </div>
                        <div class="desc-box line">
                          <div class="outer-box typeFor sec">
                            <span>Property type</span>

                            <div class="desc sec">
                              {{ product.moreDetails.property_category }}
                            </div>
                          </div>
                        </div>

                        <div class="desc-box line">
                          <div class="outer-box typeFor sec">
                            <span>Property category</span>

                            <div class="desc sec">
                              {{ product.moreDetails.property_type }}
                            </div>
                          </div>
                        </div>
                        <div class="desc-box line">
                          <div class="outer-box typeFor sec">
                            <span>Furnished</span>

                            <div class="desc sec">
                              {{ product.moreDetails.is_furnished }}
                            </div>
                          </div>
                        </div>
                        <div class="desc-box line" 
                        v-if="product.moreDetails.attached_kitchen != ''">
                          <div class="outer-box typeFor sec">
                            <span>Attached Kitchen</span>

                            <div class="desc sec">
                              {{ product.moreDetails.attached_kitchen }}
                            </div>
                          </div>
                        </div>
                        <div class="desc-box line">
                          <div class="outer-box typeFor sec">
                            <span>Parking Available</span>

                            <div class="desc sec">
                              {{ product.moreDetails.is_parking }}
                            </div>
                          </div>
                        </div>
                        <!-- <div class="row line">
                      <div class="col-md-5 type sec">Price per sqft:</div>
                      <div class="col-md-7 desc sec">AED 1,022.60</div>
                    </div> -->
                      </div>
                      <!-- <div class="col-md-6">
                    <div class="row line">
                      <div class="col-md-5 type sec">Bedrooms:</div>
                      <div class="col-md-7 desc sec">2</div>
                    </div>
                    <div class="row line">
                      <div class="col-md-5 type sec">Price per sqft:</div>
                      <div class="col-md-7 desc sec">AED 1,022.60</div>
                    </div>
                     <div class="row line">
                      <div class="col-md-5 type sec">Valid to:</div>
                      <div class="col-md-7 desc sec">5-3-2020</div>
                    </div>
                  </div> -->
                    </div>
                  </div>

                  <div class="full-width advDetails">
                    <h4>DESCRIPTION</h4>
                    <div class="content-area">
                      <p class="desc-txt" v-html="product.information"></p>
                    </div>
                  </div>

                  <div class="full-width advDetails">
                    <h4>AMENITIES</h4>
                    <div class="content-area">
                      <ul class="amty-listStyle">
                        <li
                          class="amenitiesIn mob_width"
                          v-for="(amenity, index) in product.moreDetails
                            .property_amenities"
                          :key="index"
                        >
                          <span><i class="material-icons">done</i></span>
                          {{ amenity }}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="full-width advDetails">
                    <h4>Location map</h4>
                    <div
                      class="small-loc mt-4"
                      v-if="product.moreDetails.address != ''"
                    >
                      <i class="material-icons map-icn">room</i>
                      <span class="location-address">
                        {{ product.location_country }}
                        <i class="material-icons"> keyboard_arrow_right </i>
                        {{ product.location_city }}
                        <i class="material-icons"> keyboard_arrow_right </i>
                        {{ product.location_area }}
                        <i class="material-icons"> keyboard_arrow_right </i>
                        {{ product.moreDetails.address }}
                      </span>
                    </div>
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
      </div>
      <div class="loader" v-else>
        <div class="circle-loader" v-if="showLoader"></div>
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
      product: state => state.store.propertyDetails
    })
  },
  created () {
    console.log(this.product);
    this.showLoader = true;
    const productId = atob(this.$route.params.id);
    this.$store
      .dispatch("propertyDetails", productId)

      .then(response => {
        this.showLoader = false;
        this.dataIsLoaded = true;
      })
      .catch(error => console.log(error));
  }
};
</script>
<style scoped>
.row_properties {
  margin-left: 0px;
  margin-right: 0px;
}
.cal-btn .md-ripple .md-button-content {
  align-items: center;
  display: flex;
}
.product-name-tp-1 {
  font-size: 16px;
  line-height: 1.4;
  color: #272c3f;
  font-style: normal;
  font-weight: 600;
  margin: 0 0 5px;
  text-transform: capitalize;
  margin-top: 8px;
  display: block;
  margin-bottom: 0px;
}
.row_features {
  margin-left: -5px;
  margin-right: -5px;
  margin-top: 0px;
}
.wrapper_auto_left {
  background-color: #fff;
  padding-right: 0px;
  overflow: hidden;
  padding-bottom: 20px;
  border-radius: 5px;
}

.price {
  font-size: 18px;
  font-family: "ProximaBold";
  color: #545766;
  line-height: 1.4;
  margin-right: 0.2em;
}
.payment ul li label {
  font-weight: 500;
  padding-right: 10px;
  float: left;
  font-size: 13px;
  color: #535665;
  margin-top: 2px;
}
.prop-detail i {
  display: inline-block;
  font-size: 3.5rem;
  vertical-align: middle;
  color: #888;
}
.small-loc {
  font-size: 13px;
  text-transform: capitalize;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #7e808c;
}
.small-loc i {
  vertical-align: middle;
  margin-right: 0.2em;
  margin-left: -4px;
  font-size: 15px;
}
.payment {
  margin-top: 0.9em;
}
.advDetails h4 {
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 0.9em;
  color: #545766;
  font-style: normal;
}
.typeFor span {
  color: #7e808c;
  font-weight: 400;
  font-size: 13px;
  margin-bottom: 8px;
}
.advDetails .productSpecs {
  font-size: 15px;
  color: #555555;
}
.desc.sec {
  font-size: 14px;
  color: #272c3f;
  font-weight: 500;
}

.advDetails .productSpecs .type {
  font-weight: 500;
}
.advDetails .productSpecs .row {
  margin-bottom: 1.3rem;
}
.row.line {
  font-size: 14px;
  color: #555555;
}
.row.line .sec {
  display: inline-flex;
}
.section-btm {
  margin-top: 0px;
}
.content-area {
  margin-bottom: 1.5em;
}
.desc-txt {
  line-height: 22px;
  font-weight: 400;
  color: #272c3f;
}
.amenities-list .amenities {
  background: #fff;
  margin-right: 0.3em;
  border-radius: 4rem;
  border: solid 1px #e0e0e0;
  box-sizing: border-box;
  color: #2d2f43;
  display: inline-block;
  font-size: 11px;
  height: 2.99rem;
  line-height: 2.99rem;

  padding: 0 0.77775rem;
  position: relative;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  text-transform: uppercase;
  -webkit-transition: color 0.2s;
  letter-spacing: 1p;
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
.page-padd-cmn {
  padding-top: 10px;
  padding-bottom: 2.2em;
  float: left;
  width: 100%;
}
.payment .type1 {
  font-size: 0.9em;
  font-weight: 500;
  color: #888;
  margin-right: 0.7em;
}

.wrp-tp-23 {
  padding-top: 1.1em;
}
.flex-bx-tp-1 {
  width: 100%;
  flex-flow: row;
}
.product-info {
  padding: 15px;
}
.detail-col {
  position: relative;
  background-color: #fff;
  flex-flow: column;
  margin-right: 1.8em;
}
.div-1-100 {
  width: 100%;
}
.detail-pg-sldr {
  padding: 10px;
}
.ch-tittle-wrap {
  padding: 7px 0px;
  background: #fff;
}
.location-address {
  color: #535665;
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

.defaultColor {
  color: rgba(0, 0, 0, 0.87) !important;
}
.listedBy {
  margin-top: 25px;
}
.widget-supplier-card {
  margin-top: 5em;
  display: block;
}
.map-icn {
  color: #ff5722;
  font-size: 23px !important;
}
.stickHead {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 1em;
  color: #535665;
}

.agentWrap {
  margin-top: 0px !important;
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
  box-shadow: none;
}
.agentWrap .button-wrap .btn-act i {
  margin-right: 0.1em;
  font-size: 18px;
}

.dealer .name {
  color: #272c40;
  font-weight: 400;
  font-size: 13px;
  margin-top: 9px;
}
.dealer img {
  height: auto;
  margin-right: 0.1em;
}

.dealer.car {
  padding: 5px 0 5px 2px;
  border-bottom: 1px solid #eee;
  border-radius: 5px;
}

.btn-act {
  border: 1px solid #eee;
  border-radius: 5px;
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
.amty-listStyle {
  padding-top: 4px;
}
@media screen and (max-width: 768px) {
  .row_properties {
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
    font-size: 10px;
    margin-bottom: 0px;
  }
  .prop-detail span {
    font-size: 11px;
    font-weight: 600;
    color: #545766;
  }

  .prop-detail .icon-wrap img {
    height: 28px;
  }
  .desc.sec {
    font-size: 13px;
  }
}

@media screen and (max-width: 600px) {
  .row_features {
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
  }
  .listedBy {
    margin-top: 10px;
  }
  .mb_pl {
    padding-left: 0px;
  }
  .row_properties {
    margin-left: 0px;
    margin-right: 0px;
  }
  .wrapper_auto_left {
    -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
    box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
    padding-bottom: 10px;
  }
  .desc-box {
    width: 100%;
    padding-right: 0px;
    margin-bottom: 0px;
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

  .prop-detail .icon-wrap {
    min-height: fit-content;
  }

  .prop-detail {
    padding-bottom: 0px;
    padding-top: 5px;
  }

  .listing-summary {
    grid-template-columns: repeat(auto-fill, minmax(69px, 1fr));
    grid-gap: 3px;
    padding: 0 10px;
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
    margin-top: 0px !important;
    margin-bottom: 8px;
  }
  .small-loc i {
    font-size: 20px;
  }

  .product-name-tp-1 {
    font-size: 12px;
    float: left;
    display: block;
    margin-right: 8px;
    margin-top: 3px;
  }

  .price {
    font-size: 13px;
    margin-top: 7px;
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

@media screen and (max-width: 420px) and (min-width: 400px) {
  .listing-summary {
    grid-template-columns: repeat(auto-fill, minmax(76px, 1fr));
  }
  .prop-detail .icon-wrap img {
    height: 29px;
  }
}
@media screen and (max-width: 360px) {
  .prop-detail span {
    font-size: 9px;
  }
}
@media screen and (max-width: 300px) {
  .row_properties {
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
