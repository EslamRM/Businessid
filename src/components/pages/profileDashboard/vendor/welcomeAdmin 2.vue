<template>
  <div>
    <div class="bx-dis-fl-center mobile_welcome">
      <div class="mrg-0-auto txt-algn-cntr">
        <img src="@/assets/images/welcomeadmin.svg" alt />
        <!-- <h2>Manage Orders, Address, Payments, profile ...</h2> -->
        <h2>Coming Soon...</h2>
        <!-- <div class="txtMuted">What are you waiting for? Start Managing</div> -->
        <div class="txtMuted">Please Be With Us... Explore other tabs.</div>
      </div>
    </div>

    <!--------mobile_menu_start------>

    <div class="mobile_menu">
      <div class="">
        <ul class="menu">
          <li
            class="box_mob_menu"
            v-for="(link, id) in dashboard_menu"
            :key="id"
          >
            <router-link :to="link.path" active-class="sb-lnk-active">
              <!-- <div  class="icon_img"></div> -->
              <div class="ct-badge" v-if="link.badge_counts !== '0'">
                {{ link.badge_counts }}
              </div>
              <div class="iconn">
                <i class="material-icons f-s-19"> {{ link.icon }} </i>
              </div>
              <span>{{ link.label }}</span>
            </router-link>
          </li>

          <!-- <li class="box_mob_menu">
            <router-link
              to="/dashboard/vendor/manage-store/"
              active-class="sb-lnk-active"
              exact
            >
              <div class="iconn">
                <i class="material-icons f-s-19">store</i>
              </div>

              <span>Manage <br />Store</span>
            </router-link>
          </li>

          <li class="box_mob_menu">
            <router-link
              to="/dashboard/vendor/orders/"
              active-class="sb-lnk-active"
            >
              <div class="iconn">
                <i class="material-icons f-s-19">grading</i>
              </div>
              <div class="ct-badge">8</div>
              <span>Manage <br />Orders</span>
            </router-link>
          </li>

          <li class="box_mob_menu">
            <router-link
              to="/dashboard/vendor/purchase-invoice/"
              active-class="sb-lnk-active"
            >
              <div class="iconn">
                <i class="material-icons f-s-19">receipt</i>
              </div>
              <div class="ct-badge">5</div>
              <span
                >Purchase <br />
                Invoice</span
              >
            </router-link>
          </li>

          <li class="box_mob_menu">
            <router-link to="/#" exact-active-class="sb-lnk-active" exact>
              <div class="iconn">
                <i class="material-icons f-s-19">list_alt</i>
              </div>
              <span>Sales <br />Reports</span>
            </router-link>
          </li>

          <li class="box_mob_menu">
            <router-link
              to="/dashboard/buyer/orders/"
              active-class="sb-lnk-active"
            >
              <div class="iconn">
                <i class="material-icons f-s-19">shopping_basket</i>
              </div>
              <div class="ct-badge">5</div>
              <span>My <br />Orders</span>
            </router-link>
          </li>
          <li class="box_mob_menu">
            <router-link
              to="/dashboard/vendor/profileManagePayments"
              exact-active-class="sb-lnk-active"
              exact
            >
              <div class="iconn">
                <i class="material-icons f-s-19">payment</i>
              </div>
              <span>Manage <br />Payments</span>
            </router-link>
          </li>
          <li class="box_mob_menu">
            <router-link
              to="/dashboard/common/manage-profile/"
              active-class="sb-lnk-active"
            >
              <div class="iconn">
                <i class="material-icons f-s-19">person</i>
              </div>
              <span>Manage <br />profile</span>
            </router-link>
          </li>

          <li class="box_mob_menu">
            <router-link
              to="/dashboard/vendor/users/manage-users"
              active-class="sb-lnk-active"
              exact
            >
              <div class="icon_img"></div>
              <span>Manage <br />Users / Staffs</span>
            </router-link>
          </li>

          <li class="box_mob_menu">
            <router-link
              to="/dashboard/vendor/profileQutation"
              exact-active-class="sb-lnk-active"
              exact
            >
              <div class="iconn">
                <i class="material-icons f-s-19">note</i>
              </div>
              <span>Manage <br />Quotation</span>
            </router-link>
          </li>
          <li class="box_mob_menu">
            <router-link
              to="/vendor/shipping"
              exact-active-class="sb-lnk-active"
              exact
            >
              <div class="iconn">
                <i class="material-icons f-s-19">local_shipping</i>
              </div>
              <span>Manage <br />Shipping</span>
            </router-link>
          </li>
          <li class="box_mob_menu">
            <router-link to="/" exact-active-class="sb-lnk-active" exact>
              <div class="iconn">
                <i class="material-icons f-s-19">where_to_vote</i>
              </div>
              <span>Stock <br />Location</span>
            </router-link>
          </li>

          <li class="box_mob_menu">
            <router-link
              to="/dashboard/sales/registration-request"
              active-class="sb-lnk-active"
              exact
            >
              <div class="icon_img"></div>
              <div class="ct-badge sales_badge">Sales</div>
              <span>Registration <br />Request</span>
            </router-link>
          </li> -->
        </ul>
      </div>
    </div>

    <!--------mobile_menu_end------>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  name: "DashboardMobile",
  computed: {
    ...mapState({
      dashboard_menu: state => state.profile.dashboard_menu
    })
  },
};
</script>
<style scoped>
h2 {
  margin-top: 29px;
  line-height: 1.4;
}
.txtMuted {
  margin-top: 0.3em;
  color: #888;
  font-size: 15px;
}

.mobile_menu {
  display: none;
}

@media screen and (max-width: 600px) {
  .sales_badge {
    width: 32px;
    height: 32px;
    left: 60px;
    top: 3px !important;
  }

  .sb-lnk-active .ct-badge {
    display: none;
  }
  .ct-badge {
    background: #ff5722;
    right: 25px;
    top: 6px;
  }

  .mobile_welcome {
    display: none;
  }

  /*----new_style-----*/

  .mobile_menu {
    width: 100%;
  }
  .menu {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(98.8px, 0fr));
    row-gap: 1rem;
  }

  .box_mob_menu {
    width: 108px;
    height: 98px;
    background-color: #f7f7f7;
    border-radius: 5px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    position: relative;
  }

  .box_mob_menu span {
    color: #909094;
    font-size: 11px;
  }
  /*-----icon_img_style_start------*/

  .icon_img {
    background-image: url(~@/assets/images/mobile/registrations.png);
    background-repeat: no-repeat;
    background-size: 22px;
    background-position: center;
    width: 30px;
    height: 22px;
    margin: auto;
    margin-bottom: 3px;
    margin-top: -1px;
  }
  .iconn {
    color: rgb(33, 58, 99, 0.75);
    transition: all 400ms ease-in-out;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3px;
    margin-top: -3px;
  }
  /*-----icon_img_style_end------*/

  .mobile_menu {
    display: block;
  }
}

@media screen and (max-width: 420px) and (min-width: 400px) {
  .box_mob_menu {
    width: 121px;
    height: 103px;
  }

  .menu {
    gap: 2.4rem;
    row-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(107.5px, 0fr));
  }
}

@media screen and (max-width: 360px) {
  .box_mob_menu {
    width: 103px;
    height: 103px;
  }

  .menu {
    gap: 1.5rem;
    row-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(98.5px, 0fr));
  }
}

@media screen and (max-width: 320px) {
  .box_mob_menu {
    width: 90px;
    height: 90px;
  }

  .menu {
    gap: 1.06rem;
    row-gap: 0.97rem;
    grid-template-columns: repeat(auto-fill, minmax(89.5px, 0fr));
  }
}

@media screen and (max-width: 300px) {
  .box_mob_menu {
    width: 78px;
    height: 78px;
  }

  .menu {
    gap: 1.06rem;
    row-gap: 0.75rem;
    grid-template-columns: repeat(auto-fill, minmax(75.5px, 0fr));
  }

  .sales_badge {
    width: 32px;
    height: 32px;
    left: 44px;
    top: -5px !important;
  }

  .ct-badge {
    background: #ff5722;
    right: 15px;
    top: -3px;
  }
}

/*----new_style-----*/
</style>
