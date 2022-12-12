<template>
  <section>
    <header class="page_header">
      <h2>connect with friends and the world around you on not-fritter.</h2>
    </header>

    <h1>Create an account</h1>
    <SignupForm />

    <p>
      Already have an account? <router-link to="/login">
        Log in
      </router-link>
    </p>
  </section>
</template>

<script>
import SignupForm from '@/components/User/SignupForm.vue';

export default {
  name: 'NonAuthedHomePage',
  components: {
    SignupForm
  }
};
</script>

<style scoped>
.page_header {
  max-width: 30rem; /* So the one-liner wraps */
}

footer {
  margin-top: 2rem;
}
</style>