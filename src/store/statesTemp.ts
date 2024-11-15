import { defineStore } from 'pinia'
import { useStylesList } from './stylesList'

//战术形态的各项数值的接口
export interface StyleTemp {
    "力量": number,
    "灵巧": number,
    "精神": number,
    "体力": number,
    "智力": number,
    "运气": number,
    "宝珠强化": number,
    "戒指": string,
    "戒指等级": number,
}

//角色的数值
export interface RoleTemp {
    "styles": {
        [style: string]: StyleTemp
    },
    "skills": { [skill: string]: number }
}

export interface StateTemp {
    [team: string]: {
        [role: string]: RoleTemp
    }
}

export const useStateTempStore = defineStore('statesTemp', {
    state: () => {
        return {
            stateTempList: {} as StateTemp
        }
    },
    getters: {

    },
    actions: {
        initStateTemp() {
            const stylesListStore = useStylesList();
            const teams = stylesListStore.teamList;
            teams.forEach(team => {
                const roles = stylesListStore.filteredRoles(team);
                this.stateTempList[team] = {};
                roles.forEach(role => {
                    const styles = stylesListStore.filteredStyles(team, role);
                    this.stateTempList[team][role] = {
                        styles: {},
                        skills: {}
                    };
                    styles.forEach(style => {
                        this.stateTempList[team][role].styles[style] = {
                            "力量": 300,
                            "灵巧": 300,
                            "精神": 300,
                            "体力": 300,
                            "智力": 300,
                            "运气": 300,
                            "宝珠强化": 0,
                            "戒指": "",
                            "戒指等级": 0
                        };
                    });
                });
            });
        },
        getStyleTemp(team: string, role: string, style: string) {
            return this.stateTempList[team][role].styles[style];
        },
        updateStyleTemp(team: string, role: string, style: string, styleTemp: StyleTemp) {
            this.stateTempList[team][role].styles[style] = styleTemp;
        },
    }
})