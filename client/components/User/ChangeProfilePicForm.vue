<!-- Form for changing password (block style) -->

<script>
import BlockForm from '@/components/util/BlockForm.vue';

export default {
  name: 'ChangeProfilePicForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'PATCH',
      hasBody: true,
      fields: [],
      hasImage: true,
      title: 'Change profile pic',
      callback: () => {
        const message = 'Successfully changed profile pic!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
