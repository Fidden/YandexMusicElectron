<template>
    <main class="main">
        <h2 class="title">
            <slot name="title"/>
        </h2>
        <div class="container">
            <slot name="body"/>
        </div>
    </main>
</template>

<script setup>

</script>

<style scoped>
.title {
    margin-bottom: 20px;
}

.container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 7px;
}

@media (min-width: 1001px) {
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
}
</style>
