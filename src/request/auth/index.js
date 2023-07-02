import server from "../index.js";
import {UserStore} from "../../store/index.js";
import Swal from "sweetalert2";

export const login = (email, password, remember) => {
    return server.post('/user/login', {
        email: email,
        password: password,
        remember: remember
    })
}

export const Logout = () => {
    server.post('/user/logout').then(r => {
        const userStore = UserStore();
        userStore.logout()
        Swal.fire({
            icon: 'success',
            text: '已退出登录',
        }).then(r => {
            window.location.href = '/'
        })
    })
}

export const reg = (username, email, password, confirm_password) => {
    return server.post('/user/register',{
        name:username,
        email:email,
        password:password,
        password_confirmation:confirm_password
    })
}

export const user = () => {
  server.get('/user').then(r => {
      UserStore().getUser(r.data.user)
  })
}
