<template>
  <section
    class="container"
    @mousemove="onMousemove"
    @mouseup="onMouseup">
    <memo
      v-for="(position, index) in memoPositions"
      :key="index"
      :toppo="position.toppo"
      :left="position.left"
      @dragStart="onDragStart($event, index)"
      @minus="minusMemo"/>
    <plus-btn @plus="plusMemo"/>
  </section>
</template>

<script>
import Memo from '~/components/Memo.vue'
import PlusBtn from '~/components/PlusBtn.vue'

export default {
  components: {
    Memo,
    PlusBtn
  },
  data() {
    return {
      draggingIndex: null,
      prevX: null,
      prevY: null,
      memoPositions: []
    }
  },
  methods: {
    plusMemo() {
      const widthCount = Math.floor(window.innerWidth / 250)

      this.memoPositions = [
        ...this.memoPositions,
        {
          toppo: Math.floor(this.memoPositions.length / widthCount) * 350,
          left: (this.memoPositions.length % widthCount) * 250
        }
      ]
    },
    minusMemo(index) {
      this.memoPositions = [...this.memoPositions]
      this.memoPositions.splice(index, 1)
    },
    onDragStart({ x, y }, index) {
      this.draggingIndex = index
      this.prevX = x
      this.prevY = y
    },
    onMousemove(e) {
      if (this.draggingIndex === null) return

      const x = e.pageX
      const y = e.pageY
      const target = { ...this.memoPositions[this.draggingIndex] }
      target.left += x - this.prevX
      target.toppo += y - this.prevY

      this.memoPositions = [...this.memoPositions]
      this.memoPositions[this.draggingIndex] = target

      this.prevX = x
      this.prevY = y
    },
    onMouseup() {
      this.draggingIndex = null
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: url('../assets/renga.jpg');
  user-select: none;
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
