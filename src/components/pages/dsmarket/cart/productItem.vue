<template>
  <li>  
    <div class="imgHolder">
      <router-link
        class="link"
        :to="{
          name: 'product-details',
          params: {
            product: slugName(cart.name),
            productId: encodeProductId(cart.fk_product_id),
          },
        }"
        ><img :src="cart.variation.files[0]" alt=""
      /></router-link>
      <!-- <figure v-lazyload class="image__wrapper">
        <div class="loading"></div> -->

      <a href="#" class="link">
        <img :src="cart.variation.files[0]" alt="" class="fitItem"
      /></a>
      <!-- <img class="fitItem image__item" :data-url="cart.image.file" alt /> -->
      <!-- </figure> -->
    </div>
    <div v-if="cart.variation.pricing_type=='pricing'" class="description">
      <div class="name">{{ cart.name }}</div>
      <div class="price">
        <div class="price-wrap">
          <div>
            <span class="offer" v-if="cart.variation.size.offerprice > 0">{{
              currency(cart.variation.size.offerprice, cart.currency)
            }}</span>
            <span class="sellingPrice" v-else>{{
              currencySymbol(
                cart.type === "item" ? cart.variation.files[0] : cart.unitprice,
                cart.currency
              )[1]
            }}</span>
          </div>
          <div class="offer" v-if="cart.variation.size.offerprice > 0">
            <span class="offerPrice"
              >{{ currency(cart.variation.size.price, cart.currency) }}
            </span>
          </div>
        </div>
        <div class="offer-discount" v-if="cart.variation.size.offerpercentage > 0">
          <span class="offer-discount-content">
            {{ cart.variation.size.offerpercentage }}% OFF
          </span>
        </div>
      </div>
      <!-- <div class="price">
        <span class="offerPrice" v-if="cart.offerprice > 0">{{
          cart.offerprice | getDigitSeperateComa
        }}</span>
        <span class="offerPrice" v-else>{{
          cart.unit | getDigitSeperateComa
        }}</span>
        <span class="sellingCurrency">{{ cart.currency }} </span>
      </div> -->
      <div class="boxWrap">
        <div class="option">
          <div class="optionType">Brand :</div>
          <div class="optionShowing">{{ cart.brand }}</div>
        </div>
        <div class="option" v-if="cart.vat > 0">
          <div class="optionType">VAT :</div>
          <div class="optionShowing">{{ cart.vat_percentage }} %</div>
        </div>
        <div class="option" v-if="cart.variation.color">
          <div class="optionType">Color :</div>
          <div class="optionShowing">{{ cart.variation.color }}</div>
        </div>
        <div class="option" v-if="cart.variation.size.size">
          <div class="optionType">Size :</div>
          <div class="optionShowing">{{ cart.variation.size.size }}</div>
        </div>
        <div class="option info" v-if="showMinimumOrderMessage">
          This product should have minimum {{ cart.minimumorder }} quantity
        </div>
        <!-- <div class="option info" v-if="cart.minimumorder > cart.quantity">
          This product should have minimum {{ cart.minimumorder }} quantity
        </div> -->
        <CartQty :cart="cart" @updateQty="updateQty" />
        <!-- <div class="option timeIn">
          <div class="optionType">Delivered by</div>
          <i>Mon, Apr 20</i>
        </div> -->
      </div>
      <div class="btmActionWrap">
        <div class="md-button md-accent md-theme-default btmAction">
          <span class="material-icons"> bookmark_border </span>
          Move to wishlist
        </div>
        <div
          class="md-button md-accent md-theme-default btmAction"
          @click="removeCart"
        >
          <span class="material-icons"> delete_outline </span>
          remove
        </div>
      </div>
    </div>
    <div v-else class="description">
      <div class="name">{{ cart.name }}</div>
      <div class="price">
        <div class="price-wrap">
          <div>
            <span class="offer" v-if="cart.variation.customization.customization_cost > 0">{{
              currency(cart.variation.customization.customization_cost, cart.currency)
            }}</span>
            <span class="sellingPrice" v-else>{{
              currencySymbol(
                cart.type === "item" ? cart.variation.files[0] : cart.unitprice,
                cart.currency
              )[1]
            }}</span>
          </div>
        </div>
      </div>
      <!-- <div class="price">
        <span class="offerPrice" v-if="cart.offerprice > 0">{{
          cart.offerprice | getDigitSeperateComa
        }}</span>
        <span class="offerPrice" v-else>{{
          cart.unit | getDigitSeperateComa
        }}</span>
        <span class="sellingCurrency">{{ cart.currency }} </span>
      </div> -->
      <div class="boxWrap">
        <div class="option">
          <div class="optionType">Brand :</div>
          <div class="optionShowing">{{ cart.brand }}</div>
        </div>
        <div class="option" v-if="cart.vat > 0">
          <div class="optionType">VAT :</div>
          <div class="optionShowing">{{ cart.vat_percentage }} %</div>
        </div>
        <div class="option" v-if="cart.variation.color">
          <div class="optionType">Color :</div>
          <div class="optionShowing">{{ cart.variation.color }}</div>
        </div>
        <div class="option custom" >Custom Order <small @click="showCustomSizeDetails=!showCustomSizeDetails" class="size-details">Details</small>
        </div>
        <div v-if="showCustomSizeDetails">
          <div class="option" v-for="(item, i) in cart.variation.customization.values"
          :key="i">
            <div class="optionShowing">{{ item.name }} : {{ item.value }} {{cart.variation.measurement_unit}}</div>
          </div>
        </div>
        <div class="option info" v-if="showMinimumOrderMessage">
          This product should have minimum {{ cart.variation.customization.minimum_qty }} quantity
        </div>
        <!-- <div class="option info" v-if="cart.minimumorder > cart.quantity">
          This product should have minimum {{ cart.minimumorder }} quantity
        </div> -->
        <CartQty :cart="cart" @updateQty="updateCustomQty" />
        <!-- <div class="option timeIn">
          <div class="optionType">Delivered by</div>
          <i>Mon, Apr 20</i>
        </div> -->
      </div>
      <div class="btmActionWrap">
        <div class="md-button md-accent md-theme-default btmAction">
          <span class="material-icons"> bookmark_border </span>
          Move to wishlist
        </div>
        <div
          class="md-button md-accent md-theme-default btmAction"
          @click="removeCart"
        >
          <span class="material-icons"> delete_outline </span>
          remove
        </div>
      </div>
    </div>
    <md-snackbar :md-position="position" :md-active.sync="showSnackbar"
      >{{ productName }} Is removed from Cart</md-snackbar
    >
  </li>
</template>

<script>
import CartQty from "./cartQty";
import VLazyImage from "v-lazy-image";
export default {
  props: ["cart", "totalItems"],
  components: { CartQty, VLazyImage },
  data() {
    return {
      showSnackbar: false,
      productName: "",
      showMinimumOrderMessage: false,
      showCustomSizeDetails:false,
      position: "left",
      quantity: "",
      minimum_order: "",
    };
  },
  computed: {
    slugName() {
      return (name) => this.$helpers.slugify(name);
    },
    encodeProductId() {
      return (productId) => btoa(productId);
    },
  },
  methods: {
    updateQty(data) {
      if (data.qty != "") {
        this.$emit("emitQty", data);

        if (parseInt(data.qty) < parseInt(this.minimum_order)) {
          console.log("show condition");
          this.showMinimumOrderMessage = true;
        } else {
          console.log("dont show condition");
          this.showMinimumOrderMessage = false;
        }
      }
    },
    updateCustomQty(data){
      if (data.qty != "") {
        this.$emit("emitQty", data);

        if (parseInt(data.qty) < parseInt(this.cart.variation.customization.minimum_qty)) {
          console.log("show condition");
          this.showMinimumOrderMessage = true;
        } else {
          console.log("dont show condition");
          this.showMinimumOrderMessage = false;
        }
      }
    },
    removeCart() {
      console.log("removed");

      //  this.cart.items.forEach((item,index) => {
      //     if (item.pk_product_id == id) {

      //     }
      //   });
      //this.cart = {};

      var price =
        this.cart.offerprice > 0
          ? this.cart.offerprice
          : this.cart.type === "item"
          ? this.cart.variation.files[0]
          : this.cart.unitprice;
      console.log('price',this.cart)    
      const deleteData = {
        cartid: this.cart.pk_cart_id,
        price: price,
      };
      this.$emit("emitDelete", deleteData);

      const data = {
        cartids: [this.cart.pk_cart_id],
      };

      this.$store.dispatch("DeleteCart", data);
      
      this.showMinimumOrderMessage = false;
      this.$store
        .dispatch("RemoveCart", data)
        .then((response) => {
          if (response.data.success == true) {
            this.productName = this.cart.name;

            //  this.checkCartMinimumOrder();

            this.showSnackbar = true;
          } else {
            alert("something went wrong when deleting!!");
          }
        })
        .catch((error) => console.log(error));
    },
    checkCartMinimumOrder() {
      console.log(this.cart.variation.pricing_type)
      if(this.cart.variation.pricing_type=='pricing')
      {
        if (this.cart.quantity < this.cart.minimumorder) {
          this.showMinimumOrderMessage = true;
        } else {
          this.showMinimumOrderMessage = false;
        }
      }
      else
      {
        if (this.cart.quantity < this.cart.variation.customization.minimum_qty) {
          this.showMinimumOrderMessage = true;
        } else {
          this.showMinimumOrderMessage = false;
        }
      }
    },
  },
  watch: {
    showMinimumOrderMessage: function (value) {
      //this.showMinimumOrderMessage==
    },
  },
  created() {
    this.minimum_order = this.cart.minimumorder;
    this.quantity = this.cart.quantity;
    this.checkCartMinimumOrder();
  },
};
</script>

<style scoped>
.optionShowing {
  text-transform: capitalize;
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
  width: 100%;
  height: 105px;
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
  text-transform: capitalize;
}
.cart-listing .content .description .option {
  display: block;
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
  margin-top: 2px;
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
.image__wrapper {
  position: relative;
  position: relative;
  width: 100%;
  height: 100%;
}

.loading {
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background-image: -webkit-linear-gradient(
    left,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-image: linear-gradient(
    left,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 219px;
  height: 105px;
  position: relative;
}
@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}
.image__wrapper.loaded .loading {
  opacity: 0;
  display: none;
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
  font-size: 11px;
  min-width: 80px;
  color: #111 !important;
  text-align: center;
  display: inline-flex;
  align-items: center;
  opacity: 0.55;
}
.btmAction:hover {
  opacity: 0.65;
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
  width: 55px;
  /* Changed bcz the VAT % was not coming correctly. */
  /* width: 60px; */
}
span.offerPrice {
  font-size: 13px;
  margin-left: 1em;
  text-decoration: line-through;
  color: #878787;
  font-weight: 500;
}
.option.info {
  color: #ff5722 !important;
  padding-top: 3px;
}
.option.custom {
  color: #298d00 !important
}
.option.custom .size-details{
  color: #000 !important;
  text-decoration: underline;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .cart-listing .content .description {
    padding-bottom: 0px;
  }
  .cartProdcuts ul li {
    margin-bottom: 0px;
  }
}

@media screen and (max-width: 600px) {
  .cart-listing .content .description {
    padding: 0 24px 12px;
  }
  .cartProdcuts ul li {
    width: 100%;
    margin-top: 18px;
    margin-bottom: 1em;
  }

  .cart-listing {
    padding: 0px 0px 10px 0px;
  }

  .cart-listing .content .description .name {
    white-space: normal;
    font-size: 13px;
    line-height: 20px;
  }
  .btmActionWrap {
    padding-top: 4px;
    position: absolute;
    width: 100%;
    left: 0px;
    border-top: 1px solid #eeee;
  }

  .boxWrap {
    border-bottom: none;
    padding-bottom: 1em;
  }

  .btmActionWrap .btmAction:nth-child(2) {
    margin-left: 0.3em;
    float: right;
  }

  .btmAction {
    margin-left: 0px;
    margin-right: 0px;
    min-width: 55px;
  }
  .emptyCart {
    margin-right: 0px;
  }
  .btmAction span {
    font-size: 21px;
    margin-left: -4px;
  }

  .price-wrap {
    margin-top: 5px !important;
    margin-bottom: 5px !important;
  }
}

@media screen and (max-width: 300px) {
  .imgHolder {
    flex: 0 0 66px;
  }
}
</style>
