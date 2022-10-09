// FIXES // TODO Fix the Plus Minus Icons/Buttons //TODO Remove the Quantity
Input developed by the designer

<template>
  <div>
    <div class="container bg_wrapper">
      <div class="qutation-wrap">
        <div class="head">Ask For Quotation</div>
        <div class="qutation-form col-sm-12">
          <div class="company-detail col-sm-12">
            <i class="material-icons">person_outline</i>
            &nbsp;
            {{ product.postedBy.name }}
          </div>

          <!-- <div class="wrapper-date col-sm-12 fl pl-0 pr-0">
            <div class="row_margin">
              <div class="wrap-date col-sm-12 pl-0 pr-0">
                <div class="col-sm-12 col-md-4 fl pr-3 pl-5">
                  <div class="md-layout md-gutter">
                    <VueDatePicker
                      v-model.trim="form.delivery_date"
                      color="#f47320"
                      placeholder="Choose From Date"
                      button-validate="Ok"
                      button-cancel="Cancel"
                      validate
                      style="padding: 27px 0px 0px 52px"
                    />
                    <div
                      class="error"
                      v-if="submitted && !$v.form.delivery_date.required"
                    >
                      Field is required
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-4 fl pr-5 pl-5">
                  <div class="md-layout md-gutter">
                    <md-field>
                      <label for="PaymentOptions">Payment Options</label>
                      <md-select
                        v-model.trim="form.payment_method"
                        name="PaymentOptions"
                        id="PaymentOptions"
                      >
                        <md-option value="Cash">Cash</md-option>
                        <md-option value="Cheque">Cheque</md-option>
                        <md-option value="Online">Online</md-option>
                        <md-option value="Bank Transfer"
                          >Bank Transfer</md-option
                        >
                      </md-select>
                    </md-field>
                    <div
                      class="error"
                      v-if="submitted && !$v.form.payment_method.required"
                    >
                      Field is required
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-4 fl pr-5 pl-5">
                  <div class="md-layout md-gutter">
                    <md-field>
                      <label for="PaymentDate">Payment Date</label>
                      <md-select
                        v-model.trim="form.payment_type"
                        name="PaymentDate"
                        id="Payment"
                      >
                        <md-option value="Upon Acceptance"
                          >Upon Acceptance</md-option
                        >
                        <md-option value="Upon Delivery"
                          >Upon Delivery</md-option
                        >
                      </md-select>
                    </md-field>
                    <div
                      class="error"
                      v-if="submitted && !$v.form.payment_type.required"
                    >
                      Field is required
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div class="row_margin">
            <div class="col-sm-12 pl-0 pr-0 fl mt-4 mobmt-0">
              <div class="col-sm-12 col-md-12 col-xl-12 pl-0 pr-0 fl">
                <div class="col-sm-4 fl">
                  <VueDatePicker
                    v-model.trim="form.delivery_date"
                    color="#f47320"
                    placeholder="Choose From Date"
                    button-validate="Ok"
                    button-cancel="Cancel"
                    validate
                    class="calender"
                  />
                  <div
                    class="error"
                    style="padding-left: 48px; margin-top: 0px"
                    v-if="submitted && !$v.form.payment_method.required"
                  >
                    Field is required
                  </div>
                </div>
                <div class="col-sm-4 fl box_list_cash">
                  <select
                    v-model.trim="form.payment_method"
                    name="PaymentOptions"
                    id="PaymentOptions"
                  >
                    <option value="">Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Online">Online</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                  <transition name="fade">
                    <div
                      class="error"
                      v-if="submitted && !$v.form.payment_method.required"
                    >
                      Field is required
                    </div>
                  </transition>
                </div>
                <div class="col-sm-4 fl box_list_cash">
                  <select
                    v-model.trim="form.payment_type"
                    name="payment_type"
                    id="payment_type"
                  >
                    <option value="">Payment Type</option>
                    <option value="Upon Acceptance">Upon Acceptance</option>
                    <option value="Upon Delivery">Upon Delivery</option>
                  </select>
                  <transition name="fade">
                    <div
                      class="error"
                      v-if="submitted && !$v.form.payment_type.required"
                    >
                      Field is required
                    </div>
                  </transition>
                </div>
              </div>
              <div class="col-sm-12 col-md-12 col-xl-4 pl-0 pr-0 fl"></div>
            </div>
          </div>
          <div class="company-products-wrap">
            <div class="product col-sm-12 pl-0 pr-0 fl">
              <section>
                <div class="info col-sm-12 pl-0 pr-0">
                  <div class="title">Product information</div>

                  <div class="col-sm-12 col-md-4 col-xl-3 card_margin">
                    <div class="pl-0 pr-0 wrapper_shadow">
                      <img :src="product.images[0].file" />
                      <div class="brand col-sm-12">{{ product.brand }}</div>
                      <div class="title_brand col-sm-12">
                        {{ product.name }}
                      </div>
                      <div class="price_price col-sm-12">
                        <span class="color_aed">{{ product.currency }}</span>
                        <span
                          class="sellingPrice"
                          v-if="product.offerprice > 0"
                        >
                          {{ product.offerprice | getDigitSeperateComa }}
                        </span>
                        <span class="price_product" v-else>
                          {{ product.unitprice | getDigitSeperateComa }}
                        </span>
                        <span class="offer_price" v-if="product.offerprice > 0">
                          {{ product.currency }}
                          <span class="offerPrice">{{
                            product.unitprice
                          }}</span>
                        </span>
                      </div>

                      <div
                        class="price_price col-sm-12"
                        v-if="product.offerpercentage > 0"
                      >
                        <div class="offer_box">
                          {{ product.offerpercentage }}% OFF
                        </div>
                      </div>
                      <div class="price_price col-sm-12">
                        <label for="quantity">quantity</label>
                        <br />
                        <span class="button_decrease" @click="decProductQty()"
                          >-</span
                        >
                        &nbsp;
                        <input
                          type="text"
                          name="quantity"
                          style="width: 50px"
                          id="quantity"
                          value="3"
                          class="c-formInput"
                          v-model.trim="form.quantity"
                        />
                        &nbsp;
                        <span class="button_increase" @click="incProductQty()"
                          >+</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div class="error" v-if="submitted && !$v.form.quantity.required">
              Field is required
            </div>
            <!-- <div class="error" v-if="!$v.quantity.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div> -->
          </div>

          <div class="company-products-wrap border_none">
            <div class="product col-sm-12 pl-0 pr-0 fl">
              <section class="col-sm-12 pl-0 pr-0">
                <div class="info col-sm-12 pl-0 pr-0">
                  <div class="title mt-3">Message</div>

                  <div class="message_discription col-sm-12 pl-0 pr-0">
                    <div class="col-sm-12 pl-0 pr-0">
                      <i class="material-icons">sentiment_satisfied_alt</i>
                      <span>
                        Enter product details such as color, size, materials
                        etc. and other specification requirements to receive an
                        accurate quote.
                      </span>
                    </div>
                  </div>
                  <div class="col-sm-12 pl-0 pr-0 mt-4">
                    <textarea
                      v-model="form.message"
                      rows="4"
                      cols="50"
                      placeholder="Enter product details such as color, size, materials etc. and other specification requirements to receive an accurate quote."
                    ></textarea>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <!-- <div class="company-products-wrap border_none padding_border">
            <div class="product col-sm-12 pl-0 pr-0 fl">
              <section class="col-sm-12 pl-0 pr-0">
                <div class="info col-sm-12 pl-0 pr-0">
                  <div class="title mb-0">Please enter your quantity</div>
                  <div class="col-sm-12 pl-0 pr-0 mt-3 email">
                    <div class="col-sm-4" style="background-color:red; height:45px;"></div>
                  </div>
                </div>
              </section>
            </div>
          </div>-->
          <div class="company-products-wrap border_none">
            <div class="product col-sm-12 pl-0 pr-0 fl">
              <section class="col-sm-12 pl-0 pr-0">
                <div class="info col-sm-12 pl-0 pr-0">
                  <button
                    v-if="!loading"
                    type="button"
                    class="btn btn-submit"
                    @click="sendQuotation"
                  >
                    Send inquiry now
                  </button>
                  <button type="button" class="btn btn-submit" v-else>
                    Please Wait ...
                  </button>
                </div>
              </section>
            </div>
          </div>

          <!-- <div class="l-modal is-shown--off-flow js-modal-shopify" v-if="submittedSuccessfully">
            <div class="l-modal__shadow js-modal-hide"></div>
            <div class="c-popup l-modal__body">
              <div class="c-popup__img">

                <img src="@/assets/images/check-mark.svg" alt class="h-img-resp" />
              </div>
              <h3 class="c-popup__title">Thank You!</h3>
              <p class="c-popup__description">
                Your Quotation has been submitted Successfully
                <br />We'll get in touch with you soon!
              </p>
              <a href="/vendor/profileQutation" class="button-primary">Go to Dashboard</a>
            </div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
        quantity: "",
        delivery_date: new Date(),
        payment_method: "",
        payment_type: "",
        message: "",
        productid: ""
      },
      submitted: false,
      loading: false,
      submittedSuccessfully: false
    };
  },
  validations: {
    form: {
      quantity: { required, minLength: minLength(1) },
      delivery_date: { required },
      payment_method: { required },
      payment_type: { required }
    }
  },
  methods: {
    incProductQty() {
      this.form.quantity++;
    },
    decProductQty() {
      this.form.quantity--;
    },
    sendQuotation() {
      this.loading = true;
      this.submitted = true;

      console.log("submit!");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
      } else {
        this.$store
          .dispatch("sendQuotation", this.form)
          .then(response => {
            this.loading = false;
            if (response.success) {
              this.submittedSuccessfully = true;
              this.$swal.fire(this.$helpers.successPopup("Quotaion Sent."));
              this.$router.push("/dashboard/vendor/profileQutation");
            }
          })
          .catch(error =>
            this.$swal.fire(
              this.$helpers.errorPopup("Quotation Not Sent. Please Try Again.")
            )
          );
      }
    }
  },
  computed: {
    ...mapState({
      product: state => state.store.productDetails
    })
  },
  created() {
    this.form.productid = this.$route.params.productId;
    this.$store.dispatch("productDetails", this.$route.params.productId);
  }
};
</script>
<style scoped>
/* CSS by Abhishek  */
/* TODO      Dear Designer, this is the css of PopUp You are all free to maipulate inpuy */
.vd-picker__input {
  border: #ccc SOLID 3px;
  padding: 5px;
  border-radius: 7px;
}

input,
select {
  outline: none;
}
.box_list_cash select {
  float: left;
  border: solid 1px #c8d2e0;
  padding: 10px 10px;
  border-radius: 6px;
  padding-left: 10px !important;
  width: 100%;
  margin-top: 8px;
}
.box_date {
  float: left;
  padding: 0px;
}
.box_date input {
  float: left;
  border: solid 1px #c8d2e0;
  padding: 10px 10px;
  border-radius: 6px;
  padding-left: 10px !important;
  width: 80%;
}
.box_date button {
  float: right;
  background: #fff;
  margin-right: 7px;
  border: solid 1px #c8d2e0;
  padding: 6px 13px;
  border-radius: 6px;
  color: #ff5722;
}
.is-hidden--off-flow {
  opacity: 0;
  transition: all 0.2s ease-in-out;
  z-index: -10;
  visibility: hidden;
}

.is-shown--off-flow {
  opacity: 1;
  transition: all 0.2s ease-in-out;
  visibility: visible;
}
.vd-wrapper.calender {
  padding: 20px 0px 0px 15px;
}

.l-modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  margin: 0 auto;
  z-index: 2;
  text-align: center;
}

.l-modal__shadow {
  width: 100%;
  height: 100%;
  position: fixed;
  display: block;
  background: #161616;
  opacity: 0.92;
  z-index: -1;
  cursor: pointer;
}

.l-modal__body {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.c-popup {
  display: inline-block;
  text-align: center;
  background: white;
  max-width: 400px;
  width: 90%;
  line-height: 1.48;
  border-radius: 13px;
  padding-bottom: 15px;
}

.c-popup__img {
  max-width: 150px;
  margin: 0 auto;
  padding: 30px 30px 10px;
}

.h-img-resp {
  max-width: 100%;
}

.c-popup__title {
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 0;
  margin-bottom: 6px;
  font-size: 1.4em;
  color: #3a3a3a;
  font-weight: normal;
}

.c-popup__description {
  font-size: 1.1em;
  color: #a1a1a1;
  padding: 0 30px;
  margin-bottom: 48px;
}

.button-primary {
  background: linear-gradient(#ff5722, #ff9d7e);
  box-shadow: 0 1px 1px rgba(255, 255, 255, 0.4) inset;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  padding: 12px 18px;
  border-radius: 8px;
  display: inline-block;
  cursor: pointer;
  font-size: 0.8em;
  font-weight: bold;
  transition: all 0.2s ease-out;
}

.button-primary:hover {
  box-shadow: 0 1px 1px rgba(255, 255, 255, 0.4) inset,
    0 2px 5px rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease-in;
  color: #f2f2f2;
}

.c-popup__note {
  opacity: 0.2;
  font-size: 1em;
  margin-top: 6px;
  margin-bottom: 60px;
}
/* Error Message Css */
.error {
  color: #ff5722;
  margin-top: 58px;
}
/* CSS by Abhishek Ends here  */
.qutation-wrap {
  margin-top: 1.5em;
}
.qutation-wrap .head {
  font-size: 19px;
  font-weight: 500;
  color: #333;
}
.qutation-form {
  padding: 0px;
  border: 1px solid #eee;
  margin-top: 1.5em;
}
.company-detail {
  border-bottom: 1px solid #eee;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  margin-right: 0.3em;
}
.wrapper-date {
  border-bottom: 1px solid #eee;
  padding: 12px 20px;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  margin-right: 0.3em;
}
.wrapper-date {
}
.company-products-wrap {
  padding: 12px 20px 10px 20px;
  overflow: hidden;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}
.message_discription {
  display: flex;
  align-items: center;
}
textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 200px;
  padding: 20px;
  resize: none;
  max-width: 100%;
}
.message_discription span {
  float: left;
  margin-top: 8px;
  margin-left: 3px;
}
.message_discription i {
  float: left;
  color: #ff5722;
}
.float_demander {
  float: right;
}
.company-products-wrap section {
  display: inline-flex;
}
.demander section {
  margin-right: 0.5em;
}
section .title {
  font-size: 15px;
  display: inline-block;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  margin-left: 5px;
}
.info img {
  min-width: 160px;
  height: 160px;
}
.info {
  margin-top: 10px;
  margin-bottom: 10px;
}
.prdctName {
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
}
.textfield input[type="text"] {
  width: 75px;
  height: 30px;
  border: solid 1px #c8d2e0;
}
.textfield select {
  width: 75px;
  height: 30px;
  border: solid 1px #c8d2e0;
}
.product {
}
.demander {
}
.email input {
  height: 40px;
  padding: 10px;
}
.btn-submit {
  height: 40px;
  padding: 0 20px;
  line-height: 40px;
  font-size: 15px;
  background: #ff5722;
  color: #fff;
  border: none;
  margin-bottom: 13px;
  margin-top: -5px;
}
.wrap-date {
  float: right;
}
.fl {
  float: left;
}
textarea,
input,
select[type="text"] {
  outline: none;
  border: solid 1px #c8d2e0;
}
.bg_wrapper,
.pg-cnt-bx {
  background-color: #fbfbfd;
  margin-bottom: 30px;
}
.border_none {
  border: none;
  padding-bottom: 0px;
  padding-top: 0px;
}
.row_margin {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: 16px;
  margin-left: -8px;
}
.brand {
  margin-top: 5px;
  margin-bottom: 4px;
  float: left;
  font-size: 13px;
  color: #555;
  text-align: left;
}

.title_brand {
  float: left;
  line-height: 18px;
  text-align: justify;
  color: #222;
}

.price_price {
  margin-top: 8px;
  float: left;
  font-size: 14px;
  text-align: left;
}

.offer_price {
  color: #777;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
}
.color_aed {
  color: #777;
  font-size: 13px;
}
.offer_box {
  padding: 5px 6px;
  background-color: #cbfbc6;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  margin-top: -5px;
  font-size: 12px;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  color: #64985c;
}
.price_product {
  font-weight: 600;
  font-size: 15px;
}

.wrapper_shadow {
  overflow: hidden;
  padding: 15px;
  float: left;
  width: 100%;
  background: #fff;
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  text-align: center;
}
.card_margin {
  float: left;
  padding: 5px;
}
.button_increase,
.button_decrease {
  height: 25px;
  min-width: 25px;
  margin: 0;
  max-width: 100%;
  padding: 0;
  border: 1px solid #eeeeee;
  font-size: 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: #f1f1f1;
  border-radius: 100%;
  float: left;
  cursor: pointer;
  margin-top: 10px;
}
.c-formInput {
  width: 100%;
  min-width: 55px;
  border-radius: 0;
  display: inline-block;
  vertical-align: top;
  height: 25px;
  border-left: 0;
  font-size: 13px;
  text-align: center;
  border: none;
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
  float: left;
  margin: 0px 10px;
  margin-top: 10px;
}

@media screen and (max-width: 1000px) {
  .float_demander {
    float: left;
    margin-top: 25px;
    margin-bottom: 10px;
  }
  section .title {
    margin-bottom: 0.8em;
    margin-left: 5px;
  }
  .qutation-wrap {
    padding-top: 20px;
  }
  .wrapper_checkbox {
    padding-bottom: 25px;
  }
  .message_discription i {
    float: left;
    color: #ff5722;
    margin-right: 5px;
    height: 40px;
  }
  .message_discription span {
    float: none;
    line-height: 17px;
  }
  .wrapper-date {
    padding: 0px;
  }
  textarea::placeholder {
    line-height: 20px;
  }
  .padding_border {
    padding-top: 4px;
  }
}
@media screen and (max-width: 768px) {
  .md-layout.md-gutter {
    margin-right: 0px;
    margin-left: 5px;
  }
  .prdctName {
    margin-top: 15px;
  }
  .brand {
    margin-top: 2px;
    font-size: 12px;
  }

  .title_brand {
    font-size: 13px;
  }

  .price_product {
    font-size: 14px;
  }
}
@media screen and (max-width: 600px) {
  .message_discription i {
    height: 52px;
  }
  textarea {
    margin-top: 10px;
  }
  .float_demander {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .info img {
    margin-bottom: 10px;
  }
  .title_brand {
    font-size: 13px;
  }
  .card_margin {
    width: 100%;
  }

  .bg_wrapper,
  .pg-cnt-bx {
    padding-left: 15px;
    padding-right: 15px;
  }

  .row_margin {
    margin-left: 0px;
    margin-right: 0px;
  }

  .qutation-wrap .head {
    font-size: 14px;
  }

  .company-detail {
    font-size: 13px;
  }
  i.material-icons {
    font-size: 22px !important;
  }

  .vd-wrapper.calender {
    padding: 0px 0px 5px 0px !important;
  }
  .message_discription span {
    float: none;
    line-height: 17px;
    font-size: 13px;
  }
  textarea::placeholder {
    font-size: 13px;
  }

  .btn-submit {
    height: fit-content;
    padding: 20px 12px;
    line-height: 0px;
    font-size: 13px;
    background: #ff5722;
    color: #fff;
    border: none;
    margin-bottom: 13px;
    margin-top: -5px;
  }
  .qutation-wrap {
    padding-top: 5px;
  }
  .price_price {
    font-size: 13px;
  }
  .card_margin {
    padding-left: 0px;
    padding-right: 0px;
  }
  section .title {
    margin-left: 0px;
  }

  .company-detail {
    padding-left: 10px;
  }
}

@media screen and (max-width: 320px) {
  .bg_wrapper,
  .pg-cnt-bx {
    padding-right: 55px;
  }

  .company-products-wrap {
    padding: 12px 10px 10px 10px;
  }

  .message_discription span {
    font-size: 12px;
  }
  section .title {
    font-size: 14px;
  }

  .btn-submit {
    margin-top: -5px;
    margin-bottom: 10px;
  }

  .info {
    margin-top: 5px;
    margin-bottom: 0px;
  }

  .card_margin {
    padding-left: 5px;
    padding-right: 5px;
  }
  section .title {
    margin-left: 5px;
  }
}
</style>
