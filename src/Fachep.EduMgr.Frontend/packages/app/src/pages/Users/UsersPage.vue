<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import type { UserDto } from '@edumgr/openapi';
import { UserRole } from '@edumgr/openapi';
import { useUsersStore } from '@/stores/entities/users';
import { PAGE_SIZE } from '@/constants/pagination';
import { useUserProfileStore } from '@/stores/profile';
import { ElMessage, ElMessageBox } from 'element-plus';
import ResourceList from '@/components/list/ResourceList.vue';
import { api } from '@/clients';

const items = ref<UserDto[]>([]);
const loading = ref(false);
const saving = ref(false);
const page = ref(1);
const total = ref(0);

async function load(p = 1) {
  loading.value = true;
  try {
    const offset = (p - 1) * PAGE_SIZE;
    const us = useUsersStore();
    items.value = await us.usersPage(PAGE_SIZE, offset);
    try {
      const cnt = await us.usersCount();
      total.value = cnt ?? 0;
    } catch {
      if ((items.value?.length ?? 0) < PAGE_SIZE) {
        total.value = (p - 1) * PAGE_SIZE + (items.value?.length ?? 0);
      } else {
        total.value = p * PAGE_SIZE + 1;
      }
    }
    page.value = p;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onMounted(() => load(1));
const profileStore = useUserProfileStore();
const canCreate = computed(() => profileStore.isAdmin);

const showNew = ref(false);
const newUserForm = ref({
  name: '',
  email: '',
  userRole: UserRole.User as UserRole,
  userId: null as number | null,
});

function openNewDialog() {
  newUserForm.value = {
    name: '',
    email: '',
    userRole: UserRole.User,
    userId: null,
  };
  showNew.value = true;
}

async function onCreate() {
  if (!newUserForm.value.name || !newUserForm.value.name.trim()) {
    ElMessage.error('请输入用户名称');
    return;
  }
  if (!newUserForm.value.userId) {
    ElMessage.error('请输入账号ID');
    return;
  }

  saving.value = true;
  try {
    await api.usersApi.usersCreate({
      name: newUserForm.value.name,
      email: newUserForm.value.email || null,
      id: newUserForm.value.userId,
      userRole: newUserForm.value.userRole,
    } as UserDto);
    ElMessage.success('创建成功');
    showNew.value = false;
    await load(page.value);
  } catch (err: any) {
    console.error(err);
    ElMessage.error(err?.message || '创建失败');
  } finally {
    saving.value = false;
  }
}

const showEdit = ref(false);
const editUserForm = ref({
  id: 0,
  name: '',
  email: '',
  userRole: UserRole.User as UserRole,
});

function openEditDialog(item: UserDto) {
  editUserForm.value = {
    id: item.id,
    name: item.name || '',
    email: item.email || '',
    userRole: item.userRole,
  };
  showEdit.value = true;
}

async function onUpdate() {
  if (!editUserForm.value.name || !editUserForm.value.name.trim()) {
    ElMessage.error('请输入用户名称');
    return;
  }

  saving.value = true;
  try {
    await api.usersApi.usersUpdate(editUserForm.value.id, {
      id: editUserForm.value.id,
      name: editUserForm.value.name,
      email: editUserForm.value.email || null,
      userRole: editUserForm.value.userRole,
    } as UserDto);
    ElMessage.success('更新成功');
    showEdit.value = false;
    await load(page.value);
  } catch (err: any) {
    console.error(err);
    ElMessage.error(err?.message || '更新失败');
  } finally {
    saving.value = false;
  }
}

const resettingUsers = ref(new Set<number>());

async function resetPassword(userId: number) {
  try {
    await ElMessageBox.confirm('确认为该用户重置密码？重置后将生成新的随机密码。', '重置密码', {
      confirmButtonText: '确认重置',
      cancelButtonText: '取消',
      type: 'warning',
    });

    resettingUsers.value.add(userId);
    try {
      const result = await api.authApi.authForceResetPassword(userId);
      if (result.password) {
        await ElMessageBox.alert(
          `新密码为：${result.password}\n\n请妥善保管并告知用户。`,
          '密码重置成功',
          {
            confirmButtonText: '我已记录',
            type: 'success',
          },
        );
      } else {
        ElMessage.success('密码重置成功');
      }
    } catch (err: any) {
      console.error(err);
      ElMessage.error(err?.message || '重置密码失败');
    } finally {
      resettingUsers.value.delete(userId);
    }
  } catch {}
}

const deletingUsers = ref(new Set<number>());

async function deleteUser(userId: number) {
  try {
    await ElMessageBox.confirm('确认删除该用户？此操作无法撤销。', '删除用户', {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    });

    deletingUsers.value.add(userId);
    try {
      await api.usersApi.usersDelete(userId);
      ElMessage.success('删除成功');
      await load(page.value);
    } catch (err: any) {
      console.error(err);
      ElMessage.error(err?.message || '删除失败');
    } finally {
      deletingUsers.value.delete(userId);
    }
  } catch {}
}

const roleLabels: Record<UserRole, string> = {
  [UserRole.User]: '普通用户',
  [UserRole.Admin]: '管理员',
  [UserRole.Teacher]: '教师',
  [UserRole.Student]: '学生',
};
</script>

<template>
  <div v-loading="loading">
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      "
    >
      <h3>用户</h3>
      <div>
        <el-button v-if="canCreate" type="primary" @click="openNewDialog">新建</el-button>
        <el-button :loading="loading" @click="() => load(page)">刷新</el-button>
      </div>
    </div>

    <el-dialog v-model="showNew" title="新建用户" width="520px" @close="showNew = false">
      <el-form v-loading="saving" :model="newUserForm" label-width="100px">
        <el-form-item label="账号ID" required>
          <el-input-number
            v-model="newUserForm.userId"
            :controls="false"
            :min="1"
            placeholder="请输入账号ID"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="用户名称" required>
          <el-input v-model="newUserForm.name" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="newUserForm.email" placeholder="请输入电子邮箱（可选）" type="email" />
        </el-form-item>
        <el-form-item label="用户角色" required>
          <el-select v-model="newUserForm.userRole" placeholder="请选择角色" style="width: 100%">
            <el-option :value="UserRole.User" label="普通用户" />
            <el-option :value="UserRole.Admin" label="管理员" />
            <el-option :value="UserRole.Teacher" label="教师" />
            <el-option :value="UserRole.Student" label="学生" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showNew = false">取消</el-button>
        <el-button :loading="saving" type="primary" @click="onCreate">创建</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="showEdit" title="编辑用户" width="520px" @close="showEdit = false">
      <el-form v-loading="saving" :model="editUserForm" label-width="100px">
        <el-form-item label="账号ID">
          <el-input :model-value="editUserForm.id" disabled />
        </el-form-item>
        <el-form-item label="用户名称" required>
          <el-input v-model="editUserForm.name" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input
            v-model="editUserForm.email"
            placeholder="请输入电子邮箱（可选）"
            type="email"
          />
        </el-form-item>
        <el-form-item label="用户角色" required>
          <el-select v-model="editUserForm.userRole" placeholder="请选择角色" style="width: 100%">
            <el-option :value="UserRole.User" label="普通用户" />
            <el-option :value="UserRole.Admin" label="管理员" />
            <el-option :value="UserRole.Teacher" label="教师" />
            <el-option :value="UserRole.Student" label="学生" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEdit = false">取消</el-button>
        <el-button :loading="saving" type="primary" @click="onUpdate">保存</el-button>
      </template>
    </el-dialog>

    <ResourceList
      :clickableRow="false"
      :columns="[
        { key: 'id', label: '账号ID', width: '120px' },
        { key: 'name', label: '用户名称', width: '180px' },
        { key: 'email', label: '电子邮箱' },
        { key: 'userRole', label: '角色', width: '120px' },
      ]"
      :items="items"
      :loading="loading"
      :showIndex="false"
      rowKey="id"
    >
      <template #cell-userRole="{ item }">
        <el-tag
          :type="
            item.userRole === UserRole.Admin
              ? 'danger'
              : item.userRole === UserRole.Teacher
                ? 'warning'
                : item.userRole === UserRole.Student
                  ? 'success'
                  : 'info'
          "
        >
          {{ roleLabels[item.userRole as UserRole] || item.userRole }}
        </el-tag>
      </template>
      <template #actions="{ item }">
        <el-button type="text" @click="() => openEditDialog(item as UserDto)">编辑</el-button>
        <el-button
          :disabled="resettingUsers.has(item.id)"
          :loading="resettingUsers.has(item.id)"
          type="text"
          @click="() => resetPassword(item.id)"
        >
          重置密码
        </el-button>
        <el-button
          :disabled="deletingUsers.has(item.id)"
          :loading="deletingUsers.has(item.id)"
          style="color: #f56c6c"
          type="text"
          @click="() => deleteUser(item.id)"
        >
          删除
        </el-button>
      </template>
    </ResourceList>

    <div style="display: flex; justify-content: flex-end; margin-top: 12px">
      <el-pagination
        v-model:current-page="page"
        :page-size="PAGE_SIZE"
        :total="total"
        background
        layout="prev, pager, next"
        @current-change="(p) => load(p)"
      />
    </div>
  </div>
</template>

<style scoped></style>
