<template>
  <div>
    <div class="edit-profile-tab">
      <div class="pills">
        <router-link
          class="pill"
          active-class="pill-active"
          to="/dashboard/common/settings/"
          exact
        >
          <md-button class="md-raised">
            <i class="material-icons">info</i>
            Basic Information
          </md-button>
        </router-link>
        <!-- <router-link
          class="pill"
          active-class="pill-active"
          exact
          to="billingAddress"
        >
          <md-button class="md-raised">
            <i class="material-icons">near_me</i>
            Billing Address
          </md-button>
        </router-link> -->
        <router-link
          class="pill"
          active-class="pill-active"
          exact
          to="/dashboard/common/settings/accountSetting"
        >
          <md-button class="md-raised">
            <i class="material-icons">settings</i>
            Account Settings
          </md-button>
        </router-link>
        <router-link
          class="pill"
          active-class="pill-active"
          exact
          to="/dashboard/common/settings/changePassword"
        >
          <md-button class="md-raised">
            <i class="material-icons">lock</i>
            Change Password
          </md-button>
        </router-link>
        <router-link
          class="pill"
          active-class="pill-active"
          to="/dashboard/common/settings/blocks/"
          exact
        >
          <md-button class="md-raised">
            <i class="material-icons">block</i>
            Blocks
          </md-button>
        </router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.pills .md-button {
  height: 42px;
}
.pill .md-button i {
  margin-right: 0.3em;
  color: #777;
}
.edit-profile-tab {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pill-active .md-button {
  background-color: #e4e4e4 !important;
}

@media screen and (max-width: 768px) {
  .md-button {
    margin: 6px 3px !important;
  }

  .edit-profile-tab .pills {
    overflow-x: auto;
    white-space: nowrap;
    max-width: 600px;
  }

  a.pill {
    display: inline-block;
  }
}

@media screen and (max-width: 600px) {
  .edit-profile-tab .md-button-content i {
    display: none;
  }

  .pills .md-button {
    height: 30px;
  }

  .edit-profile-tab .pills {
    overflow-x: auto;
    white-space: nowrap;
    max-width: 100%;
  }

  a.pill {
    display: inline-block;
    margin-right: -4px;
  }
}
</style>
