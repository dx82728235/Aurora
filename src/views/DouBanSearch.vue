<script setup>
import { ref, reactive, onMounted } from "vue";
const searchList = reactive([
  { title: "三体", cover: "", cover_link: "1" },
  { title: "三体", cover: "", cover_link: "2" },
]);

const getSearchList = () => {

  // searchList = '';
};

onMounted(() => {
  getSearchList();
});
</script>
<template>
  <div class="douban-search">
    <div class="page-container">
      <div class="page-bg"></div>
      <div class="search-container">
        <el-input />
      </div>
      <div class="demo-image">
        <div v-for="item in searchList" :key="item.cover_link" class="block">
          <el-image
            style="width: 150px; height: 200px"
            :src="item.cover"
            fit="cover"
          />
          <span class="demonstration">{{ item.title }}</span>
        </div>
      </div>
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
  opacity: var(--bg-opacity);
}
.search-container {
  width: 350px;
  margin-left: 23px;
}

.demo-image .block {
  padding: 30px 0;
  color: var(--text-color);
  text-align: center;
  display: inline-block;
  width: 200px;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  font-size: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>