import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { DisMenuService } from '../../../services/dis-menu.service';
import { AppGlobal } from '../../../shared/app.global';
import { TokenService } from 'src/app/services/token-service';
import { EnvServiceProvider } from 'src/app/env.service.provides';
import { EnvService } from '../../../../app/env.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UserOrg } from 'src/app/services/userorg.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService, DisMenuService, EnvServiceProvider]
})
export class SidebarComponent implements OnInit {
  public logo: any;
  public settings: Settings;
  public userType: any;

  public menuItems: Array<any>;
  nameRole: any;
  OrgType: any;

  constructor(public appSettings: AppSettings, public menuService: MenuService, private tokenService: TokenService,
    public envService: EnvService, public config: AppGlobal, public displayService: DisMenuService, private userOrg: UserOrg) {
    this.logo = this.envService.WHEREWORKS_SIDEBAR_LOGO_PATH + this.envService.WHEREWORKS_SIDEBAR_LOGO_NAME;
    this.settings = this.appSettings.settings;
    this.userType = this.displayService.getUserType();
    this.nameRole = this.tokenService.getRoleAccessName();
    this.OrgType = this.userOrg.getOrgType();
    console.log('org_type' + this.OrgType);
    // console.log('admin check1' + this.nameRole);
    if (this.OrgType === 1) {
      this.menuItems = this.envService.verticalMenuItems;
    } else {
      this.menuItems = this.envService.verticalMenuItemsMember;
    }
  }

  ngOnInit() {
    if (sessionStorage["userMenuItems"]) {
      let ids = JSON.parse(sessionStorage.getItem("userMenuItems"));
      let newArr = [];
      ids.forEach(id => {
        let newMenuItem = this.menuItems.filter(mail => mail.id == id);
        newArr.push(newMenuItem[0]);
      });
      this.menuItems = newArr;
    }
  }

  public closeSubMenus() {
    let menu = document.querySelector("#menu0");
    for (let i = 0; i < menu.children.length; i++) {
      let child = menu.children[i].children[1];
      if (child) {
        if (child.classList.contains('show')) {
          child.classList.remove('show');
          menu.children[i].children[0].classList.add('collapsed');
        }
      }
    }
  }


}
