<template>
    <div class="look" @touchmove="move">
        <mt-header class="statusBar" fixed title="回忆">
            <mt-button icon="back" slot="left" @click="back"></mt-button>
            <mt-button @click="more" slot="right">修改</mt-button>
        </mt-header>
        <div class="content">
            <input :class="disabled ? 'title' : 'title styleTitle'" ref="foc" :disabled='disabled' v-model="obj.title"/>
            <button class="btnPlay" @click="playerBtn">
                <img :src="player ? require('../../assets/images/play.jpg') : require('../../assets/images/stop.jpg')">
            </button>
            <textarea cols="40" :class="disabled ? 'inner' : 'inner styleInner'" :disabled = 'disabled' v-model="obj.content"></textarea>
            <p>{{obj.time}}</p>
            <button class="btns" @click.prevent="submitBtn" v-show="!disabled ? true: false">保存</button>
            <audio ref="autoPlay" :src="require('../../assets/images/once.mp3')" type='audio/mp3'></audio>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import './look.scss';
</style>

<script>
    import { Indicator } from 'mint-ui';
    export default {
        data() {
            return {
                id: '',
                disabled: true,
                obj: null,
                objData: null,
                dataTableList: [],
                player: false,
                flag: true ,
            }
        },
        created() {
            // this.dataTableList = this.$store.getters.getDataList;
            this.dataTableList = JSON.parse(localStorage.getItem('data'));
            this.dataTableList = !this.dataTableList ? [] : this.dataTableList;
            this.id = this.$route.params.id;
            this.obj = {
                title: this.dataTableList[this.id].title,
                content: this.dataTableList[this.id].content,
                time: this.dataTableList[this.id].time
            }
            setTimeout(() => {
                Indicator.close();
            },100)
        },
        mounted() {
            this.$refs.autoPlay.autoplay = true;
            this.$refs.autoPlay.pause();
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            more() {
                this.disabled = false;
                this.$nextTick(() => {
                    this.$refs.foc.focus();
                })
            },
            move() {
                if(this.flag) {
                    this.flag = false;
                    this.player = false;
                    this.$refs.autoPlay.play();
                }
            },
            submitBtn() {
                const tm = (new Date().toLocaleString('chinese',{ hour12: false })).split(' ');
                this.objData = {
                    title: this.obj.title,
                    content: this.obj.content,
                    time: `${tm[0].substr(2)} ${tm[1].substr(0,5)}`
                }
                this.dataTableList.splice(this.id, 1, this.objData);
                // this.$store.dispatch('dataList', this.dataTableList);
                localStorage.setItem('data', JSON.stringify(this.dataTableList));
                this.$router.push('/home')
            },
            playerBtn() {
                this.player = !this.player
                if(this.player) {
                    this.$refs.autoPlay.pause();
                }else {
                    this.$refs.autoPlay.play();
                }
            }
        },
    }
</script>
