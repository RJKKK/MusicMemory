<template>
   <div class="layout">
      <Layout>
         <Header>
            <Menu mode="horizontal" theme="dark" active-name="1">
               <div class="layout-logo"></div>
               <div class="layout-nav">
                  <MenuItem name="1">
                     <Icon type="ios-navigate"></Icon>
                     Item 1
                  </MenuItem>
                  <MenuItem name="2">
                     <Icon type="ios-keypad"></Icon>
                     Item 2
                  </MenuItem>
                  <MenuItem name="3">
                     <Icon type="ios-analytics"></Icon>
                     Item 3
                  </MenuItem>
                  <MenuItem name="4"  tag="div" >
                     <div @click="quit">
                     <Icon type="ios-paper" ></Icon>
                     退出
                     </div>
                  </MenuItem>
               </div>
            </Menu>

         </Header>
         <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
               <Menu active-name="" theme="light" width="auto" :open-names="['1']">
                  <Submenu name="1">
                     <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        管理
                     </template>
                     <MenuItem name="1-1" replace to="/main/usr">用户管理</MenuItem>
                     <MenuItem name="1-2" replace to="/main/articles">文章管理</MenuItem>
                     <MenuItem name="1-3" replace to="/main/course">课程管理</MenuItem>
                  </Submenu>
                  <Submenu name="2">
                     <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        简谱管理
                     </template>
                     <MenuItem name="2-1">Option 1</MenuItem>
                     <MenuItem name="2-2">Option 2</MenuItem>
                  </Submenu>
                  <Submenu name="3">
                     <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        Item 3
                     </template>
                     <MenuItem name="3-1">Option 1</MenuItem>
                     <MenuItem name="3-2">Option 2</MenuItem>
                  </Submenu>
               </Menu>
            </Sider>
            <Layout :style="{padding: '0 24px 24px'}">
               <Breadcrumb :style="{margin: '24px 0'}">
                  <BreadcrumbItem>Home</BreadcrumbItem>
                  <BreadcrumbItem>Components</BreadcrumbItem>
                  <BreadcrumbItem>Layout</BreadcrumbItem>
               </Breadcrumb>
               <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                  <router-view></router-view>
               </Content>
            </Layout>
         </Layout>
      </Layout>
   </div>
</template>

<script>
   import handler from '../../api/modules/admin.js'
    export default {
        name: "Manage",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
           quit(){
              // console.log(1111)
              handler.quitLogin()
           },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
   .layout{
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
   }
   .layout-logo{
      width: 100px;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      float: left;
      position: relative;
      top: 15px;
      left: 20px;
   }
   .layout-nav{
      width: 420px;
      margin: 0 auto;
      margin-right: 20px;
   }
</style>
