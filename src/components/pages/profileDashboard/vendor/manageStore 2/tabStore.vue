<template>
  <div>
    <div class="manage-order-tab">
      <div class="pills">
        <router-link
          class="pill"
          active-class="pill-active"
          exact
          to="/dashboard/vendor/manage-store/item"
        >
          <md-button class="md-raised"> Products </md-button>
        </router-link>

        <router-link
          class="pill"
          active-class="pill-active"
          exact
          :to="{
            name: 'manageStoreProducts',
            params: {
              type: 'property'
            }
          }"
        >
          <md-button class="md-raised"> Properties </md-button>
        </router-link>
        <router-link
          class="pill"
          active-class="pill-active"
          exact
          to="/dashboard/vendor/manage-store/auto"
        >
          <md-button class="md-raised"> Autos </md-button>
        </router-link>

        <router-link
          class="pill"
          active-class="pill-active"
          exact
          to="/dashboard/vendor/manage-store/service"
        >
          <md-button class="md-raised"> Services </md-button>
        </router-link>

        <router-link
          class="pill"
          active-class="pill-active"
          exact
          to="/dashboard/vendor/manage-store/food"
        >
          <md-button class="md-raised"> Foods </md-button>
        </router-link>
      </div>
      <span class="add-new-btn fr">
        <router-link to="/dashboard/vendor/addnewitems">
          <md-button class="md-raised md-accent cnt-cntr">
            <i class="material-icons">add</i>Add New in Store
          </md-button>
        </router-link>
      </span>
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
    height: 35px;
    padding-left: 0px;
    padding-right: 5px;
  }
  .manage-order-tab {
    margin-top: 35px;
  }
  .add-new-btn {
    margin-top: -100px;
    margin-left: -110px;
  }

  .md-button {
    font-size: 13px;
    margin-right: 8px;
    margin: 6px 3px !important;
  }

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
  .add-new-btn {
    margin-top: -75px;
    margin-left: -148px;
  }
  .manage-order-tab {
    margin-top: 15px !important;
  }

  .manage-order-tab .pills {
    overflow-x: auto;
    white-space: nowrap;
    max-width: 100%;
    margin-top: 10px;
  }

  a.pill {
    display: inline-block;
    margin-right: -4px;
  }

  .md-button {
    margin: 12px 1px !important;
    height: 30px;
  }

  .manage-order-tab {
    padding-bottom: 0px;
  }
}

@media screen and (max-width: 300px) {
}
</style>
