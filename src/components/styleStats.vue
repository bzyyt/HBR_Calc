<!-- src/components/styleStats.vue -->
<template>
    <!-- 角色初始状态页面 -->
    <div class="modal" @click="handleOutsideClick">
        <div class="modal-content">
            <span class="close" @click="saveState">&times;</span>
            <h3>{{ roleName }}属性</h3>
            <div class="attributes-container">
                <div v-for="(value, index) in styleStats" :key="index" class="attribute-item">
                    <label :for="index">{{ index }}:</label>
                    <input :id="index" v-model.number="styleStats[index]" :type="index !== '戒指' ? 'number' : undefined"
                        :min="styleStats[index] === '宝珠强化' ? 0 : undefined"
                        :max="styleStats[index] === '宝珠强化' ? 5 : undefined" />
                </div>
            </div>
            <button @click="saveState">保存</button>
        </div>
    </div>
</template>

<script setup lang="ts" name="EditStyleModal">
import { useStateTempStore, type StyleTemp } from '@/store/statesTemp';
import { onMounted, onBeforeUnmount, ref } from 'vue';
const styleTemp = useStateTempStore();

const props = defineProps({
    teamName: {
        type: String,
        required: true
    },
    roleName: {
        type: String,
        required: true
    },
    styleName: {
        type: String,
        required: true
    },
});

const emit = defineEmits(['close'])

const styleStats = ref({} as StyleTemp);

const saveState = () => {
    emit('close');
}

onBeforeUnmount(() => {
    styleTemp.updateStyleTemp(props.teamName, props.roleName, props.styleName, styleStats.value);
});

onMounted(() => {
    styleStats.value = styleTemp.getStyleTemp(props.teamName, props.roleName, props.styleName);
    console.log(styleStats.value);
});

const handleOutsideClick = (event: MouseEvent) => {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent && !modalContent.contains(event.target as Node)) {
        emit('close');
    }
};

</script>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    /* 设置较高的 z-index 值 */
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    /* 增加宽度 */
    text-align: center;
    z-index: 1001;
    /* 设置比 .modal 更高的 z-index 值 */
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.attributes-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.attribute-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    /* 每个属性项之间的间隔 */
}

.attribute-item label {
    width: 80px;
    /* 增加标签的宽度 */
    margin-right: 10px;
    /* 标签和输入框之间的间隔 */
    text-align: right;
    /* 标签文本右对齐 */
}

.attribute-item input {
    width: 60px;
    /* 固定输入框的宽度 */
}
</style>