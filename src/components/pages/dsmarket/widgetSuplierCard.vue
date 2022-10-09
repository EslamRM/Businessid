<template>
  <div>
    <div class="widget-supplier-card" v-if="product">
      <div class="profile-content">
        <div class="head">
          <img
            v-if="product.postedBy.logo != ''"
            :src="product.postedBy.logo"
            alt="avatar-placeholder"
            class="avatharSmall"
          />
          <div v-else class="profile-bg">
            <span class="text">{{ getFirstChar(product.postedBy.name) }}</span>
          </div>
        </div>
        <div class="profile-inro">
          <router-link
            v-if="user_id && user_id == product.postedBy.id"
            :to="
              /profile/ +
                getSlug(product.postedBy.name) +
                '/' +
                product.postedBy.id
            "
          >
            <h3 v-if="product.postedBy.name.length < 16">
              {{ product.postedBy.name.substring(0, 16) + "..." }}
            </h3>
            <h3 v-else>
              {{ product.postedBy.name }}
            </h3>
          </router-link>

          <router-link
            v-else
            :to="
              /profiletimeline/ +
                getSlug(product.postedBy.name) +
                '/' +
                product.postedBy.id
            "
          >
            <h3 v-if="product.postedBy.name.length < 16">
              {{ product.postedBy.name }}
            </h3>
            <h3 v-else>
              {{ product.postedBy.name.substring(0, 16) + "..." }}
            </h3>
          </router-link>
        </div>
        <!---- <div class="company-type">
          {{ product.postedBy.user_type }}
        </div>---->

        <div class="star_value">
          <div class="box_starvalue">
            <star-rating
              :star-size="20"
              :increment="0.5"
              active-color="#ff5722"
            ></star-rating>

            <span class="ratings_profile">(32 Ratings)</span>
          </div>
        </div>

        <div
          class="follow_detail"
          v-if="user_id && user_id != product.postedBy.id"
        >
          <Follow
            :id="product.postedBy.id"
            :Isfollowing="product.postedBy.isfollow"
            :follow_count="product.postedBy.followers"
            :following_count="product.postedBy.following"
          />
        </div>
      </div>

      <div class="statWrap">
        <!-- <div class="statBox">
          followers
          <div class="flwCount">{{ product.postedBy.followers }}</div>
        </div> -->
        <div class="statBox">
          Rating
          <div class="rating">
            {{ product.postedBy.rating }}
          </div>
        </div>
      </div>

      <div class="country" v-if="product.country != null">
        <span>{{ product.postedBy.country.name }}</span>
      </div>
      <div class="followers"></div>

      <div class="company-card-integrated">
        <ul>
          <li class="foreMail">
            <span>E-mail :</span>{{ product.postedBy.email }}
          </li>
          <li v-if="product.postedBy.mobile != ''">
            <span>Mobile :</span>{{ product.postedBy.mobile }}
          </li>
          <li v-if="product.postedBy.phone != ''">
            <span>Phone :</span>{{ product.postedBy.phone }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Follow from "../profile/profileFollow";
import StarRating from "vue-star-rating";
export default {
  props: ["product"],
  components: { Follow, StarRating },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user_id: state => state.user.user_id
    }),
    getFirstChar() {
      return name => name.charAt(0);
    },
    getSlug() {
      return name => this.slugify(name);
    }
  },
  methods: {
    slugify(text, ampersand = "and") {
      const a = "àáäâèéëêìíïîòóöôùúüûñçßÿỳýœæŕśńṕẃǵǹḿǘẍźḧ";
      const b = "aaaaeeeeiiiioooouuuuncsyyyoarsnpwgnmuxzh";
      const p = new RegExp(a.split("").join("|"), "g");
      return text
        .toString()
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
        .replace(p, c => b.charAt(a.indexOf(c)))
        .replace(/&/g, `-${ampersand}-`)
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
  }
};
</script>
<style scoped>
.profile-inro,
.company-type {
  text-transform: capitalize;
}
.company-card-integrated {
  padding-top: 5px;
  font-size: 12px;
  text-align: center;
  width: 90%;
  margin: 0 auto;
  /*border-top: 1px solid #efefef;*/
  margin-top: 3px;
}
.company-card-integrated ul li {
  margin: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.company-card-integrated ul li span {
  font-size: 11px;
  color: rgba(0, 0, 0, 0.6);
}
.rating {
  color: rgb(95, 190, 77);
  /*color: #ff5722;*/
  text-align: center;
}
.flwCount {
  color: rgb(122, 148, 193);
}
.rating span {
  font-size: 12px;
}
.country {
  font-size: 12px;
  text-align: center;
  font-weight: 600;
}
.profile-inro {
  margin: 0px auto;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  padding-top: 4px;
}
.profile-bg {
  height: 23px;
}
.profile-bg span {
  border-radius: 50%;
  display: flex;
  height: 66px;
  width: 66px;
  object-fit: contain;
  margin: 0 auto;
  background-color: #ff5722;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -42px;
  font-size: 2.5em;
  color: #fff;
  font-weight: 600;
}

.company-avatar {
  display: block;
  /* box-shadow: 0px 5px 50px 0px #6c44fc, 0px 0px 0px 7px rgba(107, 74, 255, 0.5); */
  margin: 0px auto;
}
.widget-supplier-card .company-name {
  text-align: center;
  margin: 0px auto;
}
.widget-supplier-card {
  color: #262d3f;
  border-radius: 6px;
  height: 100%;
  position: relative;
  padding: 0;
  /* box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2); */
  border: 1px solid #eee;
  padding-bottom: 1em;
}
.vw-prf-lnk {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
}
.business-type {
  margin: 0;
  display: -webkit-box;
  max-height: 36px;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.3;
}
.gps-list {
  padding-left: 20px;
  list-style: disc;
  color: #999;
  border-bottom: 1px solid #f2f3f7;
  padding-bottom: 20px;
  padding-top: 20px;
}
.gps-lst-item {
  list-style-image: none;
  list-style: disc;
}
.gps-lst-item-lnk {
  color: #7e818a !important;
  line-height: 24px;
  font-size: 13px;
}
.company-type {
  text-align: center;
  font-size: 11px;
  padding: 1px 0px 5px 0px;
  color: #7e818a;
  line-height: 1.4;
}
.widget-supplier-card .company-name-container {
  margin-bottom: 15px;
}
.profile-content {
  width: 100%;
  max-width: calc(100vw - 10px);
  text-align: center;
  background-color: rgba(178, 187, 210, 0.13);
  border-radius: 0;
  padding-top: 42px;
  padding-bottom: 5px;
  border-bottom: solid 1px #efefef;
  min-height: 106px;
  position: relative;
  float: left;
  margin-bottom: 8px;
}
.profile-content .head {
  /* -webkit-box-shadow: inset 0 0 10px 0 rgba(0,0,0,.2), 0 0 2px 0 rgba(0,0,0,.1); */
  /* box-shadow: inset 0 0 10px 0 rgba(0,0,0,.2), 0 0 2px 0 rgba(0,0,0,.1); */
  border-radius: 50%;
  margin: -42px auto 5px;
  width: 66px;
  /* background-color: #eee; */
}
.avatharSmall {
  border-radius: 50%;
  object-fit: contain;
  margin-top: -38px;
  width: 66px;
  height: 66px;
  max-width: 100%;
  max-height: 100%;
  box-shadow: 1px 2px 10px -1px rgba(0, 0, 0, 0.11);
}
.statWrap {
  display: flex;
  flex-wrap: wrap;
  padding: 7px 0;
  line-height: 1.3;
  right: 5px;
  display: none;
}
.statBox {
  flex: 1;
  font-size: 13px;
  text-align: center;
  color: #535665;
  font-weight: 500;
}
.statValue {
  color: #2d2f43;
  font-size: 1rem;
}
.foreMail {
  width: calc(100% - 5px);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block !important;
}
.folllowUser {
  height: 28px;
  background-color: #213a63;
  color: #fff;
  min-width: 81px;
  padding: 0;
  margin: 0.3em 0;
  border-radius: 19px;
}
.folllowUser span {
  font-size: 12px;
}
.profile-inro h3 {
  color: #272c40 !important;
  margin-bottom: 5px;
}
.ratings_profile {
  color: #38ae04;
  float: left;
  margin-top: 5px;
  margin-left: 5px;
}

.vue-star-rating {
  width: 130px !important;
  float: left;
}
.follow_detail {
  padding-left: 14px !important;
}
.box_starvalue {
  width: fit-content;
  margin: auto;
}

.vue-star-rating-rating-text {
  margin-left: 7px;
  margin-top: 2px;
}

.star_value {
  float: left;
  margin-top: 2px;

  width: 100%;
  margin: 0;
  margin-bottom: 15px;
}

@media screen and (max-width: 768px) {
  .profile-bg span {
    width: 55px;
    height: 55px;
    top: -32px;
  }
  .profile-content {
    margin-bottom: 4px;
  }
  .follow_detail {
    margin-top: 0px;
    margin-right: 3px;
    float: right;
    margin-bottom: 0px;
  }

  .star_value {
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 768px) {
  .profile-content {
    margin-bottom: 0px;
  }
  .profile-inro .wrapAll {
    position: absolute;
    right: 1% !important;
    top: 0px !important;
    margin-top: -8px !important;
  }

  .ratings_profile {
    color: #38ae04;
    margin-top: 6px;
    margin-left: 0px;
    font-size: 11px !important;
  }
  .star_value {
    float: left;
    margin-top: 2px;
  }
  .follow_detail {
    margin-top: -30px !important;
  }

  .profile-inro h3 {
    font-weight: 500;
    margin-bottom: 0px;
    width: 203px;
  }
  .profile-bg span {
    height: 30px;
    width: 30px;
    top: 0;
    font-size: 1.5em;
  }

  .widget-supplier-card {
    margin-top: 10px;
    overflow: hidden;
    padding-bottom: 0px;
    border: none;
    box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  }

  .profile-content .head {
    border-radius: 100%;
    margin: 0px;
    width: 30px;
    margin-top: 0px;
    float: left;
    height: 30px;
  }

  .avatharSmall {
    border-radius: 100%;
    -o-object-fit: contain;
    object-fit: fill;
    margin-top: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }

  .profile-inro {
    text-align: left;
    padding-left: 10px;
    float: left;
    font-size: 10px;
    line-height: 1.2;
    padding-top: 0px;
    font-weight: 500;
  }

  .profile-content {
    overflow: hidden;
    padding-left: 9px;
    margin-top: 0px;
    padding-bottom: 5px;
    padding-top: 9px;
    border-radius: 5px;
    width: 100%;
    float: left;
    background-color: #fff;
  }
  .followers {
    width: 100%;
    float: left;
  }
  .company-type {
    text-align: center;
    width: 300px;
    float: left;
    text-align: left;
    margin-left: 12px;
  }

  .statWrap {
    display: block;
    float: left;
    margin-top: 2px;
    position: absolute;
    right: 4px;
  }

  .company-card-integrated {
    width: 100%;
    float: left;
  }
  .rating,
  .statBox {
    float: left;
    width: fit-content;
    margin-left: 7px;
    margin-right: 4px;
    margin-top: 0px;
    font-size: 11px;
    display: none;
  }
  .company-card-integrated ul li {
    text-align: left;
    margin-left: 15px;
    margin-bottom: 0;
    margin-top: 8px;
  }
  .company-card-integrated ul li {
    display: block;
  }
  .company-card-integrated ul li span {
    font-size: 13px;
    margin-right: 7px;
  }

  .company-card-integrated {
    display: none;
  }
  .follow_detail {
    margin-top: 0px;
    margin-right: 3px;
    float: right;
    margin-bottom: 0px;
  }

  .profile-content {
    min-height: 48px !important;
    height: 48px !important;
  }

  .star_value {
    float: right;
    margin-top: 2px;
    margin-bottom: 5px;
    width: 260px;
    position: relative;
  }
}

@media screen and (max-width: 600px) {
  .star_value {
    float: left;
  }

  .ratings_profile {
    color: #38ae04;
    margin-top: 2px;
    margin-left: 30px;
    font-size: 11px !important;
  }
}

@media screen and (max-width: 420px) and (min-width: 400px) {
  .follow_detail {
    margin-bottom: 82px;
    margin-top: -127px;
  }
  .company-type {
    width: 320px;
  }

  .profile-content {
    min-height: 49px !important;
    height: 49px !important;
  }
}

@media screen and (max-width: 360px) {
  .company-type {
    width: 290px;
  }
}

@media screen and (max-width: 300px) {
  .company-type {
    width: 195px;
  }
  .ratings_profile {
    margin-left: 40px;
  }
  .follow_detail {
    margin-top: -12px !important;
    height: 48px;
  }
  .star_value {
    width: 217px;
  }
  .profile-content {
    min-height: 49px !important;
    position: relative;
    overflow: hidden;
    height: auto !important;
  }
}
</style>
