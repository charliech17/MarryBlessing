<template>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  />
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
</script>

<style>
html,
body {
  margin: 0;
  height: 100vh; 
  min-height: -webkit-fill-available;
  transition:scroll 1s ease-in-out;
}

#app{
  height: 100%;
}

.warning {
  color: brown;
  margin: 0;
  text-align: end;
  font-size: 5px;
}

@media (min-width:1200px) {
 body{
   background-color: rgb(34, 41, 65);
 }

 .warning {
    font-size: 2rem;
  }
}
</style>
