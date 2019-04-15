import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**

For JavaScript developers, the general rule is as follows:

rxjs: Creation methods, types, schedulers and utilities

import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
rxjs/operators: All pipeable operators:

import { map, filter, scan } from 'rxjs/operators';
rxjs/webSocket: The web socket subject implementation

import { webSocket } from 'rxjs/webSocket';
rxjs/ajax: The Rx ajax implementation

import { ajax } from 'rxjs/ajax';
rxjs/testing: The testing utilities

import { TestScheduler } from 'rxjs/testing';
and for backward compatability you can use rxjs-compat

**/


@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { 

  }
  tempUrl = 'http://localhost:8080';

  public getAllPosts() : Observable<any>{
  	return this.http.get(this.tempUrl + '/webapi/posts');
  		
  	}

  }


