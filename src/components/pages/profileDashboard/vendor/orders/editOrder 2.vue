<template>
  <div>
    <div
      class="col-sm-7 col-md-7 col-xl-12 wrapper_edit "
      v-if="order"
    >
      <div class="col-sm-12 pr-0 pl-0">
        <div class="col-sm-12 col-md-7 box_title pr-0 pl-0 fl">
          <h2 v-if="order.order_id">Order Number: <b>{{ order.order_id }}</b></h2>
          <span :class="{ grey: order.payment_status == 'Unpaid' }">
            {{ order.payment_status == "Unpaid" ? "Not Paid" : "Paid" }}
          </span>
        </div>
        <div class="col-sm-12 col-md-7 pt-2 pr-0 pl-0 fl box_para">
          <p v-if="order.order_id">Received On: <b>{{ created_at }}</b></p>
        </div>
        <div class="col-sm-12 col-md-5 pr-0 pl-0 fl">
          <div class="fr">
            <router-link :to="{
                name: 'purchaseInvoiceDetails',
                params: {
                  id: order.invoice.id,
                },
              }">
              <div class="invoice_button fl">
                <md-icon>receipt</md-icon> Invoice
              </div>
            </router-link>
            <div :class="{
                'status ': true,
                label_yellow: order.order_status == 'Pending',
                label_green: order.order_status == 'Shipped',
                label_violet: order.order_status == 'Delivered',
                label_orange: order.order_status == 'Cancelled',
              }">
              <span>{{ order.order_status }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-12 pl-0 pr-0 fl mt-3">
        <md-table>
          <md-table-row>
            <md-table-head md-numeric>
              <h3>Catelogue ID</h3>
            </md-table-head>
            <md-table-head>
              <h3>Item Image</h3>
            </md-table-head>
            <md-table-head>
              <h3>Item Name</h3>
            </md-table-head>
            <md-table-head>
              <h3>Item Brand</h3>
            </md-table-head>
            <md-table-head>
              <h3>Unit Price</h3>
            </md-table-head>
            <md-table-head>
              <h3>Quantity</h3>
            </md-table-head>
            <md-table-head>
              <h3>Total Price</h3>
            </md-table-head>
          </md-table-row>
          <md-table-row
            v-for="(item, index) in order.items"
            :key="index"
          >
            <md-table-cell
              md-numeric
              class="item_name"
            >{{
              item.productid
            }}</md-table-cell>
            <md-table-cell class="items_img">
              <img
                :src="item.files[0].file"
                :alt="item.name"
              />
            </md-table-cell>
            <md-table-cell class="item_name">{{ item.name }}
              <p>
                Sold By:
                <router-link
                  :to="
                    '/profile/' +
                    $helpers.slugify(item.sold_by[0].trade_name_en) +
                    '/' +
                    item.sold_by[0].id +
                    '/'
                  "
                  style="color: black; cursor: pointer"
                >{{ item.sold_by[0].trade_name_en }}</router-link>
              </p>
              <p>
                VAT ({{ item.vat_percentage }}%):
                <span style="color: black">{{ currency(item.vat) }}</span>
              </p>
            </md-table-cell>
            <md-table-cell>{{ item.brand }}</md-table-cell>
            <md-table-cell>
              {{
                item.offerprice != "0.00"
                  ? currency(item.offerprice)
                  : currency(item.unitprice)
              }}</md-table-cell>
            <md-table-cell>{{ item.quantity }} {{ item.unit }}</md-table-cell>
            <md-table-cell>
              {{
                item.offerprice != "0.00"
                  ? currency(item.offerprice * item.quantity)
                  : currency(item.unitprice * item.quantity)
              }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
      <div class="border_edit mb-3"></div>

      <div class="col-sm-12 pl-0 pr-0 fl">
        <div class="fr col-sm-4 col-md-5 col-xl-4 wrapper_total pl-0 pr-0">
          <h2 class="col-sm-12 fl pl-0 pr-0">
            Subtotal:
            <span> {{ currency(order.total_price) }} </span>
          </h2>
          <h2 class="col-sm-12 fl pl-0 pr-0">
            VAT:
            <span>{{ currency(order.vat) }}</span>
          </h2>
          <h2 class="col-sm-12 fl pl-0 pr-0">
            Delivery Fee:
            <span>{{ currency(order.delivery_fee) }}</span>
          </h2>
          <h2 class="col-sm-12 fl pl-0 pr-0">
            Payment Method:
            <span>{{ order.payment_method.replaceAll("_", " ") }}</span>
          </h2>
          <h2 class="col-sm-12 fl pl-0 pr-0 text_total">
            Total:
            <span>{{ currency(order.grand_total) }}</span>
          </h2>
        </div>
        <div class="fr col-sm-8 col-md-7 col-xl-8 wrapper_total pl-0 pr-0">
          <h2 class="col-sm-12 fl pl-0 pr-0">Delivery Address:</h2>
          <p class="col-sm-12 fl pl-0 pr-0">
            {{ order.billing_address.contactname }}
          </p>
          <p class="col-sm-12 fl pl-0 pr-0">
            {{ order.billing_address.room_no }},
            {{ order.billing_address.building }},
            {{ order.billing_address.landmark }}
          </p>
          <p class="col-sm-12 fl pl-0 pr-0">
            {{ order.billing_address.street }}, {{ order.billing_address.area }}
          </p>
          <p class="col-sm-12 fl pl-0 pr-0">
            {{ order.billing_address.city }},
            {{ order.billing_address.country }} -
            {{ order.billing_address.postal_code }}
          </p>
          <h2 class="col-sm-12 fl pl-0 pr-0">Mobile:</h2>
          <p class="col-sm-12 fl pl-0 pr-0">
            {{ order.billing_address.contactnumber }}
          </p>
        </div>
      </div>

      <div class="border_edit mb-1 mt-4"></div>
      <div class="row_margin">
        <div class="col-sm-12 pl-0 pr-0 fl mt-4 mobmt-0">
          <div class="col-sm-12 col-md-12 col-xl-8 pl-0 pr-0 fl">
            <div class="col-sm-4 fl box_list_cash">
              <VueDatePicker
                v-model="form.delivery_date"
                color="#f47320"
                :disabled="order.order_status != 'Pending'"
                placeholder="Choose Delivery Date"
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
              <!-- <select v-model="form.payment_status">
                <option value="">Payment Status</option>
                <option value="Unpaid">Not Paid</option>
                <option value="Paid">Paid</option>
              </select> -->
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
              <!-- <select v-model="form.shipping_by">
                <option value>Shipping by</option>
                <option value="Me">Shipping by me</option>
                <option value="Nex">Shipping by Nex</option>
              </select> -->
              <vSelect
                class="tall-box mt-10"
                label="name"
                v-model="form.shipping_by"
                :reduce="(obj) => obj.value"
                :options="[

                  { value: 'Nex', name: 'Shipping by Nex.' },
                ]"
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
                  (!form.delivery_date && order.order_status == 'Pending') ||
                  !form.payment_status ||
                  !form.shipping_by
                "
                :class="{
                  label_grey:
                    (!form.delivery_date && order.order_status == 'Pending') ||
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
</template>
<script>
import axios from "axios"
import vSelect from "vue-select"
import moment from "moment"
import {
  required
} from "vuelidate/lib/validators";
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
  created () {
    console.log("Logged")
    console.log("Detect")
    if (Object.keys(this.$route.params).length === 0 && this.$route.params.constructor === Object) {
      console.log("Diverting Back to Pending Orders")
      // this.$router.push("/dashboard/vendor/orders/pending")
      this.$router.go(-1)

    } else {
      this.getOrderDetails()
      this.yesterday = moment().subtract(1, 'days')._d
    }

  },
  computed: {
    created_at () {
      return moment(this.order.created_at).format('DD-MM-YYYY')
    }
  },
  beforeDestroy () {
    this.$store.commit("SET_VENDOR_ORDERS_ACTIVE_TAB", "")
  },
  data () {
    return {
      form: {
        selectedDate: "",
        shipping_by: "",
        delivery_date: null,
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
  validations () {
    if (this.buttonName == 'Accept' || this.buttonName == 'Not Delivered') {
      return {
        form: {
          shipping_by: { required },
          payment_status: { required },

        }
      }
    }
    else if (this.buttonName == 'Delivered') {
      return {
        form: {
          payment_status: { required },
          shipping_by: {},
        }
      }
    }

  },

  methods: {
    async getOrderDetails () {
      const id = await this.$route.params.id;
      const response = await axios.post("/vendor/order/details", {
        order_number: id
      })
      console.log(response.data)
      const { result, success, total_cancelled,
        total_delivered,
        total_pending,
        total_shipped } =
        await response.data
      this.count = {
        total_cancelled,
        total_delivered,
        total_pending,
        total_shipped
      };
      this.order = await result
      await this.$store.commit("SET_VENDOR_ORDERS_COUNT", this.count)
      // Initializing things after getting orders Object
      await this.getButtonName()
      this.form.payment_status = await this.order.payment_status
      this.form.shipping_by = await this.order.shipping_by
      await this.$store.commit("SET_VENDOR_ORDERS_ACTIVE_TAB", this.order.order_status)
      this.order.order_status != "Pending" ? this.form.delivery_date = this.order.delivery_date : this.form.delivery_date = null
    },
    async changeOrderStatus (data) {

      try {
        if (data == "Accept" || data == "Not Delivered") {
          this.submitted = true;
          this.status = 'Shipped';

          const isFormValid = this.isFormValid()
          if (!isFormValid) {
            console.log("Form Invalid")
            return
          }
          this.form = { ...this.form, status: "Shipped", order_id: this.order.order_id, delivery_date: this.order.delivery_date, payment_method: this.order.payment_method }
        } else if (data == "Delivered") {
          this.submitted = true;
          this.status = 'Delivered'
          const isFormValid = this.isFormValid()
          if (!isFormValid) {
            console.log("Form Invalid")
            return
          }
          this.form = { ...this.form, status: data, order_id: this.order.order_id, delivery_date: this.order.delivery_date, payment_method: this.order.payment_method }
        } else if (data == "Resolve") {
          alert("yet to be implemented")
          return
        }

        else {
          this.form = {
            status: "Cancelled", order_id: this.order.order_id, delivery_date: this.form.delivery_date,
            payment_method: this.form.payment_method,
            shipping_by: this.form.shipping_by,
            payment_status: this.form.payment_status
          }
          const { value: Reasons } = await this.$swal.fire({
            timer: 20000,
            timerProgressBar: true,
            title: 'Are you sure you want to cancel this order ?',
            html:
              '<p style="font-size: 10px; padding-top: 10px" >You cannot undo this action.</p>',
            cancelButtonColor: "#ff5722",
            confirmButtonColor: "#64dd17",
            confirmButtonText: "Yes",
            showCancelButton: true,
            allowOutsideClick: () => !this.$swal.isLoading()
          })
          if (!Reasons) return
        }

        this.$Progress.start()
        const rawResponse = await axios.post("vendor/orders/status", this.form)
        const response = await rawResponse.data;
        if (response.success) {
          this.$Progress.finish()
          this.$swal.fire(this.$helpers.successPopup(`Order Status : ${data}.`))
          this.$router.go(-1);

        }

      } catch (error) {
        this.$Progress.fail()
        this.$swal.fire(this.$helpers.errorPopup("Error updating status. Please Try Again."))
        console.log(error);
      }
    },
    isFormValid () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      } else {
        return true
      }

    },
    getButtonName () {
      if (this.order.order_status == 'Pending') {
        this.buttonName = "Accept"
      } else if (this.order.order_status == 'Shipped') {
        this.buttonName = "Delivered"
      } else if (this.order.order_status == 'Delivered') {
        this.buttonName = "Not Delivered"
      } else {
        this.buttonName = "Resolve"
      }
    },



  }
};
</script>
<style scoped>
.invoice_button {
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
  float: left;
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
    max-width: 100%;
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
    font-size: 13px !important;
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
  }
  .label_yellow {
    width: 48%;
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
    font-size: 12px !important;
  }
  .label_orange {
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
    font-size: 12px;
  }

  .label_green {
    font-size: 12px;
  }
  .label_yellow {
    font-size: 12px;
  }
}
</style>
