<template>
  <div v-if="results.length !== 0">
    <router-view></router-view>
    <div class="row mt-5">
      <div
        class="col-md-3 col-sm-4 mb-3"
        v-for="(result, index) in results"
        :key="result.file"
        v-if="result.file || result.variations"
      >
        <md-card class="card">
          <md-card-media>
            <img
              v-if="result.file"
              :src="result.file"
              style="cursor: pointer"
              @click="getImg(result), (showImg = !showImg)"
            />
            <img
              v-if="result.variations"
              @click="getImg(result), (showImg = !showImg)"
              style="cursor:pointer;"
              :src="result.variations.colors[0].files[0]"
            />
          </md-card-media>
          <md-card-header>
            <div class="md-subhead title">
              {{ result.name }}
            </div>
          </md-card-header>
        </md-card>
      </div>
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
  </div>
  <div v-else class="notFound">
    No Images Found
  </div>
</template>
<script>
export default {
  props: ["results", "keyword"],
  data() {
    return {
      showImg: false,
      imgrResult: false
    };
  },
  methods: {
    getImg(result) {
      this.imgrResult = result;
    }
  }
};
</script>
<style lang="">
.close {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e4e6eb;
  /* margin-left: auto; */
  padding: 7px;
}
.md-currency .md-dialog-container {
  border-radius: 10px !important;
  overflow: auto !important;
  max-height: 100% !important;
}
.md-currency .md-dialog-title {
  padding-bottom: 7px;
}
.notFound {
  display: flex;
  font-size: 24px;
  color: tomato;
  justify-content: center;
  align-items: center;
}
.card {
  box-shadow: none;
  border: 0;
}
.md-card .title {
  font-size: 12px;
  line-height: 20px;
  color: #3c4043;
}
.card img {
  height: 125px;
}
@media only screen and (max-width: 400px) {
  .card img {
    height: auto;
  }
  .notFound {
    font-size: 16px;
    margin-top: 30px;
  }
}
</style>
