import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Kitty } from '../kitty';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getKitties(): Observable<Kitty[]> {
    return this.http.get<Kitty[]>('https://api.thecatapi.com/v1/images/search?size=small&limit=15')
    .pipe(
      map(response => {
        return response.map(el => ({
          id: el.id,
          url: el.url
        }))
      })
    );
  }
}
