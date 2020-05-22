import axios from './axios_extend'
import Validate from './validate'
export let get = axios.get
export let post = axios.post
export let fileGet = axios.fileGet
export let filePost = axios.filePost
export let validate = Validate