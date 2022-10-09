<template>
  <div>
    <div class="bravo-normal-offer hide-btm-padd">
      <router-link
        :to="{
          name: 'auto-details',
          params: {
            auto: slugName(auto.name),
            autoId: encodeProductId(auto.productid)
          }
        }"
        class="product-link"
      >
        <div class="ctlistItem forAuto" v-if="auto.images.length">
          <img
            :src="auto.images[0].file"
            :alt="auto.name"
            class="autoHeroImg"
          />
        </div>
      </router-link>
      <div class="main-section">
        <div class="descriptionWrap">
          <div class="productHead forBig">{{ auto.name }}</div>
          <div class="priceTag">
            <span class="sellingCurrency">{{
              currencySymbol(100, auto.currency)[0]
            }}</span>
            <div class="sellingPrice">
              {{ currencySymbol(auto.unitprice, auto.currency)[1] }}
            </div>
          </div>
          <div v-if="moreDetails != null">
            <div class="optionLine muted" v-if="moreDetails(auto) != null">
              {{ moreDetails(auto).address }},{{
                moreDetails(auto).location_area
              }},{{ moreDetails(auto).location_city }} -
              {{ auto.moreDetails.location_country }}
            </div>
            <div class="optionLine muted" v-else>N / A</div>

            <div class="smallSummary">
              <div class="optionLine" v-if="moreDetails(auto) != null">
                <span class="icoWrap"
                  ><img src="../autos/km.png" class="kmIcon"
                /></span>
                <div class="resultIn">
                  {{ moreDetails(auto).kilometers }}
                  <span>km</span>
                </div>
              </div>
              <div class="optionLine" v-else>
                <span class="icoWrap"
                  ><img src="../autos/km.png" class="kmIcon"
                /></span>
                <div class="resultIn">N / A</div>
              </div>
              <div class="optionLine" v-if="moreDetails(auto) != null">
                <span class="icoWrap"
                  ><img src="../autos/fuel.png" class="fuelIcon"
                /></span>
                <div class="resultIn">
                  {{ moreDetails(auto).fuel_type }}
                </div>
              </div>
              <div class="optionLine" v-else>
                <span class="icoWrap"
                  ><img src="../autos/fuel.png" class="fuelIcon"
                /></span>
                <div class="resultIn">N / A</div>
              </div>
              <div class="optionLine" v-if="moreDetails(auto) != null">
                <span class="icoWrap"><img src="../autos/trans.png"/></span>
                <div class="resultIn">
                  {{ moreDetails(auto).transmission_type }}
                </div>
              </div>
              <div class="optionLine" v-else>
                <span class="icoWrap"><img src="../autos/trans.png"/></span>
                <div class="resultIn">N / A</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btnwrap">
      <div class="cartbtnBig">
        <router-link
          :to="{
            name: 'auto-details',
            params: {
              auto: slugName(auto.name),
              autoId: encodeProductId(auto.productid)
            }
          }"
        >
          <md-button class="md-accent">View Details</md-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ListAuto",
  props: ["auto"],
  data() {
    return {};
  },
  computed: {
    moreDetails() {
      return auto => auto.moreDetails;
    },
    encodeProductId() {
      return productId => btoa(productId);
    },
    slugName() {
      return name => this.$helpers.slugify(name);
    }
  }
};
</script>
<style scoped>
.cartbtnBig button {
  border: none;
  height: 33px;
  width: 100%;
  margin-top: 0.5em;
  color: rgba(255, 87, 34, 0.65) !important;
  background: rgba(255, 87, 34, 0.1);
}

.extra-ftr-icn {
  font-size: 14px;
  position: relative;
  top: 2px;
  margin-right: 10px;
}
.bravo-offer-price,
.bravo-offer-moq {
  text-align: left;
}
.priceTag {
  padding-bottom: 5px;
  margin-top: 5px;
}
.muted {
  font-size: 1.23rem;
  color: #888;
}
.optionLine i {
  min-width: 26px;
  min-height: 25px;
}
.btnwrap {
  padding: 0 15px;
  margin-bottom: 10px;
}
.hide-btm-padd {
  padding-bottom: 10px;
}
.listactiveBox .descriptionWrap {
  margin-top: 1.5em;
}
.icoWrap {
  position: relative;
  display: flex;
  width: 16px;
  margin-right: 10px;
}
.resultIn {
  position: relative;
  font-weight: 500;
  color: #222222;
}
.optionLine {
  margin-bottom: 5px;
}
.icoWrap img {
  height: 20px;
}
.smallSummary {
  margin-top: 11px;
}
.kmIcon {
  height: 14px !important;
}
.fuelIcon {
  position: relative;
  left: 0px;
}
.autoHeroImg {
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  opacity: 1;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
}
.forAuto {
  min-height: 131px;
}

@media screen and (max-width: 600px) {
  .forAuto {
    min-height: fit-content;
    margin-bottom: 10px;
  }
}
</style>
