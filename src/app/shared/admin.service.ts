import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getUser() {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getArtisan() {
    return this.http.get<any>('https://randomuser.me/api/?results=5000').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteArtisan(id:number) {
    return this.http.get<any>('https://randomuser.me/api/?results=5000'+id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getOthers() {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
