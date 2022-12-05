<template>
  <form @submit.prevent="submit">
    <button type="submit">
      {{ title }}
    </button>
  </form>
</template>

<script>

export default {
  name: 'ApiButton',
  props: {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true
    },
    setUsername: {
      type: Boolean,
      default: false
    },
    callback: {
      type: Function,
      default: null
    }
  },
  methods: {
    async submit() {
      /**
        * Submits a form with the specified options from data().
        */
      const options = {
        method: this.method,
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin'
      };

      try {
        const r = await fetch(this.url, options);

        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        if (this.setUsername) {
          const text = await r.text();
          const res = text ? JSON.parse(text) : {user: null};
          this.$store.commit('setUsername', res.user ? res.user.username : null);
        }

        if (this.refreshEntries) {
          this.$store.commit('refreshEntries');
        }

        if (this.callback) {
          this.callback();
        }
      } catch (e) {
        this.$store.commit('alert', {
          message: e,
          status: 'error'
        });
      }
    }
  }
};
</script>

<style scoped>
</style>
