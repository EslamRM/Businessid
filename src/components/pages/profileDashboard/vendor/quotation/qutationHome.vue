<template>
  <div>
    <div class="edit-profile-wrap">
      <section class="first-sec">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25 qut-box">
            <router-link exact to="/vendor/qutationFromDemander">
              <md-badge class="md-primary md-round red" md-content="6" />

              <md-card class="md-primary">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-body-2">Received qutation from demander</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
            </router-link>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25 qut-box">
            <router-link to="/qutationForm">
              <md-badge class="md-primary md-round green" md-content="6" />

              <md-card class="md-primary">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-body-2">Replay qutation to demander</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
            </router-link>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25 qut-box">
            <router-link to="/qutationForm">
              <md-badge class="md-primary md-round blue" md-content="6" />

              <md-card class="md-primary">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-body-2">Accept qutation from demander</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
            </router-link>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25 qut-box">
            <router-link to="/qutationForm">
              <md-badge class="md-primary md-round red" md-content="6" />

              <md-card class="md-primary">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-body-2">Decline qutation from demander</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
            </router-link>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25 qut-box">
            <router-link to="/qutationForm">
              <md-badge class="md-primary md-round orange" md-content="6" />

              <md-card class="md-primary">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-body-2">Dispute shippment</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
            </router-link>
          </div>
          <div class="md-layout-item md-size-100">
            <div class="divide"></div>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25 qut-box">
            <router-link to="/qutationForm">
              <md-badge class="md-primary md-round blue" md-content="6" />

              <md-card class="md-primary">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-body-2">I send qutation to supplier</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
            </router-link>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25 qut-box">
            <router-link to="/qutationForm">
              <md-badge class="md-primary md-round green" md-content="6" />

              <md-card class="md-primary">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-body-2">Recieve qutation from supplier</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
            </router-link>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25 qut-box">
            <router-link to="/qutationForm">
              <md-badge class="md-primary md-round orange" md-content="6" />

              <md-card class="md-primary">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-body-2">Accept qutation</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
            </router-link>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25 qut-box">
            <router-link to="/qutationForm">
              <md-badge class="md-primary md-round red" md-content="6" />

              <md-card class="md-primary">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-body-2">Decline qutation</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
            </router-link>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25 qut-box">
            <router-link to="/qutationForm">
              <md-badge class="md-primary md-round green" md-content="6" />

              <md-card class="md-primary">
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-body-2">Tracking Oreder</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
            </router-link>
          </div>
        </div>
      </section>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
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
}
.btn-wrap {
  align-items: center;
  display: flex;
}
.btn-wrap .md-button {
  height: 37px;
}
.qut-box {
  position: relative;
  margin-bottom: 1.1em;
}
.qut-box .md-card {
  background-color: #fff;
  color: #1a1a1a;
  min-height: 70px;
  margin-bottom: 19px;
}
.qut-box .md-card .md-body-2 {
  font-size: 1em;
  font-weight: 400;
  line-height: 19px;
}
.qut-box .md-badge {
  right: 8px;
  top: -14px;
  font-size: 13px;
  position: absolute;
  left: inherit;
}
.divide {
  width: 100%;
  height: 1px;
  background-color: #eee;
  display: inline-block;
}
.red {
  background-color: red;
}
.green {
  background-color: green;
}
.blue {
  background-color: blue;
}
.orange {
  background-color: orange;
}
</style>