<template>
<div id="container">
    <img
        style="width: 100%;display: block"
            src="@/assets/imgs/logo.png"
    />
    <van-cell-group>
        <van-field
                v-model="account"
                required
                clearable
                label="用户名"
                right-icon="question-o"
                placeholder="请输入用户名"
                style="margin-bottom: 5%"

        />

        <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                style="margin-bottom: 2%"
        />
    </van-cell-group>
    <p style="text-align: right;
    padding-right: 5%;
    margin-bottom: 15%;
">忘记密码？</p>
    <van-button round type="primary" style="
    width: 50%;
    display: block;
    margin: 0 auto;
" size="normal" plain @click="login" >登录</van-button>
    <van-button round type="primary" style="
    width: 50%;
    display: block;
    margin: 0 auto;
" size="normal" plain @click="login" >注册</van-button>
</div>
</template>

<script>
    import {user} from '@/api'
    import { Field } from 'vant';
    import { CellGroup } from 'vant';
    import { Button } from 'vant';
    import store from "@/store";
    export default {
        name: "mobile_login",
        data(){
            return{
                account:'',
                password:''
            }
        },
        components:{
           "van-button":Button,
           "van-field":Field,
            "van-cell-group":CellGroup
        },
        methods:{
            async login(){
               let res =  await user.userLogin({account:this.account,password: this.password})
               console.log(res)
            },
        }
    }
</script>

<style scoped>
    #container{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        justify-items: center;
        flex-direction: column;
    }
</style>
