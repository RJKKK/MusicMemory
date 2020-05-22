/**
 * api接口的统一出口
 */
import admin from '@/api/modules/admin.js'
// import user from '@/api/modules/user.js'
import user from '@/api/modules/user.js'
import register_user from '@/api/modules/register_user.js'
import files from '@/api/modules/files.js'
export {
    admin,user,register_user,files
}