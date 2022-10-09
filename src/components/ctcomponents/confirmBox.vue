<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="confirmBoxValue"
      md-title="Are you Sure to Delete This Content?"
      md-content="Let uaect gets your decision. <br> This means uaect Deletes your contents from website permanently.."
      md-confirm-text="Agree"
      md-cancel-text="Disagree"
      @md-cancel="onCancelMethod"
      @md-confirm="onConfirmMethod"
    />
    {{active}}
  </div>
</template>

<script>
export default {
  name: "DialogConfirm",
  props: ["confirmBoxValue"],
  data: () => ({
    value: null
  }),
  methods: {
    onConfirmMethod() {
      this.value = "Agreed";
    },
    onCancelMethod() {
      this.value = "Disagreed";
    }
  }
};
</script>