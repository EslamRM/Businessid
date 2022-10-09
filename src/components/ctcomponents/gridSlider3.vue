<template>
  <div>
    <div class="bx-tp-1-prt smallCarouselWrap">
      <div class="bx-hd-1">
        <span>Recommended Products</span>
      </div>
      <div>
        <carousel
          :perPage="2"
          :autoplay="false"
          :autoplayHoverPause="true"
          :paginationSize="0"
          paginationActiveColor="#bf1d2e"
          paginationColor="#213a63"
          easing="linear"
          :loop="true"
          :navigationEnabled="true"
          navigationNextLabel="<div class='md-button md-theme-default smallCarousel'><i class='material-icons'>keyboard_arrow_right</i></div>"
          navigationPrevLabel="<div class='md-button md-theme-default smallCarousel prev'><i class='material-icons'>keyboard_arrow_left</i></div>"
        >
          <slide>
            <div class="grd-box-1-sldr">
              <div class="bravo-normal-offer">
                <div class="bravo-offer-image">
                  <div class="place"></div>
                  <router-link to="dsmarket/" class="product-link">
                    <div class="offer-image">
                      <img
                        class="inner-img smallCarousel"
                        :src="base_url_api + 'assets/uploads/11Jun2020155940_fXEV0IwAPx.blob'"
                        alt="../../assets/images/pr1.png"
                      />
                    </div>
                  </router-link>
                </div>
                <div class="main-section text-center">
                  <div class="bravo-offer-price text-center">Smart Watch</div>

                  <div class="bravo-offer-moq text-center">
                    <span class="bld-txt-1">Brand:</span>
                    Apple
                  </div>
                  <div class="bravo-offer-moq text-center">
                    <span class="bld-txt-1">AED:</span>
                    <i class="rateIn">N/A</i>
                  </div>
                  <div class="btnWrap">
                    <md-button class="md-accent btnRedOutline md-theme-default">Ask For Quotation</md-button>
                  </div>
                </div>
              </div>
            </div>
          </slide>
          <slide>
            <div class="grd-box-1-sldr">
              <div class="bravo-normal-offer">
                <div class="bravo-offer-image">
                  <div class="place"></div>
                  <router-link to="dsmarket/" class="product-link">
                    <div class="offer-image">
                      <img
                        class="inner-img smallCarousel"
                        src="../../assets/images/sld2.jpg"
                        alt="../../assets/images/pr1.png"
                      />
                    </div>
                  </router-link>
                </div>
                <div class="main-section text-center">
                  <div class="bravo-offer-price text-center">Sheo Pair</div>

                  <div class="bravo-offer-moq text-center">
                    <span class="bld-txt-1">Brand:</span>
                    Adidas
                  </div>
                  <div class="bravo-offer-moq text-center">
                    <span class="bld-txt-1">AED:</span>
                    <i class="rateIn">256</i>
                  </div>
                  <div class="btnWrap">
                    <md-button class="md-accent btnRedOutline md-theme-default">Ask For Quotation</md-button>
                  </div>
                </div>
              </div>
            </div>
          </slide>
          <slide>
            <div class="grd-box-1-sldr">
              <div class="bravo-normal-offer">
                <div class="bravo-offer-image">
                  <div class="place"></div>
                  <router-link to="dsmarket/" class="product-link">
                    <div class="offer-image">
                      <img
                        class="inner-img smallCarousel"
                        :src="base_url_api + 'assets/uploads/11Jun2020155940_fXEV0IwAPx.blob'"
                        alt="../../assets/images/pr1.png"
                      />
                    </div>
                  </router-link>
                </div>
                <div class="main-section text-center">
                  <div class="bravo-offer-price text-center">Smart Watch</div>

                  <div class="bravo-offer-moq text-center">
                    <span class="bld-txt-1">Brand:</span>
                    Apple
                  </div>
                  <div class="bravo-offer-moq text-center">
                    <span class="bld-txt-1">AED:</span>
                    <i class="rateIn">N/A</i>
                  </div>
                  <div class="btnWrap">
                    <md-button class="md-accent btnRedOutline md-theme-default">Ask For Quotation</md-button>
                  </div>
                </div>
              </div>
            </div>
          </slide>
          <slide>
            <div class="grd-box-1-sldr">
              <div class="bravo-normal-offer">
                <div class="bravo-offer-image">
                  <div class="place"></div>
                  <router-link to="dsmarket/" class="product-link">
                    <div class="offer-image">
                      <img
                        class="inner-img smallCarousel"
                        src="../../assets/images/sld4.jpg"
                        alt="../../assets/images/pr1.png"
                      />
                    </div>
                  </router-link>
                </div>
                <div class="main-section text-center">
                  <div class="bravo-offer-price text-center">Sheo Pair</div>

                  <div class="bravo-offer-moq text-center">
                    <span class="bld-txt-1">Brand:</span>
                    Adidas
                  </div>
                  <div class="bravo-offer-moq text-center">
                    <span class="bld-txt-1">AED:</span>
                    <i class="rateIn">256</i>
                  </div>
                  <div class="btnWrap">
                    <md-button class="md-accent btnRedOutline md-theme-default">Ask For Quotation</md-button>
                  </div>
                </div>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  data() {
    return {
      base_url_api: process.env.BASE_URL

    };
  },
  components: {
    Carousel,
    Slide
  }
};
</script>
<style scoped>
.bx-hd-1 {
  font-size: 15px;
  font-weight: 500;
  padding: 11px;
  display: flex;
  align-items: center;
  height: 35px;
  color: #444;
}
.bx-hd-1 span {
  top: 2px;
  position: relative;
}
.md-button {
  height: 24px;
  font-size: 11px;
  min-width: 20px;
  max-width: 100%;
}
.bravo-offer-price {
  font-size: 12px;
  line-height: 1.1;
  color: #191919;
}
.bravo-offer-moq {
  font-size: 12px;
  line-height: 1.4;
}
.bravo-normal-offer {
  padding: 5px;
}
.bravo-offer-image {
  margin-bottom: 5px;
}
.rateIn {
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  color: #444;
}
.bld-txt-1 {
  color: #9399ab;
}
.btnWrap {
  width: 91%;
  margin: 0 auto;
  margin-top: 6px;
}
</style>
