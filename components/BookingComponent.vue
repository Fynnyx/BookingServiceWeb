<script lang="ts" setup>
import type { Item } from '~/ts/interfaces/Item';
import { useScreens } from 'vue-screen-utils';
import { Mapper } from '~/ts/classes/Mapper';
import type { DisabledDate } from '~/ts/interfaces/vcal/DisabledDate';
import type { StrapiDataItem } from '~/ts/interfaces/strapi/StrapiData';



const props = defineProps({
    item: {
        type: Object as PropType<StrapiDataItem<Item>>,
        required: true,
    },
});

const mapper = new Mapper();

const range = ref();
const attrs = ref([
    {
        key: 'bookingpicker',
        dates: new Date(),
    }
])

const { mapCurrent } = useScreens({ xs: '0px', sm: '640px', md: '768px', lg: '1024px' });
const columns = mapCurrent({ lg: 2 }, 1);
var disabledDates = ref<DisabledDate[]>([]);

disabledDates.value = mapper.bookingsToDisabledDates(props.item.attributes.bookings);


const openModal = () => {
    const modal: HTMLDialogElement | null = document.querySelector('#booking-modal');
    if (modal) {
        modal.showModal();
    }
}

const closeModal = () => {
    const modal: HTMLDialogElement | null = document.querySelector('#booking-modal');
    if (modal) {
        modal.close();
    }
}
</script>

<template>
    <div class="booking-component">
        <VDatePicker class="date-picker" v-model.range="range" mode="date" :attributes="attrs" :columns="columns"
            :disabled-dates="disabledDates" />
        <button class="button" @click="openModal">Book</button>
    </div>
    <dialog id="booking-modal" class="modal" >
        <div class="modal__content">
            <div class="modal__header">
                <h2>Services</h2>
                <button class="close-button" aria-label="close modal" data-close @click="closeModal">✕</button>
            </div>
            <div class="modal__body">
                <p>Services</p>
            </div>
        </div>
    </dialog>
</template>

<style lang="scss" scoped>
.booking-component {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1rem;

    >button {
        width: 100%;
        max-width: 20rem;
    }
}
</style>
