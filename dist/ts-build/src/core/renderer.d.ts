import { JsonSchema } from '../models/jsonSchema';
import { UISchemaElement } from '../models/uischema';
import { DataService } from './data.service';
import { RUNTIME_TYPE, RuntimeListener } from './runtime';
/**
 * A renderer is a regular HTMLElement that has a render method which will
 * manipulate the underlying document when called. It also provides several
 * lifecycle hooks.
 */
export declare abstract class Renderer extends HTMLElement implements RuntimeListener {
    /**
     * The {@link UISchemaElement} to be rendered.
     */
    protected uischema: UISchemaElement;
    /**
     * The {@link DataService} holding the data to be rendered.
     */
    protected dataService: DataService;
    /**
     * The {@link JsonSchema} to be rendered.
     */
    protected dataSchema: JsonSchema;
    /**
     * Set the UI schema.
     * @param {UISchemaElement} uischema the UI schema element to be set
     */
    setUiSchema(uischema: UISchemaElement): void;
    /**
     * Set the data service.
     * @param {DataService} dataService the data service to be set
     */
    setDataService(dataService: DataService): void;
    /**
     * Set the JSON data schema .
     * @param {JsonSchema} dataSchema the data schema
     */
    setDataSchema(dataSchema: JsonSchema): void;
    /**
     * Notify this renderer about any run-time changes.
     *
     * @param {RUNTIME_TYPE} type the type of runtime change
     */
    runtimeUpdated(type: RUNTIME_TYPE): void;
    /**
     * Called when this renderer is inserted into a document.
     */
    connectedCallback(): void;
    /**
     * Called when this renderer is removed from a document.
     */
    disconnectedCallback(): void;
    /**
     * Represents the render logic, i.e. it manipulates the DOM in-place.
     *
     * @return {HTMLElement} the renderer HTML element
     */
    abstract render(): HTMLElement;
    /**
     * Dispose this renderer.
     */
    abstract dispose(): void;
    protected convertToClassName(value: string): string;
}
