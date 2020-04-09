import ModuleInstaller from '@/ModuleInstaller';
import routes from './routes';
import LogInButton from './LogInButton.vue';

export default new ModuleInstaller({
  routes,
  portalSources: [
    LogInButton,
  ],
});
