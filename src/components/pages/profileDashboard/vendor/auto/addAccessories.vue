<template>
  <div>
    <div class="categorylist-wrap">
      <ul class="add-cat-list-hero inc-col">
        <li>
          <div class="cat-box">
            Name
            <span>
              <i class="material-icons">chevron_right</i>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      mainCategory: {
        name: "test"
      }
    };
  },
  methods: {}
};

let mainCategory = [
  {
    name: "Apparel, Merchandise & Accessories",
    ApparelSub: [{ name: "check1.1" }, { name: "check1.2" }]
  },
  {
    name: "Automotive Tools",
    AutomotiveSub: [{ name: "check2.1" }, { name: "check2.2" }]
  },
  {
    name: "Boat Parts",
    AutomotiveSub: [{ name: "check2.1" }, { name: "check2.2" }]
  },
  {
    name: "Car/4x4 Parts"
  },
  {
    name: "Motorcycle Parts"
  },
  {
    name: "Number Plates"
  }
];
</script>
<style scoped>
.inc-col {
  grid-template-columns: repeat(4, 1fr);
}
.cat-box {
  align-items: center;
  min-height: 75px;
  height: auto;
  box-shadow: 0px -1px 1px rgb(251, 239, 235), 0px 2px 5px rgb(243, 192, 176);
  background-color: rgba(255, 87, 34, 0.11);
  font-weight: 500;
  font-size: 13px;
}
</style>
