import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';


import { OperatingRecordPage } from './tabs/operating-record/operating-record';
import { NotFollowPage } from './tabs/not-follow/not-follow';
import { FollowRecordPage } from './tabs/follow-record/follow-record';
import { CallRecordPage } from './tabs/call-record/call-record';

import { ClienteleItemComponent } from '../../../components/clientele-item/clientele-item';

import { AppApi } from './../../../providers/app-api';
@Component({
    selector: 'page-clientele-detail',
    templateUrl: 'clientele-detail.html'
})
export class ClienteleDetailPage {
    @ViewChild(Navbar) navBar: Navbar;
    @ViewChild(ClienteleItemComponent) clienteleItem: ClienteleItemComponent;
    tabPage1 = NotFollowPage;
    tabPage2 = FollowRecordPage;
    tabPage3 = CallRecordPage;
	tabPage4 = OperatingRecordPage;
    id: string = this.navParams.get('id');
    clienteleDetail: any = {};
    tabStyle: any = undefined;
    hideItem: boolean = false;
	tabParams: any = {
        id: this.navParams.get('id')
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private appApi: AppApi
    ) {}
    ionViewDidLoad() {
        this.customerDetails();
        this.navBar.backButtonClick = (e: UIEvent) => {
            this.navCtrl.pop({
                // animate: false,
                animation: 'md-transition'
            });
        };
    }

    customerDetails() {
        this.appApi.customerDetails(this.id).subscribe(d => {
            console.log(d);
            this.clienteleDetail = d;
			this.tabParams.item = d;
            setTimeout(() => {
                this.tabStyle = {
                    height: `calc(100% - ${this.clienteleItem.getHeight() /
                        10}rem`
                };
                console.log(this.tabStyle);
            }, 0);
        });
    }
}
