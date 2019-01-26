<template>
  <section
    class="container"
    @mousemove="onMousemove"
    @mouseup="onMouseup" >
    <memo
      v-for="(mm, index) in $store.state.memoList"
      :key="index"
      :toppo="mm.toppo"
      :left="mm.left"
      :index="index"
      @dragStart="onDragStart($event, index)"
      @minus="minusMemo" />
    <plus-btn @plus="plusMemo" />
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
      prevY: null
    }
  },
  methods: {
    plusMemo() {
      const widthCount = Math.floor(window.innerWidth / 250)

      this.$store.commit('addMemo', {
        toppo: Math.floor(this.$store.state.memoList.length / widthCount) * 350,
        left: (this.$store.state.memoList.length % widthCount) * 250,
        text: ''
      })
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
