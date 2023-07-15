/*_________________________________________________APP Configuration File____________________________________________
/*
    -> Contains:         Constants For API
    -> Created_by:       .
    -> Created_on:       .
    -> Contact_email:    .

*/

export class AppGlobal {
    /*  API URL */
    // live
    public readonly livepath = 'https://reliefmgmt.syntracx.com/DAL/';
    public readonly apiUrl  = this.livepath;
    // public readonly livepath = window.location.protocol + "//" + window.location.host + '/DAL/';    // local
    // public readonly apiUrl = (window.location.host == 'localhost') || (window.location.host == 'localhost:4200') ?
    //     'https://staging.where.works' + '/DAL/' : this.livepath;

    /*  PROCESSES Login And Log Out*/
    public readonly ADD_USER = 'ADD_USER';
    public readonly NEW_ACCOUNT_VERIFICATION = 'NEW_ACCOUNT_VERIFICATION';
    public readonly SET_PASSWORD = 'SET_PASSWORD';
    public readonly USER_LOGIN = 'USER_LOGIN';
    public readonly USER_LOGOUT = 'USER_LOGOUT';
    public readonly FORGET_PASSWORD = 'FORGET_PASSWORD';
    public readonly RESET_PASSWORD = 'RESET_PASSWORD';
    public readonly CHANGE_PASSWORD = 'CHANGE_PASSWORD'
    public readonly LAST_LOGGED_IN = 'LAST_LOGGED_IN';
    public readonly CHECK_SESSION_STATUS = 'CHECK_SESSION_STATUS';
    public readonly LAST_ACTIVITY_HISTORY_ON_PORTAL = 'LAST_ACTIVITY_HISTORY_ON_PORTAL';
    /*  PROCESSES Org */
    public readonly ADD_ORG = 'ADD_ORG';
    public readonly LIST_ALL_MEMBER_ORG = 'LIST_ALL_MEMBER_ORG';
    public readonly EDIT_ORG = 'EDIT_ORG';
    public readonly DELETE_ORG = 'DELETE_ORG';
    public readonly VIEW_ORG = 'VIEW_ORG';
    public readonly ALL_COUNTRIES = 'ALL_COUNTRIES';
    public readonly ALL_TIMEZONE = 'ALL_TIMEZONE';
    public readonly ALL_INDUSTRIES = 'ALL_INDUSTRIES';
    public readonly ADD_ORG_META = 'ADD_ORG_META';
    /*  PROCESSES Profile*/
    public readonly VIEW_USER_PROFILE = 'VIEW_USER_PROFILE';
    public readonly UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
    /*  PROCESSES Shifts*/
    public readonly ADD_ORG_SHIFT = 'ADD_ORG_SHIFT';
    public readonly VIEW_SHIFT = 'VIEW_SHIFT';
    public readonly VIEW_ORG_SHIFTS = 'VIEW_ORG_SHIFTS';
    public readonly UPDATE_ORG_SHIFT = 'UPDATE_ORG_SHIFT';
    public readonly DELETE_ORG_SHIFT = 'DELETE_ORG_SHIFT';
    public readonly DETACH_TEAM_SHIFT = 'DETACH_TEAM_SHIFT';
    public readonly DETACH_SHIFT = 'DETACH_SHIFT';
    public readonly TEAMS_BY_SHIFT_ID = 'TEAMS_BY_SHIFT_ID';
    public readonly MEMBERS_BY_SHIFT_ID = 'MEMBERS_BY_SHIFT_ID';
    /*  PROCESSES Shifts Breaks*/
    public readonly ADD_BREAK = 'ADD_BREAK';
    public readonly VIEW_BREAK = 'VIEW_BREAK';
    public readonly VIEW_SHIFT_BREAKS = 'VIEW_SHIFT_BREAKS';
    public readonly DELETE_BREAK = 'DELETE_BREAK';
    public readonly UPDATE_BREAK = 'UPDATE_BREAK';
    // PROCESS NAMES FOR MEMBER
    public readonly GET_MEMBERS_TREE = 'GET_MEMBERS_TREE';
    public readonly LIST_ALL_ORG_MEMBERS = 'LIST_ALL_ORG_MEMBERS';
    public readonly LIST_ORG_MEMBERS_BY_ID = 'LIST_ORG_MEMBERS_BY_ID';
    public readonly TEAMS_BY_MEMBER_ID = 'TEAMS_BY_MEMBER_ID';
    public readonly REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER';
    public readonly REMOVE_ORG_MEMBERS_BY_ID = 'REMOVE_ORG_MEMBERS_BY_ID';
    public readonly VIEW_ORG_ROLES = 'VIEW_ORG_ROLES';
    public readonly UPDATE_ORG_MEMBER = 'UPDATE_ORG_MEMBER';
    public readonly SEND_INVITATION = 'SEND_INVITATION';
    public readonly ACCEPT_INVITATION = 'ACCEPT_INVITATION';
    public readonly REJECT_INVITATION = 'REJECT_INVITATION';
    public readonly RESEND_INVITATION = 'RESEND_INVITATION';
    public readonly ADD_INVITED_SUBSCRIBER = 'ADD_INVITED_SUBSCRIBER';
    public readonly LIST_MEM_INVITATIONS = 'LIST_MEM_INVITATIONS';
    public readonly CONTACT_PROC_LIST_PENDING = 'CONTACT_PROC_LIST_PENDING';
    public readonly CONTACT_PROC_LIST_ALL = 'CONTACT_PROC_LIST_ALL';
    public readonly CONTACT_PROC_APPROVE = 'CONTACT_PROC_APPROVE';
    public readonly CONTACT_PROC_DELETE = 'CONTACT_PROC_DELETE';
    public readonly CONTACT_PROC_REJECT = 'CONTACT_PROC_REJECT';
    public readonly CONTACT_PROC_LIST = 'CONTACT_PROC_LIST';
    public readonly CONTACT_PROC_INVITE = 'CONTACT_PROC_INVITE';
    public readonly CONTACT_PROC_BY_CONTACT_ID = 'CONTACT_PROC_BY_CONTACT_ID';

    // public readonly ACCEPT_INVITATION = 'ACCEPT_INVITATION';

    // ----------------------------------
    // PROCESS NAMES FOR TEAMS
    public readonly VIEW_ALL_TEAMS = 'VIEW_ORG_TEAMS';
    public readonly UPDATE_TEAM = 'UPDATE_TEAM';
    public readonly DELETE_TEAM = 'DELETE_TEAM';
    public readonly VIEW_TEAM_MEMBERS = 'VIEW_TEAM_MEMBERS';
    public readonly VIEW_TEAM = 'VIEW_TEAM';
    public readonly VIEW_VISIT_BY_MEMBER_ID = 'VIEW_VISIT_BY_MEMBER_ID';
    public readonly ADD_TEAM = 'ADD_TEAM';
    public readonly ADD_TEAM_MEMBER = 'ADD_TEAM_MEMBER';
    public readonly APPLY_SHIFT = 'APPLY_SHIFT';
    public readonly VIEW_APPLIED_SHIFT = 'VIEW_APPLIED_SHIFT';
    public readonly VIEW_CHILD_TEAMS = 'VIEW_CHILD_TEAMS';
    public readonly UPDATE_TEAM_MEMBER_ROLE = 'UPDATE_TEAM_MEMBER_ROLE';
    public readonly VIEW_TEAMS_TREE_LISTING = 'VIEW_TEAMS_TREE_LISTING';
    // ----------------------------------
    // PROCESS NAMES FOR DASHBOARD TEAM LOCATIONS
    public readonly UL_PROC_GET_LAST_LOC_BY_TEAMID = 'UL_PROC_GET_LAST_LOC_BY_TEAMID';
    public readonly VIEW_ORG_TEAMS = 'VIEW_ORG_TEAMS';
    public readonly GET_USER_CURRENT_TIME = 'GET_USER_CURRENT_TIME';
    public readonly ALL_TEAM_MEMBERS = 'ALL_TEAM_MEMBERS';
    public readonly UL_PROC_GET_LAST_LOC_BY_ORGID = 'UL_PROC_GET_LAST_LOC_BY_ORGID';
    // ------------------------------------------

    // PROCESS NAMES FOR Locaton
    public readonly GET_MEMBER_BY_SUB_ID = 'GET_MEMBER_BY_SUB_ID';
    public readonly LOC_PROC_SET_LOC_BY_MEMID = 'LOC_PROC_SET_LOC_BY_MEMID';
    public readonly LOC_PROC_GET_LOC_BY_ORGID = 'LOC_PROC_GET_LOC_BY_ORGID';
    public readonly LOC_PROC_DELETE_LOC_BY_LOCID = 'LOC_PROC_DELETE_LOC_BY_LOCID';
    public readonly LOC_PROC_GET_LOC_BY_LOCID = 'LOC_PROC_GET_LOC_BY_LOCID';
    public readonly LOC_PROC_UPDATE_LOC_BY_LOCID = 'LOC_PROC_UPDATE_LOC_BY_LOCID';
    public readonly GET_USER_CURRENT_LOCATION = 'GET_USER_CURRENT_LOCATION';
    public readonly LIST_ALL_CITIES = 'LIST_ALL_CITIES'


    // PROCESS NAMES FOR Notification
    public readonly NOTIFICATION_PROC_LIST = 'NOTIFICATION_PROC_LIST';
    public readonly FIREBASE_PROC_GET_CUSTOM_TOKEN = 'FIREBASE_PROC_GET_CUSTOM_TOKEN';
    public readonly NOTIFICATION_PROC_UPDATE = 'NOTIFICATION_PROC_UPDATE';
    // ------------------------------------------

    // PROCESS NAMES FOR Attendance
    public readonly GET_ACTIVE_STATS = 'GET_ACTIVE_STATS';
    public readonly GET_EVENTS_COUNTS = 'GET_EVENTS_COUNTS';
    public readonly VIEW_ORG_ATTENDANCE_LOG = 'VIEW_ORG_ATTENDANCE_LOG';
    public readonly GET_EVENTS_DETAILS = 'GET_EVENTS_DETAILS';

    // PROCESS NAMES FOR Client/Vendor
    public readonly ADD_CLIENT_VENDOR = 'ADD_CLIENT_VENDOR';
    public readonly UPDATE_CLIENT_VENDOR = 'UPDATE_CLIENT_VENDOR';
    public readonly LIST_ALL_CV_ORG = 'LIST_ALL_CV_ORG';
    public readonly DELETE_CLIENT_VENDOR = 'DELETE_CLIENT_VENDOR';
    public readonly LIST_CV_BY_ID = 'LIST_CV_BY_ID';

    // PROCESS SOCIAL LOGIN AND SIGNUP
    public readonly SOCIAL_SIGNUP = 'SOCIAL_SIGNUP';
    public readonly SOCIAL_LOGIN = 'SOCIAL_LOGIN';
    public readonly MOBILE_ACCOUNT_VERIFICATION = 'MOBILE_ACCOUNT_VERIFICATION';

    // PROCESS ROUTES
    public readonly UL_PROC_GET_ROUTE_VIEW = 'UL_PROC_GET_ROUTE_VIEW';

    // PROCESS REPORT
    public readonly GET_MEMBER_ATTENDANCE_REPORT = 'GET_MEMBER_ATTENDANCE_REPORT';
    public readonly GET_MEMBER_ATTENDANCE_REPORT_NEW = 'GET_MEMBER_ATTENDANCE_REPORT_NEW';
    public readonly GET_TEAM_ATTENDANCE_REPORT = 'GET_TEAM_ATTENDANCE_REPORT';
    public readonly SITUATION_REPORT_LIST = 'SITUATION_REPORT_LIST';
    public readonly GET_ORG_META = 'GET_ORG_META';

    // PROCESS ROLES
    public readonly GET_MEMBER_MODULE_ACCESS = 'GET_MEMBER_MODULE_ACCESS';
    // PROCESS DOCTOR
    public readonly ADD_DOCTOR = 'ADD_DOCTOR';
    public readonly UPDATE_DOCTOR = 'UPDATE_DOCTOR';
    public readonly LIST_DOCTOR_GRADING = 'LIST_DOCTOR_GRADING';
    public readonly LIST_DOCTOR_QUALIFICATION = 'LIST_DOCTOR_QUALIFICATION';
    public readonly LIST_DOCTOR_SPECIALITIES = 'LIST_DOCTOR_SPECIALITIES';
    public readonly LIST_ALL_DOCTORS = 'LIST_ALL_DOCTORS';
    public readonly LIST_DOCTOR_BY_ID = 'LIST_DOCTOR_BY_ID';
    public readonly DELETE_DOCTOR = 'DELETE_DOCTOR';
    public readonly DOC_PROC_DELETE_LOC = 'DOC_PROC_DELETE_LOC';
    public readonly DOC_PROC_SET_LOC = 'DOC_PROC_SET_LOC';
    public readonly DOC_PROC_GET_LOC = 'DOC_PROC_GET_LOC';
    public readonly ADD_DOCTOR_TIMINGS = 'ADD_DOCTOR_TIMINGS';
    public readonly UPDATE_DOCTOR_TIMINGS = 'UPDATE_DOCTOR_TIMINGS';
    public readonly DELETE_DOCTOR_TIMINGS = 'DELETE_DOCTOR_TIMINGS';
    public readonly DOC_PROC_LIST_LOCS_BY_DAY = 'DOC_PROC_LIST_LOCS_BY_DAY';
    // PROCESS DISTRIBUTOR
    public readonly DISTRIBUTOR_PROC_ADD = 'DISTRIBUTOR_PROC_ADD';
    public readonly DISTRIBUTOR_PROC_LIST = 'DISTRIBUTOR_PROC_LIST';
    public readonly DISTRIBUTOR_PROC_LIST_BY_ID = 'DISTRIBUTOR_PROC_LIST_BY_ID';
    public readonly DISTRIBUTOR_PROC_DELETE = 'DISTRIBUTOR_PROC_DELETE';
    public readonly DISTRIBUTOR_PROC_UPDATE = 'DISTRIBUTOR_PROC_UPDATE';
    public readonly LOC_PROC_GET_LOCS_BY_FTYPE = 'LOC_PROC_GET_LOCS_BY_FTYPE';
    // PROCESS VISIT
    public readonly ADD_VISIT = 'ADD_VISIT';
    public readonly ADD_AGENDA = 'ADD_AGENDA';
    public readonly GET_VISIT_DETAILS_BY_ID = 'GET_VISIT_DETAILS_BY_ID';
    public readonly UPDATE_SCHEDULE = 'UPDATE_SCHEDULE';
    public readonly UPDATE_AGENDA = 'UPDATE_AGENDA';
    public readonly DELETE_AGENDA = 'DELETE_AGENDA';
    public readonly UPDATE_ATTENDEE = 'UPDATE_ATTENDEE';
    public readonly DELETE_ATTENDEES = 'DELETE_ATTENDEES';
    public readonly ADD_ATTENDEES = 'ADD_ATTENDEES';
    public readonly UPDATE_VISIT_DOCTOR_LOC = 'UPDATE_VISIT_DOCTOR_LOC';
    public readonly VIEW_ALL_ORGANIZATION_VISIT = 'VIEW_ALL_ORGANIZATION_VISIT'
    public readonly DELETE_VISIT = 'DELETE_VISIT';
    public readonly ADD_NOTE = 'ADD_NOTE';
    /* PLATEFORM TYPE */
    public readonly PLATFORM_TYPE = 1;

    /* STATUS CODES */
    public readonly SUCCESS_CODE = 1;

    /* USER TYPE */
    public readonly ADMIN = 1;
    public readonly SUBS = 0;

    // MODULE ID
    public readonly ORGANIZATION_MODULE_ID = '1';
    public readonly PEOPLE_MODULE_ID = '2';
    public readonly DASHBOARD_MODULE_ID = '3';
    public readonly TEAMS_MODULE_ID = '4';
    public readonly SHIFT_MODULE_ID = '5';
    public readonly REPORTS_MODULE_ID = '6';
    public readonly PACKAGES_MODULE_ID = '7';
    public readonly CLIENT_VENDOR_MODULE_ID = '8';
    public readonly PLACES_MODULE_ID = '9';
    public readonly SITREP_MODULE_ID = '10';
    public readonly TEAM_VIEW_MODULE_ID = '11';
    public readonly ROUTES_VIEW_MODULE_ID = '12';

    /* IMAGE URL */
    public readonly CALENDAR = 'assets/img/custom/Calendar.jpg'
    public readonly GOOGLE_LOGO = ' assets/img/custom/google-icon.jpg'
    public readonly LOGO = 'assets/img/logo/logo.png';
    public readonly ICON1 = 'assets/img/app/icon1.jpg';
    public readonly ICON2 = 'assets/img/app/icon2.jpg';
    public readonly ICON3 = 'assets/img/app/icon3.jpg';
    public readonly ICON4 = 'assets/img/app/icon4.jpg';
    public readonly ICON5 = 'assets/img/app/icon5.jpg';
    public readonly ICON6 = 'assets/img/app/icon6.jpg';
    public readonly LOGIN_LOGO = 'assets/brand-logo-white.png';
    public readonly IMAGE_NO_ATTACHMENT = 'assets/img/app/noimage1.jpg';
    public readonly SMALL_LOGO = 'assets/img/logo/small_logo.jpg';
    public readonly EDIT_ICON = 'assets/img/custom/edit-icon.png';
    public readonly REPORT_ICON = 'assets/img/custom/report-icon.png';
    public readonly MARKER = 'assets/img/logo/red.png';
    public readonly LOC_MAKER1 = 'assets/img/PIN/dark-blue.png';
    public readonly LOC_MAKER2 = 'assets/img/PIN/blue.png';
    public readonly LOC_MAKER3 = 'assets/img/PIN/green.png';
    public readonly LOC_MAKER4 = 'assets/img/PIN/red.png';
    public readonly LOC_MAKER5 = 'assets/img/PIN/orange.png';
    public readonly LOC_YELLOW_PIN = 'assets/img/logo/yellow.png';
    public readonly LOC_RED_PIN = 'assets/img/logo/red.png';
    public readonly LOC_GREEN_PIN = 'assets/img/logo/green.png';
    public readonly LOC_PIN = 'assets/img/PIN/red-pin.png';
    public readonly MAP_ICON = 'assets/img/custom/map-icon.png';
    public readonly CAM_ICON = 'assets/img/custom/camera.png';
    public readonly MEM_ICON = 'assets/img/location/mem2.png';
    public readonly BUILDING = 'assets/img/custom/building.png';
    public readonly CAM_FEED = 'assets/img/custom/camera_feed.gif';


    // Doctor PINS
    public readonly MON_PIN = 'assets/img/PIN/Mon.png';
    public readonly TUES_PIN = 'assets/img/PIN/Tues.png';
    public readonly WED_PIN = 'assets/img/PIN/Wed.png';
    public readonly THURS_PIN = 'assets/img/PIN/Thurs.png';
    public readonly FRI_PIN = 'assets/img/PIN/Fri.png';
    public readonly SAT_PIN = 'assets/img/PIN/Sat.png';
    public readonly UPLOAD_ICON = 'assets/img/PIN/add-bulk.png';

    // PRODUCT 
    public readonly INV_PRODUCT_ADD = 'INV_PRODUCT_ADD';
    public readonly INV_PRODUCT_LIST = 'INV_PRODUCT_LIST';
    public readonly INV_PRODUCT_DELETE = 'INV_PRODUCT_DELETE';
    public readonly INV_CATEGORY_UPDATE = 'INV_CATEGORY_UPDATE';
    public readonly INV_PRODUCT_UPDATE = 'INV_PRODUCT_UPDATE';
    public readonly INV_CATEGORY_ADD = 'INV_CATEGORY_ADD';
    public readonly INV_CATEGORY_LIST = 'INV_CATEGORY_LIST';
    public readonly INV_CATEGORY_DELETE = 'INV_CATEGORY_DELETE';
    public readonly INV_UOM_LIST = 'INV_UOM_LIST';
    // Pachage
    public readonly INV_PACKAGING_ADD = 'INV_PACKAGING_ADD';
    public readonly INV_PACKAGING_LIST = 'INV_PACKAGING_LIST';
    public readonly INV_PACKAGING_UPDATE = 'INV_PACKAGING_UPDATE';
    public readonly INV_PACKAGING_DELETE = 'INV_PACKAGING_DELETE';
    //BATCH
    public readonly INV_BATCH_ADD = 'INV_BATCH_ADD';
    public readonly INV_BATCH_LIST = 'INV_BATCH_LIST';
    public readonly INV_BATCH_UPDATE = 'INV_BATCH_UPDATE';
    public readonly INV_BATCH_DELETE = 'INV_BATCH_DELETE';
    // Stock
    public readonly INV_STOCK_MOVEMENT_ADD = 'INV_STOCK_MOVEMENT_ADD';
    public readonly INV_STOCK_MOVEMENT_LIST = 'INV_STOCK_MOVEMENT_LIST';
    public readonly INV_STOCK_MOVEMENT_DELETE = 'INV_STOCK_MOVEMENT_DELETE';
    // Meta
    public readonly INV_META_ADD = 'INV_META_ADD';
    public readonly INV_META_LIST = 'INV_META_LIST';
    public readonly INV_META_UPDATE = 'INV_META_UPDATE';
    public readonly INV_META_DELETE = 'INV_META_DELETE';
    public readonly ADD_LU_META = 'ADD_LU_META';
    public readonly ALL_LU_META = 'ALL_LU_META';
    // Media 
    public readonly INV_MEDIA_ADD = 'INV_MEDIA_ADD';
    public readonly INV_MEDIA_LIST = 'INV_MEDIA_LIST';
    public readonly INV_MEDIA_DELETE = 'INV_MEDIA_DELETE';

    //Chat
    public readonly UPLOAD_FIREBASE_MEDIA = 'UPLOAD_FIREBASE_MEDIA';

    //default
    public readonly DEFAULT_USER = 'assets/img/users/default-user.jpg';
    public readonly DUMMY_USER = 'assets/img/profile/dummy.png';
    public readonly PLACEHOLDER_IMAGE = 'assets/img/custom/placeholder-image.jpg';

    //	Modules for Metas
    public readonly MODULEID_ORGANIZATION = 1;
    public readonly MODULEID_MEMBER = 2;
    public readonly MODULEID_DASHBOARD = 3;
    public readonly MODULEID_TEAM = 4;
    public readonly MODULEID_POLICY = 5;
    public readonly MODULEID_REPORTS = 6;
    public readonly MODULEID_PACKAGES = 7;
    public readonly MODULEID_CLIENT_VENDOR = 8;
    public readonly MODULEID_PLACES = 9;
    public readonly MODULEID_SITREP = 10;
    public readonly MODULEID_TEAM_VIEW = 11;
    public readonly MODULEID_ROUTE_VIEW = 12;
    public readonly MODULEID_INVENTORY = 13;
    // packages 
    public readonly ADD_PACKAGE = 'ADD_PACKAGE';
    public readonly UPDATE_PACKAGE = 'UPDATE_PACKAGE';
    public readonly LIST_ITEMS = 'LIST_ITEMS';
    public readonly LIST_PACKAGES = 'LIST_PACKAGES';
    public readonly DELETE_PACKAGE = 'DELETE_PACKAGE';
    public readonly LIST_TRANSACTIONS = 'LIST_TRANSACTIONS';
    public readonly LIST_PACKAGES_FOR_NGO = 'LIST_PACKAGES_FOR_NGO'
}
