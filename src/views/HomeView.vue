<script setup>
import Menu from "../components/Menu.vue";
import Logo from "../components/Logo.vue";
import FootLogo from "../components/Logo2.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <main>
    <div class="left-part">
      <Logo />
      <div class="menu">
        <Menu />
      </div>
      <FootLogo />
    </div>
    <div class="right-part">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  height: 100%;
}

.left-part {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.1);
}
.left-part .menu {
  flex: 1;
}
.right-part {
  width: 100%;
  height: 100%;
}
</style>
