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
 * @param stateClone
 * @param inputKey - defaults to 'input' but can be used
 *      for other state objects with same data structure {value: value, error: bool, ref: React.ref()}
 */
export const createPayload = (stateClone, inputKey) => {
    inputKey = inputKey || 'inputs';

    let payload = {};
    for (let keyName in stateClone[inputKey]) {
        payload[keyName] = stateClone[inputKey][keyName].value;
    }

    return payload;
};

export default inputObject;