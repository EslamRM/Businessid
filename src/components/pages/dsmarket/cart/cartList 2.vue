<template>
  <div>
    <div class="invalid-qty-error" v-if="showToast">
        <div class="invalid-qty">
          <h4> Add to basket</h4>
          <span>Invalid Quantity</span>
        </div>
    </div>
    <div class="container container_padding tab_container">
      <div class="cartPageHead headType">My Cart</div>

      <div v-if="cartList">
        <div v-for="(cart, index) in cartList" :key="index">
          <CartItem :cart="cart" />
        </div>
      </div>
      <div v-else>
        <div
          class="loginMessage"
          v-if="!$store.state.user.retrievedTokenDetail"
        >
          <p class="login-message-text">Already have an account?</p>
          <router-link to="/logIn" active-class="active" exact>
            <md-button class="md-raised md-primary logn-btn"> Login </md-button>
          </router-link>
        </div>
        <EmptyCart />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CartItem from "./cartItem";
import EmptyCart from "../../../../components/Cart/CartEmptyMessage/CartEmptyMessage";
export default {
  components: { CartItem, EmptyCart },
  data() {
    return {};
  },
  computed: {
    cartList() {
      return this.$store.getters.getCart;
    },
       ...mapState({
      showToast: state => state.Cart.showInvalidQtyToast
    })
  },
  created() {
    this.$store.dispatch("getCart");
  }
};
</script>
<style scoped>
.invalid-qty-error{
      background-color: #ff5858;
}
.invalid-qty{
      color: #fff;
    text-align: center;
    padding: 10px;
}
.cart-wrap {
  width: 100%;
  display: flex;
  flex-flow: row;
  margin-top: 1.3em;
  margin-bottom: 3.3em;

  border-radius: 6px;
}
.cart-wrap section {
  flex-flow: column;
  display: flex;
  border-radius: 2px;
  border-bottom: 0;
  background: #fff;
}
.cart-wrap section:nth-child(2) {
  position: sticky;
  top: 64px;
  bottom: 0;
  z-index: 2;
  -webkit-align-self: flex-start;
  -ms-flex-item-align: start;
  align-self: flex-start;
  padding: 0;
  background-color: #f1f1f1;
}
.cart-wrap section.left {
  flex-grow: 1;
  overflow: visible;
}
.cart-head {
  color: #191919;
  font-size: 1.33em;
  display: flex;
  padding: 0px;
  border-bottom: 2px solid #eee;
  justify-content: space-between;
  align-items: center;
}
.actionBtn button {
  height: 33px;
  margin-right: 1.22em;
  color: #111 !important;
  border: 1px solid #ccc;
}
.cart-head .md-title {
  font-weight: 600;
}

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

.cartPageHead {
  font-size: 22px;
  font-weight: 500;
  margin: 15px 0 15px;
  line-height: 34px;
  color: #545766;
}

@media screen and (max-width: 768px) {
  .tab_container {
    max-width: 100%;
  }

  .cartPageHead {
    font-size: 20px;
  }
}

@media screen and (max-width: 600px) {
  .tab_container {
    overflow: hidden;
    margin-bottom: -15px;
    padding-left: 10px !important;
    padding-right: 10px !important;
  }

  .cartPageHead {
    font-size: 16px;
    margin: 8px 0 0px;
  }
}

@media screen and (max-width: 320px) {
  .tab_container {
    padding-right: 50px !important;
    margin-bottom: -20px;
  }
}
</style>
