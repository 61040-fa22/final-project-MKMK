<script>
import BlockForm from '@/components/util/BlockForm.vue';

export default {
  name: 'WriteDiaryPostForm',
  mixins: [BlockForm],
  props: {
    itemId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      url: '/api/entries',
      method: 'POST',
      hasBody: true,
      requestBody: {
        itemId: this.itemId
      },
      fields: [
        {id: 'content', label: '', type: 'textarea', value: ''}
      ],
      title: 'Write in item diary',
      buttonLabel: 'Submit',
      refreshEntries: true,
      callback: (res) => {
        this.$store.commit('alert', {
          message: res.message,
          status: 'success'
        });
      }
    };
  }
};
</script>
