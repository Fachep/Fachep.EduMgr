<template>
  <el-header class="app-header">
    <div class="header-left">
      <h3 class="app-title">EduMgr</h3>
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item
          v-for="item in breadcrumbs"
          :key="item.path"
          :to="item.path ? { path: item.path } : undefined"
        >
          {{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <el-dropdown v-if="profileStore.profile" @command="handleCommand">
        <span class="user-info">
          <span class="user-name">{{ profileStore.profile.name || '用户' }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button v-else link @click="goLogin">登录</el-button>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { useUserProfileStore } from '@/stores/profile';
import { logoutAsync } from '@/clients/auth';
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();
const profileStore = useUserProfileStore();

const routeNameMap: Record<string, string> = {
  '/home': '首页',
  '/profile': '个人中心',
  '/students': '学生',
  '/classes': '班级',
  '/enrollments': '选课',
  '/courses': '课程',
  '/subjects': '学科',
  '/schedules': '排课',
  '/timetable': '课表',
  '/teachers': '教师',
  '/departments': '学院/部门',
  '/majors': '专业',
  '/users': '用户',
  '/config': '系统配置',
};

const breadcrumbs = computed(() => {
  const path = route.path;
  if (path === '/home' || path === '/') return [{ label: '首页', path: undefined }];

  if (path.includes('/manage') || path.includes('/create')) {
    const parts = path.split('/').filter((p) => p);
    const items = [];

    if (parts.length > 0) {
      const parentPath = '/' + parts[0];
      const parentName = routeNameMap[parentPath];
      if (parentName) {
        items.push({ label: parentName, path: parentPath });
      }
    }

    if (path.includes('/create')) {
      items.push({ label: '新建', path: undefined });
    } else if (path.includes('/manage')) {
      items.push({ label: '管理', path: undefined });
    }

    return items;
  }

  const name = routeNameMap[path];
  return name ? [{ label: name, path: undefined }] : [];
});

async function handleCommand(command: string) {
  if (command === 'profile') {
    router.push('/profile');
  } else if (command === 'changePassword') {
    router.push('/change-password');
  } else if (command === 'logout') {
    await logoutAsync();
    router.push('/login');
  }
}

function goLogin() {
  router.push('/login');
}
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.app-title {
  margin: 0;
  font-size: 20px;
  color: #409eff;
}

.breadcrumb {
  font-size: 14px;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.3s;
}

.user-info:hover {
  background: #f5f7fa;
}

.user-name {
  color: #606266;
}
</style>
