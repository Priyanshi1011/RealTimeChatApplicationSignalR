import { Injectable } from '@angular/core';
import { User } from './model/user';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { Message } from './model/Message';
import { Observable, Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _httpService: Http, private http: HttpClient) { }
  public _PostUrl: string = '/api/Value/Post';
  public _getUrl: string = ' /api/Value/Get ';
  public _getByIdUrl: string = '/api/Value/Get';
  public _getByNameUrl: string = '/api/Value/Get';
  public _deleteByIdUrl: string = '/api/Value/Delete';
  public _updateurl: string = '/api/Value/Update';
  private headers: HttpHeaders;
  Users: User[];
  sender: string;
  connId: number;
  getUsers(): Observable<User[]> {
    //return this._httpService.get('/api/Value')
    //  .pipe(map(res => res.json()));
    return this._httpService.get(this._getUrl)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
  }

  getUserById(id: number): Observable<User[]> {
    //return this._httpService.get('/api/Value/' + id)
    //  .pipe(map(res => res.json()));
    var getByIdUrl = this._getByIdUrl + '/' + id;
    return this._httpService.get(getByIdUrl)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));

  }

  getUserByName(name: string) {
    //return this._httpService.get('/api/Value/' + name)
    //  .pipe(map(res => res.json()));
    var getByNameUrl = this._getByNameUrl + '/' + name;
    return this._httpService.get(getByNameUrl)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));

  }

  addUser(user: User) {
    return this._httpService.post('/api/Value/Post', user)
      .pipe(map(this.extractData))
      .pipe(catchError(this.handleError));
    //.pipe(map(res => res.json()))
    //.toPromise();
  }

  senderAdd(name: string) {
    this.sender = name;
  }

  getSenderName(): string {
    return this.sender;
  }

  addConnId(id: number) {
    if (id != null) { this.connId = id; }
  }

  getConnId(): number {
    return this.connId;
  }

  addMessage(msgmodel: Message) {
    return this._httpService.post('/api/Message', msgmodel)
      .pipe(map(res => res.json()));
  }

  modifyMessage(id: number, msgmodel: Message) {
    return this._httpService.put('/api/Message' + '/' + id, msgmodel)
      .pipe(map(res => res.json()));
  }

  getMessages() {
    return this._httpService.get('/api/Message')
      .pipe(map(res => res.json()));
  }
  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Opps!! Server error');
  }
  private extractData(res: Response) {
    let body = res.json();
    // return just the response, or an empty array if there's no data
    return body || [];
  }
}
