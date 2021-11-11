<template>
  <div class="statistic container">
    <h4>Статистика за {{ info.sort === 'all' ? 'весь час' : info.sort === 'day' ? 'день' : '' }}</h4>
    <BigLoader v-if="loading"/>
    <div v-else-if="records.length">
      <div class="sort-block">
        <SortButton @click="sortToName" :class="{active: sortActive === 'title'}">Ім'ям</SortButton>
        <SortButton @click="sortToDate" :class="{active: sortActive === 'date'}">Датою</SortButton>
        <SortButton @click="sortToCount" :class="{active: sortActive === 'count'}">Кількість</SortButton>
      </div>

      <div class="records-stat">

        <RecordStatItem v-for="(record, idx) in records" :key="record.id"
                        :record="record"
                        :idx="idx"
                        @deleteRecord="deleteRecord"
                        :deletedId="deletedId"
                        :deleteLoading="deleteLoading"

        />
      </div>
      <pagination
          v-model="page"
          :records="records.length"
          :per-page="pageSize"
          @paginate="pageChangeHandler($event)"
      />
    </div>


    <div v-else class="center">У вас немає жодного запису
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import paginationMixin from '@/mixins/paginate.mixin'
import RecordStatItem from "@/components/statistic/RecordStatItem";
import SortButton from "@/components/statistic/SortButton";


export default {
  name: 'statistic',
  components: {RecordStatItem, SortButton},
  mixins: [paginationMixin],
  data: () => ({
    records: [],
    categories: [],
    loading: false,
    deleteLoading: false,
    deletedId: 0,
    sortActive: 'date',
  }),
  async mounted() {
    this.sortActive = 'date'
    this.loading = true
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    this.records = this.records.map(record => {
      return {
        ...record,
        categoryTitle: this.categories.find(c => c.id === record.categoryId).title,
        icon: this.categories.find(c => c.id === record.categoryId).icon
      }
    }).sort(function (a, b) {
      if (a.date > b.date) {
        return -1
      }
      if (a.date > b.date) {
        return 1
      }
      return 0
    })

    this.setupPagination(this.records)
  },
  methods: {
    async deleteRecord(e) {
      let recordId = e
      this.deletedId = recordId
      this.deleteLoading = true

      await this.$store.dispatch('deleteRecords', recordId)
      await this.$message('Эмоция была удалена')
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
    sortToName() {
      this.sortActive = 'title'
      this.records = this.records.sort(function (a, b) {
        if (a.categoryTitle < b.categoryTitle) {
          return -1
        }
        if (a.categoryTitle > b.categoryTitle) {
          return 1
        }
        return 0
      })
      this.setupPagination(this.records)
    },
    sortToDate() {
      this.sortActive = 'date'
      this.records = this.records.sort(function (a, b) {
        if (a.date > b.date) {
          return -1
        }
        if (a.date > b.date) {
          return 1
        }
        return 0
      })
      this.setupPagination(this.records)
    },
    sortToCount() {
      this.sortActive = 'count'
      this.records = this.records.sort(function (a, b) {
        if (a.countEmotions > b.countEmotions) {
          return -1
        }
        if (a.countEmotions > b.countEmotions) {
          return 1
        }
        return 0
      })
      this.setupPagination(this.records)
    },


  },
  computed: {
    ...mapGetters(['info']),
    showTeachersButton() {
      return this.$route.params.status === 'teacher'
    },
  },
}

</script>
<style lang="scss" scoped>
.sort-block {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.sort-block p {
  margin-right: 20px;
}

.sort-block button {
  border: 1px solid #000 !important;
  font-size: 18px;
  margin-right: 10px;
  border-radius: 3px;

  &.active {
    background-color: #000;
    color: #fff;
  }
}

.sort-block button:focus {
  background-color: #000;
  color: #fff;
}

.statistic {
  margin-bottom: 100px;
}


@media screen and (max-width: 768px) {
  .statistic {
    margin-top: 70px;
  }
}


</style>
