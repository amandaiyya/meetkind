import {z} from 'zod';

export const LocationSchema = z.object({
    address: z
        .string()
        .min(1, "Please select an address from suggestions"),
    
    coordinates: z
        .object({
            lat: z
                .number({
                    error: "Please select an address from suggestions",
                })
                .min(-90)
                .max(90),

            lon: z
                .number({
                    error: "Please select an address from suggestions"
                })
                .min(-180)
                .max(180),
        }),
})

export const PlanningSchema = z.object({
    venue: z
        .string()
        .min(1, "venue is required"),

    myAddress: LocationSchema,

    friendsAddresses: z
        .array(LocationSchema)
        .min(1, "At least one friend address is required"),
})