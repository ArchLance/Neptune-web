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
                <el-form-item label="poc内容" prop="poc_content">
                    <el-input v-model="formPoc.poc_content" :rows="20" type="textarea" placeholder="请输入poc内容" />
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

    <div class="dialong__button--wrap">
        <el-button @click="close">取消</el-button>
        <el-button color="#178557" :loading="subLoading" type="success" @click="updatePoc(ruleFormRef)">保存</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { updatePocApi } from '@/api/poc/poc'
import yaml from 'js-yaml'
const props = defineProps(['options', 'nowItem'])
// 子给父 自定义事件
const emits = defineEmits(['closeUpdatePocForm', 'success'])
const subLoading = ref(false)
const formPoc = reactive({
    id: props.nowItem.id,
    vulnerability_name: props.nowItem.vulnerability_name,
    poc_name: props.nowItem.poc_name,
    app_name: props.nowItem.app_name,
    vulnerability_type: props.nowItem.vulnerability_type,
    poc_content: props.nowItem.poc_content
})
const ruleFormRef = ref<FormInstance>()
// 定义表单约束规则对象
const rules = reactive<FormRules>({
    poc_name: [{ required: true, message: 'poc名称不能为空', trigger: 'blur' }],
    app_name: [{ required: true, message: '应用名称不能为空', trigger: 'blur' }],
    poc_content: [{ required: true, message: 'poc内容不能为空', trigger: 'blur' }],
})
// 新增poc信息
const updatePoc = async (formEl: FormInstance | undefined) => {
    try {
        // 尝试解析 YAML
        const parsedYaml = yaml.load(formPoc.poc_content)
        // 如果解析成功，重新格式化 YAML
        formPoc.poc_content = yaml.dump(parsedYaml, {
            indent: 2,
            lineWidth: -1,
            noRefs: true,
            sortKeys: false
        })
    } catch (error) {
        ElMessage.error('YAML 格式错误')
        return
    }
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        subLoading.value = true
        if (valid) {
            try {
                const { data } = await updatePocApi(formPoc)
                if (data.code === 0) {
                    ElMessage.success(data.msg)
                    emits('success')
                } else {
                    ElMessage.error(data.msg)
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
    emits('closeUpdatePocForm')
}
</script>

<style scoped>
.dialong__button--wrap {
    text-align: center;
    margin-top: 20px;
}
</style>