import Vue, { VNode, VNodeData, VNodeChildren } from 'vue';
import {
  Field,
  Fields,
  PropComponent,
  RenderComponent,
  ThirdPropComponent,
  CherryComponentOptions,
} from './types';

function createRenderComponents(this: Vue, rule: Fields): VNodeChildren {
  const { component, props } = rule;
  if (typeof component === 'function') {
    return (component(props) as CherryComponentOptions[])
      .map(c => this.$createElement(c));
  }
}

const createFields = (buildIn: Record<string, any>): CherryComponentOptions => {
  return {
    props: {
      rule: {
        type: Object as () => Fields,
        required: true
      }
    },
    render(h: RenderComponent): VNode {
      const components = createRenderComponents.apply(this, [this.$props.rule]);
      return h('form', {}, components);
    }
  };
};
export default createFields;
