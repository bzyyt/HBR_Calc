import { defineStore } from "pinia";

export interface StylesTemp {
    team: string;
    role: string;
    style: string;
}

export const stylesChooseTemp = defineStore("stylesChooseTemp", {
    state: () => {
        return {
            stylesTempList: Array.from({ length: 6 }, (_, i) => ({
                team: '',
                role: '',
                style: ''
            })) as StylesTemp[]
        };
    },
    getters: {
    },
    actions: {
        getstyles(i: number) {
            return this.stylesTempList[i].style;
        },
        getroles(i: number) {
            return this.stylesTempList[i].role;
        },
        getteams(i: number) {
            return this.stylesTempList[i].team;
        },
        stylechange(i: number, temp: StylesTemp) {
            this.stylesTempList[i] = temp;
        },
    }
});