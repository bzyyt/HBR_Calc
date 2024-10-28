import { defineStore } from 'pinia'

export const useStylesList = defineStore('stylesList', {
    //存储数据的地方
    state() {
        return {
            styleList: [{
                teamName: '31A',
                number: 0,
                character: [{
                    id: 'RukaKayamori',
                    name: '茅森月歌',
                    number: 0,
                    style: [
                        {
                            id: '31A01A0001',
                            name: 'Attack or Music',
                            number: 0,
                        }
                    ]
                },
                {
                    id: 'YukiLzumi',
                    name: '和泉由希',
                    number: 1,
                    style: []
                },
                {
                    id: 'MegumiAikawa',
                    name: '逢川惠',
                    number: 2,
                    style: []
                },
                {
                    id: 'TsukasaTojo',
                    name: '东城司',
                    number: 3,
                    style: []
                },
                {
                    id: 'KarenAsakura',
                    name: '朝仓可怜',
                    number: 4,
                    style: []
                },
                {
                    id: 'TamaKunimi',
                    name: '国见玉',
                    number: 5,
                    style: []
                }]
            },
            {
                teamName: '31B',
                number: 1,
                character: [{
                    id: 'ErikaAoi',
                    name: '苍井绘里香',
                    number: 0,
                    style: [
                        {
                            id: '31B01A0001',
                            name: '战场的落英',
                            number: 0,
                        }
                    ]
                }]
            },
            {
                teamName: '31C',
                number: 2,
                character: []
            },
            {
                teamName: '31D',
                number: 3,
                character: []
            },
            {
                teamName: '31D',
                number: 4,
                character: []
            },
            {
                teamName: '31E',
                number: 5,
                character: []
            },
            {
                teamName: '31F',
                number: 6,
                character: []
            },
            {
                teamName: '31X',
                number: 7,
                character: []
            },
            {
                teamName: '30G',
                number: 8,
                character: []
            },
            {
                teamName: 'AB',
                number: 9,
                character: []
            }
            ]
        }
    }
})