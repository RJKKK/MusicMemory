<template>
    <div id="login">
        <h2>管理员登入</h2>
        <div class="row">
            <input type="text" id='username'>
            <label for="username">用户名</label>
        </div>
        <div class="row">
            <input type="password" id='pwd'>
            <label for="pwd">密码</label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Manage_login"
    }
</script>

<style scoped lang="less">
    html{
        font-size:15px;
    }
    #login{
        margin:0;
        background-color: #29f1c3;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        min-height:100vh;
    }
    .row{
        width: 600px;
        margin:.6rem 0;
        position: relative;
        // display:flex;
        // justify-content:center;
        // align-items:center;
        // flex-direction:column;
        // min-height:100vh;


    }
    .row input{
        font-size:1rem;
        border: 1px green solid;
        border-radius:4px;
        box-sizing:border-box;
        padding:.8rem 1rem;
        box-shadow:0px 1px 2px rgba(0,0,0,.25);
        width: 100%;
        outline:none;
        // placeholder:' ';
    }
    .row label{
        position:absolute;
        left:0px;
        padding-left:1rem;
        padding-top:.8rem;
        transition:all .3s ease-in-out;
    }
    .row input:focus + label{
        transform:translatex(calc(-100% - 1rem));
    }
    // not(:placeholder-shown)的语义为不显示输入框预设文字的时候也可以理解为输入框存在文字的时候
    .row input:not(:focus):not(:placeholder-shown) + label{
        color:rgba(0,0,0,0)
    }
</style>