<template>
  <div>
    <tabWallets />

    <div
      class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table pr_mob_order"
    >
      <div class="wallet-title">
        <h1>My Wallet :</h1>
        <span class="wallet-id" v-if="wallet.wallet_id">
          <span>{{ wallet.wallet_id }}</span></span
        >
      </div>
      <div class="col-sm-12 p-0 fl wrap_box_table">
        <div class="col-sm-12 col-md-3 col-xl-3 padding_main_box fl">
          <div class="col-sm-12 pr-0 pl-0 fl box_order_table padding_box">
            <h2 v-if="wallet.wallet_total">
              {{ wallet.currency }}
              {{
                parseFloat(wallet.wallet_total)
              }}
            </h2>
            <h2 v-else>...</h2>
            <h4>Total Balance</h4>
            <p class="wallet_amt_description">Includes pending, clearance waiting and available amount.</p>
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-xl-3 padding_main_box fl">
          <div class="col-sm-12 pr-0 pl-0 fl box_order_table padding_box">
            <h2 v-if="wallet.order_pending_amount">
              {{ wallet.currency + " " + parseFloat(wallet.order_pending_amount) }}
            </h2>
            <h2 v-else>...</h2>
            <h4>Amount - Pending Orders</h4>
            <p class="wallet_amt_description">Amount includes Pending Orders</p>
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-xl-3 padding_main_box fl">
          <div class="col-sm-12 pr-0 pl-0 fl box_order_table padding_box">
            <h2 v-if="wallet.order_delivered_amount">
              {{ wallet.currency + " " + parseFloat(wallet.order_delivered_amount) }}
            </h2>
            <h2 v-else>...</h2>
            <h4>Amount - Orders Delivered</h4>
            <p class="wallet_amt_description">Orders delivered! Waiting for clearance!</p>
          </div>
        </div>
        <div class="col-sm-12 col-md-3 col-xl-3  padding_main_box fl">
          <div class="col-sm-12 pr-0 pl-0 fl box_order_table padding_box">
            <h2 v-if="wallet.available_amount">
              {{ wallet.currency + " " + parseFloat(wallet.available_amount) }}
            </h2>
            <h2 v-else>...</h2>
            <h4>Available Balance</h4>
            <p class="wallet_amt_description">Withdrawable amount</p>
          </div>
        </div>
      </div>

      <div class="flex_button col-sm-12 p-0 fl">
        <button
        type="button"
        @click="placeOrder"
        class="md-button md-primary button_Add_Money md-theme-default"
      >
        <div class="md-ripple">
          <div class="md-button-content">Add Money</div>
        </div>
      </button>

        <!--button
          type="button"
          class="md-button md-primary button_Add_Money md-theme-default"
        >
          <div class="md-ripple">
            <div class="md-button-content" @click="addWallet(wallet.wallet_id)">
              Add Money
            </div>
          </div>
        </button-->
        <md-dialog
          :md-active.sync="showDialog"
          class="modal_credit width_credit"
        >
          <md-dialog-title class="title_modal_card mob_card_pl"
            >Add Money</md-dialog-title
          >

          <md-button class="md-primary close_btn" @click="showDialog = false">
            <i class="material-icons"> close </i>
          </md-button>

          <div class="col-sm-12 wrapper_inputbox pb-4 fl">
            <div class="col-sm-8 p-0 fl inputbox">
              <md-field class="mb-0">
                <label>Amount</label>
                <md-input v-model="amount_to_add" :disabled=amount_field_disabled></md-input>
              </md-field>
            </div>
            <div class="col-sm-4 p-0 fl inputbox">
              <button
                type="button"
                class="md-button md-primary button_Add_Money md-theme-default"
                v-if="amount_to_add>0" 
                :disabled=amount_field_disabled
              >
                <div class="md-ripple">
                  <div class="md-button-content" @click="amountConfirmed">
                    Pay Now
                  </div>
                </div>
              </button>
            </div>
          </div>
          
          <div class="col-sm-12 wrapper_inputbox pb-4 fl payment-box">
            <div style="margin-top:15px;" ref="paypal"></div>
          </div>
        </md-dialog>
        <div
          v-if="
            (accounts[0] && accounts[0].cards.length) ||
              (accounts[1] && accounts[1].banks.length) ||
              (accounts[2] && accounts[2].paypals.length)
          "
        >
          <button
            type="button"
            @click="withdrawMoney"
            class="md-button md-primary button_Add_Money withdraw_Money md-theme-default"
          >
            <div class="md-ripple">
              <div class="md-button-content">
                Withdraw Money
              </div>
            </div>
          </button>

          <md-dialog
          :md-active.sync="showWithdrawDialog"
          class="modal_credit width_credit"
        >
          <md-dialog-title class="title_modal_card mob_card_pl"
            >Withdraw Money</md-dialog-title
          >

          <md-button class="md-primary close_btn" @click="showWithdrawDialog = false">
            <i class="material-icons"> close </i>
          </md-button>

          <div class="col-sm-12 wrapper_inputbox pb-4 fl">
            <div class="col-sm-12 p-0 fl inputbox">
              <md-field class="mb-0">
                <label>Amount</label>
                <md-input v-model="amount_to_withdraw" :disabled=amount_withdraw_disabled></md-input>
              </md-field>
            </div>
            <div class="col-sm-12 p-0 fl inputbox withdraw-btn">
              <button
                type="button"
                class="md-button md-primary button_Add_Money md-theme-default"
                v-if="amount_to_withdraw>0 && amount_to_withdraw<=parseFloat(wallet.available_amount)" 
                :disabled="amount_withdraw_disabled"
              >
                <div class="md-ripple">
                  <div class="md-button-content" @click="withdrawWallet(wallet.wallet_id)">
                    Withdraw Now
                  </div>
                </div>
              </button>
            </div>
          </div>
          
          <div class="col-sm-12 wrapper_inputbox pb-4 fl payment-box">
            <div style="margin-top:15px;" ref="paypal"></div>
          </div>
        </md-dialog>
          
        </div>

        <div v-else>
          <router-link
            class="md-button md-primary button_Add_Money withdraw_Money md-theme-default"
            active-class="pill-active"
            exact
            to="/dashboard/vendor/wallet/accounts/"
            >Manage account
          </router-link>
        </div>
      </div>
    </div>

    <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table">
      <h1 class="mb_title">
        Mini Statements
        <a href="javascript:;" @click="printTable()"
          ><span class="text_print">
            <i class="material-icons f-s-21">print</i>
            <span>PRINT</span>
          </span>
        </a>
      </h1>

      <div
        class="col-sm-12 pl-0 pr-0 fl"
        v-infinite-scroll="loadWalletHistory"
        :infinite-scroll-listen-for-event="true"
        infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="0"
      >
        <md-table id="statements">
          <md-table-row class="header_table_wallet">
            <md-table-head md-numeric><h3>Date</h3></md-table-head>
            <md-table-head><h3>Description</h3></md-table-head>
            <md-table-head><h3>From</h3></md-table-head>
            <md-table-head><h3>Type</h3></md-table-head>
            <md-table-head><h3>Amount</h3></md-table-head>

            <md-table-head><h3>Balance</h3></md-table-head>
          </md-table-row>

          <md-table-row v-for="(tran, index) in transactions" :key="index">
            <md-table-cell class="table_padding padding_wallet"
              >{{ getDate(tran.created_at) }}
            </md-table-cell>
            <md-table-cell class="table_padding padding_wallet"
              >{{ tran.description }}
            </md-table-cell>
            <md-table-cell class="table_padding padding_wallet"
              >{{ tran.from_name }}
            </md-table-cell>
            <md-table-cell class="table_padding padding_wallet"
              >{{ tran.type }}
            </md-table-cell>
            <md-table-cell class="table_padding padding_wallet">
              {{ tran.currency + " " + tran.amount }}
            </md-table-cell>
            <md-table-cell class="table_padding padding_wallet"
              >{{ tran.currency + " " + tran.balance }}
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>

      <div class="col-sm-12 pl-0 pr-0 fl products_table">
        <md-table>
          <transition name="fade">
            <md-table-row v-if="tableLoader">
              <md-table-cell colspan="10" md-numeric
                ><center>
                  <!---<div class="lds-dual-ring"></div>--->

                  <div class="loading-1 loading"></div></center
              ></md-table-cell>
            </md-table-row>
          </transition>
          <NodataFound v-if="notFound" :msg="'No more transactions'" />
        </md-table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import NodataFound from "../../components/NodataFound";
import tabWallets from "../wallet/tabWallets";
import moment from "moment";

export default {
  data() {
    return {
      wallet: [],
      showDialog: false,
      showWithdrawDialog: false,
      accounts: [],
      transactions: [],
      notFound: false,
      busy: false,
      tableLoader: false,
      form: {
        page: 0
      },
      amount_to_add:"",
      amount_field_disabled:false,
      show_pay_button:true,
      amount_to_withdraw:"",
      amount_withdraw_disabled:false,
      show_withdraw_button:true,
      aed_to_usd_rate:1,
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
      },
      withdraw: {
        amount: 0,
        currency: "USD",
        wallet_id: ""
      }
    };
  },
  computed: {
    getDate() {
      return date => moment(date).format("MMMM D, YYYY");
    }
  },
  mounted: function() {
    const script = document.createElement("script");
    const ClientID = process.env.PAYPAL_CLIENT_ID;
    script.src = `https://www.paypal.com/sdk/js?client-id=${ClientID}`;
    //script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);

    //get currency rate
    // this.$store
    //   .dispatch("loadCurrencyRates")
    //   .then((response) => {
    //     if (response.success) {
    //       this.aed_to_usd_rate = response.result.usd;
    //     }
    //   })
    //   .catch((error) => {
    //     //console.log('error', error);
    //   });
  },
  components: {
    tabWallets,
    NodataFound
  },
  methods: {
    async loadAccounts() {
      const response = await axios.post("account/payment/accounts");
      const { result, success } = await response.data;
      if (success) {
        this.accounts = result;
      }
    },
    //wallet count
    async loadWallet() {
      const response = await axios.post("account/wallet");
      const { result, success } = await response.data;
      if (success) {
        this.wallet = result;
      }
    },

    //add money to wallet
    addWallet(token) {
      if (token) {
        window.location.href =
          process.env.BASE_URL + "account/add-wallet?wallet_id=" + token;
      }
    },

    //withdraw wallet
    async withdrawWallet(token) {
      if (token) {        
        // window.location.href =
        //   process.env.BASE_URL + "account/withdraw-wallet?wallet_id=" + token; 
        this.withdraw.amount = this.amount_to_withdraw,
        this.withdraw.currency = this.wallet.currency,
        this.withdraw.wallet_id = this.wallet.wallet_id 
        const response = await axios.post("account/withdraw-wallet-to-account",this.withdraw); 
        this.showWithdrawDialog=false;
        this.loadWallet()      
      }
    },

    //load history transaction
    async loadWalletHistory() {
      if (this.busy) return;
      this.tableLoader = true;
      this.busy = true;
      this.form.page++;
      const data = this.form;
      const response = await axios.post("account/wallet-history", data);
      const { result, success, message } = await response.data;

      if (!success) {
        this.notFound = true;
        this.tableLoader = false;
        this.busy = true;
      } else {
        this.tableLoader = false;
        this.busy = false;
        this.transactions = [...this.transactions, ...result];
      }
    },
    async placeOrder () {
      this.showDialog=true;
      this.amount_field_disabled=false;
      this.show_pay_button=false;
      this.amount_to_add='';
    },
    async withdrawMoney () {
      this.showWithdrawDialog=true;
      this.amount_withdraw_disabled=false;
      this.show_withdraw_button=false;
      this.amount_to_withdraw='';
    },
    async amountConfirmed () {
      this.amount_field_disabled=true;
      let timerInterval;
      try {
          await this.$Progress.start();
          var amount_in_dollar = this.aed_to_usd_rate * this.amount_to_add;
          this.orderp.amount.value =  amount_in_dollar.toFixed(2);
          window.paypal.Buttons({
              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: [this.orderp]
                });
              },
              onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                // ajax request
                //console.log('order', order);
                if(order.status == 'COMPLETED'){
                  this.showDialog=false;
                  //ajax call to update server
                  this.paypal.type_id = order.id;
                  this.paypal.action_type = "add";
                  this.paypal.transaction_id = order.id;
                  this.paypal.wallet_refresh_token = this.wallet.refresh_token;
                  this.paypal.amount = this.amount_to_add;
                  this.paypal.currency = 'AED';
                  const response = await axios.post(
                    "account/add-amount-to-wallet",
                    this.paypal
                  );
                  const { success, message } = await response.data;
                  if(success){
                    this.$swal({
                      position: "center",
                      icon: "success",
                      title: "Amount added successfully!",
                      showConfirmButton: false,
                      timer: 1500
                    });
                    this.loadWallet();
                    this.loadWalletHistory();
                  }
                } else {
                  this.$swal({
                    position: "center",
                    icon: "error",
                    title: "Something went wrong!!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                }
              },
              onError: err => {
                this.showDialog=false;
                console.log(err);
                this.$swal({
                  position: "center",
                  icon: "error",
                  title: "Something went wrong!!",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            })
            .render(this.$refs.paypal);
          
          await this.$Progress.finish();

        } catch (error) {
          this.$Progress.fail();
        }
      },

    printTable() {
        var divContents = document.getElementById("statements").innerHTML;
        var printWindow = window.open('', '', 'height=620,width=1280');
        printWindow.document.write('<html><head><title>Mini Statements</title>');
        printWindow.document.write(`<style type="text/css"> 
        table,td,th { border: solid 1px #535559;border-collapse: collapse;font-family: Arial; font-weight: normal;} 
        table{ width: 100%;} 
        th{ padding: 10px 15px; text-align: left; background-color: #213a63; color: #FFF;}
        th h3{ font-size: 16px; font-family: Arial; font-weight: normal; margin: 0;} 
        td{ font-size: 14px; padding: 10px 15px;}
        @media print {
            th { background-color: #213a63 !important;-webkit-print-color-adjust: exact;}
        }
        </style>`);
        printWindow.document.write('</head><body >');
        printWindow.document.write(divContents);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    } 
  },
  created() {
    this.loadAccounts();
    this.loadWallet();
    this.loadWalletHistory();
  }
};
</script>

<style scoped>
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
.wallet-title {
  display: flex;
  align-items: center;
}
.wallet-id {
  margin-left: 3px;
  background-color: #efefef;
  padding: 4px;
  font-weight: bold;
}
.wrapper_order_table {
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  padding: 25px;
  margin-bottom: 20px;
}
.padding_main_box {
  padding-right: 8px;
  padding-left: 8px;
}
.wrapper_order_table h1 {
  color: #535559;
  font-size: 18px;
  font-weight: 400;
  margin-top: 0px;
  line-height: 17px;
}

.status {
  padding: 5px 7px;
  border-radius: 4px;
}
.text_print i {
  float: left;
  font-size: 22px;
}
.text_print span {
  float: left;
  margin-top: 3px;
  margin-left: 3px;
}

.label_yellow {
  background: #ffc300;
  color: #fff;
}
.box_order_table {
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  border: solid 1px #f6f6f6;
  text-align: center;
  margin-top: 18px;
  margin-bottom: 18px;
  padding-top: 12px;
  padding-bottom: 12px;
}

.box_order_table h2 {
  color: #4c98d1;
  font-size: 18px;
  margin-bottom: 8px;
}

.box_order_table h4 {
  color: #535559;
  font-size: 14px;
}

.wrap_box_table {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.flex_button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.padding_box {
  padding: 34px 0px;
}

.button_Add_Money {
  letter-spacing: 1px;
  background-color: #ff5722;
  height: fit-content;
  float: left;
  width: fit-content;
  color: #fff !important;
  padding: 10px 5px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  margin: 10px 5px 0px 4px;
  font-size: 11px;
  border-radius: 4px;
}
.withdraw_Money {
  background-color: #213c64;
}
.text_print {
  float: right;
  font-size: 14px;
  color: #535559;
}

/*-----table_style_start-----*/
.bg_row {
  background-color: #f6f6f6;
}

.md-table.md-theme-default .md-table-row td {
  border: none !important;
}
.header_table_wallet {
  background-color: #213c64;
  margin-top: 30px;
}
.header_table_wallet h3 {
  color: #fff !important;
  font-weight: 400;
}

.mb_title {
  margin-bottom: 15px;
}
/*-----table_style_end-----*/

@media screen and (max-width: 768px) {
  .box_order_table h2 {
    font-size: 13px;
  }
  .box_order_table h4 {
    font-size: 12px;
  }

  .button_Add_Money {
    font-size: 9px;
  }

  .pr_mob_order {
    padding-right: 20px;
  }
.wrapper_order_table {
    padding: 20px;
    width: 608px;
}
  .wrapper_order_table h1 {
    font-size: 14px;
  }
  
.wrapper_order_table{margin-bottom: 10px;}



}

@media screen and (max-width: 600px) {
  .wrapper_order_table {
    padding: 10px;
    padding-right: 5px;
    width: 100%;
  }
.wallet-id {
    font-size: 10px;
}
  .box_order_table {
    margin-top: 3px;
    margin-bottom: 0px;
  }

  .box_order_table h2 {
    font-size: 11px;
  }
  .padding_box {
    padding: 16px 0px;
  }

  .box_order_table h4 {
    font-size: 10px;
  }

  .wrap_box_table .col-xl-3 {
    padding-right: 5px;
  }
  .wrapper_order_table h1 {
    font-size: 12px;
    margin-bottom: 5px;
  }

  .withdraw_Money {
    padding-left: 5px;
    padding-right: 5px;
  }

  .wrapper_order_table h1 {
    font-size: 11px;
    margin-bottom: 6px;
  }

  .text_print {
    font-size: 11px;
  }

  .header_table_wallet h3 {
    font-size: 8px;
    overflow-wrap: break-word;
    width: 42px;
    text-align: center;
  }

  .button_Add_Money {
    padding: 6px 8px;
  }

  .md-button-content {
    font-size: 9px;
  }

  .padding_main_box {
    padding-left: 0px;
  }

  .button_Add_Money {
    margin: 10px 5px 0px 0px;
  }

  .text_print i {
    float: left;
    font-size: 20px;
  }

  .text_print span {
    margin-top: 3px;
  }
}

@media screen and (max-width: 420px) and (min-width: 400px) {
  .button_Add_Money {
    margin: 10px 7px 0px 0px;
  }
}

@media screen and (max-width: 300px) {
  .wrap_box_table .col-xl-3 {
    padding-right: 3px;
    padding-left: 0px;
  }

  .box_order_table h2 {
    font-size: 8px;
    margin-bottom: 4px;
  }
  .box_order_table h4 {
    font-size: 7px;
  }
  .padding_box {
    padding: 10px 0px;
  }
  .md-button-content {
    font-size: 8px;
  }

  .wrapper_order_table h1 {
    font-size: 9px;
    margin-bottom: 5px;
  }

  .text_print {
    font-size: 9px;
  }
  .text_print span {
    margin-top: 3px;
  }
}

.btn_save:hover {
  background-color: #ff5722;
  color: #fff;
}

.modal_credit {
  width: 100%;
  max-width: 497px;
  margin: auto;
  z-index: 99999;
}
@media screen and (max-width: 600px) {
  .modal_credit {
    width: 90%;
  }
}
.md-dialog-container {
  max-height: 100% !important;
}
.title_modal_card {
  color: #535559;
  font-size: 16px;
  font-weight: 400;
  padding-left: 20px;
  padding-top: 13px;
}

.close_btn {
  cursor: pointer;
  position: absolute;
  right: 19px;
  top: 12px;
  background-color: #c7ced8;
  border-radius: 50px;
  padding: 3px;
  height: 25px;
  width: 25px;
  min-width: 2px;
}
.close_btn i {
  font-size: 16px;
  color: #213a63;
  display: flex;
}
.md-dialog .md-dialog-container {
  max-width: 28px;
}
.wallet_amt_description{
  margin-top: 15px;
  font-size: 13px;
}
.payment-box{
  max-height: 70vh;
  overflow: auto;
}
.withdraw-btn .button_Add_Money{
  width: 100%;
  margin-left: 0;
  margin-top: 20px;
}
</style>
