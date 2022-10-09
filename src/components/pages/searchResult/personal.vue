<template>
  <div v-if="results.length !== 0 || users.length !== 0">
    <router-view></router-view>
    <div class="product-row mt-4">
      <div>
        <h3 class="mt-4" v-if="results.length !== 0">
          Items For {{ keyword }}:
        </h3>
        <carousel
          style="width: 100%"
          :perPage="6"
          :autoplay="false"
          :autoplayHoverPause="true"
          :paginationSize="0"
          :paginationEnabled="false"
          paginationActiveColor="#bf1d2e"
          paginationColor="#213a63"
          easing="linear"
          :loop="true"
          :navigationEnabled="true"
          navigationNextLabel="<div class='md-button md-theme-default arrow1 smallCarousel'><i class='material-icons'>keyboard_arrow_right</i></div>"
          navigationPrevLabel="<div class='md-button md-theme-default arrow2 smallCarousel prev'><i class='material-icons'>keyboard_arrow_left</i></div>"
        >
          <slide
            class="offer-item"
            v-for="(result, index) in results"
            :key="index + 33"
          >
            <div class="grd-box-1-sldr">
              <div class="bravo-normal-offer" style="padding: 15px">
                <div class="bravo-offer-image">
                  <div class="place"></div>
                  <a
                    @click="Getroute(result)"
                    class="product-link"
                    style="cursor:pointer;"
                  >
                    <div class="offer-image">
                      <img
                        v-if="result.file"
                        class="inner-img smallCarousel"
                        :src="result.file"
                        alt="../../assets/images/pr1.png"
                      />
                      <img
                        v-else
                        class="inner-img smallCarousel"
                        src="../../../assets/images/appsub2.jpg"
                        alt="../../assets/images/pr1.png"
                      />
                    </div>
                  </a>
                </div>
                <div class="main-section text-center">
                  <div class="bravo-offer-price text-center">
                    {{ result.name.slice(0, 25) }}
                  </div>

                  <div class="bravo-offer-moq text-center">
                    <span class="bld-txt-1" v-if="result.brand.length > 1">{{
                      result.brand
                    }}</span>
                    <span class="bld-txt-1" v-else>{{ result.type }}</span>
                  </div>
                  <div class="bravo-offer-moq text-center">
                    <span class="bld-txt-1">{{ result.currency }}</span>
                    <i class="rateIn">{{ result.unitprice }}</i>
                  </div>
                  <div class="btnWrap">
                    <md-button class="md-accent btnRedOutline md-theme-default">
                      <router-link
                        :to="{
                          name: 'product-details',
                          params: {
                            product: slugName(result.name),
                            productId: encodeProductId(result.pk_product_id)
                          }
                        }"
                        >See Details</router-link
                      ></md-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
    <div
      class="results mt-5"
      v-for="(result, index) in results"
      :key="result.file"
      v-if="result.usertype == 'personal'"
    >
      <div class="all-content">
        <a @click="Getroute(result)" style="cursor:pointer;">
          <div class="img-holder">
            <div class="profile-image-wrapper">
              <span v-if="result.userlogo != ''">
                <div class="profile-bg box_profile bg_color">
                  <img :src="result.userlogo" />
                </div>
              </span>
              <span v-else>
                <div class="profile-text">
                  <span class="text">
                    {{ getFirstChar(result.username) }}
                  </span>
                </div>
              </span>
            </div>
            <div class="small" style="color:tomato;">
              {{ result.username }} {{ result.usertype }}
            </div>
          </div>
          <h2 class="header">{{ result.name }}</h2>
        </a>
        <div class="content">
          <div class="offer-image search-image">
            <p>{{ lettersOnly(result.information.slice(0, 200)) }} ...</p>
          </div>
        </div>
        <div class="small">{{ formatDate(result.added_date) }}</div>
      </div>
    </div>
    <div
      class="results mt-5"
      v-for="(user, index) in users"
      :key="user.userid"
      v-if="user && user.usertype == 'personal'"
    >
      <div class="all-content">
        <router-link :to="'/profilestore/businessidnet/' + user.userid">
          <div class="img-holder">
            <div class="profile-image-wrapper">
              <span v-if="user.userlogo != ''">
                <div class="profile-bg box_profile bg_color">
                  <img :src="user.userlogo" />
                </div>
              </span>
              <span v-else>
                <div class="profile-text">
                  <span class="text">
                    {{ getFirstChar(user.username) }}
                  </span>
                </div>
              </span>
            </div>
            <div class="small" style="color:tomato;">
              {{ user.username }} {{ user.usertype }}
            </div>
          </div>
          <h2 class="header">
            {{ user.username }}
          </h2>
        </router-link>
        <div class="content">
          <div class="offer-image search-image">
            <p v-if="user.userdescription">
              {{ lettersOnly(user.userdescription.slice(0, 200)) }} ...
            </p>
            <p v-if="!user.userdescription && user.username">
              no user description
            </p>
          </div>
        </div>
        <div class="small" v-if="user.added_date">
          {{ formatDate(user.added_date) }}
        </div>
      </div>
    </div>
  </div>
  <div v-else class="notFound">
    No Results Found
  </div>
</template>
<script>
export default {
  props: ["results", "keyword", "users"],
  computed: {
    slugName() {
      return name => this.$helpers.slugify(name);
    },
    id() {
      return this.$route.params.id;
    },
    encodeProductId() {
      return productId => btoa(productId);
    },
    getFirstChar() {
      return name => name.charAt(0);
    }
  },
  methods: {
    Getroute(result) {
      if (result.type == "item") {
        this.$router.push(
          "/product-details/" +
            this.slugName(result.name) +
            "/" +
            this.encodeProductId(result.pk_product_id)
        );
      } else if (result.type == "property") {
        this.$router.push(
          "/property-detail/" +
            this.slugName(result.name) +
            "/" +
            this.encodeProductId(result.pk_product_id)
        );
      } else {
        this.$router.push(
          "/auto-details/" +
            this.slugName(result.name) +
            "/" +
            this.encodeProductId(result.pk_product_id)
        );
      }
    },
    formatDate(date) {
      return date.replaceAll("-", "/");
    },
    lettersOnly(str) {
      return str.replace(/[^a-zA-Z]/g, " ");
    }
  }
};
</script>
<style lang="">
.img-holder {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.profile-image-wrapper {
  height: 25px;
  width: 25px;
  margin-right: 7px;
}
.profile-text {
  background-color: #ff5722;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile-text .text {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.notFound {
  display: flex;
  font-size: 24px;
  color: tomato;
  justify-content: center;
  align-items: center;
}
.offer-item {
  width: 100%;
  margin: 6px;
  background: #fff;
  -webkit-box-shadow: 0 2px 8px 0 rgb(0 0 0 / 5%);
  box-shadow: 3px 8px 8px 3px rgb(0 0 0 / 5%);
  border-radius: 6px;
}
.company-results img {
  display: inline-block;
  width: 60px;
  border-radius: 50% !important;
}
.company-results h2 {
  display: inline-block;
}
.results h2 {
  color: darkblue;
  margin: 10px 0;
  font-size: 18px !important;
}
.results h2:hover {
  text-decoration: underline !important;
}
.small {
  color: grey;
  font-size: 12px;
}
.search-image {
  display: flex;
  /* height: 150px;mt-5 */
}
.search-image p {
  display: flex;
  width: 50%;
  line-height: 25px;
}
@media only screen and (max-width: 768px) {
  .head {
    width: 100%;
  }
  .head .search {
    height: 35px;
  }
  .results h2 {
    font-size: 14px !important;
  }
  .search-image p {
    width: 100%;
  }
}
@media only screen and (max-width: 400px) {
  .results h2 {
    font-size: 12px !important;
  }
  .result-image {
    width: 40px !important;
  }
  strong {
    font-size: 9px !important;
  }
  .content2 {
    margin-left: 65px !important;
  }
  small {
    margin-top: 0 !important;
  }
  .notFound {
    font-size: 16px;
    margin-top: 30px;
  }
}
@media only screen and (max-width: 360px) {
  .content2 {
    margin-left: 16px !important;
    margin-top: 0 !important;
  }
  .result-image {
    display: none !important;
  }
  .d-block {
    display: none !important;
  }
}
</style>
