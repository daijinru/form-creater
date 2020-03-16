// @Todo 内置判断函数
import * as assert from 'assert';
import { PropComponent } from '../types';
export function assertComponentType(component: PropComponent): void {
  const type = typeof component;
  assert(type === 'string' || type === 'function', 'Type of component need be string or function');
}
