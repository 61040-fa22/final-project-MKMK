<!-- Form for signing in (block style) -->

<script>
import BlockForm from '@/components/util/BlockForm.vue';

export default {
  name: 'LoginForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users/session',
      method: 'POST',
      hasBody: true,
      setUsername: true,
      fields: [
        {id: 'username', label: 'Username', value: ''},
        {id: 'password', label: 'Password', type: 'password', value: ''}
      ],
      title: '',
      buttonLabel: 'Log in',
      callback: () => {
        this.$router.push({name: 'Home'});
        this.$store.commit('alert', {
          message: 'You are now logged in', status: 'success'
        });
      }
    };
  }
};
</script>
