<template>
  <div
    class="memo"
    :style="{
      top: `${toppo}px`,
      left: `${left}px`,
      background: $store.state.memoList[index].background
    }"
  >
    <div class="memoBody">
      <!-- <div class="arm-left" />
      <div class="arm-right" /> -->
      <div class="handle" @mousedown="onMousedown" />
      <div class="minusMemo" @mousedown="minusMemo">
        <span @click="$emit('minus')">
          -
        </span>
      </div>
      <div class="colorChange">
        <span class="color1" @click="$emit('color', 0 )" />
        <span class="color2" @click="$emit('color', 1 )" />
        <span class="color3" @click="$emit('color', 2 )" />
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
    },
    background: {
      type: String,
      default: '#fff'
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
  width: 200px;
  height: 300px;
  background: #fff;
  animation : scrollSample01 1.8s linear infinite;
}
@keyframes scrollSample01{
  0% { transform: rotate3d(0,10,0,90deg) }
  20% { transform: rotate3d(0,5,0,45deg) }
  40% { transform: rotate3d(7.5,2,0,0deg) }
  50% { transform: rotate3d(10,0,0,0deg) }
  60% { transform: rotate3d(7.5,2,0,0deg) }
  80% { transform: rotate3d(0,5,0,45deg) }
  100% { transform: rotate3d(0,10,0,90deg) }
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

.colorChange{
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 20px;
  width: 200px;
}

.color1{
  display: inline-block;
  width: calc(100% / 3) ;
  background: #ffd700;
  z-index: 1;
}
.color2{
  display: inline-block;
  width: calc(100% / 3) ;
  background:#00ff7f;
  z-index: 1;
}
.color3{
  display: inline-block;
  width: calc(100% / 3) ;
  background: #87cefa;
  z-index: 1;
}

.arm-left{
  position: absolute;
  top: 50px;
  left: -65px;
  width: 150px;
  height:70px;
  background: #fff;
  z-index: -1;
  transform:rotate(-20deg)
}
.arm-right{
  position: absolute;
  top: 50px;
  left: 115px;
  width: 150px;
  height: 70px;
  background: #fff;
  z-index: -1;
  transform:rotate(20deg)
}
</style>
