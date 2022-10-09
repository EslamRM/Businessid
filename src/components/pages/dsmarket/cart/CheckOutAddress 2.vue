<template>
  <div class="addressIn">
    <!-- <input
      type="radio"
      id="address2"
      name="address2"
      :value="address.id"
      v-model="addressbox"
      @input="$emit('address-selected', $event.target.value)"
    /> -->
    <!-- <md-radio
      type="radio"
      id="address2"
      name="address2"
      :value="address.id"
      v-model="addressbox"
      @input="$emit('address-selected', $event.target.value)"
    /> -->
    <label for="address2">
      <div
        class="addressboxHead"
        v-if="address.status == 2 && type==='checkout'"
      >
        <span>Primary Address</span>
        <md-radio
          style="margin: 0px"
          type="radio"
          id="address2"
          name="address2"
          :value="address.id"
          v-model="addressbox"
          @input="$emit('address-selected', $event.target.value)"
        />
      </div>
      <div class="address">
        <div class="innerContainer latlng">
          <div class="addressLabelWrapper">
            <div class="addressLabel">
              <span class="material-icons">location_on</span>
            </div>
            <div class="wrapperClass addressListToolTip">
              <div class="tooltipContainer">
                <div class="filtertoggleboxBtn">
                  <span class="material-icons">more_horiz</span>
                </div>

                <div class="dropdown-menu switching">
                  <div class="switchingCnt">
                    <button
                      class="md-button md-theme-default"
                      v-if="address.status != 2 && type==='checkout'"
                      @click="$emit('address-selected', address.id)"
                    >
                      <img
                        src="./map-check.png"
                        class="default-ico"
                      />
                      <span>Set as Default</span>
                    </button>
                    <!-- <router-link :to="{
                        name: 'editAddress',
                        query: { addressid: address.id },
                      }"> -->
                    <button
                      class="md-button md-theme-default"
                      @click="$emit('edit-address', address.id)"
                    >
                      <img src="./editpencil.png" />
                      <span>Edit</span>
                    </button>
                    <!-- </router-link> -->

                    <button
                      class="md-button md-theme-default"
                      @click="$emit('delete-address', address.id)"
                    >
                      <img src="./trash.png" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="addressDetailsContainer">
            <div class="addressRow">
              <span class="addressColumn addressColumnLeft">Name</span>
              <span class="addressColumn fullName">
                {{ address.contactname }}
              </span>
            </div>
            <div class="addressRow">
              <span class="addressColumn addressColumnLeft">Address</span>
              <div class="addressColumn fullAddress">
                {{ address.roomno }}, {{ address.building }},
                <span v-if="address.street != ''">{{ address.street }}</span>
                <span v-if="address.landmark != ''">
                  {{ address.landmark }}
                </span>
                {{ address.city }} -
                {{ address.country }}
              </div>
            </div>
            <div class="addressRow">
              <span class="addressColumn addressColumnLeft">Phone Number</span>
              <div class="addressColumn phoneNoWrapper verifiedLabel">
                <span class="phoneNumber">{{ address.contactnumber }}</span>
                <div class="verificationStatus">
                  <i
                    class="icon icon-radio-checked check"
                    style="color: rgb(64, 69, 83); font-size: 13px"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>
<script>
export default {
  props: ["address", "addressbox", "type"],
  props: {
    address: {},
    addressbox: {},
    type: {
      type: String,
      default: 'checkout'
    }
  },
  // data () {
  //   return {
  //     addressbox: ""
  //   };
  // }
};
</script>
<style scoped>
.address {
  line-height: 1.5;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 2px 0px;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  border-style: solid;
  padding: 11px;
  border-color: rgb(226, 229, 241);
  border-image: initial;
  border-radius: 2px;
}
.addressLabelWrapper {
  font-weight: 600;
  font-size: 1.16666rem;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-bottom: 11px;
}
.addressLabel {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.addressLabel .type {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}
.addressLabel span {
  color: #71819b;
  font-size: 21px;
}
.wrapperClass {
  line-height: 1;
  text-align: initial;
  position: relative;
}
.tooltipContainer {
  position: relative;
}
.mapAddressHolder {
  max-width: 650px;
  width: 100%;
}
.cart-wrap {
  flex-flow: row;
  display: flex;
  width: 100%;
}
.cart-head {
  color: #191919;
  font-size: 1.11em;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  /* border-bottom: 2px solid #eee; */
}
.btnSmall {
  height: 29px;
  border: 1px solid #f47320;
  justify-content: center;
  align-items: center;
  display: flex;
  text-transform: capitalize;
  font-size: 13px;
  padding-left: 3px;
}
.btnSmall span {
  font-size: 20px;
}
.cart-wrap section:nth-child(1) {
  flex-grow: 1;
  height: 100%;
  padding: 0;
}
.cart-wrap section {
  display: flex;
  flex-flow: column;
  border-bottom: 0;
}
.cart-wrap section:nth-child(2) {
  position: sticky;
  top: 64px;
  bottom: 0;
  z-index: 2;
  align-self: flex-start;
  margin: 0px 0px 21px 21px;
  background-color: rgb(247, 249, 254);
  border-radius: 2px;
  padding-bottom: 0.55em;
}
.sectionFlow {
  width: 100%;
  background: #ffffff;
  margin-bottom: 2em;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}
.mapView {
  overflow: hidden;
  border-radius: 0px 0px 15px 15px;
}
.mapView iframe {
  height: 350px;
}
.address-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
}
.addressPreview {
  cursor: pointer;
  margin: 0.2em 0;
  width: 38.333%;
  padding-right: 13px;
}
.addressPreview .title {
  font-size: 15px;
  font-weight: 600;
  display: inline-flex;
  text-align: left;
  align-items: center;
}
.addressPreview .title i {
  color: #f47320;
  margin: 0 !important;
}
.addressLine {
  padding-left: 1.99em;
  font-size: 14px;
  line-height: 1.7;
  color: #777;
}
.payment-wrap {
  padding: 15px;
}
.payment-wrap .title {
  font-size: 14px;
  font-weight: 500;
  margin: 0.5em 0;
}
.muted {
  font-size: 13px;
  font-weight: 500;
  position: relative;
  top: 4px;

  color: rgba(0, 0, 0, 0.84);
}
.cvv {
  display: inline-flex;
  width: 129px;
  justify-content: center;
  align-items: center;
}
.cvv img {
  position: relative;
  top: 24px;
}
.creditcardWrap {
  margin: 1.1em 0;
  display: inline-block;
  width: 100%;
  border: 1px solid #f47320;
  padding: 0 15px;
  max-width: 351px;
}
.cart-listing .content .summary {
  vertical-align: top;
  flex: 0 0 301px;
  margin-left: auto;
  display: flex;
}
.summary .contentarea {
  /* border: 1px solid #ccc; */
  padding: 15px;
  width: 100%;
}
.summary .head {
  font-size: 1.11em;
  /* font-family: proxima-nova, sans-serif; */
  font-weight: 600;
  width: 100%;
  height: 43px;
  display: flex;
  align-items: center;
  padding-bottom: 1em;
  color: #555555;
}
.price-content .detail {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 14px;
}
.price-content .total {
  border-top: 1px dashed #e0e0e0;
  margin-bottom: 20px;
  font-weight: 600;
}
.price-content .total .detail {
  font-size: 16px;
}
.minimumOrderMsg {
  text-align: center;
  color: #ff5722;
  font-size: 13px;
  padding-bottom: 0.5em;
}
.cart-listing .content .price {
  font-size: 15px;
  color: #212121;
  font-weight: 600;
  line-height: 1.4;
  margin-top: 5px;
  width: 100%;
}
.proceedBig {
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
  font-weight: 500;
  font-size: 15px;
  height: 41px;
}
.cartProdcuts {
  width: 100%;
  display: inline-flex;
}
.cartProdcuts ul {
  width: 100%;
  grid-auto-rows: 85px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1.1em;
}
.imgHolder {
  flex: 0 0 65px;
  position: relative;
  width: 100%;
  background: #fff;
  background: #fff;
  align-items: center;
  display: flex;
  border-radius: 0.25em;
}
.description {
  padding: 0 24px 12px;
  line-height: 1.4;
  vertical-align: top;
  flex: 1 1;
  overflow: hidden;
  font-size: 13px;
  font-weight: 500;
}
.description .price {
  font-weight: 600;
}
.cartProdcuts ul li {
  width: 100%;
  display: inline-flex;
}
.cart-listing .content .link {
  text-align: center;
}
.cart-listing .content .link img {
  height: 100%;
  object-fit: contain;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
}
.cart-listing .content .description {
  padding: 0 24px 12px;
  vertical-align: top;
  min-height: 112px;
  flex: 1 1;
  overflow: hidden;
  /* max-width: 460px; */
}
.cart-listing .content .description .name {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
}
.cart-listing .content .description .option {
  display: block;
  color: #878787;
  font-size: 12px;
  margin-top: 5px;
}
.futureUse {
  font-size: 13px;
  height: 79px;
}
.ktPulse {
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  border-radius: 4px;
}
.map.kt-pulse__ring {
  border-color: #f47320;
}
.boxWrap {
  font-size: 13px;
  margin-top: 3px;
}
.radioAddressBar {
  width: 100%;
}

.radioAddressBar input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.radioAddressBar label {
  padding: 0px 0px;
  font-size: 16px;
  border: 1px solid #eee;
  border-radius: 4px;
  width: 100%;
  display: inline-block;
}

.radioAddressBar label:hover {
  border-color: #71819b;
  border-style: dashed;
  border-width: 2px;
}

.radioAddressBar input[type="radio"]:focus + label {
  border: 2px dashed #71819b;
}

.radioAddressBar input[type="radio"]:checked + label {
  border-color: #71819b;
  border-style: dashed;
  border-width: 2px;
}
.addressboxHead {
  padding: 9px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e9efff;
  background: #f7f9fe;
}
.dropdown-menu.switching {
  left: auto;
  right: 0px;
  width: 130px;
  height: 109px;
  vertical-align: top;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 9px 0px;
  padding: 14px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(226, 229, 241);
  top: 107%;
  padding: 0;
  position: absolute;
  z-index: 1;
  background: #fff;
  display: none;
}
.dropdown-menu.switching::before {
  border-color: transparent;
  border-bottom-color: #fff;
  border-style: dashed dashed solid;
  border-width: 0 8.5px 8.5px;
  position: absolute;
  right: 4.5px;
  top: -7.9px;
  z-index: 11;
  height: 0;
  width: 0;
  content: "";
}
.dropdown-menu.switching::after {
  border-color: transparent;
  border-style: dashed dashed solid;
  border-width: 0 8.5px 8.5px;
  position: absolute;
  right: 4.5px;
  z-index: 1;
  height: 0;
  width: 0;
  border-bottom-color: rgb(226, 229, 241);
  top: -9px;
  content: "";
}
.filtertoggleboxBtn span {
  font-size: 19px;
}
.addressRow {
  display: flex;
  margin-bottom: 0.55em;
}
.addressColumn {
  font-size: 13px;
}
.addressRow .addressColumnLeft {
  min-width: 110px;
  color: rgb(185, 185, 185);
}
.tooltipContainer:hover .dropdown-menu.switching,
.tooltipContainer:focus .dropdown-menu.switching {
  display: block;
}
.switchingCnt {
  width: 85%;
  margin: 0 auto;
  margin-top: 1em;
}
.switchingCnt button {
  height: 29px;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 100%;
  border-bottom: 1px solid #eeeeee;
  border-radius: 0;
  padding: 0.33em 0em;
  transition: opacity 0.4s ease-in-out;
}
.switchingCnt button:hover,
.switchingCnt button:focus {
  opacity: 0.85;
}
.switchingCnt button:last-child {
  border: none;
}
.switchingCnt button img {
  height: 16px;
}
.switchingCnt button span {
  margin-left: 0.23em;
  font-size: 12px !important;
  text-transform: capitalize;
}
.switchingCnt button::before {
  display: none;
}
.default-ico {
  height: 21px !important;
}
</style>
