<template>
  <main class="page_content">
    <ChangeUsernameForm />
    <ChangePasswordForm />
    <ChangeProfilePicForm />
    <DeleteAccountForm />
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
