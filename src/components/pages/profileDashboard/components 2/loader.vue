<template>
  <div class="md-layout md-alignment-center-center">
    <div class="md-layout-item">
      <center>
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </center>
    </div>
  </div>
</template>
<script>
export default {
  name: "globalLoader"
}
</script>
<style>
/* Loader CSS */

.spinner {
  width: 80px;
  height: 80px;
  position: fixed;
  top: 0px;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ff5722;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
/* Loader Css End */
</style>