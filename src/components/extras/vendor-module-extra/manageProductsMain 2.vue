<template>
  <div>
    <!-- <div class="bx-tp-22 pd-10-all">
      <span class="txt-stl-1">Manage Your Products Products</span>
      <span class="flt-rght">
        <i
          class="material-icons cursor-pointer"
          :class="{active:requestForItemStyle}"
          @click="requestForItemStyle=!requestForItemStyle"
        >view_headline</i>
        <i
          class="material-icons cursor-pointer"
          :class="{active:requestForItemStyle}"
          @click="requestForItemStyle=!requestForItemStyle"
        >view_list</i>
      </span>
    </div> -->
    <div>
      <div class="lst-bx-tp-1">
        <div class="pd-10-all">
          <div class="lst-bx-tp-1-cnt">
            <div class="lst-bxing-1">
              <div class="container-floor2">
                <div class="listingWrap">
                  <div class="listItemShow">
                    <div class="offer-item">
                      <div class="itemIn">
                         <router-link
                          class="full-width"
                          to="./"
                        >

        <div class="bravo-offer-image">
          <div class="ctlistItem">
            <img :src="base_url_api + 'assets/uploads/07Jun2020232247_TNuQQLXkLM.blob'"
              class="fitItem"
            />
          </div>
        </div>
        <div class="main-section contentWrapProduct">
          <span class="product-brand">Apple Watch 5S</span>
          <div class="product-name"></div>
          <div class="price-wrap">

            <!-- <div class="bravo-offer-moq ">
              <span class="sellingCurrency">{{ product.currency }} </span>
              <span class="sellingPrice" v-if="product.offerprice > 0">{{
                product.offerprice | getDigitSeperateComa
              }}</span>
              <span class="sellingPrice" v-else>{{
                product.unitprice | getDigitSeperateComa
              }}</span>
            </div> -->

            <div class="bravo-offer-moq offer">
             AED
              <span class="offerPrice"></span>
            </div>
          </div>
          <div class="offer-discount">
            <span class="offer-discount-content">
              20% OFF
            </span>
          </div>
        </div>
      </router-link>

                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      base_url_api: process.env.BASE_URL,
      requestForItemStyle: false,

    };
  },
  components: {

  }
};
</script>
<style scoped>
.lst-bx-tp-1{
  width: 100%;
}
.md-button-content {
  display: flex;
  align-items: center;
}
.listingWrap{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>
