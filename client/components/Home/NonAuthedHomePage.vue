<template>
  <section class="page_content">
    <header class="page_header">
      <h2>connect with friends and the world around you on not-fritter.</h2>
    </header>

    <h1>sign up</h1>
    <RegisterForm />

    <footer>
      <p>
        already have an account? <router-link to="/login">
          sign in
        </router-link>
      </p>
    </footer>
  </section>
</template>

<script>
import RegisterForm from '@/components/Login/RegisterForm.vue';

export default {
  name: 'NonAuthedHomePage',
  components: {
    RegisterForm
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