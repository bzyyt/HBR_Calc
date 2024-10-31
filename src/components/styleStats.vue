<!-- src/components/styleStats.vue -->
<template>
    <div v-if="show" class="modal" @click.self="handleOutsideClick">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h3>编辑战术形态属性</h3>
            <div v-for="(value, index) in attributes" :key="index">
                <label :for="'attribute-' + index">{{ attributeNames[index] }}:</label>
                <input :id="'attribute-' + index" v-model="attributes[index]" type="text" />
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
        }
    },
    emits: ['close', 'save'],
    setup(props, { emit }) {
        const attributeNames = ['力量', '灵巧', '精神', '体力', '智力', '运气'];

        const closeModal = () => {
            emit('close');
        };

        const saveAttributes = () => {
            emit('save', props.attributes);
            closeModal();
        };

        const handleOutsideClick = (event: MouseEvent) => {
            if (!props.show) return; // 检查弹窗是否开启
            const modalContent = document.querySelector('.modal-content');
            if (modalContent && !modalContent.contains(event.target as Node)) {
                saveAttributes();
            }
        };

        // watch(() => props.show, (newVal) => {
        //     if (newVal) {
        //         document.addEventListener('click', handleOutsideClick);
        //     } else {
        //         document.removeEventListener('click', handleOutsideClick);
        //     }
        // });

        // onMounted(() => {
        //     if (props.show) {
        //         document.addEventListener('click', handleOutsideClick);
        //     }
        // });

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
    width: 300px;
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
</style>