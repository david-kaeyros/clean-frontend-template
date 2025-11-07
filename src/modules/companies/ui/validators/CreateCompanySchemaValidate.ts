import {z} from 'zod'

export const createCompanySchemaValidate = z.object({
    companyName: z.string().min(3, { message: "Name should be at least 3 characters" }),
    email: z.email({ message: "Invalid email address" }),
    phone: z.string().min(6, { message: "Phone number too short" }),
    address: z.string().min(3, { message: "Address too short" }),
    creationDate: z.string(),
});

export type CreateCompanySchemaType = z.infer<typeof createCompanySchemaValidate>;