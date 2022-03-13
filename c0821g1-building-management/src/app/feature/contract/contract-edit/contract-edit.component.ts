import {Component, Inject, OnInit} from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ContractService} from '../../../service/contract/contract.service';
import {SpaceService} from '../../../service/space/space.service';
import {EmployeeService} from '../../../service/employee/employee.service';
import {CustomerService} from '../../../service/customer/customer.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import Swal from 'sweetalert2';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

import {Contract} from '../../../model/contract/contract';
import {Employee} from '../../../model/employee/employee';
import {Spaces} from '../../../model/space/spaces';
import {Customer} from '../../../model/customer/customer';


@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.css']
})
export class ContractEditComponent implements OnInit {

  contractForm: FormGroup;
  spaces: Spaces[];
  employees: Employee[];
  customers: Customer[];
  id: number;
  dateStart: string;
  dateEnd: string;
  checkCode: boolean;
  private selectedImage: any;
  loading = false;
  contract: Contract;
  checkDate: boolean;

  constructor(private fb: FormBuilder,
              private contractService: ContractService,
              private spaceService: SpaceService,
              private employeeService: EmployeeService,
              private customerService: CustomerService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private datepipe: DatePipe,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.checkCode = false;

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getContract(this.id);
    });

    this.customerService.getAllCustomer().subscribe(data => {
      this.customers = data;
    });

    // this.spaces = spaceService.spaces;
    // this.employees = employeeService.employees;
    // this.customers = customerService.customers;
  }

  getContract(id: number) {
    return this.contractService.getContractById(id).subscribe(contract => {
      this.dateStart = this.datepipe.transform(contract.contractDateStart, 'yyyy-MM-dd');
      this.dateEnd = this.datepipe.transform(contract.contractDateEnd, 'yyyy-MM-dd');

      // @ts-ignore
      const date1 = new Date(contract.contractDateStart);
      // @ts-ignore
      const date2 = new Date(contract.contractDateEnd);
      const month = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24 * 30);
      // @ts-ignore
      // contract.contractExpired = Math.round(month);
      // console.log('Expired' + contract.contractExpired);

      console.log('Image' + contract.contractImageUrl);

      this.contractForm = this.fb.group({
        contractId: contract.contractId,
        contractCode: [contract.contractCode, [Validators.required, Validators.pattern('^[H][D]-[\\d]{4}$')]],
        contractExpired: [contract.contractExpired, [Validators.required]],
        contractDateStart: [this.dateStart, [Validators.required]],
        contractDateEnd: [this.dateEnd, [Validators.required]],
        // price: [contract.price, [Validators.required]],
        contractTotal: [contract.contractTotal, [Validators.required]],
        contractContent: [contract.contractContent, [Validators.required, Validators.minLength(10)]],
        contractDeleteFlag: contract.contractDeleteFlag,
        contractImageUrl: new FormControl(contract.contractImageUrl),
        employeeId: 1,
        contractDeposit: [contract.contractDeposit, [Validators.required]],
        // contractTaxCode: [contract.contractTaxCode, [Validators.required]],
        // customerId: [contract.customerId, [Validators.required]],
        spaceId: [1, [Validators.required]],
        checkFlag: 0
      });
    });
  }

  ngOnInit(): void {
  }

  get contractImageUrl() {
    return this.contractForm.get('contractImageUrl');
  }

  updateContract(id: number) {
    const contract = this.contractForm.value;
    console.log(id);
    this.contractService.updateContract(id, contract).subscribe(() => {
      this.callToast();
      this.router.navigate(['contract/list']);
    }, e => {
      console.log(e);
      this.checkCode = true;
    });
  }

  cancel() {
    this.callToast1();
    this.router.navigate(['contract/list']);
  }

  private callToast1() {
    Swal.fire({
      position: 'top',
      icon: 'warning',
      title: 'Thay đổi chưa được lưu !',
      showConfirmButton: true,
      timer: 2000
    });
  }

  private callToast() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Chỉnh sửa thành công',
      showConfirmButton: false,
      timer: 2000
    });
  }


  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const nameImg = this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.loading = true;
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.contractForm.patchValue({contractImageUrl: url});
          this.contract.contractImageUrl = url;
          this.loading = false;
        });
      })
    ).subscribe();
  }


  checkDate1(date1, date2) {
    this.contractService.checkDate(date1, date2).subscribe(result => {
      console.log(result);
      console.log('datestart:' + this.contractForm.controls.contractDateStart.value);
      console.log('datestart:' + this.contractForm.controls.contractDateEnd.value);
      if (result) {
        this.checkDate = true;
      } else {
        this.checkDate = false;
      }
    });
  }
}
