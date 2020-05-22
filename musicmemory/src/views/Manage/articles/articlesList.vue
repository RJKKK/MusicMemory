<template>
    <div>
        <router-link to="/main/articles/content/add1"  style="margin-bottom: 30px" tag="Button" type="primary">新增文章</router-link>
        <i-table  border :columns="cols" :data="articlesList"></i-table>
    </div>

</template>

<script>
    import {admin} from '@/api'
    export default {
        name: "articles",
        data () {
            return {
                cols: [
                    {
                        title: '编号',
                        key: '_id',
                    },
                    {
                        title: '文章标题',
                        key: 'title',
                    },
                    {
                        title: '作者',
                        key: 'author',

                    },
                    {
                        title: '修改时间',
                        key: 'time',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 120,
                        fixed:'right',
                        render: (h,par) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                    },
                                    domProps:{
                                        proxy:par.row._id
                                    },
                                    on:{
                                        click:(e)=>{
                                            let id= e.target.parentElement.proxy||e.target.proxy;
                                            // let client = this.articlesList.find((item)=>item._id===id);
                                            this.$router.push({path:`/main/articles/content/${id}`})
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    domProps:{
                                        proxy:par.row._id
                                    },
                                    on:{
                                        click:(e)=>{
                                            let id= e.target.parentElement.proxy||e.target.proxy;
                                            this.$Modal.confirm({
                                                titile:'提示',
                                                content:'删除后不可恢复，真的删除吗？',
                                                okText:'确定',
                                                cancelText:'算了',
                                                onOk:()=>{
                                                    admin.delArticleById(id).then(res=>{
                                                        if (res==='ok')
                                                        {
                                                            this.$Modal.info({content:'删除成功！'})
                                                            this. getArticleList()
                                                        }
                                                        else this.$Modal.info({content:'删除失败！'})
                                                    },()=>{
                                                        this.$Modal.info({content:'接口出错！'})
                                                    })
                                                }
                                            })
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                articlesList: [
                ],
            }
        },
        methods:{
          async getArticleList(){
              let data = await admin.getArticlesList(10,1)
              this.articlesList = data
          }
        },
        mounted() {
            this.getArticleList()
        },

    }
</script>

<style scoped>

</style>