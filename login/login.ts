import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';
import { IonicPage,   ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  @ViewChild("username") username;
  @ViewChild("password") password;  
  public form          : FormGroup;
  type                 : string  = 'password';
  showPass             : any     = false;
  loading              : any;
  public recordID      : any;
  public dataUsernameID: any;
  public usernameID    : any;
  public IdUser        : any;
  public tmpData       : any;
  public tmpIdUser     : any = [];
  public tmpIdUserx    : any;
  public dataUsername  : any;
  public dataPassword  : any;
  public dataLevel     : any;
  public data_user     : string;  
  public rows          : any = [];
  public items         : any;  
  public dataUser      : any = [];
  private baseURI      : string  = "http://localhost/FarmerTrackDev/";  

  constructor(
        public navCtrl    : NavController, 
        public navParams  : NavParams, 
        private menu      : MenuController, 
        public authService: AuthProvider, 
        public loadingCtrl: LoadingController,
        public alertCtrl  : AlertController,
        public http       : Http,
        public NP         : NavParams,
        public fb         : FormBuilder,
        public toastCtrl  : ToastController
        
        ) {
  	this.menu.swipeEnable(false);
      // Create form builder validation rules
      this.form = fb.group({
         "username"  : ["", Validators.required],
         "password"  : ["", Validators.required]
         
      });     
  }

  showPassword() {
    this.showPass = !this.showPass;
 
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  login(){
      //// check to confirm the username and password fields are filled
    showLoader();
    if (this.username.value == "") {

      let alert = this.alertCtrl.create({

        title: "ATTENTION",
        subTitle: "Username field is empty",
        buttons: ['OK']
      });

      alert.present();
    } else

    if (this.password.value == "") {

      let alert = this.alertCtrl.create({

        title: "ATTENTION",
        subTitle: "Password field is empty",
        buttons: ['OK']
      });

      alert.present();

    }else{
       
      let body     : string   = "username=" + this.dataUsername + "&password=" + this.dataPassword,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "login.php";
      
      this.http.post(url, body, options)
      .map(res => res.json())
      .subscribe(data =>
      {   
              this.items     = (data); 
              this.dataUser  = (data); 
              this.rows      = (data); 
              this.tmpIdUser = JSON.stringify((this.items)); 
              this.IdUser    = JSON.parse(this.tmpIdUser);
              this.tmpData   = (this.IdUser);
              
        if(this.IdUser === "[]"){
              this.loading.dismiss();
              this.showAlert('Error',`Check your username and password`);
          }else{
              this.loading.dismiss();
              this.navCtrl.setRoot( HomePage, {recordUser:this.items} );
          }  
      });
     }       
  }

  showAlert(title,subtitle) {
    const alert = this.alertCtrl.create({
      title:     title,
      subTitle:  subtitle,
      buttons:   ['OK']
    });
    alert.present();
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Please Wait...'
    });
    this.loading.present();
  }
  
  register(){
      this.navCtrl.push( RegisterPage );
  }  


}
