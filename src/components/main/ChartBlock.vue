<template>
  <div class="" >
    <h5>{{text}}</h5>
    <canvas ref="canvas"></canvas>
  </div>

</template>

<script>
// import {Pie, mixins} from 'vue-chartjs'
import {Pie} from 'vue3-chart-v2'

export default {
  extends: Pie,
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
  },
  mounted() {
    let borderColor = []
    let backgroundColor = []
    for (let category of this.categories) {
      borderColor.push('#000')
      let r = this.randomInteger(0, 255)
      let g = this.randomInteger(0, 255)
      let b = this.randomInteger(0, 255)
      let a = '0.' + this.randomInteger(2, 5)
      backgroundColor.push(`rgba(${r},${g},${b},${a})`)
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