<template>
  <div
    class="memo"
    :style="{
      top: `${toppo}px`,
      left: `${left}px`
    }"
  >
    <div class="memoBody">
      <div class="arm-left" />
      <div class="arm-right" />
      <div class="handle" @mousedown="onMousedown" />
      <div class="minusMemo" @mousedown="minusMemo">
        <span @click="$emit('minus')">
          -
        </span>
      </div>
      <editor :index="index" />
    </div>
  </div>
</template>

<script>
import Editor from '~/components/Editor.vue'

export default {
  components: {
    Editor
  },
  props: {
    toppo: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onMousedown(e) {
      this.$emit('dragStart', {
        x: e.pageX,
        y: e.pageY
      })
    },
    onMousemove(e) {
      this.$emit('dragging', {
        x: e.pageX,
        y: e.pageY
      })
    },
    onMouseup(e) {
      this.$emit('dragEnd', {
        x: e.pageX,
        y: e.pageY
      })
    },
    minusMemo(index) {
      this.$emit('minusMemo', {
        index
      })
    }
  }
}
</script>

<style>
.memo {
  position: fixed;
  background: #fff;
  width: 200px;
  height: 300px;
  animation : scrollSample01 1s linear infinite;
}
@keyframes scrollSample01{
  0% { transform: translateX(0)}
  50% { transform: translateY(-5%)}
  100% { transform: translateY(5%)}
}

.handle{
  position: absolute;
  top:0;
  left:0;
  right: 0;
  height: 50px;
  background: rgb(220, 87, 87);
  cursor:  move;
}

.minusMemo{
  position: absolute;
  top: 0;
  right: 0;
  font-size: 30px;
  width: 50px;
}
.arm-left{
  position: absolute;
  top: 45px;
  left: -50px;
  width: 150px;
  height:70px;
  background: #fff;
  z-index: -1;
  transform:rotate(-20deg)
}
.arm-right{
  position: absolute;
  top: 45px;
  left: 100px;
  width: 150px;
  height: 70px;
  background: #fff;
  z-index: -1;
  transform:rotate(20deg)
}
</style>
