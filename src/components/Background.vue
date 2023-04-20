<script setup>
import { getWallpaper } from "@/utils";

defineProps({
  pageName: {
    default: "",
    type: String,
  },
});
</script>
<template>
  <div
    class="page-bg"
    :style="{ backgroundImage: `url(${getWallpaper(pageName)})` }"
  ></div>
</template>

<style>
.page-bg {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-size: 100% 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  opacity: var(--bg-opacity);
}
</style>