<template>
    <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table">
      <h1 class="mb_title">
        Transactions
      </h1>
      <p>Customer transactions need to be approve/reject by admin</p>

      <div
        class="col-sm-12 pl-0 pr-0 fl"
        v-infinite-scroll="loadTransactions"
        :infinite-scroll-listen-for-event="true"
        infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="0"
      >
        <md-table id="statements">
          <md-table-row class="header_table_wallet">
            <md-table-head md-numeric><h3>#</h3></md-table-head>
            <md-table-head><h3>Customer</h3></md-table-head>
            <md-table-head><h3>Wallet ID</h3></md-table-head>
            <md-table-head><h3>Date of Request</h3></md-table-head>
            <md-table-head><h3>Amount</h3></md-table-head>            
            <md-table-head><h3>Status</h3></md-table-head>
            <md-table-head><h3>Action</h3></md-table-head>
          </md-table-row>

          <md-table-row v-for="(transaction, index) in transactions" :key="index">
            <md-table-cell class="table_padding number">
              {{index+1}}
            </md-table-cell>
            <md-table-cell class="table_padding full-name">
                {{transaction.first_name}} {{transaction.last_name}}
            </md-table-cell>
            <md-table-cell class="table_padding">
                {{transaction.wallet_id}}
            </md-table-cell>
            <md-table-cell class="table_padding">
                {{transaction.date_request}}
            </md-table-cell>
            <md-table-cell class="table_padding">
               {{transaction.amount}} {{transaction.currency}}
            </md-table-cell>
            <md-table-cell class="table_padding" v-if="transaction.transfer_status=='Pending'">
              <div class="status label_yellow">
                  <span>{{transaction.transfer_status}}</span>
              </div>
            </md-table-cell>
            <md-table-cell class="table_padding" v-if="transaction.transfer_status=='Completed'">
              <div class="status label_green">
                  <span>{{transaction.transfer_status}}</span>
              </div>
            </md-table-cell>
            <md-table-cell class="table_padding" v-if="transaction.transfer_status=='Rejected'">
              <div class="status label_rejected">
                  <span>{{transaction.transfer_status}}</span>
              </div>
            </md-table-cell>
            <md-table-cell class="table_padding actions">
                <div class="actions" v-if="transaction.transfer_status=='Pending'">
                    <button class="status label_red" @click="takeAction(transaction.id, transaction.wallet_id, '0')">
                      <span>Reject</span>
                    </button>
                    <button class="status label_green" @click="takeAction(transaction.id, transaction.wallet_id, '1')">
                    <span>Approve</span>
                    </button>
                </div>
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
                  <div class="loading-1 loading"></div></center
              ></md-table-cell>
            </md-table-row>
          </transition>
          <NodataFound v-if="notFound" :msg="'No more transactions'" />
        </md-table>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import NodataFound from "../../components/NodataFound";
    export default {
        data() {
            return {
                transactions: [],
                notFound: false,
                busy: false,
                tableLoader: false,
                form: {
                    page: 0
                },
                decision: {                  
                  transaction_id: null,
                  wallet_id: null,
                  action: null
                },
                titleAction: ''
            }
        },
        components: {
            NodataFound
        },
        methods: {
            //load transactions
            async loadTransactions() {
                if (this.busy) return;
                this.tableLoader = true;
                this.busy = true;
                this.form.page++;
                const data = this.form;
                const response = await axios.post("dashboard/vendor/manage-transactions", data);
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

            async takeAction(id, wallet_id, value){                
                this.decision.transaction_id = id,
                this.decision.wallet_id = wallet_id,
                this.decision.action = value
                const response = await axios.post("dashboard/vendor/approve-transactions", this.decision);
                const { success, message } = await response.data;
                if(success){
                  if(value=="1"){
                    this.titleAction = "approved"
                  } else{
                    this.titleAction = "rejected"
                  }
                  this.$swal({
                    position: "center",
                    icon: "success",
                    title: `Transaction ${this.titleAction} successfully!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.tableLoader = false;
                  this.busy = false;
                  this.form.page = 0;
                  this.transactions = [];
                  this.loadTransactions()
                }
            }
        },
        created() {
          this.loadTransactions()
        }
    }
</script>

<style scoped>
.actions{
    min-width: 160px;
    display: flex;
    align-items: center;
}
.actions .status{
    margin-right: 10px;
    cursor: pointer;
    border: none;
    height: 28px;
}
.actions button[disabled].status{
  cursor: default;
  background: #CCC;
  opacity: .7;
}
.actions .status span{
  line-height: 1;
}
.table_padding .number{
  max-width: 30px;
  width: 30px;
}
.full-name{
  min-width: 200px;
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
.wrapper_order_table p {
  color: #535559;
  font-size: 14px;
  font-weight: 400;
  margin-top: 0px;
  line-height: 17px;
  padding-bottom: 20px;
}
.status {
  padding: 5px 7px;
  border-radius: 4px;
}
.label_yellow {
  background: #ffc300;
  color: #fff;
  text-align: center;
}
.label_green {
  background: #64dd17;
  color: #fff;
  text-align: center;
}
.label_rejected {
  background: #ff5722;
  color: #fff;
  text-align: center;
}
.label_red {
  background: #ff5722;
  color: #fff;
  text-align: center;
}
.label_green {
  background: #64dd17;
  color: #fff;
  text-align: center;
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
  margin-bottom: 10px;
}
/*-----table_style_end-----*/

@media screen and (max-width: 768px) {
  
.wrapper_order_table {
    padding: 20px;
    width: 608px;
}
  .wrapper_order_table h1 {
    font-size: 14px;
  }
  .wrapper_order_table p {
    font-size: 11px;
  }
  
.wrapper_order_table{margin-bottom: 10px;}

}
@media screen and (max-width: 600px) {
  .wrapper_order_table {
    padding: 10px;
    padding-right: 5px;
    width: 100%;
  }
}
</style>