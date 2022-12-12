<template>
  <main class="page_container">
    <ListNewItemForm />
  </main>
</template>

<script>
import ListNewItemForm from '@/components/Item/ListNewItemForm.vue';

export default {
  name: 'ListNewItemPage',
  components: {
    ListNewItemForm
  }
};
</script>
