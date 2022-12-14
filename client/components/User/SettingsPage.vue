<template>
  <main class="page_container">
    <section>
      <header>
        <h2>Account settings for @{{ $store.state.username }}</h2>
      </header>
      <ChangeUsernameForm />
      <ChangePasswordForm />
      <ChangeProfilePicForm />
    </section>
    <section>
      <header>
        <h2>Account management</h2>
      </header>
      <DeleteAccountForm />
    </section>
  </main>
</template>

<script>
import ChangeUsernameForm from '@/components/User/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/User/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/User/DeleteAccountForm.vue';
import ChangeProfilePicForm from '@/components/User/ChangeProfilePicForm.vue';

export default {
  name: 'SettingsPage',
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    ChangeProfilePicForm
  }
};
</script>
