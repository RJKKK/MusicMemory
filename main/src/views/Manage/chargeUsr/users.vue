<template>
<div>
    <i-input search enter-button placeholder="Enter something..." />
    <Table stripe :columns="colData" :data="usrInfo" style="margin-top: 30px"></Table>
    <Page :total="100"  style="margin-top: 30px"/>
    <Button @click="addSwitch = true" type="primary"  style="margin-top: 30px">新增用户</Button>
    <div>
        <Drawer
                title="新增用户"
                v-model="addSwitch"
                width="720"
                :mask-closable="false"
                placement="left"
                :styles="styles"
        >
            <div >
                <img src="" alt="" style="display: block" ref="usrLogo" >
            </div>
            <Form :model="addForm">
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="用户账号" label-position="top">
                            <i-input v-model="addForm.account" placeholder="please enter user name" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="用户密码" label-position="top">
                            <i-input v-model="addForm.password" type="password" placeholder="please select an password"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="用户昵称" label-position="top">
                            <i-input v-model="addForm.name" placeholder="please choose the type"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="邮箱" label-position="top">
                            <i-input v-model="addForm.email" placeholder="please choose the type"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="addSwitch = false">取消</Button>
                <Button type="primary" @click="addUsers">提交</Button>
            </div>
        </Drawer>
        <Drawer
                title="编辑用户"
                v-model="editSwitch"
                width="720"
                :mask-closable="false"
                :styles="styles"
        >
            <div  style="width: 100px;height: 100px; margin: 0 auto; border-radius: 50%; overflow: hidden">
                <img src="" alt="" style="display: block; width: 100%; height: 100%;background-color: rgba(0,0,0,.3)" ref="usrLogo">
            </div>
            <Form :model="editForm">
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="用户账号" label-position="top">
                            <i-input v-model="editForm.account" placeholder="please enter user name" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="用户密码" label-position="top">
                            <i-input v-model="editForm.password" type="password" placeholder="please select an password"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="用户昵称" label-position="top">
                            <i-input v-model="editForm.name" placeholder="please choose the type"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="邮箱" label-position="top">
                            <i-input v-model="editForm.email" placeholder="please choose the type"/>
                        </FormItem>
                    </Col>
                </Row>
                <Upload
                        @on-success="imgSuccess"
                        @on-progress="imgProgress"
                        type="drag"
                        :action="imgUploadUrl"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        multiple
                        :before-upload="beforeupload">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                    </div>
                </Upload>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="editSwitch = false">取消</Button>
                <Button type="primary" @click="">提交</Button>
            </div>
        </Drawer>
        <Modal
                v-model="modal1"
                title="通知"
                @on-ok="ok"
                @on-cancel="cancel">
            <p>删除后无法恢复</p>
            <p>是否确认删除？</p>
        </Modal>
    </div>
</div>
</template>

<script>
    import {admin} from '@/api'
    export default {
        account: "users",
        data () {
            return {
                //列数据（表头定义）
                account:'',
                modal1: false,
                colData: [
                    {
                        title: '账号',
                        key: 'account'
                    },
                    {
                        title: '用户昵称',
                        key: 'name'
                    },
                    {
                        title: '添加时间',
                        key: 'Date'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {title:"管理",
                        render: (h,par) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                    },
                                    domProps:{
                                        proxy:par.row.account
                                    },
                                    // attrs:{
                                    //     "actionid":
                                    // },
                                    on:{
                                        click:(e)=>{
                                           let id= e.target.parentElement.proxy||e.target.proxy;
                                           let client = this.usrInfo.find((item)=>item.account===id);
                                           this.editForm={
                                               account:client.account,
                                               name:client.name,
                                               password:client.password,
                                               email:client.email,
                                           };
                                            this.imgUploadUrl='/api/setLogo/'+client.Uid;
                                            this.$refs.usrLogo.src="/api/"+client.Uid+'/logo.jpg'
                                           this.editSwitch=true
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    domProps:{
                                        proxy:par.row.account
                                    },
                                    on:{
                                        click:(e)=>{
                                            let account= e.target.parentElement.proxy||e.target.proxy;
                                            this.account=account
                                            this.modal1 = true
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                //用户数据列表
                usrInfo: [],
                //新增用户弹窗开关
                addSwitch: false,
                //编辑用户弹窗开关
                editSwitch:false,
                //需要样式
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                //上传图片的接口url
                imgUploadUrl:'',
                //新增用户表单框数据
                addForm: {
                    account:'',
                    name: '',
                    password: '',
                    email:''
                },
                //编辑用户表单框数据
                editForm: {
                    account:'',
                    name: '',
                    password: '',
                    email:''
                },
                visible: false,
            }
        },
        mounted(){
            // admin.getAllUsr((res)=>{
            //     console.log(res)
            //     if(res&&res.status===200) this.usrInfo=res.data;
            //     else {
            //         console.log("数据获取失败!")
            //     }
            // });
                this.getClientsList(10,1)
            },
        methods:{
            async getClientsList(pageSize,index){
                this.usrInfo = await admin.getClients(pageSize,index)
            },
           async addUsers(){
              let res = await admin.addclient(this.addForm)
               if(res==="ok") this.getClientsList(10,1)
               else this.$Notice.error({title: '通知', desc: '添加出错！. '});
                this.addSwitch=false;
            },
            beforeupload(data){
                let reader = new FileReader()
                reader.readAsDataURL(data)
                reader.onload=()=>{
                    this.$refs.usrLogo.src = reader.result
                }

            },
            imgProgress(event,file,filelist){
                console.log(event)
                console.log(file)
                console.log(filelist)
            },
            imgSuccess(res){
                console.log(res)
            },
           async ok () {
                let result = await admin.delclient({account:this.account})
                if(result=='ok'){
                  this.getClientsList(10,1);
                  this.$Message.info('删除成功！');
                }
                else this.$Message.info('删除失败！');

            },
            cancel () {
                this.$Message.info('取消删除');
            }
        }
    }
</script>

<style scoped>
    .demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
