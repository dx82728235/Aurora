<script setup>
import { ref, reactive } from "vue";
const searchResult = reactive([{ iName: "三体" }, { iName: "深海" }]);
</script>
<template>
  <div class="douban-search">
    <div class="page-container">
      <div class="page-bg"></div>
      <div class="search-container">
        <el-input />
      </div>
      <ul>
        <li
          v-for="(resultItem, resultItemIndex) in searchResult"
          :key="resultItemIndex"
        >
          {{ resultItem.iName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.douban-search {
  width: 100%;
  height: 100%;
  position: relative;
}
.page-bg {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-image: url("image/bg2.jpeg");
  background-size: 100% 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  opacity: 0.6;
}
.search-container {
  width: 300px;
}
</style>