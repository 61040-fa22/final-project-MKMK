<script>
import BlockForm from '@/components/util/BlockForm.vue';

export default {
  name: 'SignupForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'POST',
      hasBody: true,
      setUsername: true,
      fields: [
        {id: 'username', label: 'Username', value: ''},
        {id: 'password', label: 'Password', value: ''}
      ],
      title: '',
      buttonLabel: 'Sign up',
      callback: () => {
        this.$router.push({name: 'Home'});
        this.$store.commit('alert', {
          message: 'Welcome to BeLender!',
          status: 'success'
        });
      }
    };
  }
};
</script>
