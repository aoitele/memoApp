<template>
  <div
    class="memo"
    :style="{
      top: `${toppo}px`,
      left: `${left}px`
    }"
  >
    <div class="handle" @mousedown="onMousedown" />
    <!-- <editor :index="index" /> -->
  </div>
</template>

<script>
// import Editor from '~/components/Editor.vue'

export default {
  components: {
    // Editor
  },
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

</style>
