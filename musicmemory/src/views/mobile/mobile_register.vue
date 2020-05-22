<template>
    <div>
        <my-Nav-Bar myTitle="欢迎注册" ></my-Nav-Bar>
        <img style="width: 75%;display: block;margin: 0 auto;" src="@/assets/imgs/logo.png"/>
        <van-form  @failed="onFailed" @submit="onSubmit">
            <!-- 通过 pattern 进行正则校验 -->
            <van-field
                    v-model="account"
                    name="account"
                    label="用户名"
                    placeholder="请输入用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <!-- 通过 validator 进行函数校验 -->
            <van-field
                    v-model="password"
                    name="password"
                    label="密码"
                    placeholder="请输入密码"
                    type="password"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
            <!-- 通过 validator 进行异步函数校验 -->
            <van-field
                    v-model="email"
                    name="email"
                    label="邮箱"
                    type="email"
                    placeholder="请输入邮箱"
                    :rules="[{ required: true, message: '请填写邮箱' }]"
            />
            <van-field
                    v-model="name"
                    name="name"
                    label="用户昵称"
                    placeholder="请输入用户昵称"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    注册
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Toast } from 'vant';
    import { Form } from 'vant';
    import { Field } from 'vant';
    import { Button } from 'vant';
    import myNavBar from '@/views/mobile/components/common/NavBar';
    import {admin} from '@/api'
    Vue.use(Button);
    Vue.use(Field);
    Vue.use(Form);
    export default {
        data() {
            return {
                account: '',
                password: '',
                email: '',
                name:'',
            };
        },
        components:{
            myNavBar
        },
        name:'mobile_register',
        methods: {
            // 校验函数返回 true 表示校验通过，false 表示不通过
            validator(val) {
                return /1\d{10}/.test(val);
            },
            // 异步校验函数返回 Promise
            asyncValidator(val) {
                return new Promise((resolve) => {
                    Toast.loading('验证中...');

                    setTimeout(() => {
                        Toast.clear();
                        resolve(/\d{6}/.test(val));
                    }, 1000);
                });
            },
            onFailed(errorInfo) {
                console.log('failed', errorInfo);
            },
            async onSubmit(form) {
                let result = await admin.addclient(form)
                if(result==='ok'){
                    this.$dialog.alert({
                        title:'注册成功',
                        messgge:'请前往登录页面登录！'
                    }).then(()=>{
                        this.$router.replace({path:'/login'})
                    })
                }
                else if(result==='fail'){
                    this.$dialog.alert({
                        title:'注册失败',
                        messgge:'用户名或邮箱已存在！'
                    })
                }
                else{
                    this.$dialog.alert({
                        title:'注册失败',
                        messgge:'数据库错误！'
                    })
                }
            },
        },
    };
</script>

<style scoped>

</style>