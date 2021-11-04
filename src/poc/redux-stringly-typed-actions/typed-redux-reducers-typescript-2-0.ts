import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

// https://spin.atomicobject.com/2016/09/27/typed-redux-reducers-typescript-2-0/

type IncrementCounterActionType = 'INCREMENT_COUNTER';
const INCREMENT_COUNTER : IncrementCounterActionType = 'INCREMENT_COUNTER';
type IncrementCounterAction = {
  readonly type: IncrementCounterActionType;
  readonly payload: IncrementCounterActionPayload;
};
type IncrementCounterActionPayload = {
  readonly by: number;
};

type DecrementCounterActionType = 'DECREMENT_COUNTER';
const DECREMENT_COUNTER : DecrementCounterActionType = 'DECREMENT_COUNTER';
type DecrementCounterAction = {
  readonly type: DecrementCounterActionType;
  readonly payload: DecrementCounterActionPauload;
};

type LogoutUserActionType = 'LOGOUT_USER';
const LOGOUT_USER : LogoutUserActionType = 'LOGOUT_USER';
type DecrementCounterActionPauload = {
  readonly by: number;
};

type LogoutUserAction = {
  readonly type: LogoutUserActionType;
  readonly payload: LogoutUserActionPayload
};
type LogoutUserActionPayload = undefined;

type StateType = {
  readonly count: number;
}

const INITIAL_STATE: StateType = {
  count: 0,
};


const slice = createSlice({
  name: 'App',
  initialState: INITIAL_STATE,
  reducers: {
    // Cannot impose types here - generics are ognored
    incrementCounter(
      state: Draft<StateType>,
      action: PayloadAction<IncrementCounterActionPayload>
    ) {
      const p = action.payload;
      const count = state.count;
      state.count++;
    }
  }
});
