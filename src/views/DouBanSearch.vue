<script setup>
import { ref } from "vue";
import { getMoiveList } from "@/api";

const searchList = ref([]);
const keyName = ref("");

const getSearchList = async () => {
  try {
    const { data } = await getMoiveList({
      key: keyName.value,
      page: 1,
    });
    searchList.value = data;
    console.log(searchList)
  } catch (error) {}
};

</script>
<template>
  <div class="douban-search page-container">
    <div class="page-main">
      <div class="page-bg page-bg-img"></div>
      <div class="search-container">
        <el-input v-model="keyName" @keyup.enter="getSearchList" />
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
.page-bg-img {
  background-image: url("image/bg2.jpeg");
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
  width: 190px;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  font-size: 14px;
  margin-bottom: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>