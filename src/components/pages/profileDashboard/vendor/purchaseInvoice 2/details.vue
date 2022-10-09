<template>
  <div v-if="invoice">
    <div class="row_order_table">
    <div class="col-sm-12 col-md-12 col-xl-8 p-0 m-auto">
      <div class="fl dflex_mob">
        <!-- <md-button class="md-primary export_button mr-3" @click="$router.go(-1)"
          >Back</md-button
        > -->
        <md-button
          class="md-primary export_button mr-3"
          to="/dashboard/vendor/purchase-invoice/"
        >
          <md-icon>keyboard_backspace</md-icon>
        </md-button>
        <md-button
          class="md-primary export_button mr-3"
          :to="{
            name: 'vendorEditOrder',
            params: {
              id: invoice.order_id,
            },
          }"
        >
          <md-icon>grading</md-icon>
          {{ invoice.order_id }}
        </md-button>
      </div>
      <div class="fr dflex_mob">
        <md-button
          v-if="paidButton && invoice.payment_status === 'Unpaid'"
          @click="changePaymentStatus()"
          class="md-primary export_button mr-3 label_green"
        >
          {{
            invoice.payment_status == "Unpaid"
              ? "Mark as Paid"
              : "Mark as Not Paid"
          }}
        </md-button>
        <md-button class="md-primary export_button" @click="printDiv()"
          >Download</md-button
        >
      </div>
    </div>


    <div class="col-sm-12 col-md-11 col-xl-8 wrapper_order_table" id="invoice">
      <div class="wrapper_img">
        <img v-if="invoice.to_address.logo" :src="invoice.to_address.logo" />
        <div v-else class="profile-default-text">
          <span class="text">{{
            invoice.to_address.trade_name_en.substring(0, 1)
          }}</span>
        </div>
        <!-- <img src="https://dev.uaect.com/static/img/uaectlogo.36e70a3.png" /> -->
      </div>
      <h5 class="id_no">Invoice ID: {{ invoice.id }}</h5>

      <div class="col-sm-6 col-md-8 col-xl-8 p-0 fl invoice-left">
        <div class="col-sm-12 p-0 fl box_from">
          <strong class="col-sm-12 p-0 fl">From:</strong>

          <span class="col-sm-12 p-0 fl">
            {{ invoice.to_address.trade_name_en }}
          </span>
          <!-- <span class="col-sm-12 p-0 fl">
            {{ invoice.to_address.room_no }},
            {{ invoice.to_address.building }}
          </span>
          <span class="col-sm-12 p-0 fl">
            {{ invoice.to_address.street.substring(0, 18) }},
            {{ invoice.to_address.city }}
          </span> -->
          <span class="col-sm-12 p-0 fl">
            {{ invoice.to_address.country }}
          </span>
          <span class="col-sm-12 p-0 fl">
            <strong>Email: </strong>{{ invoice.to_address.email }}
          </span>
          <span class="col-sm-12 p-0 fl">
            <strong>Mobile: </strong>{{ invoice.to_address.phone }}
          </span>
        </div>

        <div class="col-sm-12 p-0 fl box_from mb-3">
          <strong class="col-sm-12 p-0 fl mt-4">To:</strong>
          <span class="col-sm-12 p-0 fl">
            {{ invoice.from_address.contactname }}
          </span>
          <span class="col-sm-12 p-0 fl">
            {{ invoice.from_address.room_no }},
            {{ invoice.from_address.building }}
          </span>
          <span class="col-sm-12 p-0 fl">
            {{ invoice.from_address.street.substring(0, 18) }},
            {{ invoice.from_address.city }}
          </span>
          <span class="col-sm-12 p-0 fl">
            {{ invoice.from_address.area }},
            {{ invoice.from_address.country }}
          </span>
        </div>
      </div>

      <div class="col-sm-6 col-md-4 col-xl-4 p-0 fl box_from invoice-right">
        <span class="col-sm-12 p-0 fl tab_invoice"
          ><strong>Invoice Date: </strong>
          {{ getDate(invoice.created_at) }}</span
        >
        <span class="col-sm-12 p-0 fl tab_invoice"
          ><strong>Payment:</strong>
          {{ invoice.payment_method.replaceAll("_", " ") }}
        </span>
        <span
          v-if="invoice.payment_method === 'cheque'"
          class="col-sm-12 p-0 fl tab_invoice"
          ><strong>No. of cheques:</strong>
          {{ invoice.no_of_cheques }}
        </span>
        <span class="col-sm-12 p-0 fl tab_invoice"
          ><strong>Payment Status:</strong>
          {{ invoice.payment_status === "Unpaid" ? "Not Paid" : "Paid" }}
        </span>
        <!-- <span class="col-sm-12 p-0 fl tab_invoice"
          ><strong>Payment Date:</strong> Upon Acceptance</span
        > -->
        <span class="col-sm-12 p-0 fl tab_invoice"
          ><strong>Order Id:</strong> {{ invoice.order_id }}</span
        >
      </div>

      <div class="col-sm-12 pl-0 pr-0 fl">
        <md-table>
          <md-table-row>
            <md-table-head md-numeric class="tab_padding"
              ><h3>ID</h3></md-table-head
            >
            <md-table-head class="tab_padding"
              ><h3>Item Name</h3></md-table-head
            >

            <md-table-head class="tab_padding"
              ><h3>Item Brand</h3></md-table-head
            >
            <md-table-head class="tab_padding"
              ><h3>Unit Price</h3></md-table-head
            >
            <md-table-head class="tab_padding"><h3>Quantity</h3></md-table-head>
            <md-table-head class="tab_padding"
              ><h3>Total Price</h3>
            </md-table-head>
          </md-table-row>

          <md-table-row v-for="item in invoice.items" :key="item.id">
            <md-table-cell md-numeric class="table_padding">
              {{ item.id }}
            </md-table-cell>

            <md-table-cell class="table_padding"
              ><span>{{ item.name }} </span></md-table-cell
            >

            <md-table-cell class="table_padding">
              <span> {{ item.brand }} </span>
            </md-table-cell>

            <md-table-cell class="table_padding">
              {{ currency(item.unitprice, item.currency) }}
            </md-table-cell>

            <md-table-cell class="table_padding">
              {{ item.quantity }} {{ item.unit }}
            </md-table-cell>

            <md-table-cell class="table_padding">
              {{ currency(item.quantity * item.unitprice, item.currency) }}
            </md-table-cell>
          </md-table-row>
        </md-table>

        <div class="col-sm-12 p-0 fl border_bottom"></div>

        <div class="col-sm-12 p-0 fl">
          <div class="fr col-sm-6 col-md-6 col-xl-4 p-0 invoice-totals">
            <div class="col-sm-12 fl p-0 box_bill">
              <span class="fl">Subtotal:</span>
              <span class="fr">
                {{ currency(invoice.total_price, invoice.items[0].currency) }}
              </span>
            </div>

            <div class="col-sm-12 fl p-0 box_bill">
              <span class="fl">VAT:</span>
              <span class="fr">{{
                currency(invoice.vat, invoice.items[0].currency)
              }}</span>
            </div>

            <div class="col-sm-12 fl p-0 box_bill">
              <span class="fl">Delivery Fee:</span>
              <span class="fr">{{
                currency(invoice.delivery_fee, invoice.items[0].currency)
              }}</span>
            </div>

            <div class="col-sm-12 fl p-0 box_bill">
              <span class="fl">Payment Method:</span>
              <span class="fr">{{
                invoice.payment_method.replaceAll("_", " ")
              }}</span>
            </div>

            <div class="col-sm-12 fl p-0 box_bill">
              <strong class="fl">Total:</strong>
              <strong class="fr">{{
                currency(invoice.grand_total, invoice.items[0].currency)
              }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  </div>
</template>
<script>
import moment from "moment"
import axios from "axios"
export default {
  components: {},

  data () {
    return {
      paidButton: true,
      invoice: null,
    }
  },
  created () {
    if (Object.keys(this.$route.params).length === 0 && this.$route.params.constructor === Object) {
      console.log("Diverting Back to Pending Orders")
      this.$router.go(-1)
    }
    this.getInvoiceDetails()
  },
  methods: {
    getDate (date) {
      return moment(date).format("MMM D,YYYY");
    },
    printDiv () {
      // var printContents = document.getElementById(divName).innerHTML;
      // var originalContents = document.body.innerHTML;

      // document.body.innerHTML = printContents;
      console.log(this.$vm)
      window.print();

      // document.body.innerHTML = originalContents;

    },
    async getInvoiceDetails () {
      const invoice_id = await this.$route.params.id
      const response = await axios.post("/vendor/invoice/details", {
        invoice_id
      })
      this.invoice = await response.data.result;

    },
    async changePaymentStatus () {
      const { value: Reasons } = await this.$swal.fire({
        timer: 20000,
        timerProgressBar: true,
        title: 'Are you sure buyer completed payment of the full amount as shown in the invoice ?',
        html:
          '<p style="font-size: 10px; padding-top: 10px" >You cannot undo this action.</p>',
        cancelButtonColor: "#ff5722",
        confirmButtonColor: "#64dd17",
        showCancelButton: true,
        allowOutsideClick: () => !this.$swal.isLoading()
      })

      if (Reasons) {
        try {
          const response = await axios.post("/vendor/invoice/mark-paid", {
            order_id: this.invoice.order_id

          })
          const { success, message } = await response.data;
          if (await success) {
            await this.$swal.fire(this.$helpers.successPopup("Order marked as paid."))
            this.paidButton = false;
            this.invoice.payment_status = "Paid"
          } else {
            await this.$swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error, Order does not exist.',
              showConfirmButton: false,
              timer: 15000,
              showCancelButton: true,
              timerProgressBar: true,
            })
          }
        } catch (error) {
          await this.$swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error, Please Try Again. "Network Error" ',
            showConfirmButton: false,
            timer: 15000,
            showCancelButton: true,
            timerProgressBar: true,
          })
        }

      }
    },
  }
};
</script>

<style scoped>
.pl_mob {
  padding-right: 0px;
}
/* refer app.css for the css code to print the page */
.no-orders-found {
  padding: 40px 0px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
  float: left;
  width: 100%;
}
.export_button .md-icon {
  color: white !important;

  width: 13px;
  min-width: 13px;
  height: 13px;
  font-size: 24px !important;
}

/* loading
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 40px;
  height: 40px;
  margin: 8px;
  border-radius: 50%;
  border: 4px solid #f47320;
  border-color: #f47320 transparent #f47320 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
*/
/* loading */

.loading-1 {
  border: solid 1px #c8d2e0;
  padding: 7px 13px;
  border-radius: 6px;
  color: #ff5722;
  width: 50px;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-1:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  border: 3px solid #ff5722;
  width: 18px;
  height: 18px;
  border-left: 3px solid transparent;
  border-bottom: 3px solid transparent;
  animation: loading1 1s ease infinite;
  z-index: 10;
}
.loading-1:before {
  z-index: 5;
  content: "";
  position: absolute;
  border-radius: 50%;
  border: 3px dashed #fff;
  width: 18px;
  height: 18px;
  border-left: 3px solid transparent;
  border-bottom: 3px solid transparent;
  animation: loading1 1s linear infinite;
}

@keyframes loading1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* loading */

.vd-wrapper {
  float: left;
  border: solid 1px #c8d2e0;
  padding: 9px 10px;
  border-radius: 6px;
  padding-left: 10px !important;
  width: 100%;
}

/* Abhishek */
/* tab Css */
h2 {
  margin-top: 40px;
}
.wlc-btn-wrp {
  margin-top: 40px;
}
.md-button {
  height: 42px;
}
.manage-order-tab {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pill-active .md-button {
  background-color: rgba(0, 0, 0, 0) !important;
}
.pill span {
  width: 22px;
  height: 21px;
  line-height: 21px;
  background-color: #949292;
  border-radius: 50%;
  display: inline-block;
  color: #fff;
  margin-left: 0.2em;
}

.action_icon {
  float: left;
  font-size: 22px;
  cursor: pointer;
}

.buyer_name {
  float: left;
  margin: 6px 0px 0px 10px;
  color: #4c98d1;
}
.color_click {
  color: #4c98d1;
}

.wrapper_img {
  margin: auto;
  width: fit-content;
}
.wrapper_img img {
  width: 68px;
}

.id_no {
  color: var(--md-theme-default-text-accent-on-background, rgba(0, 0, 0, 0.54));
  font-size: 16px;
  width: fit-content;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #ff5722;
}

.box_bill span {
  font-size: 13px;
  color: #717171;
  margin: 12px 0px 0px 0px;
}
.box_bill strong {
  font-size: 13px;
  color: #343434;
  margin: 12px 0px 0px 0px;
}

.export_button {
  letter-spacing: 1px;
  background-color: #213c64;
  height: fit-content;
  float: left;
  width: fit-content;
  color: #fff !important;
  padding: 8px 0px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  margin-bottom: 20px;
  margin-top: 10px;
  font-size: 12px;
}

.tab_invoice {
  width: fit-content !important;
  margin-left: 20px !important;
}

@media screen and (max-width: 1000px) {
  .pills {
    margin-left: -8px !important;
  }

  .wrapper_order_table {
    margin: 0px !important;
  }

  .tab_invoice {
    width: fit-content !important;
    margin-left: 10% !important;
  }
}



@media screen and (max-width:768px) {

  .wrapper_order_table{max-width: 100%; padding: 20px !important;}
  
  .wrapper_order_table .md-table-cell {
    font-size: 11px;
}

.row_order_table {
    margin-right: -20px;
}



}







@media screen and (max-width: 600px) {
  .pills {
    margin-right: -15px !important;
  }
  .md-button.md-theme-default.md-raised:not([disabled]) {
    margin-bottom: 7px;
    margin-right: 0px;
  }
}
/* tab css end */
.order-wrap {
  width: 100%;
  padding: 15px;
}
.order-item {
  display: flex;
  padding: 11px;
  width: 100%;
  border: 1px solid #eee;
  margin-top: 1em;
}
.order-wrap figure {
  flex: 0 0 111px;
  text-align: center;
  margin-right: 1.5em;
}
.order-wrap figure img {
  width: 100%;
  max-width: 100%;
  height: 100%;
  object-fit: contain;
}
.right {
  flex: 1 1;
  display: flex;
  justify-content: space-between;
}
.right .title {
  font-size: 14px;
  font-weight: 500;
}
.right .detail {
  font-size: 14px;
  color: #888;
  margin-top: 0.3em;
}
.right .detail span {
  color: #333;
  font-weight: 500;
}
.action-right {
  display: block;
  align-self: center;
  text-align: center;
}
.action-right .price {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 0.3em;
}
.price.vat {
  font-size: 14px;
}
.status {
  background: #fbd5c9;
  padding: 5px 7px;
  border-radius: 4px;
}
.edit-status {
  display: flex;
  align-items: center;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}
.edit-ico {
  border-radius: 4px;
  width: 30px;
  height: 30px;
  background: rgba(56, 174, 4, 0.2);
  align-items: center;
  line-height: 30px;
  color: #38ae04 !important;
  margin-right: 0.5em;
  font-size: 21px;
  text-align: center;
}

.fl {
  float: left;
}
.wrapper_order_table {
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  padding: 25px;
  margin-bottom: 20px;
  overflow: hidden;
  margin: auto;
  margin-top: 10px;
}

.fr {
  float: right;
}
.fl {
  float: left;
}
.md-table-head-label {
  font-size: 14px;
}
.md-content.md-table-content.md-scrollbar.md-theme-default {
  margin-top: 10px;
}
textarea,
input {
  outline: none;
}
.md-table-cell-container img {
  width: 40px;
  float: left;

  margin-bottom: 5px;
  border: solid 1px #c8d2e0;
}
.label_green {
  letter-spacing: 1px;
  background: #64dd17;
  color: #fff;
  padding: 8px 0px;
  border-radius: 3px;
}

.label_red {
  letter-spacing: 1px;
  background: #ff5722;
  color: #fff;
  padding: 8px 0px;
  border-radius: 3px;
}

.label_gray {
  background: #e6e4e4;
  color: #fff;
  padding: 8px 10px;
  border-radius: 3px;
  float: left;
  width: 102px;
}

.label_white {
  background: #e4e4e4;
}
.md-content.md-theme-default {
  margin-top: 10px;
}
.m-auto {
  margin: auto;
}
.md-field {
  margin: -7px 0 25px;
}

.box_from strong {
  margin: 0px 0px 8px 0px;
}
.box_from span {
  margin: 5px 0px 5px 0px;
}

.border_bottom {
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin-bottom: 15px;
}

@media screen and (max-width: 1200px) and (min-width: 1010px) {
  .wrapper_order_table {
    width: 100%;
    max-width: 100%;
  }
}
@media screen and (max-width: 1000px) {
  wrapper_order_table {
    margin-top: 20px;
  }
  .m-auto {
    margin: 0 !important;
  }

  .md-content.md-theme-default {
    margin-top: 10px;
  }
  .md-field {
    margin: -7px 0 0px;
  }

  .label_red {
    width: 76px;
  }
  .label_gray {
    width: 111px;
  }

  .box_from span {
    font-size: 12px;
  }
  .id_no {
    font-size: 14px;
    margin-bottom: 20px;
  }

  .wrapper_img img {
    width: 58px;
  }
  .box_from strong {
    margin: 0px 0px 10px 0px;
    font-size: 13px;
  }
  h3 {
    font-size: 11px;
  }
  td.md-table-cell.table_padding {
    font-size: 11px;
  }
  .md-table.md-theme-default .md-table-row td {
    font-size: 10px;
  }

  .export_button {
    margin-left: 0px;
    margin-right: 0px;
  }
}
@media screen and (max-width: 600px) {
  .box_order {
    width: 255px;
    margin-top: 18px;
    margin-bottom: -7px;
    float: left;
  }

  .wrapper_order_table {
    width: 100%;
  }
  .pl_mob {
    padding-left: 0px;
  }

  .md-field {
    margin: -7px 0 5px;
    margin-top: 10px;
  }

  button.md-button.md-raised.md-theme-default {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }

  .tab_invoice {
    margin-left: 0 !important;
  }

  .box_from strong {
    font-size: 12px;
    font-weight: 500;
    margin: 0px 0px 5px 0px;
  }
  .wrapper_img img {
    width: 48px;
  }
  .id_no {
    font-size: 13px;
    margin-bottom: 15px;
  }

  strong.col-sm-12.p-0.fl.mt-4 {
    margin-top: 15px !important;
  }
  h3 {
    font-size: 12px;
  }

  .md-table.md-theme-default .md-table-row td {
    font-size: 12px !important;
  }
  .box_bill span {
    font-size: 11px;
  }

  .box_bill strong {
    font-size: 12px;
  }

  .border_bottom {
    margin-bottom: 10px;
  }

  .export_button {
   margin-left: 0px;
    font-size: 11px;
    margin-right: 10px;
    padding-left: 10px !important;
    padding-right: 10px !important;
    margin-bottom: 15px;
    margin-top: -2px !important;
  
  }

.row_order_table {
    margin-right: 0px;
}

button.md-button.md-primary.export_button.mr-3.label_green.md-theme-default {
    margin-top: -3px;
}

button.md-button.md-primary.export_button.md-theme-default {
    margin-top: -3px;
}

.dflex_mob{
width: 100%;
display: flex;
align-items: center;
justify-content: center;
padding-left: 5px;

}


@media screen and (max-width: 300px) {
  .dflex_mob{
padding-left: 11px;

}
}




}
</style>
