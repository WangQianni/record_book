<template>
    <div class="login">
        <h2><i>Cyni is Baby</i></h2>
        <div class="box">
            <form>
                <input type="text" placeholder="userName" ref="foc" v-model="name">
                <input type="password" placeholder="password" v-model="password">
                <div class="auto">
                    <div class="left">
                        <input type="checkbox" :checked=check @click="checkBtn">
                        <span>自动登录</span>
                    </div>
                    <div class="forget">忘记密码?</div>
                </div>
                <input :class="flag ? 'btnCss updataBtn' : 'btnCss'" type="button" @click.prevent="loginBtn" value="Sign in">
                <div class="gifLogin" v-show="showGif"></div>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import './login.scss';
</style>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                flag: false,
                showGif: false,
                name: '',
                password: '',
                check: false
            }
        },
        created() {
            this.getCookie()
        },
        methods: {
            loginBtn() {
                this.flag = true;
                setTimeout(() => {
                    this.showGif = true
                }, 500);
                if(this.check) this.setCookie(this.name, this.password, this.check, 7);
                if(!this.check) this.setCookie('', '', false, -1);
                if(this.name !== 'wang' || this.password !== '123') {
                    setTimeout(() => {
                        this.showGif = false
                    }, 500);
                    this.flag = false;
                    Toast({
                        message: '账号或密码错误',
                        position: 'bottom',
                        duration: 2000
                    });
                    return
                }
                if(this.name === 'wang' && this.password === '123') return setTimeout(() => {this.$router.push('/home')},700);
            },
            setCookie(name, psd, check, timer) {
                let time = new Date();
                time.setTime(time.getTime() + 24*60*60*1000*timer);
                document.cookie = `password=${psd};expires=${time.toUTCString()}`;
                document.cookie = `check=${check};expires=${time.toUTCString()}`;
                document.cookie = `name=${name};expires=${time.toUTCString()}`
                console.log(document.cookie)
            },
            getCookie() {
                let ck = document.cookie;
                console.log(ck)
                if(ck.length) {
                    let splits = ck.split('; ')
                    let arr = [];
                    splits.forEach((v, i) => {
                        arr.push(v.split('='))
                    })
                    arr.forEach((v, i) => {
                        if(v[0] == 'name') this.name = v[1];
                        if(v[0] == 'password') this.password = v[1];
                        if(v[0] == 'check') this.check = v[1];
                    })
                    return;
                }
            },
            checkBtn() {
                this.check = !this.check
            }
        },
        mounted() {
            this.$refs.foc.focus()
        }
    }
</script>