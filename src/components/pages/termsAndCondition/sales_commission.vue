<template>
  <div>
    <table v-if="categories">
      <tr>
        <th
          colspan="2"
          class="center"
        > Sales Commission</th>
      </tr>
      <tr>
        <th>Product Category</th>
        <th style="padding: 0px 8px">% of Sales Price</th>
      </tr>
      <tbody
        v-for="(mainCategory,mainId) in categories"
        :key="mainId"
      >
        <tr>
          <th
            colspan="2"
            class="center title"
          > {{mainCategory.categoryname}} </th>
        </tr>
        <tr
          v-for="(subCategory,subId) in mainCategory.subCategories"
          :key="subId"
        >
          <td> {{subCategory.categoryname}} </td>
          <td> {{subCategory.commission_percentage}} % </td>
        </tr>
      </tbody>

    </table>
    <table
      v-else
      style="height: 100%"
    >
      <loader></loader>
    </table>

  </div>
</template>
<script>
import utils from "@/helpers/utils.js"
import loader from "@/components/pages/profileDashboard/components/loader"
export default {
  name: "SalesCommission",
  components: { loader },
  mixins: [utils],
  data: () => ({
    categories: ""
  }),
  mounted () {
    this.loadCategories()
  },
  methods: {
    async loadCategories () {
      const res = await this.fetchAndAssign("api_categories", {});
      if (res.success) {
        await Promise.all(res.category.map(async (el, id) => {
          const subCategories = await this.fetchAndAssign("api_categories", { parentid: el.category_id })
          el.subCategories = subCategories.category
        }))
        this.categories = await res.category
      }

    }
  }
}
</script>

<style>
.center {
  text-align: center;
}

.title {
  color: white;
  background-color: #ff5722;
}

table {
  width: 100%;
}
td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}

/* tr:nth-child(even) {
  background-color: #f2f2f2;
} */

tr:hover {
  background-color: #ddd;
}

th {
  padding: 8px 0px;
  /* text-align: left; */
  /* background-color: #4caf50; */
  /* color: white; */
}
</style>