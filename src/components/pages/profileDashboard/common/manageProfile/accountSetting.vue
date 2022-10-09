<template>
  <div>
    <div class="col-sm-12 p-0 mob_size">
      <p class="info">
        You can Hide & Show your information , Block account and Chat ,
        Notification Allow account and chat , Notification and delete your
        account at any time.
      </p>

      <section class="first-sec">
        <div class="head">Hide Mobile Number</div>
        <div>
          <small
            >Enable this profile visitor's can see your contact number</small
          >

          <md-switch v-model="boolean"> </md-switch>
        </div>
      </section>

      <section class="first-sec">
        <div class="head">Hide Email</div>
        <div>
          <small> Enable this profile visitor's can see your email</small>
          <md-switch v-model="boolean1"></md-switch>
        </div>
      </section>

      <section class="first-sec">
        <div class="head">Hide Personal Information</div>
        <div>
          <small>
            Enable this profile visitor's can see your Personal
            Information</small
          >
          <md-switch v-model="boolean2"></md-switch>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      boolean: true,
      boolean1: true,
      boolean2: true
    };
  }
};
</script>
<style scoped>
section {
  margin-bottom: 1.5em;
}
section .head {
  font-size: 14px;
  font-weight: 600;
}
.info {
  text-align: center;
  color: #ff5722;
  margin-bottom: 25px;
  line-height: 20px;
}
small {
  float: left;
  margin-top: 20px;
  margin-right: 10px;
  line-height: 16px;
}
.mob_size {
  margin-top: 30px;
}

@media screen and (max-width: 768px) {
  .info {
    line-height: 20px;
  }
  .edit-profile-wrap {
    margin-top: 1.4em;
  }
  .mob_size {
    margin-top: 20px;
    margin-bottom: 20px;

  }
}

@media screen and (max-width: 600px) {
  .info {
    line-height: 17px;
    font-size: 12px;
    margin-bottom: 15px;
  }
  .edit-profile-wrap {
    margin-top: 2em;
  }

  small {
    margin-top: 10px;
  }

  section {
    margin-bottom: 0.5em;
  }

  .md-switch {
    margin: 8px 16px 16px 0 !important;
  }

  section .head {
    font-weight: 500;
    font-size: 13px;
  }

  .mob_size {
    margin-top: 10px;
    margin-bottom: 10px;

  }
}
@media screen and (max-width: 320px) {
  .info {
    text-align: left;
  }
  section.first-sec {
    min-height: 96px;
  }
  section .head {
    line-height: 18px;
  }

  
}
</style>
