import { DataChangeListener } from '../../core/data.service';
import { Renderer } from '../../core/renderer';
import { RUNTIME_TYPE } from '../../core/runtime';
import { ControlElement } from '../../models/uischema';
import { getElementLabelObject } from '../label.util';
import { JsonForms } from '../../core';

/**
 * Convenience base class for all renderers that represent controls.
 */
export abstract class BaseControl <T extends HTMLElement>
  extends Renderer implements DataChangeListener {

  private static formatErrorMessage(errors: string[]) {
    if (errors === undefined || errors === null) {
      return '';
    }

    return errors.join('\n');
  }

  protected label: HTMLLabelElement;
  protected input: T;
  protected errorElement: HTMLElement;
  private errorMessage;

  /**
   * Default constructor.
   */
  constructor() {
    super();
  }

  /**
   * @inheritDoc
   */
  render(): HTMLElement {
    const controlElement = this.uischema as ControlElement;
    this.createLabel(controlElement);
    this.createInput(controlElement);
    this.errorElement = document.createElement('div');
    this.appendChild(this.label);
    this.appendChild(this.input);
    this.appendChild(this.errorElement);
    this.classList.add(this.convertToClassName(controlElement.scope.$ref));

    JsonForms.stylingRegistry
      .addStyle(this, 'control')
      .addStyle(this.label, 'control.label')
      .addStyle(this.input, 'control.input')
      .addStyle(this.errorElement, 'control.validation');

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
    const runtime = this.uischema.runtime;
    switch (type) {
      case RUNTIME_TYPE.VALIDATION_ERROR:
        this.errorMessage = BaseControl.formatErrorMessage(runtime.validationErrors);
        this.errorElement.textContent = this.errorMessage;
        this.classList.toggle('validation_error', runtime.validationErrors !== undefined);
        if (runtime.validationErrors === undefined) {
          this.input.classList.add('valid');
          this.input.classList.remove('invalid');
        } else {
          this.input.classList.add('invalid');
          this.input.classList.remove('valid');
        }
        break;
      case RUNTIME_TYPE.VISIBLE:
        this.hidden = !runtime.visible;
        break;
      case RUNTIME_TYPE.ENABLED:
        if (!runtime.enabled) {
          this.input.setAttribute('disabled', 'true');
        } else {
          this.input.removeAttribute('disabled');
        }
        break;
      default:
    }
  }

  /**
   * @inheritDoc
   */
  connectedCallback(): void {
    super.connectedCallback();
    this.dataService.registerDataChangeListener(this);
  }

  /**
   * @inheritDoc
   */
  disconnectedCallback(): void {
    this.dataService.deregisterDataChangeListener(this);
    super.disconnectedCallback();
  }

  /**
   * @inheritDoc
   */
  needsNotificationAbout (controlElement: ControlElement): boolean {
    if (controlElement === undefined || controlElement === null) {
      return false;
    }

    return (this.uischema as ControlElement).scope.$ref === controlElement.scope.$ref;
  }

  /**
   * @inheritDoc
   */
  dataChanged(controlElement: ControlElement, newValue: any, data: any): void {
    this.setValue(this.input, newValue);
  }

  /**
   * Convert the given value before setting it.
   * By default, this just resembles the identify function.
   *
   * @param {any} value the value that may need to be converted
   * @return {any} the converted value
   */
  protected convertModelValue(value: any): any {
    return value;
  }

  /**
   * Convert the given value before displaying it.
   * By default, this just resembles the identify function.
   *
   * @param {any} value the value that may need to be converted
   * @return {any} the converted value
   */
  protected convertInputValue(value: any): any {
    return value;
  }

  /**
   * Returns the name of the property that indicates changes
   * @example
   * 'onChange' // in case of a checkbox
   * @return {string} name of the change property
   */
  protected abstract get inputChangeProperty(): string;

  /**
   * Configure the created input element.
   *
   * @param input the input element to be configured
   *
   * @see createInputElement
   */
  protected abstract configureInput(input: T): void;

  /**
   * Returns the name of the property that represents the actual value.
   * @example
   * 'checked' // in case of a checkbox
   * @return the name of the value property
   */
  protected abstract get valueProperty(): string;

  /**
   * Create and return a HTML element that is used
   * to enter/update any data.
   *
   * @returns {T} the created HTML input element
   */
  protected abstract createInputElement(): T;

  protected createLabel(controlElement: ControlElement): void {
    this.label = document.createElement('label');
    // TODO: see issue #590
    this.label.htmlFor = controlElement.scope.$ref;
    const labelObject = getElementLabelObject(this.dataSchema, controlElement);
    if (labelObject.show) {
      this.label.textContent = labelObject.text;
    }
  }

  protected createInput(controlElement: ControlElement): void {
    this.input = this.createInputElement();
    // TODO: see issue #590
    this.input.id = controlElement.scope.$ref;
    this.configureInput(this.input);
    this.input[this.inputChangeProperty] = ((ev: Event) => {
          this.dataService.notifyAboutDataChange(controlElement, this.getValue(this.input));
        }
    );
    this.input.className += ' validate';
    this.setValue(this.input, this.dataService.getValue(controlElement));
  }

  private getValue(input: T): any {
    return this.convertInputValue(input[this.valueProperty]);
  }

  private setValue(input: T, value: any): void {
    input[this.valueProperty] = this.convertModelValue(value);
  }
}
