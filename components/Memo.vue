<template>
  <div
    class="memo"
    :style="{
      top: `${toppo}px`,
      left: `${left}px`
    }">
    <div class="handle" @mousedown="onMousedown" />
    <editor :index="index" />
  </div>
</template>

<script>
import Editor from '~/components/Editor'

export default {
  props: {
    toppo: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    }
  },
  components: {
    Editor
  },
  index: {
    type: Number,
    default: 0
  },

  methods: {
    onMousedown(e) {
      this.$emit('dragStart', {
        x: e.pageX,
        y: e.pageY
      })
    }
  }
}
</script>

<style>
.memo {
  position: fixed;
  background: #f00;
  width: 200px;
  height: 300px;
}

.handle{
  position: absolute;
  top:0;
  left:0;
  right: 0;
  height: 50px;
  background: #900;
  cursor:  move;
}

</style>
