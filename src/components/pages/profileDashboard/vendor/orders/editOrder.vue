<template>
  <div>
    <div class="col-sm-12 col-xl-12 wrapper_edit" v-if="order">
      <div
        class="sectionBox col-sm-12 p-0"
        v-infinite-scroll="loadPendingOrders"
        :infinite-scroll-listen-for-event="true"
        infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="0"
      >
        <div v-if="order">
          <div class="orderContainer col-sm-12 p-0">
            <div class="orderHead col-sm-12">
              <div class="order_id">
                <div class="idNo box_title">
                  Order
                  <b style="padding-left: 4px">#{{ order.order_id }}</b>
                  <b style="padding-left: 4px">#{{ order.profile_id }}</b>
                  <span :class="{ grey: order.payment_status == 'Unpaid' }">
                    {{ order.payment_status == "Unpaid" ? "Not Paid" : "Paid" }}
                  </span>
                </div>
                <div class="col-sm-12 col-md-7 pt-2 pr-0 pl-0 fl box_para">
                  <p v-if="order.order_id">
                    Received On: <b>{{ created_at }}</b>
                  </p>
                </div>
                <br />
              </div>
              <div class="col-sm-6 col-md-5 pr-0 pl-0 fl">
                <div class="fr">
                  <router-link
                    :to="{
                      name: 'purchaseInvoiceDetails',
                      params: {
                        id: order.invoice.id,
                      },
                    }"
                  >
                    <div class="invoice_button fl">
                      <md-icon>receipt</md-icon> Invoice
                    </div>
                  </router-link>
                  <div
                    class="invoice_button"
                    :class="{
                      'status ': true,
                      label_yellow: order.order_status == 'Pending',
                      label_green: order.order_status == 'Shipped',
                      label_violet: order.order_status == 'Delivered',
                      label_orange: order.order_status == 'Cancelled',
                    }"
                  >
                    <span>{{ order.order_status }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="orderProducts col-sm-12 p-0"
              v-for="(item, itemIndex) in order.items"
              :key="itemIndex"
            >
              <div class="orderRow cart-listing col-sm-12 pl-0 pr-0">
                <div class="content col-sm-12">
                  <ul class="productShowing col-sm-12">
                    <li class="col-sm-12 pl-0 pr-0">
                      <div class="leftContent col-sm-12 pl-0 pr-0 d-flex mt-5">
                        <div class="imgHolder">
                          <a href="#" class="link">
                            <img :src="item.variation.files[0]" :alt="item.name" />
                          </a>
                        </div>
                        <div class="description">
                          <div class="name">{{ item.name }}</div>
                          <div class="md-layout">
                            <div class="price">
                              {{
                                item.offerprice !== "0.00"
                                  ? currency(item.offerprice, item.currency)
                                  : currency(item.unitprice, item.currency)
                              }}
                            </div>
                          </div>
                          <div class="boxWrap">
                            <div class="option">
                              <div class="optionType">Quantity :</div>
                              <span class="seller">{{ item.quantity }}</span>
                            </div>
                            <div class="option">
                              <div class="optionType">Color :</div>
                              <span class="seller">{{ item.variation.color }}</span>
                            </div>
                            <div class="option">
                              <div class="optionType">Brand :</div>
                              <span class="seller">{{ item.brand }}</span>
                            </div>
                            <div class="option" v-if="item.variation.pricing_type=='pricing'">
                              <div class="optionType">Size :</div>
                              <span class="seller">{{ item.variation.size.size }}</span>
                            </div>
                            <div class="option custom" v-else>
                              <span class="seller">Custom order</span>
                            </div>
                          </div>
                        </div>
                        <div class="description boxWrap">
                          <h3>Seller Info</h3>
                          <div class="option">
                            <div class="optionType">Sold By :</div>
                            <span class="seller">{{
                              item.sold_by[0].trade_name_en
                            }}</span>
                          </div>
                          <div class="option">
                            <div class="optionType">Seller ID :</div>
                            <span class="seller">{{ item.stock_location.userid }}</span>
                          </div>
                          <div class="option">
                            <div class="optionType">Name :</div>
                            <span class="seller">{{
                              item.stock_location.contactname
                            }}</span>
                          </div>
                          <div class="option">
                            <div class="optionType">Mobile :</div>
                            <span class="seller">{{
                              item.stock_location.contactnumber
                            }}</span>
                          </div>
                          <div class="option">
                            <div class="optionType">Address:</div>
                            <span class="seller"
                              >{{ item.stock_location.room_no }},{{
                                item.stock_location.building
                              }},{{ item.stock_location.landmark }},{{
                                item.stock_location.area
                              }},{{ item.stock_location.city }},
                              {{ item.stock_location.country }}</span
                            >
                          </div>
                          <div class="option">
                            <div class="optionType">Postal Code:</div>
                            <span class="seller">{{
                              item.stock_location.postal_code
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="leftContent col-sm-12 col-md-12 row p-4 ml-4 pb-5">
              <div class="description col-sm-12 mt-4 col-md-6" style="line-height: 2">
                <h2>Delivery Info</h2>
                <div class="option">
                  <div class="optionType">Account Name :</div>
                  <span class="seller">{{
                              order.account_name
                            }}</span>
                </div>
                <div class="option">
                  <div class="optionType">Attention :</div>
                  <span class="seller">{{ order.billing_address.contactname }}</span>
                </div>
                <div class="option">
                  <div class="optionType">Mobile :</div>
                  <span class="seller">{{ order.billing_address.contactnumber }}</span>
                </div>
                <div class="option">
                  <div class="optionType">Address:</div>
                  <span class="seller"
                    >{{ order.billing_address.room_no }},{{
                      order.billing_address.building
                    }},{{ order.billing_address.landmark }},{{
                      order.billing_address.area
                    }},{{ order.billing_address.city }},
                    {{ order.billing_address.country }}</span
                  >
                </div>
                <div class="option">
                  <div class="optionType">Postal Code:</div>
                  <span class="seller">{{ order.billing_address.postal_code }}</span>
                </div>
              </div>
              <div class="description col-sm-12 mt-4 col-md-6" style="line-height: 2">
                <h2>Invoice Info</h2>
                <div class="option">
                  <div class="optionType">Invoice ID:</div>
                  <span class="seller">{{ order.invoice.id }}</span>
                </div>
                <div class="option">
                  <div class="optionType">Subtotal:</div>
                  <span class="seller">{{ currency(order.total_price) }}</span>
                </div>
                <div class="option">
                  <div class="optionType">VAT:</div>
                  <span class="seller">{{ currency(order.vat) }}</span>
                </div>
                <div class="option">
                  <div class="optionType">Delivery Fee:</div>
                  <span class="seller">{{ currency(order.delivery_fee) }}</span>
                </div>
                <div class="option">
                  <div class="optionType">Payment Method:</div>
                  <span class="seller">{{
                    order.payment_method.replaceAll("_", " ")
                  }}</span>
                </div>
                <div class="option">
                  <div class="optionType">Total:</div>
                  <span class="seller">{{ currency(order.grand_total) }}</span>
                </div>
              </div>
            </div>
            <div class="col-sm-12 pl-5 pr-5 mb-1">
              <div class="row_margin">
                <div class="col-sm-12 pl-0 pr-0 fl mt-4 mobmt-0">
                  <div class="col-sm-12 col-md-12 col-xl-8 pl-0 pr-0 fl">
                    <div class="col-sm-4 fl box_list_cash">
                      <VueDatePicker
                        v-model="form.pickup_date"
                        color="#f47320"
                        :disabled="order.order_status != 'Pending'"
                        placeholder="Ready To Collect Date"
                        clearable
                        validate
                        :min-date="yesterday"
                        class="editOrder-datePicker"
                      />
                      <transition name="fade">
                        <p
                          class="error"
                          v-if="
                            this.submitted &&
                            !$v.form.payment_status.required &&
                            (this.buttonName == 'Delivered' ||
                              this.buttonName == 'Shipped' ||
                              this.buttonName == 'Not Delivered')
                          "
                        >
                          Payment Status is required
                        </p>
                      </transition>
                    </div>
                    <div class="col-sm-4 fl box_list_cash">
                      <vSelect
                        class="tall-box mt-10"
                        label="name"
                        v-model="form.payment_status"
                        :reduce="(obj) => obj.value"
                        :options="[
                          { name: 'Paid', value: 'Paid' },
                          { name: 'Not Paid', value: 'Unpaid' },
                        ]"
                        placeholder="Payment Status"
                      >
                      </vSelect>
                      <transition name="fade">
                        <p
                          class="error"
                          v-if="
                            this.submitted &&
                            !$v.form.payment_status.required &&
                            (this.buttonName == 'Delivered' ||
                              this.buttonName == 'Shipped' ||
                              this.buttonName == 'Not Delivered')
                          "
                        >
                          Payment Status is required
                        </p>
                      </transition>
                    </div>
                    <div class="col-sm-4 fl box_list_cash">
                      <vSelect
                        class="tall-box mt-10"
                        label="name"
                        v-model="form.shipping_by"
                        :reduce="(obj) => obj.value"
                        :options="[{ value: 'Nex', name: 'Shipping by Nex.' }]"
                        placeholder="Shipping by"
                      >
                      </vSelect>
                      <transition name="fade">
                        <p
                          class="error"
                          v-if="
                            this.submitted &&
                            !$v.form.shipping_by.required &&
                            (this.buttonName == 'Shipped' ||
                              this.buttonName == 'Not Delivered')
                          "
                        >
                          Shipping By is required
                        </p>
                      </transition>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-12 col-xl-4 pl-0 pr-0 fl">
                    <div class="fr">
                      <button
                        v-if="!(order.order_status == 'Cancelled')"
                        class="cancel_edit"
                        @click="changeOrderStatus('Cancelled')"
                      >
                        cancel
                      </button>
                      <button
                        :disabled="
                          (!form.pickup_date && order.order_status == 'Pending') ||
                          !form.payment_status ||
                          !form.shipping_by
                        "
                        :class="{
                          label_grey:
                            (!form.pickup_date && order.order_status == 'Pending') ||
                            !form.payment_status ||
                            !form.shipping_by,
                        }"
                        class="accept_edit"
                        @click="changeOrderStatus(buttonName)"
                      >
                        {{ buttonName }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import vSelect from "vue-select";
import moment from "moment";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    vSelect,
  },

  props: {
    // order: {
    //   type: Object,
    //   required: true
    // },
    // count: {
    //   type: Object,
    //   required: true
    // }
  },
  created() {
    console.log("Logged");
    console.log("Detect");
    if (
      Object.keys(this.$route.params).length === 0 &&
      this.$route.params.constructor === Object
    ) {
      console.log("Diverting Back to Pending Orders");
      // this.$router.push("/dashboard/vendor/orders/pending")
      this.$router.go(-1);
    } else {
      this.getOrderDetails();
      this.yesterday = moment().subtract(1, "days")._d;
    }
  },
  computed: {
    created_at() {
      return moment(this.order.created_at).format("MMM D,YYYY");
    },
  },
  beforeDestroy() {
    this.$store.commit("SET_VENDOR_ORDERS_ACTIVE_TAB", "");
  },
  data() {
    return {
      form: {
        shipping_by: "",
        pickup_date: null,
        payment_status: "",
      },
      yesterday: "",
      order: null,
      submitted: false,
      status: "",
      dateDisabled: false,
      buttonName: "",
    };
  },
  validations() {
    if (this.buttonName == "Accept" || this.buttonName == "Not Delivered") {
      return {
        form: {
          shipping_by: { required },
          payment_status: { required },
        },
      };
    } else if (this.buttonName == "Delivered") {
      return {
        form: {
          payment_status: { required },
          shipping_by: {},
        },
      };
    }
  },

  methods: {
    async getOrderDetails() {
      const id = await this.$route.params.id;
      const response = await axios.post("/vendor/order/details", {
        order_number: id,
      });
      console.log(response.data);
      const {
        result,
        success,
        total_cancelled,
        total_delivered,
        total_pending,
        total_shipped,
      } = await response.data;
      this.count = {
        total_cancelled,
        total_delivered,
        total_pending,
        total_shipped,
      };
      this.order = await result;
      await this.$store.commit("SET_VENDOR_ORDERS_COUNT", this.count);
      // Initializing things after getting orders Object
      await this.getButtonName();
      this.form.payment_status = await this.order.payment_status;
      //this.form.shipping_by = await this.order.shipping_by;
      this.form.shipping_by = "Nex";
      await this.$store.commit("SET_VENDOR_ORDERS_ACTIVE_TAB", this.order.order_status);
      this.order.order_status != "Pending"
        ? (this.form.pickup_date = this.order.pickup_date)
        : (this.form.pickup_date = null);
    },
    async changeOrderStatus(data) {
      try {
        if (data == "Accept" || data == "Not Delivered") {
          this.submitted = true;
          this.status = "Shipped";

          const isFormValid = this.isFormValid();
          if (!isFormValid) {
            console.log("Form Invalid");
            return;
          }
          this.form = {
            ...this.form,
            status: "Shipped",
            order_id: this.order.order_id,
            payment_method: this.order.payment_method,
          };
        } else if (data == "Delivered") {
          this.submitted = true;
          this.status = "Delivered";
          const isFormValid = this.isFormValid();
          if (!isFormValid) {
            console.log("Form Invalid");
            return;
          }
          this.form = {
            ...this.form,
            status: data,
            order_id: this.order.order_id,
            payment_method: this.order.payment_method,
          };
        } else if (data == "Resolve") {
          alert("yet to be implemented");
          return;
        } else {
          this.form = {
            status: "Cancelled",
            order_id: this.order.order_id,
            payment_method: this.form.payment_method,
            shipping_by: this.form.shipping_by,
            payment_status: this.form.payment_status,
          };
          const { value: Reasons } = await this.$swal.fire({
            timer: 20000,
            timerProgressBar: true,
            title: "Are you sure you want to cancel this order ?",
            html:
              '<p style="font-size: 10px; padding-top: 10px" >You cannot undo this action.</p>',
            cancelButtonColor: "#ff5722",
            confirmButtonColor: "#64dd17",
            confirmButtonText: "Yes",
            showCancelButton: true,
            allowOutsideClick: () => !this.$swal.isLoading(),
          });
          if (!Reasons) return;
        }
        this.$Progress.start();
        const rawResponse = await axios.post("vendor/orders/status", this.form);
        const response = await rawResponse.data;
        if (response.success) {
          this.$Progress.finish();
          this.$swal.fire(this.$helpers.successPopup(`Order Status : ${data}.`));
          this.$router.go(-1);
        }
      } catch (error) {
        this.$Progress.fail();
        this.$swal.fire(
          this.$helpers.errorPopup("Error updating status. Please Try Again.")
        );
        console.log(error);
      }
    },
    isFormValid() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        return true;
      }
    },
    getButtonName() {
      if (this.order.order_status == "Pending") {
        this.buttonName = "Accept";
      } else if (this.order.order_status == "Shipped") {
        this.buttonName = "Delivered";
      } else if (this.order.order_status == "Delivered") {
        this.buttonName = "Not Delivered";
      } else {
        this.buttonName = "Resolve";
      }
    },
  },
};
</script>
<style scoped>
.option.custom {
    color: #298d00 !important;
}
.description h3 {
  margin-bottom: 5px;
}
.invoice_button {
  height: 35px !important;
  color: white;
  background-color: #505050;
  padding: 5px 7px;
  border-radius: 4px;
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.invoice_button .md-icon {
  color: white !important;
  padding-right: 0px;
  margin-right: 4px !important;
}
.editOrder-datePicker >>> .vd-picker__input-wrapper input {
  font-size: 14px !important;
}
.vd-wrapper {
  padding: 7px;
  margin-top: 11px;
  border: 1px #c8d2e0 solid;
  height: 41px;
  border-radius: 4px;
}

.error {
  color: tomato;
  margin-top: 50px;
}
.wrapper_edit {
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  /* padding: 25px; */
  padding: 25px 25px 65px 25px;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  text-transform: capitalize;
}
.mt-10 {
  margin-top: 10px;
}
.box_title {
  float: left;
}
.box_title h2 {
  /* font-size: 20px; */
  font-size: 1.4rem;
  font-weight: 400;
  /* color: #5a9fd4; */
  float: left;
}
.box_title span {
  color: #fff;
  padding: 5px 5px;
  background: #1dd842;
  font-size: 12px;
  border-radius: 6px;
  margin: -2px 10px;
}

.grey {
  background: darkgray !important;
}

.box_title strong {
  color: #1dd842;
  font-size: 14px;
  float: left;
  margin-top: 2px;
}
.status {
  background: #fbd5c9;
  padding: 5px 7px;
  border-radius: 4px;
  float: right;
}
.label_yellow {
  background: #ffc300;
  color: #fff;
  padding: 10px 20px;
}

.label_green {
  background: #64dd17;
  color: #fff;
  padding: 10px 20px;
}
.label_grey {
  background: #ddd !important;
  color: #fff;
  padding: 10px 20px;
}

.label_violet {
  background: #3f51b5;
  color: #fff;
  padding: 10px 20px;
}

.label_orange {
  background: #ff5733;
  color: #fff;
  padding: 10px 20px;
}

.fl {
  float: left;
}
.fr {
  float: right;
}
.items_img {
  width: 80px;
  height: 80px;
}
.item_name {
  color: #4c98d1;
}
.item_name div > p span {
  color: #000;
}
.item_no {
  color: #4c98d1;
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
.cancel_edit {
  padding: 10px 30px;
  color: #fff;
  font-size: 14px;
  background-color: #ff5733;
  border: none;
  outline: none;
  border-radius: 6px;
  margin-top: 12px;
  margin-right: 5px;
}
.accept_edit {
  padding: 10px 30px;
  color: #fff;
  font-size: 14px;
  background-color: #64dd17;
  border: none;
  outline: none;
  border-radius: 6px;
  margin-top: 12px;
}

.wrapper_total h2 {
  color: #757575;
  font-size: 15px;
  float: left;
  margin: 8px 0px;
}
.wrapper_total span {
  float: right;
  font-size: 15px;
}
.border_edit {
  margin: 0px 0px;
  float: left;
  width: 100%;
  background-color: #e0e0e0;
  height: 1px;
}
.text_total {
  color: #353535 !important;
  font-size: 16px !important;
}
@media screen and (max-width: 1200px) {
  .leftContent {
    display: block !important;
  }
  .option .optionType {
    width: 130px;
  }
}
@media screen and (max-width: 1200px) and (min-width: 1010px) {
  .wrapper_edit {
    width: 100%;
    max-width: 100%;
  }
  .box_date input {
    width: 70%;
  }
}
@media screen and (max-width: 1000px) {
  .wrapper_edit {
    margin-top: 20px;
  }
  .m-auto {
    margin: 0 !important;
  }
  .box_date input {
    width: 60%;
  }
  .md-content.md-theme-default {
    margin-top: 10px;
  }
  .md-field {
    margin: -7px 0 0px;
  }
  .row_margin {
    margin-left: -15px;
    margin-right: -15px;
  }
  .accept_edit {
    margin-right: 15px;
  }
  .accept_edit {
    margin-top: 15px;
  }
}

@media screen and (max-width: 768px) {
  .orderHead {
    display: block;
  }
  .tall-box {
    font-size: 10px;
  }
  .label_violet {
    font-size: 13px;
  }
  .wrapper_order_table {
    max-width: 61.5%;
  }
  .wrapper_order_table {
    max-width: 59.7%;
  }

  .wrapper_order_table .md-table-cell {
    font-size: 11px;
  }
  .wrapper_edit {
    padding: 20px !important;
    width: 130%;
    max-width: 125%;
  }

  .box_title h2 {
    font-size: 13px;
  }
  .box_para p {
    font-size: 13px;
  }

  .invoice_button .md-icon {
    margin-right: 0px !important;
    font-size: 18px !important;
  }

  .wrapper_edit .md-table-head-label h3 {
    font-size: 12px;
  }
  .invoice_button {
    font-size: 10px !important;
  }
  .orderHead .idNo {
    font-size: 10px !important;
  }
  .box_title span {
    font-size: 10px !important;
  }
  .label_yellow {
    font-size: 13px;
  }

  .wrapper_total h2 {
    font-size: 13px;
  }

  .wrapper_total p {
    font-size: 13px;
    line-height: 20px;
  }

  .wrapper_total span {
    font-size: 12px;
  }
  .text_total {
    font-size: 14px !important;
  }
  .label_green {
    font-size: 13px;
  }
}
@media screen and (max-width: 600px) {
  .editOrder-datePicker {
    font-size: 10px !important;
  }
  .wrapper_order_table {
    max-width: 100%;
  }
  .box_order {
    width: 255px;
    margin-top: 18px;
    margin-bottom: -7px;
    float: left;
  }
  .wrapper_edit {
    margin-top: 10px;
    width: 100%;
  }
  .box_date input {
    width: 135px;
  }
  .pl_mob {
    padding-left: 0px;
  }
  .md-field {
    margin: -7px 0 5px;
    margin-top: 0px;
  }

  .box_title h2 {
    font-size: 13px;
    line-height: 19px;
    margin-bottom: 0px;
    margin-right: 10px;
  }
  .box_para p {
    margin-bottom: 15px;
    margin-top: 0px;
  }
  .box_title span {
    margin-left: 0px;
    margin-bottom: 10px;
    display: block;
    width: fit-content;
  }
  .label_yellow {
    /* width: 48%; */
    text-align: center;
    margin-top: 0px;
  }
  .mobmt-0 {
    margin-top: 0px !important;
  }

  .box_list_cash {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .cancel_edit,
  .accept_edit {
    padding: 10px 26px;
  }

  .wrapper_edit {
    padding: 10px !important;
  }

  .md-content.md-theme-default {
    margin-top: -10px;
  }
  .invoice_button {
    margin-right: 5px;
  }
}

@media screen and (max-width: 420px) and (min-width: 400px) {
  .wrapper_order_table {
    width: 300px;
  }
  .box_date input {
    width: 76%;
  }
}

@media screen and (max-width: 300px) {
  .wrapper_edit {
    margin-top: 0px;
  }
  .box_title h2 {
    font-size: 10px;
  }
  .box_para p {
    margin-bottom: 10px;
    margin-top: 0px;
  }
  .box_title span {
    margin-left: 0px;
    margin-bottom: 5px;
  }

  .invoice_button {
    width: 65px;
    font-size: 9px !important;
    float: right !important;
  }
  .label_orange {
    margin-top: 10px;
    font-size: 12px;
  }

  .wrapper_total h2 {
    font-size: 12px;
  }
  .text_total {
    font-size: 12px !important;
  }

  .box_title span {
    font-size: 10px;
  }

  .label_violet {
    margin-top: 10px;
    font-size: 12px;
  }

  .label_green {
    margin-top: 10px;
    font-size: 12px;
  }
  .label_yellow {
    margin-top: 10px !important;
    font-size: 12px;
  }
}
.unit-price {
  padding-left: 10px;
  text-decoration: line-through;
  color: rgb(34, 34, 34, 0.55) !important;
}

/* END */
.no-orders-found {
  padding: 40px 0px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
  float: left;
  width: 100%;
}
.myOrder-tabs {
  display: flex;
  flex-shrink: 0;
  align-items: stretch;
  /* margin: 15px 0; */
}
.myOrder-tabs a {
  height: 48px;
  vertical-align: middle;
  padding: 0 5px;
  padding-left: 0;
  margin: 6px 8px 6px 0;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #dfe1e5;
  border-radius: 46px;
  color: #3c4043;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  margin-left: 8px;
  position: relative;
}
.myOrder-tabs a button {
  height: auto;
  padding: 0;
  min-width: auto;
}
.iconWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin: 3px 5px 3px 3px;
  border-radius: 25px;
  -o-object-fit: cover;
  object-fit: cover;
  overflow: hidden;
  vertical-align: middle;
  width: 40px;
  background: #eee;
  color: #ff5722;
}
.tabText {
  line-height: 41px;
  display: inline;
  vertical-align: top;
}
.active-link .iconWrap {
  background: #ff5722;
  color: #fff;
}
.rt-lnk-tp-1.active-link {
  background: rgba(204, 204, 204, 0.3);
}
.rt-lnk-tp-1.active-link .md-button {
  border-bottom: none !important;
}
.rt-lnk-tp-1.active-link .md-button:before {
  background: transparent;
  background-color: transparent;
  display: none;
}
.rt-lnk-tp-1 .md-button:before {
  display: none;
}
.rt-lnk-tp-1.active-link .md-button:hover {
  background: transparent;
  background-color: transparent;
}
.orderContainer {
  background-color: #ffffff;
  margin-top: 1.5em;
  /* box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2); */
  border-radius: 12px;
}
.orderHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f3f4;
  padding-top: 10px;
  padding-bottom: 10px;
}
.orderHead .idNo {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  float: left;
}
.orderHead .muted {
  font-size: 12px;
  font-weight: 400;
  color: #888888;
  margin-top: 2px;
}
.detail-Btn {
  height: 25px;
  font-size: 12px;
  min-width: 55px;
  color: rgb(254, 87, 34) !important;
  background-color: rgba(254, 87, 34, 0.12) !important;
  margin-right: 1.5em;
  padding: 6px 8px;
}
.orderProducts {
  width: 100%;
  display: inline-flex;
}
.orderRow {
  width: 100%;
  flex-flow: row wrap;
  display: flex;
}
ul.productShowing {
  margin-top: 1.33em;
  border: 1px solid #eee;
  border-radius: 20px;
  box-shadow: 0 4px 12px 0 rgb(153 153 153 / 20%);
  overflow: hidden;
}
.productShowing li {
  border-bottom: 1px solid #efefef;
}
.productShowing li:last-child {
  border: none;
}
.cart-listing .content .link {
  text-align: center;
}
.cart-listing .content .link img {
  height: 88%;
  object-fit: contain;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
}
.cart-listing .content .description {
  flex: 1 1;
  vertical-align: top;
  min-height: 112px;
  overflow: hidden;
  line-height: 1.3;
  /* max-width: 460px; */
}
.cart-listing .content .description .name {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 500;
}
.boxWrap {
  display: block;
  padding-bottom: 1.3em;
}
.cart-listing .content .description .price {
  font-weight: 600;
  color: #444;
  margin-top: 2px;
}
.cart-listing .content .description .option {
  display: block;
  color: #000;
  font-size: 14px;
  margin-top: 5px;
}
.optionType,
.equal {
  float: left;
  width: 140px;
}
.imgHolder {
  flex: 0 0 170px;
  position: relative;
  width: 100%;
}

/* .leftContent {
  float: left;
  display: inline-flex;
} */
.orderstautsContent {
  float: left;
}
.orderstautsContent .status {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
}
.orangeIn {
  background-color: #fbc747;
  border: 2px solid #fbc747;
}
.statusTxt {
  font-weight: 600;
  font-size: 14px;
}

.label_yellow {
  background: #ffc300;
  color: #fff;
  height: 25px;
  font-size: 12px;
  min-width: 55px;
  padding: 8px 8px;
  text-transform: uppercase;
  border-radius: 4px;
  float: right;
}
.label_green {
  background: #64dd17;
  color: #fff;
  height: 25px;
  font-size: 12px;
  min-width: 55px;
  padding: 8px 8px;
  text-transform: uppercase;
  border-radius: 4px;
  float: right;
}

.statusNote {
  margin-top: 10px;
  font-size: 12px;
}
.countIn {
  font-size: 14px;
  font-weight: 600;
  color: rgb(103, 102, 102);
  /* padding-left: 12px; */
  padding-top: 12px;
}
.toggleboxBtn {
  height: 22px;
  min-width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  /* background-color: rgba(0, 0, 0, 0.1); */
}
.wrapper_view_btn {
  float: right;
}
.border_edit {
  margin: 0px 0px;
  float: left;
  width: 100%;
  background-color: #e0e0e0;
  height: 1px;
}
@media screen and (max-width: 1200px) {
  .cart-listing .content .link img {
    position: relative !important;
    width: 20%;
    margin-bottom: 15px;
  }
}
@media screen and (max-width: 1000px) {
  .statusNote {
    padding-bottom: 20px;
  }
}

@media screen and (max-width: 768px) {
  .detail-Btn {
    padding: 4px 8px !important;
  }
}

@media screen and (max-width: 600px) {
  .cart-listing .content .link img {
    height: 100%;
    object-fit: contain;
    position: unset;
    left: 0;
    right: 0;
    width: 70%;
  }
  .seller {
    font-size: 11px;
  }
  .md-button {
    margin: 0px;
  }
  .sectionBox {
    width: 100%;
  }
  .order_id {
    width: fit-content;
    float: left;
  }
  .no-orders-found {
    font-size: 13px;
  }
  .orderHead .muted {
    width: 100%;
    float: left;
    font-size: 11px;
  }

  .wrapper_view_btn {
    float: right;
    width: fit-content;
    margin-top: 0px;
    display: block !important;
  }

  .orderHead .idNo {
    font-size: 11px;
  }
  .toggleboxBtn {
    display: block;
    float: left;
    top: 2px;
  }
  .detail-Btn {
    width: fit-content;
    padding: 6px 8px;
    float: left;
    height: auto;
    margin-right: 8px;
    font-size: 11px;
    padding: 5px 7px;
  }

  .imgHolder {
    width: 100%;
    text-align: left;
    margin: auto;
    display: block;
    flex: 0 0 0px;
  }
  .cart-listing .content .link img {
    position: relative !important;
    width: 20%;
    margin: 15px 50px;
  }
  .label_yellow,
  .label_green {
    margin-top: 0px;
    font-size: 11px;
  }

  .cart-listing .content .description .name {
    width: 100%;
    /* Removed bcz it was conflicting with the price */
    /* float: left; */
    overflow: visible;
    white-space: normal;
    font-size: 11px;
  }
  .cart-listing .content .description {
    min-height: auto;
    overflow: visible !important;
    display: block;
    float: left;
    width: 100%;
    text-align: left;
    margin-top: 10px;
    padding: 10px;
    font-size: 11px !important;
  }

  .cart-listing .content .link img {
    height: auto;
  }

  .leftContent {
    display: flex;
    margin-top: 50px;
  }

  .imgHolder {
    width: 135px;
    flex: 0 0 105px;
    float: left;
    padding: 0px;
  }
  .orderRow {
    padding-bottom: 10px;
    padding-bottom: 6px;
  }

  .orderstautsContent {
    float: left;
    position: absolute;
  }
  .content.col-sm-12 {
    padding: 3px;
  }
  .orderstautsContent .align-center {
    float: right;
  }
  ul.productShowing {
    margin-top: 7px;
    overflow: hidden;
    padding-left: 7px;
    padding-right: 7px;
  }

  .statusNote {
    margin-top: 0px;
    font-size: 11px;
    width: fit-content;
    float: left;
    min-height: 20px;
  }
  .cart-listing .content .description .option {
    float: left;
    width: 100%;
  }

  .cart-listing .content .description .price {
    float: left;
    /* width: 100%; */
    font-size: 12px;
  }
  .optionType,
  .equal {
    float: left;
    width: 70px;
    font-size: 11px;
  }
  .countIn {
    padding-left: 0px;
    margin-top: 15px;
    font-size: 11px;
    padding-top: 6px;
  }
  .orderHead {
    padding-left: 10px;
    padding-right: 10px;
  }
  .statusNote {
    padding-bottom: 0px;
  }

  .cart-listing .content .description .option {
    font-size: 11px !important;
  }

  .orderContainer {
    margin-top: 13px;
  }
}

@media screen and (max-width: 360px) {
  .statusNote {
    font-size: 10px;
  }
}

@media screen and (max-width: 300px) {
  .statusNote {
    width: 170px;
    min-height: 6px;
    line-height: 16px;
  }

  .detail-Btn {
    width: fit-content;

    margin-right: 0px;
    font-size: 8px;
    padding: 3px 5px;
  }
  .order_id {
    width: 140px;
    float: left;
  }

  .orderHead .idNo {
    font-size: 9px;
  }

  .toggleboxBtn {
    top: -3px;
    width: 18px;
  }

  .orderHead .muted {
    font-size: 9px;
  }

  .countIn {
    font-size: 9px;
    padding-top: 2px;
  }

  .leftContent {
    margin-top: 45px;
  }
  .cart-listing .content .description .price {
    font-size: 11px;
  }
}
</style>
