import { defineStore } from 'pinia'

export const useStateTempStore = defineStore('stateTemp', {
    state() {
        return {
            character: [{
                team: 0,
                character: 0,
                style: 0
            }]
        }
    }
})