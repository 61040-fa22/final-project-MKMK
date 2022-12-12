<script>
import BlockForm from '@/components/util/BlockForm.vue';

export default {
  name: 'WriteDiaryPostForm',
  mixins: [BlockForm],
  data() {
    return {
      // TODO
      url: '/api/entries',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'content', label: 'Content', type: 'textarea', value: ''},
        {id: 'itemId', label: 'ID'}
      ],
      title: 'Write diary post',
      refreshEntries: true,
      callback: () => {
        const message = 'Successfully created a entry!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
