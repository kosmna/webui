import { HttpParams } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';

/**  Cause the HttpErrorInterceptor to ignore certain error response status codes like this:

  this._auth.httClientGet<TypeHere>(`URL_HERE`, {
    params: new InterceptorHttpParams({ statusCodesToIgnore: [400, 401] }, {
      complete: 'false',
      offset: '0',
     limit: '50'
    })
*/

export class InterceptorHttpParams extends HttpParams {
  constructor(
    public interceptorConfig: { statusCodesToIgnore: number[] },
    params?: { [param: string]: string | string[] }
  ) {
    super({ fromObject: params } as HttpParamsOptions);
  }
}
