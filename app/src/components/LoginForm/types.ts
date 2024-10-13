import type { InferOutput } from "valibot";

import type { schema } from "./schema";

export type LoginFormData = InferOutput<typeof schema>;

export type LoginFormProps = {
  afterSuccessSubmit?: () => void;
};
