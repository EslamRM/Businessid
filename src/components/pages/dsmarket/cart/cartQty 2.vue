<template>
  <div class="change-qty">
    <label class="equal">Qty :</label>
    <div class="controllers wrap_quantity">
      <button
        class="md-button md-theme-default plus"
        @click="changQty('minus', cart)"
      >
        <span> - </span>
      </button>
      <input
        type="text"
        class="c-formInput"
        v-model="qty"
        min="1"
        maxlength="4"
        pattern="[1-9]{1}[0-9]{3}"
        :disabled="disableInput"
        @keypress="isNumber($event)"
        @input="typeQty(cart)"
      />
      <button
        class="md-button md-theme-default minus"
        @click="changQty('plus', cart)"
      >
        <span> +</span>
      </button>
    </div>
    <div class="overlay" v-if="showOverlay">
      <div class="overlay__inner">
        <div class="overlay__content"><span class="spinner"></span></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["cart"],
  data() {
    return {
      qty: 1,
      showOverlay: false,

      disableInput: false
    };
  },
  methods: {
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 190
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    typeQty(cart) {
      if (typeof parseInt(this.qty == "number")) {
        if (this.qty != "" && this.qty.length <= 4) {
          if (parseInt(this.qty) == 0) {
            this.qty = 1;
          }
          const data = {
            cart_id: cart.pk_cart_id,
            quantity: parseInt(this.qty),
            productid: cart.pk_product_id
          };
          var price =
            this.cart.offerprice > 0
              ? this.cart.offerprice
              : this.cart.unitprice;
          const qtyData = {
            type: "others",
            qty: this.qty,
            price: price,
            productid: cart.pk_product_id
          };

          // setTimeout(() => {
          // this.showOverlay = true;
          //this.disableInput = true;

          this.$emit("updateQty", qtyData);
          this.$store.dispatch("UpdateCart", data);
          this.disableInput = false;
          // setTimeout(() => {
          //   console.log("firing");
          //   this.$emit("updateQty", "");
          // }, 800);
        }
      } else {
        this.qty = 0;
      }
    },
    changQty(type, cart) {
      if (typeof parseInt(this.qty == "number")) {
        if (type == "plus") {
          this.qty++;
        } else {
          if (this.qty == 1 || this.qty == 0) {
            return;
          }
          this.qty--;
        }

        const data = {
          cart_id: cart.pk_cart_id,
          quantity: this.qty,
          productid: cart.pk_product_id
        };
        var price =
          this.cart.offerprice > 0 ? this.cart.offerprice : this.cart.unitprice;
        const qtyData = {
          type: type,
          qty: this.qty,
          price: price,
          productid: cart.pk_product_id
        };
        console.log(qtyData);
        this.$emit("updateQty", qtyData);
        this.$store.dispatch("UpdateCart", data);
      } else {
        //this.$store.dispatch("ShowToastError", true);
      }
    }
  },
  watch: {
    // showOverlay: function(val) {
    //   if (val == true) {
    //     setTimeout(() => {
    //       this.showOverlay = false;
    //     }, 1000);
    //   }
    // }
  },
  created() {
    this.qty = this.cart.quantity;
  }
};
</script>
<style scoped>
.overlay {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: #42414194;
  z-index: 10;
}

.overlay__inner {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}

.overlay__content {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.spinner {
  width: 75px;
  height: 75px;
  display: inline-block;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.05);
  border-top-color: #fff;
  animation: spin 1s infinite linear;
  border-radius: 100%;
  border-style: solid;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
.change-qty {
  display: flex;
  align-items: center;
  margin: 0.77em 0;
}
.change-qty label {
  display: block;
  color: #878787;
  font-size: 12px;
  width: 30px;
}
.controllers {
  display: flex;
  padding-left: 1.5em;
}
.controllers button {
  height: 25px;
  min-width: 25px;
  margin: 0;
  max-width: 100%;
  padding: 0;
  border: 1px solid #eeeeee;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* .controllers button.plus {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.controllers button.minus {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0;
} */
.plus span {
  margin-top: -3px !important;
}
.minus span {
  margin-top: -3px !important;
}
.wrap_quantity .c-formInput {
  width: 55px;
  border: none !important;
  min-width: 55px;
  border-top: 1px solid #f1f1f1 !important;
  border-radius: 0;
  border-bottom: 1px solid #f1f1f1 !important;
  display: inline-block;
  vertical-align: top;
  height: 25px;
  /* border-left: 0; */
  font-size: 13px;
  text-align: center;
}

.c-formInput:hover,
.c-formInput:focus {
  /* box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08); */
}
input.c-formInput::-webkit-outer-spin-button,
input.c-formInput::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"]:disabled {
  user-select: none;
}
</style>
