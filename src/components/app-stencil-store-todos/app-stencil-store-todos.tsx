import { Component, h } from '@stencil/core';
import { todosService } from '../../data/api/todos/todos.service';
//import { userDetailsService } from '../../data/api/users/user-details.service';
import { energyLevelStore, getTodosRespStore, getUserDetailsRespStore } from '../../data/store/selectors/stencil-store-selectors';
// import { $$energyLevel, $$getTodosResp, $$getUserDetailsResp } from '../../data/store/selectors/stencil-store-selectors';

import { EnergyLevel } from '../../data/types/energy-level';

@Component({
  tag: 'app-stencil-store-todos',
  shadow: true,
})
export class AppTodos {

  initiateRequests() {
    todosService.fetchTodos(energyLevelStore.state.energyLevel);
  }

  connectedCallback() {
    this.initiateRequests();
  }

  disconnectedCallback() {
  }


  disposeSubscriptions() {
  }

  setEnergyLevel(energyLevel: EnergyLevel) {
    energyLevelStore.state.energyLevel = energyLevel;
    this.initiateRequests();
  }

  render() {
    return <article style={{ "display": "flex", "gap": "16px", "justify-content": "center", "flex-direction": "column", "align-items": "center" }}>
      <header style={{ "font-weight": "bold" }}>{getUserDetailsRespStore.state.value?.data?.name}'s Stencil Store Todo List</header>
      <section>
        {getTodosRespStore.state.value?.data?.map(todo =>
          <div>{todo.description}</div>
        )}
      </section>
      <section >
        <button onClick={() => this.setEnergyLevel('tired')}>Running low on energy</button>
        <button onClick={() => this.setEnergyLevel('great')}>I'm feeling great!</button>
      </section >
    </article >
  }
}
