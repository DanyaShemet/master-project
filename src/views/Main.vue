<template>
  <div>
    <div class="main container" ref="main">
      <BigLoader v-if="loading"/>
      <div v-else>
        <div class="settings" @click="showSortMenu" :class="sortMenu ? 'active': ''">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M35.09 23.7234C35.1633 23.1734 35.2 22.605 35.2 22C35.2 21.4134 35.1633 20.8267 35.0716 20.2767L38.7933 17.38C39.1233 17.1234 39.215 16.6284 39.0133 16.2617L35.4933 10.175C35.2733 9.77169 34.815 9.64336 34.4116 9.77169L30.03 11.5317C29.1133 10.835 28.1416 10.2484 27.06 9.80836L26.4 5.15169C26.3266 4.71169 25.96 4.40002 25.52 4.40002H18.48C18.04 4.40002 17.6916 4.71169 17.6183 5.15169L16.9583 9.80836C15.8766 10.2484 14.8866 10.8534 13.9883 11.5317L9.60664 9.77169C9.20331 9.62502 8.74498 9.77169 8.52498 10.175L5.02331 16.2617C4.80331 16.6467 4.87664 17.1234 5.24331 17.38L8.96498 20.2767C8.87331 20.8267 8.79998 21.4317 8.79998 22C8.79998 22.5684 8.83664 23.1734 8.92831 23.7234L5.20664 26.62C4.87664 26.8767 4.78498 27.3717 4.98664 27.7384L8.50664 33.825C8.72664 34.2284 9.18498 34.3567 9.58831 34.2284L13.97 32.4684C14.8866 33.165 15.8583 33.7517 16.94 34.1917L17.6 38.8484C17.6916 39.2884 18.04 39.6 18.48 39.6H25.52C25.96 39.6 26.3266 39.2884 26.3816 38.8484L27.0416 34.1917C28.1233 33.7517 29.1133 33.165 30.0116 32.4684L34.3933 34.2284C34.7966 34.375 35.255 34.2284 35.475 33.825L38.995 27.7384C39.215 27.335 39.1233 26.8767 38.775 26.62L35.09 23.7234ZM22 28.6C18.37 28.6 15.4 25.63 15.4 22C15.4 18.37 18.37 15.4 22 15.4C25.63 15.4 28.6 18.37 28.6 22C28.6 25.63 25.63 28.6 22 28.6Z"
                fill=""/>
          </svg>
        </div>
        <SortMenu :class="{novisible: !sortMenu}"
                  @showBalancePerDay="showBalancePerDay"
                  @showBalancePerMonth="showBalancePerMonth"
                  @showBalancePerYear="showBalancePerYear"
                  :sort="info.sort"
                  @showAllBalance="showAllBalance"
                  @hide="showSortMenu"/>
        <h4>Баланс "емоцій" за {{ nameOfDate }}:
          <strong>{{ info.emotions }}
            <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M20.9499 8.0716C21.9021 14.8735 18.9008 19 14.9189 19C10.9369 19 0 12.371 0 8.38902C0 4.40704 6.99176 0 10.9737 0C14.9557 0 20.9499 4.08961 20.9499 8.0716Z"
                  fill="black"/>
              <path
                  d="M11.7405 4.43046C12.0062 6.3298 11.1687 7.48206 10.0577 7.48206C8.94662 7.48206 5.89502 5.63101 5.89502 4.51909C5.89502 3.40718 7.84586 2.17657 8.95691 2.17657C10.068 2.17657 11.7405 3.31854 11.7405 4.43046Z"
                  fill="white"/>
              <path
                  d="M10.4031 12.2457C10.5452 13.2603 10.0975 13.8759 9.5035 13.8759C8.90951 13.8759 7.27808 12.8871 7.27808 12.2931C7.27808 11.6991 8.32103 11.0417 8.91501 11.0417C9.509 11.0417 10.4031 11.6518 10.4031 12.2457Z"
                  fill="white"/>
              <path
                  d="M18.0186 7.02012C19.1425 8.57415 18.9418 9.98438 17.96 10.5045C16.9782 11.0245 13.4151 10.8173 12.8946 9.83468C12.3741 8.85211 13.522 6.85147 14.5038 6.33139C15.4856 5.8113 17.4981 6.03755 18.0186 7.02012Z"
                  fill="white"/>
            </svg>
          </strong>
        </h4>

        <div class="stat">
          <p class="out">Витрачено: {{ info.outcomeCount }}</p>
          <p class="inc">Зароблено: {{ info.incomeCount }}</p>
        </div>

        <div class="action-buttons" v-if="categories.length && !showTeachersButton" ref="charts">
          <button @click="showIncomeForm" class="plus-emotion action-emotion">+</button>
          <button @click="showOutcomeForm" class="minus-emotion action-emotion">-</button>
        </div>
        <div v-else-if="!categories.length" class="center">У вас немає жодної категорії
          <router-link to="/categories">Додати категорії</router-link>
        </div>

        <button @click="showHideCharts" class="show-charts" v-if="records.length && categories.length"
                :class="{show: showCharts}">{{ showCharts ? 'Приховати' : 'Показати' }} графік
        </button>


        <div v-if="type === 'outcome'" class="outcome-form form-emotions" @click="hideForm">
          <ActionForm @submit="emotionsFormHandler" :categories="categories" :addDeleteLoading="addDeleteLoading"
                      @hideForm="hideForm" :text="'Видалення емоції'" :type="'outcome'"
          />
        </div>
        <div v-if="type === 'income'" class="income-form form-emotions" @click="hideForm">
          <ActionForm @submit="emotionsFormHandler" :categories="categories" :addDeleteLoading="addDeleteLoading"
                      @hideForm="hideForm" :text="'Додавання емоції'" :type="'income'"
          />
        </div>
      </div>
    </div>
    <div class="history-chart" v-if="records.length && categories.length && showCharts">
      <ChartBlock :text="'Втраченні емоції'" :categories="categories" :records="tempRecordsForCharts" :type="'outcome'"
                  :key="tempRecordsForCharts.length" />
      <ChartBlock :text="'Отриманни емоції'" :categories="categories" :records="tempRecordsForCharts" :type="'income'"
                  :key="tempRecordsForCharts.length"/>
    </div>
  </div>
</template>


<script>
import {mapGetters} from 'vuex'
import SortMenu from '@/components/main/SortMenu'
import ActionForm from "@/components/main/ActionForm";
import ChartBlock from "@/components/main/ChartBlock";


export default {
  name: 'main-page',
  computed: {
    ...mapGetters(['info']),
    nameOfDate() {
      if (this.info.sort === 'all') {
        return 'весь час'
      } else if (this.info.sort === 'day') {
        return 'день'
      } else if (this.info.sort === 'month') {
        return 'місяць'
      } else if (this.info.sort === 'year') {
        return 'рік'
      }
    },
    showTeachersButton(){
      return this.$route.params.status === 'teacher'
    },
  },
  components: {
    ActionForm,
    SortMenu,
    ChartBlock
  },
  data: () => ({
    type: '',
    categories: [],
    records: [],
    tempRecordsForCharts: [],
    sortMenu: false,
    loading: false,
    addDeleteLoading: false,
    showCharts: false,
    countedDate: 1,
    refsButtons: []
  }),
  methods: {
    showSortMenu() {
      this.sortMenu = !this.sortMenu
    },
    showOutcomeForm() {
      this.type = 'outcome'
      this.number = 0
    },
    showIncomeForm() {
      this.type = 'income'
      this.number = 0
    },
    hideForm() {
      this.type = false
      this.isError = false
    },
    showHideCharts() {
      setTimeout(() => {
        window.scrollBy({
          top: 400,
          behavior: 'smooth'
        })
      }, 300)
      this.showCharts = !this.showCharts
    },

    async emotionsFormHandler({record, type}){
      record = {
        ...record,
        type: this.type
      }
      try {
        this.addDeleteLoading = true
        await this.$store.dispatch('createRecord', record)
        const emotions = {}
        if (type === 'income'){
          emotions.emotions = this.info.emotions + record.countEmotions
          emotions.incomeCount = this.info.incomeCount + record.countEmotions
        }else if (type === 'outcome'){
          emotions.outcomeCount = this.info.outcomeCount + record.countEmotions
          emotions.emotions = this.info.emotions - record.countEmotions
        }
        this.$message('Запись создана')
        this.chosenIcon = null
        this.records = await this.$store.dispatch('fetchRecords')
        await this.$store.dispatch('updateInfo', emotions)
        this.info.sort === 'day'
            ? await this.showBalancePerDay() : this.info.sort === 'month'
            ? await this.showBalancePerMonth() : this.info.sort === 'year'
                ? await this.showBalancePerYear() : this.info.sort === 'week'
                    ? await this.showBalancePerWeek() : await this.showAllBalance()
        this.addDeleteLoading = false
        this.hideForm()
        this.setup(this.categories)
      }
      catch (e){}
    },
    dtime_nums(e) {
      let n = new Date;
      n.setDate(n.getDate() + e);
      return n.toLocaleDateString();
    },
    goBack() {
      if (this.info.sort === 'day') {
        let yesterday = this.dtime_nums(-this.countedDate)
        this.countedDate += 1
        const neededDate = this.records.filter(record => {
          return yesterday === new Date(record.date).toLocaleDateString
        })
      }
    },

    async showBalancePerDateHandler(date, neededDate) {
      this.showSortMenu()
      const emotions = {
        outcomeCount: 0,
        incomeCount: 0,
        emotions: 0,
        sort: date
      }
      neededDate.map(record => {
        if (record.type === 'income') {
          emotions.incomeCount += record.countEmotions
          emotions.emotions += record.countEmotions
        } else if (record.type === 'outcome') {
          emotions.outcomeCount += record.countEmotions
          emotions.emotions -= record.countEmotions
        }
      })
      await this.$store.dispatch('updateInfo', emotions)
      this.sortMenu = false
    },

    async showBalancePerDay() {
      const neededDate = this.records.filter(record => {
        return new Date().toLocaleDateString() === new Date(record.date).toLocaleDateString()
      })
      this.tempRecordsForCharts = neededDate
      await this.showBalancePerDateHandler('day', neededDate)
    },
    async showBalancePerWeek() {

    },
    async showBalancePerMonth() {
      const month = new Date().getMonth()
      const neededDate = this.records.filter(record => {
        return month === new Date(record.date).getMonth()
      })
      this.tempRecordsForCharts = neededDate
      await this.showBalancePerDateHandler('month', neededDate)
    },
    async showBalancePerYear() {
      const year = new Date().getFullYear()
      const neededDate = this.records.filter(record => {
        return year === new Date(record.date).getFullYear()
      })
      this.tempRecordsForCharts = neededDate
      await this.showBalancePerDateHandler('year', neededDate)
    },
    async showAllBalance() {
      this.tempRecordsForCharts = this.records
      await this.showBalancePerDateHandler('all', this.records)
    },

    buttons(el) {
      this.refsButtons.push(el)
    },

  },
  async mounted() {
    this.loading = true
    this.records = await this.$store.dispatch('fetchRecords')
    await this.$store.dispatch('fetchInfo')
    this.info.sort === 'day'
        ? await this.showBalancePerDay() : this.info.sort === 'month'
        ? await this.showBalancePerMonth() : this.info.sort === 'year'
            ? await this.showBalancePerYear() : this.info.sort === 'week'
                ? await this.showBalancePerWeek() : await this.showAllBalance()
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    // Проблема при быстром изменение графика, пока отключил анимацию
    Chart.defaults.global.animation.duration = 0

  },
  beforeUpdate() {
    this.refsButtons = [] // reset empty before each update
  },

}
</script>

<style lang="scss">
.form-emotions {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  .form {
    width: 50%;
    padding: 10px;
    position: relative;
    border-radius: 20px;
    border: 2px solid #000;
    background-color: #fff;

    form {
      margin-bottom: 10px;
    }

    h4 {
      font-weight: 600;
      font-size: 25px;
    }

    label, p {
      font-size: 15px;
      color: #C0C0C0;
      font-weight: 300;
    }

    p {
      margin-bottom: 10px;

      &.error {
        font-weight: 500;
        color: #F44336;
      }
    }

    input {
      height: 2.5rem;
      margin-bottom: 15px;
    }

    .record-icons {
      display: flex;
      flex-wrap: wrap;
      height: 150px;
      align-items: flex-start;
      overflow-y: scroll;
    }

    .record-icon {
      height: 50px;
      overflow: hidden;
      padding: 10px 20px;
      border: 1px solid #000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      margin-right: 10px;
      transition: all .2s;
      margin-bottom: 10px;

      &.selected {
        background-color: #000;
        color: #fff
      }

      &:focus {
        background-color: #000;
      }
    }
  }
}

h4 {
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
  svg {
    margin-left: 5px;
  }
}

.stat {
  margin-bottom: 20px;
  text-align: center;

  p {
    font-size: 24px;

    &.out {
      color: #C10E0E;
    }

    &.inc {
      color: #048053;
    }
  }
}

.main {
  margin-top: 100px;
}

.action-emotion {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: 25px;
  cursor: pointer;

  &.minus-emotion {
    background-color: #000;
    color: #fff;

    &:focus {
      background-color: #000;
    }
  }

  &.minus {
    background-color: #000;
    color: #fff;

    &:focus {
      background-color: #000;
    }
  }

  &.plus-emotion {
    border: 3px solid #000;
    margin-right: 70px;

    &:focus {
      background-color: #fff;
    }
  }

  &.plus {
    border: 3px solid #000;

    &:focus {
      background-color: #fff;
    }
  }
}

.action-buttons {
  display: flex;
  justify-content: center;
}

.settings {
  cursor: pointer;
  position: absolute;
  left: 5%;
  top: 4%;
  z-index: 100001;
  transition: all .4s;

  svg {
    fill: black;
    transition: all .2s;

    &:hover {
      fill: #C0C0C0;
    }
  }

  &.active {
    left: 12%;

    svg {
      fill: #fff;
      transition: all .2s;

      &:hover {
        fill: #C0C0C0;
      }
    }
  }
}

.history-chart {
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  div {
    width: 49%;
    border: 1px solid #C0C0C0;
    border-radius: 10px;
    padding: 20px 10px 30px 10px;

    h5 {
      text-align: center;
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 15px;
      margin-top: 0;
    }
  }
}

.plus-record {
  margin-top: 10px !important;
  border: 2px solid #000 !important;
  margin-bottom: 10px;
}

.close {
  position: absolute;
  top: -20px;
  right: -20px;
  background-color: #000;
  color: #fff;

  &:focus {
    background-color: #000 !important;
  }
}

.show-charts {
  display: flex;
  margin: 20px auto;
  border: 2px solid #000;
  padding: 6px 50px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;

  &.show {
    background-color: #000;
    color: #fff;

    &:focus {
      background-color: #000;
    }
  }

  &:focus {
    background-color: #fff;
  }
}

@media screen and (max-width: 1025px) {
  .history-chart {
    z-index: -1;
    margin-bottom: 100px;

    div {
      width: 100%;
      margin-bottom: 10px;
      padding: 10px 10px 20px 10px;
    }
  }
}

@media screen and (max-width: 768px) {
  .settings {
    top: 2%;
  }
  .form-emotions .form {
    width: 80%;
  }
  .history-chart {
    margin-bottom: 200px;

    div {
      padding: 10px 5px 10px 5px;

      h5 {
        margin-bottom: 10px;
      }
    }
  }

}

@media screen and (max-width: 500px) {
  .history-chart {
    width: 95%;

    div {

    }
  }
}


</style>
