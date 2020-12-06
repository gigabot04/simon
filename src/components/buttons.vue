<template>
  <button :class="classBtn" @click="onClick" ref="simon__btn"></button>
</template>

<script>
export default {
  name: 'buttons',
  data() {
    return {
      sound: null
    }
  },
  props: {
    name: {
      required: true,
      type: String
    },
    index: {
      required: true,
      type: Number
    },
    color: {
      required: true,
      type: String
    }
  },
  created() {
    const sound = require(`../assets/${this.name}`)
    this.sound = new Audio(sound)
  },
  computed: {
    classBtn() {
      return ['simon__btn', this.color]
    }
  },
  methods: {
    start() {
      this.sound.play()
      this.$refs.simon__btn.classList.add('simon__btn--active')
      setTimeout(() => {
        this.$refs.simon__btn.classList.remove('simon__btn--active')
      }, 200);
    },
    onClick() {
      this.start()
      this.$emit('click', this.index)
    }
  }
}
</script>

<style>
  .simon__btn {
    width: 100%;
    height: 100%;
    border: none;
  }

  .simon__btn.blue {
    background-color: blue;
  }

  .simon__btn.blue.simon__btn--active {
    background-color: #6666FF;
  }

  .simon__btn.blue:hover {
    background-color: #000099;
  }

  .simon__btn.red {
    background-color: red;
  }

  .simon__btn.red.simon__btn--active {
    background-color: #FF4D4D;
  }

  .simon__btn.red:hover {
    background-color: #B30000;
  }

  .simon__btn.yellow {
    background-color: yellow;
  }

  .simon__btn.yellow.simon__btn--active {
    background-color: #FFFF80;
  }

  .simon__btn.yellow:hover {
    background-color: #B3B300;
  }

  .simon__btn.green {
    background-color: green;
  }

  .simon__btn.green.simon__btn--active {
    background-color: #4DFF4D;
  }

  .simon__btn.green:hover {
    background-color: #006600;
  }
</style>
