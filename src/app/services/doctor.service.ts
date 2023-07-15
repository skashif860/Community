import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpHandler } from '@angular/common/http';
import { AppGlobal } from '../shared/app.global';

@Injectable()
export class DoctorService {

    constructor(private http: HttpClient, private config: AppGlobal, private handler: HttpHandler) { }
    // Login
    // Register User
    addDoctor(token: any, userId: any, orgId: any, doctorName: any, doctorEmployeeId: any, doctorEmail: any, gradeId: any,
        gradeTitle: any, specialityId: any, specialityTitle: any, qualificationIds: any, doctorLandline: any, mobile1: any,
        mobile2: any) {
        // console.log("DoctorData:", token, userId, orgId, doctorName, "EmpID:", doctorEmployeeId, doctorEmail, gradeId
        //     , specialityId, qualificationIds, doctorLandline, mobile1,
        //     mobile2);
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.ADD_DOCTOR, plattype: this.config.PLATFORM_TYPE,
            org_id: orgId,
            userid: userId,
            doctor_name: doctorName,
            doctor_employee_id: doctorEmployeeId,
            doctor_email: doctorEmail,
            grade_id: gradeId,
            grade_title: gradeTitle,
            speciality_id: specialityId,
            speciality_title: specialityTitle,
            qualification_ids: qualificationIds,
            doctor_landline: doctorLandline,
            mobile_1: mobile1,
            mobile_2: mobile2
        };
        console.log('Doc_req_body:', Data);
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    updateDoctor(token: any, userId: any, orgId: any, doc_id: any, doctorName: any, doctorEmployeeId: any, doctorEmail: any,  gradeId: any,
        gradeTitle: any, specialityId: any, specialityTitle: any, qualificationIds: any, doctorLandline: any, mobile1: any,
        mobile2: any, contact_detail_id: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.UPDATE_DOCTOR,
            plattype: this.config.PLATFORM_TYPE,
            org_id: orgId,
            doctor_id: doc_id,
            userid: userId,
            doctor_name: doctorName,
            doctor_employee_id: doctorEmployeeId,
            doctor_email: doctorEmail,
            grade_id: gradeId,
            grade_title: gradeTitle,
            speciality_id: specialityId,
            speciality_title: specialityTitle,
            qualification_ids: qualificationIds,
            doctor_landline: doctorLandline,
            mobile_1: mobile1,
            mobile_2: mobile2,
            contact_detail_id: contact_detail_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    listDoctorGrading(token: any, userId: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.LIST_DOCTOR_GRADING, plattype: this.config.PLATFORM_TYPE,
            userid: userId
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    listDoctorQualifications(token: any, userId: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.LIST_DOCTOR_QUALIFICATION, plattype: this.config.PLATFORM_TYPE,
            userid: userId
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    listDoctorSpecialities(token: any, userId: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.LIST_DOCTOR_SPECIALITIES, plattype: this.config.PLATFORM_TYPE,
            userid: userId
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    listAllDoctor(token: any, userId: any, orgId: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.LIST_ALL_DOCTORS, plattype: this.config.PLATFORM_TYPE,
            userid: userId, org_id: orgId
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    listDoctorById(token: any, userId: any, doctorId: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.LIST_DOCTOR_BY_ID, plattype: this.config.PLATFORM_TYPE,
            userid: userId, doctor_id: doctorId
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    deleteDoctor(token: any, userId: any, orgId: any, doctorId: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.DELETE_DOCTOR, plattype: this.config.PLATFORM_TYPE,
            userid: userId, org_id: orgId, doctor_id: doctorId
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    deleteDoctorClinic(token: any, userId: any, loc_id: any, doctorId: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.DOC_PROC_DELETE_LOC, plattype: this.config.PLATFORM_TYPE,
            userid: userId, loc_id: loc_id, doctor_id: doctorId
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    addLocation(token: any, userId: any, org_Id: any, memid: any, clinic_detail: any, type: any,
        f_key: any, f_type: any, doctor_id: any, loc_status: any, loc_id,cityID: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const data = {
            process: this.config.DOC_PROC_SET_LOC,
            userid: userId,
            org_id: org_Id,
            member_id: memid,
            loctext: clinic_detail.loc_name2,
            locdesc: clinic_detail.address,
            lat: clinic_detail.lat,
            lon: clinic_detail.lng,
            loc_area: clinic_detail.area,
            loc_city: cityID,
            loctype: type,
            f_type: f_type,
            f_key: f_key,
            doctor_id: doctor_id,
            existing_loc: loc_status,
            loc_id: loc_id,

            plattype: this.config.PLATFORM_TYPE
        };
        console.log('loc_body:', data);
        return this.http.post(this.config.apiUrl, data, { headers: reqheader });
    }
    listDoctorClinics(token: any, userId: any, org_id: any, doctorId: any) {

        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.DOC_PROC_GET_LOC, plattype: this.config.PLATFORM_TYPE,
            userid: userId, doctor_id: doctorId, org_id: org_id
        };
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    addTiming(token: any, userId: any, org_id: any, Doctor_clinics: any) {
        console.log('service:', Doctor_clinics);
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.ADD_DOCTOR_TIMINGS, plattype: this.config.PLATFORM_TYPE,
            userid: userId, org_id: org_id, doctor_clinics: Doctor_clinics
        };
        //   console.log('service:',Data);
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    updateTiming(token: any, userId: any, org_id: any, Doctor_clinics: any, t_id: any) {
        //    console.log('service:', Doctor_clinics);
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.UPDATE_DOCTOR_TIMINGS, plattype: this.config.PLATFORM_TYPE,
            userid: userId, org_id: org_id, doctor_clinics: Doctor_clinics, timing_id: t_id
        };
        //   console.log('service:',Data);
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    deleteTiming(token: any, userId: any, org_id: any, t_id: any) {
        //   console.log('service:', Doctor_clinics);
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.DELETE_DOCTOR_TIMINGS, plattype: this.config.PLATFORM_TYPE,
            userid: userId, org_id: org_id, timing_id: t_id
        };
        //   console.log('service:',Data);
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    getDocLocationByDays(token: any, userId: any, doc_id: any, s_time: any, day_txt: any) {
        const reqheader = new HttpHeaders({ 'x-access-token': token });
        const Data = {
            process: this.config.DOC_PROC_LIST_LOCS_BY_DAY, plattype: this.config.PLATFORM_TYPE,
            userid: userId,
            doctor_id: doc_id,
            from_time: s_time,
            day: day_txt
        };
        // console.log('Service data:', Data);
        return this.http.post(this.config.apiUrl, Data, { headers: reqheader });
    }
    // getTimingById(token: any, userId: any, org_id: any, Doctor_clinics: any){

    // }
}


