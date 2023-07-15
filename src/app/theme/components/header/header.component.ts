import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { trigger,  state,  style, transition, animate } from '@angular/animations';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { UserOrg } from 'src/app/services/userorg.service';
import { OrgService } from 'src/app/services/org.service';
import {AppGlobal} from '../../../shared/app.global';
import { EnvService } from 'src/app/env.service';
import { TokenService } from 'src/app/services/token-service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ MenuService ],
  animations: [
    trigger('showInfo', [
      state('1' , style({ transform: 'rotate(180deg)' })),
      state('0', style({ transform: 'rotate(0deg)' })),
      transition('1 => 0', animate('400ms')),
      transition('0 => 1', animate('400ms'))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  public showHorizontalMenu:boolean = true; 
  public showInfoContent:boolean = false;
  public settings: Settings;
  public orgName: any;
  public org_id: any;
  public menuItems:Array<any>;
  public smallLogo:any;
  nameRole: any;
  constructor(public appSettings:AppSettings, public config: AppGlobal,private tokenService: TokenService,
              public envService: EnvService, public menuService:MenuService, private userOrg: UserOrg,
              private orgService: OrgService,) {
      this.settings = this.appSettings.settings;
      this.menuItems = this.menuService.getHorizontalMenuItems();
      this.smallLogo = this.envService.WHEREWORKS_SIDEBAR_LOGO_PATH + this.envService.WHEREWORKS_SIDEBAR_LOGO_NAME;
      this.nameRole = this.tokenService.getRoleAccessName();
      // console.log('LOGO' +  this.logo);
      // console.log('admin check1' + this.nameRole);
      if (this.nameRole === 'Owner' || this.nameRole === 'Admin') {
       // console.log('admin check' + this.nameRole);
       // document.getElementById('btn13').click();
       this.menuItems = this.envService.verticalMenuItems;
      } else {
         this.menuItems = this.envService.verticalMenuItemsMember;
      }
  }

  ngOnInit() {
    if(window.innerWidth <= 768) 
      this.showHorizontalMenu = false;


      // get user org
      const name = this.userOrg.getOrgName();
      this.orgName = name;
      
  }


  public closeSubMenus(){
    let menu = document.querySelector("#menu0"); 
    if(menu){
      for (let i = 0; i < menu.children.length; i++) {
          let child = menu.children[i].children[1];
          if(child){          
              if(child.classList.contains('show')){            
                child.classList.remove('show');
                menu.children[i].children[0].classList.add('collapsed'); 
              }             
          }
      }
    }
  }

  @HostListener('window:resize')
  public onWindowResize():void {
     if(window.innerWidth <= 768){
        this.showHorizontalMenu = false;
     }      
      else{
        this.showHorizontalMenu = true;
      }
  }
  
}
