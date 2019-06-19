<template>
    <div class="home">
        <!-- 头部 -->
        <mt-header class="statusBar" fixed title="日志">
            <mt-button icon="back" slot="left" @click="back" :disabled="!dataList.length ? true:false"></mt-button>
            <mt-button class="goPlantStand" @click="more" slot="right">添加</mt-button>
        </mt-header>
        <!-- 数据列表 -->
        <div class="boxList" v-show="dataList.length ? true:false">
            <div class="dataList" v-for="(item, i) in dataList" :key="i" @click="goLook(i)">
                <span class="left">{{item.title}}</span>
                <span class="right">{{item.time}}</span>
                <span class="delBg" @click.stop="delBtn(i)">x</span>
            </div>
        </div>
        <transition name="fade">
            <div class="model" v-if="showModel" @click="offBtn">
                <div class="modelBox" @click.stop="stopBtn">
                    <div class="modelInner">
                        确定要删除“{{dataList[index].title}}”?
                    </div>
                    <div class="modelBtn">
                        <div class="modeltrue" @click="delTrue">
                            删除
                        </div>
                        <div class="modelfalse" @click="offBtn">
                            取消
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="openModel" v-show="flag"></div>
        <!-- <canvas ref="canvas" width="300" height="300"></canvas> -->
    </div>
</template>

<style scoped lang="scss">
    @import './home.scss';
</style>

<script>
    import { Indicator } from 'mint-ui';
    export default {
        data() {
            return {
                dataList: [],
                index: '',
                showModel: false,
                flag: false,
                a: 1,
                name: ''
            }
        },
        created() {
            // this.dataList = this.$store.getters.getDataList;
            this.dataList = JSON.parse(localStorage.getItem('data'));
            this.dataList = !this.dataList ? [] : this.dataList;

        },
        mounted() {
            // let canvas = this.$refs.canvas;
            // if(canvas.getContext){  //检查是否支持
            //     let ctx = canvas.getContext('2d');
            //     ctx.beginPath();
            //     ctx.lineWidth = 5;
            //     ctx.strokeStyle  = 'red';
            //     ctx.arc(150,150,100,0,Math.PI*2,true)
            //     ctx.moveTo(75,120)
            //     ctx.lineTo(120,120)
            //     ctx.moveTo(175,120)
            //     ctx.lineTo(220,120)
            //     ctx.moveTo(120,150)
            //     ctx.arc(97,150,20,0,Math.PI*2, true)
            //     ctx.moveTo(220,150)
            //     ctx.arc(197,150,20,0,Math.PI*2, true)
            //     ctx.moveTo(150,170)
            //     ctx.lineTo(150,210)
            //     ctx.moveTo(185,210)
            //     ctx.arc(150,150,70,Math.PI/4,Math.PI*3/4,false)
            //     ctx.stroke();
            // }
        },
        methods: {
            star() {
                
            },
            back() {
                this.$router.go(-1);
            },
            more() {
                this.$router.push('/add')
            },
            delBtn(i) {
                this.showModel = true;
                this.index = i
            },
            delTrue() {
                this.dataList.splice(this.index, 1);
                localStorage.setItem('data', JSON.stringify(this.dataList))
                this.showModel = false;
                if(!this.dataList) {
                    this.obj = null;
                    this.dataList = [];
                }
                // this.$store.dispatch('dataList', this.dataList)
            },
            offBtn() {
                this.showModel = false;
            },
            goLook(i) {
                this.flag = true;
                Indicator.open('加载中...');
                this.$router.push(`/look/${i}`)
            },
            stopBtn() {
                return
            }
        },
    }
</script>