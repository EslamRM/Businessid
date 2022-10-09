<template>
  <md-dialog :md-active.sync="showDialog">
    <md-dialog-title>
      <div class="removeHead">
        <i class="md-icon md-icon-font">remove_shopping_cart</i>
      </div>Are you sure want to cancel your order
    </md-dialog-title>

    <div class="dialogue-container">
      <div class="txtMuted">
        It would be great if you could tell us what made you
        cancel so we can improve
      </div>

      <div class="cancelWrap mt-3">
        <div class="txtMuted big">Pleas select cancellation reason</div>

        <div class="md-layout-item">
          <md-field>
            <md-select v-model="reason" name="reason" id="reason" placeholder="Select a reason">
              <md-option value="Short">Short warrenty period</md-option>
              <md-option value="twice">I order twice</md-option>
              <md-option value="interested">Iam not interested anymore</md-option>
              <md-option value="Other">Other reason</md-option>
            </md-select>
          </md-field>
          <md-field>
            <label>
              Give us more detail about this
              cancellation
            </label>
            <md-textarea v-model="textarea"></md-textarea>
          </md-field>
          <div class="btnWrap">
            <md-button class="md-button md-raised md-accent md-theme-default">Submit</md-button>
            <md-button class="md-button md-theme-default outline">Cancel</md-button>
          </div>
        </div>
      </div>
    </div>
  </md-dialog>
</template>