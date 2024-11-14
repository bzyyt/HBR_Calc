<!-- src/components/MultipleStylesChoose.vue -->
<template>
    <div class="container">
        <h2>选择战术形态</h2>
        <div v-for="index in 6" :key="index">
            <styles-choose :role-number="index" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStylesList } from '@/store/stylesList';

const stylesListStore = useStylesList();

import StylesChoose from '@/components/stylesChoose.vue'; // 确保路径正确

onMounted(async () => {
    await stylesListStore.loadStyles();
});

</script>

<style scoped>
.container {
    padding: 20px;
    border-radius: 10px;
    background-color: #2ff055;
    /* 底色 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
}

.style-choose-wrapper {
    margin-bottom: 20px;
}
</style>