"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const installCE = require("document-register-element/pony");
// inject window, document etc.
require("jsdom-global/register");
installCE(global, 'force');
const data_service_1 = require("../../src/core/data.service");
const table_array_control_1 = require("../../src/renderers/additional/table-array.control");
ava_1.default('generate array child control', t => {
    const renderer = new table_array_control_1.TableArrayControlRenderer();
    const schema = {
        'type': 'object',
        'properties': {
            'test': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'x': { 'type': 'integer' },
                        'y': { 'type': 'integer' }
                    }
                }
            }
        }
    };
    const uiSchema = {
        'type': 'Control',
        'scope': {
            '$ref': '#/properties/test'
        }
    };
    const data = {
        'test': [{
                x: 1,
                y: 3
            }]
    };
    renderer.setDataService(new data_service_1.DataService(data));
    renderer.setDataSchema(schema);
    renderer.setUiSchema(uiSchema);
    renderer.connectedCallback();
    const elements = renderer.getElementsByClassName('array-table-layout');
    t.is(elements.length, 1);
    t.is(elements.item(0).tagName, 'DIV');
    const fieldsetChildren = elements.item(0).children;
    t.is(fieldsetChildren.length, 2);
    const header = fieldsetChildren.item(0);
    t.is(header.tagName, 'HEADER');
    const legendChildren = header.children;
    const label = legendChildren.item(0);
    t.is(label.tagName, 'LABEL');
    t.is(label.innerHTML, 'Test');
    const button = legendChildren.item(1);
    t.is(button.tagName, 'BUTTON');
    t.is(button.innerHTML, 'Add to Test');
    const table = fieldsetChildren.item(1);
    t.is(table.tagName, 'TABLE');
    const tableChildren = table.children;
    t.is(tableChildren.length, 2);
    const tHead = tableChildren.item(0);
    t.is(tHead.tagName, 'THEAD');
    t.is(tHead.children.length, 1);
    const headRow = tHead.children.item(0);
    t.is(headRow.tagName, 'TR');
    t.is(headRow.children.length, 2);
    const headColumn1 = headRow.children.item(0);
    t.is(headColumn1.tagName, 'TH');
    t.is(headColumn1.innerText, 'x');
    const headColumn2 = headRow.children.item(1);
    t.is(headColumn2.tagName, 'TH');
    t.is(headColumn2.innerText, 'y');
    const tBody = tableChildren.item(1);
    t.is(tBody.tagName, 'TBODY');
    t.is(tBody.children.length, 1);
    const bodyRow = tBody.children.item(0);
    t.is(bodyRow.tagName, 'TR');
    t.is(bodyRow.children.length, 2);
    const bodyColumn1 = bodyRow.children.item(0);
    t.is(bodyColumn1.tagName, 'TD');
    t.is(bodyColumn1.children.length, 1);
    t.is(bodyColumn1.children.item(0).tagName, 'JSON-FORMS');
    const bodyColumn2 = bodyRow.children.item(1);
    t.is(bodyColumn2.tagName, 'TD');
    t.is(bodyColumn2.children.length, 1);
    t.is(bodyColumn2.children.item(0).tagName, 'JSON-FORMS');
});
ava_1.default('generate array child control w/o data', t => {
    const renderer = new table_array_control_1.TableArrayControlRenderer();
    const schema = {
        'type': 'object',
        'properties': {
            'test': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'x': { 'type': 'integer' },
                        'y': { 'type': 'integer' }
                    }
                }
            }
        }
    };
    const uiSchema = {
        'label': false,
        'type': 'Control',
        'scope': {
            '$ref': '#/properties/test'
        }
    };
    const data = {};
    renderer.setDataService(new data_service_1.DataService(data));
    renderer.setDataSchema(schema);
    renderer.setUiSchema(uiSchema);
    renderer.connectedCallback();
    const elements = renderer.getElementsByClassName('array-table-layout');
    t.is(elements.length, 1);
    t.is(elements.item(0).tagName, 'DIV');
    const fieldsetChildren = elements.item(0).children;
    t.is(fieldsetChildren.length, 2);
    const header = fieldsetChildren.item(0);
    t.is(header.tagName, 'HEADER');
    const legendChildren = header.children;
    const label = legendChildren.item(0);
    t.is(label.tagName, 'LABEL');
    t.is(label.textContent, '');
    const button = legendChildren.item(1);
    t.is(button.tagName, 'BUTTON');
    t.is(button.innerHTML, 'Add to Test');
    const table = fieldsetChildren.item(1);
    t.is(table.tagName, 'TABLE');
    const tableChildren = table.children;
    t.is(tableChildren.length, 2);
    const tHead = tableChildren.item(0);
    t.is(tHead.tagName, 'THEAD');
    t.is(tHead.children.length, 1);
    const headRow = tHead.children.item(0);
    t.is(headRow.tagName, 'TR');
    t.is(headRow.children.length, 2);
    const headColumn1 = headRow.children.item(0);
    t.is(headColumn1.tagName, 'TH');
    t.is(headColumn1.innerText, 'x');
    const headColumn2 = headRow.children.item(1);
    t.is(headColumn2.tagName, 'TH');
    t.is(headColumn2.innerText, 'y');
    const tBody = tableChildren.item(1);
    t.is(tBody.tagName, 'TBODY');
    t.is(tBody.children.length, 0);
});
ava_1.default('array-layout add click w/o data', t => {
    const renderer = new table_array_control_1.TableArrayControlRenderer();
    const schema = {
        'type': 'object',
        'properties': {
            'test': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'x': { 'type': 'integer' },
                        'y': { 'type': 'integer' }
                    }
                }
            }
        }
    };
    const uiSchema = {
        'label': false,
        'type': 'Control',
        'scope': {
            '$ref': '#/properties/test'
        }
    };
    const data = {
        test: []
    };
    renderer.setDataService(new data_service_1.DataService(data));
    renderer.setDataSchema(schema);
    renderer.setUiSchema(uiSchema);
    renderer.connectedCallback();
    const button = renderer.getElementsByTagName('button')[0];
    button.click();
    t.is(data.test.length, 1);
});
ava_1.default('array-layout add click with data', t => {
    const renderer = new table_array_control_1.TableArrayControlRenderer();
    const schema = {
        'type': 'object',
        'properties': {
            'test': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'x': { 'type': 'integer' },
                        'y': { 'type': 'integer' }
                    }
                }
            }
        }
    };
    const uiSchema = {
        'label': false,
        'type': 'Control',
        'scope': {
            '$ref': '#/properties/test'
        }
    };
    const data = {
        'test': [{
                x: 1,
                y: 3
            }]
    };
    renderer.setDataService(new data_service_1.DataService(data));
    renderer.setDataSchema(schema);
    renderer.setUiSchema(uiSchema);
    renderer.connectedCallback();
    const button = renderer.getElementsByTagName('button')[0];
    button.click();
    t.is(data.test.length, 2);
});
ava_1.default('array-layout DataService notification', t => {
    const renderer = new table_array_control_1.TableArrayControlRenderer();
    const schema = {
        'type': 'object',
        'properties': {
            'test': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'x': { 'type': 'integer' },
                        'y': { 'type': 'integer' }
                    }
                }
            }
        }
    };
    const uiSchema = {
        'label': false,
        'type': 'Control',
        'scope': {
            '$ref': '#/properties/test'
        }
    };
    const data = {
        'test': [{
                x: 1,
                y: 3
            }]
    };
    const dataService = new data_service_1.DataService(data);
    renderer.setDataService(dataService);
    renderer.setDataSchema(schema);
    renderer.setUiSchema(uiSchema);
    renderer.connectedCallback();
    const childrenInitial = renderer.getElementsByTagName('TBODY')[0];
    t.is(childrenInitial.childNodes.length, 1);
    dataService.notifyAboutDataChange(uiSchema, [{ x: 1, y: 3 }, { x: 2, y: 3 }]);
    const childrenAfter = renderer.getElementsByTagName('TBODY')[0];
    t.is(childrenAfter.childNodes.length, 2);
    dataService.notifyAboutDataChange(undefined, [{ x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }]);
    const childrenIgnore = renderer.getElementsByTagName('TBODY')[0];
    t.is(childrenIgnore.childNodes.length, 2);
    renderer.disconnectedCallback();
    dataService.notifyAboutDataChange(uiSchema, [{ x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }]);
    const childrenLast = renderer.getElementsByTagName('TBODY')[0];
    t.is(childrenLast.childNodes.length, 2);
});
ava_1.default('array-layout Tester', t => {
    t.is(table_array_control_1.tableArrayTester({ type: 'Foo' }, null), -1);
});
ava_1.default('array-layout tester with recursive document ref only', t => {
    const control = {
        type: 'Control',
        scope: {
            $ref: '#'
        }
    };
    t.is(table_array_control_1.tableArrayTester(control, undefined), -1);
});
ava_1.default('array-layout tester with prop of wrong type', t => {
    const control = {
        type: 'Control',
        scope: {
            $ref: '#/properties/x'
        }
    };
    t.is(table_array_control_1.tableArrayTester(control, { type: 'object', properties: { x: { type: 'integer' } } }), -1);
});
ava_1.default('array-layout tester with correct prop type, but without items', t => {
    const control = {
        type: 'Control',
        scope: {
            $ref: '#/properties/foo'
        }
    };
    t.is(table_array_control_1.tableArrayTester(control, { type: 'object', properties: { foo: { type: 'array' } } }), -1);
});
ava_1.default('array-layout tester with correct prop type, but different item types', t => {
    const control = {
        type: 'Control',
        scope: {
            $ref: '#/properties/foo'
        }
    };
    t.is(table_array_control_1.tableArrayTester(control, {
        type: 'object',
        properties: {
            foo: {
                type: 'array',
                items: [
                    { type: 'integer' },
                    { type: 'string' },
                ]
            }
        }
    }), -1);
});
ava_1.default('array-layout tester with primitive item type', t => {
    const control = {
        type: 'Control',
        scope: {
            $ref: '#/properties/foo'
        }
    };
    t.is(table_array_control_1.tableArrayTester(control, {
        type: 'object',
        properties: {
            foo: {
                type: 'array',
                items: { type: 'integer' }
            }
        }
    }), -1);
});
ava_1.default('array-layout with correct option being set', t => {
    const schema = {
        type: 'object',
        properties: {
            test: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        x: { type: 'integer' },
                        y: { type: 'integer' }
                    }
                }
            }
        }
    };
    const uiSchema = {
        type: 'Control',
        scope: {
            $ref: '#/properties/test'
        }
    };
    const uiSchema2 = {
        type: 'Control',
        scope: {
            $ref: '#/properties/test'
        },
        options: {
            table: true
        }
    };
    t.is(table_array_control_1.tableArrayTester(uiSchema, schema), -1);
    t.is(table_array_control_1.tableArrayTester(uiSchema2, schema), 10);
});
//# sourceMappingURL=table-array.control.test.js.map