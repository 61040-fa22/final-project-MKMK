<script>
import BlockForm from '@/components/util/BlockForm.vue';

export default {
  name: 'WriteDiaryPostForm',
  mixins: [BlockForm],
  data() {
    return {
      // TODO
      url: '/api/freets',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'content', label: 'Content', value: ''}
      ],
      title: 'Write diary post',
      refreshFreets: true,
      callback: () => {
        const message = 'Successfully created a freet!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
