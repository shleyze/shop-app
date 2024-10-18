import type { Order } from "@/types";

export function getStatusLabel(status: Order["status"]) {
  switch (status) {
    case "new": {
      return "Создан";
    }
    case "shipped": {
      return "Отправлен";
    }
    case "delivered": {
      return "Доставлен";
    }
    case "cancelled":
      return "Отменен";
  }
}

export function getPaymentStatusLabel(paymentStatus: Order["paymentStatus"]) {
  switch (paymentStatus) {
    case "pending": {
      return "Ожидает оплаты";
    }
    case "paid": {
      return "Оплачено";
    }
    case "failed": {
      return "Ошибка оплаты";
    }
  }
}

export function getPaymentMethodLabel(paymentMethod: Order["paymentMethod"]) {
  switch (paymentMethod) {
    case "self_delivery": {
      return "Самовывоз";
    }
    case "cash_on_delivery": {
      return "Наличные при доставке";
    }
    case "card_on_delivery": {
      return "Картой при доставке";
    }
  }
}
