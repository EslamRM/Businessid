<template>
  <div class="Content text-center">
    <div class="Content-item">
      <!-- <span class="title">Uh Oh!</span> -->
      <span class="title">Access Forbidden</span>
      <br />
      <span class="desc">It looks like the resource you are trying to access is forbidden.</span>
    </div>
    <br />
    <!-- <svg height="80" width="200" class="Content-item">
      <defs>
        <clipPath id="eye-iris-clip">
          <path d="M 25 40 q 75 -60 150 0 M 25 40 q 75 60 150 0" />
        </clipPath>
      </defs>
      <path id="eye-back" d="M 25 40 q 75 -60 150 0 M 25 40 q 75 60 150 0" />
      <circle cx="100" cy="40" r="23" id="eye-iris" clip-path="url(#eye-iris-clip)" />

      <circle cx="100" cy="40" r="5" id="eye-pupil" clip-path="url(#eye-iris-clip)" />
    </svg>-->

    <svg width="155" height="225" class="Content-item">
      <rect
        class="server-item"
        x="2.5"
        y="2.5"
        width="150"
        height="50"
        rx="5"
        ry="5"
        fill="none"
        stroke-width="5"
        stroke="#213c64"
      />
      <rect
        x="27.5"
        y="27.5"
        width="62.5"
        height="1"
        rx="0.5"
        ry="0.5"
        fill="none"
        stroke-width="5"
        stroke="#213c64"
      />
      <rect
        x="27.5"
        y="77.5"
        width="62.5"
        height="1"
        rx="0.5"
        ry="0.5"
        fill="none"
        stroke-width="5"
        stroke="#213c64"
      />
      <circle cx="125" cy="27.5" r="10" stroke="#213c64" stroke-width="5" fill="#40ff40" />

      <rect
        class="server-item"
        x="2.5"
        y="52.5"
        width="150"
        height="50"
        rx="5"
        ry="5"
        fill="none"
        stroke-width="5"
        stroke="#213c64"
      />
      <rect
        x="27.5"
        y="127.5"
        width="62.5"
        height="1"
        rx="0.5"
        ry="0.5"
        fill="none"
        stroke-width="5"
        stroke="#213c64"
      />
      <circle cx="125" cy="77.5" r="10" stroke="#213c64" stroke-width="5" fill="#ff6060" />

      <rect
        class="server-item"
        x="2.5"
        y="102.5"
        width="150"
        height="50"
        rx="5"
        ry="5"
        fill="none"
        stroke-width="5"
        stroke="#213c64"
      />
      <circle cx="125" cy="127.5" r="10" stroke="#213c64" stroke-width="5" fill="#40ff40" />

      <line x1="57.5" y1="162.5" x2="92.5" y2="162.5" stroke="#ff5824" stroke-width="5" />

      <line x1="75" y1="152.5" x2="75" y2="175" stroke="#213c64" stroke-width="5" />

      <line x1="0" y1="175" x2="155" y2="175" stroke="#213c64" stroke-width="5" />

      <line x1="60" y1="162.5" x2="60" y2="180" stroke="#ff5824" stroke-width="5" />
      <line x1="90" y1="162.5" x2="90" y2="180" stroke="#ff5824" stroke-width="5" />

      <rect x="50" y="170" width="50" height="50" rx="5" ry="5" fill="#213c64" />
      <circle cx="75" cy="190.5" r="10" fill="#ff5824" />

      <polygon points="75,180 69,210 81,210" fill="#ff5824" />
    </svg>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.Content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

.Content-item {
  margin-bottom: 5vh;
}

/* #eye-back {
  fill: #213c64;
}

#eye-iris {
  fill: #ff5824;
  animation: eyemove 5s ease infinite;
}

#eye-pupil {
  fill: #202020;
  animation: eyemove 5s ease infinite;
} */

.Content-item {
  text-align: center;
}

.title {
  font-size: calc(16px + 2vmin);
  font-weight: 700;
}

.desc {
  font-size: calc(12px + 0.8vmin);
}

/* @keyframes eyemove {
  0% {
    cx: 100px;
  }
  17.5% {
    cx: 50px;
  }
  27.5% {
    cx: 50px;
  }
  62.5% {
    cx: 150px;
  }
  72.5% {
    cx: 150px;
  }
  90% {
    cx: 100px;
  }
  100% {
    cx: 100px;
  }
} */
</style>


