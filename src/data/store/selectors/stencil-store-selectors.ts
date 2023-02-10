import { createSelector } from '@reduxjs/toolkit';
import { GetTodosResponse } from '../../api/todos/todos.api';
import { getTodosSelector } from '../../api/todos/todos.selectors';
import { GetUserDetailsResponse } from '../../api/users/users.api';
import { getUserDetailsSelector } from '../../api/users/users.selectors';
import { EnergyLevel } from '../../types/energy-level';
import { RootState, store } from '../store';
import { createStore } from "@stencil/store";

const selectSelf = (state: RootState) => state.todos;
export const selectEnergyLevel = createSelector(
  selectSelf,
  state => state.energyLevel
);

export const energyLevelStore = createStore<{ energyLevel: EnergyLevel }>({ energyLevel: 'great' });
export const $$energyLevel = energyLevelStore.state;
export const getTodosRespStore = createStore<{ value: GetTodosResponse }>({ value: undefined });
export const $$getTodosResp = getTodosRespStore.state;
export const getUserDetailsRespStore = createStore<{ value: GetUserDetailsResponse }>({ value: undefined });
export const $$getUserDetailsResp = getUserDetailsRespStore.state;


store.subscribe(() => {
  const state = store.getState();

/*   const getTodosResp = getTodosSelector()(state);

  getTodosRespStore.state.value = getTodosResp; */

/*   const getUserDetailsResp = getUserDetailsSelector()(state);
  .state.vagetUserDetailsRespStorelue = getUserDetailsResp; */

  const energyLevel = selectEnergyLevel(state)
  energyLevelStore.state.energyLevel = energyLevel;
});
