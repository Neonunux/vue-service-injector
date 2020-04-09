import { NavigationGuard, RouteConfig } from 'vue-router';

// import { AxiosRequestConfig } from 'axios';
import { VueConstructor } from 'vue';
import { ModuleTree as VuexModuleTree } from 'vuex';
// import axiosInstance from '../axiosInstance';
import router from './router';
import store from './store';

export type ModuleInstallerOptions = {
  portalSources: VueConstructor<Vue>[];
  routes: RouteConfig[];
  routerMiddlewares: NavigationGuard<Vue>[];
  storeModules: VuexModuleTree<unknown>;
};

export default class ModuleInstaller {
  // readonly networkRequestInterceptors: ModuleInstallerOptions['networkRequestInterceptors'];

  readonly portalSources: ModuleInstallerOptions['portalSources'];

  readonly routes: ModuleInstallerOptions['routes'];

  readonly routerMiddlewares: ModuleInstallerOptions['routerMiddlewares'];

  readonly storeModules: ModuleInstallerOptions['storeModules'];

  constructor(options: Partial<ModuleInstallerOptions>) {
    // this.networkRequestInterceptors = options.networkRequestInterceptors || [];
    this.portalSources = options.portalSources || [];
    this.routes = options.routes || [];
    this.routerMiddlewares = options.routerMiddlewares || [];
    this.storeModules = options.storeModules || {};
  }

  install() {
    // this.networkRequestInterceptors
    //   .forEach((interceptor) => {
    //     axiosInstance.interceptors.request.use(interceptor);
    //   });

    // Wait for the application to be ready before mounting the portal sources because portals
    // might depend on other modules to be installed.
    setTimeout(() => {
      this.portalSources
        .forEach((portalSource) => {
          // eslint-disable-next-line new-cap, no-new
          new portalSource().$mount();
        });
    });

    router.addRoutes(this.routes);

    this.routerMiddlewares
      .forEach((middleware) => {
        router.beforeEach(middleware);
      });

    Object.entries(this.storeModules)
      .forEach(([namespace, module]) => {
        store.registerModule(namespace, module);
      });
  }
}
