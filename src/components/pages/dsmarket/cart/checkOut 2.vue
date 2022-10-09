<template>
  <div>
    <div v-if="showcheckout">
      <div v-if="show404">
        <NotFound />
      </div>
      <div
        class="container container_padding flow_hidden"
        v-else
      >
        <section>
          <div class="cartPageHead headType">Check Out</div>
        </section>

        <div class="cart-wrap">
          <section class="col-sm-7 col-md-7 col-xl-9 left fl">
            <div class="sectionFlow">
              <div class="cart-head">
                <span>Shipping Address</span>
                <a
                  data-v-9f00d5b8
                  @click="addAddressBtn"
                  class="md-button md-accent md-theme-default btnSmall"
                >
                  <span class="material-icons">add</span>Add new address
                </a>
              </div>
              <div class="row_address">
                <div
                  v-if="checkout_addres.length > 0"
                  class="address-wrapper radioAddressBar col-sm-12  fl"
                >
                  <div
                    class="addressPreview col-sm-12 col-md-12 col-xl-6 fl pr-0 "
                    v-for="address in checkout_addres"
                    :key="address.id"
                  >
                    <CheckOutAdress
                      :address="address"
                      :addressbox="addressbox"
                      @address-selected="addressSelected"
                      @delete-address="deleteAddress"
                      @edit-address="editAddress"
                    />
                  </div>
                  <!-- <div
                  class="addressPreview"
                  v-for="address in checkout_addres"
                  :key="address.id"
                >
                  <div class="addressIn">
                    <input
                      type="radio"
                      v-model="addressbox"
                      id="address1"
                      name="address1"
                      value="address1"
                    />
                    <label for="address1">
                      <div class="addressboxHead">
                        <span>Primary Address</span>
                        <div></div>
                      </div>
                      <div class="address">
                        <div class=" innerContainer latlng">
                          <div class=" addressLabelWrapper">
                            <div class="addressLabel">
                              <div class="type">Work</div>
                              <span class="material-icons">location_on</span>
                            </div>
                            <div class=" wrapperClass addressListToolTip">
                              <div class=" tooltipContainer">
                                <div class="filtertoggleboxBtn">
                                  <span class="material-icons">more_horiz</span>
                                </div>

                                <div class="dropdown-menu switching">
                                  <div class="switchingCnt">
                                    <button class="md-button md-theme-default">
                                      <img src="./editpencil.png" />
                                      <span>Edit</span>
                                    </button>
                                    <button class="md-button md-theme-default">
                                      <img src="./trash.png" />
                                      <span>Delete</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class=" addressDetailsContainer">
                            <div class=" addressRow">
                              <span class=" addressColumn addressColumnLeft"
                                >Name</span
                              ><span class=" addressColumn fullName">{{
                                address.contactname
                              }}</span>
                            </div>
                            <div class=" addressRow">
                              <span class=" addressColumn addressColumnLeft"
                                >Address</span
                              >
                              <div class=" addressColumn fullAddress">
                                {{ address.roomno }} {{ address.building }}
                                {{ address.street }} {{ address.area }}
                                {{ address.city }}
                                {{ address.country }}
                              </div>
                            </div>
                            <div class=" addressRow">
                              <span class=" addressColumn addressColumnLeft"
                                >Phone Number</span
                              >
                              <div
                                class=" addressColumn phoneNoWrapper verifiedLabel"
                              >
                                <span class=" phoneNumber">{{
                                  address.contactnumber
                                }}</span>
                                <div class=" verificationStatus">
                                  <i
                                    class="icon icon-radio-checked check"
                                    style="color: rgb(64, 69, 83); font-size: 13px;"
                                  ></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>-->

                  <!-- <div class="addressPreview">
                  <div class="addressIn">
                    <input
                      type="radio"
                      v-model="addressbox"
                      id="address2"
                      name="address2"
                      value="address2"
                    />
                    <label for="address2">
                      <div class="address">
                        <div class=" innerContainer latlng">
                          <div class=" addressLabelWrapper">
                            <div class="addressLabel">
                              <div class="type">Home</div>
                              <span class="material-icons">location_on</span>
                            </div>
                            <div class=" wrapperClass addressListToolTip">
                              <div class=" tooltipContainer">
                                <div class="filtertoggleboxBtn">
                                  <span class="material-icons">more_horiz</span>
                                </div>

                                <div class="dropdown-menu switching">
                                  <div class="switchingCnt">
                                    <button class="md-button md-theme-default">
                                      <img src="./editpencil.png" />
                                      <span>Edit</span>
                                    </button>
                                    <button class="md-button md-theme-default">
                                      <img src="./trash.png" />
                                      <span>Delete</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class=" addressDetailsContainer">
                            <div class=" addressRow">
                              <span class=" addressColumn addressColumnLeft"
                                >Name</span
                              ><span class=" addressColumn fullName"
                                >Shejin</span
                              >
                            </div>
                            <div class=" addressRow">
                              <span class=" addressColumn addressColumnLeft"
                                >Address</span
                              >
                              <div class=" addressColumn fullAddress">
                                Oreintal House 2 125 - 12d St - Al Hamriya - Bur
                                Dubai Dubai United Arab Emirates
                              </div>
                            </div>
                            <div class=" addressRow">
                              <span class=" addressColumn addressColumnLeft"
                                >Phone Number</span
                              >
                              <div
                                class=" addressColumn phoneNoWrapper verifiedLabel"
                              >
                                <span class=" phoneNumber">+971563834835</span>
                                <div class=" verificationStatus">
                                  <i
                                    class="icon icon-radio-checked check"
                                    style="color: rgb(64, 69, 83); font-size: 13px;"
                                  ></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>-->
                </div>
              </div>
            </div>
            
          </section>
          <section class="col-sm-5 col-md-5 col-xl-3 left fl">
            <div class="summary">
              <div class="contentarea">
                <div class="head">Order Summary</div>

                <div>
                  <div class="cartProdcuts">
                    <ul v-if="items.length">
                      <li
                        v-for="item in items[0].items"
                        :key="item.pk_cart_id"
                      >
                        <div class="imgHolder">
                          <a
                            href="#"
                            class="link"
                          >
                            <img
                              :src="item.image.file"
                              alt
                            />
                          </a>
                        </div>
                        <div class="description">
                          <div class="name">{{ item.name }}</div>
                          <div class="price-wrap">
                            <div class>
                              <span
                                class="offer"
                                v-if="item.offerprice > 0"
                              >
                                {{ currency(item.offerprice, item.currency) }}
                              </span>
                              <span
                                class="sellingPrice"
                                v-else
                              >
                                {{ currency(item.unitprice, item.currency) }}
                              </span>
                            </div>
                          </div>
                          <div class="boxWrap">
                            <div class="option">Qty: {{ item.quantity }}</div>
                            <div class="option">
                              <!-- <span class="seller"
                              >Sold by - Software developer</span
                              >-->
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <ul v-else>
                      <Loader />
                    </ul>
                  </div>
                </div>

                <div
                  class="price-content"
                  v-if="items.length"
                >
                  <div class="detail">
                    Subtotal
                    <span>{{
                        currency(
                          items[0].total_price,
                          items[0].items[0].currency
                        )
                      }}
                    </span>
                  </div>
                  <div class="detail">
                    VAT
                    <span>{{
                      currency(items[0].total_vat, items[0].items[0].currency)
                    }}</span>
                  </div>
                  <div class="detail">
                    Delivery Cost
                    <span>{{
                      currency(
                        items[0].delivery_cost,
                        items[0].items[0].currency
                      )
                    }}</span>
                  </div>

                  <div class="total">
                    <div class="detail">
                      Total
                      <span>{{
                        currency(
                          items[0].grand_total,
                          items[0].items[0].currency
                        )
                      }}</span>
                    </div>
                  </div>
                  <md-button
                    class="md-button md-raised md-accent md-theme-default proceedBig"
                    @click="showPaymentSection"
                    :disabled="!addressbox"
                    v-if="show_paymentblock_btn"
                  >
                    <span>continue</span>
                  </md-button>
                  <p
                    class="error-msg"
                    v-if="!addressbox"
                    style="color: #ff1744; margin-top: 12px"
                  >
                    Please Add New Address to proceed.
                  </p>
                  
                </div>
              </div>
            </div>
            <div class="sectionFlow" v-if="show_payment_sel_section">
              <div class="cart-head text_payment">
                <span>Payment Summary</span>
              </div>

              <div class="payment-wrap">
                <div class="title">Select your payment method</div>

                <div
                  class="paymentOption"
                  v-if="payment_options.length > 0"
                >
                  <div
                    v-for="payment in payment_options"
                    :key="payment.value"
                  >
                    <!-- div
                      class="d-flex align-center"
                      v-if="payment.value == 'online_payment'"
                    >
                      <md-radio
                        disabled
                        v-model="radio"
                        value="online_payment"
                      >
                        <img
                          src="../cart/checkout-cc.svg"
                          width="35"
                          height="25"
                          class="mr-2"
                        />
                        Credit Card
                      </md-radio>
                    </div>

                    <div
                      class="creditcardWrap d-none"
                      v-if="payment.value == 'online_payment'"
                    >
                      <div class="md-layout-item md-size-75 fieldItem">
                        <md-field md-inline>
                          <label>Card Number</label>
                          <md-input v-model="payment_method"></md-input>
                        </md-field>
                      </div>
                      <div>
                        <div class="muted">Card expiry date</div>
                        <div class="md-layout-item md-size-45 d-inline-flex">
                          <md-field>
                            <md-select
                              name="mm"
                              id="mm"
                              placeholder="mm"
                            >
                              <md-option value="01">01</md-option>
                              <md-option value="02">02</md-option>
                              <md-option value="03">03</md-option>
                              <md-option value="04">04</md-option>
                            </md-select>
                          </md-field>
                        </div>
                        <div class="md-layout-item md-size-45 d-inline-flex ml-4">
                          <md-field>
                            <md-select
                              name="yy"
                              id="yy"
                              placeholder="yy"
                            >
                              <md-option value="2020">2020</md-option>
                              <md-option value="2021">2021</md-option>
                              <md-option value="2022">2022</md-option>
                              <md-option value="2023">2023</md-option>
                            </md-select>
                          </md-field>
                        </div>
                      </div>

                      <div>
                        <div class="muted">Card verification value</div>
                        <div class="md-layout-item md-size-50 d-inline-flex">
                          <md-field md-inline>
                            <label>Number</label>
                            <md-input v-model="CardNumber"></md-input>
                          </md-field>
                        </div>
                        <div class="cvv">
                          <img
                            src="../cart/cvv_guide.png"
                            width="86"
                          />
                        </div>
                      </div>

                      <div class="futureUse">
                        <md-checkbox
                          v-model="array"
                          value="1"
                        >
                          For faster and more secure checkout, save your card
                          details
                        </md-checkbox>
                      </div>
                    </div-->

                    <div
                      class="d-flex align-center"
                      v-if="payment.value == 'paypal'"
                    >
                      <md-radio
                        
                        v-model="payment_method"
                        value="paypal"
                        v-on:change="payment_method_changed"
                      >
                        <img
                          src="../cart/paypal.png"
                          width="28"
                          class="mr-2"
                        />
                        Paypal Checkout
                      </md-radio>
                    </div>
                    <div
                      class="d-flex align-center"
                      v-if="payment.value == 'cash_on_delivery'"
                    >
                      <md-radio
                        v-model="payment_method"
                        value="cash_on_delivery"
                        v-on:change="payment_method_changed"
                      >
                        <img
                          src="../cart/cash-icon.svg"
                          width="30"
                          height="20"
                          class="mr-2"
                        />
                        Cash On Delivery
                      </md-radio>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="d-flex align-center">
                    <md-radio
                      v-model="payment_method"
                      value="cash_on_delivery"
                      v-on:change="payment_method_changed"
                    >
                      <img
                        src="../cart/cash-icon.svg"
                        width="30"
                        height="20"
                        class="mr-2"
                      />
                      Cash On Delivery
                    </md-radio>
                  </div>
                </div>
                <div v-if="loaded">
                  <Loader />
                </div>
                <div v-show="show_paypal_buttons_wrap" style="margin-top:15px;" ref="paypal"></div>
                
                <div class="overlay" v-if="showPaymentProcessing">
                  <div class="overlay__inner">
                    <div class="overlay__content"><span class="spinner"></span></div>
                  </div>
                </div>
                
                <md-button
                    class="md-button md-raised md-accent md-theme-default proceedBig"
                    @click="placeOrder"
                    :disabled="!addressbox"
                    v-show="(show_proceed_payment_btn && payment_method!='')"
                  >
                    <span>place order</span>
                  </md-button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div v-else>
      <ChangeAddress
        :update_address="update_address"
        :action_name="action_name"
        @backToAddress="toggleAddAddress"
        @getCheckOutAddress="getCheckOutAddress"
      />
    </div>
  </div>
</template>
<script>
import NotFound from "../../../404";
import CheckOutAdress from "./CheckOutAddress";
import ChangeAddress from "../../dsmarket/cart/changeAddress";
import Loader from "../../../ctcomponents/RoundedLoader";
import axios from "axios";
export default {
  components: { NotFound, Loader, ChangeAddress, CheckOutAdress },
  data () {
    return {
      show_paymentblock_btn:true,
      show_payment_sel_section:false,
      show_proceed_payment_btn:true,
      showPaymentProcessing:false,
      paypal_buttons_loaded:false,
      show_paypal_buttons_wrap:true,
      aed_to_usd_rate: 1,
      CardNumber: "",
      payment_options: "",
      payment_method: "",
      radio: "accent",
      array: [],
      show404: false,
      items: "",
      checkout_addres: [],
      showcheckout: true,
      addressbox: "175",
      loaded: false,
      addressNotSelected: false,
      
      //For Adding new ADdress, For Updating the addres we are changing this in editAddress() function
      action_name: "add_checkout_address",
      // Only for Updating Address
      update_address: {
        id: "",
        details_url: ""
      },
      orderp: {
        description: "",
        amount: {
          currency_code: "USD",
          value: 0
        }
      },
      paypal: {
        email: "",
        default: true,
        action_type: "add"
      }
    };
  },
  // computed: {
  //
  // },
  mounted: function() {
    const script = document.createElement("script");
    const ClientID = process.env.PAYPAL_CLIENT_ID;
    script.src = `https://www.paypal.com/sdk/js?client-id=${ClientID}`;
    //script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);

    //get currency rate
    this.$store
        .dispatch("loadCurrencyRates")
        .then(response => {
          if (response.success) {
            this.aed_to_usd_rate = response.result.usd;
          }
        })
        .catch(error => {
          //console.log('error', error);
        });
  },
  methods: {
    showPaymentSection () {
      //show payment method selection box
      this.show_payment_sel_section=true;
      this.show_paymentblock_btn=false;
      this.show_proceed_payment_btn=true;
    },
    payment_method_changed() {
      //hide paypal buttons and show place order button
      
      if(this.payment_method == 'paypal'){
        this.show_paypal_buttons_wrap = true;
        this.show_proceed_payment_btn=false;
        if(!this.paypal_buttons_loaded){
          this.show_proceed_payment_btn=true;
        }
      } else {
        this.show_proceed_payment_btn=true;
        this.show_paypal_buttons_wrap=false;
      }
  
      
    },
    async placeOrder () {
      //this.showSuccessandRedirect();return;
      // Check Address & Order Type First
      // 1. Get The Adrress with status = 2
      // 2. Get Profile Id
      let timerInterval;
      const profile_id = this.$route.params.id;
      if (this.addressbox && profile_id) {
        try {
          await this.$Progress.start();
          if(this.payment_method == 'paypal'){
            this.show_proceed_payment_btn=false;
            this.paypal_buttons_loaded=true;
            var amount_in_dollar = this.aed_to_usd_rate * this.items[0].grand_total;
            this.orderp.amount.value =  amount_in_dollar.toFixed(2);
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                  this.showPaymentProcessing=true;
                  return actions.order.create({
                    purchase_units: [this.orderp]
                  });
                },
                onApprove: async (data, actions) => {
                  //console.log(actions); console.log(data); return;
                  const order = await actions.order.capture();
                  //console.log('order', order);
                  //ajax call to update server
                  this.paypal.type_id = order.id;
                  this.paypal.action_type = "add";
                  this.paypal.transaction_id = order.id;
                  if(order.status == 'COMPLETED'){
                      //console.log('order COMPLETED');
                      const response1 = await this.$store.dispatch("place_order", {
                        profile_id,
                        payment_method: await this.payment_method
                      });
                      const order_id = await response1.data.order_id;
                      if (await order_id) {
                        const response = await this.$store.dispatch("update_order_status", {
                          order_id: order_id
                        });
                        if (await response.data.success) {
                          this.showSuccessandRedirect();
                        }
                      }
                  }
                },
                onError: err => {
                  console.log(err);
                  this.showPaymentProcessing=false;
                  this.paypal_buttons_loaded=false;
                }
              })
              .render(this.$refs.paypal);
          } else {
            this.show_proceed_payment_btn=true;
            const response = await this.$store.dispatch("place_order", {
              profile_id,
              payment_method: await this.payment_method
            });
            if (await response.data.success) {
              this.showSuccessandRedirect();
            }
          }
          //return  '';
          if (await response.data.success) {
            this.showSuccessandRedirect();
          }
          await this.$Progress.finish();
        } catch (error) {
          this.$Progress.fail();
        }
      }
    },
    getDefaultAddressValue () {
      //console.log(this.$store.state.Cart.default_checkout_address);
      this.addressbox = this.$store.state.Cart.default_checkout_address;
    },
    showSuccessandRedirect(){
      
        let timerInterval;
        this.$swal.fire({
              position: "center",
              icon: "success",
              title: "Your order has been Placed successfully.",
              html: `<p style="font-size: 10px; padding-top: 10px" >You will be redirected to confirmation page in <strong>5</strong> seconds.</p>`,
              showConfirmButton: true,
              showCancelButton: false,
              timer: 5000,
              onBeforeOpen: () => {
                const content = this.$swal.getContent();
                const $ = content.querySelector.bind(content);
                timerInterval = setInterval(() => {
                  /* this.$swal
                    .getContent()
                    .querySelector("strong").textContent = (
                      this.$swal.getTimerLeft() / 1000
                    ).toFixed(0); */
                    this.$router.push("/confirm");
                }, 5000);
              },
              onClose: () => {
                clearInterval(timerInterval);
                this.$router.push("/confirm");
              }
            });
            //console.log('im here1>>')
            
    },
    async deleteAddress (data) {
      try {
        this.$Progress.start();
        const rawResponse = await axios.post("billing/address/delete", {
          addressid: data
        });
        const response = await rawResponse.data;
        if (response.success) {
          this.$swal.fire(this.$helpers.successPopup("Address Deleted."));
          this.getCheckOutAddress();
          this.$Progress.finish();
        }
      } catch (error) {
        this.$Progress.fail();
        this.$swal.fire(
          this.$helpers.successPopup(
            "Error Deleting Address. Please Try Again."
          )
        );
        console.log(error);
      }
    },
    async addressSelected (data) {
      this.addressbox = data;
      try {
        const setDefaultAddress = await this.$store.dispatch(
          "select_default_address",
          { addressid: data }
        );
        const response = await setDefaultAddress.success;
        if (response) {
          this.$swal.fire(this.$helpers.successPopup("Default Address Added."));
          this.getCheckOutAddress();
        }
      } catch (error) {
        this.$swal.fire(
          this.$helpers.errorPopup(
            "Error Setting Default Address. Please Try Again."
          )
        );
        console.log(error);
      }

      console.log(data);
    },
    toggleAddAddress () {
      this.showcheckout = true;

      // We are resetting the props of ChangeAddress bcz. if the user has editted the address then the Form will be autoFilled
      this.update_address = { id: "", details_url: "" };
      this.action_name = "add_checkout_address"
    },
    addAddressBtn () {
      this.showcheckout = false;
    },
    getCheckOutAddress () {
      this.loaded = true;
      this.$store
        .dispatch("checkout_address")
        .then(response => {
          this.loaded = false;
          if (response.success == true) {
            this.checkout_addres = response.result;
            const default_address_object = this.$helpers.selectObjectFromArray(
              this.checkout_addres,
              "status",
              2
            );
            this.addressbox = default_address_object.id;
            console.log(default_address_object);
          } else {
            this.checkout_addres = [];
            this.addressbox = "";
          }
        })
        .catch(response => { });
    },
    editAddress (address_id) {
      console.log(address_id)

      this.update_address = {
        id: address_id,
        details_url: "billing/address/details",
      }
      this.action_name = "update_checkout_address"
      this.addressForm = true
      this.addAddressBtn();
    }
  },
  created () {
    if (this.$route.params.id) {
      const param_id = this.$route.params.id;
      const data = {
        profileid: param_id
      };
      this.getCheckOutAddress();

      this.$store
        .dispatch("cart_summary", data)
        .then(response => {
          this.items = response.result;

          var cartid = [];
          if (response.result.length > 0) {
            response.result[0].items.forEach(element => {
              cartid = [element.pk_cart_id, ...cartid];
            });
            const params = {
              cart_ids: cartid,
              profileid: param_id
            };
            this.$store
              .dispatch("payment_options", params)
              .then(response => {
                if (response.success == true) {
                  this.payment_options = response.result;
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

    this.getDefaultAddressValue();
  }
};
</script>
<style scoped>
.address {
  line-height: 1.5;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 2px 0px;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  border-style: solid;
  padding: 11px;
  border-color: rgb(226, 229, 241);
  border-image: initial;
  border-radius: 2px;
}
.addressLabelWrapper {
  font-weight: 600;
  font-size: 1.16666rem;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-bottom: 11px;
}
.addressLabel {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
.addressLabel .type {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}
.addressLabel span {
  color: #71819b;
  font-size: 21px;
}
.wrapperClass {
  line-height: 1;
  text-align: initial;
  position: relative;
}
.tooltipContainer {
  position: relative;
}
.mapAddressHolder {
  max-width: 650px;
  width: 100%;
}
.cart-wrap {
  flex-flow: row;
  display: flex;
  width: 100%;
}
.cart-head {
  color: #191919;
  font-size: 1.11em;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  /* border-bottom: 2px solid #eee; */
}
.btnSmall {
  height: 29px;
  border: 1px solid #f47320;
  justify-content: center;
  align-items: center;
  display: flex;
  text-transform: capitalize;
  font-size: 13px;
  padding-left: 7px;
  padding-right: 12px;
}
.btnSmall span {
  font-size: 20px;
}
.cart-wrap section:nth-child(1) {
  flex-grow: 1;
  height: 100%;
  padding: 0;
}
.cart-wrap section {
  display: flex;
  flex-flow: column;
  border-bottom: 0;
}
.cart-wrap section:nth-child(2) {
  position: relative;
  top: 0px;
  bottom: 0;
  z-index: 2;
  align-self: flex-start;
  margin: 0px;
  border-radius: 2px;
  padding-bottom: 0.55em;
}
.sectionFlow {
  width: 100%;
  background: #ffffff;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 5px;
}
.mapView {
  overflow: hidden;
  border-radius: 0px 0px 15px 15px;
}
.mapView iframe {
  height: 350px;
}
.address-wrapper {
  display: inline-flex;
  flex-wrap: wrap;
  padding: 15px;
  justify-content: space-between;
}
.addressPreview {
  margin-bottom: 13px;
  width: 49.2%;
  display: flex;
}
.addressIn {
  width: 100%;
}
.addressPreview .title {
  font-size: 15px;
  font-weight: 600;
  display: inline-flex;
  text-align: left;
  align-items: center;
}
.addressPreview .title i {
  color: #f47320;
  margin: 0 !important;
}
.addressLine {
  padding-left: 1.99em;
  font-size: 14px;
  line-height: 1.7;
  color: #777;
}
.payment-wrap {
  padding: 15px;
}
.payment-wrap .title {
  font-size: 14px;
  font-weight: 500;
  margin: 0.5em 0;
}
.muted {
  font-size: 13px;
  font-weight: 500;
  position: relative;
  top: 4px;

  color: rgba(0, 0, 0, 0.84);
}
.cvv {
  display: inline-flex;
  width: 129px;
  justify-content: center;
  align-items: center;
}
.cvv img {
  position: relative;
  top: 24px;
}
.creditcardWrap {
  margin: 1.1em 0;
  display: inline-block;
  width: 100%;
  border: 1px solid #f47320;
  padding: 0 15px;
  max-width: 351px;
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
  font-size: 1.11em;
  /* font-family: proxima-nova, sans-serif; */
  font-weight: 600;
  width: 100%;
  height: 43px;
  display: flex;
  align-items: center;
  padding-bottom: 1em;
  color: #555555;
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
  padding-bottom: 0.5em;
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
.cartProdcuts {
  width: 100%;
  display: inline-flex;
}
.cartProdcuts ul {
  width: 100%;
  grid-auto-rows: 85px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1.1em;
}
.imgHolder {
  flex: 0 0 65px;
  position: relative;
  width: 100%;
  background: #fff;
  background: #fff;
  align-items: center;
  display: flex;
  border-radius: 0.25em;
}
.description {
  padding: 0 24px 12px;
  line-height: 1.4;
  vertical-align: top;
  flex: 1 1;
  overflow: hidden;
  font-size: 13px;
  font-weight: 500;
}
.description .price {
  font-weight: 600;
}
.cartProdcuts ul li {
  width: 100%;
  display: inline-flex;
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
  font-size: 14px;
  font-weight: 500;
}
.cart-listing .content .description .option {
  display: block;
  color: #878787;
  font-size: 12px;
  margin-top: 5px;
}
.futureUse {
  font-size: 13px;
  height: 79px;
}
.ktPulse {
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  border-radius: 4px;
}
.map.kt-pulse__ring {
  border-color: #f47320;
}
.boxWrap {
  font-size: 13px;
  margin-top: 3px;
}
.radioAddressBar {
  width: 100%;
}

.radioAddressBar input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.radioAddressBar label {
  padding: 0px 0px;
  font-size: 16px;
  border: 1px solid #eee;
  border-radius: 4px;
  width: 100%;
  display: inline-block;
}

.radioAddressBar label:hover {
  border-color: #71819b;
  border-style: dashed;
  border-width: 2px;
}

.radioAddressBar input[type="radio"]:focus + label {
  border: 2px dashed #71819b;
}

.radioAddressBar input[type="radio"]:checked + label {
  border-color: #71819b;
  border-style: dashed;
  border-width: 2px;
}
.addressboxHead {
  padding: 9px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e9efff;
  background: #f7f9fe;
}
.dropdown-menu.switching {
  left: auto;
  right: 0px;
  width: 130px;
  height: 95px;
  vertical-align: top;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 9px 0px;
  padding: 14px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(226, 229, 241);
  top: 107%;
  padding: 0;
  position: absolute;
  z-index: 1;
  background: #fff;
  display: none;
}
.dropdown-menu.switching::before {
  border-color: transparent;
  border-bottom-color: #fff;
  border-style: dashed dashed solid;
  border-width: 0 8.5px 8.5px;
  position: absolute;
  right: 5.5px;
  top: -8.8px;
  z-index: 11;
  height: 0;
  width: 0;
  content: "";
}
.dropdown-menu.switching::after {
  border-color: transparent;
  border-style: dashed dashed solid;
  border-width: 0 8.5px 8.5px;
  position: absolute;
  right: 5.5px;
  z-index: 1;
  height: 0;
  width: 0;
  border-bottom-color: rgb(226, 229, 241);
  top: -9.8px;
  content: "";
}
.filtertoggleboxBtn span {
  font-size: 19px;
}
.addressRow {
  display: flex;
  margin-bottom: 0.55em;
}
.addressColumn {
  font-size: 13px;
}
.addressRow .addressColumnLeft {
  min-width: 110px;
  color: rgb(185, 185, 185);
}
.tooltipContainer:hover .dropdown-menu.switching,
.tooltipContainer:focus .dropdown-menu.switching {
  display: block;
}
.switchingCnt {
  width: 85%;
  margin: 0 auto;
  margin-top: 1em;
}
.switchingCnt button {
  height: 29px;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 100%;
  border-bottom: 1px solid #eeeeee;
  border-radius: 0;
  padding: 0em 0em;
  padding-bottom: 0.55em;
  transition: opacity 0.4s ease-in-out;
}
.switchingCnt button:hover,
.switchingCnt button:focus {
  opacity: 0.85;
}
.switchingCnt button:nth-child(2) {
  border: none;
  padding-bottom: 0em;
  margin-top: 0.55em;
}
.switchingCnt button img {
  height: 16px;
}
.switchingCnt button span {
  margin-left: 0.21em;
  font-size: 13px !important;
  text-transform: capitalize;
}
.switchingCnt button::before {
  display: none;
}
.summary {
  background: #fff;
  border-radius: 5px;
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
}

.cartPageHead {
  font-size: 22px;
  margin: 16px 0 16px;
}
.row_address {
  margin-left: -15px;
}
@media screen and (max-width: 768px) {
  .sectionFlow {
    margin-bottom: 16px;
  }

  .cart-wrap section:nth-child(2) {
    padding-right: 0px;
  }

  .cart-head {
    padding-bottom: 0px;
  }
}

@media screen and (max-width: 600px) {
  .flow_hidden {
    overflow: hidden;
  }

  .cart-wrap {
    display: block;
  }

  .cart-wrap section:nth-child(2) {
    padding: 0px;
  }

  .cartPageHead {
    font-size: 14px;
    margin: 8px 0 8px;
  }

  .cart-head {
    font-size: 12px;
    padding: 10px;
    padding-right: 3px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .sectionFlow {
    margin-bottom: 10px;
  }

  .btnSmall {
    font-size: 12px;
  }
  .text_payment span {
    padding-top: 5px;
  }

  .payment-wrap .title {
    font-size: 12px;
    margin: 0;
  }

  .payment-wrap {
    padding-bottom: 0px;
    padding-left: 10px;
  }

  .summary .head {
    font-size: 12px;
  }

  .align-center .md-radio {
    margin-bottom: 13px;
  }

  .summary .contentarea {
    padding-top: 0px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .description {
    font-size: 12px;
  }

  .sellingPrice {
    font-size: 13px;
  }

  .boxWrap {
    font-size: 12px;
  }

  .price-content .detail {
    font-size: 12px;
    margin-top: 30px;
  }

  .price-content .total .detail {
    font-size: 13px;
  }
  .proceedBig {
    margin: auto;
  }

  .addressPreview {
    width: 100%;
    margin-bottom: 10px;
  }

  .address-wrapper {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .row_address {
    margin-left: -20px;
  }

  .address-wrapper {
    padding-right: 10px;
  }

  .addressColumn {
    font-size: 12px;
  }
}

@media screen and (max-width: 320px) {
  .flow_hidden {
    padding-right: 50px !important;
    padding-left: 10px !important;
  }
  .btnSmall {
    font-size: 10px;
    padding-left: 0px;
  }

  .cart-head {
    font-size: 11px;
  }
}
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
</style>
