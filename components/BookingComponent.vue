<script lang="ts" setup>
import type { Item } from '~/ts/interfaces/Item';
import { useScreens } from 'vue-screen-utils';
import { Mapper } from '~/ts/classes/Mapper';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthStore } from '~/store/auth';
import type { Stripe, StripeElements } from '@stripe/stripe-js';
import type { DisabledDate } from '~/ts/interfaces/vcal/DisabledDate';
import type { Services } from '~/ts/interfaces/Services';
import type { StrapiDataItem } from '~/ts/interfaces/strapi/StrapiData';


// Component setup
const props = defineProps({
    item: {
        type: Object as PropType<StrapiDataItem<Item>>,
        required: true,
    },
});

const mapper = new Mapper();
const config = useRuntimeConfig();
const router = useRouter();

const authStore = storeToRefs(useAuthStore());
const user = authStore.user;

// Stripe
let stripe: Stripe | null;
let elements: StripeElements
let loading = ref(true);

const stripeErrors = ref<string[]>([])

onMounted(async () => {
    stripe = await loadStripe(config.public.STRIPE_KEY);
    elements = stripe!.elements({
        mode: 'payment',
        amount: 100,
        currency: 'chf'
    });
    const StripeElement = elements.create('payment');
    StripeElement.mount('#payment-card');

    loading.value = false;
});

const handlePay = async (e: Event) => {
    if (loading.value || !stripe || !elements) return;
    loading.value = true;
    stripeErrors.value = [];

    try {
        // Setup payment intent
        const response = await fetch(`/api/payment/stripe`, {
            method: 'POST',
            body: JSON.stringify({
                id: props.item.id,
                services: services.value,
                range: range.value,
                user: user.value?.id,
            }),
        });
        console.log("Response", response);
        if (!response.ok) {
            stripeErrors.value.push('An error occured on the server. Please try again later.');
            loading.value = false;
            return;
        }
        const { secret: clientSecret } = await response.json();
        console.log("Client secret", clientSecret);

        const { error: submitError } = await elements.submit();
        if (submitError) {
            console.error(submitError);
            stripeErrors.value.push(submitError.message ? submitError.message : 'An unknown error occured');
            loading.value = false;
        }

        // Confirm Payment
        const { error } = await stripe.confirmPayment({
            clientSecret,
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment/success`,
            },
        });

        loading.value = false;
        if (error.type === 'card_error' || error.type === 'validation_error') {
            // router.push('/payment/failure');
            stripeErrors.value.push(error.message ? error.message : 'An unknown error occured');
        } else {
            console.log("Payment successful");
            changeSection('finish');
        }

    } catch (error) {
        console.error(error);
        stripeErrors.value.push((error as Error).message ? (error as Error).message : 'An unknown error occured');
        loading.value = false;
    }
}

// Error Array
const errors = ref<string[]>([]);

// DATE PICKER
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

// Modal functions

var modalSection = ref<string>('services');

const openModal = () => {
    // Check if range is set
    if (!range.value) {
        errors.value.push('Please select two dates');
        return;
    } else if (range.value.start === range.value.end) {
        errors.value.push('Please select two different dates');
        return;
    }
    const modal: HTMLDialogElement | null = document.querySelector(`#${modalSection.value}-modal`);
    if (modal) {
        modal.showModal();
    }
}

const closeModal = () => {
    const modal: HTMLDialogElement | null = document.querySelector(`#${modalSection.value}-modal`);
    if (modal) {
        modal.close();
    }
}

const changeSection = (section: string) => {
    closeModal()
    modalSection.value = section;
    openModal()
}

// Services
const services = ref<Number[]>([]);

// Watch the range variable for changes
watch(range, (newVal, oldVal) => {
    if (newVal) {
        errors.value = [];
    }
});
</script>

<template>
    <div class="booking-component">
        <VDatePicker class="date-picker" v-model.range="range" mode="date" :attributes="attrs" :columns="columns"
            :disabled-dates="disabledDates" />
        <button class="button" @click="openModal">Book</button>

        <ul class="errors">
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
    </div>
    <dialog id="services-modal" class="modal">
        <div class="modal__content">
            <div class="modal__header">
                <h2>Services</h2>
                <button class="close-button" aria-label="close modal" data-close @click="closeModal">✕</button>
            </div>
            <div class="modal__body">
                <p>Select all services you wish to book with the room.</p>
                <div class="services">
                    <div class="service">
                        <input type="checkbox" id="food" v-model="services" :value="1">
                        <label for="food">Food</label>
                    </div>
                    <div class="service">
                        <input type="checkbox" id="cleaning" v-model="services" :value="2">
                        <label for="cleaning">Cleaning</label>
                    </div>
                    <div class="service">
                        <input type="checkbox" id="minibar" v-model="services" :value="3">
                        <label for="minibar">Minibar</label>
                    </div>
                </div>
            </div>
            <div class="modal__footer">
                <button class="button" @click="closeModal">Cancel</button>
                <button class="button" @click="changeSection('summary')">Next</button>
            </div>
        </div>
    </dialog>
    <dialog id="summary-modal" class="modal">
        <div class="modal__content">
            <div class="modal__header">
                <h2>Summary</h2>
                <button class="close-button" aria-label="close modal" data-close @click="closeModal">✕</button>
            </div>
            <div class="modal__body">
                <p>This is the final page before final booking and paying for the selected object.</p>
                <div class="summary">

                </div>
            </div>
            <div class="modal__footer">
                <button class="button" @click="changeSection('services')">Back</button>
                <button class="button" @click="changeSection('payment')">Next</button>
            </div>
        </div>
    </dialog>
    <dialog id="payment-modal" class="modal">
        <div class="modal__content">
            <div class="modal__header">
                <h2>Payment</h2>
                <button class="close-button" aria-label="close modal" data-close @click="closeModal">✕</button>
            </div>
            <div class="modal__body">
                <div class="payment" id="payment-card">
                </div>
                <ul class="errors">
                    <li v-for="error in stripeErrors" :key="error">{{ error }}</li>
                </ul>
                <br>
                <span>By pressing Pay you agree to our Terms and Conditions</span>
            </div>
            <div class="modal__footer">
                <button class="button" @click="changeSection('summary')">Back</button>
                <button class="button" @click="handlePay">
                    <UtilLoading size="small" v-if="loading" />
                    <span v-else>Pay</span>
                </button>
            </div>
        </div>
    </dialog>
    <dialog id="finish-modal" class="modal">
        <div class="modal__content">
            <div class="modal__header">
                <h2>Finish</h2>
                <button class="close-button" aria-label="close modal" data-close @click="closeModal">✕</button>
            </div>
            <div class="modal__body">
                <span v-if="loading">Loading</span>
            </div>
            <div class="modal__footer">
                <button class="button" @click="closeModal">
                    Finish
                </button>
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

.modal {
    border: 1px solid black;
}

.services {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;

    .service {
        display: flex;
        align-items: center;
        gap: 1rem;

        label {
            font-size: 1.5rem;
        }

        input {
            width: 1.5rem;
            height: 1.5rem;
        }
    }
}

.errors {
    list-style: none;
    color: red;
}
</style>
