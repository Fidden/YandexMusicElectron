<template>
    <div class="filter-container">
        <div class="input">
            <input
                v-model.trim="filter.query"
                placeholder="Поиск"
                type="text">
            <i class="far fa-search"/>
        </div>


        <select v-model.number="filter.value">
            <option value="-1">
                По стандарту
            </option>
            <option value="0">
                Название
            </option>
            <option value="1">
                Артист
            </option>
            <option value="2">
                Длительность
            </option>
        </select>
    </div>
</template>

<script setup>
import { defineEmits, defineProps, onMounted, ref, watch } from 'vue';

const filter = ref({
    query: '',
    value: -1,
});

const timer = ref(null);

const emits = defineEmits(['filtered']);

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    filterFunc: {
        type: Array,
        required: true,
    }
});

watch(filter, (_filter) => {
    if (timer.value)
        clearTimeout(timer.value);

    timer.value = setTimeout(() => {
        let out = props.data;

        if (_filter.query.length > 0) {
            let searchResult = out
                .filter(item => {
                    return item.track.title.toLowerCase().indexOf(_filter.query.toLowerCase()) !== -1
                        || item.track.artists.findIndex(item => item.name.toLowerCase().indexOf(_filter.query.toLowerCase()) !== -1) !== -1;
                });

            out = searchResult.concat(out.filter(item => !searchResult.includes(item)));
        }

        if (_filter.value > -1)
            out = out.slice(0).sort(props.filterFunc[_filter.value]);

        emits('filtered', out);
    }, 250);

}, {deep: true});

onMounted(() => {
    emits('filtered', props.data);
});

</script>

<style scoped>
.filter-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

input, select {
    padding: 8px 12px;
    color: white;
}

.input {
    position: relative;
    width: 215px;
    height: 40px;
}

input {
    background: rgba(44, 53, 77, 0.57);
    border-radius: 4px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

input::placeholder {
    color: white;
}

i {
    position: absolute;
    right: 2px;
    top: 50%;
    transform: translate(-50%, -50%);
}

select {
    background: none;
    outline: none;
    border: none;
}

option {
    color: black;
    background: none;
}

</style>
