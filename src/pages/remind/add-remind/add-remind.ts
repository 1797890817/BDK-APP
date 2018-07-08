import { Component, ViewChild, ApplicationRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ModalController,  ToastController } from 'ionic-angular';
import moment from 'moment';

import { IonInputPanelComponent } from '../../../components/ion-input-panel/ion-input-panel';
import { InfoInputComponent } from '../../../components/info-input/info-input';

import { ClientelePage } from '../../clientele/clientele/clientele';
import { SearchResultPage}from'../../clientele/search-result/search-result';

import { AppApi } from './../../../providers/app-api';
import { Utils } from '../../../providers/utils';
@Component({
    selector: 'page-add-remind',
    templateUrl: 'add-remind.html'
})
export class AddRemindPage {
    @ViewChild('addRemindForm') addRemindForm: NgForm;
    @ViewChild(InfoInputComponent) infoInput: InfoInputComponent;
    @ViewChild(IonInputPanelComponent) inputPanel: IonInputPanelComponent;
    callback: any = this.navParams.get('callback');
    item: any = this.navParams.get('item');
    refresh: any = this.navParams.get('refresh');
    type: any = this.navParams.get('type');
    mode: string = this.navParams.get('mode');
    modeText: string = this.mode == 'delay' ? '延迟' : '新增';
    title: string =
        this.navParams.get('type') == 'clientele'
            ? `${this.modeText}客户提醒`
            : `${this.modeText}其它提醒`;

    clientele: any = undefined;
    content: any;
    formData: any = {
        title: undefined,
        planRemindTime: undefined
    };
    planRemindTime = moment().format('YYYY-MM-DDTHH:mm:ssZ');
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private applicationRef: ApplicationRef,
        private appApi: AppApi,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController
    ) {
        if (this.item) {
            console.log(this.item);
            this.formData = {
                title:this.item.title
            };
            this.content = this.item.content;
            console.log(this.content);
            
            this.planRemindTime = moment(this.item.planRemindTime).format(
                'YYYY-MM-DDTHH:mm:ssZ'
            );
        }
    }
    ionViewDidLoad() {
        // this.navBar.backButtonClick = (e: UIEvent) => {
        //     // todo something
        //     this.callback().then(() => {
        //         this.navCtrl.pop();
        //     });
        // };
    }
    ionViewWillLeave() {
        console.log(123123123);
    }
    delay() {
        this.appApi.taskLazy({
            lazyId:this.item.id,
            planRemindTime:this.planRemindTime
        }).subscribe(d=>{
            console.log(d);
            const toast = this.toastCtrl.create({
                message: '延迟成功',
                position: 'middle',
                duration: 1500
            });
            toast.onDidDismiss(() => {
                this.callback().then(() => {
                    this.navCtrl.pop();
                });
            });
            toast.present();
        })
    }
    done() {
        if (this.addRemindForm.valid) {
            if (this.addRemindForm.valid) {
                if (this.type == 'clientele') {
                    this.formData.customerId = this.clientele.id;
                }
                this.formData = Utils.extend(true, this.formData, this.content);
                this.formData.planRemindTime = moment(this.planRemindTime)
                    .utc()
                    .format();
                console.log(this.formData);
                this.taskCreate();
            }
        }
    }

    taskCreate() {
        this.appApi.taskCreate(this.formData).subscribe(d => {
            console.log(d);
            this.success();
        });
    }
    success() {
        const toast = this.toastCtrl.create({
            message: '创建成功',
            position: 'middle',
            duration: 1500
        });
        toast.onDidDismiss(() => {
            this.refresh().then(() => {
                this.navCtrl.pop();
            });
        });
        toast.present();
    }
    openInputPanel() {
        this.inputPanel.inputFoucs();
    }
    hideInputPanel() {
        console.log('close');
        this.inputPanel.panelOpen = false;
        this.applicationRef.tick();
    }
    textInput() {
        this.infoInput.isRecord = false;
        setTimeout(() => {
            this.infoInput.setFocus();
        }, 200);
    }
    recordInput() {
        this.infoInput.isRecord = true;
    }
    voiceBarClick() {
        this.infoInput.isRecord = true;
        this.inputPanel.panelOpen = true;
    }
    recordEnd(e) {
        console.log(e);
    }
    choose() {
        let callback = (d): any => {
            console.log(d);
            return Promise.resolve();
        };
        let profileModal = this.modalCtrl.create(SearchResultPage, {
            item: this.clientele
        });
        profileModal.onDidDismiss(data => {
            this.inputPanel.scrollDisable();
            if (data) {
                this.clientele = data;
            }
            console.log(data);
        });
        this.inputPanel.scrollEnable();
        profileModal.present();
    }
}
