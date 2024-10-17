import { object, string, pipe, email, optional, union, literal } from "valibot";

import { paymentMethods } from "./data";

export const schema = object({
  email: pipe(string("Введите почту"), email("Введите почту")),
  description: optional(string()),
  paymentMethod: union(
    paymentMethods.map(({ value }) => literal(value)),
    "Выберите способ оплаты",
  ),
  shippingAddress: string("Укажите адрес доставки"),
  phoneNumber: string("Укажите номер телефона"),
});
