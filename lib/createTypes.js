import { pipe, reject, map, fromPairs, anyPass, isNil, isEmpty } from 'ramda'

const isNilOrEmpty = anyPass([isNil, isEmpty])

const _FULFILLED = "_FULFILLED";
const _PENDING = "_PENDING";
const _REJECTED = "_REJECTED";

export default (types) => {
    if (isNilOrEmpty(types)) throw new Error('valid types are required')

    var items = [];
    types.forEach(x => {
        items.push(x);
        items.push(`${x}${_FULFILLED}`);
        items.push(`${x}${_PENDING}`);
        items.push(`${x}${_REJECTED}`);
    })

    return pipe(
        reject(isNilOrEmpty),
        map(x => [x, prefix + x]),
        map(x => [x, x]),
        fromPairs
    )(types)
}
