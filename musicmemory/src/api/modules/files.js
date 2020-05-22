import {fileGet,filePost} from '@/utils'
export default {
    //上传单个文件
    async saveOneFile(obj) {
        let res = await filePost('/file', obj)
        return res
    },
    //获取文件列表
    async getFileList(){
      let res = await fileGet('/document/list')
        return res
    },
    //根据Id获取文件
    async getFileById(id){
      let res = await fileGet('/files/'+id)
        return res
    },

    async getFileListByDir(dir){
        let res = await fileGet('/files/list',{dirName:dir})
        return res
    }
}