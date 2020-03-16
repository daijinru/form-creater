import { VNode, VNodeData } from 'vue';
import {
  Field,
  PropComponent,
  RenderComponent,
  ThirdPropComponent,
  CherryComponentOptions,
} from './types';
import {
  combineOptions,
  assertComponentType,
} from './utils';

function createRenderComponent(rule: Field): PropComponent | undefined {
  const { component, props = {} } = rule;
  assertComponentType(component);
  if (typeof component === 'function') return (component as ThirdPropComponent)(props);
  return component;
}

// 如果是第三方 Component，props 交由它的包装函数处理
function createVNodeData(rule: Field): VNodeData {
  const { component, name, props = {} } = rule;

  if (typeof component === 'string') {
    return { attrs: { name, ...props.input } };
  }

  return {};
}

const createField = (buildIn: Record<string, any>): CherryComponentOptions => {
  const { FieldOptions } = buildIn;

  return {
    props: {
      rule: {
        type: Object as () => Field,
        required: true
      }
    },
    render(h: RenderComponent): VNode {
      const rule = combineOptions<Field>(FieldOptions, this.$props.rule);
      const component = createRenderComponent(rule);
      const vnodeData = createVNodeData(rule);

      return h(
        component,
        vnodeData
      );
    }
  };
};

export default createField;
