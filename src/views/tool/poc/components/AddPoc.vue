<template>
    <el-form ref="ruleFormRef" :rules="rules" :model="formPoc" label-width="80px">
        <el-row>
            <el-col :span="12">
                <el-form-item label="漏洞编号" prop="vulnerability_name">
                    <el-input v-model="formPoc.vulnerability_name" placeholder="请输入漏洞编号" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="poc名称" prop="poc_name">
                    <el-input v-model="formPoc.poc_name" placeholder="请输入poc名称" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="应用名称" prop="app_name">
                    <el-input v-model="formPoc.app_name" placeholder="请输入应用名称" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="漏洞类型" prop="vulnerability_type">
                    <el-select v-model="formPoc.vulnerability_type" placeholder="请选择漏洞类型">
                        <el-option v-for="item in props.options.slice(1)" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <!-- TODO:将输入的content转化为json格式 -->
                <el-form-item label="poc内容" prop="poc_content">
                    <el-input v-model="formPoc.poc_content" :rows="2" type="textarea" placeholder="请输入poc内容" />
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

    <div class="dialong__button--wrap">
        <el-button @click="close">取消</el-button>
        <el-button color="#178557" :loading="subLoading" type="success" @click="addPoc(ruleFormRef)">保存</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { addPocApi } from '@/api/poc/poc'
const props = defineProps(['options'])
// 子给父 自定义事件
const emits = defineEmits(['closeAddPocForm', 'success'])
const subLoading = ref(false)
const formPoc = reactive({
    vulnerability_name: '',
    poc_name: '',
    app_name: '',
    vulnerability_type: '',
    poc_content: ''
})
const ruleFormRef = ref<FormInstance>()
// 定义表单约束规则对象
const rules = reactive<FormRules>({
    poc_name: [{ required: true, message: 'poc名称不能为空', trigger: 'blur' }],
    app_name: [{ required: true, message: '应用名称不能为空', trigger: 'blur' }],
    poc_content: [{ required: true, message: 'poc内容不能为空', trigger: 'blur' }],
})
// 新增poc信息
const addPoc = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        subLoading.value = true
        if (valid) {
            try {
                const { data } = await addPocApi(formPoc)
                if (data.code === 0) {
                    ElMessage.success(data.message)
                    emits('success')
                } else {
                    ElMessage.error(data.message)
                }
            } catch (error) {
                console.log(error)
                ElMessage.error('请求服务器超时')
            }
        } else {
            ElMessage.error('提交失败，你还有未填写的项！')
            console.log('error submit!', fields)
        }
    })
}
// 取消表单
const close = () => {
    emits('closeAddPocForm')
}
</script>

<style scoped>
.dialong__button--wrap {
    text-align: center;
    margin-top: 20px;
}
</style>