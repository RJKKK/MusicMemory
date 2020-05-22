<template>
    <div id="editInfo">
        <my-nav-bar myTitle="我的信息" :arrow="true"></my-nav-bar>
<!--        <img src="http://192.168.1.105:8080/files-api/files-api/files/userLogo:4486dbb2d35a467fb964019d22b0b542" width="100" alt="">-->
        <van-form @submit="onSubmit">
            <van-field
                    v-model="formObj.name"
                    name="name"
                    label="用户昵称"
                    placeholder="用户昵称"
                    :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                    v-model="formObj.email"
                    name="email"
                    label="邮箱"
                    placeholder="邮箱"
                    :rules="[{ required: true, message: '请填写邮箱' }]"
            />
            <van-field name="uploader" label="修改头像">
                <template #input>
                    <van-uploader v-model="uploader" :after-read="afterRead" max-count="1"/>
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button type="primary" @click="submit" block>提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import myNavBar from '@/views/mobile/components/common/NavBar';
    import {userDetails} from '@/Cookies'
    import Vue from 'vue';
    import { Form } from 'vant';
    import { Field } from 'vant';
    import {files,admin} from '@/api'
    import {fileBaseUrl} from '@/config'
    import { Button } from 'vant';
    import { Uploader } from 'vant';

    Vue.use(Uploader);
    Vue.use(Button);
    Vue.use(Field);
    Vue.use(Form);
    export default {
        name: "editInfo",
        data(){
            return{
             formObj:{
                 name:'',
                 email:'',
                 logoId:''
             },
                uploader: [{ url: 'http://127.0.0.1:8080/files-api/files-api/file?path=userLogo/afbeff2091cb11eaaae4299e9db5fb96.jpg' }],
                userData:null,
            }
        },
        mounted(){
            this.formObj.name = this.userData.name;
            this.formObj.email = this.userData.email;
            this.formObj.logoId = this.userData.logoId
            this.uploader = [{url:fileBaseUrl+userDetails.get().logoId}]
            console.log(this.formObj)
        },
        created(){
            this.$parent.showtabbar=false;
            if(this.$route.query.account)
                this.userData = {...this.$route.query}
            else this.userData = {...userDetails.get()}
        },
        beforeRouteLeave (to, from,next) {
            this.$parent.showtabbar=true;
            next();
        },
        methods:{
            onSubmit(values) {
                console.log('submit', values);
            },
            async submit(){
                let res = await admin.editclient({
                    ...this.formObj,
                    account: userDetails.get().account
                })
                if(res&&res=='ok'){
                    this.$dialog({message:'修改成功'})
                    let obj = {...userDetails.get()}
                    obj.name = this.formObj.name
                    obj.email = this.formObj.email
                    obj.logoId = this.formObj.logoId
                    userDetails.set(obj)
                    this.$router.go(-1)
                }
            },
            async afterRead(file) {
                // 此时可以自行将文件上传至服务器
                let res = await files.saveOneFile(file.file)
                this.formObj.logoId = res.data.url
                if(this.formObj.logoId!==null&&this.formObj.logoId!==''){
                    this.$dialog.alert({message:"头像上传成功！"})
                    this.uploader = [{url:fileBaseUrl+this.formObj.logoId}]
                }
                else this.$dialog.alert({message:"头像上传失败！！"})
            },
        },
        components:{
            myNavBar
        }
    }
</script>

<style scoped>

</style>