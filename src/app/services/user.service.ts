// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import baseUrl from './helper';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   constructor(private http: HttpClient) {}

//   //add user

//   public addUser(user: any) {
//     return this.http.post(`${baseUrl}/user/`, user);
//   }


//   public getAllUser() {
//     return this.http.get(`${baseUrl}/user/`, );
//   }

//   public getAll() {
//     return this.http.get(`${baseUrl}/user/`);
//   }

// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // ✅ Add user (Handles base64 profile photo)
  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }

  // ✅ Get all users
  public getAllUser() {
    return this.http.get(`${baseUrl}/user/`);
  }

  // ✅ Get a single user by username
  public getUserByUsername(username: string) {
    return this.http.get(`${baseUrl}/user/${username}`);
  }

  // ✅ Delete user by ID
  public deleteUser(userId: number) {
    return this.http.delete(`${baseUrl}/user/${userId}`);
  }
}
