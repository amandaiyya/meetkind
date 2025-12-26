import {z} from 'zod';

export const LocationSchema = z.object({
    address: z
        .string({message: "Address is required"}),
    
    coordinates: z
        .object({
            lat: z.number().min(-90).max(90),
            lon: z.number().min(-180).max(180),
        }),
})

export const PlanningSchema = z.object({
    vanue: z
        .string()
        .min(1, "Vanue is required"),

    myAddress: LocationSchema,

    friendsAddresses: z
        .array(LocationSchema)
        .min(1, "At least one friend address is required"),
})