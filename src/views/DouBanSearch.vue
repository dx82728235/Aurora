<script setup>
import { ref, computed } from "vue";
import { getSearchDataList } from "@/api";
import LoadingMask from "@/components/Loading.vue";
import IconfontSvg from "@/components/IconfontSvg.vue";

const sList = ref([]);
const sOptions = ref([
  { label: "影视", value: "movie" },
  { label: "图书", value: "book" },
  { label: "音乐", value: "music" },
]);
const keyName = ref("三体");
const sType = ref("movie");
const mask = ref(false);

const getSearchList = async () => {
  try {
    mask.value = true;
    const { data } = await getSearchDataList({
      urlParams: sType.value,
      key: keyName.value,
      page: 1,
    });
    sList.value = data;
    mask.value = false;
  } catch (error) {
    mask.value = false;
  }
};

const sListComputed = computed(() =>
  sList.value.map((item) => {
    return {
      ...item,
      title: item.title.replaceAll("\u200E", "").trim(),
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
                v-for="opt in sOptions"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
          </template>
          <template #append>
            <el-button @click="getSearchList">搜索</el-button>
          </template>
        </el-input>
      </div>
      <div class="demo-image">
        <div v-for="item in sListComputed" :key="item.cover_link" class="block">
          <el-popover placement="bottom-end" trigger="click">
            <template #reference>
              <div class="demo-more-icon">
                <IconfontSvg icon-code="icon-more1" />
              </div>
            </template>
            <div class="demo-more-content">
              <IconfontSvg icon-code="cupfox" :cover-link="item.title" />
              <IconfontSvg icon-code="icon-social-douban" :cover-link="item.cover_link" />
            </div>
          </el-popover>
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
    <LoadingMask :mask="mask" />
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
  padding-top: 18px;
  color: var(--text-color);
  text-align: center;
  display: inline-block;
  width: 166px;
  box-sizing: border-box;
  vertical-align: top;
  background-color: #fff;
  border-radius: 3%;
  overflow: hidden;
  position: relative;
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
.demo-image .demo-more-icon {
  position: absolute;
  right: 9px;
  top: 0px;
  z-index: 1;
  cursor: pointer;
  font-size: 20px;
}
.demo-more-content {
  display: flex;
  justify-content: space-around;
  font-size: 23px;
}
</style>