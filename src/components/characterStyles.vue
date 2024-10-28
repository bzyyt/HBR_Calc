<template>
<div class = "characterstyles">
    <h2>战斗风格选择</h2>
    <div>角色1：
        <select id="team-select" v-model.number="stateTempStore.character[0].team">
            <option v-for="team in stylesList.styleList" :value="team.number">{{ team.teamName }}</option>
        </select>
        <select v-model.number="stateTempStore.character[0].character">
            <option v-for="character in stylesList.styleList[stateTempStore.character[0].team].character" :value="character.number">{{ character.name }}</option>
        </select>
        <select v-model.number="stateTempStore.character[0].style">
            <option v-for="style in stylesList.styleList[stateTempStore.character[0].team].character[stateTempStore.character[0].character].style" :value="style.number">{{ style.name }}</option>
        </select>
    </div>
    <button @click="test">test</button>
</div>
</template>

<script setup lang ='ts' name="CharacterStyles">
import { ref } from 'vue'
import {useStateTempStore} from '@/store/stateTemp'
import {useStylesList} from '@/store/stylesList'

const stateTempStore = useStateTempStore()
const stylesList = useStylesList()
console.log(stylesList.styleList[0].character[0].style[0].name)

function test(){
    console.log(stateTempStore.character[0].team)
}
</script>

<style></style>