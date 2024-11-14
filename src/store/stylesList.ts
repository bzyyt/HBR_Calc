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
            console.log(4);
            return Object.keys(state.styleList);
        }
    },
    actions: {
        async loadStyles() {
            try {
                const response = await fetch('/HBR_Calc/res/data/styles.json');
                const data: StyleList = await response.json();
                this.styleList = data;
                return true; // 数据加载完成
            } catch (error) {
                console.error('Failed to load styles:', error);
                return false; // 数据加载失败
            }
        },
        filteredRoles(key: string): string[] {
            this.styleList
            return key ? Object.keys(this.styleList[key]) : [];
        },
        filteredStyles(keyTeam: string, keyRole: string): string[] {
            return keyTeam && keyRole
                ? this.styleList[keyTeam][keyRole]
                : [];
        },
    }
});

export default useStylesList;