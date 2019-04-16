import { Component } from '@angular/core';


export class Utility {


	public static isNullOrEmpty(value: any){
		if(value == null || value == undefined || value == [] || value == {} || value == ''){
			return true;
		}
		return false;
	} 
}
