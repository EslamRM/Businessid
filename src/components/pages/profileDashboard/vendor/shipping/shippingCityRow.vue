<template>
  <tbody>
    <tr class="ctTable-row">
      <td class="ctTable-cell">
        <div class="ctTable-cell-container">
          Dubai
        </div>
      </td>
      <td class="ctTable-cell">
        <div class="ctTable-cell-container">
          10 AED
        </div>
      </td>
      <td class="ctTable-cell">
        <div class="ctTable-cell-container">
          8 Hour
        </div>
      </td>
      <td class="ctTable-cell">
        <div class="ctTable-cell-container">
          Self
        </div>
      </td>
      <td class="ctTable-cell">
        <div class="ctTable-cell-container">
          Cash on delivery
        </div>
      </td>
      <td class="ctTable-cell">
        <div class="ctTable-cell-container">
          <div class="actionWrap">
            <button type="button" class="md-button md-theme-default actionBtn">
              <span class="material-icons">edit</span>
            </button>
            <button type="button" class="md-button md-theme-default actionBtn">
              <span class="material-icons">delete</span>
            </button>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</template>
<script>
export default {};
</script>
<style scoped>
.actionWrap {
  display: flex;
}
.actionWrap .actionBtn {
  height: 26px;
  min-width: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background-color: rgb(223, 227, 233);
  margin-right: 0.55em;
}
.actionWrap .actionBtn span {
  font-size: 17px;
  color: rgb(33, 58, 99, 0.75);
}
</style>
