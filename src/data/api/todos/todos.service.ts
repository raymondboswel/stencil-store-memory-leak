import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { getTodosRespStore } from "../../store/selectors/stencil-store-selectors";
import { store } from "../../store/store";
import { EnergyLevel } from "../../types/energy-level";
import { todosApi, todosArgsCache } from "./todos.api";

export class TodosService {
  private getTodos = todosApi.endpoints.getTodos.initiate;

  constructor() { }

  initiateTodosRequest(energyLevel: EnergyLevel) {
    const args = { params: { energyLevel: energyLevel } };
    todosArgsCache.getTodos = args;
    console.log("TodosArgsCache");

    return store.dispatch(this.getTodos(args));


  }

  async fetchTodos(energyLevel: EnergyLevel) {
    const res = await fetch("http://localhost:3000/todos?energyLevel=" + energyLevel);
    const json = await res.json();
    getTodosRespStore.state.value = {
      data: json,
      status: QueryStatus.fulfilled,
      error: undefined,
      originalArgs: {},
      requestId: "",
      endpointName: "todos",
      startedTimeStamp: 0,
      fulfilledTimeStamp: 0,
      isUninitialized: false,
      isLoading: false,
      isSuccess: true,
      isError: false
    }
  }
}
export const todosService = new TodosService();
