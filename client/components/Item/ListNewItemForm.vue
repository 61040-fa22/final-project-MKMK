<script>
import BlockForm from '@/components/util/BlockForm.vue';

export default {
  name: 'ListNewItemForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/items',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'name', label: 'Name', value: ''},
        {id: 'description', label: 'Description', type: 'textarea', value: ''},
      ],
      title: 'List new item',
      buttonLabel: 'Submit',
      callback: (res) => {
        this.$store.commit('refreshItems');
        this.$store.commit('alert', {
          message: 'Successfully created an item!', status: 'success'
        });
        this.$router.push({name: 'Item', params: {id: res.item._id}});
      }
    };
  }
};
</script>