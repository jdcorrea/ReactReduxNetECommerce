export function getCookie(key: string) {
  const cookieKey = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return cookieKey ? cookieKey.pop() : "";
}

export function currencyFormat(amount: number) {
  return `$${(amount / 100).toFixed(2)}`
}