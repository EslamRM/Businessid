<template>
  <div class="bravo-normal-offer">
    <div class="main-section">
      <div class="data-image" v-if="service.images.length">
        <router-link
          :to="
            '/service-details/' +
              slugName(service.name) +
              '/' +
              encodeProductId(service.productid)
          "
        >
          <img
            :src="service.images[0].file"
            :alt="service.name"
            class="fitCover tpRadius"
          />
        </router-link>
      </div>
      <div class="descriptionWrap services">
        <div class="productHead mt-2" v-if="service.name">
          {{ service.name }}
        </div>
        <div class="optionLine">
          <i><img src="./map.png" width="22px"/></i>
          45 Regent Street, Dubai, Uae
        </div>
        <div class="optionLine">
          <i><img src="./call.png" width="22px"/></i>
          052525225
        </div>
      </div>
      <div class="btnwrap">
        <div class="cartbtnBig">
          <router-link
            :to="
              '/service-details/' +
                slugName(service.name) +
                '/' +
                encodeProductId(service.productid)
            "
          >
            <md-button class="md-accent">View Details</md-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListService",
  props: ["service"],
  data() {
    return {};
  },
  computed: {
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
.bravo-offer-price {
  font-size: 1.23rem;
  color: #565656;
  line-height: 1.3;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin-bottom: 8px;
  word-wrap: normal;
  /* height: 38px; */
}
.bravo-offer-moq {
  font-size: 12px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: normal;
  height: 35px;
}
.list-tp-services {
  font-size: 12px;
  color: #191919;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: normal;
  height: 20px;
  font-weight: 500;
  margin-top: 5px;
  text-align: left;
}
.listactiveBox .services .fitCover {
  object-fit: cover;
}
.bravo-offer-image {
  display: none;
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
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  opacity: 1;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  min-height: 151px;
}
.tpRadius {
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}
.descriptionWrap {
  padding: 15px;
}
.btnwrap {
  padding: 11px 15px;
}
.descriptionWrap.services .optionLine {
  padding-bottom: 3px;
}
</style>
