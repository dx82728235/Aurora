<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { BaseRouters } from "@/router";

const router = useRouter();
const MenuRouters = ref(BaseRouters);

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
  router.push(`/${key}`);
};

const defaultActive = computed(() => router.currentRoute._value.name);

</script>

<template>
  <el-menu
    :default-active="defaultActive"
    class="el-menu-demo"
    mode="vertical"
    @select="handleSelect"
  >
    <el-menu-item
      :index="MenuRouter.name"
      v-for="MenuRouter in MenuRouters"
      :key="MenuRouter.name"
      >{{ MenuRouter.cName }}</el-menu-item
    >
  </el-menu>
</template>
  
