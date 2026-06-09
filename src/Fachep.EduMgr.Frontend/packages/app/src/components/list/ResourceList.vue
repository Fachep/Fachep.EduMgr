<template>
  <div class="resource-list">
    <el-table
      v-loading="loading"
      :data="items"
      :row-key="rowKeyProp"
      style="width: 100%"
      @row-click="handleRowClick"
    >
      <el-table-column v-if="showIndex" label="#" type="index" width="60" />
      <el-table-column
        v-for="col in columns"
        :key="col.key"
        :label="col.label"
        :prop="col.key"
        :width="col.width"
      >
        <template #default="{ row }">
          <slot :item="row" :name="`cell-${col.key}`">
            <span>{{ displayCell(row, col.key) }}</span>
          </slot>
        </template>
      </el-table-column>
      <el-table-column v-if="$slots.actions" label="操作" width="120">
        <template #default="{ row }">
          <div @click.stop>
            <slot :item="row" name="actions"></slot>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

type Column = { key: string; label: string; width?: string };

const props = defineProps<{
  columns: Column[];
  items: any[];
  rowKey?: string | ((item: any) => string | number);
  showIndex?: boolean;
  emptyText?: string;
  clickableRow?: boolean;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'row-click', item: any): void;
}>();

const showIndex = computed(() => !!props.showIndex);
const clickableRow = computed(() => props.clickableRow ?? false);
const rowKeyProp = computed(() => {
  if (!props.rowKey) return undefined;
  if (typeof props.rowKey === 'string') return props.rowKey;
  return (row: any) => String((props.rowKey as (it: any) => string | number)(row));
});
const loading = computed(() => props.loading ?? false);

function displayCell(item: any, key: string) {
  const v = item ? (item[key] ?? '') : '';
  if (v === null || v === undefined) return '';
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}

function handleRowClick(row: any) {
  if (!clickableRow.value) return;
  emit('row-click', row);
}
</script>

<style scoped>
.resource-list {
  width: 100%;
}
.el-table th,
.el-table td {
  padding: 8px;
}
.el-table thead th {
  background: #fafafa;
  font-weight: 600;
}
.el-table td .el-button {
  padding: 0;
}
</style>
