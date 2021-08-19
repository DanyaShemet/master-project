<template>
  <div class="category-item">
    <div class="category-item-user">
      <i class="material-icons ">{{ categoryInfo.icon }}</i>
    </div>
    <p>{{ categoryInfo.title }}</p>
    <button @click="this.$emit('showEditableForm', categoryInfo.id)" class="change" ><i class="material-icons">create</i>
    </button>
    <button @click=" this.$emit('deleteCategory', categoryInfo.id)" class="delete" ><i class="material-icons">clear</i>
    </button>
    <div class="loader" :class="classObject">
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
    deletedId: String | Number,
    localLoader: Boolean
  },
  emits: ['showEditableForm', 'deleteCategory'],
  methods: {

  },
  computed: {
    classObject: function () {
      return {
        active: this.localLoader && this.deletedId === this.categoryInfo.id,
        done: !this.localLoader

      }
    }
  },
}
</script>
