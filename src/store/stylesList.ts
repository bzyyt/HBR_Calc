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
    styleAttributes: { [style: string]: number[] };
}

export const useStylesList = defineStore('stylesList', {
    state: (): State => ({
        styleList: {},
        selectedTeam: '',
        selectedRole: '',
        selectedStyle: '',
        styleAttributes: {}
    }),
    getters: {
        filteredRoles: (state): string[] => {
            return state.selectedTeam ? Object.keys(state.styleList[state.selectedTeam]) : [];
        },
        filteredStyles: (state): string[] => {
            return state.selectedTeam && state.selectedRole
                ? state.styleList[state.selectedTeam][state.selectedRole]
                : [];
        },
        getAllStyles: (state): { team: string, role: string, style: string, attributes: number[] }[] => {
            const styles = [];
            for (const team in state.styleList) {
                for (const role in state.styleList[team]) {
                    for (const style of state.styleList[team][role]) {
                        styles.push({
                            team,
                            role,
                            style,
                            attributes: state.styleAttributes[style] || Array(7).fill(0)
                        });
                    }
                }
            }
            return styles;
        }
    },
    actions: {
        async loadStyles() {
            try {
                const response = await fetch('/HBR_Calc/res/data/styles.json'); // 使用绝对路径
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
        },
        saveAttributes(style: string, attributes: number[]) {
            this.styleAttributes[style] = attributes;
        }
    }
});

export default useStylesList;