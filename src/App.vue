<template>
    <div class="app">
        <HeadWeb />
        <div class="content">
            <MultipleStylesChoose />
            <!-- <StylesListDisplay /> -->
            <!-- 你可以在这里添加其他组件 -->
        </div>
    </div>
</template>

<script setup lang='ts' name="App">
import HeadWeb from '@/components/headWeb.vue'
import MultipleStylesChoose from './components/multipleStylesChoose.vue';
import StylesListDisplay from './components/stylesListDisplay.vue';
</script>

<style scoped>
.app {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    /* 你可以根据需要调整最大宽度 */
}

.content>* {
    flex: 1 1 calc(50% - 10px);
    /* 每个子元素占据 50% 的宽度，减去间距 */
    margin: 5px;
    /* 子元素之间的间距 */
}
</style>