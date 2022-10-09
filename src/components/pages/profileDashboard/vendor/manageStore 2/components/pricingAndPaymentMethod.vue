<template>
  <div>
    <form-section>
      <div class="md-layout md-gutter mt-4 md-alignment-center-center">
        <input-component label="Select Pricing Type *" custom="true">
          <div class="limitRadio">
            <md-radio v-model="pricing_type" value="show_pricing" checked
              >Show Pricing</md-radio
            >
            <md-radio v-model="pricing_type" value="quotation" checked
              >Quotation</md-radio
            >
          </div>
        </input-component>
      </div>
      <div
        class="md-layout md-gutter mt-4 md-alignment-center-center"
        v-if="pricing_type == 'show_pricing'"
      >
        <input-component
          type="text"
          placeholder="Auto Price *"
          label="Auto Price *"
          :error="checkValidation('price')"
          :value="price"
          @input="$emit('update:price', $event.target.value)"
        ></input-component>
        <input-component
          type="text"
          placeholder="Offer price (Optional)"
          label="Offer price (Optional)"
          :error="this.submitted && this.$v.form.offerprice.$invalid"
          errorMessage="Offer price should be less than Auto Price."
          :value.sync="form.offerprice"
        ></input-component>
        <input-component
          label="Currency *"
          custom="true"
          :error="checkValidation('currency')"
        >
          <vSelect
            v-model="form.currency"
            :reduce="(element) => element.currency"
            label="currency"
            :options="currencies"
            placeholder="Select Currency"
          >
          </vSelect
        ></input-component>
        <input-component
          type="text"
          placeholder="VAT(%)"
          label="VAT(%) *"
          :error="checkValidation('vat')"
          :value.sync="form.vat"
        ></input-component>
      </div>
    </form-section>

    <!-- Form Title -->
    <!-- Form Content -->
    <form-section number="3" title="Auto Pricing">
      <div class="md-layout md-gutter mt-4 md-alignment-center-center">
        <input-component
          label="Payment Method *"
          custom="true"
          :error="checkValidation('payment_method')"
        >
          <vSelect
            v-model="form.payment_method"
            label="Payment Method"
            :options="['Cash', 'Cheque', 'Online', 'Bank Transfer']"
            placeholder="Payment Method"
          >
          </vSelect
        ></input-component>
        <input-component
          v-if="form.payment_method == 'Cheque'"
          type="text"
          placeholder="No. Of Cheques *"
          label="No of Cheques*"
          :error="checkValidation('no_of_cheques')"
          :value.sync="form.no_of_cheques"
        ></input-component>
        <input-component
          label="Payment Term *"
          custom="true"
          :error="checkValidation('payment_plan')"
        >
          <vSelect
            v-model="form.payment_plan"
            label="Payment Plan"
            :options="[
              '1 months',
              '2 months',
              '3 months',
              '4 months',
              '5 months',
              '6 months',
              '7 months',
              '8 months',
              '9 months',
              '10 months',
              '11 months',
              'Yearly',
            ]"
            placeholder="Payment Plan"
          >
          </vSelect
        ></input-component>
      </div>
    </form-section>
  </div>
</template>
<script>
import inputComponent from "@/components/ui-components/input.vue";
import formSection from './formSection.vue'
export default {
  name: "pricingAndPaymentMethod",
  components: {
    formSection,
    inputComponent
  },
  data () {
    return {
      pricing_type: "show_pricing",
      price,
    }
  },
  props: {}


}

</script>