<template>
  <div>
    <div class="manage-order-tab">
      <div class="pills">
        <router-link
          class="pill"
          active-class="pill-active"
          exact
          to="/dashboard/vendor/wallet/"
        >
          <md-button class="md-raised"> Wallet </md-button>
        </router-link>

        <router-link
          class="pill"
          active-class="pill-active"
          exact
          to="/dashboard/vendor/wallet/accounts/"
        >
          <md-button class="md-raised"> Accounts </md-button>
        </router-link>

     
      </div>
      <!------
      <span class="add-new-btn fr">
        <router-link to="/dashboard/vendor/addnewitems">
          <md-button class="md-raised md-accent cnt-cntr">
            <i class="material-icons">add</i>Add New in Store
          </md-button>
        </router-link>
      </span>
      ------->
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
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
  padding-bottom: 25px;
}
.pill-active .md-button {
  background-color: #e4e4e4 !important;
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

.md-button {
  height: 42px;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 0px;
  margin-left: 0px;
  margin-bottom: 0px;
}

@media screen and (max-width: 768px) {
  .md-button {
    font-size: 13px;
    margin-right: 8px;
    margin: 6px 3px !important;
  }
.manage-order-tab{padding-bottom: 15px !important;}
  .manage-order-tab .pills {
    overflow-x: auto;
    white-space: nowrap;
    max-width: 600px;
  }
  a.pill {
    display: inline-block;
  }
}

@media screen and (max-width: 600px) {
  .md-button {
    font-size: 12px;
  }

  .manage-order-tab {
    margin-top: -10px !important;
    margin-bottom: -15px;
  }

  .manage-order-tab .pills {
    overflow-x: auto;
    white-space: nowrap;
    max-width: 100%;
    width: 100%;
  }

  a.pill {
    display: inline-block;
    margin-right: -4px;
  }

  .md-button {
    margin: 15px 3px !important;
  }
}
</style>
