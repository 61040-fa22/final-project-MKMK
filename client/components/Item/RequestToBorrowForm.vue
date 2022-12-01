<script>
import BlockForm from '@/components/util/BlockForm.vue';

export default {
  name: 'RequestToBorrowForm',
  mixins: [BlockForm],
  data() {
    return {
      // TODO
      url: '/api/entries',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'startDate', label: 'Start Date', value: ''},
        {id: 'endDate', label: 'End Date', value: ''},
        {id: 'message', label: 'Message', value: ''}
      ],
      title: 'Borrow this item',
      refreshEntries: true,
      callback: () => {
        const message = 'Successfully created an entry!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
