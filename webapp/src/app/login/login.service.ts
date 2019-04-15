import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

import { Observable } from 'rxjs';

const httpOptions = {
	  headers: new HttpHeaders({
	    'Access-Control-Allow-Origin' : '*',
		'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers' : '*'
	  })
	};

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private http: HttpClient) { }


  getAllCountries(): Observable<any>{
	 
  	return this.http.get('http://country.io/names.json', httpOptions);
  		
  }
}




	 //  	let headers = new HttpHeaders();
	 //    headers.append('Content-Type', 'application/json');
	 //    headers.append('Access-Control-Allow-Origin', '*');
	 // headers.append('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
	 // headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
	 // headers.append('Access-Control-Allow-Headers', '*');
