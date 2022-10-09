<template>
  <div v-click-outside="hideEditOption">
    <div class="col-sm-11 p-0 fl" v-if="type == 'card'">
      <h2 class="text-capitalize">
        {{ card.card_name }}
        <span
          >xxxx -
          {{ card.card_number.substr(card.card_number.length - 4) }}</span
        >
      </h2>
      <div class="label_default" v-if="card.status == 2">DEFAULT</div>
    </div>
    <div class="col-sm-11 p-0 fl" v-else-if="type == 'bank'">
      <i data-v-57f96f34="" class="material-icons f-s-21 icon_bank"
        >account_balance</i
      >
      <h2 class="text-capitalize">
        {{ card.beneficiary_name }} xxxx -
        {{ card.iban_number.substr(card.iban_number.length - 4) }}
        <span></span>
      </h2>

      <div class="label_default" v-if="card.status == 2">Default</div>
      <div
        class="col-sm-11 col-md-10 col-xl-11 p-0 fl text_expires text-uppercase"
      >
        {{ card.account_type }}
      </div>
    </div>
    <div class="col-sm-11 p-0 fl" v-if="type == 'paypal'">
      <h2 class="text-capitalize">
        {{ card.email }}
      </h2>
      <div class="label_default" v-if="card.status == 2">DEFAULT</div>
    </div>
    <i class="material-icons f-s-21 btn_more" @click="toggleEditOption(type)"
      >more_horiz</i
    >
    <div class="dropdown-menu switching" v-if="showEditOption">
      <div class="switchingCnt">
        <!-- <img src="./map-check.png" class="default-ico" /> -->
        <span @click="setDefault(card.type_id, card.id)" v-if="card.status == 1"
          >Set as Default</span
        >

        <!-- <img src="./editpencil.png" /> -->
        <span v-if="type != 'card'" @click="editCard(type, card)">Edit</span>

        <!-- <img src="../trash.png" /> -->
        <span @click="deleteCard(card.type_id, card.id)">Delete</span>
      </div>
    </div>

    <div class="col-sm-12 p-0 fl text_expires" v-if="type == 'card'">
      <span class="">Expires {{ card.mm + "/" + card.yy }}.</span>
      <span class="">Added on {{ getDate(card.created_at) }}</span>
    </div>
    <!-- card dialogue -->
    <md-dialog :md-active.sync="dialog1" class="modal_credit">
      <md-dialog-title class="title_modal_card"
        >Update card details</md-dialog-title
      >

      <md-button class="md-primary close_btn" @click="dialog1 = false">
        <i class="material-icons"> close </i>
      </md-button>

      <VCreditCard @change="creditInfoChanged" @cardChanged="cardChanged" />

      <div class="col-sm-12 fl box_billing">
        <md-checkbox v-model="card_form.default"
          >Make this as my default payment method</md-checkbox
        >

        <div class="btn_save col-sm-12 p-0 fl" @click="saveCard(card.id)">
          <i data-v-6cd0dfee="" class="material-icons"> lock </i>
          <span>Update Card</span>
        </div>
      </div>
    </md-dialog>

    <!-- dialog 2 -->
    <md-dialog :md-active.sync="dialog2" class="modal_credit width_credit">
      <md-dialog-title class="title_modal_card mob_card_pl"
        >Update bank account</md-dialog-title
      >

      <md-button class="md-primary close_btn" @click="dialog2 = false">
        <i class="material-icons"> close </i>
      </md-button>

      <div class="col-sm-12 wrapper_inputbox pb-4 fl">
        <div class="col-sm-12 p-0 fl inputbox mt_inputbox">
          <span>Account Type</span>
          <v-select
            v-model="bank_form.account_type"
            :options="['Savings', 'Current']"
            placeholder="Account Type"
            class="account_type"
          ></v-select>
        </div>

        <div class="col-sm-12 p-0 fl inputbox">
          <md-field class="mb-0">
            <label>IBAN Number</label>
            <md-input v-model="bank_form.iban_number"></md-input>
          </md-field>
        </div>

        <div class="col-sm-12 p-0 fl inputbox">
          <md-field class="mb-0">
            <label>Beneficiary Name</label>
            <md-input v-model="bank_form.beneficiary_name"></md-input>
          </md-field>
        </div>

        <div class="col-sm-12 p-0 fl inputbox mt_inputbox">
          <span>Country</span>
          <v-select
            v-model="bank_form.country"
            :options="countries"
            placeholder="Country"
            class="account_type"
          ></v-select>
        </div>

        <div class="col-sm-12 p-0 fl inputbox">
          <vue-tel-input
            class="card_mob"
            v-model="bank_form.mobile"
          ></vue-tel-input>
        </div>
      </div>

      <div class="col-sm-12 fl box_billing">
        <md-checkbox v-model="bank_form.default"
          >Make this as my default payment method</md-checkbox
        >

        <div class="btn_save col-sm-12 p-0 fl mt-5" @click="saveBank(card.id)">
          <i class="material-icons"> lock </i>
          <span>Update Bank Account </span>
        </div>
      </div>
    </md-dialog>

    <!-- dialogg 3 -->
    <md-dialog :md-active.sync="dialog3" class="modal_credit width_credit">
      <md-dialog-title class="title_modal_card mob_card_pl"
        >Update paypal account</md-dialog-title
      >

      <md-button class="md-primary close_btn" @click="dialog3 = false">
        <i class="material-icons"> close </i>
      </md-button>

      <div class="col-sm-12 wrapper_inputbox pb-4 fl">
        <div class="col-sm-12 p-0 fl inputbox">
          <md-field class="mb-0">
            <label>Paypay Email</label>
            <md-input :value="card.email" v-model="paypal.email"></md-input>
          </md-field>
          <div class="mt-2">
            dont have a paypal account ?
            <a
              target="_blank"
              class="create_account_link"
              href="https://www.paypal.com/ae/webapps/mpp/account-selection"
            >
              create account</a
            >
          </div>
        </div>
      </div>

      <div class="col-sm-12 fl box_billing">
        <md-checkbox v-model="paypal.default"
          >Make this as my default payment method</md-checkbox
        >

        <div
          class="btn_save col-sm-12 p-0 fl mt-5"
          @click="savePaypal(card.id)"
        >
          <i class="material-icons"> lock </i>
          <span>Update paypal account</span>
        </div>
      </div>
    </md-dialog>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

import ClickOutside from "vue-click-outside";
import VCreditCard from "v-credit-card";

export default {
  props: ["card", "type", "countries"],
  components: { VCreditCard },
  data() {
    return {
      showEditOption: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      card_form: {
        default: true,
        action_type: "",
        type_id: "",
        card_name: "",
        card_number: "",
        mm: "",
        yy: "",
        cvc: ""
      },
      bank_form: {
        account_type: "",
        action_type: "",
        type_id: "",

        iban_number: "",
        beneficiary_name: "",
        country: "",
        mobile: "",
        default: true
      },
      paypal: {
        type_id: "",
        email: "",
        default: true,
        action_type: ""
      }
    };
  },
  methods: {
    cardChanged() {
      console.log("card");
    },
    async saveCard(id) {
      this.bank_form.action_type = "update";
      this.card_form.type_id = id;
      const response = await axios.post(
        "account/payment/add-card",
        this.card_form
      );
      const { success } = await response.data;
      if (success) {
        this.$emit("emitLoadAccount");
        this.dialog1 = false;
        this.$swal({
          position: "center",
          icon: "success",
          title: "Updated succesfully",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        this.dialog1 = false;
        this.$swal({
          position: "center",
          icon: "error",
          title: "Something went wrong!!",
          showConfirmButton: false,
          timer: 1500
        });
      }
      console.log(id);
    },
    async savePaypal(id) {
      this.paypal.action_type = "update";
      this.paypal.type_id = id;

      const response = await axios.post(
        "account/payment/add-paypal",
        this.paypal
      );
      const { success } = await response.data;
      if (success) {
        this.$emit("emitLoadAccount");
        this.dialog3 = false;
        this.$swal({
          position: "center",
          icon: "success",
          title: "Updated succesfully",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        this.dialog3 = false;
        this.$swal({
          position: "center",
          icon: "error",
          title: "Something went wrong!!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    async saveBank(id) {
      this.bank_form.action_type = "update";
      this.bank_form.type_id = id;
      const response = await axios.post(
        "account/payment/add-bank",
        this.bank_form
      );
      const { success } = await response.data;
      if (success) {
        this.$emit("emitLoadAccount");
        this.dialog2 = false;
        this.$swal({
          position: "center",
          icon: "success",
          title: "Updated succesfully",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        this.dialog2 = false;
        this.$swal({
          position: "center",
          icon: "error",
          title: "Something went wrong!!",
          showConfirmButton: false,
          timer: 1500
        });
      }
      console.log(id);
    },
    creditInfoChanged(values) {
      console.log("valuesss");

      for (const key in values) {
        if (key == "name") {
          this.card_form.card_name = values[key];
        } else if (key == "cardNumber") {
          this.card_form.card_number = values[key];
        } else if (key == "expiration") {
          const date = values[key].split("/");

          this.card_form.mm = date[0];
          this.card_form.yy = date[1];
        } else if (key == "security") {
          this.card_form.cvc = values[key];
        }

        console.log(key + " " + values[key]);
        // this.card_form[key] = values[key];
      }
    },

    editCard(type, card) {
      console.log(type);
      console.log(card);
      switch (type) {
        case "card":
          this.dialog1 = true;
          this.card_form = card;
          break;
        case "bank":
          this.dialog2 = true;
          this.bank_form = card;
          break;
        case "paypal":
          this.dialog3 = true;
          this.paypal = card;
          break;

        default:
          break;
      }
    },
    async setDefault(type_id, account_id) {
      console.log(type_id + " - " + account_id);
      const data = {
        type_id,
        account_id
      };
      const response = await axios.post("account/payment/set-default", data);
      const { success } = await response.data;
      if (success) {
        this.showEditOption = false;
        this.$emit("emitLoadAccount");
        this.$swal({
          position: "center",
          icon: "success",
          title: "Default payment method added",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        this.showDialog = false;
        this.$swal({
          position: "center",
          icon: "error",
          title: "Something went wrong!!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    async deleteCard(type_id, account_id) {
      this.$swal({
        text: "Are you sure want to delete",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete it!"
      }).then(async result => {
        if (result.value) {
          const data = {
            type_id,
            account_id
          };
          const response = await axios.post(
            "account/payment/delete-account",
            data
          );
          const { success } = await response.data;
          if (success) {
            this.$emit("emitLoadAccount");
          }
        }
      });
    },
    toggleEditOption(type) {
      this.showEditOption = !this.showEditOption;
    },
    hideEditOption() {
      this.showEditOption = false;
    }
  },
  directives: {
    ClickOutside
  },
  computed: {
    getDate() {
      return date => moment(date).format("MMMM D, YYYY");
    }
  }
};
</script>

<style scoped>
.dropdown-menu.switching {
  left: auto;
  right: 10px;
  width: 130px;
  height: auto;
  vertical-align: top;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 9px 0px;
  padding: 14px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(226, 229, 241);
  top: 60%;
  padding: 0;
  position: absolute;
  z-index: 1;
  background: #fff;
}
.dropdown-menu.switching::before {
  border-color: transparent;
  border-bottom-color: #fff;
  border-style: dashed dashed solid;
  border-width: 0 8.5px 8.5px;
  position: absolute;
  right: 4.5px;
  top: -7.9px;
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
  right: 4.5px;
  z-index: 1;
  height: 0;
  width: 0;
  border-bottom-color: rgb(226, 229, 241);
  top: -9px;
  content: "";
}
.switchingCnt {
  width: 85%;
  margin: 0 auto;
  margin-top: 1em;
}
.switchingCnt span:hover {
  font-weight: bold;
}
.switchingCnt span {
  cursor: pointer;
  height: 29px;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 100%;
  border-bottom: 1px solid #eeeeee;
  border-radius: 0;
  padding: 0.33em 0em;
  transition: opacity 0.4s ease-in-out;
}
.switchingCnt span:last-child {
  border-bottom: none;
}

.text-uppercase {
  text-transform: uppercase;
}
.card_name,
.text-capitalize {
  text-transform: uppercase;
}

.date {
  background-color: #f5f5f5;
  padding: 5px;
  font-weight: 600;
  border-radius: 3px;
}
.inputbox span {
  font-size: 13px;
  color: #707070;
  margin-top: 10px;
  float: left;
  width: 100%;
}
.inputbox label {
  font-size: 13px;
  color: #707070;
}

.account_type {
  float: left;
  width: 100%;
  margin-top: 4px;
}

.card_mob {
  margin-top: 24px;
}
.mt_inputbox {
  margin-top: 20px;
}
.wrapper_inputbox {
  padding: 0px 20px;
}
.box_billing {
  padding-left: 20px;
  padding-right: 20px;
}
.box_billing h2 {
  color: #535559;
  font-size: 13px;
  font-weight: 400;
  margin-top: 10px;
  line-height: 16px;
}

.btn_save span {
  margin-top: 3px;
}

.btn_save i {
  font-size: 16px;
  float: left;
  margin-right: 2px;
}
.btn_save {
  background-color: #ff5821;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.btn_save:hover {
  background-color: #ff5722;
  color: #fff;
}

.modal_credit {
  width: 497px;
  margin: auto;
  z-index: 99999;
}
.md-dialog-container {
  max-height: 100% !important;
}

.vue-credit-card .card-form-and-image .credit-card-form .field input {
  padding: 10px !important;
  font-size: 13px !important;
}

.title_billing {
  color: #535559;
  font-size: 13px;
  font-weight: 600;

  padding-top: 0px;
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

.wrapper_order_table {
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  padding: 25px;
  margin-bottom: 20px;
}

.wrapper_order_table h1 {
  color: #535559;
  font-size: 18px;
  font-weight: 400;
  margin-top: 0px;
  line-height: 17px;
  width: fit-content;
  float: left;
}

.button_Add_Money {
  letter-spacing: 1px;
  background-color: #ff5722;
  height: fit-content;
  float: right;
  width: fit-content;
  color: #fff !important;
  padding: 10px 5px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  font-size: 11px;
  border-radius: 4px;
  margin: 0px;
}

.box_order_table {
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  border: solid 1px #f6f6f6;
  text-align: left;
  margin-top: 18px;

  padding: 12px;
  padding-left: 14px;
  padding-right: 14px;
}

.box_order_table h2 {
  color: #4c98d1;
  font-size: 16px;
  margin-bottom: 8px;
  width: fit-content;
  float: left;
  margin-right: 10px;
}

.box_order_table h4 {
  color: #535559;
  font-size: 14px;
}

.label_default {
  background: #64dd17;
  color: #fff;
  padding: 5px 3px;
  border-radius: 3px;
  cursor: pointer;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  float: left;
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  padding-bottom: 4px;
}

.text_expires {
  color: #878787;
  font-size: 12px;
  font-weight: 500;
}

.btn_more {
  float: right;
  cursor: pointer;
  color: #878787;
}
.icon_bank {
  float: left;
  color: #878787;
  font-size: 20px;
  margin-right: 4px;
  height: 35px;
}

@media screen and (max-width: 768px) {
  .wrapper_order_table h1 {
    font-size: 14px;
  }
  .box_order_table h2 {
    color: #4c98d1;
    font-size: 14px;
  }

  .label_default {
    padding: 4px 8px;
    padding-bottom: 3px;
    font-size: 10px;
  }

  .text_expires {
    font-size: 11px;
  }

  .button_Add_Money {
    font-size: 9px;
  }

  .close_btn {
    right: 11px;
    top: 7px;
  }
  .title_modal_card {
    font-size: 14px;
    padding-top: 12px;
  }

  .modal_credit .md-overlay.md-fixed,
  body > .md-overlay {
    z-index: 9999 !important;
  }

  .md-dialog {
    z-index: 99999;
  }
}

@media screen and (max-width: 600px) {
  .inputbox span {
    font-size: 12px;
  }

  .wrapper_inputbox {
    padding: 0px 10px;
  }
  .inputbox label {
    font-size: 12px;
  }

  ::placeholder {
    font-size: 10px;
  }

  .icon_bank {
    font-size: 22px;
  }

  .button_Add_Money {
    padding: 6px 8px;
    margin: 0px 0px 0px 0px;
  }
  .box_order_table {
    margin-top: 10px;
  }

  .md-button-content {
    font-size: 9px;
  }

  .wrapper_order_table {
    padding: 10px;
    padding-right: 10px;
  }

  .box_order_table {
    padding: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .btn_more {
    margin-top: -26px;
    margin-right: -2px;
    font-size: 20px;
  }

  .box_order_table h2 {
    font-size: 11px;
    margin-right: 3px;
  }

  .label_default {
    padding-bottom: 2px;
    font-size: 8px;
  }

  .text_expires {
    font-size: 10px;
  }

  .wrapper_order_table h1 {
    font-size: 11px;
  }

  .modal_credit {
    width: 100%;
  }

  .close_btn {
    right: 2px;
  }

  .title_modal_card {
    font-size: 13px;
    padding-top: 10px;
    padding-left: 10px;
  }
  .mob_card_pl {
    padding-left: 10px !important;
  }
  .box_billing {
    padding-left: 10px;
    padding-right: 10px;
  }

  .btn_save i {
    font-size: 14px;

    margin-right: 2px;
  }
  .btn_save span {
    margin-top: 3px;
    font-size: 12px;
  }
  .width_mob_card {
    width: 80%;
  }
  .text_expires {
    width: 80%;
  }
  .btn_more_two {
    margin-top: -7px;
  }
}

@media screen and (max-width: 420px) and (min-width: 400px) {
  .box_billing {
    padding-left: 17px;
    padding-right: 17px;
  }
  .title_modal_card {
    padding-left: 17px;
  }

  .close_btn {
    right: 7px;
  }
}

@media screen and (max-width: 300px) {
  .icon_bank {
    font-size: 20px;
  }
  .box_order_table h2 {
    font-size: 9px;
  }

  .text_expires {
    font-size: 8px;
  }

  .label_default {
    padding: 3px 6px;
    font-size: 6px;
    padding-bottom: 2px;
  }

  .md-button-content {
    font-size: 8px;
  }
  .wrapper_order_table h1 {
    font-size: 9px;
    margin-bottom: 5px;
  }

  .title_modal_card {
    font-size: 12px;
    padding-top: 10px;
  }

  .btn_save {
    height: 35px;
  }
  .btn_save span {
    margin-top: 3px;
    font-size: 11px;
  }

  .width_mob_card {
    width: 80%;
  }

  .icon_bank {
    font-size: 15px;
    height: 20px;
  }
  .box_order_table {
    padding: 8px;
    padding-left: 8px;
    padding-right: 8px;
  }

  .btn_more_two {
    margin-top: -9px;
  }
}
</style>
