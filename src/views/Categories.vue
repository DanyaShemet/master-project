<template>
  <div class="categories container" ref="categories">
    <BigLoader v-if="loading"/>
    <div v-else>
      <h4>Ваші категорії</h4>
      <div class="categories-wrap" :class="categories.length % 3 === 0 ? 'sb' : ''">
          <CategoryItem
              :categoryInfo="category"
              @showEditableForm="showEditableForm"
              @deleteCategory="deleteCategory"
              v-for="category in categories"
              :localLoader="localLoader"
              :deleted-id="deletedId"
              :key="category.id"/>
      </div>
      <div class="action-buttons action-buttons-category">
        <button @click="showCreatableForm" class="action-emotion" v-if="!isEditable"
                :class="isCreatable ? 'minus minus-category' : 'plus-category plus'">{{ isCreatable ? '-' : '+' }}
        </button>
        <button @click="hideEditableForm" class="action-emotion minus minus-category" v-if="isEditable">-</button>
      </div>
      <CreateCategory v-if="isCreatable"
                      @created="addNewCategory"
                      :icons="categoryIcons"
                      :categories="categories"/>
      <EditCategory v-if="isEditable && editableCategory"
                    :category="editableCategory"
                    :icons="categoryIcons"
                    :categories="categories"
                    @updated="updateCategories"
                    :key="isRerender"/>
    </div>
  </div>
</template>

<script>
import CreateCategory from '@/components/categories/CreateCategory'
import EditCategory from '@/components/categories/EditCategory'
import CategoryItem from "@/components/categories/CategoryItem";


export default {
  data: () => ({
    categoryIcons: [
      'brightness_3',
      'rowing',
      'accessibility',
      'audiotrack',
      'child_care',
      'directions_run',
      'emoji_events',
      'delete',
      'touch_app',
      'hot_tub',
      'casino',
      'cake',
      'school',
      'sick',
      'emoji_food_beverage',
      'beach_access',
      'duo',
      'tv',
      'headset',
      'airplanemode_active',
      'brightness_5',
      'videogame_asset',
      'color_lens',
      'sports_bar',
      'euro_symbol',
      'pool',
      'alternate_email',
      'center_focus_strong',
      'play_circle_filled',
      'psychology',
      'sports_kabaddi',
      'kayaking',
      'mood_bad',
    ],
    categories: [],
    isEditable: false,
    editableCategory: {},
    updateCount: 0,
    isCreatable: false,
    isRerender: 0,
    loading: false,
    localLoader: false,
    deletedId: 0,
    teacherPassword: '',

  }),
  async mounted() {
    this.loading = true
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    let userIcons = []
    this.categories.forEach(el => {
      userIcons.push(el.icon)
    })
    for (let i of userIcons) {
      const idxOfCategoryIcons = this.categoryIcons.findIndex(s => s === i)
      this.deleteIcons(idxOfCategoryIcons)
    }
  },
  methods: {
    deleteIcons(idx) {
      this.categoryIcons.splice(idx, 1)
    },
    async addNewCategory(category) {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.isCreatable = false
      this.categoryIcons = this.categoryIcons.filter(icon => icon !== category.icon)
    },
    updateCategories(category) {
        const idx = this.categories.findIndex(c => c.id === category.id)
        this.categoryIcons.push(this.categories[idx].icon)
        this.categories[idx].title = category.title
        this.categories[idx].icon = category.icon
        this.categoryIcons = this.categoryIcons.filter(icon => icon !== category.icon)
        this.isEditable = false
    },
    async deleteCategory(e) {
      let catId = e
      this.localLoader = true
      this.deletedId = catId
      const idx = this.categories.findIndex(c => c.id === catId)
      this.categoryIcons.push(this.categories[idx].icon)
      await this.$store.dispatch('deleteCategory', catId)
      if (this.categories.length > 1) {
        let cat = this.categories.filter(c => {
          return c.id !== catId
        })
        this.categories = [...cat]
      } else {
        this.categories = []
      }
      if (this.editableCategory.id === catId) {
        this.isEditable = false
      }
      this.localLoader = false

      this.$message('Категорія була видалена')
    },
    async showEditableForm(e) {
      this.isRerender += 1
      this.isCreatable = false
      let catId = e
      this.isEditable = true
      let category = await this.$store.dispatch('fetchCategoryById', catId)
      this.editableCategory = {
        id: category.id,
        title: category.title,
        icon: category.icon,
      }
      this.isRerender = Date.now()
    },
    showCreatableForm() {
      window.scrollBy({
        top: this.$refs.categories.getBoundingClientRect().top - 100,
        behavior: 'smooth'
      })
      this.isCreatable = !this.isCreatable
    },
    hideEditableForm() {
      this.isEditable = false
      window.scrollBy({
        top: this.$refs.categories.getBoundingClientRect().top - 100,
        behavior: 'smooth'
      })
    }
  },
  name: 'categories',
  components: {
    CategoryItem,
    CreateCategory, EditCategory
  }
}
</script>

<style lang="scss">
@import '@/assets/_vars.scss';
h4 {
  color: $secondary-color;
  text-align: left;
  font-weight: 500;
  font-size: 30px;
}

.categories-wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;

  &.sb {
    justify-content: space-between;
  }

  .category-item {
    padding: 5px 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
    width: 50%;

    .category-item-user {
      width: 41px;
      height: 41px;
      border-radius: 5px;
      border: 1px solid #000;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
    }

    p {
      font-size: 14px;
      font-weight: 300;
      margin-right: 15px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .change, .delete {
      cursor: pointer;

      s
      i {
        font-size: 20px !important;
      }

      &:focus {
        background-color: #fff;
      }

    }

    .delete {
      color: #C0C0C0;
    }
  }
}

.loader {
  position: absolute;
  margin-top: 0;
  visibility: hidden;
}

div.active {
  visibility: visible;
}

div.done {
  visibility: hidden;
}

.action-buttons-category button {
  margin-right: 0 !important;
  width: 38px;
  height: 38px;
  font-size: 18px;
}

.plus-category {
  border: 1px solid #000 !important;
  width: 38px;
  height: 38px;
  font-size: 18px;

  &:focus {
    background-color: #fff;
  }
}

@media screen and (max-width: 768px) {

  .categories {
    margin-top: 70px;
    margin-bottom: 50px;
  }
  h4 {
    text-align: center;
  }
  .categories-wrap {

    .category-item {
      justify-content: center;
      width: 50%;

      p {
        width: 150px;
      }
    }
  }

}

@media screen and (max-width: 550px) {
  .categories-wrap {
    height: 300px;
    overflow-y: scroll;

    .category-item {
      width: 100%;
    }
  }

}

</style>
