<template>
    <div class="search-bar">
        <input
            v-model="search"
            v-debounce:300="handleInput"
            placeholder="Поиск"
            type="text"
        >
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const request = inject('$request');
const search = ref('');

async function handleInput() {
    if (!search.value.trim().length)
        return;

    let res = await request.get('/search', {
        params: {
            'text': search.value,
            'nocorrect': String(false),
            'type': 'all',
            'page': 0,
            'playlist-in-best': String(false),
        }
    });

    await store.dispatch('setSearchResponse', {});
    await store.dispatch('setSearchResponse', res.data.result);
    await router.push({name: 'search'});
}

</script>

<style scoped>
.search-bar {
    flex: 1;
    margin: 0 80px;
    align-self: stretch;
    overflow: hidden;
    border-radius: 5px;
    background: #222939;
    border: 1px solid rgba(255, 255, 255, 0.04);
    -webkit-app-region: no-drag;
    height: 100%;
}

.search-bar input {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    font-size: 14px;
    background: none;
    outline: none;
    border: none;
    color: white;
}

</style>
