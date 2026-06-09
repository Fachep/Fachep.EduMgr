import { jwtDecode } from 'jwt-decode';
import { computed, type Ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { api } from '@/clients';
import type { TokenProvider } from '@edumgr/openapi';

function useJwtExpiration(token: Ref<string | undefined | null>) {
  return computed(() => {
    if (token.value?.length) {
      return jwtDecode(token.value).exp ?? 0;
    } else {
      return 0;
    }
  });
}

export const accessToken = useLocalStorage<string | undefined | null>(
  'edumgr.accessToken',
  undefined,
);
export const refreshToken = useLocalStorage<string | undefined | null>(
  'edumgr.refreshToken',
  undefined,
);
const deviceId = useLocalStorage('edumgr.deviceId', () => crypto.randomUUID());
const accessExpiration = useJwtExpiration(accessToken);
const refreshExpiration = useJwtExpiration(refreshToken);

function isAccessTokenValid() {
  return accessToken.value?.length && accessExpiration.value * 1000 > Date.now() + 60000;
}

function isRefreshTokenValid() {
  return refreshToken.value?.length && refreshExpiration.value * 1000 > Date.now();
}

export async function loginAsync(userId: number, password: string) {
  const resp = await api.authApi.authLogin({ userId, password, deviceId: deviceId.value });
  ({ accessToken: accessToken.value, refreshToken: refreshToken.value } = resp);
}
async function refreshAsync() {
  const resp = await api.authApi.authRefresh(deviceId.value);
  ({ accessToken: accessToken.value, refreshToken: refreshToken.value } = resp);
}

export async function logoutAsync() {
  accessToken.value = null;
  refreshToken.value = null;
  try {
    await api.authApi.authLogout(deviceId.value);
  } catch {}
}

export const accessTokenProvider: TokenProvider = {
  async getToken() {
    if (!isAccessTokenValid()) {
      accessToken.value = null;
      await refreshAsync();
    }
    return accessToken.value ?? '';
  },
};

export const refreshTokenProvider: TokenProvider = {
  async getToken() {
    if (!isRefreshTokenValid()) {
      throw new Error('Refresh token is invalid');
    }
    return refreshToken.value ?? '';
  },
};
