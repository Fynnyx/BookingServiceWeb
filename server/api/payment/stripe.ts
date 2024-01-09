import Stripe from "stripe";
import { Booking } from "~/ts/interfaces/Booking";
import { Item } from "~/ts/interfaces/Item";
import { StrapiDataItem } from "~/ts/interfaces/strapi/StrapiData";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event);
    const {
        id,
        services,
        range,
        user
    } = JSON.parse(body);


    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2023-10-16",
    });

    const response = await fetch(`${config.public.apiUrl}/api/items/${id}`);
    const data = await response.json();
    if (data.error) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Item not found" }),
        };
    }
    const item: StrapiDataItem<Item> = data.data;

    // Logic to calculate amount
    const bookingDays = Math.ceil((new Date(range.end).getTime() - new Date(range.start).getTime()) / (1000 * 60 * 60 * 24));
    const amount = item.attributes.Price * bookingDays;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "chf",
            metadata: {
                user: user,
                item: item.id,
                services: services,
                range: range.toString()
            },
        });
        const response = await fetch(`${config.public.apiUrl}/api/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    user: {
                        id: user
                    },
                    item: {
                        id: item.id
                    },
                    // Dates in YYYY-MM-DD
                    StartDate: new Date(range.start).toISOString().split("T")[0],
                    EndDate: new Date(range.end).toISOString().split("T")[0],
                    ServiceFood: services.includes(1),
                    ServiceCleaning: services.includes(2),
                    ServiceTransport: services.includes(3),
                    comment: null
                }
            }),
        });
        
        const data = await response.json();
        if (data.error) {
            stripe.paymentIntents.cancel(paymentIntent.id);
            return sendError(event, createError({statusCode: 500, message: "Error creating booking"}), false)
        }
        return { secret: paymentIntent.client_secret };
    } catch (error) {
        return sendError(event, createError({statusCode: 500, message: "Error creating payment intent"}), false)
    }
});