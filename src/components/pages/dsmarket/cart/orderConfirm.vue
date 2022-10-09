<template>
  <div>
    <div class="container container_padding">
      <section class="confirmWrap">
        <!-- <div class="cartPageHead">Order Confirmation</div> -->
        <div class="full-wrap text-center">
          <img src="../cart/track.svg" class="trackIcon" />
          <div class="textMsg">Relax while we confirm your Order...</div>
        </div>

        <div class="ctWizard">
          <div class="col-sm-12 col-xl-8 mx-auto mob_padding">
            <div class="row_ctconfirm">
              <div class="CTconfirm_navigation">
                <div class="CTstepper_header step-active">
                  <md-tooltip md-direction="top">Apr 17, 2020</md-tooltip>
                  <div class="CTsteppercontent">
                    <div class="CTsteppernumber"></div>
                    <div class="CTsteppertext">
                      <span>Placed</span>
                    </div>
                  </div>
                </div>
                <div class="CTstepper_header">
                  <div class="CTsteppercontent">
                    <div class="CTsteppernumber"></div>
                    <div class="CTsteppertext">
                      <span>Processing</span>
                    </div>
                  </div>
                </div>
                <div class="CTstepper_header">
                  <div class="CTsteppercontent">
                    <div class="CTsteppernumber"></div>
                    <div class="CTsteppertext">
                      <span>Dispatched</span>
                    </div>
                  </div>
                </div>
                <div class="CTstepper_header">
                  <div class="CTsteppercontent">
                    <div class="CTsteppernumber"></div>
                    <div class="CTsteppertext">
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="cartProdcuts">
                <ul>
                  <li v-for="(order, index) in orders.items" :key="index">
                    <div class="imgHolder">
                      <a href="#" class="link">
                        <img
                          :src="order.variation.files[0]"
                          :alt="order.name"
                        />
                      </a>
                    </div>
                    <div class="description">
                      <div class="actionBtn action_btn_order">
                        <md-button
                          class="md-button md-accent md-theme-default"
                          @click="
                            orderStatusPopup(order.item_id, orders.order_id)
                          "
                          >{{
                            orders.items.length > 1
                              ? "Remove Item"
                              : "Cancel Order"
                          }}</md-button
                        >
                      </div>

                      <div class="name cancellMore">
                        {{ order.name }}
                      </div>
                      <div class="price-wrap">
                        <div class="bravo-offer-moq">
                          <span class="sellingCurrency">{{
                            "currency" in order
                              ? currencySymbol("2", order.currency)[0]
                              : "AED"
                          }}</span>
                          <span
                            class="sellingPrice"
                            v-if="order.offerprice > 0"
                          >
                            {{
                              currencySymbol(
                                order.offerprice,
                                order.currency
                              )[1]
                            }}
                          </span>
                          <span class="sellingPrice" v-else>
                            {{
                              currencySymbol(order.unitprice, order.currency)[1]
                            }}
                          </span>
                        </div>
                        <div
                          class="bravo-offer-moq offer"
                          v-if="order.offerprice > 0"
                        >
                          {{
                            "currency" in order
                              ? currencySymbol("2", order.currency)[0]
                              : "AED"
                          }}
                          <span class="offerPrice">
                            {{
                              currencySymbol(order.unitprice, order.currency)[1]
                            }}</span
                          >
                        </div>
                      </div>
                      <div
                        class="offer-discount"
                        v-if="
                          'offerpercentage' in order &&
                          order.offerpercentage > 0
                        "
                      >
                        <span class="offer-discount-content"
                          >{{ order.offerpercentage }}% OFF</span
                        >
                      </div>
                      <div class="boxWrap">
                        <div class="option Qty">Qty: {{ order.quantity }}</div>
                        <div class="option Qty" v-if="order.variation.color">
                          Color: {{ order.variation.color }}
                        </div>
                        <div
                          class="option Qty"
                          v-if="order.variation.size.size"
                        >
                          Size: {{ order.variation.size.size }}
                        </div>
                        <div class="option Qty">
                          VAT({{ order.vat_percentage }}%): {{ order.vat }}
                        </div>
                        <div class="option total">
                          Total:
                          {{
                            order.offerprice !== "0.00"
                              ? currency(
                                  order.offerprice * order.quantity + order.vat,
                                  order.currency
                                )
                              : currency(
                                  order.unitprice * order.quantity + order.vat,
                                  order.currency
                                )
                          }}
                        </div>

                        <div class="option">
                          Payment type:
                          {{
                            orders.payment_method
                              ? orders.payment_method.replaceAll("_", " ")
                              : "NA"
                          }}
                        </div>
                        <div class="option">
                          <span class="seller"
                            >Sold by - {{ order.brand }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <router-link
                to="/dashboard/buyer/orders/"
                class="md-button md-accent md-raised md-theme-default btnBig"
              >
                <span>Manage Orders</span>
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Cancel Product Dialog -->

      <!-- Cancel Product Dialog -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      showDialog: false,
      orders: {},
      reason: "",
      ordersData: {},
      postfocused: true,
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    async orderStatusPopup(item_id, order_id) {
      console.log(item_id);
      const { value: Reasons } = await this.$swal.fire({
        timer: 20000,
        timerProgressBar: true,
        title: "Are you sure want to Remove this Item from Order?",
        html: '<p style="font-size: 10px; padding-top: 10px" > It would be great if you could tell us what made you cancel so we can improve</p>',
        cancelButtonColor: "#ff5722",
        confirmButtonColor: "#d2d2d2",
        input: "select",
        inputOptions: {
          short: "Short warranty period",
          twice: "I order twice",
          notInterested: "Iam not interested anymore",
          other: "Other reason",
        },
        inputValidator: (Reasons) => {
          return new Promise((resolve) => {
            if (Reasons) {
              resolve();
            } else {
              resolve("Kindly select any one option. :)");
            }
          });
        },
        inputPlaceholder: "Select a Reason",
        showCancelButton: true,
        allowOutsideClick: () => !this.$swal.isLoading(),
      });

      if (Reasons) {
        try {
          const response = await axios.post("buyer/orders/item/cancel", {
            order_id,
            item_id,
            reason: Reasons,
          });
          if (await response.data.success) {
            console.log(response.data);
            await this.$swal.fire(
              this.$helpers.successPopup(
                "Your Item has been removed Successfully."
              )
            );
            await this.getOrders();
          } else {
            await this.$swal.fire({
              position: "center",
              icon: "error",
              title: "Error, Please Try Again.",
              showConfirmButton: false,
              timer: 15000,
              showCancelButton: true,
              timerProgressBar: true,
            });
          }
        } catch (error) {
          await this.$swal.fire({
            position: "center",
            icon: "error",
            title: 'Error, Please Try Again. "Network Error" ',
            showConfirmButton: false,
            timer: 15000,
            showCancelButton: true,
            timerProgressBar: true,
          });
        }
      }
    },
    async getOrders() {
      this.$Progress.start();
      try {
        const response = await axios.post("buyer/orders", {
          page: 1,
          status: "Pending",
        });
        const result = await response.data.result;
        this.orders = await result[0];
        if (!result[0] || !result[0].items.length > 0) {
          console.log("No Items or Orders Exists");
          this.$swal.fire({
            position: "center",
            icon: "info",
            title: `You're being redirected to Dashboard.`,
            showConfirmButton: true,
            timer: 5000,
            timerProgressBar: true,
          });
          await this.$router.push("/dashboard/buyer/orders/pending");
        }

        this.$Progress.finish();
      } catch (error) {
        this.$Progress.fail();
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
/* CSS From Abhishek */
.post-hd-1 {
  border-bottom: 0.5px solid #efefef;
  border-radius: 2px 2px 0 0;
  font-weight: 500;
  padding: 11px;
  padding-bottom: 8px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post-bx-cnt-1 {
  padding: 5px;
  background: #fff;
}
.create-post {
  background: #fff;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  position: relative;
  z-index: 10;
}
.blk-gradient {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.price-wrap {
  margin-top: 7px;
}
.bravo-offer-moq.offer {
  font-size: 10px;
  display: inline-flex;
  align-items: center;
  text-decoration: line-through;
  color: rgb(34, 34, 34, 0.55);
}
.bravo-offer-moq.offer .offerPrice {
  font-size: 10px;
  padding-left: 2px;
}
.bravo-offer-moq span.sellingPrice {
  font-weight: bold;
  color: #222;
}
.bravo-offer-moq .sellingCurrency {
  color: #9399ab;
  font-size: 13px;
}
.bravo-offer-moq .offerPrice {
  font-weight: normal;
}
.bravo-offer-moq span {
  font-size: 16px;
  font-weight: normal;
}
/* CSS from Abhishek Ends */
.confirmWrap {
  margin-top: 40px;
}
.full-wrap {
  width: 100%;
  height: auto;
}
.full-wrap img {
  width: 110px;
}
.trackIcon {
  margin: 0 auto;
}
.textMsg {
  font-size: 1.7em;
  font-weight: 500;
  margin: 0.4em 0;
}
.CTconfirm_navigation {
  display: flex;
  margin-top: 4em;
}
.cartProdcuts {
  width: 100%;
  display: inline-flex;
  background-color: #fff;
  padding: 15px;
  margin-top: 3em;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}
.arrow-up {
  width: 0;
  height: 0;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-bottom: 20px solid #dbdbe2;
}
.cartProdcuts ul {
  width: 100%;
  /* grid-auto-rows: 219px; */
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1.1em;
}
.imgHolder {
  flex: 0 0 65px;
  position: relative;
  width: 100%;
  height: 65px;
  background: #fff;
}
.description {
  padding: 0 0px 0px 24px;
  vertical-align: top;
  flex: 1 1;
  overflow: hidden;
  font-size: 13px;
  font-weight: 500;
}
.cartProdcuts ul li {
  width: 100%;
  display: inline-flex;
  border-bottom: 1px solid #eee;
}
.cartProdcuts ul li:last-child {
  border: none;
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
  /* max-width: 460px; */
}
.cart-listing .content .description .name {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 15px;
  font-weight: 500;
}
.cartProdcuts .option {
  display: block;
  color: #878787;
  font-size: 13px;
  margin-top: 2px;
  text-transform: capitalize;
}
.option.total {
  font-size: 14px;
  font-weight: 600;
  padding: 5px 0;
  color: #222222;
}
.actionBtn button {
  height: 31px;
  float: right;
  color: #adabab !important;
  border: 1px solid #ccc;
  padding: 5px 1px;
}
.cancellMore {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.md-dialog {
  max-width: 768px;
  padding: 11px;
}
.removeHead {
  display: block;
  margin-bottom: 1em;
}
.removeHead i {
  color: #d2ccd2;
  font-size: 1.9em !important;
}
.dialogue-container {
  padding: 15px 25px;
}
.txtMuted {
  font-size: 13px;
  font-weight: 500;
}
.txtMuted.big {
  font-size: 15px;
  font-weight: bold;
}
.btnWrap button {
  display: flex;
  font-weight: 500;
  font-size: 15px;
  height: 38px;
  min-width: 125px;
}
button.outline {
  margin-left: 1em;
}
.btnWrap {
  display: flex;
  justify-content: center;
}
.btnBig {
  width: 100%;
  max-width: 205px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-weight: 500;
  font-size: 15px;
  height: 41px;
  margin: 0 auto;
  margin-top: 2em;
}
.ctWizard {
  padding-bottom: 2em;
}
.boxWrap {
  line-height: 1.4;
}
.description .price {
  font-weight: 500;
}
.option.Qty {
  color: #1a1a1a;
}
.row_ctconfirm {
  margin-left: -10px;
}

@media screen and (max-width: 768px) {
  .full-wrap img {
    width: 110px;
  }
  .confirmWrap {
    margin-top: 30px;
  }

  .textMsg {
    font-size: 20px;
    margin-top: 15px;
  }

  .CTsteppernumber {
    width: 20px;
    height: 20px;
  }

  .CTsteppertext span {
    font-size: 14px;
  }
  .CTconfirm_navigation {
    margin-top: 45px;
  }

  .cartProdcuts {
    margin-top: 30px;
  }

  .cartProdcuts {
    padding-right: 12px;
  }

  .option.Qty {
    margin-top: 7px;
  }
  .price-wrap {
    margin-top: 10px;
  }
  .row_ctconfirm {
    margin-left: -7px;
  }
}

@media screen and (max-width: 600px) {
  .full-wrap img {
    width: 65px;
  }

  .confirmWrap {
    margin-top: 13px;
  }

  .textMsg {
    font-size: 13px;
    margin-top: 12px;
  }

  .mob_padding {
    padding-left: 10px;
    padding-right: 10px;
  }

  .CTconfirm_navigation {
    margin-top: 18px;
  }

  .CTsteppernumber {
    width: 12px;
    height: 12px;
  }
  .CTsteppertext span {
    font-size: 11px;
  }

  .CTsteppernumber {
    margin-right: 5px;
  }
  .row_ctconfirm {
    margin-left: -7px;
    margin-right: 0px;
  }

  .cartProdcuts {
    margin-top: 5px;
  }

  .cartProdcuts {
    padding-right: 12px;
  }

  .cancellMore {
    line-height: 20px;
  }

  .boxWrap {
    line-height: 1.4;
    margin-top: 6px;
  }

  .description {
    padding-bottom: 0px;
  }

  .cartProdcuts .option {
    padding: 1px 0;
    font-size: 11px;
  }

  .actionBtn button {
    height: 28px;
    margin-right: 0px;
  }

  a.md-button.md-accent.md-raised.md-theme-default.btnBig {
    font-size: 12px;
    padding: 0px;
    width: 125px;
    height: 30px;
    margin-top: 23px;
  }

  .price-wrap {
    margin-top: 5px;
  }

  .description {
    font-size: 12px;
    padding: 0 0px 0px 10px;
  }
  .bravo-offer-moq span {
    font-size: 12px;
  }

  .bravo-offer-moq .sellingCurrency {
    color: #9399ab;
    font-size: 12px;
  }

  .cartProdcuts {
    padding: 10px;
    padding: 10px;
    padding-top: 9px;
    padding-bottom: 7px;
  }

  .container_padding {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}

@media screen and (max-width: 300px) {
  .container_padding {
    padding-right: 40px !important;
    padding-left: 10px !important;
  }

  .row_ctconfirm {
    margin-left: -8px;
    margin-right: -2px;
  }
  .CTsteppercontent {
    padding: 0 2px !important;
  }

  .mob_padding {
    padding-left: 0px;
  }

  .CTsteppertext span {
    font-size: 10px;
  }
  .CTsteppernumber {
    width: 3px;
    height: 3px;
  }

  .textMsg {
    font-size: 12px;
    margin-top: 8px;
  }
  .full-wrap img {
    width: 60px;
  }

  .CTconfirm_navigation {
    margin-top: 14px;
  }

  a.md-button.md-accent.md-raised.md-theme-default.btnBig {
    font-size: 11px;
    padding: 0px;
    width: 120px;
    height: 28px;
    margin-top: 20px;
  }
}
</style>
