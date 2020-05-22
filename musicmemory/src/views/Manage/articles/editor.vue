<template>
    <div id="editor">
        <CellGroup>
            <Cell :title="title" :label="author" />
            <cell style="text-align: right;font-size: 10px">修改时间：{{getTime}}</cell>
            <cell style="text-align: right">
                <Button type="success" :disabled="!(this.author!==''&&this.title!=='')" @click="submit">保存</Button>
                <Button @click="goback">返回</Button>
            </cell>
            <cell>
                标题：<Input v-model="title" placeholder="请输入标题" style="width: 300px" />
            </cell>
            <cell>
               作者： <Input v-model="author" placeholder="请输入作者"  style="width: 300px" />
            </cell>
        </CellGroup>

        <div id="toolbar" slot="toolbar">
            <button class="ql-bold" title="加粗">Bold</button>
            <select class="ql-header" title="段落格式">
                <option selected>正文</option>
                <option value="2">标题1</option>
                <option value="3">标题2</option>
                <option value="4">标题3</option>
            </select>
            <button class="ql-list" value="ordered" title="有序列表"></button>
            <button class="ql-list" value="bullet" title="无序列表"></button>
            <select class="ql-color" value="color" title="字体颜色"></select>
            <span class="icon-pic custom-icon" title="图片" @click="insertImgClick($event)"></span>  <!-- 插入图片 -->
            <span class="icon-video custom-icon" title="视频" @click="insertImgClick($event)"></span>  <!-- 插入视频 -->
        </div>
        <input style="display: none;" type="file" id="insert_image" @change="fileInsert($event)">  <!-- 选择图片input -->
        <input style="display: none;" type="file" id="insert_video" @change="fileInsert($event)">  <!-- 选择视频input -->
        <quill-editor
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @focus="onEditorFocus($event)"
                @blur="onEditorBlur($event)"
                @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
    import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
    import {admin} from '@/api'
    //import 'quill/dist/quill.core.css'
    //import 'quill/dist/quill.bubble.css'
    import * as Quill from 'quill'; // 富文本基于quill
    export default {
        name: "editor",
        data () {
            return {
                editor: null,   // 富文本编辑器对象
                author:'',
                title:'',
                content: `<p></p><p><br></p><ol></ol>`, // 富文本编辑器默认内容
                editorOption: { //  富文本编辑器配置
                    modules: {
                        toolbar: '#toolbar'
                    },
                    theme: 'snow',
                    placeholder: '请输入正文'
                },
            }
        },
        components: {
            quillEditor
        },
        mounted() {
            if(this.$route.params.articleId&&this.$route.params.articleId!=='add1'){
                this.getArticlesById(this.$route.params.articleId)
            }
            this.editor = this.$refs.myQuillEditor.quill;
        },
        beforeDestroy() {
            this.editor = null;
            delete this.editor;
        },
        methods:{
            onEditorReady (editor) {},
// 富文本编辑器 失去焦点事件
            onEditorBlur (editor) {},
// 富文本编辑器 获得焦点事件
            onEditorFocus (editor) {},
// 富文本编辑器 内容改变事件
            onEditorChange (editor) {},
            insertImgClick (e) {
                if (e.target.className.indexOf('icon-pic') != -1) {
                    document.getElementById('insert_image').click();
                } else if (e.target.className.indexOf('icon-video') != -1) {
                    document.getElementById('insert_video').click();
                }
            },
// 富文本编辑器 点击插入图片或者视频上传并预览
            fileInsert (e) {
                var oFile = e.target.files[0];
                if (typeof (oFile) === 'undefined') {
                    return;
                }
                let sExtensionName = oFile.name.substring(oFile.name.lastIndexOf('.') + 1).toLowerCase();   // 文件扩展名
                let sfileType = ''; // 上传文件类型
                if (e.target.id == 'insert_image') {
                    sfileType = 'image'
                    if (sExtensionName !== 'png' && sExtensionName !== 'jpg' && sExtensionName !== 'jpeg') {
                        alert('不支持该类型图片');
                        return;
                    }
                }
                if (e.target.id == 'insert_video') {
                    sfileType = 'video';
                    if (sExtensionName !== 'mp4' && sExtensionName !== 'avi' && sExtensionName !== 'mov') {
                        alert('不支持该类型视频');
                        return;
                    }
                    let maxSize = 100*1024*1024;    // 100MB
                    if (oFile.size > maxSize) {
                        alert('上传视频大小不能超过100MB');
                        return;
                    }
                }
                var reader = new FileReader();
                reader.readAsDataURL(oFile);
                reader.onloadend = () => {
                    let formData = new FormData(); // 通过formdata上传
                    formData.append('file', oFile);
                    let sUrl = '';
                    if (sfileType == 'image') {
                        sUrl = 'Pic';
                    }
                    if (sfileType == 'video') {
                        sUrl = 'Vie';
                    }
                    var url = this.api_config + '/dealerIndex/upload' + sUrl + '.htm';
                    this.axios.post(url, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }).then((res) => {
                        this.editor.insertEmbed(this.editor.selection.savedRange.index, sfileType, res.data.data);  // 这个方法用来手动插入dom到编辑器里
                        let isAndroid = this.$is_android(); // 判断是ios还是android
                        if (isAndroid) {
                            $('video').removeAttr('controls');
                            $('video').attr('x5-video-player-type', 'h5');
                        }
                        this.editor.setSelection(this.editor.selection.savedRange.index + 1);  // 这个方法可以获取光标位置
                    }).catch((response) => {
                        console.log('失败', response);
                    })
                }
            },
          async submit(){
               let res = await admin.saveArticle({
                   content:this.content,
                   author: this.author,
                   time:this.getTime,
                   title:this.title
               })
              if(res==='ok')
              this.$Modal.info({
                  content:'保存成功',
                  onOk:()=>{
                      this.goback()
                  }
              });
              else this.$Modal.error({content:'保存失败'})
           },
          async getArticlesById(id){
                let res = await admin.getArticleById(id)
                if(res[0]){
                    this.content = res[0].content
                    this.title = res[0].title
                    this.author = res[0].author
                }
          },
          goback(){
                this.$router.replace({path:'/main/articles/list'})
          }
        },
        computed:{
            getTime(){
                return admin.getDate()
            }
        }

    }
</script>

<style scoped>

</style>