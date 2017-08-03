import * as _ from 'lodash';
import { JsonForms } from '../../core';
import { Renderer } from '../../core/renderer';
import { RUNTIME_TYPE } from '../../core/runtime';
import { RankedTester, rankWith, uiTypeIs } from '../../core/testers';
import { VerticalLayout } from '../../models/uischema';
import { JsonFormsRenderer } from '../renderer.util';
import { createRuntimeNotificationEvaluator } from './layout.util';

/**
 * Default tester for a vertical layout.
 * @type {RankedTester}
 */
export const verticalLayoutTester: RankedTester = rankWith(1, uiTypeIs('VerticalLayout'));

/**
 * Default renderer for a vertical layout.
 */
@JsonFormsRenderer({
  selector: 'jsonforms-verticallayout',
  tester: verticalLayoutTester
})
export class VerticalLayoutRenderer extends Renderer {
  private evaluateRuntimeNotification: (type: RUNTIME_TYPE) => void;
  constructor() {
    super();
  }

  /**
   * @inheritDoc
   */
  render(): HTMLElement {
    const div = document.createElement('div');
    div.className = JsonForms.stylingRegistry.getAsClassName('vertical-layout');
    const verticalLayout = this.uischema as VerticalLayout;
    if (verticalLayout.elements !== undefined && verticalLayout.elements !== null) {
      verticalLayout.elements.forEach(element => {
        const bestRenderer = JsonForms.rendererService
          .findMostApplicableRenderer(element, this.dataSchema, this.dataService);
        div.appendChild(bestRenderer);
      });
    }
    this.appendChild(div);

    const childrenSize = div.children.length;
    for (let i = 0; i < childrenSize; i++) {
      const itemStyle = JsonForms.stylingRegistry.get('vertical-layout-item', childrenSize);
      if (!_.isEmpty(itemStyle)) {
        for (const style of itemStyle) {
          div.children.item(i).classList.add(style);
        }
      }
    }

    this.evaluateRuntimeNotification = createRuntimeNotificationEvaluator(this, this.uischema);

    return this;
  }

  /**
   * @inheritDoc
   */
  dispose(): void {
    // Do nothing
  }

  /**
   * @inheritDoc
   */
  runtimeUpdated(type: RUNTIME_TYPE): void {
    this.evaluateRuntimeNotification(type);
  }
}
