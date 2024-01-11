<script lang="ts" setup>
import { Mapper } from '~/ts/classes/Mapper';
import type { DisabledDate } from '~/ts/interfaces/vcal/DisabledDate';
import type { Item } from '~/ts/interfaces/Item';
import type { StrapiData, StrapiDataItem } from '~/ts/interfaces/strapi/StrapiData';

const config = useRuntimeConfig();

const route = useRoute();
const id = route.params.id;
const item = ref<StrapiDataItem<Item> | null>();


onMounted(async () => {
    const response = await fetch(`${config.public.apiUrl}/api/items/${id}?populate=*`);
    const data = await response.json() as StrapiData<Item>;
    item.value = data.data;
});




</script>

<template>
    <div class="store-item" v-if="item">
        <div class="store-item__meta">
            <h1>{{ item?.attributes.Name }}</h1>
            <div class="store-item__meta__stats">

                <div class="store-item__meta__stats__item">
                    <font-awesome-icon icon="fa-solid fa-money-bill" />
                    <span>{{ item?.attributes.Price }} CHF</span>
                </div>
                <div class="store-item__meta__stats__item">
                    <font-awesome-icon icon="fa-solid fa-bed" />
                    <span>{{ item?.attributes.BedCount }} Beds</span>
                </div>
                <div class="store-item__meta__stats__item">
                    <font-awesome-icon icon="fa-solid fa-bath" />
                    <span>{{ item?.attributes.hasBathtub ? 'available' : 'unavailable' }}</span>
                </div>
                <div class="store-item__meta__stats__item">
                    <font-awesome-icon icon="fa-solid fa-shower" />
                    <span>{{ item?.attributes.hasShower ? 'available' : 'unavailable' }}</span>
                </div>
                <div class="store-item__meta__stats__item">
                    <font-awesome-icon icon="fa-solid fa-wifi" />
                    <span>{{ item?.attributes.hasNetwork ? 'available' : 'unavailable' }}</span>
                </div>
                <div class="store-item__meta__stats__item">
                    <font-awesome-icon icon="fa-solid fa-tree" />
                    <span>{{ item?.attributes.hasGarden ? 'available' : 'unavailable' }}</span>
                </div>
                <div class="store-item__meta__stats__item">
                    <font-awesome-icon icon="fa-solid fa-water-ladder" />
                    <span>{{ item?.attributes.hasPool ? 'available' : 'unavailable' }}</span>
                </div>
                <div class="store-item__meta__stats__item">
                    <font-awesome-icon icon="fa-solid fa-kitchen-set" />
                    <span>{{ item?.attributes.hasKitchen ? 'available' : 'unavailable' }}</span>
                </div>
            </div>


            <div class="store-item__meta__contact-address">
                <div class="store-item__meta__contact">
                    <h2>Contact</h2>
                    <span><b>Firstname: </b>{{ item.attributes.Contact.Firstname }}</span>
                    <span><b>Lastname: </b>{{ item.attributes.Contact.Lastname }}</span>
                    <span><b>Phone: </b>{{ item.attributes.Contact.PhoneNumber }}</span>
                    <span><b>Email: </b><a :href="`mailto:${item.attributes.Contact.Email}`">{{ item.attributes.Contact.Email
                    }}</a></span>
                </div>
                <div class="store-item__meta__address">
                    <h2>Address</h2>
                    <span>{{ item.attributes.Address.address }}</span>
                </div>
            </div>
        </div>
        <div class="store-item__thumnail">
            <img :src="config.public.apiUrl + item?.attributes.Thumbnail?.data?.attributes.url" alt="Thumbnail">

        </div>
        <div class="store-item__description">
            <h2>Description</h2>
            <Markdown :source="item?.attributes?.Description ? item.attributes.Description : ''" />
        </div>
        <div class="store-item__booking">
            <h2>Booking</h2>
            <BookingComponent v-if="item" :item="item" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.store-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1.5rem;
    width: 100%;


    &__meta {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        h1 {
            margin-right: 0;
            align-self: center;
        }

        &__stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            width: 100%;
            grid-gap: 1rem;
            margin: 2rem 0;

            &__item {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                // box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.12);
                box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.12);

                border-radius: 0.5rem;
                padding: 0.75rem;

                span {
                    margin-left: 0.5rem;
                }
            }
        }

        &__contact-address {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
        }
        &__contact {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;

            h2 {
                margin-bottom: 0.5rem;
            }

            span {
                margin-bottom: 0.5rem;
                align-self: flex-start;
            }
        }

        &__address {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;

            h2 {
                margin-bottom: 0.5rem;
            }

            span {
                margin-bottom: 0.5rem;
                align-self: flex-start;
            }
        }
    }

    &__thumnail {
        width: 100%;
        // border-radius: 50%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__booking {
        display: flex;
        flex-direction: column;
        align-items: center;

        >button {
            width: 100%;
            max-width: 20rem;
        }
    }
}

@media (max-width: 1200px) {
    .store-item {
        grid-template-columns: 1fr;
        grid-gap: 0;
    }
}
</style>
