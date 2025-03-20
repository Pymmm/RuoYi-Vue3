<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="部门编码" prop="departmentCode">
        <el-input
            v-model="queryParams.departmentCode"
            placeholder="请输入部门编码"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="组织编码" prop="organizationCode">
        <el-input
            v-model="queryParams.organizationCode"
            placeholder="请输入组织编码"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="组织名称" prop="organizationName">
        <el-input
            v-model="queryParams.organizationName"
            placeholder="请输入组织名称"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="一级编码" prop="unitCode">
        <el-input
            v-model="queryParams.unitCode"
            placeholder="请输入一级编码"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="一级单位" prop="unitName">
        <el-input
            v-model="queryParams.unitName"
            placeholder="请输入一级单位"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="二级编码" prop="subUnitCode">
        <el-input
            v-model="queryParams.subUnitCode"
            placeholder="请输入二级编码"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="二级单位" prop="subUnitName">
        <el-input
            v-model="queryParams.subUnitName"
            placeholder="请输入二级单位"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="Plus"
            @click="handleAdd"
            v-hasPermi="['mdm:department:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            icon="Edit"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['mdm:department:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="Delete"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['mdm:department:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            v-hasPermi="['mdm:department:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="departmentList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="部门ID" align="center" prop="id"/>
      <el-table-column label="部门编码" align="center" prop="departmentCode"/>
      <el-table-column label="组织编码" align="center" prop="organizationCode"/>
      <el-table-column label="组织名称" align="center" prop="organizationName"/>
      <el-table-column label="一级编码" align="center" prop="unitCode"/>
      <el-table-column label="一级单位" align="center" prop="unitName"/>
      <el-table-column label="二级编码" align="center" prop="subUnitCode"/>
      <el-table-column label="二级单位" align="center" prop="subUnitName"/>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                     v-hasPermi="['mdm:department:edit']">修改
          </el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['mdm:department:remove']">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="total>0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
    />

    <!-- 添加或修改部门管理对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="departmentRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="组织编码" prop="organizationCode">
          <el-input v-model="form.organizationCode" placeholder="请输入组织编码"/>
        </el-form-item>
        <el-form-item label="组织名称" prop="organizationName">
          <el-input v-model="form.organizationName" placeholder="请输入组织名称"/>
        </el-form-item>
        <el-form-item label="一级编码" prop="unitCode">
          <el-input v-model="form.unitCode" placeholder="请输入一级编码"/>
        </el-form-item>
        <el-form-item label="一级单位" prop="unitName">
          <el-input v-model="form.unitName" placeholder="请输入一级单位"/>
        </el-form-item>
        <el-form-item label="二级编码" prop="subUnitCode">
          <el-input v-model="form.subUnitCode" placeholder="请输入二级编码"/>
        </el-form-item>
        <el-form-item label="二级单位" prop="subUnitName">
          <el-input v-model="form.subUnitName" placeholder="请输入二级单位"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Department">
import {listDepartment, getDepartment, delDepartment, addDepartment, updateDepartment} from "@/api/mdm/department";

const {proxy} = getCurrentInstance();

const departmentList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    departmentCode: null,
    organizationCode: null,
    organizationName: null,
    unitCode: null,
    unitName: null,
    subUnitCode: null,
    subUnitName: null,
  },
  rules: {
    organizationCode: [
      {required: true, message: "组织编码不能为空", trigger: "blur"}
    ],
    organizationName: [
      {required: true, message: "组织名称不能为空", trigger: "blur"}
    ],
  }
});

const {queryParams, form, rules} = toRefs(data);

/** 查询部门管理列表 */
function getList() {
  loading.value = true;
  listDepartment(queryParams.value).then(response => {
    departmentList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    departmentCode: null,
    organizationCode: null,
    organizationName: null,
    unitCode: null,
    unitName: null,
    subUnitCode: null,
    subUnitName: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null
  };
  proxy.resetForm("departmentRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加部门管理";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getDepartment(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改部门管理";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["departmentRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateDepartment(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addDepartment(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除部门管理编号为"' + _ids + '"的数据项？').then(function () {
    return delDepartment(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {
  });
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('mdm/department/export', {
    ...queryParams.value
  }, `department_${new Date().getTime()}.xlsx`)
}

getList();
</script>
