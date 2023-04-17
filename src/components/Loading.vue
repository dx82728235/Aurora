<script setup>
import LoadingPic from "image/loading.gif";
defineProps({
  mask: Boolean,
});
</script>
<template>
  <div class="loading" v-if="mask">
    <div class="loading-mask"></div>
    <div class="loading-center-pic">
      <img :src="LoadingPic" />
      <div>加载中……</div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  z-index: 100000;
}
.loading .loading-mask {
  width: 100%;
  height: 100%;
  background-color: var(--text-color);
  opacity: 0.5;
}

.loading .loading-center-pic {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  z-index: 100001;
  margin: auto;
  text-align: center;
}
.loading .loading-center-pic img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.loading .loading-center-pic div {
  font-size: 12px;
  margin-top: -14px;
  color: var(--bg-color);
}
</style>