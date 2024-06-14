import { cookies } from 'next/headers';

export function setLocale(locale: string) {
  const localeCookie = cookies().get('NEXT_LOCALE');
  if (localeCookie?.value !== locale) {
    cookies().set('NEXT_LOCALE', locale);
  }
}