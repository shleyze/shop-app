import type { InferOutput } from "valibot";

import type { schema } from "./schema";

export type FormData = InferOutput<typeof schema>;
