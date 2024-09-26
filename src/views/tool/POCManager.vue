<template>
    <div class="poc-container">
        <div class="poc-form">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="每页条数">
                    <el-select v-model="formInline.limit" placeholder="每页条数" style="width: 100px">
                        <el-option label="10" value=10 />
                        <el-option label="20" value=20 />
                        <el-option label="30" value=30 />
                        <el-option label="40" value=40 />
                        <el-option label="50" value=50 />
                    </el-select>
                </el-form-item>
                <el-form-item label="应用名称">
                    <el-input v-model="formInline.app_name" placeholder="应用名称" clearable />
                </el-form-item>
                <el-form-item label="漏洞名称">
                    <el-input v-model="formInline.vulnerability_name" placeholder="漏洞名称" clearable />
                </el-form-item>
                <el-form-item label="漏洞类型">
                    <el-select v-model="formInline.vulnerability_type" multiple collapse-tags collapse-tags-tooltip
                        :max-collapse-tags="4" placeholder="请选择漏洞类型" style="width: 700px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="poc-table">
            <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%" border>
                <el-table-column type="index" :index="indexMethod" align="center" />
                <el-table-column prop="vulnerability_name" label="漏洞编号" width="180" align="center" />
                <el-table-column prop="poc_name" label="poc名称" align="center" />
                <el-table-column prop="app_name" label="应用名称" align="center" />

                <el-table-column prop="vulnerability_type" label="漏洞类型" width="200" align="center">
                    <template #default="scope">
                        <el-tag type="primary" disable-transitions>{{
                            options[scope.row.vulnerability_type].label }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="add_time" label="添加时间" align="center" />
                <el-table-column label="操作" width="200" align="center">
                    <template #default="">
                        <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> -->
                        <el-button size="small">
                            详细
                        </el-button>
                        <el-button size="small" type="primary">
                            修改
                        </el-button>
                        <!-- <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"> -->
                        <el-button size="small" type="danger">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { TableInstance } from 'element-plus'
const indexMethod = (index: number) => {
    return index + 1
}
const formInline = reactive({
    offset: 0,
    limit: 10,
    app_name: '',
    vulnerability_name: '',
    vulnerability_type: [],
})
const tableRef = ref<TableInstance>()
const options = [
    {
        value: 0,
        label: '未分类',
    },
    {
        value: 1,
        label: '任意文件读取',
    },
    {
        value: 2,
        label: '文件上传',
    },
    {
        value: 3,
        label: '远程命令执行',
    },
    {
        value: 4,
        label: '信息泄露',
    },
    {
        value: 5,
        label: 'JAVA反序列化',
    },
    {
        value: 6,
        label: 'PHP反序列化',
    },
    {
        value: 7,
        label: '水平越权',
    },
    {
        value: 8,
        label: '垂直越权',
    },
    {
        value: 9,
        label: 'SQL注入',
    },
    {
        value: 10,
        label: '跨站脚本攻击(XSS)',
    },
    {
        value: 11,
        label: '服务端请求伪造(SSRF)',
    },
    {
        value: 12,
        label: '服务端模版注入(SSTI)',
    },
    {
        value: 13,
        label: '逻辑缺陷',
    },
    {
        value: 14,
        label: '外部实体注入(XXE)',
    },
    {
        value: 15,
        label: '权限绕过',
    },
    {
        value: 16,
        label: '文件包含',
    },
]
interface Poc {
    id: number
    vulnerability_name: string
    poc_name: string
    app_name: string
    vulnerability_type: number
    add_time: string
    poc_content: string
}
const tableData: Poc[] = [
    {
        id: 1,
        vulnerability_name: 'CVE11111',
        poc_name: 'Tom',
        app_name: 'No. 189, Grove St, Los Angeles',
        vulnerability_type: 12,
        add_time: "2016-05-03",
        poc_content: "",
    },
]
const onSubmit = () => {
    console.log('submit!')
}
</script>

<style>
.demo-form-inline {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
}

.demo-form-inline .el-input {
    --el-input-width: 140px;
}

.poc-container {
    background-color: rgb(255, 255, 255);
    padding: 10px;
    margin: 0;
    height: 100%;
}

.poc-form {
    margin: 10px;
    border: 1px solid #ededed;
    /* 上右下左 */
    padding: 18px 15px 0 15px;
}

.poc-table {
    margin: 10px;
    border: 1px solid #ededed;
}
</style>