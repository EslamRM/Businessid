<template>
  <div>
    <loader v-if="loader"></loader>
    <div class="dash-brd-bx-1 mrg-t-10" v-else>
      <div class="container padding_mob">
        <!-- <div class="admin-bx-txt-1 padding_admin_bx">
          <span> {{ title }} </span>
          <span class="add-new-btn-1">
            <router-link to="/dashboard/vendor/addnewitems">
              <md-button class="md-raised md-accent cnt-cntr">
                <i class="material-icons">add</i>Add New in Store
              </md-button>
            </router-link>
          </span>
        </div> -->
        <div
          class="md-layout md-alignment-center-center padding_admin_bx dashboard-header"
        >
          <div class="md-layout-item">
            {{ title }}
          </div>
          <div class="md-layout-item">
            <md-menu
              v-if="subAccountsArray && activeUser"
              class="fr"
              md-size="big"
              md-align-trigger
              :md-active.sync="toggleMenu"
            >
              <md-button class="md-flat fr" md-menu-trigger>
                <md-icon>person</md-icon>
                Switched to
                {{ activeUser.trade_name_en }}
              </md-button>

              <md-menu-content class="sub-accounts-menu">
                <md-menu-item
                  v-for="el in subAccountsArray"
                  :key="el.id"
                  :class="{ active: el.switched === '1' }"
                  @click="switchAccount(el.id)"
                >
                  <md-icon class="white">assignment_ind</md-icon>
                  <span> {{ el.trade_name_en }} </span>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
          <!-- <div class="md-layout-item">
            <span class="add-new-btn fr">
              <router-link to="/dashboard/vendor/addnewitems">
                <md-button class="md-raised md-accent cnt-cntr">
                  <i class="material-icons">add</i>Add New in Store
                </md-button>
              </router-link>
            </span>
          </div> -->
        </div>
        <div class="dash-brd-bx-1-cnt">
          <div class="flex-bx-tp-1 pos-rel">
            <div class="dashboardHeader main-head system_menu">
              <div class="head-nav">
                <ul class="menu" v-if="dashboard_menu">
                  <!-- <li class="registration">
                    <router-link
                      to="/dashboard/admin/registrations"
                      active-class="sb-lnk-active"
                      exact
                    >
                      <div class="wrapIn">
                        <div class="iconn icon_img"></div>
                        <span class="icon_img_text">Registration</span>
                      </div>
                    </router-link>
                  </li>

                  <li>
                    <router-link
                      to="/dashboard/vendor/manage-store/"
                      active-class="sb-lnk-active"
                    >
                      <div class="wrapIn">
                        <div class="iconn">
                          <i class="material-icons f-s-19">store</i>
                        </div>
                        <span>Manage Store</span>
                      </div>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/dashboard/vendor/orders/"
                      active-class="sb-lnk-active"
                    >
                      <div class="wrapIn">
                        <div class="iconn">
                          <i class="material-icons f-s-19">grading</i>
                        </div>
                        <div class="ct-badge">3</div>
                        <span>Received Orders</span>
                      </div>
                    </router-link>
                  </li>

                  <li>
                    <router-link
                      to="/dashboard/vendor/purchase-invoice/"
                      active-class="sb-lnk-active"
                    >
                      <div class="wrapIn">
                        <div class="iconn">
                          <i class="material-icons f-s-19">receipt</i>
                        </div>
                        <div class="ct-badge">8</div>
                        <span>Invoice</span>
                      </div>
                    </router-link>
                  </li>

                  <li>
                    <router-link
                      to="/#"
                      exact-active-class="sb-lnk-active"
                      exact
                    >
                      <div class="wrapIn">
                        <div class="iconn">
                          <i class="material-icons f-s-19">list_alt</i>
                        </div>
                        <span>Sales Reports</span>
                      </div>
                    </router-link>
                  </li>

                  <li>
                    <router-link
                      to="/dashboard/buyer/orders/"
                      active-class="sb-lnk-active"
                    >
                      <div class="wrapIn">
                        <div class="iconn">
                          <i class="material-icons f-s-19">shopping_basket</i>
                        </div>
                        <div class="ct-badge">5</div>
                        <span>My Orders</span>
                      </div>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/dashboard/vendor/profileManagePayments"
                      exact-active-class="sb-lnk-active"
                      exact
                    >
                      <div class="wrapIn">
                        <div class="iconn">
                          <i class="material-icons f-s-19">payment</i>
                        </div>
                        <span>Manage Payments</span>
                      </div>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/dashboard/common/manage-profile/"
                      active-class="sb-lnk-active"
                    >
                      <div class="wrapIn">
                        <div class="iconn">
                          <i class="material-icons f-s-21">person</i>
                        </div>
                        <span>Manage profile</span>
                      </div>
                    </router-link>
                  </li>

                  <li class="registration">
                    <router-link
                      to="/dashboard/vendor/users/manage-users"
                      active-class="sb-lnk-active"
                      exact
                    >
                      <div class="wrapIn">
                        <div class="iconn icon_img"></div>
                        <span class="icon_img_text">Manage Users / Staffs</span>
                      </div>
                    </router-link>
                  </li>

                  <li>
                    <router-link
                      to="/dashboard/vendor/profileQutation"
                      exact-active-class="sb-lnk-active"
                      exact
                    >
                      <div class="wrapIn">
                        <div class="iconn">
                          <i class="material-icons f-s-19 note">note</i>
                        </div>
                        <span>Manage Quotation</span>
                      </div>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/vendor/shipping"
                      exact-active-class="sb-lnk-active"
                      exact
                    >
                      <div class="wrapIn">
                        <div class="iconn">
                          <i class="material-icons f-s-21">local_shipping</i>
                        </div>
                        <span>Manage Shipping</span>
                      </div>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/"
                      exact-active-class="sb-lnk-active"
                      exact
                    >
                      <div class="wrapIn">
                        <div class="iconn">
                          <i class="material-icons f-s-21">where_to_vote</i>
                        </div>
                        <span>Stock Location</span>
                      </div>
                    </router-link>
                  </li>

                  <li class="registration">
                    <router-link
                      to="/dashboard/sales/registration-request"
                      active-class="sb-lnk-active"
                      exact
                    >
                      <div class="wrapIn">
                        <div class="iconn icon_img"></div>
                        <div class="ct-badge sales_badge">Sales</div>
                        <span class="icon_img_text">Registration Request </span>
                      </div>
                    </router-link>
                  </li> -->

                  <li
                    v-for="(item, id) in dashboard_menu"
                    :key="id"
                    v-if="item.icon !== 'dashboard'"
                  >
                    <router-link
                      v-if="item.access === '1' && item.type === 'menu'"
                      :to="item.path"
                      :active-class="
                        item.name === 'dashboard'
                          ? 'sb-lnk-active is-dash'
                          : 'sb-lnk-active'
                      "
                    >
                      <div class="wrapIn" v-if="item.name === 'sales_registration'">
                        <div class="iconn icon_img"></div>
                        <div class="ct-badge sales_badge">Sales</div>
                        <span class="icon_img_text">Registration Request </span>
                      </div>
                      <div class="wrapIn" v-else>
                        <div class="iconn">
                          <div class="ct-badge" v-if="item.badge_counts !== '0'">
                            {{ item.badge_counts }}
                          </div>
                          <i class="material-icons f-s-21">{{ item.icon }}</i>
                        </div>
                        <span> {{ item.label }} </span>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>

            <div class="flx-auto-box rightwrapAll wrap-all-the-things">
              <div class="adminDetailBx wrapper_mob_menu">
                <router-view></router-view>
              </div>
            </div>

            <!--------tab_menu_start------>

            <div class="tab_menu">
              <div class="">
                <ul class="menu" v-if="dashboard_menu">
                  <li
                    class="registration first_li"
                    v-for="(link, id) in dashboard_menu"
                    :key="id"
                  >
                    <router-link
                      v-if="link.access === '1' && link.type === 'menu'"
                      :to="link.path"
                      active-class="sb-lnk-active"
                    >
                      <div class="box_left"></div>
                      <div class="ct-badge" v-if="parseInt(link.badge_counts) > 0">
                        {{ link.badge_counts }}
                      </div>
                      <span> {{ link.label }} </span>
                    </router-link>
                  </li>

                  <!-- <li>
                    <router-link
                      to="/dashboard/vendor/manage-store/"
                      active-class="sb-lnk-active"
                      exact
                    >
                      <div class="box_left"></div>

                      <span>Manage Store</span>
                    </router-link>
                  </li>

                  <li>
                    <router-link
                      to="/dashboard/vendor/orders/"
                      active-class="sb-lnk-active"
                    >
                      <div class="box_left"></div>
                      <div class="ct-badge">3</div>
                      <span>Manage Orders</span>
                    </router-link>
                  </li>

                  <li>
                    <router-link
                      to="/dashboard/vendor/purchase-invoice/"
                      active-class="sb-lnk-active"
                    >
                      <div class="box_left"></div>
                      <div class="ct-badge">8</div>
                      <span>Purchase Invoice</span>
                    </router-link>
                  </li>

                  <li>
                    <router-link
                      to="/#"
                      exact-active-class="sb-lnk-active"
                      exact
                    >
                      <div class="box_left"></div>
                      <span>Sales Reports</span>
                    </router-link>
                  </li>

                  <li>
                    <router-link
                      to="/dashboard/buyer/orders/"
                      active-class="sb-lnk-active"
                    >
                      <div class="box_left"></div>
                      <div class="ct-badge">5</div>
                      <span>My Orders</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/dashboard/vendor/profileManagePayments"
                      exact-active-class="sb-lnk-active"
                      exact
                    >
                      <div class="box_left"></div>
                      <span>Manage Payments</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/dashboard/common/manage-profile/"
                      active-class="sb-lnk-active"
                    >
                      <div class="box_left"></div>
                      <span>Manage profile</span>
                    </router-link>
                  </li>

                  <li class="registration first_li">
                    <router-link
                      to="/dashboard/vendor/users/manage-users"
                      active-class="sb-lnk-active"
                      exact
                    >
                      <div class="box_left"></div>

                      <span>Manage Users / Staffs</span>
                    </router-link>
                  </li>

                  <li>
                    <router-link
                      to="/dashboard/vendor/profileQutation"
                      exact-active-class="sb-lnk-active"
                      exact
                    >
                      <div class="box_left"></div>
                      <span>Manage Quotation</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/vendor/shipping"
                      exact-active-class="sb-lnk-active"
                      exact
                    >
                      <div class="box_left"></div>
                      <span>Manage Shipping</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/"
                      exact-active-class="sb-lnk-active"
                      exact
                    >
                      <div class="box_left"></div>
                      <span>Stock Location</span>
                    </router-link>
                  </li>

                  <li>
                    <router-link
                      to="/dashboard/sales/registration-request"
                      exact-active-class="sb-lnk-active"
                      exact
                    >
                      <div class="box_left"></div>
                      <div class="ct-badge sales_badge">Sales</div>
                      <span>Registration Request</span>
                    </router-link>
                  </li> -->
                </ul>
              </div>
            </div>

            <!--------tab_menu_end------>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import loader from "@/components/pages/profileDashboard/components/loader.vue";
import axios from "axios";
export default {
  data() {
    return {
      isLoaded: false,
      manageStoreUrl: "",
      toggleMenu: false,
      subAccountsArray: null,
      activeUser: null,
    };
  },
  components: {
    loader,
  },
  computed: {
    ...mapState({
      dashboard_menu: (state) => state.profile.dashboard_menu,
      title: (state) => state.profile.title,
      loader: (state) => state.profile.loader,
      mainUser: (state) => state.user.retrievedTokenDetail.result,
    }),
  },
  methods: {
    LoadProfile(profile_id) {
      this.isLoaded = false;
      this.$store
        .dispatch("profile_info", profile_id)
        .then((response) => {
          console.log(response);
          localStorage.setItem("switched_user_id", response.profile.userid);
          this.isLoaded = true;
        })
        .catch((error) => console.log("loadProfile", error));
    },
    async switchAccount(company_id) {
      const res = await axios.post("/dashboard/switch-account", {
        company_id,
      });
      if (res.data.success) {
        await localStorage.setItem("switched_user_id", company_id);
        this.subAccountsArray = null;
        //TODO: Uncomment to 100% switched user working
        // location.reload();
        // If The Switch User without refresh doesn't work just comment this only the below code nothing else.
        this.subAccounts();
        this.$store.dispatch("dashboard_access");
        this.$store.dispatch("loggedIn_profile");
        this.$store.dispatch("switchedUserId");
        // this.LoadProfile(company_id)
        this.$router.push("/dashboard");
      }
    },
    async subAccounts() {
      const res = await axios.post("/dashboard/sub-accounts");
      if (res.data.success) {
        this.subAccountsArray = await res.data.products;
        const ifOtherCompanyActive = await this.$helpers.selectObjectFromArray(
          this.subAccountsArray,
          "switched",
          "1"
        );
        console.log("active User Name", ifOtherCompanyActive);
        const mainUser = {
          id: this.mainUser.userid,
          logo: this.mainUser.logo,

          trade_name_en: this.mainUser.trade_name_en,
        };
        if (!ifOtherCompanyActive) {
          this.activeUser = await mainUser;
          await this.subAccountsArray.unshift({
            ...mainUser,
            switched: "1",
          });
        } else {
          this.activeUser = await ifOtherCompanyActive;
          console.log(ifOtherCompanyActive);
          await this.subAccountsArray.unshift({
            ...mainUser,
            switched: "0",
          });
        }
      }
    },
  },

  mounted() {
    this.$store.dispatch("dashboard_access");
    this.subAccounts();
    // this.LoadProfile()
  },
};
</script>
<style scoped>
/* Abhishek CSS */
.dashboard-header {
  padding: 24px 0;
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.add-new-btn .md-button {
  height: 35px;
}

.add-new-btn .md-button-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.active,
.active span {
  background: #ff5722;
  color: white;
}

.active .md-icon.md-theme-default.md-icon-font {
  color: white;
}

.md-menu-content,
.md-menu-content .md-menu-content-container {
  border-radius: 10px;
}

.md-menu-content-container {
  border-radius: 10px !important;
}

.sub-accounts-menu .md-list .md-theme-default {
  padding: 0px !important;
}

.sub-accounts-menu .md-menu-content,
.sub-accounts-menu .md-menu-content-container {
  border-radius: 10px;
}
/*-----icon_img_style_start------*/

.icon_img {
  background-image: url(~@/assets/images/mobile/registrations.png);
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: center;
  width: 16px;
  height: 16px;
  padding-left: 39px;
}
.sb-lnk-active .icon_img {
  background-image: url(~@/assets/images/icon/registrations_over.png) !important;
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: center;
  width: 16px;
  height: 16px;
  padding-left: 39px;
}

.sb-lnk-active .ct-badge {
  display: none;
}

.sb-lnk-active .icon_img_text {
  left: -10px;
}
.main-head:hover .head-nav .registration a {
  padding: 0px 0px;
}
span.icon_img_text {
  left: -10px;
}
/*-----icon_img_style_end------*/

.admn-lnk-tp-1 {
  margin-bottom: 8px;
  display: block;
}
.admn-lnk-tp-1-btn {
  background: #fff;
  border: 1px solid #dcdee3;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  display: block;
  width: 100%;
}
.adminDetailBx {
  width: 100%;
  display: block;
  padding-left: 3%;
  padding-bottom: 2em;
  /* min-height: 70vh; */
}
.admn-sb-lnk-1 {
  background: #e4e4e4 !important;
}
.icon-circle-1 {
  margin-right: 5px;
}
.admin-bx-txt-1 {
  background-color: transparent;
  align-items: flex-start;
  text-align: left;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  font-size: 17px;
  font-weight: 500;
  align-items: left;
  margin-bottom: 20px;
  position: relative;
  border-bottom: 1px solid #eee;
}
.dashboardHeader.main-head {
  width: 61px;
  /* height: 455px; */
  /* TODO: Review the code below (height) --- Designer */
  height: fit-content;
  z-index: 3;
  background: rgb(33, 58, 99, 0.13);
  -webkit-transition: width 400ms;
  transition: width 400ms;
  position: absolute;
  left: 0;
  border-radius: 9px;
  box-shadow: 0 4px 12px 0 hsla(0, 0%, 60%, 0.2);
}
.wrapIn {
  text-align: center;
  width: 100%;
  -webkit-transition: all 400ms ease-in-out;
  transition: all 400ms ease-in-out;
  /* display: flex; */
  align-items: center;
  /* justify-content: center; */
  /* text-align: center; */
  /* overflow: hidden; */
  height: 100%;
}
.hide {
  display: none;
}
.head-nav {
  overflow: hidden;
  padding-top: 5px;
}
/*
.menu {
  height: 552px;
  overflow: hidden;
  overflow-y: scroll;
}
*/
.menu::-webkit-scrollbar {
  width: 2px;
}

/* Track */
.menu::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
}

/* Handle */
.menu::-webkit-scrollbar-thumb {
  background: #f4f5f7;
}

/* Handle on hover */
.menu::-webkit-scrollbar-thumb:hover {
  background: #f4f5f7;
}

.head-nav li:hover a {
  opacity: 0.89;
  color: #fff;
}
.head-nav ul {
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
  padding: 0;
  list-style: none;
  width: 95%;
  margin: 0 auto;
  margin-top: 0.85rem;
}
.head-nav li {
  position: relative;
  clear: both;
  width: 100%;
  padding: 0;
  transition: background 400ms;
  margin-bottom: 0.77em;
}
.head-nav li a {
  justify-content: center;
  display: flex;
  height: 40px;
  background: rgba(255, 255, 255, 0.65);
  border-radius: 21px;
  padding: 0px;
  width: 39px;
  height: 39px;
  margin: 0 auto;
  margin: 0 auto;
  align-items: center;
  transition: width 400ms ease-in-out;
  align-self: center;
  text-align: center;
}
.head-nav a {
  align-items: center;
  width: 100%;
  color: #fefefe;
  text-decoration: none;
  transition: all 400ms ease-in-out;
}
.head-nav a span {
  position: relative;
  display: block;
  z-index: 0;
  text-indent: 7px;
  white-space: nowrap;
  color: #555;
  top: 1px;
  font-weight: 600;
  font-size: 13px;
  transition: opacity 0.4s ease-in-out;
  visibility: hidden;
  opacity: 0;
}
.head-nav .iconn {
  color: rgb(33, 58, 99, 0.75);
  transition: all 400ms ease-in-out;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-head:hover .wrapIn {
  text-align: left;
  display: flex;
  align-items: center;
}
.main-head:hover .head-nav a span {
  visibility: visible;
  opacity: 1;
}
.main-head:hover .head-nav li a {
  width: 94%;
  padding: 0 11px;
}
.head-nav li a:hover {
  opacity: 0.9;
}
.main-head:hover {
  width: 220px;
}
.main-head:hover + .wrap-all-the-things {
  transform: translateX(159px);
  max-width: 100%;
  opacity: 1;
}
/* .main-head:hover .head-nav li:nth-of-type(1) span {
	 transition-delay: 100ms;
}
 .main-head:hover .head-nav li:nth-of-type(2) span {
	 transition-delay: 200ms;
}
 .main-head:hover .head-nav li:nth-of-type(3) span {
	 transition-delay: 300ms;
}
 .main-head:hover .head-nav li:nth-of-type(4) span {
	 transition-delay: 400ms;
} */

.wrap-all-the-things {
  min-height: 100%;
  height: 100%;
  width: calc(100% - 71px);
  padding-left: 71px;
  transition: transform 400ms, opacity 400ms;
}
.f-s-18 {
  font-size: 18px;
}
.f-s-19 {
  font-size: 19px;
}
.f-s-21 {
  font-size: 21px;
}
.material-icons.note {
  transform: rotate(90deg);
}

.tab_menu {
  display: none;
}
.mobile_menu {
  display: none;
}

.ct-badge {
  background: #ff5722;
  left: 30px;
  top: -1px;
}

.sales_badge {
  width: 30px;
  height: 30px;
  left: 25px;
  top: -8px;
}
@media screen and (max-width: 768px) {
  .add-new-btn-1 {
    position: absolute;
    top: 6px;
    right: -8px;
  }
  .dashboard-header {
    padding: 8px 0;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
    padding-bottom: 15px;
    padding-top: 10px;
  }
  .system_menu {
    display: none;
  }
  .md-button {
    font-size: 12px;
  }

  .tab_menu {
    display: block;
    background-color: #f7f7f7;
    position: fixed;
    left: 0px;
    width: 120px;
    border-radius: 6px;
  }
  .tab_menu span {
    color: #909094;
    font-size: 11px;
    margin: auto;
    line-height: 16px;
    width: 113px;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 50px;

    padding-left: 10px;
    padding-right: 10px;
  }
  /*.menu {
    height: 423px;
    overflow: hidden;
    overflow-y: scroll;
  }*/

  .tab_menu li {
    width: 100%;
    overflow: hidden;
    border-bottom: solid 1px #f3f3f3;
    position: relative;
  }

  .tab_menu li a {
    width: 100%;
    overflow: hidden;
    border-bottom: solid 1px #dedee2;
  }

  .box_left {
    display: none;
    float: left;
    width: 5px;
    height: 50px;
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
  }
  .first_li {
    margin-top: 0px !important;
    display: none;
  }

  .ct-badge {
    left: 93px;
    top: 1px;
  }
  .sales_badge {
    width: 32px;
    height: 32px;
    left: 86px;
    top: 0px;
  }
}

@media screen and (max-width: 600px) {
  .tab_menu {
    width: 85px;
  }
  .md-icon {
    margin-right: 0px !important;
  }
  .tab_menu span {
    width: 80px;
  }

  .admin-bx-txt-1 {
    font-size: 14px;
    padding: 15px 0px;
  }

  .admin-bx-txt-1 span {
    font-size: 14px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .add-new-btn-1 {
    position: absolute;
    top: -4px;
    right: -8px;
  }

  .wrap-all-the-things {
    width: 100%;
  }
  /*----new_style-----*/
  .tab_menu {
    display: none;
  }
  .wrapper_mob_menu {
    padding-left: 0px !important;
  }
  .wrap-all-the-things {
    padding-left: 0px;
  }
  .padding_mob {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }

  .dashboard-header {
    font-size: 11px;
    padding: 5px 0px 10px 0px !important;
    margin-bottom: 15px;
  }

  /*----new_style-----*/
  .md-flat {
    height: 36px !important;
  }
}

@media screen and (max-width: 300px) {
  .dashboard-header {
    font-size: 9px;
  }

  .admin-bx-txt-1 span {
    font-size: 12px;
    padding-top: 6px;
    padding-bottom: 5px;
  }

  .add-new-btn-1 {
    position: absolute;
    top: -6px;
    right: -10px;
  }

  .padding_mob {
    padding-right: 45px !important;
  }
}
</style>
