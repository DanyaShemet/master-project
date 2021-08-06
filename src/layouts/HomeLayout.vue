<template>
  <div class="container-home">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">

.container-home {
  width: 70%;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  .container-home {
    width: 95%;
  }
}
</style>
