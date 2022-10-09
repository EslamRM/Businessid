<template>
  <div class="cart-wrap">
    <section class="col-sm-7 col-md-8 col-xl-9 left fl">
      <div class="cart-head">
        <md-card-header class="" v-if="user_id && user_id == cart.userid">
          <router-link
            class="d-flex align-center mb-0"
            :to="/profile/ + getSlug(cart.trade_name_en) + '/' + cart.userid"
          >
            <md-avatar v-if="cart.logo == ''">
              <img
                src="../../../../assets/images/avatar.png"
                :alt="cart.trade_name_en"
              />
            </md-avatar>
            <md-avatar v-else>
              <img :src="cart.logo" :alt="cart.trade_name_en" />
            </md-avatar>

            <div class="md-title">{{ cart.trade_name_en }}</div>
          </router-link>
        </md-card-header>
        <md-card-header class="" v-else>
          <router-link
            class="d-flex align-center mb-0"
            :to="
              /profiletimeline/ +
              getSlug(cart.trade_name_en) +
              '/' +
              cart.userid
            "
          >
            <md-avatar v-if="cart.logo == ''">
              <img
                src="../../../../assets/images/avatar.png"
                :alt="cart.trade_name_en"
              />
            </md-avatar>
            <md-avatar v-else>
              <img :src="cart.logo" :alt="cart.trade_name_en" />
            </md-avatar>

            <div class="md-title">{{ cart.trade_name_en }}</div>
          </router-link>
        </md-card-header>

        <button
          type="button"
          class="md-button md-accent md-theme-default emptyCart"
          @click="deleteAll(cart)"
        >
          <span>Remove Cart</span>
        </button>
      </div>
      <ProductItems :cart="cart" @emitQty="emitQty" @emitDelete="emitDelete" />
    </section>
    <section class="col-sm-5 col-md-4 col-xl-3 fl mb_pr_pl">
      <div class="col-sm-12 wrap_pricedetails">
        <PriceDetails
          v-if="cart"
          :cart="cart"
          :data="data"
          :deleteData="deleteData"
        />
      </div>
    </section>
  </div>
</template>
<script>
import ProductItems from "./productItems";
import PriceDetails from "./priceDetails";
import { mapState } from "vuex";
export default {
  name: "CartItem",
  components: { ProductItems, PriceDetails },
  props: ["cart"],
  data() {
    return {
      data: "",
      deleteData: "",
    };
  },
  computed: {
    getSlug() {
      return (name) => this.slugify(name);
    },
    ...mapState({
      user_id: (state) => state.user.user_id,
    }),
  },
  methods: {
    deleteAll(cart) {
      var ids = [];

      if (cart) {
        cart.items.forEach((element) => {
          ids.push(element.pk_cart_id);
        });
        const data = {
          cartids: ids,
        };
        this.$store
          .dispatch("RemoveCart", data)
          .then((response) => {
            //console.log(response);
          })
          .catch((error) => console.log(error));
      }
    },
    slugify(text, ampersand = "and") {
      const a = "àáäâèéëêìíïîòóöôùúüûñçßÿỳýœæŕśńṕẃǵǹḿǘẍźḧ";
      const b = "aaaaeeeeiiiioooouuuuncsyyyoarsnpwgnmuxzh";
      const p = new RegExp(a.split("").join("|"), "g");
      return text
        .toString()
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
        .replace(p, (c) => b.charAt(a.indexOf(c)))
        .replace(/&/g, `-${ampersand}-`)
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
    },
    emitQty(data) {
      this.data = data;
    },
    emitDelete(data) {
      this.deleteData = data;
    },
  },
};
</script>

<style scoped>
.cart-wrap {
  width: 100%;
  display: flex;
  flex-flow: row;
  margin-top: 1.3em;
  margin-bottom: 3.3em;
  border-radius: 5px;
  background-color: #fbfbfd;
}
.cart-head .md-card-header {
  padding: 7px 0;
}
.cart-wrap section {
  flex-flow: column;
  display: flex;
  border-radius: 2px;
  border-bottom: 0;
  background: #fff;
  border-radius: 5px;
}
.cart-wrap section:nth-child(2) {
  align-self: flex-start;
  position: relative;
  top: 0px;
  bottom: 0;
  z-index: 2;

  -ms-flex-item-align: start;

  padding-right: 0px;
  background-color: #fbfbfd;
}
.cart-wrap section.left {
  flex-grow: 1;
  overflow: visible;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  z-index: 9;
}
.cart-head {
  color: #191919;
  font-size: 1.33em;
  display: flex;
  padding: 0px;
  border-bottom: 1px solid #f0f0f0;
  justify-content: space-between;
  align-items: center;
}
.cart-head .md-avatar {
  border: 1px solid #eee;
}
.cart-head .md-avatar img {
  object-fit: contain;
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

.wrap_pricedetails {
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 5px;
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
.emptyCart {
  height: 27px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 12px;
  padding-left: 7px;
  padding-right: 7px;
  color: rgb(255, 87, 34, 0.65) !important;
  background: rgb(255, 87, 34, 0.1);
}

@media screen and (max-width: 768px) {
  .cart-wrap {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .cart-wrap section:nth-child(2) {
    align-self: flex-start;
  }
}

@media screen and (max-width: 600px) {
  .cart-wrap {
    display: block;
  }

  .mb_pr_pl {
    padding-left: 0px;
    padding-right: 0px;
  }

  .wrap_pricedetails {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .cart-wrap {
    margin-top: 0px;
    margin-bottom: 10px;
  }
  .emptyCart {
    margin-right: 0px;
    font-size: 11px;
  }

  .cart-head .md-title {
    font-weight: 500;
    font-size: 12px;
  }

  .md-avatar {
    width: 30px !important;
    min-width: 30px !important;
    height: 30px !important;
    margin-right: 8px !important;
  }

  .cart-wrap section.left {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
