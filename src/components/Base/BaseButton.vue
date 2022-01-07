<template>
  <button :class="buttonStyle">
    <div v-if="needImage" class="img_icon">
      <slot name="img"></slot>
    </div>
    <slot> </slot>
  </button>
</template>

<script>

export default {
  props: ["needImage", "buttonStyle"],
};
</script>

<style scoped>
button {
  font-size: 1.5rem;
  margin: 2vw 2vw;
  cursor: pointer;
  padding: 2vh 0.5vw;
  border-radius: 1rem;
}

.purple {
  background: #350b79;
  color: white;
  border: none;
}

.img_icon {
  display: inline-block;
  width: 1.8rem;
  height: 1.8rem;
  background: white;
  border-radius: 0.3rem;
  margin-right: 0.2rem;
}


.purple:hover,
.purple:active {
  background-color: rgb(212, 197, 226);
  color: #350b79;
  font-weight: 700;
  box-shadow: 0 0 0.3rem 0.2rem rgba(0, 0, 0, 0.5);
  font-weight: 900;
}
</style>
