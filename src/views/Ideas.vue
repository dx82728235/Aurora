<script>
import { defineComponent } from 'vue'
import Ideas from "../docs/ideas.md"

export default defineComponent({
  name: 'ideas',
  components: {
    Ideas
  },
})
</script>

<template>
  <div class="ideas page-container">
    <Ideas />
  </div>
</template>

