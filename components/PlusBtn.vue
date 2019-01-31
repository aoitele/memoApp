<template>
  <div
    class="btn"
    @click="$emit('plus')"
  >
    <span>+</span>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  background: #fff;
  border: #666 2px solid;
  width: 60px;
  height: 60px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  transform: scale(1.1);
}

.btn > span {
  font-size: 50px;
  display: inline-block;
  margin-top: -10px;
}
</style>
