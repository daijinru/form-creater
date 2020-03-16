import { cloneDeep, assignWith } from 'lodash';

export function combineOptions<T>(options: T, rule: T): T {
  return assignWith(cloneDeep(options), rule);
}

export {
  assertComponentType
} from './assert';
