import { Injectable } from '@angular/core';
import { HttpService } from './http-service';


@Injectable()
export class AppApi {
	constructor(
		private _http: HttpService
    ) { }
    /** 
     * 登录 
     */    
	login(opts?: any): any {
		return this._http.post('/login', opts);
    }
    /** 
     * 获取验证码 
     */    
	getCode(phone?: any): any {
		return this._http.get('/authenticationcode/sms/'+phone);
    }
    /** 
     * 注册 
     */    
	signIn(opts: any): any {
		return this._http.post('/register', opts);
	}
    /** 
     * 验证手机号
     */    
    signInPhoneValid(opts?: any): any {
		return this._http.post('/register/valid', opts);
    }

	queryProvinces():any{
		return this._http.get('/province/queryProvinces');
	}
}
