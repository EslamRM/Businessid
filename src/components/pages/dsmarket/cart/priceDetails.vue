<template>
  <div class="summary">
    <PriceDetail :cart="cart" :data="data" :deleteData="deleteData" />
  </div>
</template>
<script>
import PriceDetail from "./priceDetail";
export default {
  props: ["cart", "data", "deleteData"],
  components: { PriceDetail },
  data() {
    return {};
  },
  watch: {
    emitQty: function name(newvalue) {
      // if (newvalue) {
      //   if (newvalue.type == "plus") {
      //     this.total += newvalue.price;
      //   } else {
      //     this.total -= newvalue.price;
      //   }
      // }
    }
  },
  methods: {
    checkMinimumOrder() {
      // console.log(this.cart);
      // this.cart.forEach(element => {
      //   console.log(element);
      // });
    }
  },
  created() {
    this.checkMinimumOrder();
  }
};
</script>

<style scoped>
.summary .head {
  font-size: 1.1em;
  font-weight: 600;
  color: #878787;
  width: 100%;
  display: flex;
  align-items: center;
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
  margin-top: 2.5em;
}
.cart-listing .content .price {
  font-size: 15px;
  color: #212121;
  font-weight: 600;
  line-height: 1.4;
  margin-top: 5px;
  width: 100%;
}
.proceedBig.addMore {
  border: 1px solid;
  margin: 1em 0;
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
@media screen and (max-width: 600px) {

















}



</style>
