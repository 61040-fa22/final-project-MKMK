<script>
import BlockForm from '@/components/util/BlockForm.vue';

export default {
  name: 'ListNewItemPage',
  mixins: [BlockForm],
  data() {
    return {
      // TODO
      url: '/api/items',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'name', label: 'Name', value: ''},
        {id: 'description', label: 'Description', value: ''},
      ],
      title: 'List new item',
      callback: () => {
        const message = 'Successfully created an item!';
        this.$store.commit('refreshItems');
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
