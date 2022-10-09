<template>
  <div class="bravo-normal-offer">
    <router-link
      :to="
        '/property-detail/' +
          slugName(property.name) +
          '/' +
          encodeProductId(property.productid)
      "
      class="product-link"
    >
      <div class="data-image" v-if="property.images.length">
        <img
          :src="property.images[0].file"
          :alt="property.name"
          class="fitCover tpRadius"
        />
      </div>
    </router-link>
    <div class="main-section">
      <div class="descriptionWrap property">
        <div class="productHead forBig">{{ property.name }}</div>
        <div class="priceTag">
          <span class="sellingCurrency">{{ property.currency }}</span>
          <div class="sellingPrice">
            {{ property.unitprice | getDigitSeperateComa }}
          </div>
        </div>
        <div class="optionLine" v-if="properties(property) != null">
          <span class="address" v-if="property.moreDetails.address != ''">
            <span style="color:#8e8e93;"
              >{{ property.moreDetails.address }}
            </span></span
          >
          <!-- <span v-if="property.moreDetails.location_city != ''">
          {{ property.moreDetails.location_city }}, </span
        ><span v-if="property.moreDetails.location_country != ''">
          {{ property.moreDetails.location_country }}
        </span> -->
        </div>
        <div class="optionLine" v-else>
          N / A
        </div>
        <div class="specsInfo">
          <div
            class="optionLine withIcon col-sm-12 fl p-0"
            v-if="properties(property) != null"
          >
            <img src="../../pages/dsmarket/properties/size.png" />{{
              property.moreDetails.area_size
            }}
            {{ property.moreDetails.area_unit }}
          </div>
          <div class="optionLine withIcon col-sm-12 fl p-0" v-else>
            <img src="../../pages/dsmarket/properties/size.png" />N /A
          </div>
          <div
            class="optionLine withIcon col-sm-12 fl p-0"
            v-if="properties(property) != null"
          >
            <img src="../../pages/dsmarket/properties/bed.png" />
            {{ property.moreDetails.bedrooms }}
          </div>
          <div class="optionLine withIcon" v-else>
            <img src="../../pages/dsmarket/properties/bed.png" />
            N / A
          </div>
          <div class="optionLine withIcon" v-if="properties(property) != null">
            <img src="../../pages/dsmarket/properties/bath.png" />
            {{ property.moreDetails.bathrooms }}
          </div>
          <div class="optionLine withIcon" v-else>
            <img src="../../pages/dsmarket/properties/bath.png" />
            N / A
          </div>
        </div>
      </div>
      <div class="btnwrap">
        <div class="cartbtnBig">
          <router-link
            :to="
              '/property-detail/' +
                slugName(property.name) +
                '/' +
                encodeProductId(property.productid)
            "
          >
            <md-button class="md-accent md-theme-default">
              View Details
            </md-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["property"],
  name: "PropertyList",
  data() {
    return {};
  },
  computed: {
    properties() {
      return property => property.moreDetails;
    },
    slugName() {
      return name => this.$helpers.slugify(name);
    },
    encodeProductId() {
      return productId => btoa(productId);
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
.inner-img {
  object-fit: cover !important;
}
.address {
  text-transform: capitalize;
  display: inline-flex;
  align-items: center;
}
.data-image {
  position: relative;
  width: 100%;
  display: table;
  height: 151px;
  background-size: auto;
  background-repeat: no-repeat;
}
.fitCover {
  opacity: 1;
  max-width: 100%;
  max-height: 200px;
  width: 100%;
  height: 100%;
  /* min-height: 290px; */
}
.tpRadius {
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}
.descriptionWrap {
  padding: 15px;
}
.descriptionWrap.property .optionLine i {
  min-width: 26px;
  min-height: 26px;
}
.priceTag {
  margin-top: 5px;
  padding-bottom: 5px;
}
.btnwrap {
  padding: 0 15px;
}
.listactiveBox .property .fitCover {
  object-fit: cover;
}
.listactiveBox .property .data-image {
  height: 175px;
}
.specsInfo .optionLine {
  display: inline-flex;
  margin-right: 1.25rem;
  vertical-align: middle;
}
.specsInfo .optionLine img {
  height: 25px;
  margin-right: 0.34em;
}
.sellingPrice {
  font-weight: bold;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
}
.optionLine.withIcon {
  font-weight: 500;
  color: #222222;
}
@media screen and (max-width: 600px) {
  .fitCover {
    max-height: 100%;
  }
}
</style>
