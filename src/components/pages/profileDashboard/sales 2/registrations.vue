<template>
  <div>
    <packages
      :packages="packages"
      v-if="!form.package_id"
      v-model="form.package_id"
    ></packages>
    <!-- <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table"> -->
    <div v-else>
      <div class="md-layout wrapper_order_table">
        <div class="col-sm-12 p-0 fl">
          <div class="col-sm-8 p-0 fl title_main">Business Information</div>
        </div>

        <div class="col-sm-6 pl-0 mob_pl fl">
          <md-field :class="{
            'md-invalid': checkValidation('businessname'),
          }">
            <label>Business Name</label>
            <md-input
              autocomplete="new-name"
              v-model="form.businessname"
              required
            ></md-input>
            <span class="md-error">Business Name is required</span>
          </md-field>
        </div>

        <div class="col-sm-6 pr-0 mob_pr mob_pr fl margin_email_mob">
          <md-field :class="{
            'md-invalid': checkValidation('email') || isEmailDuplicate ||checkValidity('email'),
          }">
            <label>E-mail</label>
            <md-input
              autocomplete="new-email"
              v-model="form.email"
              type="email"
              @change.native="feedEmailsArray($event.target.value, 'email')"
              required
            ></md-input>
            <span
              class="md-error"
              v-if="isEmailDuplicate"
            >Please enter unique email. It should be different than other
              emails.</span>
            <span
              class="md-error"
              v-if="checkValidity('email')"
            >Please enter Valid Email</span>
            <span
              class="md-error"
              v-else
            >Email is required</span>
          </md-field>
        </div>

        <div class="col-sm-6 pl-0 mob_pl fl margin_mobile">
          <vue-tel-input
            autocomplete="new-country"
            v-model="form.mobile"
            placeholder="Mobile Number"
          ></vue-tel-input>
          <div
            class="c-forminlineError"
            v-if="checkValidation('mobile')"
          >
            <span> Mobile is required </span>
          </div>
        </div>

        <div class="col-sm-6 pr-0 mob_pr fl margin_mobile margin_mobile_mob">
          <vue-tel-input
            autocomplete="new-number"
            v-model="form.landline"
            placeholder="Landline"
          ></vue-tel-input>
          <div
            class="c-forminlineError"
            v-if="checkValidation('landline')"
          >
            <span> Landline is required </span>
          </div>
        </div>

        <div class="col-sm-6 pl-0 mob_pl fl margin_selection">
          <md-field :class="{
            'md-invalid': checkValidation('license_number'),
          }">
            <label>Trade License Number</label>
            <md-input
              v-model="form.license_number"
              type="number"
              required
            ></md-input>
            <span class="md-error">License Number is required</span>
          </md-field>
        </div>

        <div class="col-sm-6 pr-0 mob_pr fl margin_selection margin_license_mob">
          <fileInput
            name="Upload Trade License File"
            :filename="file ? file.name : 'Select File'"
            @file-uploaded="fileUploaded"
          >
          </fileInput>
          <div
            class="c-forminlineError"
            v-if="this.submitted && !this.$v.file.required"
          >
            <span> Please Upload Trade Licens File</span>
          </div>
        </div>

        <div class="col-sm-12 p-0 fl margin_activity margin_mobile">
          <p class="label">Activities *</p>
          <v-select
            v-model="form.activities"
            multiple
            :options="autocompleteItems"
            @search="onSearch"
            placeholder="Choose Activities eg: Shipping, Trade"
          ></v-select>
          <div
            class="c-forminlineError"
            v-if="checkValidation('activities')"
          >
            <span> Activities are required </span>
          </div>
        </div>

        <div class="md-layout md-gutter select-fieldset">
          <div class="md-layout-item md-size-50">
            <input-component
              custom="true"
              label="Legal Status *"
              :error="checkValidation('legal_status')"
            >
              <v-select
                v-model="form.legal_status"
                label="title_en"
                :reduce="(el) => el.title_en"
                :options="legal_statuses"
                placeholder="Legal Status"
              ></v-select>
            </input-component>
          </div>

          <div class="md-layout-item md-size-50">
            <input-component
              custom="true"
              label="Issued By *"
              :error="checkValidation('issued_by')"
            >
              <v-select
                v-model="form.issued_by"
                label="name"
                :options="[{name: 'Local', val: 'LOC'}, { name: 'Free Zone', val: 'FZ'}]"
                placeholder="Issued By"
                :reduce="(el) => el.val"
                @input="fetchFreezoneName"
              ></v-select>
            </input-component>
          </div>

          <div
            class="md-layout-item md-size-50"
            v-if="this.freezoneNames"
          >
            <input-component
              custom="true"
              label="Freezone Name *"
            >
              <v-select
                label="name"
                :reduce="(el) => el.name"
                v-model="form.freezone_name"
                :options="freezoneNames"
                placeholder="freezone name"
              ></v-select>
            </input-component>
          </div>

          <div class="md-layout-item md-size-50">
            <input-component
              custom="true"
              label="Country *"
              :error="checkValidation('country')"
            >
              <v-select
                autocomplete="new-country"
                v-model="form.country"
                :reduce="(element) => element.name"
                label="name"
                :options="currencies"
                placeholder="Select Country"
                @input="countrySelected"
              />
            </input-component>
          </div>

          <div class="md-layout-item md-size-50">
            <input-component
              custom="true"
              label="City *"
              :error="checkValidation('city')"
            >
              <v-select
                autocomplete="new-city"
                v-model="form.city"
                :reduce="(element) => element.location"
                label="location"
                :options="citiesList"
                :placeholder="citiesStatus"
              >
              </v-select>
            </input-component>
          </div>
        </div>
      </div>
      <!---------->
      <!-- Shipping Service -->
      <!---------->
      <div class=" wrapper_order_table">
        <div class="md-layout md-gutter">
          <div class="title_main md-layout-item md-size-100 ">VAT Details</div>
          <input-component
            custom="true"
            :size="50"
            :error="vatDetailsError('trn_number')"
            errorMessage="TRN Number is required"
          >
            <md-field>
              <label>TRN Number</label>
              <md-input v-model="form.trn_number"></md-input>
            </md-field>
          </input-component>
          <input-component
            custom="true"
            :size="50"
            :error="vatDetailsError('vat_percentage')"
            errorMessage="VAT Percentage is required"
          >
            <md-field>
              <label>VAT (%)</label>
              <md-input v-model="form.vat_percentage"></md-input>
            </md-field>
          </input-component>
        </div>
      </div>

      <!---------->
      <!-- Business Owners -->
      <!---------->
      <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table">
        <div class="col-sm-12 pb-2 fl">
          <div class="title_main">Business Owners</div>
        </div>
        <div
          v-for="(owner, id) in $v.form.owners.$each.$iter"
          :key="id"
          class="col-sm-12 col-md-12 col-xl-12 fl owner"
        >
          <div class="col-sm-12 p-0 fl">
            <div class="col-sm-8 p-0 fl title_main">
              Business Owner {{ parseInt(id) + 1 }}
            </div>
            <div class="fr">
              <md-button
                v-if="id != 0"
                class="md-raised md-primary btn_delete"
                @click="form.owners.splice(id)"
              >
                <i class="material-icons action_icon">delete</i>
                <!-----<span>Add New</span>---->
              </md-button>
            </div>
          </div>
          <div class="col-sm-6 pl-0 mob_pl fl">
            <md-field :class="{
              'md-invalid': checkValidationCustom('owners', id, 'name'),
            }">
              <label>Name</label>
              <md-input
                autocomplete="new-name"
                v-model="owner.name.$model"
                required
              ></md-input>
              <span class="md-error">Name is required</span>
            </md-field>
          </div>
          <div class="col-sm-6 pr-0 mob_pr mob_pr fl margin_email_mob">
            <md-field :class="{
              'md-invalid': checkValidationCustom('owners', id, 'designation'),
            }">
              <label>Designation</label>
              <md-input
                v-model="owner.designation.$model"
                required
              ></md-input>
              <span class="md-error">Designation is required</span>
            </md-field>
          </div>

          <div class="col-sm-6 pl-0 mob_pl fl margin_email">
            <md-field :class="{
              'md-invalid':
                checkValidationCustom('owners', id, 'email') ||
                isEmailDuplicate,
            }">
              <label>Email</label>
              <md-input
                autocomplete="new-email"
                v-model="owner.email.$model"
                @change.native="
                feedEmailsArray($event.target.value, 'owners', id)
              "
                required
              ></md-input>
              <span
                class="md-error"
                v-if="isEmailDuplicate"
              >Please enter unique email. It should be different than other
                emails.</span>
              <span
                class="md-error"
                v-else
              >Email is required</span>
            </md-field>
          </div>

          <div class="col-sm-6 pr-0 mob_pr fl margin_mobile mob_mr_two">
            <vue-tel-input
              autocomplete="new-number"
              v-model="owner.mobile.$model"
              placeholder="Mobile"
            ></vue-tel-input>
            <div
              class="c-forminlineError"
              v-if="checkValidationCustom('owners', id, 'mobile')"
            >
              <span> Mobile is required </span>
            </div>
          </div>
          <div class="col-sm-6 pl-0 mob_pl fl margin_selection_third">
            <p class="label">Country *</p>
            <v-select
              autocomplete="new-country"
              v-model="owner.nationality.$model"
              label="name"
              :options="currencies"
              :reduce="(element) => element.name"
              placeholder="Nationality"
            ></v-select>
            <div
              class="c-forminlineError"
              v-if="checkValidationCustom('owners', id, 'nationality')"
            >
              <span> Nationality is required </span>
            </div>
          </div>

          <div class="col-sm-6 pr-0 fl mob_pr margin_radio radio_btn_request">
            <p class="label">&nbsp;</p>
            <md-radio
              v-model="owner.gender.$model"
              value="male"
            >Business man</md-radio>
            <md-radio
              v-model="owner.gender.$model"
              value="female"
            >Business woman</md-radio>
            <div
              class="c-forminlineError"
              v-if="checkValidationCustom('owners', id, 'gender')"
            >
              <span> Gender is required </span>
            </div>
          </div>

          <div
            class="col-sm-12 p-0 fl"
            v-if="id == form.owners.length - 1"
          >
            <div class="fr">
              <md-button
                class="md-raised md-primary btn_register btn_add mrgn_add"
                @click="
                form.owners.push({
                  name: '',
                  designation: '',
                  email: '',
                  mobile: '',
                  nationality: '',
                  gender: '',
                })
              "
              >
                <i
                  data-v-1eb28c36=""
                  class="material-icons"
                >add</i>
                <span>Add New</span>
              </md-button>
            </div>
          </div>
        </div>
      </div>
      <!---------->
      <!-- Managers -->
      <!---------->
      <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table">
        <div class="col-sm-12 pb-2 fl">
          <div class="title_main">Managers</div>
        </div>
        <div
          v-for="(owner, id) in form.managers"
          :key="id"
          class="col-sm-12 col-md-12 col-xl-12 fl owner"
        >
          <div class="col-sm-12 p-0 fl">
            <div class="col-sm-8 p-0 fl title_main">
              Manager {{ parseInt(id) + 1 }}
            </div>
            <div class="fr">
              <md-button
                v-if="id != 0"
                class="md-raised md-primary btn_delete"
                @click="form.managers.splice(id)"
              >
                <i class="material-icons action_icon">delete</i>
                <!-----<span>Add New</span>---->
              </md-button>
            </div>
          </div>
          <div class="col-sm-6 pl-0 mob_pl fl">
            <md-field :class="{
              'md-invalid': checkValidationCustom('managers', id, 'name'),
            }">
              <label>Name</label>
              <md-input
                autocomplete="new-name"
                v-model="form.managers[id].name"
                @change.native="valueEntered($event, 'managers')"
              ></md-input>
              <span class="md-error">Name is required</span>
            </md-field>
          </div>
          <div class="col-sm-6 pr-0 mob_pr mob_pr fl margin_email_mob">
            <md-field :class="{
              'md-invalid': checkValidationCustom(
                'managers',
                id,
                'designation'
              ),
            }">
              <label>Designation</label>
              <md-input
                v-model="form.managers[id].designation"
                @change.native="valueEntered($event, 'managers')"
              ></md-input>
              <span class="md-error">Designation is required</span>
            </md-field>
          </div>

          <div class="col-sm-6 pl-0 mob_pl fl margin_email">
            <md-field :class="{
              'md-invalid':
                checkValidationCustom('managers', id, 'email') ||
                isEmailDuplicate,
            }">
              <label>Email</label>
              <md-input
                autocomplete="new-email"
                v-model="form.managers[id].email"
                @change.native="
                valueEntered($event, 'managers');
                feedEmailsArray($event.target.value, 'managers', id + 101);
              "
                required
              ></md-input>

              <span
                class="md-error"
                v-if="isEmailDuplicate"
              >Please enter unique email. It should be different than other
                emails.</span>
              <span
                class="md-error"
                v-else
              >Email is required</span>
            </md-field>
          </div>

          <div class="col-sm-6 pr-0 mob_pr fl margin_mobile mob_mr_two">
            <vue-tel-input
              autocomplete="new-number"
              v-model="form.managers[id].mobile"
              placeholder="Mobile"
              @change.native="valueEntered($event, 'managers')"
            ></vue-tel-input>
            <div
              class="c-forminlineError"
              v-if="checkValidationCustom('managers', id, 'mobile')"
            >
              <span> Mobile is required </span>
            </div>
          </div>
          <div class="col-sm-6 pl-0 mob_pl fl margin_selection_third">
            <p class="label">Country *</p>
            <v-select
              autocomplete="new-country"
              v-model="form.managers[id].nationality"
              label="name"
              :options="currencies"
              :reduce="(element) => element.name"
              placeholder="Nationality"
              @input="valueSelected($event, 'managers')"
            ></v-select>
            <div
              class="c-forminlineError"
              v-if="checkValidationCustom('managers', id, 'nationality')"
            >
              <span> Nationality is required </span>
            </div>
          </div>

          <div class="col-sm-6 pr-0 fl mob_pr margin_radio radio_btn_request">
            <p class="label">&nbsp;</p>
            <md-radio
              v-model="form.managers[id].gender"
              value="male"
            >Male</md-radio>
            <md-radio
              v-model="form.managers[id].gender"
              value="female"
            >Female</md-radio>
            <div
              class="c-forminlineError"
              v-if="checkValidationCustom('managers', id, 'gender')"
            >
              <span> Gender is required </span>
            </div>
          </div>

          <div
            class="col-sm-12 p-0 fl"
            v-if="id == form.managers.length - 1"
          >
            <div class="fr">
              <md-button
                class="md-raised md-primary btn_register btn_add mrgn_add"
                @click="
                form.managers.push({
                  name: '',
                  designation: '',
                  email: '',
                  mobile: '',
                  nationality: '',
                  gender: '',
                })
              "
              >
                <i
                  data-v-1eb28c36=""
                  class="material-icons"
                >add</i>
                <span>Add New</span>
              </md-button>
            </div>
          </div>
        </div>
      </div>
      <!---------->
      <!-- Person In Charge -->
      <!---------->
      <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table">
        <div class="col-sm-12 pb-2 fl">
          <div class="title_main">Person In Charge</div>
        </div>
        <div
          v-for="(owner, id) in form.persons"
          :key="id"
          class="col-sm-12 col-md-12 col-xl-12 fl owner"
        >
          <div class="col-sm-12 p-0 fl">
            <div class="col-sm-8 p-0 fl title_main">
              Person {{ parseInt(id) + 1 }}
            </div>
            <div class="fr">
              <md-button
                v-if="id != 0"
                class="md-raised md-primary btn_delete"
                @click="form.persons.splice(id)"
              >
                <i class="material-icons action_icon">delete</i>
                <!-----<span>Add New</span>---->
              </md-button>
            </div>
          </div>
          <div class="col-sm-6 pl-0 mob_pl fl">
            <md-field :class="{
              'md-invalid': checkValidationCustom('persons', id, 'name'),
            }">
              <label>Name</label>
              <md-input
                autocomplete="new-name"
                v-model="form.persons[id].name"
                @change.native="valueEntered($event, 'persons')"
              ></md-input>
              <span class="md-error">Name is required</span>
            </md-field>
          </div>
          <div class="col-sm-6 pr-0 mob_pr mob_pr fl margin_email_mob">
            <md-field :class="{
              'md-invalid': checkValidationCustom('persons', id, 'designation'),
            }">
              <label>Designation</label>
              <md-input
                v-model="form.persons[id].designation"
                @change.native="valueEntered($event, 'persons')"
              ></md-input>
              <span class="md-error">Designation is required</span>
            </md-field>
          </div>

          <div class="col-sm-6 pl-0 mob_pl fl margin_email">
            <md-field :class="{
              'md-invalid':
                checkValidationCustom('persons', id, 'email') ||
                isEmailDuplicate,
            }">
              <label>Email</label>
              <md-input
                autocomplete="new-email"
                v-model="form.persons[id].email"
                required
                @change.native="
                valueEntered($event, 'persons');
                feedEmailsArray($event.target.value, id + 201);
              "
              ></md-input>
              <span
                class="md-error"
                v-if="isEmailDuplicate"
              >Please enter unique email. It should be different than other
                emails.</span>
              <span
                class="md-error"
                v-else
              >Email is required</span>
            </md-field>
          </div>

          <div class="col-sm-6 pr-0 mob_pr fl margin_mobile mob_mr_two">
            <vue-tel-input
              aria-autocomplete="new-number"
              v-model="form.persons[id].mobile"
              placeholder="Mobile"
              @change.native="valueEntered($event, 'persons')"
            ></vue-tel-input>
            <div
              class="c-forminlineError"
              v-if="checkValidationCustom('persons', id, 'mobile')"
            >
              <span> Mobile is required </span>
            </div>
          </div>
          <div class="col-sm-6 pl-0 mob_pl fl margin_selection_third">
            <p class="label">Country *</p>
            <v-select
              aria-autocomplete="new-country"
              v-model="form.persons[id].nationality"
              label="name"
              :options="currencies"
              :reduce="(element) => element.name"
              placeholder="Nationality"
            ></v-select>
            <div
              class="c-forminlineError"
              v-if="checkValidationCustom('persons', id, 'nationality')"
            >
              <span> Nationality is required </span>
            </div>
          </div>

          <div class="col-sm-6 pr-0 fl mob_pr margin_radio radio_btn_request">
            <p class="label">&nbsp;</p>
            <md-radio
              v-model="form.persons[id].gender"
              value="male"
            >Male</md-radio>
            <md-radio
              v-model="form.persons[id].gender"
              value="female"
            >Female</md-radio>
            <div
              class="c-forminlineError"
              v-if="checkValidationCustom('persons', id, 'gender')"
            >
              <span> Gender is required </span>
            </div>
          </div>

          <div
            class="col-sm-12 p-0 fl"
            v-if="id == form.persons.length - 1"
          >
            <div class="fr">
              <md-button
                class="md-raised md-primary btn_register btn_add mrgn_add"
                @click="
                form.persons.push({
                  name: '',
                  designation: '',
                  email: '',
                  mobile: '',
                  nationality: '',
                  gender: '',
                })
              "
              >
                <i
                  data-v-1eb28c36=""
                  class="material-icons"
                >add</i>
                <span>Add New</span>
              </md-button>
            </div>
          </div>
        </div>
      </div>
      <!---------->
      <!-- Package Selection -->
      <!---------->
      <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table">
        <div class="col-sm-12 pb-2 fl">
          <div class="title_main">Choose Any One Package</div>
          <input-component
            custom="true"
            :error="checkValidation('package_id')"
            errorMessage="Please Select at least one Package"
          >
            <div class="md-layout limitRadio">
              <md-radio
                v-for="(pack,id) in packages"
                :key="id"
                v-model="form.package_id"
                :value="pack.id"
                checked
              > {{pack.period}} </md-radio>
              <div
                v-if="form.package_id === '4'"
                style="text-decoration:underline"
                class="limitRadio md-radio"
                @click="showSalesCommission=true"
              >
                Show Sales Commission
              </div>
            </div>

          </input-component>
          <input-component custom="true">

          </input-component>
          <md-dialog :md-active.sync="showSalesCommission">
            <md-dialog-title>Sales Commission</md-dialog-title>

            <md-dialog-content>
              <SalesCommission></SalesCommission>
            </md-dialog-content>

            <md-dialog-actions>
              <md-button
                class="md-primary md-accent"
                @click="showSalesCommission = false"
              >Okay</md-button>
            </md-dialog-actions>
          </md-dialog>
        </div>
      </div>
      <!---------->
      <!-- Payment Method -->
      <!---------->
      <div
        class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table"
        v-if="form.package_id != 4"
      >
        <div class="col-sm-12 pb-2 fl">
          <div class="title_main">Payment Method</div>
          <input-component
            custom="true"
            :error="checkValidation('payment_method')"
            errorMessage="Please Select at least one Payment Method"
          >
            <div class="limitRadio">
              <md-radio
                v-model="form.payment_method"
                value="Online"
                checked
              >Online</md-radio>

              <md-radio
                v-model="form.payment_method"
                value="Cheque"
                checked
              >Cheque</md-radio>
              <md-radio
                v-model="form.payment_method"
                value="Cash"
                checked
              >Cash</md-radio>
            </div>
          </input-component>
          <h4
            class="title_main"
            v-if="form.payment_method === 'Cheque'"
          >Cheque Details </h4>
          <div
            class="md-layout md-gutter"
            v-if="form.payment_method === 'Cheque'"
          >

            <input-component
              :size="33"
              type="text"
              placeholder="Dubai Bank"
              label="Bank Name"
              v-model="form.bank_name"
              :error="checkValidation('bank_name')"
            >
            </input-component>
            <input-component
              :size="33"
              type="number"
              placeholder="3C679C"
              label="Cheque Number"
              v-model="form.cheque_number"
              :error="checkValidation('cheque_number')"
            >
            </input-component>
            <input-component
              :size="33"
              custom="true"
              label="Cheque Date"
              :error="checkValidation('cheque_date')"
            >
              <VueDatePicker
                v-model="form.cheque_date"
                color="#f47320"
                placeholder="Choose Cheque Date"
                button-validate="Ok"
                button-cancel="Cancel"
                validate
                clearable
              />
            </input-component>
          </div>
        </div>

      </div>
      <!---------->
      <!-- Shipping Service -->
      <!---------->
      <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table">
        <div class="col-sm-12 pb-2 fl">
          <div class="title_main">Shipping Service</div>
          <input-component
            label="Shipping Services"
            custom="true"
            :error="checkValidation('shipping_service_access')"
            errorMessage="Please Select at least one Shipping Services"
          >
            <div class="limitRadio">
              <md-checkbox
                :disabled="form.package_id === '4'"
                v-model="form.shipping_service_access"
                value="0"
                checked
              > Self Shipping </md-checkbox>
              <md-checkbox
                v-for="(service,index) in shipping_service_access"
                :key="index"
                v-model="form.shipping_service_access"
                :value="service.id"
              > {{ service.name }} </md-checkbox>

            </div>
          </input-component>
        </div>
      </div>

      <!---------->
      <!-- Terms and Conditions -->
      <!---------->
      <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table">
        <div class="col-sm-12 pb-2 fl ">
          <div class="title_main">Terms And Conditions</div>

          <div class="md-layout">
            <md-button class="md-dense btn_accept ">
              <md-checkbox v-model="terms_and_conditions">{{terms_and_conditions ? 'Accepted' : 'Accept'}}</md-checkbox>
            </md-button>
            <md-button
              style="text-decoration: underline;"
              class="md-dense btn_accept fl"
              @click="showDialog=true"
            >
              Show Terms and Conditions
            </md-button>
          </div>

          <p
            class="c-forminlineError"
            v-if="submitted && !$v.terms_and_conditions.checked"
          >Please Accept Terms And Conditions</p>

        </div>
        <md-dialog :md-active.sync="showDialog">
          <md-dialog-title>Terms And Conditions</md-dialog-title>

          <md-dialog-content>
            <TermsAndConditions
              :name="form.businessname"
              :license_number="form.license_number"
              :city="form.city"
              :owner_name="form.owners[0].name"
              :designation="form.owners[0].designation"
            ></TermsAndConditions>
          </md-dialog-content>

          <md-dialog-actions>
            <md-button
              class="md-primary"
              @click="handleModalClick('reject')"
            >Reject</md-button>
            <md-button
              class="md-primary md-accent"
              @click="handleModalClick('accept')"
            >Accept</md-button>
          </md-dialog-actions>
        </md-dialog>
      </div>

      <transition name="fade">
        <div
          v-if="submitted && $v.$invalid"
          class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table"
        >
          <h4 style="color: #ff1744">
            There are some fields missing, kindly fill up them.
          </h4>
        </div>
      </transition>
      <div class="col-sm-12 p-0 fl">
        <div class="col-sm-6 pl-0 mob_pl fl margin_captcha">
          <div
            style="color: #ff1744; margin: 10px 0px"
            v-if="submitted && $v.form.recaptchaVerified.$invalid"
          >
            <span> Please Click and Verify </span>
          </div>
          <vue-recaptcha
            ref="recaptcha"
            @verify="form.recaptchaVerified = true"
            sitekey="6LcT6KMZAAAAACpBT1I36NaXOaIAd9syHvBKSNW0"
            :loadRecaptchaScript="true"
          ></vue-recaptcha>
        </div>
        <div class="col-sm-6 p-0 fl">
          <div class="fr mob_width">
            <loaderButton
              @click="submit()"
              name="Register Now"
              :class="{ disabled_color: submitted && $v.$invalid }"
              class="btn_register"
              :loading="loading"
              :disabled="submitted && $v.$invalid"
            ></loaderButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueRecaptcha from "vue-recaptcha";

import axios from "axios";
import { required, minLength, numeric, email, checked, not, sameAs } from "vuelidate/lib/validators";
import debounce from "lodash.debounce";
import uniqby from "lodash.uniqby";
import map from "lodash.map";

import utils from "@/helpers/utils.js";
import country from "@/helpers/country.js";
import loaderButton from "@/components/ui-components/loader-button.vue";
import fileInput from "@/components/ui-components/file-input.vue";
import inputComponent from "@/components/ui-components/input.vue";
import TermsAndConditions from "@/components/pages/termsAndCondition/termsAndConditions.vue"
import SalesCommission from "@/components/pages/termsAndCondition/sales_commission.vue"
import packages from "./packages"
const userObject = {
  name: "",
  designation: "",
  email: "",
  mobile: "",
  nationality: "",
  gender: ""
}

export default {
  // uploadFiles is defined in this Mixin
  props: {
    page: {
      type: String,
      default: "salesRegistration"
    }
  },
  mixins: [utils, country],
  components: { VueRecaptcha, loaderButton, fileInput, inputComponent, TermsAndConditions, packages, SalesCommission },
  data () {
    return {
      legal_statuses: [],
      file: null,
      tag: "",
      tags: [],
      freezoneNames: null,
      autocompleteItems: [],
      currencies: [],
      citiesList: [],
      citiesStatus: "Select City",
      managersDirty: false,
      personsDirty: false,
      isEmailDuplicate: false,
      mails: {},
      shipping_service_access: "",
      terms_and_conditions: false,
      showDialog: false,
      showSalesCommission: false,
      packages: [],
      loading: false,
      submitted: false,
      form: {
        recaptchaVerified: false,
        businessname: "",
        email: "",
        mobile: "",
        landline: "",
        license_number: "",
        file: null,
        activities: [],
        legal_status: "",
        issued_by: "",
        freezone_name: "",
        country: "",
        city: "",
        payment_method: "",
        shipping_service_access: [],
        package_id: "",
        owners: [
          { ...userObject },
        ],
        managers: [
          { ...userObject },
        ],
        persons: [
          { ...userObject },
        ],

        //Only if Payment Method - Cheuqe
        bank_name: "",
        cheque_number: "",
        cheque_date: new Date(),

        //Optional Fields but if any one entered then both are complusory
        trn_number: "",
        vat_percentage: "",
      }
    };
  },
  created () {
    this.fetchAndAssign("api_country", {}, "currencies");
    this.fetchAndAssign("api_legalstatus", {}, "legal_statuses");
    this.fetchAndAssign("/business/shipping-access", {}, "shipping_service_access");
    this.fetchAndAssign("business/registration-packages", {}, "packages");
  },

  methods: {
    fileUploaded (file) {
      console.log(file[0]);
      this.file = file[0];
    },
    async submit () {

      this.loading = true;
      this.submitted = true;

      try {

        console.log(this.form);
        // Validations Check
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.loading = false;
          return;
        }

        if (!this.form.managers[0].name) {
          this.form.managers = []
        }
        if (!this.form.persons[0].name) {
          this.form.persons = []
        }

        // Upload File and get its URL
        const fileUploaded = await this.uploadFiles(this.file);
        console.log(fileUploaded)
        if (!fileUploaded || fileUploaded === "fail") {
          this.loading = false;
          return;
        }
        // Form File to URL
        this.form.file = await fileUploaded[0].fileUrl;


        // Submit Form
        const response = await axios.post(
          "/sales/business-registration",
          this.form
        );
        const { success, result, message, token } = await response.data;
        if (success) {
          this.submitted = false;
          await this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully Submitted",
            showConfirmButton: true,
            confirmButtonText: "Okay"
          })
          if (this.form.payment_method === 'Online') {
            window.location.replace(`${process.env.BASE_URL}business/register-subscription?token=${token}`);
          }
          if (this.page === "businessSignUp") {
            this.$router.push("/login");
          }
          for (var value in this.form) {

            if (value === 'owners' || value === 'managers' || value === 'persons') {
              this.form[value] = [{ ...userObject }]
              continue;
            }
            this.form[value] = ""
            await console.log(this.form[value])
          }
          this.loading = false;

        } else {
          this.$swal.fire(this.$helpers.errorPopup(message))
          this.loading = false;
          this.form.managers = [{ ...userObject }]
          this.form.persons = [{ ...userObject }]
        }
        console.log(response.data);
      } catch (error) {
        console.log(error)
        this.$swal.fire(this.$helpers.errorPopup(error))
        this.loading = false;
        this.form.managers = [{ ...userObject }]
        this.form.persons = [{ ...userObject }]
      }

    },
    checkValidationCustom (obj, id, field) {
      if (this.$v.form[obj]) {
        return this.submitted && !this.$v.form[obj].$each[id][field].required;
      }

    },
    onSearch (search, loading) {
      loading(true);
      if (search.length < 2) {
        loading(false);
        return;
      }
      this.search(loading, search, this);
    },

    search: debounce(async (loading, search, vm) => {
      try {
        const res = await axios.post("/api_activities", { name: search });
        const { success, result } = await res.data;
        if (success) {
          console.log(result);
          vm.autocompleteItems = await map(uniqby(result, "id"), "title");
          loading(false);
        } else {
          loading(false);
        }
      } catch (error) {
        loading(false);
      }
    }, 400),

    async fetchFreezoneName () {
      this.freezoneNames = null
      console.log("Free Zone Selected")
      if (this.form.issued_by === 'FZ') {
        const res = await axios.post("/business/issued-by", { parent_id: 1 });
        const { success, result } = await res.data;
        this.freezoneNames = await result;
      }
    },
    valueEntered ($event, type) {
      console.log($event.target.value, type)
      if ($event.target && $event.target.value) {
        type === 'managers' ? this.managersDirty = true : this.personsDirty = true
        return
      }
      type === 'managers' ? this.managersDirty = false : this.personsDirty = false
      return
    },
    valueSelected (val, type) {
      console.log(val)
      if (val) {
        type === 'managers' ? this.managersDirty = true : this.personsDirty = true
        return
      }
      type === 'managers' ? this.managersDirty = false : this.personsDirty = false

    },
    feedEmailsArray (value, type, id = 0) {
      // Assign Mails Object (Key: Value) => Key = Type+Id (unique)
      if (value) {
        this.mails[type + id] = value
      }
      // If User Erases the value set it to empty string
      if (!value) {
        this.mails[type + id] = ""
      }

      if (!this.mails) return

      var emailsArray = []
      // Push The Emails into an Array =>emailsArray
      for (const key in this.mails) {
        console.log(key)
        emailsArray.push(this.mails[key])
      }
      //Logging to check how mnay values pushed
      console.log(emailsArray)
      // This Function checks the ID of the item with .indexOF() and compares
      // with iteration id (idx) if both are not same that means there is another
      // item with same value in the emailsArray
      this.isEmailDuplicate = emailsArray.some(function (item, idx) {
        return emailsArray.indexOf(item) != idx
      });

    },
    handleModalClick (type) {
      this.showDialog = false
      if (type === 'reject') {
        this.terms_and_conditions = false
        return
      }
      this.terms_and_conditions = true
    },

    // Error Checking for VAT
    // If TRN Number is entered then VAT Compulsory and vice-versa
    vatDetailsError (field) {
      if (this.form.trn_number || this.form.vat_percentage) {
        return this.checkValidation(field)
      }
      return false
    }

  },
  validations () {
    const file = {
      required
    };
    const isEmailDuplicate = {
      checked: value => value === false
    };
    const terms_and_conditions = {
      checked: value => value === true
    };
    const form = {
      recaptchaVerified: {
        checked: value => value === true
      },
      businessname: {
        required
      },
      email: {
        required,
        email,

      },
      mobile: {
        required
      },
      landline: {
        required
      },
      license_number: {
        required,
        numeric
      },

      activities: {
        required
      },
      legal_status: {
        required
      },
      issued_by: {
        required
      },
      country: {
        required
      },
      city: {
        required
      },
      shipping_service_access: {
        required
      },
      package_id: {
        required
      },
      owners: {
        $each: {
          name: {
            required,
            minLength: minLength(3)
          },
          designation: {
            required,
            minLength: minLength(3)
          },
          email: {
            required,
            email
          },
          mobile: {
            required
          },
          nationality: {
            required
          },
          gender: {
            required
          }
        }
      },

    }
    if (this.managersDirty) {
      form["managers"] = {
        $each: {
          name: {
            required,
            minLength: minLength(3)
          },
          designation: {
            required,
            minLength: minLength(3)
          },
          email: {
            required,
            email
          },
          mobile: {
            required
          },
          nationality: {
            required
          },
          gender: {
            required
          }
        }
      }
    }
    if (this.personsDirty) {
      form["persons"] = {
        $each: {
          name: {
            required,
            minLength: minLength(3)
          },
          designation: {
            required,
            minLength: minLength(3)
          },
          email: {
            required,
            email
          },
          mobile: {
            required
          },
          nationality: {
            required
          },
          gender: {
            required
          }
        }
      }
    }

    if (this.form.package_id != 4) {
      form.payment_method = { required }

      if (this.form.payment_method === 'Cheque') {
        form.bank_name = { required }
        form.cheque_number = { required }
        form.cheque_date = { required }
      }
    }

    if (this.form.trn_number || this.form.vat_percentage) {
      form.trn_number = { required };
      form.vat_percentage = { required };
    }

    return {
      form, file, isEmailDuplicate, terms_and_conditions
    }
  }
};
</script>
<style scoped>
.md-dialog-title {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  padding: 12px;
}
/* File Input */
.disabled_color {
  background-color: #efefef !important;
}

.license {
  margin-top: 19px;
}
.inputfile + label {
  font-size: 1.25rem;
  /* 20px */
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  /* display: inline-block; */
  overflow: hidden;
  padding: 0.625rem 1.25rem;
  /* 10px 20px */
}

.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputfile:focus + label,
.inputfile.has-focus + label {
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
}

.inputfile + label svg {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  margin-top: -0.25em;
  /* 4px */
  margin-right: 0.25em;
  /* 4px */
}

/* style 6 */

.inputfile-6 + label {
  border: 1px solid #d3394c;
  border-radius: 3px;
  background-color: #efefef;
  padding: 0;
  color: #213a63;
}

.inputfile-6:focus + label,
.inputfile-6.has-focus + label,
.inputfile-6 + label:hover {
  border-color: #ff7d53;
}

.inputfile-6 + label span,
.inputfile-6 + label strong {
  /* padding: 0.625rem 1.25rem; */
  padding: 0.7em;
  /* 10px 20px */
}

.inputfile-6 + label span {
  /* width: 200px; */
  font-weight: 100;
  min-height: 2em;
  /* display: inline-block; */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: top;
}

.inputfile-6 + label strong {
  height: 100%;
  color: #fff;
  background-color: #ff5722;
  font-size: 1.2em;
  font-weight: 100;
  /* display: inline-block; */
}

.inputfile-6:focus + label strong,
.inputfile-6.has-focus + label strong,
.inputfile-6 + label:hover strong {
  background-color: #ff7d53;
}
/* .package-radio {
  height: 59px !important;
  align-items: flex-start !important;
  padding: 10px !important;
} */
/* Abhishek */
.label {
  padding-bottom: 5px;
}

.big_title {
  font-size: 20px;
}
.limitRadio {
  display: flex;
  margin-bottom: 1em;
}
.limitRadio .md-radio {
  border: 1px solid #ddd;
  height: 35px;
  border-radius: 19px;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 13px;
  margin-right: 1em;
  margin-top: 1em;
}
.owner {
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 18%);
  position: relative;
  /* background-color: #efefef; */
  background-color: #ffffff;
  border-radius: 6px;
  padding: 25px;
  margin-bottom: 20px;
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
.title_main {
  color: var(--md-theme-default-text-accent-on-background, rgba(0, 0, 0, 0.54));
  font-size: 20px;
  font-weight: 600;
  margin: 9px 0px;
}

.fl {
  float: left;
}
.fr {
  float: right;
}

.tag_input {
  width: 100%;
  max-width: 100%;
  border: solid 1px #e4e3e3;
  border-bottom: solid 1px #848484;
  outline: none;
  /* padding: 9px 12px; */
  font-size: 14px;
}

.ti-new-tag-input-wrapper input::placeholder {
  font-size: 12px;
}
.select-fieldset > .md-layout-item {
  margin: 10px 0px;
}
.btn_register {
  color: #fff;
  background-color: #ff5722;
  min-width: 125px;
  height: 35px;
  margin-top: 30px;
}
.btn_accept {
  background-color: #ffffff;
  min-width: 125px;
  height: 35px;
  margin-top: 30px;
}

.btn_delete {
  min-width: 20px;
  height: 32px;
  background-color: #ff5722 !important;
  border-radius: 3px;

  width: 38px;
}

.btn_delete i {
  font-size: 20px !important;
}

.btn_add {
  background-color: #213c64 !important;
  margin-right: 5px;
  min-width: 110px;
}

.btn_register i {
  margin-right: 3px;
  float: left;
}
.btn_register span {
  float: left;
  margin-top: 5px;
}
.margin_mobile {
  margin-top: 13px;
}
.margin_license {
  margin-top: 15px;
}
.margin_activity {
  margin-top: 7px;
}
.margin_selection {
  margin-top: 35px;
}
.margin_selection_second {
  margin-top: 9px;
}
.margin_selection_third {
  margin-top: 35px;
}
.margin_title {
  margin-top: 50px;
}
.margin_contact {
  margin-top: 5px;
}
.margin_contact_two {
  margin-top: 28px;
}
.mrgn_add {
  margin-right: 0px;
  margin-top: 25px;
}
.mrgn_add_two {
  margin-right: 0px;
  margin-top: 0px;
}
.margin_mobile_second {
  margin-top: 15px;
}
.margin_email_second {
  margin-top: -8px;
}
.margin_captcha {
  margin-top: 15px;
}
.margin_radio {
  margin-top: 25px;
}

.margin_email {
  margin-top: -10px;
  height: 48px;
}

@media screen and (max-width: 768px) {
  /* Making Form Fields Width 100% */
  .wrapper_order_table,
  .owner {
    padding: 12px;
  }

  .btn_register {
    margin-top: 23px;
    margin-right: 0px;
  }

  .btn_register i {
    margin-top: 1px;
  }
  .btn_add {
    margin-right: 8px !important;
  }

  .mrgn_add {
    margin-right: 0px !important;
    margin-top: 25px;
  }
  .mrgn_add_two {
    margin-right: 0px !important;
    margin-top: 0px;
  }
  .limitRadio .md-radio {
    padding: 8px;
  }
}

@media screen and (max-width: 600px) {
  .title_main {
    width: fit-content;
    margin-top: 7px;
  }

  .mob_pr {
    padding-left: 0px !important;
  }
  .mob_pl {
    padding-right: 0px !important;
  }

  .margin_email_mob {
    margin-top: -10px;
  }
  .margin_mobile_mob {
    margin-top: 38px;
  }
  .margin_license_mob {
    margin-bottom: 10px;
  }
  .margin_selection {
    margin-top: 15px;
  }
  .margin_activity {
    margin: 20px 0px;
  }
  .margin_title {
    margin-top: 45px;
  }
  .margin_contact {
    margin-top: 15px;
  }
  .margin_contact_two {
    margin-top: 15px;
  }
  .margin_captcha {
    margin-top: 10px;
  }
  .btn_register {
    width: 115px;
  }
  .mob_width {
    width: 100%;
    margin-left: -3px;
    float: left;
  }
  .btn_register {
    float: right;
  }
  .margin_selection_second {
    margin-top: 35px;
  }
  .mrgn_add_two {
    margin-top: 25px;
    margin-right: 0px !important;
    float: right;
  }
  .mrgn_add {
    margin-right: 0px !important;
    float: right;
  }

  .mob_mr_two {
    margin-top: 40px;
  }
  .mob_top {
    margin-top: 20px;
  }
}
@media screen and (max-width: 600px) {
  .limitRadio {
    display: block;
    margin-bottom: 0em;
  }
  .limitRadio .md-radio {
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 420px) and (min-width: 410px) {
  .mob_width {
    width: 100%;
    margin-left: 15px;
    float: left;
  }
  .btn_register {
    margin-right: 15px;
  }
}
@media screen and (max-width: 360px) {
  .rc-anchor-normal {
    height: 74px;
    width: 91%;
  }
}

@media screen and (max-width: 300px) {
  .title_main {
    font-size: 13px;
  }

  .btn_register {
    width: 110px;
    min-width: 92px;
  }
  .btn_register span {
    font-size: 11px;
  }
  .md-button-content {
    font-size: 5px !important;
  }
  .btn_add {
    margin-right: 4px !important;
  }
  .btn_register strong {
    font-size: 11px;
  }
  .btn_register i {
    margin-right: 0px;
  }

  .rc-anchor-normal {
    height: 74px;
    width: 50% !important;
  }
}
</style>
