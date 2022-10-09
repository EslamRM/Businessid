<template>
  <transition name="fade">
    <md-table-row>
      <md-table-cell colspan="10" md-numeric
        ><center>
          <h1 class="no-orders-found">{{ msg }}</h1>
        </center></md-table-cell
      >
    </md-table-row>
  </transition>
</template>

<script>
export default {
  props: ["msg"]
};
</script>

<style scoped>
.no-orders-found {
  padding: 19px 0px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
  float: left;
  width: 100%;
  font-size: 16px;
}
@media screen and (max-width: 768px) {
  .no-orders-found {
  font-size: 13px;
}
}
@media screen and (max-width: 600px) {
  .no-orders-found {
  font-size: 12px;
}
}

</style>
