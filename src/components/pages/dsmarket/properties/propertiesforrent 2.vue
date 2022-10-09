<template>
  <div>
    <div class="lst-bx-wrp fltr-pg-1">
      <div class="container clearfix">
        <div class="ch-main-layout">
          <div class="ch-left-layout">
            <div class="left-category">
              <div class="alife-bc-category-nav">
                <div class="menu-container">
                  <div class="category-menu-wrapper">
                    <div class="category-head">
                      Quick Filter
                      <div class="category-head-border" data-reactid="7"></div>
                    </div>
                    <div class="menu">
                      <div class="cst-bx-v-1">
                        <div class="secton-title">
                          <h2>Property For</h2>
                          <i class="material-icons">add</i>
                        </div>
                        <div class="show-bx-1">
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">Rent</md-checkbox>
                          </div>
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">Sale</md-checkbox>
                          </div>
                        </div>
                      </div>
                      <div class="cst-bx-v-1">
                        <div class="secton-title">
                          <h2>Categories</h2>
                          <i class="material-icons">add</i>
                        </div>
                        <div class="show-bx-1">
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">Residential Units For Rent</md-checkbox>
                          </div>
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">Commercial For Rent</md-checkbox>
                          </div>
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">Room For Rent</md-checkbox>
                          </div>
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">Short Term (monthly)</md-checkbox>
                          </div>
                        </div>
                      </div>
                      <div class="cst-bx-v-1">
                        <div class="secton-title">
                          <h2>Country</h2>
                          <i class="material-icons">add</i>
                        </div>
                        <div class="show-bx-1">
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">United Arab Emirates</md-checkbox>
                          </div>
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">Australia</md-checkbox>
                          </div>
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">India</md-checkbox>
                          </div>
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">Canada</md-checkbox>
                          </div>
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">Africa</md-checkbox>
                          </div>
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">United Arab Emirates</md-checkbox>
                          </div>
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">Australia</md-checkbox>
                          </div>
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">India</md-checkbox>
                          </div>
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">Canada</md-checkbox>
                          </div>
                          <div class="fltr-slct-bx">
                            <md-checkbox v-model="array" value="1">Africa</md-checkbox>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ch-right-layout">
            <ctpropertyListingBox></ctpropertyListingBox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navwithImageSlider from "../../../ctcomponents/navwithImageSlider";
import ctpropertyListingBox from "../../../ctcomponents/property/ctpropertylisting";
export default {
  name: "demands",
  data: () => ({
    array: [],
    boolean: false,
    string: null,
    novalue: null,
    disabled: true,
    obj1: { name: "obj1" },
    obj2: { name: "obj2" },
    obj: null,
    indeterminate: true
  }),
  components: {
    navwithImageSlider,
    ctpropertyListingBox
  }
};
</script>
<style scoped>
.md-checkbox {
  font-size: 12px;
}
</style>

