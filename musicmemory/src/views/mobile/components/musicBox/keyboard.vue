<template>
    <div id="mykey">
        <van-popup
                v-model="show"
                closeable
                position="bottom"
                :style="{ paddingTop: '10%' }"
        >
                <van-field
                        v-model="message"
                        rows="1"
                        autosize
                        type="textarea"
                        placeholder="请输入简谱"
                />

            <van-grid :column-num="8" square>
                <van-grid-item
                        v-for="value in 49"
                        :key="value" @click="input" >
                    {{num[value-1]}}
                </van-grid-item>
                <van-grid-item @click="input" >+</van-grid-item>
                <van-grid-item @click="input" >.</van-grid-item>
                <van-grid-item @click="input" >=</van-grid-item>
                <van-grid-item @click="input" >-</van-grid-item>
                <van-grid-item @click="input" style="font-size: 10px;">空格</van-grid-item>
                <van-grid-item @click="input" >++</van-grid-item>
                <van-grid-item style="font-size: 2rem;color: #AAAAAA" @click="textBack">×</van-grid-item>
                <van-grid-item style="font-size: 16px;font-weight: 600; color: #42b983" @click="submit">done</van-grid-item>
            </van-grid>
        </van-popup>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Popup } from 'vant';
    import { Grid, GridItem } from 'vant';
    import { Field } from 'vant';
    import { Button } from 'vant';

    Vue.use(Button);
    Vue.use(Field);
    Vue.use(Grid).use(GridItem);
    Vue.use(Popup);
    export default {
        name: "keyboard",
        mounted(){
        },
        data() {
            return {
                show: false,
                num:['0','c', 'd', 'e', 'f', 'g', 'a','b','c#','d#','f#','g#','a#',
                    'c!', 'd!','e!', 'f!', 'g!', 'a!','b!','c!#', 'd!#','f!#','g!#','a!#',
                    '1', '2','3', '4', '5', '6','7','1#','2#','4#','5#','6#',
                    '1!', '2!','3!', '4!', '5!', '6!','7!','1!#','2!#','4!#','5!#','6!#',
                    'C',  'D', 'E', 'F', 'G', 'A', 'B','C#','D#','F#','G#','A#',
                    'C!',  'D!', 'E!', 'F!', 'G!', 'A!', 'B!','C!#','D!#','F!#','G!#','A!#',],
                message:'',

            }
        },
        methods:{
            getContainer() {
                return document.querySelector('.my-container');
        },
            input(e){
                // this.message.replace(/#!/g,'!#')
                let text =e.target.innerText;
                if(text==="空格")text=' ';
                    this.message+=text+'|'
            },
            //将message传递给父组件
            submit(){
                this.$emit('getInput',this.message);
            },
            textBack(){
                this.message=this.message.substring(0, this.message.length - 1);
            },
            clearInput(){
                this.message='';
            },
            stopKeyborad () {
                this.$refs.scanTextbox.setAttribute('readonly', 'readonly');
                setTimeout(() => {
                    this.$refs.scanTextbox.removeAttribute('readonly');
                }, 200);
            }

    }
    }
</script>

<style scoped lang="less">
  .tunes_key{
      color: red;
  }
</style>
