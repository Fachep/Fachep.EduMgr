<template>
  <el-aside class="nav-aside" width="220px">
    <el-menu :default-active="$route.path" :router="true" class="menu-root" style="border-right: 0">
      <el-menu-item-group title="我的">
        <el-menu-item index="/home">首页</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="学务">
        <el-menu-item v-if="!isStudent" index="/students">学生</el-menu-item>
        <el-menu-item v-if="!isStudent" index="/classes">班级</el-menu-item>
        <el-menu-item v-if="!isTeacher" index="/enrollments">选课</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group title="教学">
        <el-menu-item index="/courses">课程</el-menu-item>
        <el-menu-item v-if="!isStudent" index="/subjects">学科</el-menu-item>
        <el-menu-item index="/schedules">排课</el-menu-item>
        <el-menu-item index="/timetable">课表</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group title="组织">
        <el-menu-item v-if="isAdmin" index="/teachers">教师</el-menu-item>
        <el-menu-item v-if="isAdmin" index="/departments">学院/部门</el-menu-item>
        <el-menu-item v-if="isAdmin" index="/majors">专业</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group title="系统">
        <el-menu-item v-if="isAdmin" index="/users">用户</el-menu-item>
        <el-menu-item v-if="isAdmin" index="/config">系统配置</el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useUserProfileStore } from '@/stores/profile';

const profileStore = useUserProfileStore();

const isAdmin = computed(() => profileStore.isAdmin);
const isTeacher = computed(() => profileStore.isTeacher);
const isStudent = computed(() => profileStore.isStudent);
</script>

<style scoped>
.nav-aside {
  padding: 12px;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.menu-root {
  flex: 1;
  overflow: auto;
}
</style>
