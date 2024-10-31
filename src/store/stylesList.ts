import { defineStore } from 'pinia';

export interface StyleList {
    [team: string]: {
        [role: string]: string[];
    };
}

export interface State {
    styleList: StyleList;
    selectedTeam: string;
    selectedRole: string;
    selectedStyle: string;
}

export const useStylesList = defineStore('stylesList', {
    state: (): State => ({
        styleList: {},
        selectedTeam: '',
        selectedRole: '',
        selectedStyle: ''
    }),
    getters: {
        filteredRoles: (state): string[] => {
            return state.selectedTeam ? Object.keys(state.styleList[state.selectedTeam]) : [];
        },
        filteredStyles: (state): string[] => {
            return state.selectedTeam && state.selectedRole
                ? state.styleList[state.selectedTeam][state.selectedRole]
                : [];
        }
    },
    actions: {
        async loadStyles() {
            try {
                const response = await fetch('/../../public/res/data/styles.json');
                const data: StyleList = await response.json();
                this.styleList = data;
            } catch (error) {
                console.error('Failed to load styles:', error);
            }
        },
        updateRoles() {
            if (!this.selectedTeam) {
                this.selectedRole = '';
                this.selectedStyle = '';
            }
        },
        updateStyles() {
            if (!this.selectedRole) {
                this.selectedStyle = '';
            }
        }
    }
});

export default useStylesList;