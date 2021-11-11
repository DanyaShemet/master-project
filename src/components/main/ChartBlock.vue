<template>
  <div class="" >
    <h5>{{text}}</h5>
    <canvas ref="canvas"></canvas>
  </div>

</template>

<script>
// import {Pie, mixins} from 'vue-chartjs'
import {Doughnut} from 'vue3-chart-v2'

export default {
  extends: Doughnut,
  props: {
    categories: {
      type: Array,
      required: true,
    },
    records: {
      type: Array,
      required: true,
    },
    text: String,
    type: String

  },
  methods: {
    randomInteger(min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    stringToHex(string) {
      let hash = 0
      for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
      }
      let color = '#'
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        color += ('00' + value.toString(16)).substr(-2)
      }
      return color
    },
  },
  mounted() {
    let borderColor = []
    let backgroundColor = []
    const blackColor = '#000'
    for (let category of this.categories) {
      borderColor.push(blackColor)
      backgroundColor.push(this.stringToHex(category.title))
    }

    this.renderChart({
      labels: this.categories.map(c => c.title),
      datasets: [{
        data: this.categories.map(c => {
          if (this.type === 'outcome'){
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === 'outcome') {
                total += +r.countEmotions
              }
              return total
            }, 0)
          }
          else if (this.type === 'income'){
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === 'income') {
                total += +r.countEmotions
              }
              return total
            }, 0)
          }

        }),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        hover: false
      }]
    })

  }
}
</script>