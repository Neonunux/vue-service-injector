import {
  ActionContext as VuexActionContext,
  ActionHandler as VuexActionHandler,
  Getter as VuexGetter,
  Module as VuexModule,
  ModuleTree as VuexModuleTree,
  Mutation as VuexMutation,
} from 'vuex';

import store from '../store';

// `S` generic type is used to reference the state type.
// `P` generic type is used to reference the payload type.
// `R` generic type is used to reference the return type.

type Getter<S, R> = VuexGetter<S, unknown> & ((state: S) => R);

type Mutation<S, P> = VuexMutation<S> & ((state: S, payload: P) => void);

type Action<S, P, R> = (
  VuexActionHandler<S, unknown> &
  ((context: VuexActionContext<S, unknown>, payload: P) => Promise<R>)
);

/**
 * This class provides a way to interact with namespaced store modules in a generic, simple and
 * type-safe manner. Since it handles the namespace logic, it is also responsible of generating
 * appropriate Vuex module configurations to enforce consistency.
 */
export default class GenericStoreModuleController<S> {
  private namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  get<K extends Extract<keyof S, string>>(propertyName: K): S[K] {
    return (store.state as Record<string, S>)[this.namespace][propertyName];
  }

  applyGetter<R>(getter: Getter<S, R>): R {
    return store.getters[this.getMemberAbsoluteName(getter)];
  }

  // Allow omitting payload when applicable by declaring it as optional if it is of type
  // `undefined`.
  applyMutation<P extends undefined>(mutation: Mutation<S, P>, payload?: P): void;

  applyMutation<P>(mutation: Mutation<S, P>, payload: P): void;

  applyMutation<P>(mutation: Mutation<S, P>, payload: P): void {
    store.commit(this.getMemberAbsoluteName(mutation), payload);
  }

  // Allow omitting payload when applicable by declaring it as optional if it is of type
  // `undefined`.
  applyAction<P extends undefined, R>(action: Action<S, P, R>, payload?: P): Promise<R>;

  applyAction<P, R>(action: Action<S, P, R>, payload: P): Promise<R>;

  applyAction<P, R>(action: Action<S, P, R>, payload: P): Promise<R> {
    return store.dispatch(this.getMemberAbsoluteName(action), payload);
  }

  generateModuleConfiguration(storeModule: VuexModule<S, unknown>): VuexModuleTree<unknown> {
    return {
      [this.namespace]: {
        namespaced: true,
        ...storeModule,
      },
    };
  }

  // The member name resolution depends on the member `name` property being the same as the one
  // provided in the store configuration e.g. if an action is registered as "myAction", its `name`
  // property should also be "myAction". Webpack optimizations might break this consistency by
  // mangling the function names. Such optimizations have to be disabled.
  // See: https://webpack.js.org/plugins/terser-webpack-plugin/#terseroptions
  // See: https://github.com/terser/terser#minify-options
  private getMemberAbsoluteName(member: Function): string {
    return `${this.namespace}/${member.name}`;
  }

}