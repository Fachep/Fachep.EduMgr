import { defineStore } from 'pinia';
import { api } from '@/clients';
import { accessToken, refreshToken } from '@/clients/auth';
import type { UserDto } from '@edumgr/openapi';
import { computed, ref, watch } from 'vue';
import { useTimetableStore } from './timetable';
import { clearAllStores } from './index';
import { useLocalStorage } from '@vueuse/core';
import { jwtDecode } from 'jwt-decode';

export const useUserProfileStore = defineStore('profile', () => {
  const rawProfile = useLocalStorage<string | null>('edumgr.profile', null);
  const profile = ref<UserDto | null>(null);
  try {
    profile.value = rawProfile.value ? (JSON.parse(rawProfile.value) as UserDto) : null;
  } catch {
    profile.value = null;
  }
  const isFetching = ref(false);
  let currentFetch: Promise<void> | null = null;

  function isRefreshTokenValidLocal() {
    try {
      if (!refreshToken.value) return false;
      const exp = (jwtDecode(refreshToken.value) as { exp?: number }).exp ?? 0;
      return exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  async function fetchProfile() {
    if (currentFetch) return currentFetch;
    if (!accessToken.value && !isRefreshTokenValidLocal()) {
      profile.value = null;
      return;
    }

    currentFetch = (async () => {
      isFetching.value = true;
      try {
        const p = await api.profileApi.profileGet();
        profile.value = p;
        try {
          rawProfile.value = p ? JSON.stringify(p) : null;
        } catch {
          /* ignore */
        }
        try {
          const tt = useTimetableStore();
          if (profile.value?.userRole === 'Student' && profile.value.id != null) {
            tt.preloadStudentCaches(profile.value.id);
          } else if (profile.value?.userRole === 'Teacher' && profile.value.id != null) {
            tt.preloadTeacherCaches(profile.value.id);
          }
        } catch (e) {
          console.error('profile preload error', e);
        }
      } catch {
        profile.value = null;
        rawProfile.value = null;
      } finally {
        isFetching.value = false;
        currentFetch = null;
      }
    })();

    return currentFetch;
  }

  async function updateProfile(name?: string, email?: string) {
    await api.profileApi.profileUpdate({
      name,
      email,
    });
    await fetchProfile();
  }

  const isAdmin = computed(() => profile.value?.userRole == 'Admin');
  const isTeacher = computed(() => profile.value?.userRole === 'Teacher');
  const isStudent = computed(() => profile.value?.userRole === 'Student');
  watch(
    refreshToken,
    (tok, old) => {
      if (!tok) {
        profile.value = null;
        rawProfile.value = null;
        try {
          clearAllStores();
        } catch {
          /* ignore */
        }
      } else if (tok !== old) {
        fetchProfile();
      }
    },
    { immediate: true },
  );
  watch(profile, (nv, ov) => {
    const oldRole = ov?.userRole;
    const newRole = nv?.userRole;
    if (oldRole && newRole && oldRole !== newRole) {
      try {
        clearAllStores();
      } catch {
        /* ignore */
      }
    }
  });

  return {
    profile,
    fetchProfile,
    updateProfile,
    isAdmin,
    isTeacher,
    isStudent,
  };
});
