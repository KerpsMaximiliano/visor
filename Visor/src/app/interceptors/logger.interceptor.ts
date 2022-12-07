import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';


@Injectable()
export class LoggerInterceptor implements HttpInterceptor {

  constructor() {
  }

  // obtenerFuncion(url: any){
  //   let func = new String(url);
  //   if (func[func.length-1] == '/')
  //     func = func.slice(0, -1);

  //   let start = func.search("api/");
  //   if (start >= 0)
  //     func = func.substring(start+4);
  //   else
  //     func = func.substring(func.lastIndexOf('/') + 1);

  //   return func;
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let basename = req.url;
    let params = JSON.parse(req.body);

    console.log(`%c REST call: ${basename}`, 'background: #000; color: #fff', params);

    return next.handle(req).pipe(
      tap((event: any) => {
        if(event instanceof HttpResponse){
          let data: any = event.body;
          //original console.log(`%c REST resp: ${basename}`, 'background: #000; color: #ff0', params, data.returnset[0]);
          if (params){
          console.log(`%c REST resp: ${basename}`, 'background: #000; color: #ff0', params, data.returnset[0]);        
          if (data.returnset[0].RCode == 1){
            if (data.dataset.length == 0)
              console.log('%c dataset vacio ', 'background: #000; color: #ff0');
            else
              console.log('%c dataset: ', 'background: #000; color: #ff0', data.dataset);
          }
      }
    } 
      })
    );
  }
}
