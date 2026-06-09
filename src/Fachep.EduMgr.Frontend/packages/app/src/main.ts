import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import persist from 'pinia-plugin-persistedstate';
import { useUserProfileStore } from '@/stores/profile';
import './assets/main.css';

const pinia = createPinia().use(persist);

async function bootstrap() {
  const app = createApp(App);
  app.use(pinia);
  app.use(router);

  const profileStore = useUserProfileStore();
  await profileStore.fetchProfile();

  app.mount('#app');
}

bootstrap();
