<script setup>
import { getWallpaper, getImagePath } from "@/utils";
import { BaseRouters } from "@/router";
import { ElMessage } from "element-plus";

const picPathList = [
  "image/bg3.jpg",
  "image/bg.jpeg",
  "image/bg2.jpeg",
  "image/nazina.jpeg",
].map((path) => getImagePath(path));
const pags = BaseRouters.map((router) => ({
  name: router.name,
  cName: router.cName,
}));

// 去重
const unique = (arr) => {
  const res = new Map();
  return arr.filter((a) => !res.has(a.name) && res.set(a.name, 1));
};

const setWallpaper = ({ name, cName }, path) => {
  const curWallPaper = JSON.parse(localStorage.getItem("wallpapers")) || [];
  const wallpapers = unique([
    {
      name,
      cName,
      path,
    },
    ...curWallPaper,
  ]);

  localStorage.setItem("wallpapers", JSON.stringify(wallpapers));
  ElMessage({
    message: "设置成功",
    type: "success",
  });
};
</script>

<template>
  <div class="theme page-container">
    <div class="page-main">
      <div
        class="page-bg"
        :style="{ backgroundImage: `url(${getWallpaper('theme')})` }"
      ></div>
      <div class="theme-image__preview" v-for="(path, initialIndex) in picPathList" :key="path">
        <el-image
          style="width: 150px; height: 150px"
          :src="path"
          :zoom-rate="1.2"
          :initial-index="initialIndex"
          :preview-src-list="picPathList"
          fit="cover"
        />
        <el-popover title="选择页面" placement="top-start" trigger="click">
          <template #reference>
            <el-button>设置壁纸</el-button>
          </template>
          <div class="theme-page_btns" v-for="page in pags" :key="page.name">
            <el-button @click="setWallpaper(page, path)">{{
              page.cName
            }}</el-button>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-image__preview {
  padding: 30px 0;
  text-align: center;
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.theme-page_btns {
  margin-bottom: 4px;
}
</style>

