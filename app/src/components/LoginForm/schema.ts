import { object, string, pipe, email } from "valibot";

export const schema = object({
  email: pipe(string("Введите почту"), email("Введите почту")),
  password: string("Введите пароль"),
});
