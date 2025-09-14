import { Description } from '@radix-ui/react-dialog'
import {email, z} from 'zod'

export const AddProduct  = z.object({
               Title: z.string(),
               Description:z.string(),
               Price:z.string()
})

