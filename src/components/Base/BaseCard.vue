<template>
  <div class="outer">
    <div class="inner_contents">
        <h1 class="title">{{inputTitle}}</h1>
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
    props:['inputTitle'],
}
</script>


<style scoped>
.outer{
    display: flex;
    height: 90%;
    justify-content: center;
    align-items:center;
}

.inner_contents {
  margin: 0 1.5rem;
  padding: .5rem;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 5px 5px rgba(0,0,0,0.2);
  border-radius: 1rem;
}

.title {
  margin: 0 2rem;
  text-align: center;
  background-color: rgb(210, 123, 218);
  border-radius: .5rem;
}
</style>