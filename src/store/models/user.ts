
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('userState', () => {
    const token = ref('')
    const userInfo = ref({
        userid: '',
        username: '',
        account: '',
        email: '',
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