import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor( private http: HttpClient, public oktaAuth: OktaAuthService) { }

  private async request(method: string, url: string, data?: any) {
    const token = await this.oktaAuth.getAccessToken();

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });

  }

  getArticles(){
    return this.request('GET', `${environment.serverUrl}/article`);
  }

  createArticle(article){
    return this.request('POST', `${environment.serverUrl}/article`, article);
  }

  updateArticle(article){
    return this.request('PUT', `${environment.serverUrl}/article/${article.id}`, article);
  }

  deleteArticle(article){
    return this.request('POST', `${environment.serverUrl}/article/${article.id}`);
  }

}
