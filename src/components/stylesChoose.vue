<template>
    <!-- 角色选择组件 -->
    <div class="styleschoose">
        <div class="content">
            <span class="role-label">角色{{ roleNumber }}：</span>
            <select id="team-select" v-model="selectedTeam" @change="TeamChange" class="team-select">
                <option disabled value="">请选择队伍</option>
                <option v-for="team in teams" :key="team" :value="team">
                    {{ team }}
                </option>
            </select>
            <select id="role-select" v-model="selectedRole" @change="RoleChange" :disabled="!selectedTeam"
                class="role-select">
                <option disabled value="">请选择角色</option>
                <option v-for="role in filteredRoles(selectedTeam)" :key="role" :value="role">
                    {{ role }}
                </option>
            </select>
            <select id="style-select" v-model="selectedStyle" @change="StyleChange" :disabled="!selectedRole"
                class="style-select">
                <option disabled value="">请选择战术形态</option>
                <option v-for="style in filteredStyles(selectedTeam, selectedRole)" :key="style" :value="style">
                    {{ style }}
                </option>
            </select>
            <button @click="showModal = true" :disabled="!selectedStyle">六维属性</button>
        </div>

        <EditStyleModal v-if="showModal" :teamName="selectedTeam" :roleName="selectedRole" :styleName="selectedStyle"
            @close="showModal = false" />
    </div>
</template>

<script setup lang="ts">
import useStylesList from '@/store/stylesList';
import EditStyleModal from '@/components/styleStats.vue';
import { stylesChooseTemp } from '@/store/stylesChooseTemp';
import { ref, watch } from 'vue';

const props = defineProps(['roleNumber']);
const showModal = ref(false);

//队伍、角色、战术形态的初值
const selectedTeam = ref('');
const selectedRole = ref('');
const selectedStyle = ref('');

const stylesListStore = useStylesList();
const teams = ref([] as string[]);

watch(
    () => stylesListStore.styleList,
    (newVal) => {
        if (Object.keys(newVal).length > 0) {
            teams.value = stylesListStore.teamList;
        }
    },
    { immediate: true }
);

const filteredRoles = useStylesList().filteredRoles;
const filteredStyles = useStylesList().filteredStyles;

const TeamChange = () => {
    selectedRole.value = '';
    selectedStyle.value = '';
    stylesChooseTemp().stylechange(props.roleNumber, { team: selectedTeam.value, role: selectedRole.value, style: selectedStyle.value });
};

const RoleChange = () => {
    selectedStyle.value = '';
    stylesChooseTemp().stylechange(props.roleNumber, { team: selectedTeam.value, role: selectedRole.value, style: selectedStyle.value });
};

const StyleChange = () => {
    stylesChooseTemp().stylechange(props.roleNumber, { team: selectedTeam.value, role: selectedRole.value, style: selectedStyle.value });
};

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