<template>
       <div class="loader">
            <div class="circle-loader"></div>
          </div>
</template>

<script>
export default {
    
}
</script>
<style scoped>
.loader {
  position: relative;
  right: 25%;
  height: 60px;

}
.circle-loader {
  position: absolute;
  bottom: 0;
  right: 20%;

  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 5px solid rgba(206, 190, 190, 0.2);
  border-top: 5px solid #ff9a7a;
  animation: animate 1.5s infinite linear;
}
@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>