import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { stringify } from '@angular/core/src/util';

@Injectable()
export class ImageService {
  private apiUrl = '/api/image/';

  constructor(private httpClient: HttpClient) {}

  add(filesToUpload: any) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   })
    // };
      const formData = new FormData();
      for (let i = 0; i < filesToUpload.length; i++) {
          formData.append('file', filesToUpload[i]);
      }

      // return this.httpClient.post(`${this.apiUrl}add`, formData, httpOptions);
      return this.httpClient.post(`${this.apiUrl}add`, formData);
  }

  getImageList(): Observable<string[]> {
    return this.httpClient
      .get<string[]>(this.apiUrl + 'list')
      .pipe(
        map(response => response));
  }

  remove(name: string) {

      return this.httpClient.get(this.apiUrl + 'remove?name=' + name);
  }

  getPathForMinifiedImage(name) {
      return this.apiUrl + 'load-minified/' + name;
  }

  getPathForNormalImage(name) {
    return this.apiUrl + 'load-normal/' + name;
  }


}
