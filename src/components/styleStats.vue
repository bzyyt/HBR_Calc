<!-- src/components/styleStats.vue -->
<template>
    <!-- 角色初始状态页面 -->
    <div v-if="show" class="modal" @click.self="handleOutsideClick">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h3>{{ roleName }}属性</h3>
            <div class="attributes-container">
                <div v-for="(value, index) in attributes" :key="index" class="attribute-item">
                    <label :for="'attribute-' + index">{{ attributeNames[index] }}:</label>
                    <input :id="'attribute-' + index" v-model.number="attributes[index]" type="number"
                        :min="attributeNames[index] === '宝珠强化' ? 0 : undefined"
                        :max="attributeNames[index] === '宝珠强化' ? 5 : undefined" />
                </div>
            </div>
            <button @click="saveAttributes">保存</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, watch } from 'vue';

export default defineComponent({
    name: 'EditStyleModal',
    props: {
        show: {
            type: Boolean,
            required: true
        },
        attributes: {
            type: Array,
            required: true
        },
        roleName: {
            type: String,
            required: true
        }
    },
    emits: ['close', 'save'],
    setup(props, { emit }) {
        const attributeNames = ['力量', '灵巧', '精神', '体力', '智力', '运气', '宝珠强化'];

        const closeModal = () => {
            emit('close');
        };

        const saveAttributes = () => {
            emit('save', props.attributes);
            console.log('保存属性', props.attributes);
            closeModal();
        };

        const handleOutsideClick = (event: MouseEvent) => {
            if (!props.show) return; // 检查弹窗是否开启
            const modalContent = document.querySelector('.modal-content');
            if (modalContent && !modalContent.contains(event.target as Node)) {
                saveAttributes();
            }
        };

        onBeforeUnmount(() => {
            document.removeEventListener('click', handleOutsideClick);
        });

        return {
            attributeNames,
            closeModal,
            saveAttributes,
            handleOutsideClick
        };
    }
});
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