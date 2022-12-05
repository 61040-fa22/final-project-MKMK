<script>
import BlockForm from '@/components/util/BlockForm.vue';

export default {
  name: 'RequestToBorrowForm',
  mixins: [BlockForm],
  props: {
    itemId: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      url: '/api/requests',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'startDate', label: 'Start Date', value: ''},
        {id: 'endDate', label: 'End Date', value: ''},
        {id: 'itemId', label: 'Item [do not edit this]', value: this.itemId}
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
