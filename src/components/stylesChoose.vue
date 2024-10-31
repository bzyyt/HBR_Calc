<template>
    <div class="styleschoose">
        <div>角色{{ roleNumber }}：
            <select id="team-select" v-model="selectedTeam" @change="updateRoles">
                <option disabled value="">请选择队伍</option>
                <option v-for="(people, team) in teams" :key="team" :value="team">
                    {{ team }}
                </option>
            </select>
            <select id="role-select" v-model="selectedRole" @change="handleRoleChange" :disabled="!selectedTeam">
                <option disabled value="">请选择角色</option>
                <option v-for="role in filteredRoles" :key="role" :value="role" :disabled="isRoleSelected(role)">
                    {{ role }}
                </option>
            </select>
            <select id="style-select" v-model="selectedStyle" :disabled="!selectedRole">
                <option disabled value="">请选择战术形态</option>
                <option v-for="style in filteredStyles" :key="style" :value="style">
                    {{ style }}
                </option>
            </select>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import useStylesList from '@/store/stylesList'; // 确保路径正确

export default defineComponent({
    name: 'StylesChoose',
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
            }
        };
        const updateStyles = () => {
            if (!selectedRole.value) {
                selectedStyle.value = '';
            }
        };

        const handleRoleChange = () => {
            emit('update-role', props.roleNumber, selectedRole.value);
        };

        const isRoleSelected = (role: string) => {
            return props.selectedRoles.includes(role) && role !== selectedRole.value;
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
            isRoleSelected
        };
    }
});
</script>

<style></style>