<template>
  <div>
    <div class="full-wrap notification">
      <div class="container pzero">
        <div class="head">Notifications</div>
        <div class="full-wrap">
          <div class="col-sm-12 wrapper_notification">
            <div class="col-sm-12 list_notification active_noti">
              <div class="wrapper_profile">
                <img
                  :src="base_url_api + 'assets/uploads/05Oct2020194212_pJPMlaZQS8.blob'"
                />
                <i class="material-icons reaction-icn-1">chat_bubble_outline</i>
              </div>

              <div class="box_content_noti">
                <div class="name_profile">Vivek Madathil</div>
                <span>Commented your post </span>
                <div class="name_post">"Laxmi Vilas Palace"</div>
                <div class="col-sm-12 p-0 time_notification">6 hours ago</div>
              </div>
            </div>

            <div class="col-sm-12 list_notification active_noti">
              <div class="wrapper_profile">
                <img
                  :src="base_url_api + 'assets/uploads/05Oct2020194212_pJPMlaZQS8.blob'"
                />
                <i class="material-icons reaction-icn-1">email</i>
              </div>

              <div class="box_content_noti">
                <span>Received New Message from </span>
                <div class="name_profile">Ishan</div>
                <div class="col-sm-12 p-0 message_notification">
                  "Hi,How are you"
                </div>
                <div class="col-sm-12 p-0 time_notification">6 hours ago</div>
              </div>
            </div>

            <div class="col-sm-12 list_notification">
              <div class="wrapper_profile">
                <img
                  :src="base_url_api + 'assets/uploads/05Oct2020194212_pJPMlaZQS8.blob'"
                />
                <i class="material-icons reaction-icn-1">shopping_cart</i>
              </div>

              <div class="box_content_noti">
                <span>Received New Ordered from </span>
                <div class="name_profile">Abhishek Patel</div>
                <div class="col-sm-12 p-0 fl">
                  <div class="time_notification">6 hours ago</div>
                  <div class="border_noti"></div>
                  <div class="vieworder_noti">View Orders</div>
                </div>
              </div>
            </div>

            <div class="col-sm-12 list_notification">
              <div class="wrapper_profile">
                <img
                  :src="base_url_api + 'assets/uploads/05Oct2020194212_pJPMlaZQS8.blob'"
                />
                <i class="material-icons f-s-19 note">note</i>
              </div>

              <div class="box_content_noti">
                <span>Received Quotation from </span>
                <div class="name_profile ml-2">Ishan</div>
                <div class="col-sm-12 p-0 time_notification">8 hours ago</div>
              </div>
            </div>
            <div class="col-sm-12 list_notification">
              <div class="wrapper_profile">
                <img
                  :src="base_url_api + 'assets/uploads/05Oct2020194212_pJPMlaZQS8.blob'"
                />
                <i class="material-icons reaction-icn-1">favorite</i>
              </div>

              <div class="box_content_noti">
                <div class="name_profile">Vivek Madathil</div>
                <span>Likes your Post </span>
                <div class="name_post">"Laxmi Vilas Palace"</div>
                <div class="col-sm-12 p-0 time_notification">6 hours ago</div>
              </div>
            </div>
            <div
              class="col-sm-12 list_notification"
              :class="{ active_noti: notif.status !== '2' }"
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
                  v-if="notif.action === 'like' || notif.action === 'comment'"
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
                  v-if="notif.action === 'like' || notif.action === 'comment'"
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
            </div>
            <div class="col-sm-12 list_notification">
              <div class="wrapper_profile">
                <img
                  :src="base_url_api + 'assets/uploads/05Oct2020194212_pJPMlaZQS8.blob'"
                />
                <i class="material-icons reaction-icn-1">favorite</i>
              </div>

              <div class="box_content_noti">
                <div class="name_profile">Vivek Madathil</div>
                <span>Likes your Post </span>
                <div class="name_post">"Laxmi Vilas Palace"</div>
                <div class="col-sm-12 p-0 time_notification">6 hours ago</div>
              </div>
            </div>
            <div class="col-sm-12 list_notification">
              <div class="wrapper_profile">
                <img
                  :src="base_url_api + 'assets/uploads/05Oct2020194212_pJPMlaZQS8.blob'"
                />
                <i class="material-icons reaction-icn-1">favorite</i>
              </div>

              <div class="box_content_noti">
                <div class="name_profile">Vivek Madathil</div>
                <span>Likes your Post </span>
                <div class="name_post">"Laxmi Vilas Palace"</div>
                <div class="col-sm-12 p-0 time_notification">6 hours ago</div>
              </div>
            </div>
            <div class="col-sm-12 list_notification">
              <div class="wrapper_profile">
                <img
                  :src="base_url_api + 'assets/uploads/05Oct2020194212_pJPMlaZQS8.blob'"
                />
                <i class="material-icons reaction-icn-1">favorite</i>
              </div>

              <div class="box_content_noti">
                <div class="name_profile">Vivek Madathil</div>
                <span>Likes your Post </span>
                <div class="name_post">"Laxmi Vilas Palace"</div>
                <div class="col-sm-12 p-0 time_notification">6 hours ago</div>
              </div>
            </div>

            <div class="col-sm-12 list_notification border_none">
              <div class="wrapper_profile">
                <img
                  :src="base_url_api + 'assets/uploads/05Oct2020194212_pJPMlaZQS8.blob'"
                />
                <i class="material-icons reaction-icn-1">favorite</i>
              </div>

              <div class="box_content_noti">
                <div class="name_profile">Vivek Madathil</div>
                <span>Likes your Post </span>
                <div class="name_post">"Laxmi Vilas Palace"</div>
                <div class="col-sm-12 p-0 time_notification">6 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "notification",
  data () {
    return {
      base_url_api: process.env.BASE_URL,
      notifications: null
    }
  }


  ,
  created () {
    this.notificationListing()
  },
  methods: {
    async notificationListing () {
      const response = await axios.post("/notifications", {
        page: 1
      });
      const { success, result, badge_counts } = await response.data
      if (!success) return
      this.notifications = result
      console.log(response);
    },
    async readNotification ({ url, id, isLink = false }) {
      const response = await axios.post("/read-notification", {
        id
      });
      const { success, message } = await response.data
      if (success) {
        if (isLink) {
          window.open(url)
          return
        }
        this.$router.push(url)
        return
      }
      console.log(response);
    }
  }
}
</script>

<style lang="css" scoped>
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
  font-size: 22px;
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
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  padding: 25px;
  margin-bottom: 20px;
  margin-top: 25px;
  float: left;
}

.list_notification {
  padding: 12px 10px;
  border-bottom: solid 1px #e0e0e0;
  float: left;
  display: flex;
  align-items: center;
  -moz-transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}
.list_notification:hover {
  background-color: #f2f2f2;
}
.active_noti {
  background-color: #f2f2f2;
}

.list_notification span {
  color: #65676b;
  float: left;
  margin-left: 4px;
  font-weight: 400;
  font-size: 13px;
}

.wrapper_profile {
  height: 40px;
  width: 40px;
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
  font-size: 13px;
  margin-left: 4px;
  cursor: pointer;
}

.name_post {
  float: left;
  color: #050505;
  font-weight: 600;
  font-size: 13px;
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
