<template>
    <div class="styles-list-display">
        <h2>所有战术形态</h2>
        <ul>
            <li v-for="style in allStyles" :key="style.team + style.role + style.style">
                <strong>{{ style.team }}</strong> - {{ style.role }}: {{ style.style }}
                <span v-if="style.attributes.length"> - 属性:
                    <span v-for="(value, index) in style.attributes" :key="index">
                        {{ attributeNames[index] }}: {{ value }}{{ index < style.attributes.length - 1 ? ', ' : '' }}
                            </span>
                    </span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import useStylesList from '@/store/stylesList'; // 确保路径正确

export default defineComponent({
    name: 'StylesListDisplay',
    setup() {
        const stylesListStore = useStylesList();
        const allStyles = computed(() => stylesListStore.getAllStyles);
        const attributeNames = ['力量', '灵巧', '精神', '体力', '智力', '运气', '宝珠强化'];

        return {
            allStyles,
            attributeNames
        };
    }
});
</script>

<style scoped>
.styles-list-display {
    padding: 20px;
    border-radius: 10px;
    background-color: #f0f0f0;
    /* 底色 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
}

.styles-list-display ul {
    list-style-type: none;
    padding: 0;
}

.styles-list-display li {
    margin-bottom: 10px;
}
</style>
