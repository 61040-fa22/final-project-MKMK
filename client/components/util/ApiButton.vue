<template>
  <form @submit.prevent="submit">
    <button type="submit" style="width:100%">
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
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        if (this.setUsername) {
          this.$store.commit('setUsername', res?.user?.username);
        }
        if (this.refreshEntries) {
          this.$store.commit('refreshEntries');
        }
        if (this.callback) {
          this.callback(res);
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
