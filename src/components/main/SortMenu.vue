<template>
  <div class="sort-menu">
    <button @click="$emit('showBalancePerDay')" id="day" :class="{active: $props.sort === 'day'}">День</button>
    <button @click="$emit('showBalancePerMonth')" id="month" :class="{active: $props.sort === 'month'}">Місяць</button>
    <button @click="$emit('showBalancePerYear')" id="year" :class="{active: $props.sort === 'year'}">Рік</button>
    <button @click="$emit('showAllBalance')" id="all" :class="{active: $props.sort === 'all'}">Весь час</button>
  </div>
</template>

<script>
export default {
  props: ['sort'],
  emits: ['showBalancePerMonth', 'showBalancePerDay', 'showAllBalance', 'showBalancePerYear'],
}
</script>

<style lang="scss">
  .sort-menu{
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.7);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    transition: all .4s;
    z-index: 1000;
    &.novisible{
      left: -100%;
    }
    button{
      cursor: pointer;
      border: 1px solid #fff;
      font-size: 30px;
      color: #fff;
      font-weight: 500;
      padding: 10px 0;
      width: 230px;
      margin-bottom: 30px;
      transition:  all .3s;
      &:hover{
        width: 250px;
      }
      &:focus{
        background-color: initial;
      }
      &:disabled{
        color: #ccc;
        border-color: #ccc;
      }
      &.active{
        background-color: #fff;
        color: #000;
      }
    }
  }
</style>