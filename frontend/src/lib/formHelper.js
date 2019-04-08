import React from 'react';

/**
 * Generates the generic input object state items tied to input elements
 * @param value
 * @param error
 * @param ref
 * @returns {{ref: *, error: *, value: *}}
 */
export const inputObject = (value, error, ref) => {
    value = value || "";
    error = error || "";
    ref = ref || React.createRef();

    return {
        value: value,
        error: error,
        ref: ref
    };
};

/**
 * updates the stateClone input value and returns it
 *
 * @param event
 * @param stateClone
 * @param keyName - can point to 'ref' or 'error' key, default is 'value'
 * @returns {*}
 */
export const updateInputObject = (event, stateClone, keyName) => {
    let value = event.target.value,
        targetName = event.target.name;

    keyName = keyName || "value";

    stateClone.inputs[targetName][keyName] = value;

    return stateClone;
};

/**
 * iterate over the inputkey.inputobject.value into a seperate object
 * @param state
 * @param inputKey - defaults to 'input' but can be used
 *      for other state objects with same data structure {value: value, error: bool, ref: React.ref()}
 */
export const createPayload = (state, inputKey) => {
    inputKey = inputKey || 'inputs';

    let payload = {};
    for (let keyName in state[inputKey]) {
        payload[keyName] = state[inputKey][keyName].value;
    }

    return payload;
};

export const updateInputWithError = (response, stateClone) => {
    let errors = response.data.errors;

    for (let errorIndex in errors) {
        let field = errors[errorIndex].field;
        stateClone.inputs[field].error = true;
    }

    return stateClone;
};

export const clearErrorOnBlur = (event, stateClone) => {
    let targetName = event.target.name;

    stateClone.inputs[targetName].error = false;
    return stateClone;
};

export default inputObject;