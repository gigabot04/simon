<template>
  <div class="simon">
    <section class="game">
      <h1 class="game__round">{{ round }}</h1>
      <ul class="game__btns">
        <li v-for="(keymap, index) in keymaps" :key="index" class="game__btn">
          <buttons
            :index="index"
            :color="keymap.color"
            :name="keymap.name"
            ref="simon__btn"
            @click="onClickBtn"
          />
        </li>
      </ul>
    </section>
    <div class="sidebar">
      <section class="play">
        <button class="play__button" @click="init">Начать</button>
        <span v-show="gameover" class="play__result">Проиграл на {{ round }} раунде!</span>
      </section>
      <section class="diff">
        <h2 class="diff__heading">Сложность</h2>
        <ul class="diff__list">
          <li v-for="(Lvl, index) in Lvls" :key="index" class="diff__item">
            <input
              v-model="diff"
              :value="Lvl.value"
              :id="`diff-${Lvl.value}`"
              type="radio"
              class="diff__input"
            />
            <label :for="`diff-${Lvl.value}`">{{ Lvl.text }}</label>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  import buttons from './buttons';
  import { keymaps, Lvls, timeout } from '../js/js';

  export default {
    name: 'simon',
    components: {
      buttons,
    },
    data() {
      return {
        keymaps,
        Lvls,
        round: 0,
        current: 0,
        playSequence: [],
        prevBtnindex: null,
        diff: 'easy',
        gameover: false
      }
    },
    methods: {
      async createNewRound() {
        const index = this.createNextBtnindex();
        this.current = 0;
        this.round += 1;
        this.prevBtnindex = index;
        this.playSequence.push(index);
        for (const index of this.playSequence) {
          this.$refs.simon__btn[index].start();
          await timeout(this.interval);
        }
      },
      createNextBtnindex() {
        let num;
        do {
          num = Math.round(Math.random() * 3);
        } while (num === this.prevBtnindex);

        return num;
      },
      onClickBtn(index) {
        if (!this.round) return;
        const currentindex = this.playSequence[this.current];
        if (index === currentindex) {
          this.incrementCurrent();
        } else {
          this.gameover = true;
        }
      },
      async incrementCurrent() {
        if (this.current !== this.round - 1) {
          this.current += 1;
        } else {
          await timeout(1000);
          this.createNewRound();
        }
      },
      init() {
        this.reset();
        this.createNewRound();
      },
      reset() {
        this.round = 0;
        this.gameover = false;
        this.playSequence = [];
        this.prevBtnindex = null;
      },
    },
    computed: {
      interval() {
        return this.Lvls[this.diff].interval;
      }
    }
  };
</script>

<style>
  .simon {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .game {
    position: relative;
  }

  .game__btns {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    padding: 0;
    margin: 0;
    height: 300px;
    width: 300px;
    list-style: none;
  }

  .game__btns::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    background-color: #ffffff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 30px 10px black;
    z-index: 1;
  }

  .game__btn {
    display: block;
    height: 100%;
    width: 100%;
  }

  .sidebar {
    padding: 30px;
    width: 250px;
  }

  .play {
    margin-bottom: 25px;
  }
  .play,
  .diff {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .play__button {
    display: block;
    padding: 10px;
    border-radius: 10px;
    background-color: orange;
    border: none;
    border-bottom: 2px solid orangered;
    min-width: 100px;
    font-size: 20px;
  }

  .play__result {
    display: block;
    margin: 10px;
  }

  .game__round {
    display: block;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 41px;
    z-index: 2;
    color: orange;
  }

  .diff__heading {
    display: block;
    margin: 0;
    margin-bottom: 10px;
    font-size: 25px;
  }

  .diff__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .diff__item {
    font-size: 20px;
    line-height: 27px;
  }

</style>
