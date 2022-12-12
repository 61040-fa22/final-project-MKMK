<script>
import BlockForm from '@/components/util/BlockForm.vue';

export default {
  name: 'RequestToBorrowForm',
  mixins: [BlockForm],
  props: {
    itemId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      url: '/api/requests',
      method: 'POST',
      hasBody: true,
      requestBody: {
        itemId: this.itemId
      },
      fields: [
        {id: 'startDate', label: 'Start Date', type: 'date'},
        {id: 'endDate', label: 'End Date', type: 'date'}
      ],
      title: 'Borrow this item',
      refreshEntries: true,
      callback: () => {
        const message = 'Successfully requested an Item!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
