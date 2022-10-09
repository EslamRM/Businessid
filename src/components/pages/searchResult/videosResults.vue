<template>
  <div>
    <router-view></router-view>
    <div class="results mt-5">
      <div class="mt-5">
        <router-link to="/store">
          <h2>Café | Definition of Café by Merriam-Webster</h2>
        </router-link>
        <div class="content">
          <div class="offer-image search-image">
            <router-link to="/store">
              <img
                class="inner-img smallCarousel video-image"
                src="../../../assets/images/video.png"
                alt="../../../assets/images/pr1.png"
              />
            </router-link>
            <p>
              Molokhiya Kushari Hawawshi Falafel Okra Feteer meshaltet Vine
              leaves Pigeon Mahshi Um ali. High-Quality Food. Authentic
              Atmosphere. Friendly Service.
              <br />
              21 Jun 2019
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <router-link to="/store">
          <h2>Café | Definition of Café by Merriam-Webster</h2>
        </router-link>
        <div class="content">
          <div class="offer-image search-image">
            <router-link to="/store">
              <img
                class="inner-img smallCarousel video-image"
                src="../../../assets/images/video.png"
                alt="../../../assets/images/pr1.png"
              />
            </router-link>
            <p>
              Molokhiya Kushari Hawawshi Falafel Okra Feteer meshaltet Vine
              leaves Pigeon Mahshi Um ali. High-Quality Food. Authentic
              Atmosphere. Friendly Service.
              <br />
              21 Jun 2019
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <router-link to="/store">
          <h2>Café | Definition of Café by Merriam-Webster</h2>
        </router-link>
        <div class="content">
          <div class="offer-image search-image">
            <router-link to="/store">
              <img
                class="inner-img smallCarousel video-image"
                src="../../../assets/images/video.png"
                alt="../../../assets/images/pr1.png"
              />
            </router-link>
            <p>
              Molokhiya Kushari Hawawshi Falafel Okra Feteer meshaltet Vine
              leaves Pigeon Mahshi Um ali. High-Quality Food. Authentic
              Atmosphere. Friendly Service.
              <br />
              21 Jun 2019
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <router-link to="/store">
          <h2>Café | Definition of Café by Merriam-Webster</h2>
        </router-link>
        <div class="content">
          <div class="offer-image search-image">
            <router-link to="/store">
              <img
                class="inner-img smallCarousel video-image"
                src="../../../assets/images/video.png"
                alt="../../../assets/images/pr1.png"
              />
            </router-link>
            <p>
              Molokhiya Kushari Hawawshi Falafel Okra Feteer meshaltet Vine
              leaves Pigeon Mahshi Um ali. High-Quality Food. Authentic
              Atmosphere. Friendly Service.
              <br />
              21 Jun 2019
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <router-link to="/store">
          <h2>Café | Definition of Café by Merriam-Webster</h2>
        </router-link>
        <div class="content">
          <div class="offer-image search-image">
            <router-link to="/store">
              <img
                class="inner-img smallCarousel video-image"
                src="../../../assets/images/video.png"
                alt="../../../assets/images/pr1.png"
              />
            </router-link>
            <p>
              Molokhiya Kushari Hawawshi Falafel Okra Feteer meshaltet Vine
              leaves Pigeon Mahshi Um ali. High-Quality Food. Authentic
              Atmosphere. Friendly Service.
              <br />
              21 Jun 2019
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <router-link to="/store">
          <h2>Café | Definition of Café by Merriam-Webster</h2>
        </router-link>
        <div class="content">
          <div class="offer-image search-image">
            <router-link to="/store">
              <img
                class="inner-img smallCarousel video-image"
                src="../../../assets/images/video.png"
                alt="../../../assets/images/pr1.png"
              />
            </router-link>
            <p>
              Molokhiya Kushari Hawawshi Falafel Okra Feteer meshaltet Vine
              leaves Pigeon Mahshi Um ali. High-Quality Food. Authentic
              Atmosphere. Friendly Service.
              <br />
              21 Jun 2019
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="results.length == 0" class="notFound">
      No Videos Found
    </div>
  </div>
</template>
<script>
export default {
  props: ['results'],
};
</script>
<style lang="">
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
  /* margin-top: 60px; */
  font-size: 12px;
}
.search-image {
  display: flex;
  /* height: 150px; */
}
.search-image p {
  display: flex;
  width: 50%;
  line-height: 25px;
}
.video-image {
  height: 80px !important;
}
@media only screen and (max-width: 768px) {
  .search-image p {
    width: 100%;
  }
  .results h2 {
    font-size: 14px !important;
  }
}
@media only screen and (max-width: 450px) {
  .results h2 {
    font-size: 12px !important;
  }
}
@media only screen and (max-width: 400px) {
  .video-image {
    height: 50px !important;
  }
  .search-image p {
    width: 100%;
  }
  .results h2 {
    font-size: 12px !important;
  }
}
</style>
