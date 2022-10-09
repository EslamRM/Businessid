<template>
  <div>
    <div class="logoWrap">
      <section class="featureLogos">
        <!-- <div>
          <router-link to="/campaign">
            <img src="./together-logo.jpg" />
          </router-link>
        </div> -->
        <!-- <div>
          <router-link to="/campaign">
            <h1>Campaign Image here</h1>
          </router-link>
        </div> -->
        <!-- <div>
          <router-link to="/dsmarket/dragon-mart">
            <img src="./dragon.png" height="45px" />
          </router-link>
        </div>
        <div>
          <router-link to="/dsmarket/rakez">
            <img src="./rakez.png" style="height:90px;width:100px" />
          </router-link>
        </div>
        <div><img src="./ded-trader-lg.png" height="45px" /></div>
        <div><img src="./women.png" height="45px" /></div> -->
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  methods: {}
};
</script>
<style scoped>
.logoWrap {
  max-width: 41.875rem;
  width: 100%;
  position: relative;
  background: #ffffff;
  margin: 0 auto;
  margin-top: -64.5px;
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  overflow: hidden;
  border-radius: 7px;
}
.featureLogos {
  display: flex;
  text-align: center;
}
.featureLogos div {
  width: 100%;
  /* max-width: 121px;
  text-align: center
   */
  margin: 11px;
}
.featureLogos div img {
  max-width: 275px;
  height: auto;
  width: 100%;
}
</style>
