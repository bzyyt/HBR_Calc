<!-- src/components/MultipleStylesChoose.vue -->
<template>
    <div class="container">
        <h2>选择战术形态</h2>
        <div v-for="index in 6" :key="index">
            <styles-choose :role-number="index" :selected-roles="selectedRoles" @update-role="updateRole" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStylesList } from '@/store/stylesList'; // 确保路径正确
import StylesChoose from '@/components/stylesChoose.vue'; // 确保路径正确

export default defineComponent({
    name: 'MultipleStylesChoose',
    components: {
        StylesChoose
    },
    setup() {
        const stylesListStore = useStylesList();
        const selectedRoles = ref<string[]>(Array(6).fill(''));

        onMounted(() => {
            stylesListStore.loadStyles();
        });

        const updateRole = (index: number, role: string) => {
            selectedRoles.value[index - 1] = role;
        };

        return {
            selectedRoles,
            updateRole
        };
    }
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