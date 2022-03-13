import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Spaces} from '../../../model/space/spaces';
import {SpaceService} from '../../../service/space/space.service';
import {SpaceTypeService} from '../../../service/space/space-type.service';
import {SpaceStatusService} from '../../../service/space/space-status.service';
import {FloorService} from '../../../service/floor/floor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SpacesType} from '../../../model/space/spaces-type';
import {SpacesStatus} from '../../../model/space/spaces-status';
import { Floors } from 'src/app/model/floors/floors';
import Swal from "sweetalert2";
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-space-edit',
  templateUrl: './space-edit.component.html',
  styleUrls: ['./space-edit.component.css']
})
export class SpaceEditComponent implements OnInit {
  spaceEditForm = new FormGroup({
    spaceCode: new FormControl('', Validators.required),
    spaceArea: new FormControl('', [Validators.required, Validators.pattern('^(,|[0-9])*$')]),
    spacePrice: new FormControl('', [Validators.pattern('^(,|[0-9])*$')]),
    spaceManagerFee: new FormControl('', [Validators.pattern('^(,|[0-9])*$')]),
    spaceNote: new FormControl(),
    spaceImage: new FormControl(),
    spaceDeleteFlag: new FormControl(),
    spacesType: new FormControl('', Validators.required),
    spaceStatus: new FormControl('', Validators.required),
    floors: new FormControl('', Validators.required)
  });
  spaceEdit: Spaces;
  spaceTypeList: Array<SpacesType>;
  spaceStatusList: Array<SpacesStatus>;
  floorList: Array<Floors>;
  private selectedImage: any;
  loading = false;

  constructor(private spaceService: SpaceService,
              private spaceTypeService: SpaceTypeService,
              private spaceStatusService: SpaceStatusService,
              private floorService: FloorService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.spaceStatusService.findAll().subscribe(value => {
      this.spaceStatusList = value;
      this.spaceTypeService.findAll().subscribe(value1 => {
        this.spaceTypeList = value1;
        this.floorService.findAll().subscribe(value2 => {
          this.floorList = value2;
          const spaceEditId = this.activatedRoute.snapshot.params.id;
          this.spaceService.findByID(spaceEditId).subscribe(value3 => {
            this.spaceEdit = value3;
            // console.log(this.spaceEdit);
            this.spaceEditForm.patchValue(this.spaceEdit);
          });
        });
      });
    });



  }
  private callToast() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Sửa mới thành công!',
      showConfirmButton: false,
      timer: 2000
    });
  }

  upload(event: any) {
    this.selectedImage = event.target.files[0];
    const nameImg = this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.loading = true;
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.spaceEditForm.patchValue({employeeImage: url});
          this.spaceEdit.spaceImage = url;
          this.loading = false;
        });
      })
    ).subscribe();
  }
  editSpace(): void {
    const editSpace = Object.assign({}, this.spaceEditForm.value);
    editSpace.spaceId = this.spaceEdit.spaceId;
    this.spaceService.editSpace(editSpace).subscribe(value => {alert('Chỉnh sửa thành công');
      },
      error => {
      }, () => {
        this.router.navigateByUrl('/spaces/list');
      });
  }
  compareFnSS(t1: any, t2: any): boolean {
    return t1 && t2 ? t1.spaceStatusId === t2.spaceStatusId : t1 === t2;
  }
  compareFnST(t1: any, t2: any): boolean {
    return t1 && t2 ? t1.spaceTypeId === t2.spaceTypeId : t1 === t2;
  }
  compareFnFL(t1: any, t2: any): boolean {
    return t1 && t2 ? t1.floorId === t2.floorId : t1 === t2;
  }
}
