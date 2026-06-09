import { createConfiguration, ServerConfiguration } from '@edumgr/openapi';
import { accessTokenProvider, refreshTokenProvider } from './auth';

export default createConfiguration({
  authMethods: {
    Bearer: {
      tokenProvider: accessTokenProvider,
    },
    Refresh: {
      tokenProvider: refreshTokenProvider,
    },
  },
  baseServer: new ServerConfiguration('http://localhost:5165', {}),
});
