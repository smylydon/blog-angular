import { inject, InjectionToken } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export interface BASE_API_URL_INTERFACE {
  production: boolean;
  apiUrl: string;
}
export const BASE_API_URL = new InjectionToken<BASE_API_URL_INTERFACE>('');

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl: BASE_API_URL_INTERFACE = inject(BASE_API_URL);

  const apiReq = req.clone({ url: `${baseUrl.apiUrl}/${req.url}` });

  return next(apiReq);
};
