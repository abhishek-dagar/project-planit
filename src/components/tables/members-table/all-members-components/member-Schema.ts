import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const memberSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.string(),
});

export type Member = z.infer<typeof memberSchema>;
