import { defineStore } from 'pinia'

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const UserStore = defineStore('UserStore', {
    state: () => {
        return {
            id:'',
            email: '',
            name:'与时同行',
            email_verified_at:'',
            access_token:'',
            isLogin:false,
            avatar:''
        }
    },

    actions:{
        getInfoOrToken(user,token){
            this.$patch({
                id:user.id,
                email:user.email,
                name:user.name,
                email_verified_at:user.email_verified_at,
                access_token:token,
                avatar:user.avatar,
                isLogin:true
            })
        },
        logout(){
            this.$reset()
        },
        getUser(user){
            this.$patch({
                email:user.email,
                name:user.name,
                email_verified_at:user.email_verified_at,
            })
        }
    },
    persist: {
        enabled: true
    }
})
