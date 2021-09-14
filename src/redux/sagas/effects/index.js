import {fork, cancel, take} from 'redux-saga/effects';

export const takeLatestByIdGen = (patternOrChannel, saga, idProp, ...args) =>
    function* () {
        let lastTasks = {};
        while (true) {
            const action = yield take(patternOrChannel);
            if (lastTasks[action.payload[idProp]]) {
                yield cancel(lastTasks[action.payload[idProp]]);
            }
            lastTasks[action.payload[idProp]] = yield fork(
                saga,
                ...args.concat(action)
            );
        }
    };

export const takeLatestById = (patternOrChannel, saga, idProp, ...args) =>
    fork(takeLatestByIdGen(patternOrChannel, saga, idProp, ...args));
