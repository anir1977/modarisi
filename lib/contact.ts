export const WHATSAPP_NUMBER = "0708025467";
export const WHATSAPP_INTERNATIONAL = "212708025467";

export function whatsappUrl(message = "مرحباً، عندي تلميذ في الثالثة إعدادي وأريد معرفة طريقة استعمال موديريسي.") {
  return `https://wa.me/${WHATSAPP_INTERNATIONAL}?text=${encodeURIComponent(message)}`;
}
