<template>
    <div class="poc-container">
        <div class="poc-form">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="应用名称">
                    <el-input v-model="formInline.app_name" placeholder="应用名称" clearable />
                </el-form-item>
                <el-form-item label="漏洞名称">
                    <el-input v-model="formInline.vulnerability_name" placeholder="漏洞名称" clearable />
                </el-form-item>
                <el-form-item label="漏洞类型">
                    <el-select v-model="formInline.vulnerability_type" multiple collapse-tags collapse-tags-tooltip
                        :max-collapse-tags="4" placeholder="请选择漏洞类型" style="width: 700px">
                        <el-option v-for="item in options.slice(1)" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="handleAdd">添加</el-button>
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
                    <template #default="scope">
                        <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> -->
                        <el-button size="small" @click="handleDetail(scope.$index)">
                            详细
                        </el-button>
                        <el-button size="small" type="primary" @click="handleUpdate(scope.$index)">
                            修改
                        </el-button>
                        <!-- <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"> -->
                        <el-popconfirm confirm-button-text="是" cancel-button-text="否" icon-color="#626AEF"
                            title="是否确认删除" @confirm="handleDelete(scope.$index)">
                            <template #reference>
                                <el-button size="small" type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 详情弹窗  -->
            <div>
                <el-dialog title="POC内容" v-model="detailVisible" width="50%" :before-close="handleClose">
                    <!-- TODO: v-html会出现XSS攻击问题 -->
                    <pre><code v-html="highlightedYaml"></code></pre>
                    <span class="dialog-footer">
                        <el-button @click="handleClose">关闭</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
        <div class="demo-pagination-block">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="formInline.limit"
                :page-sizes="[10, 20, 30, 40, 50]" :size="size" :background="false"
                layout="sizes, prev, pager, next, jumper" :total="count" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
        <el-dialog align-center v-model="addPocDialogFormVisible" width="42%" destroy-on-close>
            <!--添加学生组件 start-->
            <AddPoc @closeAddPocForm="closeAddPocForm" @success="success" :options="options" />
            <!--添加学生组件 end-->
        </el-dialog>
        <el-dialog align-center v-model="UpdatePocDialogFormVisible" width="42%" destroy-on-close>
            <!--编辑学生组件 start-->
            <UpdatePoc @closeUpdatePocForm="closeUpdatePocForm" @success="success" :options="options"
                :nowItem="tableData[nowIndex]" />
            <!--编辑学生组件 end-->
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import type { TableInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { filterPocApi, deletePocApi } from '@/api/poc/poc'
import AddPoc from './components/AddPoc.vue'
import UpdatePoc from './components/UpdatePoc.vue'
import { onMounted } from 'vue'
import type { ComponentSize } from 'element-plus'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'
import yaml from 'highlight.js/lib/languages/yaml';
hljs.registerLanguage('yaml', yaml);
const size = ref<ComponentSize>('default')
const currentPage = ref(1)
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

const tableData = ref<Poc[]>([])
const count = ref(0)
// 分页逻辑
const onSearch = async () => {
    tableData.value = []
    try {
        const { data } = await filterPocApi(formInline)
        if (data.code === 0) {
            data.data.pocs.forEach((item: Poc) => {
                tableData.value.push(item)
            })
            count.value = data.data.count
        } else {
            ElMessage.error(data.msg)
        }
    } catch (error) {
        console.log(error)
        ElMessage.error('请求服务器超时')
    }
}
const handleDelete = async (index: number) => {
    try {
        const { data } = await deletePocApi(tableData.value[index].id)
        if (data.code === 0) {
            tableData.value.splice(index, 1)
            ElMessage.success("删除成功")
            count.value = count.value - 1
        } else {
            ElMessage.error(data.msg)
        }
    } catch (error) {
        console.log(error)
        ElMessage.error('请求服务器超时')
    }
}
const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
    formInline.limit = val
    tableData.value = []
    onSearch()
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    formInline.offset = (val - 1) * formInline.limit
    tableData.value = []
    onSearch()
}

const detailVisible = ref(false)
const nowIndex = ref(0)

const handleDetail = (val: number) => {
    nowIndex.value = val
    detailVisible.value = true
}
const handleClose = () => {
    nowIndex.value = 0
    detailVisible.value = false
}
const highlightedYaml = computed(() => {
    return hljs.highlight(tableData.value[nowIndex.value].poc_content, { language: 'yaml' }).value
})
const addPocDialogFormVisible = ref(false)
const handleAdd = () => {
    addPocDialogFormVisible.value = true
}
const closeAddPocForm = () => {
    addPocDialogFormVisible.value = false
}
const success = () => {
    addPocDialogFormVisible.value = false
    UpdatePocDialogFormVisible.value = false
    onSearch()
}
const UpdatePocDialogFormVisible = ref(false)
const handleUpdate = (val: number) => {
    nowIndex.value = val
    UpdatePocDialogFormVisible.value = true
}
const closeUpdatePocForm = () => {
    UpdatePocDialogFormVisible.value = false
}
onMounted(() => {
    onSearch()
})
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

pre {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
}

.poc-table {
    margin: 10px;
    border: 1px solid #ededed;
}

.demo-pagination-block {
    display: flex;
    justify-content: right;
    margin: 10px;
}

.dialog-footer {
    /* 按钮居中显示 */
    text-align: center;
    display: flex;
    justify-content: center;
}
</style>