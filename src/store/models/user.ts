
import { defineStore } from 'pinia'
import { ref } from 'vue'
interface User {
    username: string,
    realname: string,
    email: string,
    sex: number,
    createTime: number,
    role: string,
}
export const useUserStore = defineStore('userState', () => {
    const token = ref('')
    const userInfo = ref({
        username: '',
        realname: '',
        email: '',
        sex: 0,
        createTime: 0,
        role: ''
    })
    const roles = ref([])
    function setToken(newToken: string) {
        token.value = newToken
    }
    function setUserInfo(newInfo: any) {
        userInfo.value = newInfo
    }
    function setRoles(newRoles: any) {
        roles.value = newRoles
    }
    return {
        token,
        userInfo,
        roles,
        setToken,
        setUserInfo,
        setRoles
    }
}, { persist: true })