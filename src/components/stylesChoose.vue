<template>
    <!-- 角色选择组件 -->
    <div class="styleschoose">
        <div class="content">
            <span class="role-label">角色{{ roleNumber }}：</span>
            <select id="team-select" v-model="selectedTeam" @change="updateRoles" class="team-select">
                <option disabled value="">请选择队伍</option>
                <option v-for="(people, team) in teams" :key="team" :value="team">
                    {{ team }}
                </option>
            </select>
            <select id="role-select" v-model="selectedRole" @change="handleRoleChange" :disabled="!selectedTeam"
                class="role-select">
                <option disabled value="">请选择角色</option>
                <option v-for="role in filteredRoles" :key="role" :value="role" :disabled="isRoleSelected(role)">
                    {{ role }}
                </option>
            </select>
            <select id="style-select" v-model="selectedStyle" @change="updateStyleAttributes" :disabled="!selectedRole"
                class="style-select">
                <option disabled value="">请选择战术形态</option>
                <option v-for="style in filteredStyles" :key="style" :value="style">
                    {{ style }}
                </option>
            </select>
            <button @click="showModal = true" :disabled="!selectedStyle">六维属性</button>
        </div>

        <EditStyleModal :show="showModal" :attributes="styleAttributes[selectedStyle] || Array(7).fill(0)"
            :roleName="selectedRole" @close="showModal = false" @save="saveAttributes" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import useStylesList from '@/store/stylesList'; // 确保路径正确
import EditStyleModal from '@/components/styleStats.vue'; // 确保路径正确

export default defineComponent({
    name: 'StylesChoose',
    components: {
        EditStyleModal
    },
    props: {
        roleNumber: {
            type: Number,
            required: true
        },
        selectedRoles: {
            type: Array,
            required: true
        }
    },
    setup(props, { emit }) {
        const stylesListStore = useStylesList();

        const teams = computed(() => stylesListStore.styleList);
        const selectedTeam = ref('');
        const selectedRole = ref('');
        const selectedStyle = ref('');
        const showModal = ref(false);
        const styleAttributes = computed(() => stylesListStore.styleAttributes);

        const filteredRoles = computed(() => {
            return selectedTeam.value ? Object.keys(stylesListStore.styleList[selectedTeam.value]) : [];
        });
        const filteredStyles = computed(() => {
            return selectedTeam.value && selectedRole.value
                ? stylesListStore.styleList[selectedTeam.value][selectedRole.value]
                : [];
        });

        const updateRoles = () => {
            if (!selectedTeam.value) {
                selectedRole.value = '';
                selectedStyle.value = '';
            } else {
                selectedRole.value = '';
                selectedStyle.value = '';
            }
        };

        const updateStyles = () => {
            if (!selectedRole.value) {
                selectedStyle.value = '';
            }
        };

        const handleRoleChange = () => {
            selectedStyle.value = ''; // 重置 selectedStyle
            emit('update-role', props.roleNumber, selectedRole.value);
        };

        const isRoleSelected = (role: string) => {
            return props.selectedRoles.includes(role) && role !== selectedRole.value;
        };

        const updateStyleAttributes = () => {
            if (!styleAttributes.value[selectedStyle.value]) {
                stylesListStore.saveAttributes(selectedStyle.value, Array(7).fill(0));
            }
        };

        const saveAttributes = (attributes: number[]) => {
            stylesListStore.saveAttributes(selectedStyle.value, attributes);
            console.log(`Attributes for ${selectedStyle.value}:`, attributes);
        };

        watch(selectedRole, (newRole, oldRole) => {
            if (newRole !== oldRole) {
                handleRoleChange();
            }
        });

        return {
            teams,
            selectedTeam,
            selectedRole,
            selectedStyle,
            filteredRoles,
            filteredStyles,
            updateRoles,
            updateStyles,
            handleRoleChange,
            isRoleSelected,
            showModal,
            styleAttributes,
            saveAttributes,
            updateStyleAttributes
        };
    }
});
</script>

<style scoped>
.styleschoose {
    margin-top: 10px;
    /* 上间隔 */
    margin-bottom: 10px;
    /* 下间隔 */
}

.role-label {
    display: inline-block;
    width: 100px;
    /* 固定宽度 */
}

.team-select {
    width: 150px;
    /* 固定宽度 */
    margin-right: 10px;
    /* 添加右侧间隔 */
}

.role-select {
    width: 140px;
    /* 固定宽度 */
    margin-right: 10px;
    /* 添加右侧间隔 */
}

.style-select {
    width: 240px;
    /* 固定宽度 */
    margin-right: 10px;
    /* 添加右侧间隔 */
}
</style>