import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
/** Carga la configuracion de entorno desde src/assets/env/*.json **/
export class Config  {

  private config = [];
  private env = [];

  constructor(private http: HttpClient) {
  }

  /**
   * Use to get the data found in the second file (config file)
   */
  public getConfig(key: any) {
    return this.config[key];
  }

  /**
   * Use to get the data found in the first file (env file)
   */
  public getEnv(key: any) {
    return this.env[key];
  }

  /**
   * This method:
   *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
   *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
   */
  public load() {
    return new Promise((resolve, reject) => {
      // this.http.get('./assets/env/env.json').pipe(map((res: any) => res.json() ))
      this.http.get('./assets/env/env.json')
      .pipe(catchError((error: any): any => {
          console.log('Configuration file "env.json" could not be read');
          console.log('Error message', error);
          resolve(true);
          // throw new Error(error.json().error || 'Server error'); 
          throw new Error(error || 'Server error'); 
        }))
        .subscribe( (envResponse: any) => {
          this.env = envResponse;
          let request: any = null;
          request = this.http.get('./assets/env/env.' + envResponse.env + '.json');

          if (request) {
            request
            // .pipe(map( (res: any) => res.json() ))
            .pipe(catchError((error: any) => {
                console.error('Error reading ' + envResponse.env + ' configuration file');
                console.log('Error message', error);
                resolve(error);
                // throw new Error(error.json().error || 'Server error');
                throw new Error(error || 'Server error');
              }))
              .subscribe((responseData: any) => {
                this.config = responseData;
                resolve(true);
              });
          } else {
            console.error('Env config file "env.json" is not valid');
            resolve(true);
          }
        });

    });
  }
}

