<template>
  <textarea
    class="editor"
    :value="$store.state.memoList[index].text"
    @input="$store.commit('updateText', { index, text:$event.target.value })"
  />
</template>
<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onInput(e) {
      this.$store.commit('updateText', {
        index: this.index,
        text: e.target.value
      })
    }
  }
}
</script>

<style>
.editor {
  position: absolute;
  top: 50px;
  left: 0;
  width: 200px;
  bottom: 0;
  border: none;
  padding: 15px;
  font-size: 20px;
  resize: none;
}

</style>
