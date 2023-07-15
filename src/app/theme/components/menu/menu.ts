import { Menu } from './menu.model';

export const verticalMenuItems = [
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
  // new Menu (15, 'Surveillance', 'views/surveillance', null, 'video-camera', null, false , 0),
];

export const verticalMenuItemsMember = [
  //  new Menu (2, 'Organizations', '/views/organization/view', null, 'building', null, false, 0),
  new Menu(5, 'People', '/views/people/view', null, 'user', null, false, 0),
  // new Menu (12, 'Invitations', '/views/invitations', null, 'envelope-open-o', null, false, 0),
  new Menu(6, 'Teams', '/views/team/list', null, 'group', null, false, 0),
  new Menu(10, 'Places', '/views/location', null, 'map-marker', null, false, 0),
 // new Menu(11, 'Team View on Map', 'views/viewteam', null, 'globe', null, false, 0),
  new Menu(12, 'Reports', 'views/reports', null, 'th-list', null, false, 0),
  
  new Menu(14, 'Situational Reporting', 'views/sitrap', null, 'envelope', null, false, 0),
  // new Menu (15, 'Surveillance', 'views/surveillance', null, 'video-camera', null, false , 0),
];


export const subsMenuItems = [
  new Menu(1, 'Dashboard', '/', null, 'tachometer', null, false, 0),
  new Menu(2, 'Organization', null, null, 'tachometer', null, true, 0),
  new Menu(3, 'Add Organization', '/views/organization/add', null, 'tachometer', null, false, 2),
  new Menu(4, 'View Organization', '/views/organization/view', null, 'tachometer', null, false, 2),

];

export const horizontalMenuItems = [
  new Menu(1, 'Dashboard', 'views/dashboard', null, 'dashboard', null, false, 0),
  //  new Menu (2, 'Organizations', '/views/organization/view', null, 'building', null, false, 0),
  new Menu(5, 'People', '/views/member/view', null, 'user', null, false, 0),
  new Menu(7, 'Client/Vendor', '/views/client-vendor/view', null, 'user', null, false, 0),
  //  new Menu (12, 'Invitations', '/views/invitations', null, 'envelope-open-o', null, false, 0),
  new Menu(6, 'Teams', '/views/team/list', null, 'group', null, false, 0),
  new Menu(9, 'Shifts', '/views/shifts/list', null, 'file-o', null, false, 0),
  new Menu(10, 'Places', '/views/location', null, 'map-marker', null, false, 0),
  new Menu(11, 'Team View on Map', 'views/viewteam', null, 'globe', null, false, 0),
  new Menu(12, 'Reports', 'views/reports', null, 'th-list', null, false, 0),
  new Menu(13, 'Route View on Map', 'views/routes', null, 'road', null, false, 0),
  new Menu(14, 'Situational Reporting', 'views/sitrap', null, 'envelope', null, false, 0),
  new Menu(15, 'Geofence', 'views/geofence', null, 'map-marker', null, false, 0),
  new Menu(16, 'Doctor', 'views/doctor', null, 'user-md', null, false, 0),
  new Menu(17, 'Distributor', 'views/distributor', null, 'industry', null, false, 0),
  // new Menu (15, 'Surveillance', 'views/surveillance', null, 'video-camera', null, false , 0),
];

export const horizontalMenuItems1Member = [
  //  new Menu (2, 'Organizations', '/views/organization/view', null, 'building', null, false, 0),
  new Menu(5, 'People', '/views/member/view', null, 'user', null, false, 0),
  new Menu(7, 'Client/Vendor', '/views/client-vendor/view', null, 'user', null, false, 0),
  //  new Menu (12, 'Invitations', '/views/invitations', null, 'envelope-open-o', null, false, 0),
  new Menu(6, 'Teams', '/views/team/list', null, 'group', null, false, 0),

  new Menu(10, 'Places', '/views/location', null, 'map-marker', null, false, 0),
  new Menu(11, 'Team View on Map', 'views/viewteam', null, 'globe', null, false, 0),
  new Menu(12, 'Reports', 'views/reports', null, 'th-list', null, false, 0),
  // new Menu (15, 'Surveillance', 'views/surveillance', null, 'video-camera', null, false , 0),
];