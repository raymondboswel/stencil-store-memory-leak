import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import { getUserDetailsRespStore } from "../../store/selectors/stencil-store-selectors";
import { store } from "../../store/store";
import { usersApi } from "./users.api";

export class UserDetailsService {
  private getUserDetails = usersApi.endpoints.getUserDetails.initiate;

  constructor() { }

  initiateUserDetailsRequest() {

    return store.dispatch(this.getUserDetails({}));
  }

  async fetchUser() {
    const res = await fetch("http://localhost:3000/user-details");
    const json = await res.json();
    getUserDetailsRespStore.state.value = {
      data: json,
      status: QueryStatus.fulfilled,
      error: undefined,
      originalArgs: {},
      requestId: "",
      endpointName: "user-details",
      startedTimeStamp: 0,
      fulfilledTimeStamp: 0,
      isUninitialized: false,
      isLoading: false,
      isSuccess: true,
      isError: false
    }
  }
}
export const userDetailsService = new UserDetailsService();
