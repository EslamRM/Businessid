<template>
  <div>
    <div class="full-wrap notification">
      <div class="container pzero">
        <div class="head text-center">Notifications</div>
        <div class="full-wrap">
          <div
            class="col-sm-12 col-md-6 wrapper_notification"
            v-infinite-scroll="loadPendingOrders"
            :infinite-scroll-listen-for-event="true"
            infinite-scroll-immediate-check="false"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="0"
          >
            <div
              class="col-sm-12 list_notification"
              :class="{
                active_noti: notif.status !== '2',
                border_none: id === notifications.length - 1,
              }"
              v-for="(notif, id) in notifications"
              :key="id"
            >
              <div class="wrapper_profile">
                <img v-if="notif.from.logo" :src="notif.from.logo" />
                <div v-else class="profile-default-text">
                  <span class="text">{{
                    notif.from.trade_name_en.substring(0, 1)
                  }}</span>
                </div>
                <i
                  class="material-icons reaction-icn-1"
                  v-if="notif.action === 'like'"
                  >favorite</i
                >
                <i
                  class="material-icons reaction-icn-1"
                  v-if="notif.action === 'comment'"
                  >chat_bubble_outline</i
                >
                <i
                  class="material-icons reaction-icn-1"
                  v-if="notif.action === 'order'"
                  >shopping_cart</i
                >
              </div>

              <div class="box_content_noti">
                <router-link
                  v-if="
                    (notif.action === 'like' || notif.action === 'comment') &&
                    notif.post.title
                  "
                  :to="
                    /profiletimeline/ +
                    $helpers.slugify(notif.from.trade_name_en) +
                    '/' +
                    notif.from.id
                  "
                >
                  <div class="name_profile">
                    {{ notif.from.trade_name_en }}
                  </div>
                </router-link>
                <span v-if="notif.action === 'like'">Likes your Post </span>
                <span v-if="notif.action === 'comment'"
                  >Commented your post</span
                >
                <span v-if="notif.action === 'order'"
                  >Received New Ordered from</span
                >
                <div
                  class="name_post"
                  v-if="
                    (notif.action === 'like' || notif.action === 'comment') &&
                    notif.post.title
                  "
                >
                  <a
                    v-if="notif.post.title.substring(0, 4) === 'http'"
                    @click="
                      readNotification({
                        url: notif.post.title,
                        id: notif.id,
                        isLink: true,
                      })
                    "
                    >"{{ notif.post.title.substring(0, 26) }}"</a
                  >
                  <div
                    v-else
                    @click="
                      readNotification({
                        url: `${notif.path}/${notif.post.pk_post_id}`,
                        id: notif.id,
                        isLink: false,
                      })
                    "
                  >
                    "{{ notif.post.title.substring(0, 26) }}
                  </div>
                </div>

                <router-link
                  v-if="notif.action === 'order'"
                  :to="
                    /profiletimeline/ +
                    $helpers.slugify(notif.from.trade_name_en) +
                    '/' +
                    notif.from.id
                  "
                >
                  <div class="name_post">"{{ notif.from.trade_name_en }}"</div>
                </router-link>
                <div class="col-sm-12 p-0 fl">
                  <div class="p-0 time_notification">
                    {{ notif.created_at }} ago
                  </div>
                  <div
                    class="border_noti"
                    v-if="notif.action === 'order'"
                  ></div>
                  <div
                    class="vieworder_noti"
                    @click="
                      readNotification({
                        url: `/dashboard/vendor/orders/details/${notif.action_id}`,
                        id: notif.id,
                      })
                    "
                    v-if="notif.action === 'order'"
                  >
                    View Orders
                  </div>
                </div>
              </div>
              <!--
              <div class="delete" @click="deleteNotif(notif.id, id)">
                <i class="material-icons"> delete_forever </i>
              </div> -->
            </div>
            <div
              class="col-sm-12 list_notification notifLoader"
              v-if="notifLoader"
            >
              <div><div class="loading-1 loading"></div></div>
            </div>
          </div>
        </div>
        <!-- <div class="md-layout md-alignment-center-center loader">
          <div class="md-layout-item md-size-33">
            <center>
              <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
              </div>
            </center>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "notification",
  data () {
    return {
      page: 0,
      notifLoader: false,
      busy: false,
      notifications: [],
    };
  },
  created () {
    this.loadPendingOrders()
  },
  methods: {
    async loadPendingOrders () {
      if (this.busy) return;
      this.notifLoader = true;
      this.busy = true;
      this.page++;

      // const data = this.form;
      console.log("page", this.page);
      console.log("page hit");
      const response = await axios.post("/notifications", {
        page: this.page
      })
      const { success, message, result, notification_badge_counts } = await response.data;
      if (!success) {
        this.notifLoader = false;
        this.busy = true;
        return
      } else {
        this.notifications = await [...this.notifications, ...result]
        await this.$store.dispatch("setNotificationCount", notification_badge_counts)
        this.notifLoader = false;
        this.busy = false;
      }
    },
    refresh () {
      this.busy = false;
      this.page = 0;
      this.notifications = [];
      this.loadPendingOrders();
    },
    async readNotification ({ url, id, isLink = false }) {
      const response = await axios.post("/read-notification", {
        id
      });
      const { success, message } = await response.data;
      if (success) {
        if (isLink) {
          window.open(url);
          this.refresh()
          return;
        }
        this.$router.push(url);
        return;
      }
      console.log(response);
    },
    async deleteNotif (id, index) {
      try {
        const response = await axios.post("/remove-notification", {
          id
        });
        const { success, message } = await response.data;
        if (success) {
          console.log("Notification Deleted :( ")
          this.notifications.splice(index, 1);
          return
        }
        console.log(response);
      } catch (error) {

      }
    }
  }
};
</script>

<style lang="css" scoped>
/* Delete-Button */
.delete {
  color: grey;
  cursor: pointer;
}

.delete:hover {
  color: #ff5722;
}

/* Notif Loader */
.notifLoader {
  justify-content: center;
}

.loading-1 {
  border: solid 1px #c8d2e0;
  padding: 7px 13px;
  border-radius: 6px;
  color: #ff5722;
  width: 50px;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-1:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  border: 3px solid #ff5722;
  width: 18px;
  height: 18px;
  border-left: 3px solid transparent;
  border-bottom: 3px solid transparent;
  animation: loading1 1s ease infinite;
  z-index: 10;
}
.loading-1:before {
  z-index: 5;
  content: "";
  position: absolute;
  border-radius: 50%;
  border: 3px dashed #fff;
  width: 18px;
  height: 18px;
  border-left: 3px solid transparent;
  border-bottom: 3px solid transparent;
  animation: loading1 1s linear infinite;
}

@keyframes loading1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* loading */
/* Loader CSS */
.loader {
  margin-top: 200px;
}
.spinner {
  width: 80px;
  height: 80px;

  position: relative;
  margin: 100px auto;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ff5722;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
/* Loader Css End */
.profile-default-text .text {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.notification {
  margin-top: 30px;
  overflow: hidden;
}
.head {
  font-size: 26px;
  font-weight: 600;
}
.txt-head {
  font-size: 13px;
  font-weight: 600;
  color: #888;
  margin-right: 0.5em;
}
.filter-chip {
  margin-top: 2em;
}
.chips {
  margin-right: 2px;
  float: left;
  margin-bottom: 2px;
}

.wrapper_notification {
  margin: 0 auto;
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  padding: 25px;
  margin-bottom: 20px;
  margin-top: 25px;
  /* float: left; */
}

.list_notification {
  padding: 12px 10px;
  border-bottom: solid 1px #e0e0e0;
  /* float: left; */
  display: flex;
  align-items: center;
  -moz-transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
.list_notification:hover {
  background-color: #f2f2f2;
}
/* .active_noti {
  background-color: #f2f2f2;
} */

.list_notification span {
  color: #65676b;
  float: left;
  margin-left: 4px;
  font-weight: 400;
  font-size: 15px;
}

.wrapper_profile {
  height: 45px;
  width: 45px;
  position: relative;
  float: left;
  cursor: pointer;
}

.wrapper_profile img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: solid 1px #e0e0e0;
}

.wrapper_profile i {
  color: #fff;
  float: left;
  font-weight: 500;
  font-size: 12px !important;
  position: absolute;
  right: -4px;
  bottom: -2px;
  padding: 5px;
  background: #ff5722;
  border-radius: 100%;
  margin: 0 !important;
}

.quotation_icon {
  width: 24px;
  position: absolute;
  right: -4px;
  bottom: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff5722;
  border-radius: 100%;

  height: 24px;
}

.quotation_icon img {
  width: 12px;
  height: 13px;
  border: none;
}

.name_profile {
  float: left;
  color: #050505;
  font-weight: 600;
  font-size: 15px;
  margin-left: 4px;
  cursor: pointer;
}

.name_post {
  float: left;
  color: #050505;
  font-weight: 600;
  font-size: 15px;
  margin-left: 4px;
  cursor: pointer;
}

.time_notification {
  float: left;
  color: #65676b;
  font-weight: 400;
  font-size: 11px;
  margin: 5px 0px 0px 4px;
}

.box_content_noti {
  float: left;
  margin-left: 11px;
  width: 100%;
}
.message_notification {
  float: left;
  color: #65676b;
  font-weight: 600;
  font-size: 12px;
  margin: 4px 0px 0px 4px;
}
.border_noti {
  float: left;
  width: 1px;
  height: 10px;
  background-color: #e0e0e0;
  margin: 5px 0px 0px 5px;
}
.vieworder_noti {
  float: left;
  color: #65676b;
  font-weight: 600;
  font-size: 11px;
  cursor: pointer;
  margin: 5px 0px 0px 5px;
}

.border_none {
  border: none;
}

.fl {
  float: left;
}
.material-icons.note {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

@media only screen and (max-width: 768px) {
  .head {
    font-size: 18px;
  }

  .wrapper_scroll {
    overflow-x: auto;
    white-space: nowrap;
    max-width: 640px;
    padding: 10px 0px;
  }

  .chips {
    display: inline-block;
    float: none;
  }
  .txt-head {
    width: 186px;
  }

  .head {
    font-size: 18px;
  }

  .filter-chip {
    margin-top: 1em;
  }

  .notification {
    margin-top: 25px;
  }

  .wrapper_notification {
    padding: 20px;
  }

  .wrapper_notification {
    margin-top: 20px;
  }
  .box_content_noti {
    float: right;
    margin-left: 15px;
    width: 90%;
  }
}

@media only screen and (max-width: 600px) {
  .wrapper_scroll {
    max-width: 260px;
  }
  .notification {
    margin-top: 25px;
  }

  .head {
    font-size: 14px;
    padding-left: 15px;
  }
  .filter-chip {
    margin-top: 5px;
  }

  .txt-head {
    width: 60px;
  }

  .wrapper_notification {
    padding: 10px;
  }

  .box_content_noti {
    width: 80%;
  }

  .list_notification {
    padding: 10px 5px;
  }

  .name_profile,
  .message_notification,
  .time_notification,
  .list_notification span {
    margin-left: 4px;
  }
  .box_content_noti {
    margin-left: 10px;
  }
  .list_notification span,
  .name_profile,
  .name_post {
    font-size: 12px;
  }
  .list_notification span {
    margin-bottom: 4px;
  }

  .wrapper_notification {
    margin-top: 15px;
    border-radius: 0px;
  }
  .notification {
    margin-top: 20px;
  }

  .message_notification {
    margin-top: 0px;
  }
  .pzero {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}

@media screen and (max-width: 420px) and (min-width: 400px) {
  .wrapper_scroll {
    max-width: 370px;
    margin-left: 10px;
  }

  .txt-head {
    width: 303px;
  }
}
@media only screen and (max-width: 360px) {
  .name_profile {
    margin-bottom: 4px;
  }
}

@media only screen and (max-width: 320px) {
  .wrapper_scroll {
    max-width: 180px;
  }
  .notification-list li .md-card {
    box-shadow: none;
    width: 100%;
  }
  .notification-list li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #fff;
    position: relative;
    padding-left: 4.4em;
    border-bottom: 1px solid #eee;
  }
  .action-date {
    display: inline-flex;
    align-items: center;
    width: 265px;
    font-size: 12px;
    color: #888;
  }
  .md-subhead {
    font-size: 13px;
  }
  .pzero {
    padding-left: 0px !important;
    padding-right: 40px !important;
  }

  .wrapper_notification {
    width: 100%;
  }
}
</style>
