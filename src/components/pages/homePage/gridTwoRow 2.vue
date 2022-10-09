<template>
  <div>
    <div class="grd-two-row-bx">
      <div class="grd-two-row-bx-cnt">
        <div class="grd-tp-1-bx">
          <!-- <div class="grd-tp-1-bx-hdr">New Added Companies</div> -->
          <div class="grd-tp-1-bx-cntr">
            <div class="cmp-show-box">
              <h1 class="text-center">Certified Tradresvvvvvvvvvvvvvvvvvvvvvvvvvvvvv</h1>
              <!-- <carousel
                :perPage="7"
                :autoplay="false"
                :autoplayHoverPause="true"
                :paginationEnabled="false"
                easing="linear"
                :loop="true"
                :navigationEnabled="false"
                navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
                navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
                :speed="1500"
                :interval="2000"
                :autoplayTimeout="7000"
              >
                <slide>
                  <div class="comapnies-bx-wrp">
                    <div class="comapnies-bx-wrp-img">
                      <img class="cmp-logo-tp-1" src="../../../assets/images/dp-160-160.jpg" alt>
                    </div>
                    <div class="companies-name-txt">Ijas Nechiparamban</div>
                    <div class="companies-prof-txt">Ui Developer</div>
                    <md-button class="md-raised md-accent">Follow</md-button>
                  </div>
                </slide>
                <slide>
                  <div class="comapnies-bx-wrp">
                    <div class="comapnies-bx-wrp-img">
                      <img class="cmp-logo-tp-1" src="../../../assets/images/dp-160-160.jpg" alt>
                    </div>
                    <div class="companies-name-txt">Ijas Nechiparamban</div>
                    <div class="companies-prof-txt">Ui Developer</div>
                    <md-button class="md-raised md-accent">Follow</md-button>
                  </div>
                </slide>
                <slide>
                  <div class="comapnies-bx-wrp">
                    <div class="comapnies-bx-wrp-img">
                      <img class="cmp-logo-tp-1" src="../../../assets/images/dp-160-160.jpg" alt>
                    </div>
                    <div class="companies-name-txt">Ijas Nechiparamban</div>
                    <div class="companies-prof-txt">Ui Developer</div>
                    <md-button class="md-raised md-accent">Follow</md-button>
                  </div>
                </slide>
                <slide>
                  <div class="comapnies-bx-wrp">
                    <div class="comapnies-bx-wrp-img">
                      <img class="cmp-logo-tp-1" src="../../../assets/images/dp-160-160.jpg" alt>
                    </div>
                    <div class="companies-name-txt">Ijas Nechiparamban</div>
                    <div class="companies-prof-txt">Ui Developer</div>
                    <md-button class="md-raised md-accent">Follow</md-button>
                  </div>
                </slide>
                <slide>
                  <div class="comapnies-bx-wrp">
                    <div class="comapnies-bx-wrp-img">
                      <img class="cmp-logo-tp-1" src="../../../assets/images/dp-160-160.jpg" alt>
                    </div>
                    <div class="companies-name-txt">Ijas Nechiparamban</div>
                    <div class="companies-prof-txt">Ui Developer</div>
                    <md-button class="md-raised md-accent">Follow</md-button>
                  </div>
                </slide>
                <slide>
                  <div class="comapnies-bx-wrp">
                    <div class="comapnies-bx-wrp-img">
                      <img class="cmp-logo-tp-1" src="../../../assets/images/dp-160-160.jpg" alt>
                    </div>
                    <div class="companies-name-txt">Ijas Nechiparamban</div>
                    <div class="companies-prof-txt">Ui Developer</div>
                    <md-button class="md-raised md-accent">Follow</md-button>
                  </div>
                </slide>
                <slide>
                  <div class="comapnies-bx-wrp">
                    <div class="comapnies-bx-wrp-img">
                      <img class="cmp-logo-tp-1" src="../../../assets/images/dp-160-160.jpg" alt>
                    </div>
                    <div class="companies-name-txt">Ijas Nechiparamban</div>
                    <div class="companies-prof-txt">Ui Developer</div>
                    <md-button class="md-raised md-accent">Follow</md-button>
                  </div>
                </slide>
                <slide>
                  <div class="comapnies-bx-wrp">
                    <div class="comapnies-bx-wrp-img">
                      <img class="cmp-logo-tp-1" src="../../../assets/images/dp-160-160.jpg" alt>
                    </div>
                    <div class="companies-name-txt">Ijas Nechiparamban</div>
                    <div class="companies-prof-txt">Ui Developer</div>
                    <md-button class="md-raised md-accent">Follow</md-button>
                  </div>
                </slide>
              </carousel> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  components: {
    Carousel,
    Slide
  }
};
</script>
<style scoped>
.grd-two-row-bx {
  padding: 20px;
}
.grd-tp-1-bx-hdr {
  background: #fff;
  color: #191919;
  font-size: 13px;
  font-weight: 600;
  line-height: 26px;
  padding: 0;
  border-radius: 0;
  position: relative;
  text-transform: uppercase;
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 10px;
}
.cmp-logo-tp-1 {
  widows: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 1px;
  background: #ff5722;
}
.comapnies-bx-wrp {
  position: relative;
  background: #fff;
  padding: 14px;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 1px 8px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  margin-bottom: 1px;
  padding-bottom: 10px;
  text-align: center;
  margin-right: 10px;
  margin-top: 1px;
}
.companies-name-txt {
  font-size: 14px;
  color: #000;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin-bottom: 8px;
  word-wrap: normal;
  margin-top: 18px;
  height: 17px;
}
.companies-prof-txt {
  font-size: 14px;
  color: #b3b1b1;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin-bottom: 6px;
  word-wrap: normal;
  margin-top: 4px;
  height: 17px;
}
.md-button {
  height: 25px;
  margin-top: 20px;
  font-size: 11px;
}
</style>
