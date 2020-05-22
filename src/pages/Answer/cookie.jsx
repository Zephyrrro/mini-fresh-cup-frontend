export function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = document.cookie;
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = decodeURIComponent(ca[i]);
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
