<template>
  <div>
    <div class="col-sm-12 p-0 mob_size">
      <md-list class="md-triple-line">
        <md-list-item>
          <div class="md-list-item-text account-blocks">
            <span style="font-weight:bold;margin-bottom:10px"
              >Account Blocks</span
            >
            <p>
              A to Z World Hospitality Supplies LLC
            </p>
            <p>
              A1 Fire Fighting
            </p>
            <p>
              ABREGANA EVENTS DMCC
            </p>
            <p>
              Agrovet Alliance Fze
            </p>
            <p>
              Amarak Trading (LLC)
            </p>
          </div>
        </md-list-item>
        <md-list-item>
          <div class="md-list-item-text comment-blocks">
            <span style="font-weight:bold;margin-bottom:10px"
              >Comment Blocks</span
            >
            <p>
              Basmat Al Tamyz Metal Products Coating LLC
            </p>
            <p>
              Ashkanani Computer Est
            </p>
            <p>
              Al Zahi Decor LLC
            </p>
            <p>
              Al Nukhbak Plastic Products
            </p>
            <p>
              Aigul Rayeva
            </p>
            <p>
              Afra Technical Solutions EST
            </p>
          </div>
        </md-list-item>
      </md-list>
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
.account-blocks p,
.comment-blocks p {
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
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
