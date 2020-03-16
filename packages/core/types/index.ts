import Vue from 'vue';
import {
  ComponentOptions,
  PropComponent,
  RenderComponent,
  ThirdPropComponent
} from './component';

interface Props {
  input: Record<string, any>;
  meta: Record<string, any>;
}
export type PropTypes = Partial<Props>;

export type FormatParams = string | number | (string | number)[];
type FieldFormat<T> = (curr: T, prev?: T) => T;

type Errors = Record<string, string>;
type ReturnPromise<T> = T extends (...args: any) => Promise<infer P> ? P : T;
type Validate = (value: any) => Errors | undefined;

export interface Field {
  name: string;
  component: PropComponent;
  format?: FieldFormat<FormatParams>;
  props?: PropTypes;
  validate?: ReturnPromise<Validate>;
}

type FieldsFormat = Record<string, FormatParams>;
export interface Fields {
  component: ((...args: any[]) => CherryComponentOptions[]); // Fields 不能使用 string 类型的 component
  format?: FieldFormat<FieldsFormat>,
  props?: Record<string, PropTypes>;
}

export type CherryComponentOptions = ComponentOptions<Vue, {}, {}>;
export {
  PropComponent,
  RenderComponent,
  ThirdPropComponent,
};
