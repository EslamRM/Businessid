<template>
  <div class="cart-listing seller-1651 " id="citem84">
    <div class="content ">
      <div class="cartProdcuts">
        <ul>
          <ProductItem
            @emitDelete="emitDelete"
            v-for="(carts, index) in cart.items"
            :key="index"
            :cart="carts"
            :totalItems="cart.total_items"
            @emitQty="emitQty"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from "./productItem";

export default {
  props: ["cart"],
  components: { ProductItem },
  data() {
    return {};
  },
  methods: {
    emitDelete(data) {
      this.$emit("emitDelete", data);
    },
    emitQty(data) {
      this.$emit("emitQty", data);
    }
  }
};
</script>

<style scoped>
.cart-listing {
  padding: 23px;
  position: relative;
  background: #fff;
}
.cart-listing .content {
  display: flex;
  width: 100%;
}
.imgHolder {
  flex: 0 0 105px;
  position: relative;
  position: relative;
  width: 100%;
  height: 105px;
}
.cartProdcuts {
  width: 100%;
  display: inline-flex;
}
.cartProdcuts ul {
  width: 100%;
  /* grid-auto-rows: 219px; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2.2em;
}
.cartProdcuts ul li {
  width: 100%;
  display: inline-flex;
  margin-bottom: 1em;
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
  line-height: 1.3;
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
.remove-item {
  display: inline-block;
  margin-top: 0.9em;
  padding: 0;
  color: #f77878;
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
  font-size: 1.1em;
  font-weight: 600;
  width: 100%;
  height: 43px;
  display: flex;
  align-items: center;
  font-family: proxima-nova, sans-serif;
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
.qty-update {
  margin-top: 5px;
  width: 100%;
}
.headType {
  margin: 40px 0 30px;
  line-height: 34px;
  font-size: calc(45rem / 16);
  font-weight: 300;
}
.loginMessage {
  text-align: left;
  margin-bottom: 30px;
  display: inline-flex;
  align-items: center;
}
.loginMessage button {
  min-width: 101px;
  margin-left: 1.3em;
  margin-top: 0px;
}

.login-message-text {
  padding-top: 4px;
  margin-bottom: 0;
  font-size: calc(22rem / 16);
}
.boxWrap {
  margin-top: 11px;
  display: block;
  padding-bottom: 1.3em;
  border-bottom: 1px solid #eeee;
}
.timeIn i {
  font-style: normal;
  font-weight: 600;
  color: rgb(56, 174, 4);
  padding-left: 0.3em;
}
.btmAction {
  height: 28px;
  font-size: 12px;
  min-width: 80px;
  color: #111 !important;
  text-align: center;
  display: inline-flex;
  align-items: center;
}
.btmAction span {
  font-size: 21px;
  margin-right: 3px;
}
.btmAction:before {
  display: none;
}
.change-qty {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.change-qty label {
  display: block;
  color: #878787;
  font-size: 12px;
}
.qty-btn {
  position: relative;
  display: inline-block;
  width: 3em;
  height: 2.2em;
  overflow: hidden;
  border-radius: 0.25em;
  border: 1px solid #d2d2d2;
  align-items: center;
  line-height: 2.3em;
}
.qty-btn select {
  flex: 1;
  padding: 0 0.5em;
  color: #333;
  cursor: pointer;
  width: 100%;
}
.qty-btn select {
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: #fff;
  background-image: none;
}
.qty-btn select option {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}
.qty-btn select option:hover {
  background: rgba(0, 0, 0, 0.3);
}
.qty-btn::after {
  content: "\25BC";
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 0.4em;
  cursor: pointer;
  pointer-events: none;
  -webkit-transition: 0.25s all ease;
  -o-transition: 0.25s all ease;
  transition: 0.25s all ease;
  align-items: center;
  line-height: 2.66;
  color: #555;
  font-size: 12px;
}
.proceedBig.addMore {
  border: 1px solid;
  margin: 1em 0;
}
.btmActionWrap {
  padding-top: 1.1em;
}
.btmActionWrap .btmAction:nth-child(2) {
  margin-left: 0.3em;
}
.contentIn span {
  display: block;
  line-height: 1.4;
  margin-bottom: 2px;
}
.saveAmtMsg {
  border-top: 1px dashed #e0e0e0;
  padding: 15px 0;
  font-size: 14px;
  display: flex;
  border-radius: 2px;
  color: #388e3c;
  font-weight: 500;
}
.saveAmtMsg span {
  margin: 0 5px;
}
.optionType,
.equal {
  float: left;
  width: 85px;
}
span.offerPrice {
  font-size: 13px;
  margin-left: 1em;
  text-decoration: line-through;
  color: #878787;
  font-weight: 500;
}

@media screen and (max-width: 768px) {
  .cartProdcuts ul {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1em;
  }
  .btmAction .md-button {
    margin: 0px !important;
  }
}

@media screen and (max-width: 768px) {
  .cartProdcuts ul li {
    display: block;
  }

  .cart-listing .content .description {
    padding: 0px;
  }

  .cart-listing {
    padding: 23px 0px 10px 0px;
    position: relative;
    background: #fff;
  }
}

@media screen and (max-width: 600px) {
  .cart-listing {
    padding: 0px 0px 10px 0px;
  }
  .cartProdcuts {
    padding-bottom: 13px;
  }
}
</style>
