<template>
  <div class="product-spec br-6 col-sm-12 p-0 fl">
    <md-tabs>
      <md-tab id="tab-home" md-label="Overview">
        <div v-if="product.product_attributes != null">
          <div
            class="col-sm-4 fl list_height"
            v-for="(item, key, index) in product.product_attributes"
            :key="index"
          >
            <div
              class="outer-div"
              v-for="(item, key, index) in item"
              :key="index"
            >
              <div class="attr attr-key">{{ key }}</div>
              <div class="attr attr-val">{{ item }}</div>
            </div>
          </div>
        </div>
        <div v-else>No attributes</div>
      </md-tab>
      <md-tab id="tab-pages" md-label="Description">
        <div class="descrptionIn">
          <p v-html="product.information"></p>
        </div>
      </md-tab>
    </md-tabs>
  </div>
</template>
<script>
export default {
  props: ["product"],
  data() {
    return {
      details: {
        address: "hhhhhhh",
        age: "33",
      },
    };
  },
};
</script>
<style scoped>
.outer {
  max-width: 1021px;
  width: 100%;
  padding-left: 1.1%;
}
.main-div {
  width: 33.333%;
  padding-right: 31px;
  display: inline-flex;
}
.outer-div {
  width: 100%;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
  margin-bottom: 1.1em;
}
.attr {
  text-align: left;
}
.attr-key {
  color: #7e808c;
  margin-bottom: 3px;
  text-transform: capitalize;
  font-weight: 400;
}
.attr-val {
  font-size: 14px;
}
.product-spec {
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.4;
  font-weight: 500;
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 10px;
  overflow: hidden;
}
.prdct-desc-bx-ch-cnt {
  position: relative;
  border: 1px solid #dae2ee;
  background-color: #fff;
  margin-top: 10px;
}
.lnk-bx-rt-1 {
  border-bottom: 1px solid #dae2ee;
  line-height: 1;
  height: 38px;
}
.lnk-tp-22-btn {
  height: 38px;
}
.prdct-cnt-jk-bx {
  padding: 30px;
}
.descrptionIn {
  padding-left: 1.1%;
  line-height: 22px;
}

.list_height {
  min-height: 80px;
}
@media screen and (max-width: 768px) {
.attr-val {
  font-size: 13px;
}
}
@media screen and (max-width: 600px) {
  .product-spec {
    margin-top: 10px;
    border-radius: 5px;
    font-size: 11px;
  }
  .attr-val {
    font-size: 11px;
    font-weight: 400;
    color: #272c3f;
    width: 50%;
    float: left;
  }
  .list_height {
    min-height: auto;
    padding-left: 5px;
    padding-right: 5px;
  }

  .attr-key {
    width: 50%;
    float: left;
  }

  .outer-div {
    width: 100%;
    padding-bottom: 3px;
    border-bottom: 1px solid #eee;
    margin-bottom: 5px;
    margin-top: 2px;
    overflow: hidden;
  }
  .descrptionIn {
    font-weight: 400;
    color: #272c3f;
  }
}
</style>
