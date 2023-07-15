import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from './../../services/member.service';
@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  public modalRef: NgbModalRef;
  public inviteVeriCode: any;

  public data: any = {
    Uname: '',
    Fname: '',
    ConfirmPass: '',
    NewPass: ''
  };

  ngOnInit() {
  }
  constructor(private modalService: NgbModal, router: Router, private memberService: MemberService,
    private route: ActivatedRoute, private toastr: ToastrService) {
    this.inviteVeriCode = this.route.snapshot.params['param1'];
  }
  // Add Subscriber Invitation
  onSubmit() {
    this.memberService.addInviteSubscriber(this.inviteVeriCode, this.data.Uname, this.data.Fname,
      this.data.NewPass,  this.data.ConfirmPass).subscribe((data: any) => {
      if (data.rescode === 1) {
        this.toastr.success(data.message, 'Success');
      } else {
        this.toastr.error(data.message, 'Alert');
      }
    });
  }
}
