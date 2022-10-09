<template>
  <div class="card-carousel" @mouseover="stopTimer" @mouseleave="restartTimer">
    <div class="progressbar" v-if="autoSlideInterval && showProgressBar">
      <div :style="{ width: progressBar + '%' }"></div>
    </div>
    <div class="card-img">
      <div class="count-down">
        <Countdown deadline="August 22, 2022"></Countdown>
      </div>
      <div class="label_inactive">
        <div class="dot_label_inactive"></div>
        In Active
      </div>
      <div class="pay_now">Pay Now</div>
      <img :src="currentImage" alt="" />
      <div class="actions">
        <span @click="prevImage" class="prev">
          &#8249;
        </span>
        <span @click="nextImage" class="next">
          &#8250;
        </span>
      </div>
    </div>
    <div class="thumbnails">
      <div
        v-for="(image, index) in images"
        :key="image.id"
        :class="['thumbnail-image', activeImage == index ? 'active' : '']"
        @click="activateImage(index)"
      >
        <img :src="image.thumb" />
      </div>
    </div>
  </div>
</template>

<script>
import Countdown from "vuejs-countdown";

export default {
  name: "Carousel",
  data() {
    return {
      //Index of the active image
      activeImage: 0,
      //Hold the timeout, so we can clear it when it is needed
      autoSlideTimeout: null,
      //If the timer is stopped e.g. when hovering over the carousel
      stopSlider: false,
      //Hold the time left until changing to the next image
      timeLeft: 0,
      //Hold the interval so we can clear it when needed
      timerInterval: null,
      //Every 10ms decrease the timeLeft
      countdownInterval: 10
    };
  },
  computed: {
    // currentImage gets called whenever activeImage changes
    // and is the reason why we don't have to worry about the
    // big image getting updated
    currentImage() {
      this.timeLeft = this.autoSlideInterval;
      return this.images[this.activeImage].big;
    },
    progressBar() {
      //Calculate the width of the progressbar
      return 100 - (this.timeLeft / this.autoSlideInterval) * 100;
    }
  },
  methods: {
    // Go forward on the images array
    // or go at the first image if you can't go forward
    nextImage() {
      var active = this.activeImage + 1;
      if (active >= this.images.length) {
        active = 0;
      }
      this.activateImage(active);
    },
    // Go backwards on the images array
    // or go at the last image
    prevImage() {
      var active = this.activeImage - 1;
      if (active < 0) {
        active = this.images.length - 1;
      }
      this.activateImage(active);
    },
    activateImage(imageIndex) {
      this.activeImage = imageIndex;
    },
    //Wait until 'interval' and go to the next image;
    startTimer(interval) {
      if (interval && interval > 0 && !this.stopSlider) {
        var self = this;
        clearTimeout(this.autoSlideTimeout);
        this.autoSlideTimeout = setTimeout(function() {
          self.nextImage();
          self.startTimer(self.autoSlideInterval);
        }, interval);
      }
    },
    //Stop the timer when hovering over the carousel
    stopTimer() {
      clearTimeout(this.autoSlideTimeout);
      this.stopSlider = true;
      clearInterval(this.timerInterval);
    },
    //Restart the timer(with 'timeLeft') when leaving from the carousel
    restartTimer() {
      this.stopSlider = false;
      clearInterval(this.timerInterval);
      this.startCountdown();
      this.startTimer(this.timeLeft);
    },
    //Start countdown from 'autoSlideInterval' to 0
    startCountdown() {
      if (!this.showProgressBar) return;
      var self = this;
      this.timerInterval = setInterval(function() {
        self.timeLeft -= self.countdownInterval;
        if (self.timeLeft <= 0) {
          self.timeLeft = self.autoSlideInterval;
        }
      }, this.countdownInterval);
    }
  },
  created() {
    //Check if startingImage prop was given and if the index is inside the images array bounds
    if (
      this.startingImage &&
      this.startingImage >= 0 &&
      this.startingImage < this.images.length
    ) {
      this.activeImage = this.startingImage;
    }

    //Check if autoSlideInterval prop was given and if it is a positive number
    if (
      this.autoSlideInterval &&
      this.autoSlideInterval > this.countdownInterval
    ) {
      //Start the timer to go to the next image
      this.startTimer(this.autoSlideInterval);
      this.timeLeft = this.autoSlideInterval;
      //Start countdown to show the progressbar
      this.startCountdown();
    }
  },
  components: { Countdown },
  props: [
    "startingImage",
    "images",
    "adv_data",
    "autoSlideInterval",
    "showProgressBar"
  ]
};
</script>

<style scoped>
.card-carousel {
  user-select: none;
  position: relative;
}

.progressbar {
  display: block;
  width: 100%;
  height: 5px;
  position: absolute;
  background-color: rgba(221, 221, 221, 0.25);
  z-index: 1;
}

.progressbar > div {
  background-color: rgba(255, 255, 255, 0.52);
  height: 100%;
}

.thumbnails {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
}

.thumbnail-image {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 2px;
}

.thumbnail-image > img {
  width: 100%;
  height: auto;
  transition: all 250ms;
}
.count-down {
  position: absolute;
  top: 18px;
  right: 8px;
  padding: 8px;
  background: rgb(0 0 0 / 71%);
  border-radius: 5px;
  padding-bottom: 4px;
  z-index: 2000;
}
.dot_label_active {
  background: #64dd17;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  float: left;
  margin: 1px 5px 0px 0px;
}
.dot_label_inactive {
  background: #f44336;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  float: left;
  margin: 1px 5px 0px 0px;
}
.label_active {
  background: rgba(0, 0, 0, 0.55);

  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 12px;
  padding-top: 8px;
}

.label_inactive {
  background: rgba(0, 0, 0, 0.55);

  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  float: left;
  cursor: pointer;
  position: absolute;
  bottom: 8px;
  right: 80px;
  font-size: 12px;
  z-index: 2000;
  padding-top: 8px;
}

.pay_now {
  background: #ff5722;
  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  float: left;
  cursor: pointer;
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 12px;
  padding-top: 8px;
  z-index: 2000;
}

.wrap_count-down {
  float: left;
  margin-right: 5px;
}
.wrap_count-down h3 {
  text-align: center;
  font-size: 10px;
  color: #fff;
  margin-top: 1px;
}
.box_count-down {
  background-color: #ff5722;
  border-radius: 5px;
  width: 42px;
  height: 34px;

  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
  line-height: 1px;
}

.thumbnail-image:hover > img,
.thumbnail-image.active > img {
  opacity: 0.6;
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.5);
}

.card-img {
  position: relative;
  margin-bottom: 15px;
}

.card-img > img {
  display: block;
  margin: 0 auto;
}

.actions {
  font-size: 1.5em;
  height: 40px;
  position: absolute;
  top: 50%;
  margin-top: -20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #585858;
}

.actions > span {
  cursor: pointer;
  transition: all 250ms;
  font-size: 45px;
}

.actions > span.prev {
  margin-left: 5px;
}

.actions > span.next {
  margin-right: 5px;
}

.actions > span:hover {
  color: #eee;
}
</style>
