<script setup>
import { ref } from "vue";
import { getImagePath } from "@/utils";
import Background from "@/components/Background.vue";

const liveRooms = ref([
  {
    id: "0",
    name: "老实憨厚的笑笑",
    url: "https://live.bilibili.com/7777",
    img: getImagePath("image/xiaoxiao.jpg"),
  },
  {
    id: "2",
    name: "金咕咕金咕咕doinb",
    url: "https://www.douyu.com/topic/Doinblplcjs_new?rid=252140",
    img: getImagePath("image/doinb.jpeg"),
  },
]);
</script>

<template>
  <div class="favorite-live page-container">
    <div class="page-main">
      <Background page-name="favoritelive" />
      <div class="demo-image">
        <div v-for="liveRoom in liveRooms" :key="liveRoom.id" class="block">
          <a :href="liveRoom.url" target="_blank">
            <el-image
              style="width: 100px; height: 100px"
              :src="liveRoom.img"
              fit="cover"
            />
            <span class="demonstration">{{ liveRoom.name }}</span>
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
  font-size: 14px;
  margin-bottom: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>