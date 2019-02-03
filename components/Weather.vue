<template>
  <div
    class="weather"
  >
    <span
      @click="$emit('sunny')"
    >
      🌞
    </span>

    <span
      @click="$emit('night')"
    >
      🌛
    </span>
    <span
      @click="$emit('snow')"
    >
      ❄️
    </span>
  </div>
</template>

<script>

</script>

<style>
.weather {
  position: absolute;
  font-size: 300px;
  top: 90px;
  right: 90px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
}
</style>
