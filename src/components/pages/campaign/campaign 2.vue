<template>
  <div class="container">
    <div class="full-wrap mb-5">
      <div class="headerSection">
        <div class="topHead">
          <figure>
            <img src="./together-trans.png" class="logoHero" />
          </figure>

          <ul>
            <li class="md-button md-primary md-theme-default active">
              <a href="">Home</a>
            </li>
            <li class="md-button md-primary md-theme-default">
              <a href="">Directory</a>
            </li>
            <li class="md-button md-primary md-theme-default">
              <a href="">Video</a>
            </li>
            <li class="md-button md-primary md-theme-default">
              <a href="">Participators</a>
            </li>
          </ul>
        </div>

        <div class="topbannerBox">
          <figure>
            <img src="./banner2.jpg" class="fitimageTo bannerFor" />
          </figure>
        </div>
      </div>

      <div class="innerSection">
        <div class="vendorItemShow">
          <figure>
            <img src="./health.jpg" class="fitimageTo" />
          </figure>
          <figure>
            <img src="./cloth.jpg" class="fitimageTo" />
          </figure>
          <figure>
            <img src="./women.jpg" class="fitimageTo" />
          </figure>

          <figure>
            <img src="./banner1.jpg" class="fitimageTo" />
          </figure>
          <figure>
            <img src="../../../assets/images/grd2.jpg" class="fitimageTo" />
          </figure>
          <figure>
            <img src="../../../assets/images/grd1.jpg" class="fitimageTo" />
          </figure>
        </div>

        <div class="vendorAdd">
          <figure>
            <img src="./offer1.jpg" class="fitimageTo" />
          </figure>
          <figure>
            <img src="./offer2.jpg" class="fitimageTo" />
          </figure>
        </div>
      </div>
      <div class="innerSection">
        <div class="vendorItemShow">
          <figure>
            <img src="./health.jpg" class="fitimageTo" />
          </figure>
          <figure>
            <img src="../../../assets/images/grd1.jpg" class="fitimageTo" />
          </figure>
          <figure>
            <img src="../../../assets/images/grd2.jpg" class="fitimageTo" />
          </figure>
          <figure>
            <img src="./women.jpg" class="fitimageTo" />
          </figure>
          <figure>
            <img src="./banner1.jpg" class="fitimageTo" />
          </figure>

          <figure>
            <img src="./cloth.jpg" class="fitimageTo" />
          </figure>
        </div>

        <div class="vendorAdd">
          <figure>
            <img src="./offer1.jpg" class="fitimageTo" />
          </figure>
          <figure>
            <img src="./offer2.jpg" class="fitimageTo" />
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.headerSection {
  margin: 0 auto;
  max-width: 960px;
  width: 100%;
}
.topHead {
  position: relative;
  height: 255px;
  /* background-image: linear-gradient(#ffb25b, #ff5722); */
  /* background-image: linear-gradient(#ffbe75, #ff612f); */
  background-image: linear-gradient(#dae1e7, #213a63);
  border-bottom-left-radius: 50% 25%;
  border-bottom-right-radius: 50% 25%;
  width: 100%;
}

.topHead figure {
  text-align: center;
}
.logoHero {
  margin: 0 auto;
  margin-top: 21px;
  height: 85px;
}
.topHead ul {
  text-align: center;
  width: 100%;
  display: flex;
  padding: 15px;
  justify-content: center;
  margin-top: 0.1em;
}
.topHead ul li {
  border: 1px solid #ffffff;
  border-radius: 19px;
  margin-right: 11px;
  font-size: 13px;
  font-weight: 500;
  height: 31px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 65px;
}
.topHead ul li.active {
  background: #ffffff;
}
.topHead ul li.active a {
  color: #213a63;
}
.topHead ul li a {
  color: #ffffff;
}
.topbannerBox {
  max-width: 816px;
  width: 100%;
  margin: 0 auto;
  margin-top: -65px;
  margin-bottom: 2.1em;
}
.topbannerBox figure {
  position: relative;
  height: 200px;
  overflow: hidden;
  box-shadow: 0 4px 12px 0 hsla(0, 0%, 60%, 0.2);
}
.fitimageTo {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  opacity: 1;
  max-width: 100%;
  max-height: 100%;
  border-radius: 4px;
}
.innerSection {
  max-width: 816px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 3.5em;
}
.vendorItemShow {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(31.33%, 1fr));
  grid-gap: 15px;
}
.vendorItemShow figure {
  position: relative;
  width: 100%;
  height: 205px;
  margin: 0 auto;
  box-shadow: 0 4px 12px 0 hsla(0, 0%, 60%, 0.2);
}
.vendorAdd {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(49%, 1fr));
  grid-gap: 15px;
  margin-top: 2.1em;
}
.vendorAdd figure {
  position: relative;
  width: 100%;
  height: 165px;
  margin: 0 auto;
}
.vendorAdd figure img {
  height: 165px;
  object-fit: cover;
  width: 100%;
  box-shadow: 0 4px 12px 0 hsla(0, 0%, 60%, 0.2);
}
.vendorItemShow figure img {
  height: 205px;
  object-fit: cover;
}
.bannerFor {
  height: 200px;
  min-width: 816px;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  object-fit: cover;
}
@media only screen and (max-width: 768px) {
  .topHead ul {
    display: grid;
  }
  .topHead {
    height: 345px;
    border-radius: 0;
  }
  .topHead ul li {
    margin-bottom: 7px;
  }
  .src-bx-1 {
    width: 100%;
  }
  .vendorItemShow {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
  .vendorItemShow figure img {
    height: 100%;
    width: 100%;
  }
  .bannerFor {
    border-top-left-radius: 50% 25%;
    border-top-right-radius: 50% 25%;
  }
  .logoHero {
    height: 69px;
  }
}
</style>
