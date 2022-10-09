<template>
  <div class="contentarea">
    <div class="head">Price Details</div>
    <div class="price-content">
      <div class="detail">
        Subtotal ({{ cart.total_items }} items)
        <span>{{ currency(total, cart.items[0].currency) }}</span>
      </div>
      <div class="detail vatWrap">
        <div class="titleFor">Total VAT</div>
        <div class="contentIn">
          <span>{{ currency(cart.total_vat, cart.items[0].currency) }}</span>
        </div>
      </div>
      <div class="detail">
        Delvery Cost<span
          >{{ currency(cart.delivery_cost, cart.items[0].currency) }}
        </span>
      </div>

      <div class="total">
        <div class="detail">
          Total
          <span>{{ currency(grandTotal, cart.items[0].currency) }}</span>
        </div>
      </div>

      <div class="minimumOrderMsg">
        <router-link
          to="/store"
          class="md-button md-accent md-theme-default proceedBig addMore"
          >Add more</router-link
        >

        <a
          @click="checkout(cart.trade_name_en, cart.userid)"
          class="md-button md-raised md-accent md-theme-default proceedBig"
          :disabled="IsdisableCheckout"
          >check out</a
        >
      </div>
    </div>

    <div class="spinnerWrap" v-if="showLoader">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cart", "data", "deleteData"],
  data() {
    return {
      showLoader: false,
      total: "",
      IsdisableCheckout: false,
      grandTotal: ""
    };
  },
  watch: {
    deleteData: function name(newValue) {},
    cart: function name(newValue, old) {
      //console.log("dddd")
      //this.showLoader=true;
      //console.log("newvalue>>", newValue);
      this.total = newValue.total_price;
      this.grandTotal = newValue.grand_total;
      var i = 0;
      newValue.items.map(item => {
        if (item.quantity < item.minimumorder) {
          i++;
        }
      });

      if (i > 0) {
        this.IsdisableCheckout = true;
      } else {
        this.IsdisableCheckout = false;
      }
    },
    data: function name(newvalue) {
    //console.log("newvalue", newvalue);
      this.IsdisableCheckout = true;
        
      if (newvalue.qty) {
        if (newvalue.type == "plus") {
           this.grandTotal += parseInt(newvalue.price);
          this.total += parseInt(newvalue.price);
          //console.log(this.cart);
        } else if (newvalue.type == "minus") {
          this.total -= parseInt(newvalue.price);
          this.grandTotal -= parseInt(newvalue.price);
        } else {
          const tot = parseInt(newvalue.qty) * parseInt(newvalue.price);

          this.total = parseInt(newvalue.qty) * parseInt(newvalue.price);
          //this.total += tot;
          this.cart.items.forEach(item => {
            var price = item.offerprice > 0 ? item.offerprice : item.unitprice;
            if (item.pk_product_id != newvalue.productid) {
              //item.quantity = newvalue.qty;

              this.total += parseInt(item.quantity) * price;
              // ;
            }
          });
          this.grandTotal =
            this.total + this.cart.delivery_cost + this.cart.total_vat;
           
          //this.grandTotal += tot;
          //console.log(this.cart);
          // else {
          //   this.total -= parseInt(newvalue.qty) * newvalue.price;
          //   this.grandTotal -= parseInt(newvalue.qty) * newvalue.price;
          // }
        }

        this.cart.total_vat = 0;
        this.cart.items.forEach(item => {
          if (item.pk_product_id == newvalue.productid) {
            item.quantity = newvalue.qty;
          }
          //VAT calculation as qty changed
          let price = item.offerprice > 0 ? item.offerprice : item.unitprice;
          this.cart.total_vat += parseInt(item.quantity) * price * (parseFloat(item.vat_percentage)/100);

        });
        setTimeout(() => {
          this.disableButton();
        }, 800);
      }
        
    }
  },
  methods: {
    disableButton() {
      var i = 0;
      this.cart.items.map(item => {
      
        if (parseInt(item.quantity) < parseInt(item.minimumorder)) {
          i++;
        }
      });
    
      // setTimeout(() => {
      if (i > 0) {
        this.IsdisableCheckout = true;
      } else {
        this.IsdisableCheckout = false;
      }
      // }, 800);
    },

    //checout
    checkout(name, id) {
      const token = localStorage.getItem("token");
      if (token) {
        const myprop = "noushad";
        this.$router.push({
          name: "checkout",
          params: { name: this.slugify(name), id: id }
        });
      } else {
        this.$router.push("/login");
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
        .replace(p, c => b.charAt(a.indexOf(c)))
        .replace(/&/g, `-${ampersand}-`)
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
  },

  created() {
    this.total = this.cart.total_price;
    this.grandTotal = this.cart.grand_total;
    this.disableButton();
  }
};
</script>
<style scoped>
.summary .head {
  font-size: 1.11em;
  font-weight: 600;
  color: #555555;
  width: 100%;
  display: flex;
  align-items: center;
}
.price-content .detail {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 13px;
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
.summary .contentarea {
  /* border: 1px solid #ccc; */
  padding: 15px;
  width: 100%;
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
.spinner {
  width: 100%;
  text-align: center;
  position: absolute;
  height: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(247, 249, 254, 0.8);
}

.spinner > div {
  width: 14px;
  height: 14px;
  background-color: #fba872;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@media screen and (max-width: 600px) {
  .summary .contentarea {
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 5px;
  }
  .summary .head {
    font-size: 13px;
  }

  .price-content .detail {
    font-size: 12px;
  }

  .price-content .detail {
    font-size: 12px;
  }

  .price-content .total .detail {
    font-size: 14px;
  }

  .proceedBig {
    font-size: 13px;
    height: 40px;
  }

  .proceedBig.addMore {
    margin: 0.7em 0;
  }

  .minimumOrderMsg {
    margin-top: 15px;
  }
}
</style>
