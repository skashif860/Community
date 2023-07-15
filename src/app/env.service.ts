
export class EnvService {

    // The values that are defined here are the default values that can
    // be overridden by env.js

    public APP_NAME = '';
    public WHEREWORKS_SIDEBAR_LOGO_PATH = '';
    public WHEREWORKS_SIDEBAR_LOGO_NAME = '';
    public WHEREWORKS_LOGO_PATH = '';
    public WHEREWORKS_LOGO_NAME = '';
    public WHEREWORKS_HOST_URL = '';
    public WHEREWORKS_LOGIN_LOGO_PATH = '';
    public WHEREWORKS_LOGIN_LOGO_NAME = '';
    public WHEREWORKS_LANDING_PAGE_LOGO_NAME = '';
    public WHEREWORKS_LANDING_PAGE_LOGO_PATH = '';

    /*_______________________Menu Items_______________________*/

    // WhereWorks_Menu
    public verticalMenuItems = [];
    // Horizontal_Menu
    public horizontalMenuItems = [];
    // Member_Vertical_Menu
    public verticalMenuItemsMember = [];
    // Whether or not to enable debug mode
    public enableDebug = true;

    constructor() {
    }
}
