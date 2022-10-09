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
            :key="index + 11"
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
                        :src="result.variations.colors[0].files[0]"
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
    >
      <div class="all-content">
        <div class="small">{{ result.username }}</div>
        <a @click="Getroute(result)" style="cursor:pointer;">
          <h2 class="header">{{ result.name }}</h2>
        </a>
        <div class="content">
          <div class="offer-image search-image">
            <p>{{ lettersOnly(result.information.slice(0, 200)) }} ...</p>
            <img
              @click="getImg(result), (showImg = !showImg)"
              style="cursor:pointer;"
              v-if="result.file"
              class="inner-img smallCarousel all-image"
              :src="result.file"
            />
            <img
              v-else
              @click="getImg(result), (showImg = !showImg)"
              style="cursor:pointer;"
              class="inner-img smallCarousel all-image"
              :src="result.variations.colors[0].files[0]"
            />
          </div>
        </div>
        <div class="small">{{ formatDate(result.added_date) }}</div>
      </div>
    </div>
    <div
      class="results mt-5"
      v-for="(user, index) in users"
      :key="user.userid"
      v-if="user"
    >
      <div class="all-content">
        <div class="small">{{ user.usertype }}</div>
        <router-link :to="'/profilestore/businessidnet/' + user.userid">
          <h2 class="header">{{ user.username }}</h2>
        </router-link>
        <div class="content">
          <div class="offer-image search-image">
            <p v-if="user.userdescription">
              {{ lettersOnly(user.userdescription.slice(0, 200)) }} ...
            </p>
            <p v-if="!user.userdescription && user.username">
              no user description
            </p>
            <!-- <img
              @click="getImg(user), (showImg = !showImg)"
              style="cursor:pointer;"
              v-if="user.userlogo"
              class="inner-img smallCarousel all-image"
              :src="user.userlogo"
              alt="../../../assets/images/pr1.png"
            /> -->
          </div>
        </div>
        <div class="small" v-if="user.added_date">
          {{ formatDate(user.added_date) }}
        </div>
      </div>
    </div>
    <h3 class="mt-4" v-if="results.length !== 0">Images For {{ keyword }}:</h3>
    <carousel
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
      navigationNextLabel="<div class='md-button md-theme-default smallCarousel'><i class='material-icons'>keyboard_arrow_right</i></div>"
      navigationPrevLabel="<div class='md-button md-theme-default smallCarousel prev'><i class='material-icons'>keyboard_arrow_left</i></div>"
    >
      <slide
        class="offer-item"
        v-for="(result, index) in results"
        :key="index + 22"
        v-if="result.file || result.variations"
      >
        <div class="grd-box-1-sldr">
          <div class="bravo-normal-offer">
            <div class="bravo-offer-image">
              <div class="place"></div>
              <a class="product-link">
                <div class="offer-image">
                  <img
                    v-if="result.file"
                    style="cursor: pointer"
                    @click="getImg(result), (showImg = !showImg)"
                    class="inner-img smallCarousel"
                    :src="result.file"
                  />
                  <img
                    v-if="result.variations"
                    @click="getImg(result), (showImg = !showImg)"
                    style="cursor:pointer;"
                    class="inner-img smallCarousel"
                    :src="result.variations.colors[0].files[0]"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </slide>
    </carousel>
    <md-dialog :md-active.sync="showImg" class="md-currency">
      <md-dialog-title class="d-flex preview-title"
        ><h4 class="mx-auto">{{ imgrResult.name }}</h4>
        <div class="close">
          <i
            class="material-icons md-primary"
            style="cursor: pointer"
            @click="showImg = false"
            >close</i
          >
        </div>
      </md-dialog-title>

      <md-content md-dynamic-height class="mx-5 mb-5">
        <div class="">
          <img v-if="imgrResult.file" :src="imgrResult.file" alt="img" />
          <img
            v-if="imgrResult.variations"
            :src="imgrResult.variations.colors[0].files[0]"
            alt="img"
          />
        </div>
      </md-content>
    </md-dialog>
  </div>
  <div v-else class="notFound">
    No Results Found
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "searchResult",
  props: ["results", "keyword", "users"],
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      showImg: false,
      imgrResult: false
    };
  },
  computed: {
    slugName() {
      return name => this.$helpers.slugify(name);
    },
    id() {
      return this.$route.params.id;
    },
    encodeProductId() {
      return productId => btoa(productId);
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
    getImg(result) {
      this.imgrResult = result;
      console.log(this.imgrResult);
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
<style scoped>
.close {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e4e6eb;
  /* margin-left: auto; */
  padding: 7px;
}
.md-dialog >>> .md-dialog-container {
  border-radius: 10px !important;
  overflow: auto !important;
  max-height: 100% !important;
}
.md-dialog >>> .md-dialog-title {
  padding-bottom: 7px;
}
.notFound {
  display: flex;
  font-size: 24px;
  color: tomato;
  justify-content: center;
  align-items: center;
}
.bravo-offer-image .inner-img {
  max-width: 160%;
}
.search-image .inner-img.smallCarousel {
  max-width: 160%;
  margin-left: auto;
  width: 160px;
  border-radius: 10px;
}
.offer-item {
  width: 100%;
  margin: 6px;
  background: #fff;
  -webkit-box-shadow: 0 2px 8px 0 rgb(0 0 0 / 5%);
  box-shadow: 3px 8px 8px 3px rgb(0 0 0 / 5%);
  border-radius: 6px;
}
.header:hover {
  text-decoration: underline;
}
.VueCarousel {
  width: 100%;
  margin-top: 20px;
}
.bravo-normal-offer {
  padding: 0;
}
.md-card .md-title {
  font-size: 17px;
  text-align: left;
  color: #1a0dab;
}
.search-image {
  display: flex;
  height: 70px;
}
.search-image p {
  display: flex;
  width: 50%;
  line-height: 25px;
}
.all-content p {
  width: 50%;
  font-size: medium;
  overflow: hidden;
}
.result-wrap {
  margin-top: 3.3em;
}
.head {
  font-size: 2.1em;
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
  margin-right: 0.4em;
  position: relative;
  text-align: right;
}
.chips i {
  position: absolute;
  top: 5px;
  left: 10px;
  font-size: 20px;
}
.search {
  border: 0.5px solid #ccc;
  border-radius: 20px;
  width: 50%;
  padding: 15px;
  height: 45px;
  font-size: 14px;
}
.results h2 {
  color: darkblue;
  margin: 10px 0;
  font-size: 20px !important;
  line-height: 1.2;
}
.results h2:hover {
  text-decoration: underline !important;
}
.small {
  color: grey;
  margin-top: 15px;
  font-size: 14px;
}
.border-header {
  margin-left: 0;
}
@media only screen and (max-width: 768px) {
  .md-search {
    bottom: 0;
  }
  .md-search >>> .md-dialog-container {
    width: 100%;
    background: #fff0;
  }
  .head {
    width: 100%;
  }
  .head .search {
    height: 35px;
  }
  /* .results h2 {
    font-size: 14px !important;
  } */
  .search-image p {
    width: 100%;
  }
  .all-content p {
    width: 100%;
  }
}
@media only screen and (max-width: 600px) {
  .arrow2 {
    left: 30px !important;
  }
  .arrow {
    right: 30px !important;
  }
}

@media only screen and (max-width: 568px) {
  .all-image {
    width: 37% !important;
    height: 90px !important;
    margin-right: 35px;
  }
  .results {
    padding-left: 10px;
    padding-right: 10px;
  }
  .all-image {
    max-height: 90px;
  }
  /* .small[data-v-0638771c] {
    color: grey;
    margin-top: 0px;
    font-size: 5px;
  } */
}
@media only screen and (max-width: 400px) {
  /* .results h2 {
    font-size: 14px !important;
  }
  .all-content p[data-v-0638771c] {
    width: 100%;
    font-size: 11px;
  } */
  .all-image {
    max-height: 60px;
  }
  /* .small[data-v-0638771c] {
    color: grey;
    margin-top: 0px;
    font-size: 8px;
  } */
  .notFound {
    font-size: 16px;
    margin-top: 30px;
  }
}
</style>
