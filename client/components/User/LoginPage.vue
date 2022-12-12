<template>
  <main>
    <section>
      <header>
        <h2>Log in</h2>
      </header>
      <LoginForm />
      <p>
        Don't have an account yet? <router-link to="/">
          Sign up
        </router-link>
      </p>
    </section>
  </main>
</template>

<script>
import LoginForm from '@/components/User/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: {
    LoginForm
  }
};
</script>
