export function getCookie(key: string) {
  const cookieKey = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return cookieKey ? cookieKey.pop() : "";
}