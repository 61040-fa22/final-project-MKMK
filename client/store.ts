import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown entries by (null = show all)
    entries: [], // All entries created in the app
    items: [], // All items in the app
    requests: [], // All requests to and from this user
    handoffs: [], // All incomplete borrowing instances involving this user
    username: null, // Username of the logged in user
    alerts: {} // global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored entries filter to the specified one.
       * @param filter - Username of the user to fitler entries by
       */
      state.filter = filter;
    },
    updateEntries(state, entries) {
      /**
       * Update the stored entries to the provided entries.
       * @param entries - Entries to store
       */
      state.entries = entries;
    },
    async refreshEntries(state) {
      /**
       * Request the server for the currently available entries.
       */
      const url = state.filter ? `/api/users/${state.filter}/entries` : '/api/entries';
      const res = await fetch(url).then(async r => r.json());
      state.entries = res;
    },
    async refreshRequests(state) {
      /**
       * Request the server for requests for this user
       */
      const url = `/api/requests?user=${state.username}`;
      const res = await fetch(url).then(async r => r.json());
      state.requests = res.filter(request => request.accepted === null);
    },
    async refreshHandoffs(state) {
      /**
       * Request the server for active borrows for this user
       */
      const url = `/api/handoffs?user=${state.username}`;
      const res = await fetch(url).then(async r => r.json());
      state.handoffs = res;
    },
    async refreshItems(state) {
      /**
       * Request the server for items
       */
      const url = `/api/items`;
      const res = await fetch(url).then(async r => r.json());
      state.items = res;
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
