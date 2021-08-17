<template>
  <div class="category-item">
    <div class="category-item-user">
      <i class="material-icons ">{{ categoryInfo.icon }}</i>
    </div>
    <p>{{ categoryInfo.title }}</p>
    <button @click="showEditableForm" class="change" :data-id=categoryInfo.id><i class="material-icons">create</i>
    </button>
    <button @click="deleteCategory" class="delete" :data-id=categoryInfo.id><i class="material-icons">clear</i>
    </button>
      <div class="loader" :class="{active:localLoader, done: !localLoader}">
      <Loader/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categoryInfo: {
      type: Object,
      required: true
    },
    localLoader: Boolean
  },
  emits: ['showEditableForm', 'deleteCategory'],
  methods: {
    showEditableForm(e) {
      this.$emit('showEditableForm', e)
    },
    deleteCategory(e) {
      this.$emit('deleteCategory', e)
    }
  }
}
</script>
