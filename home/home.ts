import { Component, ViewChild } from '@angular/core';
import { Content, NavController, MenuController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ServiceProvider } from '../../providers/service/service';
import { IonicPage,   ToastController } from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public dataUsername  : any;
  public dataLevel     : any;
  public tmpdataLevel_name: any;
  public dataLevel_name: any;
  public dataLevelName: any;
  public usernameID : any;
  public tmpIdUser  : any; 
  public IdUser     : any;  
  public IdUserID   : any;
  public IdUserIDx  : any;
  public IdUserIDxx : any;
  public IdUserx    : any;
  public tmpIdFar   : any;
  public IdFar      : any;
  public items      : any;
  public rows       : any = [];
  public dataUser   : any;
  public TmpUsername: any;
  public username   : any;
  public userLevel  : any;
  public showMenuSupplier      : boolean = false;
  public showMenuFarmer        : boolean = false;
  public showMenuCreateUser    : boolean = false;
  public showMenuSupTrans      : boolean = false;
  public showMenuFarTrans      : boolean = false;
  public recordID   : any;
  private baseURI   : string  = "http://localhost/FarmerTrackDev/";  
  
  @ViewChild(Content) content: Content;

	constructor(
        public navCtrl    : NavController, 
        public navParams  : NavParams,
        private menu      : MenuController,
        public authService: AuthProvider, 
        public loadingCtrl: LoadingController, 
        public loading    : LoadingController,
        public alertCtrl  : AlertController,
        public http       : Http,
        public NP         : NavParams,
        public toastCtrl  : ToastController
    ) 
    {
   
       this.menu.swipeEnable(true);
  }
  
     ionViewWillEnter()
   {
    
      if(this.NP.get("recordUser"))
      { 
        this.tmpIdUser    = JSON.stringify(this.NP.get("recordUser"),['username']); 
        this.IdUser       = ((this.tmpIdUser)); 
        this.TmpUsername  = JSON.parse((this.IdUser));
        this.username     = (this.TmpUsername[0]['username']);;
        
        this.tmpdataLevel_name = JSON.stringify(this.NP.get("recordUser"),['level_name']);
        this.dataLevel_name    = ((this.tmpdataLevel_name));
        this.userLevel         = JSON.parse((this.dataLevel_name));
        this.dataLevelName     = (this.userLevel[0]['level_name']);
        
      let body     : string    = "key=" + this.dataLevelName + "&q=" + this.username,
          type     : string    = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any       = new Headers({ 'Content-Type': type}),
          options  : any       = new RequestOptions({ headers: headers }),
          url      : any       = this.baseURI + "user_profile.php";
      
          this.http.post(url, body, options)        
                    
          .map(res => res.json())
          .subscribe(data =>
          {  
             this.items     = (data);
             this.dataUser  = JSON.stringify((this.items),['level']);
             this.IdUser    = JSON.parse(this.dataUser);
             this.userLevel = (this.IdUser[0]['level']);
             
                if(this.userLevel === "1")
                 {  
                    this.showMenuSupplier   = true;
                    this.showMenuFarmer     = true;
                    this.showMenuCreateUser = true;
                    this.showMenuSupTrans   = true;
                    this.showMenuFarTrans   = true;
                    
                }else if(this.userLevel === "2")
                 {
                    this.showMenuSupplier   = true;
                    this.showMenuFarmer     = false;
                    this.showMenuCreateUser = false;
                    this.showMenuSupTrans   = true;
                    this.showMenuFarTrans   = false;
                    
                }else{
                    this.showMenuSupplier   = false;
                    this.showMenuFarmer     = true;
                    this.showMenuCreateUser = false;
                    this.showMenuSupTrans   = false;
                    this.showMenuFarTrans   = true;
                }              
             
          });

      }else{
        this.showAlert('Error',`Connection No data`); 
      }  
    }
    
   // Assign the navigation retrieved data to properties
   // used as models on the page's HTML form
   selectEntry(item)
   {  
      this.dataUsername  = item.username;
      this.dataLevel     = item.level;
      this.dataLevelName = item.level_name;  
      this.recordID      = item.id;
   }    
    
  showAlert(title,subtitle) {
    const alert = this.alertCtrl.create({
      title:     title,
      subTitle:  subtitle,
      buttons:   ['OK']
    });
    alert.present();
  }
  
    
  goSupplier(recordUser) {
    this.navCtrl.push(SupplierPage, recordUser);
  }
  
  goFarmer(recordUser) {
    this.navCtrl.push(FarmerPage, recordUser);
  }
  
  goRegister(record) {
    this.navCtrl.push( RegisterPage, record);
  }  
  
  goSupplierProduct() {
    this.navCtrl.push(SupplierProductPage);
  }

  goSupTrans(recordUser){
    this.navCtrl.push(SupplierTransactionPage, recordUser);
  }  
  
  goFarTrans(recordUser){
    this.navCtrl.push(FarmerTransactionPage, recordUser );
  } 

  goReceiving() {
    this.navCtrl.push(ReceivingPage);
  }

  goBibit() {
    this.navCtrl.push(BibitPage);
  }

  goLahan() {
    this.navCtrl.push(LahanPage);
  }

  goPakan() {
    this.navCtrl.push(PakanPage);
  }  
  
  goPakanPakai() {
    this.navCtrl.push(PakanPakaiPage);
  }   
 
  goObat() {
    this.navCtrl.push(ObatPage);
  }  
  
  goObatPakai() {
    this.navCtrl.push(ObatPakaiPage);
  }  
 
  goBeratAyam() {
    this.navCtrl.push(BeratAyamPage);
  } 

  goAyamPunah() {
    this.navCtrl.push(AyamPunahPage);
  }    
 
  goSisaPakan() {
    this.navCtrl.push(SisaPakanPage);
  } 
  
  goSisaObat() {
    this.navCtrl.push(SisaObatPage);
  } 

}
