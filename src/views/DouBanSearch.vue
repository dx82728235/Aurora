<script setup>
import { ref, computed } from "vue";
import { getSearchDataList } from "@/api";

const searchList = ref([]);
const searchOptions = ref([
  { label: "电影", value: "movie" },
  { label: "图书", value: "book" },
  { label: "音乐", value: "music" },
]);
const keyName = ref("");
const sType = ref("movie");

const getSearchList = async () => {
  try {
    const { data } = await getSearchDataList({
      urlParams: sType.value,
      key: keyName.value,
      page: 1,
    });
    searchList.value = data;
  } catch (error) {}
};

const searchListComputed = computed(() =>
  searchList.value.map((item) => {
    return {
      ...item,
      rating: parseFloat(item.rating) / 2,
    };
  })
);
</script>
<template>
  <div class="douban-search page-container">
    <div class="page-main">
      <div class="page-bg page-bg-img"></div>
      <div class="search-container">
        <el-input v-model="keyName" @keyup.enter="getSearchList">
          <template #prepend>
            <el-select
              style="width: 80px"
              v-model="sType"
              class="m-2"
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="opt in searchOptions"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </template>
          <template #append>
            <el-button @click="getSearchList">搜 索</el-button>
          </template>
        </el-input>
      </div>
      <div class="demo-image">
        <div v-for="item in searchListComputed" :key="item.cover_link" class="block">
          <el-image
            style="width: 150px; height: 218px"
            :src="item.cover"
            fit="cover"
            referrerpolicy="no-referrer"
          />
          <div class="rat-box">
            <el-rate
              v-model="item.rating"
              :max="5"
              size="small"
              allow-half
              disabled
              show-score
              :score-template="`${item.rating * 2 || ''}`"
            />
          </div>
          <span class="demonstration">{{ item.title }}</span>
        </div>
      </div>
      <div></div>
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
  width: 60%;
  min-width: 300px;
  margin: 0 auto;
}

.demo-image .block {
  margin: 30px 16px;
  padding-top: 3px;
  color: var(--text-color);
  text-align: center;
  display: inline-block;
  width: 156px;
  box-sizing: border-box;
  vertical-align: top;
  background-color: #fff;
  border-radius: 3%;
  overflow: hidden;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>