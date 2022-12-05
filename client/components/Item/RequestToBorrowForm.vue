<script>
import BlockForm from '@/components/util/BlockForm.vue';

export default {
  name: 'RequestToBorrowForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/requests',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'startDate', type: 'date', label: 'Start Date'},
        {id: 'endDate', type: 'date', label: 'End Date', value: ''},
        {id: 'message', type: 'textarea', label: 'Message', value: '', placeholder: 'Write a message to request to borrow this item'}
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
