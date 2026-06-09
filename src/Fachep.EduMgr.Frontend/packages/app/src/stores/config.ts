import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { api } from '@/clients';
import type { ConfigDto, SectionInfo } from '@edumgr/openapi';

function extractSections(cfg: unknown): number | null {
  if (!cfg || typeof cfg !== 'object') return null;
  const c = cfg as Record<string, unknown>;
  const candidates = [
    (c?.timetable as Record<string, unknown>)?.sections,
    c?.sections,
    c?.maxSection,
    c?.periods,
    c?.sectionsPerDay,
    c?.periodCount,
    c?.daySections,
  ];
  for (const c of candidates) {
    const n = Number(c ?? 0) || 0;
    if (n > 0) return n;
  }
  return null;
}

export const useConfigStore = defineStore('config', () => {
  const raw = useLocalStorage<string | null>('edumgr.config', null);
  const config = ref<ConfigDto | null>(null);
  const loading = ref(false);
  try {
    config.value = raw.value ? JSON.parse(raw.value) : null;
  } catch {
    config.value = null;
  }

  const sections = computed<number | null>(() => extractSections(config.value));

  const sectionTimes = computed<string[]>(() => {
    if (!config.value) return [];
    try {
      return config.value.sections.map((s: SectionInfo | null | undefined) => {
        if (!s) return '';
        const st = (s.startTime ?? '').toString();
        const et = (s.endTime ?? '').toString();
        if (st && et) return `${st}-${et}`;
        if (st) return st;
        return '';
      });
    } catch {
      return [];
    }
  });
  const sectionInfos = computed(() => {
    if (!config.value)
      return [] as Array<{ index: number; start?: string | null; end?: string | null }>;
    try {
      return config.value.sections.map((s, i) => ({
        index: i + 1,
        start: s?.startTime ?? null,
        end: s?.endTime ?? null,
      }));
    } catch {
      return [] as Array<{ index: number; start?: string | null; end?: string | null }>;
    }
  });
  const sectionOrder = computed<number[]>(() => {
    const infos = sectionInfos.value;
    if (!infos || !infos.length) return [];
    const withTime = infos.filter((i) => i.start && i.start !== '');
    const without = infos.filter((i) => !i.start || i.start === '');
    function minutes(t?: string | null) {
      if (!t) return Number.MAX_SAFE_INTEGER;
      const m = String(t).match(/(\d{1,2}):(\d{2})/);
      if (m && m.length >= 3) {
        const hh = Number(m[1]);
        const mm = Number(m[2]);
        if (!isNaN(hh) && !isNaN(mm)) return hh * 60 + mm;
      }
      return Number.MAX_SAFE_INTEGER;
    }
    withTime.sort((a, b) => {
      const ma = minutes(a.start);
      const mb = minutes(b.start);
      if (ma !== mb) return ma - mb;
      return (a.index || 0) - (b.index || 0);
    });
    const ordered = [...withTime.map((x) => x.index), ...without.map((x) => x.index)];
    return ordered;
  });

  function dayOfWeekToNumber(d?: unknown): number | null {
    if (!d || typeof d !== 'string') return null;
    switch (d) {
      case 'Sunday':
        return 0;
      case 'Monday':
        return 1;
      case 'Tuesday':
        return 2;
      case 'Wednesday':
        return 3;
      case 'Thursday':
        return 4;
      case 'Friday':
        return 5;
      case 'Saturday':
        return 6;
      default:
        return null;
    }
  }

  function computeWeekFromConfig(refDate: Date = new Date()): number | null {
    if (!config.value || !config.value.startDate) return null;
    const start = new Date(config.value.startDate);
    if (isNaN(start.getTime())) return null;
    const cfgAny = config.value as unknown as Record<string, unknown>;
    const targetDow = dayOfWeekToNumber(cfgAny?.startDayOfWeek);
    const weekStartConst = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    if (targetDow != null) {
      const startDow = weekStartConst.getDay();
      const delta = (startDow - targetDow + 7) % 7;
      weekStartConst.setDate(weekStartConst.getDate() - delta);
    }
    const utcRef = Date.UTC(refDate.getFullYear(), refDate.getMonth(), refDate.getDate());
    const utcStart = Date.UTC(
      weekStartConst.getFullYear(),
      weekStartConst.getMonth(),
      weekStartConst.getDate(),
    );
    const dayMs = 24 * 60 * 60 * 1000;
    const diffDays = Math.floor((utcRef - utcStart) / dayMs);
    const wk = Math.floor(diffDays / 7) + 1;
    return Math.max(1, wk);
  }
  const currentWeek = computed<number | null>(() => computeWeekFromConfig(new Date()));

  async function loadConfig(force = false) {
    if (config.value && !force) return config.value;
    if (raw.value && !force) {
      try {
        config.value = JSON.parse(raw.value);
      } catch {
        config.value = null;
      }
    }
    loading.value = true;
    try {
      const cfg = await api.configApi.configGetConfig();
      config.value = cfg ?? config.value;
      try {
        raw.value = config.value ? JSON.stringify(config.value) : null;
      } catch {
        /* ignore */
      }
    } catch {
    } finally {
      loading.value = false;
    }
    return config.value;
  }

  return {
    config,
    loadConfig,
    sections,
    sectionTimes,
    sectionInfos,
    sectionOrder,
    loading,
    currentWeek,
    computeWeekFromConfig,
  };
});
