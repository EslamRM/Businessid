<template>
  <div class="BottomBarTp1">
    <div class="phone-viewport">
      <md-bottom-bar md-sync-route>
        <md-bottom-bar-item @click.native="toTop" to="/" exact md-label="Home">
          <div class="NavIcnTp1">
            <div class="NavIcnTp1Img mob_home"></div>
            <div class="NavIcnTp1Txt1">Home</div>
          </div>
        </md-bottom-bar-item>
        <md-bottom-bar-item
          to="/newsfeed"
          @click.native="toTop"
          exact
          md-label="Home"
        >
          <div class="NavIcnTp1">
            <div class="NavIcnTp1Img mob_feeds"></div>
            <div class="NavIcnTp1Txt1">Feeds</div>
          </div>
        </md-bottom-bar-item>
        <!-- <md-bottom-bar-item
          @click.native="toTop"
          to="/dsmarket"
          exact
          md-label="Home"
        >
          <div class="NavIcnTp1">
            <div class="NavIcnTp1Img mob_dsmarket "></div>
            <div class="NavIcnTp1Txt1">Market</div>
          </div>
        </md-bottom-bar-item> -->
        <md-bottom-bar-item
          @click.native="toTop"
          to="/ctshots"
          exact
          md-label="Home"
        >
          <div class="NavIcnTp1">
            <div class="NavIcnTp1Img mob_shots"></div>
            <div class="NavIcnTp1Txt1">Shots</div>
          </div>
        </md-bottom-bar-item>

        <md-bottom-bar-item to="/buyer/cart" exact md-label="Home">
          <div class="NavIcnTp1 ">
            <!---- <i class="material-icons">notifications_none</i>---->

            <div class="NavIcnTp1Img mob_noti"></div>

            <router-link to="/cart" exact>
              <span class="ct-badge md-position-top">
                {{ cart_count }}</span
              ></router-link
            >

            <div class="NavIcnTp1Txt1 text_noti">Cart</div>
          </div>
        </md-bottom-bar-item>

        <md-bottom-bar-item
          :to="{ path: getProfilePath() }"
          exact
          md-label="Home"
        >
          <div class="NavIcnTp1">
            <div class="NavIcnTp1Img mob_account"></div>
            <div class="NavIcnTp1Txt1">Account</div>
          </div>
        </md-bottom-bar-item>
      </md-bottom-bar>
    </div>
  </div>
</template>

<script>
export default {
  name: "mobileFooter",
  computed: {
    cart_count() {
      return this.$store.getters.getCartCount;
    }
  },
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },
    getProfilePath() {
      if (this.$store.state.user.retrievedTokenDetail) {
        const user = this.$store.state.user.retrievedTokenDetail.result;
        return `/profile/${this.slugify(user.trade_name_en)}/${user.userid}`;
      }
      return "/profile/name/000";
    },
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
.BottomBarTp1 {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  z-index: 999;
}
.NavIcnTp1 {
  text-align: center;
}
.NavIcnTp1Img {
  background-size: 30px;
  height: 30px;
}

/*-----------------*/
.mob_home {
  background-image: url(~@/assets/images/mobile/ios-home-outline.svg);
  background-repeat: no-repeat;
  background-position: center;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
}
.mob_home:hover {
  background-image: url(~@/assets/images/mobile/ios-home-outline-over.svg);
}
.router-link-exact-active .mob_home {
  background-image: url(~@/assets/images/mobile/ios-home-outline-over.svg);
}
/*-----------------*/

/*-----------------*/
.mob_feeds {
  background-image: url(~@/assets/images/mobile/ios-paper-outline.svg);
  background-repeat: no-repeat;
  background-position: center;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
}
.mob_feeds:hover {
  background-image: url(~@/assets/images/mobile/ios-paper-outline-over.svg);
}
.router-link-exact-active .mob_feeds {
  background-image: url(~@/assets/images/mobile/ios-paper-outline-over.svg);
}
/*-----------------*/

/*-----------------*/
.mob_dsmarket {
  background-image: url(~@/assets/images/mobile/icon_shopping.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 21px !important;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
}
.mob_dsmarket:hover {
  background-image: url(~@/assets/images/mobile/icon_shopping-over.svg);
}
.router-link-exact-active .mob_dsmarket {
  background-image: url(~@/assets/images/mobile/icon_shopping-over.svg);
}
/*-----------------*/

/*-----------------*/
.mob_shots {
  background-image: url(~@/assets/images/mobile/ios-film-outline.svg);
  background-repeat: no-repeat;
  background-position: center;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
}
.mob_shots:hover {
  background-image: url(~@/assets/images/mobile/ios-film-outline-over.svg);
}
.router-link-exact-active .mob_shots {
  background-image: url(~@/assets/images/mobile/ios-film-outline-over.svg);
}
/*-----------------*/

/*-----------------*/
.mob_noti {
  background-image: url(~@/assets/images/mobile/notifiaction.svg);
  background-repeat: no-repeat;
  background-position: center;
  -moz-transition: all 0.3s ease-in-out;
  background-size: 27px !important;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
}
.mob_noti:hover {
  background-image: url(~@/assets/images/mobile/notifiaction-over.svg);
}
.router-link-exact-active .mob_noti {
  background-image: url(~@/assets/images/mobile/notifiaction-over.svg);
}
/*-----------------*/

/*-----------------*/
.mob_account {
  background-image: url(~@/assets/images/mobile/ios-person-outline.svg);
  background-repeat: no-repeat;
  background-position: center;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
}
.mob_account:hover {
  background-image: url(~@/assets/images/mobile/ios-person-outline-over.svg);
}
.router-link-exact-active .mob_account {
  background-image: url(~@/assets/images/mobile/ios-person-outline-over.svg);
}
/*-----------------*/

.NavIcnTp1Txt1 {
  color: #000000;
  margin-top: 3px;
  font-size: 13px;
}
a.md-button.router-link-exact-active {
  border-top: 2px solid #ff5722;
  background: #efefef;
}
a.md-button {
  border-top: 2px solid transparent;
}
.md-bottom-bar.md-type-fixed .md-bottom-bar-item {
  min-width: 60px;
}

.NavIcnTp1 i {
  color: #0f0f0f;
  font-size: 26px;
}

.md-position-top {
  top: 1px;
  right: 13px;
  left: 0;
  margin: auto;
  background: #213a63;
}

@media screen and (max-width: 600px) {
  .md-bottom-bar.md-type-fixed .md-bottom-bar-item {
    max-width: 75px;
  }
  .NavIcnTp1Img {
    background-size: 26px;
    height: 26px;
    width: 26px;
  }

  .NavIcnTp1 i {
    font-size: 24px;
  }

  .md-position-top {
    top: 0px;
    right: 12px;
  }
  /*-------------new_style_six_tab_start---------------*/
  .NavIcnTp1Txt1 {
    display: none;
  }
  .mob_noti {
    background-size: 23px !important;
  }
  .mob_dsmarket {
    background-size: 17px !important;
  }
  /*-------------new_style_six_tab_start---------------*/

  .md-bottom-bar .md-bottom-bar-item {
    height: 40px;
  }

  .NavIcnTp1 {
    margin-left: 0px !important;
  }

  .mob_shots {
    background-size: 29px !important;
  }
  .mob_account {
    background-size: 30px !important;
  }
}

@media screen and (max-width: 420px) {
  .md-bottom-bar.md-type-fixed .md-bottom-bar-item {
    max-width: 84px;
  }
}
@media screen and (max-width: 420px) and (min-width: 400px) {
  .mob_noti {
    background-size: 24px !important;
  }
}
@media screen and (max-width: 320px) {
  .NavIcnTp1Img {
    background-size: 24px;
    height: 24px;
    width: 24px;
  }

  .NavIcnTp1Txt1 {
    font-size: 12px;
  }
  .NavIcnTp1 {
    margin-left: 0px;
  }

  .md-bottom-bar.md-type-fixed .md-bottom-bar-item {
    min-width: 30px !important;
  }

  .noti_img_mob {
    width: 15px;
    height: 18px;
    margin-top: 0px;
    display: block;
  }
  .md-button-content {
    margin-left: 0px !important;
  }

  .md-bottom-bar .md-bottom-bar-item {
    height: 35px;
  }

  .mob_dsmarket {
    background-size: 15px !important;
  }
  .mob_shots {
    background-size: 27px !important;
  }

  .mob_noti {
    background-size: 22px !important;
    margin-top: 1px !important;
  }
  .mob_account[data-v-3790d92b] {
    background-size: 28px !important;
  }
}
</style>
