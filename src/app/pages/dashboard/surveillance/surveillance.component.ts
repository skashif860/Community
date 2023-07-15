import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppGlobal } from '../../../../app/shared/app.global';

@Component({
  selector: 'app-surveillance',
  templateUrl: './surveillance.component.html',
  styleUrls: ['./surveillance.component.scss'],

})
export class SurveillanceComponent implements OnInit {
  public modalRef: NgbModalRef;
  public cam_icon;
  public cam_feed;
  public installedAt;
  public cam_id;
  camera_locs = [
    {
      name: 'HBL',
      cam_locs: [
        {
          ID: 32421,
          lat: 33.681218,
          lon: 73.154745,
          installedAt: 'HBL'
        },
        {
          ID: 32422,
          lat: 33.681082,
          lon: 73.154771,
          installedAt: 'HBL'
        },
        {
          ID: 32423,
          lat: 33.68114,
          lon: 73.154638,
          installedAt: 'HBL'
        }
      ]
    },
    {
      name: 'MCB',
      cam_locs: [
        {
          ID: 32431,
          lat: 33.706724,
          lon: 73.087299,
          installedAt: 'MCB'
        },
        {
          ID: 32432,
          lat: 33.706282,
          lon: 73.085435,
          installedAt: 'MCB'
        },
        {
          ID: 32433,
          lat: 33.707071,
          lon: 73.087171,
          installedAt: 'MCB'
        },
        {
          ID: 32434,
          lat: 33.705881,
          lon: 73.085788,
          installedAt: 'MCB'
        },
      ]
    },
    {
      name: 'Soneri',
      cam_locs: [
        {
          ID: 32441,
          lat: 33.712466,
          lon: 73.061784,
          installedAt: 'Soneri'
        },
        {
          ID: 32442,
          lat: 33.712552,
          lon: 73.0619,
          installedAt: 'Soneri'
        },
        {
          ID: 32443,
          lat: 33.71248,
          lon: 73.061908,
          installedAt: 'Soneri'
        },
        {
          ID: 32444,
          lat: 33.712477,
          lon: 73.06183,
          installedAt: 'Soneri'
        },
      ]
    },
    {
      name: 'Standard Chartered',
      cam_locs: [
        {
          ID: 32451,
          lat: 33.688108,
          lon: 73.033381,
          installedAt: 'Standard Chartered'
        },
        {
          ID: 32452,
          lat: 33.688259,
          lon: 73.033544,
          installedAt: 'Standard Chartered'
        },
        {
          ID: 32453,
          lat: 33.688305,
          lon: 73.033226,
          installedAt: 'Standard Chartered'
        },
        {
          ID: 32454,
          lat: 33.688475,
          lon: 73.033427,
          installedAt: 'Standard Chartered'
        },
      ]
    }
  ];
  constructor(private modalService: NgbModal, private appCofig: AppGlobal) {
    this.cam_icon = this.appCofig.CAM_ICON;
    this.cam_feed = this.appCofig.CAM_FEED;
  }

  ngOnInit() {
    console.log(this.camera_locs);
  }

  openModal(content, istalledAt, ID) {
    this.modalRef = this.modalService.open(content, { centered: true });
    this.cam_id = ID;
    this.installedAt = istalledAt;
    console.log(this.cam_id, this.installedAt);
  }
  // Close Modal
  close() {
    this.modalRef.close();
  }

}
