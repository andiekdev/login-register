import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { IonicPage,   ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {
  @ViewChild("username") username;
  @ViewChild("password") password;  
  @ViewChild("level") level;   
  public form          : FormGroup;
  type                 : string  = 'password';
  showPass             : any     = false;
  loading              : any;
  public userAdmin     : any;
  public recordID      : any;
  public dataUsernameID: any;
  public usernameID    : any;
  public IdUser        : any;
  public tmpData       : any;
  public tmpIdUser     : any;
  public tmpIdUserx    : any;
  public dataUsername  : any;
  public dataPassword  : any;
  public dataLevel     : any;
  public data_user: string;  
  public pageTitle     : string;
  public rows          : any = [];
  public items         : any;  
  public dataUser      : any = [];
  public showItem      : boolean = false;
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
         "password"  : ["", Validators.required],
         "level"     : ["", Validators.required]
         
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

  ionViewWillEnter()
   {
      this.pageTitle     = 'Register';
      if(this.NP.get("recordUser"))
      {
         this.dataUsername = "";
         this.dataPassword = "";
         this.dataLevel    = "";
         this.userAdmin    = this.NP.get("recordUser");
         
        if(this.userAdmin === "admin")
         {
            this.showItem   = true;
            
        }else{
            this.showItem   = false;
        }     
      }else{
          this.showItem   = false;
      }  
   }
   
  saveEntry(){
       
      let body     : string   = "key=create&username=" + this.dataUsername + "&password=" + this.dataPassword + "&level=" + this.dataLevel,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "register.php";
      
      this.http.post(url, body, options)
      .subscribe(data =>
      {   
         // If the request was successful notify the user
         if(data.status === 200)
         {
            this.showAlert('Secess', `Create user: ${this.dataUsername}`);
            this.navCtrl.push( LoginPage );
         }
         // Otherwise let 'em know anyway
         else
         {
            this.showAlert('Error', `Something went wrong!`);
         } 
      });
            
  }

  userRegister(){
            showLoader();
            this.dataUsername = this.form.controls["username"].value;
            this.dataPassword = this.form.controls["password"].value;
            this.dataLevel    = this.form.controls["level"].value;
            
          //// check to confirm the username and password fields are filled

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
        
            }else
        
            if (this.level.value == "") {
        
              let alert = this.alertCtrl.create({
        
                title: "ATTENTION",
                subTitle: "Type User field is empty",
                buttons: ['OK']
              });
        
              alert.present();
        
            }else{

              let body     : string   = "q=" + this.dataUsername,
                  type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
                  headers  : any      = new Headers({ 'Content-Type': type}),
                  options  : any      = new RequestOptions({ headers: headers }),
                  url      : any      = this.baseURI + "user_profile.php";
              
              this.http.post(url, body, options)
              .map(res => res.json())
              .subscribe(data =>
              {   
                  this.items     = (data); 
                  this.tmpIdUser =  JSON.stringify((this.items),['username']); 
                  this.IdUser    = this.tmpIdUser;
                      
                if(this.IdUser === "[]"){
                      this.loading.dismiss();
                      this.saveEntry();
                  }else if(this.IdUser === "undefined"){
                      this.loading.dismiss();
                      this.showAlert('Error',`Check Username`);
                  }else{
                      this.loading.dismiss();
                      this.showAlert('Error',`Username already exist!`);
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
  
}
