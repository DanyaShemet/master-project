<template>
  <div class="categories container" ref="categories">
    <BigLoader v-if="loading"/>
    <div v-else >

      <h4 >Ваши категории</h4>

      <div class="categories-wrap" :class="categories.length % 3 === 0 ? 'sb' : ''">
        <div class="category-item" v-for="category in categories" :key="category.id">
          <div class="category-item-user">
            <i class="material-icons ">{{ category.icon }}</i>
          </div>
          <p>{{ category.title }}</p>

          <button @click="showEditableForm" class="change" :data-id=category.id ><i class="material-icons">create</i></button>
          <button @click="deleteCategory" class="delete" :data-id=category.id><i class="material-icons">clear</i></button>
          <div class="done loader" :id="category.id"> <Loader /></div>
        </div>
      </div>

      <div class="action-buttons action-buttons-category">
        <button @click="showCreatableForm" class="action-emotion" v-if="!isEditable"
                :class="isCreatable ? 'minus minus-category' : 'plus-category plus'">{{ isCreatable ? '-' : '+' }}
        </button>
        <button @click="hideEditableForm" class="action-emotion minus minus-category" v-if="isEditable">-</button>
      </div>
      <CreateCategory @created="addNewCategory" :icons="categoryIcons" v-if="isCreatable" :categories="categories"/>
      <EditCategory v-if="isEditable && editableCategory" :category="editableCategory" :icons="categoryIcons" @updated="updateCategories"
                    :categories="categories" :key="isRerender"/>
    </div>

  </div>
</template>

<script>
import CreateCategory from '@/components/categories/CreateCategory'
import EditCategory from '@/components/categories/EditCategory'

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
      'videogame_asset',
      'sports_bar',
      'euro_symbol',
      'pool',
      'alternate_email',
      'center_focus_strong',
      'play_circle_filled',
    ],
    categories: [],
    isEditable: false,
    editableCategory: {},
    updateCount: 0,
    isCreatable: false,
    isRerender: 0,
    loading: false,
  }),
  async mounted() {
    this.loading= true
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
      let catId = e.target.dataset.id
      document.querySelector('#'+catId).classList.add('active')
      document.querySelector('#'+catId).classList.remove('done')
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
      if (this.editableCategory.id === catId){
        this.isEditable = false
      }
      document.querySelector('#'+catId).classList.remove('active')
      this.$message('Категория была удалена')
    },
    async showEditableForm(e) {
      this.isRerender += 1
      this.isCreatable = false
      let catId = e.target.dataset.id
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
    CreateCategory, EditCategory
  }
}
</script>

<style scoped lang="scss" >
h4{
  color: #C0C0C0;
  text-align: left;
  font-weight: 500;
  font-size: 30px;
}
.categories-wrap{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;

  &.sb{
    justify-content: space-between;
  }
  .category-item{
    padding: 5px 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
    width: 33%;
    .category-item-user{
      width: 41px;
      height: 41px;
      border-radius: 5px;
      border: 1px solid #000;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
    }
    p{
      font-size: 14px;
      font-weight: 300;
      margin-right: 15px;
      text-overflow: ellipsis;
      width: 60px;
      overflow: hidden;
    }
    .change , .delete{
      cursor: pointer;s
      i{
        font-size: 20px !important;
      }
      &:focus{
        background-color: #fff;
      }

    }

    .delete{
      color: #C0C0C0;
    }
  }
}
.loader{
  position: absolute;
  margin-top: 0;
}
div.active{
  visibility: visible;
}
div.done{
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

@media screen and (max-width: 768px){

  .categories{
    margin-top: 70px;
    margin-bottom: 50px;
  }
  h4{
    text-align: center;
  }
  .categories-wrap{

    .category-item{
      justify-content: center;
      width: 50%;
      p{
        width: 150px;
      }
    }
  }

}

@media screen and (max-width: 550px){
  .categories-wrap{
    height: 200px;
    overflow-y: scroll;
    .category-item{
      width: 100%;
    }
  }

}

</style>
