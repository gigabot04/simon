<template>
  <div id="wrap">
    <game />
  </div>
</template>

<script>
  import game from './components/game'

  export default {
    name: 'App',
    components: {
      game
    },
  };
</script>

<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    color: #000;
    font-size: 16px;
    font-family: 'Tahoma', sans-serif;
  }

  #wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
