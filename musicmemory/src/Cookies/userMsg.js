import cookies from 'js-cookie'
let myname = {
    get(){
        let user = cookies.get('myname')
        console.log(user)
        return user
}
}
export default myname