import Vue, { CreateElement, VNode, VNodeData, VNodeChildren } from 'vue';
import {
  Component,
  AsyncComponent,
} from 'vue/types/options';
/**
 * 仅返回对象类型的配置数据，同 vue.extend()
 */
type Prop<T> = { (): T } | { new(...args: never[]): T & object } | { new(...args: string[]): Function }
type PropType<T> = Prop<T> | Prop<T>[];
type PropValidator<T> = PropOptions<T> | PropType<T>;
interface PropOptions<T = any> {
  type?: PropType<T>;
  required?: boolean;
  default?: T | null | undefined | (() => T | null | undefined);
  validator?(value: T): boolean;
}
type RecordPropsDefinition<T> = {
  [K in keyof T]: PropValidator<T[K]>
}
type ArrayPropsDefinition<T> = (keyof T)[];
type PropsDefinition<T> = ArrayPropsDefinition<T> | RecordPropsDefinition<T>;
type DefaultData<V> = object | ((this: V) => object);
type DefaultProps = Record<string, any>;
type DefaultMethods<V> = { [key: string]: (this: V, ...args: any[]) => any };
type DefaultComputed = { [key: string]: any };

interface WatchOptions {
  deep?: boolean;
  immediate?: boolean;
}
interface WatchOptionsWithHandler<T> extends WatchOptions {
  handler: WatchHandler<T>;
}
type WatchHandler<T> = (val: T, oldVal: T) => void;

// 扩展类型 (...args: any[]) => Component 兼容第三方 UI 以函数形式返回 Component
export type ThirdPropComponent = ((...args: any[]) => Component);
export type PropComponent = string | Component<any, any, any, any> | AsyncComponent<any, any, any, any> | (() => Component) | ThirdPropComponent;
export interface RenderComponent extends CreateElement {
  (tag?: PropComponent, children?: VNodeChildren): VNode;
  (tag?: PropComponent, data?: VNodeData, children?: VNodeChildren): VNode;
}

export interface ComponentOptions<
  V extends Vue,
  Data = DefaultData<V>,
  PropsDef = PropsDefinition<DefaultProps>,
  Methods = DefaultMethods<V>,
  Computed = DefaultComputed,
  > {
  data?: Data,
  props?: PropsDef,
  watch?: Record<string, WatchOptionsWithHandler<any> | WatchHandler<any> | string>;
  computed?: Computed,
  methods?: Methods,

  /**
   * 生命周期函数
   */
  beforeCreate?(this: V): void;
  created?(): void;
  beforeDestroy?(): void;
  destroyed?(): void;
  beforeMount?(): void;
  mounted?(): void;
  beforeUpdate?(): void;
  updated?(): void;
  activated?(): void;
  deactivated?(): void;

  render?(this: V, createElement: RenderComponent): VNode;
}
