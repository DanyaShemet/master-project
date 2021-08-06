<template>
  <div class="statistic container">
    <h4>Статистика за {{ info.sort === 'all' ? 'все время' : info.sort === 'day' ? 'день' : '' }}</h4>
    <BigLoader v-if="loading"/>
    <div v-else-if="records.length">
      <div class="records-stat">
        <div v-for="(record, idx) in records" :key="record.id">
          <div class="records-stat__item">
            <p class="index">{{ +idx + 1 }}</p>
            <p class="count"><span>{{ record.countEmotions }}</span>
              <svg width="20" height="20" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.5997 2.78263C15.8283 4.49369 17.2051 7.59033 15.8828 9.88071C14.5604 12.1711 7.11561 16.2604 4.82523 14.9381C2.53486 13.6157 2.32184 8.13067 3.64419 5.8403C4.96654 3.54993 9.30937 1.46028 11.5997 2.78263Z"
                    fill="black" fill-opacity="0.5"/>
                <path
                    d="M6.44704 6.87065C7.62774 7.34856 8.01241 8.21288 7.64345 8.85194C7.27449 9.491 5.19641 10.6315 4.55685 10.2623C3.9173 9.89304 3.85731 8.36228 4.22627 7.72322C4.59524 7.08416 5.80748 6.5014 6.44704 6.87065Z"
                    fill="white"/>
                <path
                    d="M9.81251 12.1933C9.15936 12.0026 8.90873 11.5636 9.07076 11.2039C9.23278 10.8442 10.2766 10.126 10.6363 10.288C10.996 10.45 11.1096 11.2609 10.9475 11.6206C10.7855 11.9803 10.1722 12.3554 9.81251 12.1933Z"
                    fill="white"/>
                <path
                    d="M11.7075 4.80767C12.5259 5.78373 12.46 6.72749 11.8344 7.1187C11.2087 7.50991 8.8384 7.54198 8.44689 6.9158C8.05537 6.28963 8.72068 4.90971 9.34637 4.51851C9.97206 4.1273 11.316 4.1815 11.7075 4.80767Z"
                    fill="white"/>
              </svg>
            </p>
            <p class="date">{{ new Date(record.date).toLocaleDateString() }}</p>
            <p class="category"><span>{{ record.categoryTitle }}</span> <i class="material-icons">{{ record.icon }}</i>
            </p>
            <p class="type" :class="record.type === 'outcome' ? 'lost' : 'add'" style="">
              {{ record.type === 'outcome' ? '-' : '+' }}</p>
            <button @click="showInfo" class="showInfo"><i class="material-icons">keyboard_arrow_down</i></button>
            <button @click="deleteRecord" :data-id="record.id"><i class="material-icons">delete</i></button>
            <p class="done loader" :id="record.id">
              <Loader/>
            </p>
          </div>
          <div class="records-stat__item-body"  >
            <p class="count"><span class="label">Кол-во эмоций:</span> <span>{{ record.countEmotions }}</span>
              <svg width="20" height="20" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11.5997 2.78263C15.8283 4.49369 17.2051 7.59033 15.8828 9.88071C14.5604 12.1711 7.11561 16.2604 4.82523 14.9381C2.53486 13.6157 2.32184 8.13067 3.64419 5.8403C4.96654 3.54993 9.30937 1.46028 11.5997 2.78263Z"
                    fill="black" fill-opacity="0.5"/>
                <path
                    d="M6.44704 6.87065C7.62774 7.34856 8.01241 8.21288 7.64345 8.85194C7.27449 9.491 5.19641 10.6315 4.55685 10.2623C3.9173 9.89304 3.85731 8.36228 4.22627 7.72322C4.59524 7.08416 5.80748 6.5014 6.44704 6.87065Z"
                    fill="white"/>
                <path
                    d="M9.81251 12.1933C9.15936 12.0026 8.90873 11.5636 9.07076 11.2039C9.23278 10.8442 10.2766 10.126 10.6363 10.288C10.996 10.45 11.1096 11.2609 10.9475 11.6206C10.7855 11.9803 10.1722 12.3554 9.81251 12.1933Z"
                    fill="white"/>
                <path
                    d="M11.7075 4.80767C12.5259 5.78373 12.46 6.72749 11.8344 7.1187C11.2087 7.50991 8.8384 7.54198 8.44689 6.9158C8.05537 6.28963 8.72068 4.90971 9.34637 4.51851C9.97206 4.1273 11.316 4.1815 11.7075 4.80767Z"
                    fill="white"/>
              </svg>
            </p>
            <p class="date"><span class="label"> Дата:</span> {{ new Date(record.date).toLocaleDateString() }}</p>
            <p class="category"><span class="label">Категория:</span> <span>{{ record.categoryTitle }}</span> <i class="material-icons">{{ record.icon }}</i>
            </p>
            <p class="type" :class="record.type === 'outcome' ? 'lost' : 'add'" >
              {{ record.type === 'outcome' ? `- Потеря` : '+ Добавление' }}</p>
          </div>
        </div>

      </div>


    </div>
    <div v-else class="center">У вас нет ни одной записи
      <router-link to="/main">Добавить запись</router-link>
    </div>


  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'statistic',
  data: () => ({
    records: [],
    categories: [],
    loading: false,
    deleteLoading: false,
  }),
  async mounted() {
    this.loading = true
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    const records = this.records.map(record => {
      return {
        ...record,
        categoryTitle: this.categories.find(c => c.id === record.categoryId).title,
        icon: this.categories.find(c => c.id === record.categoryId).icon
      }
    })

    this.records = records.sort(function (a, b){
      if (a.date > b.date){
        return -1
      }
      if (a.date > b.date){
        return 1
      }
      return 0
    })

  },
  methods: {
    async deleteRecord(e) {
      let recordId = e.target.dataset.id
      this.deleteLoading = true
      document.querySelector('#' + recordId).classList.add('active')
      document.querySelector('#' + recordId).classList.remove('done')
      const idx = this.records.findIndex(c => c.id === recordId)
      await this.$store.dispatch('deleteRecords', recordId)
      document.querySelector('#' + recordId).classList.remove('active')
      this.$message('Эмоция была удалена')
      this.deleteLoading = false
      if (this.records.length > 1) {
        let cat = this.records.filter(c => {
          return c.id !== recordId
        })
        this.records = [...cat]
      } else {
        this.records = []
      }
    },
    showInfo(e) {
      e.target.classList.toggle('active')
      e.target.parentNode.classList.toggle('active')
    }
  },
  computed: {
    ...mapGetters(['info']),
  },
}

</script>
<style scoped lang="scss">
.statistic{
  margin-bottom: 100px;
}
.records-stat{
  &__item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #C0C0C0;
    padding: 5px 0;
    p{
      display: flex;
        color: #000;
        font-weight: 500;
        font-size: 18px;
        &.count {
          width: 70px;
          svg {
            margin-left: 5px;
          }
        }

        &.index {
          color: #C0C0C0;
        }

        &.category {
          white-space: nowrap;
          overflow: hidden;
          width: 100px;
          i {
            margin-left: 5px;
          }
        }



      &.active {
        visibility: visible;
      }

      &.done {
        opacity: 0;
      }


    }

  }
  p{

    &.lost {
      font-weight: 600;
      color: #C10E0E;
      font-size: 30px;
    }

    &.add {
      font-weight: 600;
      color: #048053;
      font-size: 30px;
    }
  }
  .records-stat__item-body{
    max-height: 0;
    margin-top: 1px;
    box-shadow: 4px 3px 8px rgba(0,0,0,0.4);
    background-color: #fff;
    border-top: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    border-radius: 5px;
    padding: 0;
    overflow: hidden;
    transition: all .3s;
    p{
      font-weight: 500;
      font-size: 18px;
      &.type{
        font-weight: 600;
        font-size: 30px;
        margin-right: 0;
      }
      .label{
        font-size: 16px;
        font-weight: 400;
      }
    }

    .date{
      display: block;
    }
  }

}

button {
  &:focus {
    background-color: transparent;
  }
}



.records-stat__item.active + .records-stat__item-body{
  max-height: 200px;
  padding: 10px 20px;
  border: 1px solid #c0c0c0;
}

.showInfo{
  transition: transform .2s;
  &.active{
    transform: rotate(180deg);
  }
}

@media screen and (max-width: 768px) {
  .statistic {
    margin-top: 70px;
  }
}

@media screen and (max-width: 550px) {

  .records-stat{
    &__item{
      padding: 3px 0;
      p{
        font-weight: 400;
        font-size: 14px;
        &.count {
          svg {
            margin-left: 3px;
          }
        }

        &.category {
          width: 100px;
          i {
            font-size: 20px;
            margin-left: 5px;
          }
        }
        &.date{
          display: none;
        }
      }

    }


  }


}
</style>
