<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { getSearchDataList } from "@/api";
import LoadingMask from "@/components/Loading.vue";
import IconfontSvg from "@/components/IconfontSvg.vue";
import { getWallpaper, deepClone } from "@/utils";

const keyName = ref("");
const sList = ref([]);
const baseSList = ref([]);
const pageNum = ref(1);
const mask = ref(false);
const sType = ref("movie");
const sOptions = ref([
  { label: "影视", value: "movie" },
  { label: "图书", value: "book" },
  { label: "音乐", value: "music" },
]);
const sortRadio = ref("default");
const sortOptions = ref([
  { label: "综合", value: "default" },
  { label: "近期", value: "time" },
  { label: "高分", value: "score" },
]);
const content = ref();
const inTheEnd = ref(false);

const getSearchList = async () => {
  try {
    mask.value = true;
    const { data } = await getSearchDataList({
      urlParams: sType.value,
      key: keyName.value,
      page: pageNum.value,
    });
    if (data instanceof Array && data.length === 0) {
      inTheEnd.value = true;
    }
    sList.value = [...sList.value, ...(data || [])];
    baseSList.value = deepClone(sList.value);
    mask.value = false;
  } catch (error) {
    mask.value = false;
  }
};

const handleSearch = () => {
  sList.value = [];
  pageNum.value = 1;
  inTheEnd.value = false;
  getSearchList();
};

const sortSList = () => {
  sList.value.sort((a, b) => {
    if (sortRadio.value === "time") {
      return Number(b.year) - Number(a.year);
    }
    if (sortRadio.value === "score") {
      return parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
    }
  });
};

const handleSort = (v) => {
  if (v === "default") {
    return (sList.value = deepClone(baseSList.value));
  }
  sortSList();
};

const doScroll = (event) => {
  if (inTheEnd.value) return;

  const scrollHeight = event.target.scrollHeight;
  const scrollTop = event.target.scrollTop;
  const clientHeight = event.target.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight) {
    pageNum.value += 1;
    getSearchList();
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

onMounted(() => {
  content.value.addEventListener("scroll", doScroll);
});

onBeforeUnmount(() => {
  content.value.removeEventListener("scroll");
});
</script>
<template>
  <div ref="content" class="douban-search page-container">
    <div class="page-main">
      <div
        class="page-bg"
        :style="{ backgroundImage: `url(${getWallpaper('doubansearch')})` }"
      ></div>
      <div class="search-container">
        <el-input v-model="keyName" @keyup.enter="handleSearch">
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
            <el-button @click="handleSearch">搜索</el-button>
          </template>
        </el-input>
      </div>
      <div class="demo-sort" v-show="sListComputed.length > 0">
        <el-radio-group v-model="sortRadio" size="large" @change="handleSort">
          <el-radio-button
            v-for="opt in sortOptions"
            :key="opt.value"
            :label="opt.value"
            >{{ opt.label }}</el-radio-button
          >
        </el-radio-group>
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
              <IconfontSvg
                icon-code="cupfox"
                :cover-link="`https://cupfox.app/s/${item.title}`"
              />
              <IconfontSvg
                icon-code="icon-social-douban"
                :cover-link="item.cover_link"
              />
            </div>
          </el-popover>
          <a :href="item.cover_link" target="_blank">
            <el-image
              style="width: 150px; height: 218px"
              :src="item.cover"
              fit="cover"
              referrerpolicy="no-referrer"
            />
          </a>
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
          <span class="demonstration">({{ item.year }})</span>
        </div>
      </div>
      <div v-if="inTheEnd" class="in-the-end">已经到底了～</div>
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
.search-container {
  width: 60%;
  min-width: 300px;
  margin: 0 auto;
}
.demo-sort {
  margin-top: 15px;
  margin-left: 20px;
}
.demo-image .block {
  margin: 30px 16px;
  padding-top: 6px;
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
  right: 11px;
  bottom: 0px;
  z-index: 1;
  cursor: pointer;
  font-size: 20px;
}
.demo-more-content {
  display: flex;
  justify-content: space-around;
  font-size: 23px;
}
.in-the-end {
  color: gray;
  text-align: center;
}
</style>