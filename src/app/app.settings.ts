import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';
import { EnvService } from './env.service';

@Injectable()

export class AppSettings {
    public  APP_NAME;
    public settings;
    constructor(private envService: EnvService){
     this.APP_NAME = this.envService.APP_NAME;
     this.settings = new Settings(
        this.APP_NAME,
        '',
        {
            menu: 'vertical', //horizontal , vertical
            menuType: 'default', //default, compact, mini
            showMenu: true,
            navbarIsFixed: true,
            footerIsFixed: false,
            sidebarIsFixed: true,
            showSideChat: false,
            sideChatIsHoverable: true,
            skin:'light'  //light , combined, blue, green, dark, purple, orange, brown, grey, pink          
        }
    );
    }
}