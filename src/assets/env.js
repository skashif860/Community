function Menu(id, title, routerLink, href, icon, target, hasSubMenu, parentId) {
  this.id = id;
  this.title = title;
  this.routerLink = routerLink;
  this.href = href;
  this.icon = icon;
  this.target = target;
  this.title = title;
  this.hasSubMenu = hasSubMenu;
  this.parentId = parentId;
  this.fullname = function () {
    return (this.firstname + " " + this.lastname);
  };
}

(function (window) {
  window.__env = window.__env || {};

  // API url
window.__env.APP_NAME = 'RescueMGM';
  // window.__env.APP_NAME = 'PHARMA';
  window.__env.WHEREWORKS_SIDEBAR_LOGO_PATH = 'assets/logo/';
  window.__env.WHEREWORKS_SIDEBAR_LOGO_NAME = 'sidebar-logo.png';
  window.__env.WHEREWORKS_LOGO_PATH = 'assets/img/logo/';
  window.__env.WHEREWORKS_LOGO_NAME = 'logo-big.png';
  window.__env.WHEREWORKS_HOST_URL = 'localhost:4200';
  window.__env.WHEREWORKS_LANDING_PAGE_LOGO_NAME = 'sidebar-logo.png';
  window.__env.WHEREWORKS_LANDING_PAGE_LOGO_PATH = 'assets/logo/';
  window.__env.verticalMenuItems = [
    new Menu(1, 'Dashboard', 'views/dashboard', null, 'dashboard', null, false, 0),
    new Menu (2, 'Organizations', '/views/organization/view', null, 'building', null, false, 0),
    new Menu(5, 'People', '/views/people/view', null, 'user', null, false, 0),
    new Menu(6, 'Teams', '/views/team/list', null, 'group', null, false, 0),
    new Menu (3, 'Packages', '/views/package', null, 'shopping-bag', null, false, 0),
    new Menu (4, 'Report', '/views/report', null, 'th-list', null, false, 0),
    
  ];
 
  window.__env.horizontalMenuItems = [
    new Menu(1, 'Dashboard', 'views/dashboard', null, 'dashboard', null, false, 0),
    //  new Menu (2, 'Organizations', '/views/organization/view', null, 'building', null, false, 0),
    new Menu(5, 'People', '/views/people/view', null, 'user', null, false, 0),
    new Menu(7, 'Client/Vendor', '/views/client-vendor/view', null, 'user', null, false, 0),
    // new Menu (12, 'Invitations', '/views/invitations', null, 'envelope-open-o', null, false, 0),
    new Menu(6, 'Teams', '/views/team/list', null, 'group', null, false, 0),
    new Menu(9, 'Shifts', '/views/shifts/list', null, 'clock-o', null, false, 0),
    new Menu(10, 'Places', '/views/location', null, 'map-marker', null, false, 0),
    new Menu(11, 'Team View on Map', 'views/viewteam', null, 'globe', null, false, 0),
    new Menu(12, 'Reports', 'views/reports', null, 'th-list', null, false, 0),
    new Menu(13, 'Route View on Map', 'views/routes', null, 'road', null, false, 0),
    new Menu(14, 'Situational Reporting', 'views/sitrap', null, 'envelope', null, false, 0),
    new Menu(15, 'Geofence', 'views/geofence', null, 'map-marker', null, false, 0),
    new Menu(16, 'Doctor', 'views/doctor', null, 'user-md', null, false, 0),
    new Menu(17, 'Distributor', 'views/distributor', null, 'industry', null, false, 0),
    new Menu(18, 'Visits', 'views/visit', null, 'industry', null, false, 0),
    new Menu(19, 'Inventory', 'views/inventory', null, 'industry', null, false, 0),
    new Menu(20, 'Product', 'views/product', null, 'industry', null, false, 0),
  ];
  window.__env.verticalMenuItemsMember = [
    new Menu(1, 'Dashboard', 'views/dashboard', null, 'dashboard', null, false, 0),
    new Menu (2, 'Organizations', '/views/organization/view', null, 'building', null, false, 0),
    new Menu(5, 'People', '/views/people/view', null, 'user', null, false, 0),
    new Menu(6, 'Teams', '/views/team/list', null, 'group', null, false, 0),
    new Menu (3, 'Items', '/views/item', null, 'shopping-bag', null, false, 0),
    new Menu (4, 'Report', '/views/report', null, 'th-list', null, false, 0),
   
  ];
  window.__env.horizontalMenuItemsMember = [
    new Menu(5, 'People', '/views/people/view', null, 'user', null, false, 0),
    new Menu(6, 'Teams', '/views/team/list', null, 'group', null, false, 0),
    new Menu(10, 'Places', '/views/location', null, 'map-marker', null, false, 0),
    new Menu(12, 'Reports', 'views/reports', null, 'th-list', null, false, 0),
    new Menu(14, 'Situational Reporting', 'views/sitrap', null, 'envelope', null, false, 0),
    new Menu(18, 'Visits', 'views/visit', null, 'industry', null, false, 0),
    //  new Menu(19, 'Inventory', 'views/inventory', null, 'industry', null, false, 0),
    //  new Menu(20, 'Product', 'views/product', null, 'industry', null, false, 0),
  ];

  // Whether or not to enable debug mode
  // Setting this to false will disable console output

}(this));