<template>
  <section
    class="container"
    @mousemove="onMousemove"
    @mouseup="onMouseup"
  >
    <div
      class="weatherStatus"
      :class="weather.status"
    >
      <weather
        @sunny="changeWeather('sunny')"
        @night="changeWeather('night')"
        @snow="changeWeather('snow')"
      />
      <effect
        @humbarger="effect('humbarger')"
        @tea="effect('tea')"
      />
      <memo
        v-for="(mm, index) in $store.state.memoList"
        :key="index"
        :toppo="mm.toppo"
        :left="mm.left"
        :index="index"
        @dragStart="onDragStart($event, index)"
        @minus="minusMemo(index)"
        @edit="editMemo(text)"
        @color="colorChange($event, index)"
      />
      <plus-btn @plus="plusMemo" />
    </div>
  </section>
</template>

<script>
import Memo from '~/components/Memo.vue'
import PlusBtn from '~/components/PlusBtn.vue'
import Weather from '~/components/Weather.vue'
import Effect from '~/components/Effect.vue'

export default {
  components: {
    Memo,
    PlusBtn,
    Weather,
    Effect
  },
  fetch({ store }) {
    return store.dispatch('getMemoList')
  },
  data() {
    return {
      draggingIndex: null,
      prevX: null,
      prevY: null,
      weather: {
        status: 'sunny'
      }
    }
  },
  mounted() {
    this.canselId = setInterval(() => {
      this.$store.dispatch('getMemoList')
    }, 100)
  },
  methods: {
    plusMemo() {
      const widthCount = Math.floor(window.innerWidth / 250)
      return this.$store.dispatch('postMemo', [
        ...this.$store.state.memoList,
        {
          toppo: Math.floor(this.$store.state.memoList.length / widthCount) * 350,
          left: (this.$store.state.memoList.length % widthCount) * 250,
          text: '',
          color: 0
        }
      ])
    },
    minusMemo(index) {
      return this.$store.dispatch('minusMemo', index)
    },
    onDragStart({ x, y }, index) {
      this.draggingIndex = index
      this.memoPositions = [ ...this.$store.state.memoList ]
      this.prevX = x
      this.prevY = y
    },
    onMousemove(e) {
      if (this.draggingIndex === null) return
      const x = e.pageX
      const y = e.pageY
      this.target = { ...this.memoPositions[this.draggingIndex] }
      this.target.left += x - this.prevX
      this.target.toppo += y - this.prevY
      return this.$store.dispatch('moveMemo', {
        toppo: this.target.toppo,
        left: this.target.left,
        index: this.draggingIndex,
        text: this.target.text,
        background: this.target.background
      })
    },
    onMouseup() {
      this.draggingIndex = null
      this.prevX = this.x
      this.prevY = this.y
    },
    colorChange(color, index) {
      return this.$store.dispatch('colorChange', {
        index,
        color
      })
    },
    changeWeather(status) {
      this.weather = { ...this.weather, status }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;
}
.weatherStatus {
  width: 100%;
  min-height: 100vh;
  background-size: cover;
}

.weatherStatus.sunny {
  background-image: url("../assets/sunny.png");
}
.weatherStatus.night {
  background-image: url("../assets/night.png");
}
.weatherStatus.snow {
  background-image: url("../assets/snow.png");
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
