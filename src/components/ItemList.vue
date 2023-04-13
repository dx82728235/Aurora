<script setup>
    import {ref} from 'vue'
   const searchResult = ref([{iName:'三体'}, {iName:'深海'}])

</script>
<template>
    <div>
        <ul>
            <li v-for="(resultItem, resultItemIndex) in searchResult" :key="resultItemIndex">
                {{ resultItem.iName }}
            </li>
        </ul>
    </div>
</template>