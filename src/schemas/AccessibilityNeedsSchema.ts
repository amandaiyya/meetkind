import {z} from 'zod';

export const AccessibilityNeedsSchema  = z.object({
    wheelchair: z.boolean().optional(),
    restroom: z.boolean().optional(),
    elevator: z.boolean().optional(),
    quietPlace: z.boolean().optional(),
})