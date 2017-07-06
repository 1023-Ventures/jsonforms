import { Runtime } from '../core/runtime';
/**
 * A rule that may be attached to any UI schema element.
 */
export interface Rule {
    /**
     * The effect of the rule
     */
    effect: RuleEffect;
    /**
     * The condition of the rule that must evaluate to true in order
     * to trigger the effect.
     */
    condition: Condition;
}
/**
 * The different rule effects.
 */
export declare enum RuleEffect {
    /**
     * Effect that hides the associated element.
     */
    HIDE,
    /**
     * Effect that shows the associated element.
     *
     * @type {any}
     */
    SHOW,
    /**
     * Effect that enables the associated element.
     *
     * @type {any}
     */
    ENABLE,
    /**
     * Effect that disables the associated element.
     *
     * @type {any}
     */
    DISABLE,
}
/**
 * Represents a condition to be evaluated.
 */
export interface Condition {
    /**
     * A string describing the type of condition
     */
    type: string;
}
/**
 * A leaf condition.
 */
export interface LeafCondition extends Condition {
    /**
     * The sub schema the condition is bound to.
     */
    scope: {
        $ref: string;
    };
    /**
     * The expected value when evaluating the condition
     */
    expectedValue: any;
}
/**
 * Common base interface for any UI schema element.
 */
export interface UISchemaElement {
    /**
     * The type of this UI schema element.
     */
    type: string;
    /**
     * An optional rule.
     */
    rule?: Rule;
    /**
     * Any additional options.
     */
    options?: any;
    /**
     * Runtime object that encapsulates runtime state.
     */
    runtime?: Runtime;
}
/**
 * Represents a layout element which can order its children
 * in a specific way.
 */
export interface Layout extends UISchemaElement {
    /**
     * The child elements of this layout.
     */
    elements: UISchemaElement[];
}
/**
 * A layout which orders its child elements vertically (i.e. from top to bottom).
 */
export interface VerticalLayout extends Layout {
}
/**
 * A layout which orders its children horizontally (i.e. from left to right).
 */
export interface HorizontalLayout extends Layout {
}
/**
 * A group resembles a vertical layout, but additionally might have a label.
 * This layout is useful when grouping different elements by a certain criteria.
 */
export interface GroupLayout extends Layout {
    /**
     * The label of this group layout.
     */
    label?: string;
}
/**
 * Represents an object that can be used to configure a label.
 */
export interface ILabelObject {
    /**
     * An optional text to be displayed.
     */
    text?: string;
    /**
     * Optional property that determines whether to show this label.
     */
    show?: boolean;
}
/**
 * A label element.
 */
export interface LabelElement extends UISchemaElement {
    /**
     * The text of label.
     */
    text: string;
}
/**
 * A control element. The scope property of the control determines
 * to which part of the schema the control should be bound.
 */
export interface ControlElement extends UISchemaElement {
    /**
     * An optional label that will be associated with the control
     */
    label?: string | boolean | ILabelObject;
    /**
     * The scope that determines to which part of the schema the control
     * should be bound to. The $ref property is just a regular JSON pointer.
     */
    scope: {
        $ref: string;
    };
}
/**
 * The category layout.
 */
export interface Category extends Layout {
    /**
     * The label associated with this category layout.
     */
    label: string;
}
/**
 * The categorization element, which may have children elements.
 * A child element may either be itself a Categorization or a Category, hence
 * the categorization element can be used to represent recursive structures like trees.
 */
export interface Categorization extends UISchemaElement {
    /**
     * The label of this categorization.
     */
    label: string;
    /**
     * The child elements of this categorization which are either of type
     * {@link Category} or {@link Categorization}.
     */
    elements: (Category | Categorization)[];
}
