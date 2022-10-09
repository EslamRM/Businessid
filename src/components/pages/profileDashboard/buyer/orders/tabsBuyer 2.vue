<template>
  <div>
    <div class="manage-order-tab">
      <div class="pills">
        <router-link
          class="pill"
          active-class="pill-active"
          exact
          to="/dashboard/buyer/orders/"
        >
          <md-button
            class="md-raised"
            :class="{
              'pill-active': active === 'Pending' || active === 'Shipped',
            }"
          >
            <strong>Pending</strong>
            <span class="count_yellow">{{ count.total_pending }}</span>
          </md-button>
        </router-link>
        <router-link
          class="pill"
          active-class="pill-active"
          exact
          to="/dashboard/buyer/orders/delivered"
        >
          <md-button
            class="md-raised"
            :class="{ 'pill-active': active === 'Delivered' }"
          >
            <strong>Delivered</strong>
            <span class="count_violet">{{ count.total_delivered }}</span>
          </md-button>
        </router-link>
        <router-link
          class="pill"
          active-class="pill-active"
          exact
          to="/dashboard/buyer/orders/cancelled"
        >
          <md-button
            class="md-raised"
            :class="{ 'pill-active': active === 'Cancelled' }"
          >
            <strong>Cancelled</strong>
            <span class="count_orange">{{ count.total_cancelled }}</span>
          </md-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {};
  },

  props: ["count", "active"]
};
</script>
<style scoped>
.pill strong {
  float: left;
  margin-top: 5px;
  margin-right: 5px;
  font-weight: 500;
}
/* Abhishek */
.count_orange {
  background-color: #ff5733 !important;
}
.count_violet {
  background-color: #3f51b5 !important;
}
.count_yellow {
  background-color: #ffc300 !important;
}
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
.pill-active .md-button {
  background-color: #e4e4e4 !important;
}
.pill-active {
  background-color: #e4e4e4 !important;
}
@media screen and (max-width: 768px) {
  .md-button {
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

  .manage-order-tab {
    margin-top: -10px !important;
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
  .pills {
    margin-right: -15px !important;
  }
  .md-button.md-theme-default.md-raised:not([disabled]) {
    margin-bottom: 7px;
    margin-right: 0px;
  }
  .pill strong {
    margin-top: 1px;
    padding-left: 10px;
  }
}
</style>
