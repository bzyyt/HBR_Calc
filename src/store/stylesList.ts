import { defineStore } from 'pinia';

export interface StyleList {
    [team: string]: {
        [role: string]: string[];
    };
}

export const useStylesList = defineStore('stylesList', {
    state: () => {
        return {
            styleList: {} as StyleList,
        }
    },
    getters: {
        teamList: (state): string[] => {
            return Object.keys(state.styleList);
        }
    },
    actions: {
        async loadStyles() {
            try {
                const response = await fetch('/HBR_Calc/res/data/styles.json');
                const data: StyleList = await response.json();
                this.styleList = data;
            } catch (error) {
                console.error('Failed to load styles:', error);
            }
        },
        filteredRoles(key: string) {
            this.styleList
            return key ? Object.keys(this.styleList[key]) : [];
        },
        filteredStyles(keyTeam: string, keyRole: string) {
            return keyTeam && keyRole
                ? this.styleList[keyTeam][keyRole]
                : [];
        },
    }
});

export default useStylesList;