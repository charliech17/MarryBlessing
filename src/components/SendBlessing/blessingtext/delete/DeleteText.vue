<template>
    <div class="trash_can" id="trash_can">
        <img src="../../../../img/trash_can.png" alt="">
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
    .trash_can{
        width: 1rem;
        height: 1rem;
        position: absolute;
        bottom: 3%;
        border: 1px solid black;
        padding: .3rem;
        border-radius: 50%;
        z-index: 20;
        background-color: rgb(255, 255, 254);
        pointer-events: none;
    }

    .trash_can>img{
        width: 100%;
        height: 100%;
        /* z-index: 20; */
    }
</style>