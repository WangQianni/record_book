<template>
    <div class="add">
        <!-- 头部 -->
        <mt-header class="statusBar" fixed title="添加">
            <mt-button icon="back" slot="left" @click="back"></mt-button>
            <!-- <mt-button class="goPlantStand" @click="more" slot="right">添加</mt-button> -->
        </mt-header>
        <div class="content">
            <div class="title">
                <input type="text" v-model="init.title" placeholder="输入标题">
            </div>
            <div class="center">
                <textarea cols="40" placeholder="输入想说的内容" v-model="init.content"></textarea>
            </div>
            <input :class="flag ? 'btnColor btns' : 'btns'" type="submit" @click.prevent="submit" value="添加">
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import './add.scss';
</style>


<script>
    export default {
        data() {
            return {
                flag: false,
                init: {
                    title: '',
                    content: '',
                    time: ''
                },
                data: []
            }
        },
        created() {
            // this.data = this.$store.getters.getDataList
            this.data = JSON.parse(localStorage.getItem('data'));
            this.data = !this.data ? [] : this.data;
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            submit() {
                this.flag = true;
                const tm = (new Date().toLocaleString('chinese',{ hour12: false })).split(' ');
                this.init.time = `${tm[0].substr(2)} ${tm[1].substr(0,5)}`
                this.data.push(this.init)
                // this.$store.dispatch('dataList', this.data);
                localStorage.setItem('data', JSON.stringify(this.data))
                this.$router.push('/home');
            }
        }
    }
</script>
