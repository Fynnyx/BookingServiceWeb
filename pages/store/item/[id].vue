<script lang="ts" setup>
import { UrlService } from '~/ts/classes/UrlService';
import type { Item } from '~/ts/interfaces/Item';
import type { StrapiData, StrapiDataItem } from '~/ts/interfaces/strapi/StrapiData';


const urlService = new UrlService();

const route = useRoute();
const id = route.params.id;
const item = ref<StrapiDataItem<Item>>();

onMounted(async () => {
    const response = await fetch(`http://localhost:1337/api/items/${id}?populate=*`);
    console.log(response);
    const data = await response.json() as StrapiData<Item>;
    item.value = data.data;
});

</script>

<template>
    <div class="store-item">
        <div class="store-item__head">
            <div class="store-item__head__meta">
                <h1>{{ item?.attributes.Name }}</h1>
                <div class="store-item__head__meta__stats">

                    <div class="store-item__head__meta__stats__item">
                        <font-awesome-icon icon="fa-solid fa-money-bill" />
                        <span>{{ item?.attributes.Price }} CHF</span>
                    </div>
                    <div class="store-item__head__meta__stats__item">
                    </div>
                </div>
            </div>
            <div class="store-item__head__thumnail">
                <img :src="urlService.apiUrl + item?.attributes.Thumbnail?.data.attributes.url" alt="Thumbnail">
            </div>
        </div>
        <div class="store-item__content">

        </div>
    </div>
</template>

<style lang="scss" scoped>
.store-item {
    width: 100%;

    &__head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

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
                grid-template-columns: repeat(2, 1fr);
                width: 100%;
                &__item {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;

                    span {
                        margin-left: 0.5rem;
                    }
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

    }

    &__content {
        display: flex;
        flex-direction: column;
    }
}
</style>
