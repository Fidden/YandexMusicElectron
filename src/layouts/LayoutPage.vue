<template>
    <main class="main">
        <TheNavigation/>
        <div class="main-head">
            <h2>
                <slot name="title"/>
                <br>
                <span><slot name="subtitle"/></span>
            </h2>
        </div>
        <slot name="body"/>
    </main>
</template>

<script setup>
import TheNavigation from '../components/TheNavigation.vue';
</script>

<style scoped>
.main-head h2 {
    font-weight: 500;
    font-size: 31.25px;
    line-height: 20px;
    margin-bottom: 20px;
}

.main-head span {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #8E929C;
}

</style>
