<script setup>
import { ref } from "vue";
import XiaoXiaoJpg from "image/xiaoxiao.jpg";
import DoinbJpg from "image/doinb.jpeg";

const liveRooms = ref([
  {
    id: "0",
    name: "老实憨厚的笑笑",
    url: "https://live.bilibili.com/7777",
    img: XiaoXiaoJpg,
  },
  {
    id: "2",
    name: "金咕咕金咕咕doinb",
    url: "https://www.douyu.com/topic/Doinblplcjs_new?rid=252140",
    img: DoinbJpg,
  },
]);
</script>

<template>
  <div class="favorite-live">
    <div class="page-container">
      <div class="page-bg"></div>
      <div class="demo-image">
        <div v-for="liveRoom in liveRooms" :key="liveRoom.id" class="block">
          <a :href="liveRoom.url" target="_blank">
            <span class="demonstration">{{ liveRoom.name }}</span>
            <el-image
              style="width: 100px; height: 100px"
              :src="liveRoom.img"
              fit="cover"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.favorite-live {
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
  background-image: url("image/bg.jpeg");
  background-size: 100% 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  opacity: 0.6;
}
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
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