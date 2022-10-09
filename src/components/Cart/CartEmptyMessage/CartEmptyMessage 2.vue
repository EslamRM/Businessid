<template>
  <div>
    <div class="CartEmptyMessage">
      <img src="../../../assets/images/empty-state-cart.svg" />
      <div class="Hd-1">Your shopping cart looks empty</div>
      <div class="Hd-2">What are you waiting for?</div>
      <router-link to="/dsmarket">
        <md-button class="md-raised md-accent visit_btn" :md-ripple="true"
          >Visit DS Market</md-button
        >
      </router-link>
    </div>
  </div>
</template>
<style scoped>
.CartEmptyMessage {
  text-align: center;
  margin: 30px 0px;
}
.Hd-1 {
  color: rgb(126, 133, 155);
  font-weight: bold;
  font-size: 2rem;
  margin: 30px 0px 10px 0px;
}
.Hd-2 {
  color: rgb(126, 133, 155);
  font-size: 1.16667rem;
}
button {
  height: 40px;
  margin-top: 30px;
}
.visit_btn {
  padding-left: 10px;
  padding-right: 10px;
}
@media screen and (max-width: 768px) {
  .Hd-1 {
    font-size: 20px;
  }
}

@media screen and (max-width: 600px) {
  .Hd-1 {
    font-size: 14px;
  }
  .CartEmptyMessage img {
    width: 65%;
  }

  .visit_btn {
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 5px;
    padding-bottom: 3px;
    height: 38px;
  }
}

@media screen and (max-width: 300px) {
  .Hd-1 {
    font-size: 13px;
  }
  .CartEmptyMessage img {
    width: 55%;
  }

  .visit_btn {
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 5px;
    height: 34px;
  }
}
</style>
