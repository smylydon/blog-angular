import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import {
  baseUrlInterceptor,
  BASE_API_URL,
  BASE_API_URL_INTERFACE,
} from './base-url.interceptor';
import { HttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

describe('BaseUrlInterceptor', () => {
  let httpService: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BASE_API_URL,
          useFactory: () =>
            <BASE_API_URL_INTERFACE>{
              production: false,
              apiUrl: 'http://testing:8080/api',
            },
        },
        provideHttpClient(withInterceptors([baseUrlInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpService = TestBed.inject(HttpClient);
  });

  it('should add url path', () => {
    httpService.get('hello').subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne('http://testing:8080/api/hello');

    expect(httpRequest.request.url).toEqual('http://testing:8080/api/hello');
  });
});
