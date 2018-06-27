import { Injectable } from '@angular/core';
import { HttpService } from './http-service';


@Injectable()
export class AppApi {
    constructor(private _http: HttpService) {}
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
        return this._http.get('/authenticationcode/sms/' + phone);
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
    /**
     * 获取省份信息
     */
    queryProvinces(): any {
        return this._http.get('/province/queryProvinces');
    }
    /**
     * 获取城市信息
     */
    queryCitiesByProvinceId(id: any): any {
        return this._http.get('/city/queryCitiesByProvinceId/' + id);
    }
    /**
     * 创建客户
     * @param opts
     */
    customerCreate(opts?: any): any {
        return this._http.post('/customer/create', opts);
    }
    /**
     * 查询客户列表
     * @param opts
     */
    customerQuery(opts) {
        return this._http.post('/customer/queryCustomerByPage', opts);
    }
    /**
     * 验证新客户手机号
     * @param phone
     */
    customerValid(phone) {
        return this._http.post('/customer/valid', { phone });
    }
    /**
     * 删除客户
     * @param id
     */
    customerDelete(id) {
        return this._http.delete('/customer/delete/' + id);
    }
    customerSearch(keyword) {
        return this._http.get('/customer/getCustomerKeyword/',{
            keyword
        },true);
    }
}
