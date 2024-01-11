import { Component, Inject, OnInit } from '@angular/core';
import { TraHangService } from '../../service/tra-hang.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-update-ctsp',
  templateUrl: './dialog-update-ctsp.component.html',
  styleUrls: ['./dialog-update-ctsp.component.scss']
})
export class DialogUpdateCtspComponent implements OnInit {

  //tại quầy
  traHangDialog: any = {};
  listSanPhamTra: any = {};
  traHangChiTiet: any = {};
  listTraHangChiTiet: any[] = [];
  listCapNhatCTSP: any[] = [];
  chiTietSanPham: any = {};
  listUpdateCTSP: any[] = [];
  openDialog: any;
  loiSoLuong = true;
  checked: Set<number> = new Set();
  checkedItems: any = [];
  //

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private traHangService: TraHangService,
    private notificationService: ToastrService,
  ) {
    this.listSanPhamTra = data.listSanPhamTra;
    this.traHangDialog = data.traHang;
    this.openDialog = data.openDialog
  }

  ngOnInit(): void {
    this.listTraHangChiTiet = this.listSanPhamTra;

  }


  // trả hàng tại quầy
  capNhatSoLuong($event: any, index: number) {
    this.loiSoLuong = false;
    const idHdct = this.listTraHangChiTiet[index].hoaDonChiTiet.id;
    this.traHangService.findByIdHDCT(idHdct).then(c => {
      if ($event.target.value > c.soLuong || $event.target.value < 1) {
        this.notificationService.error("Số lượng cập nhật không hơp lệ !")
        this.loiSoLuong = true;
      } else {

        if (this.listCapNhatCTSP.length > 0) {
          this.traHangChiTiet = c;
          this.traHangChiTiet.soLuong = $event.target.value;

          this.listCapNhatCTSP = this.listCapNhatCTSP.filter((item: { id: number; }) => item.id !== idHdct);
          this.listCapNhatCTSP.splice(index, 0, this.traHangChiTiet);
        }
      }
    })

  }

  toggleChecked(itemId: number): void {
    this.loiSoLuong = false;
    // Đảo ngược trạng thái của itemId trong Set

    if (this.checked.has(itemId)) {
      this.checkedItems = [];
      this.listCapNhatCTSP = [];
      this.checked.delete(itemId);
    } else {
      this.checked.add(itemId);
      this.listSanPhamTra.forEach((key: any) => {
        this.checkedItems.push(key.id);
        this.listCapNhatCTSP.push(key);
      })
    }
  }

  isChecked(itemId: number): boolean {

    // Kiểm tra xem itemId có trong Set không
    return this.checked.has(itemId);
  }


  onCheckboxChange(event: any, itemId: number) {
    this.loiSoLuong = false;
    if (event.target.checked) {
      // Nếu checkbox được chọn, thêm giá trị vào mảng
      this.listSanPhamTra.forEach((key: any) => {
        if (key.id === itemId) {
          this.listCapNhatCTSP.push(key);

          return;
        }
      })
      this.checkedItems.push(itemId);
      this.checkedItems;

    } else {
      // Nếu checkbox bị hủy chọn, loại bỏ giá trị khỏi mảng
      this.listCapNhatCTSP = this.listCapNhatCTSP.filter((item: { id: number; }) => item.id !== itemId);
      this.checkedItems = this.checkedItems.filter((id: number) => id !== itemId);
    }

  }

  huyCapNhat() {
    this.dialog.closeAll();
    // this.notificationService.success('Trả hàng thành công !')
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  capNhatCTSP() {
    this.listUpdateCTSP = [];
    
    if(this.listCapNhatCTSP.length = 0){
      this.notificationService.error('Vui lòng chọn sản phẩm cập nhật !')
    } else if (this.loiSoLuong === true) {
      this.notificationService.error('Số lượng cập nhật không hợp lệ !')
    } else {
      this.listCapNhatCTSP.forEach((key: any) => {
        this.listUpdateCTSP.push({
          idChiTietSanPham: key.hoaDonChiTiet.chiTietSanPham.id,
          soLuong: key.soLuong
        })
      })

      this.traHangService.capNhatCTSP(this.listUpdateCTSP).then(c => {
        this.notificationService.success('Cập nhật sản phẩm thành công !')
        this.closeDialog();
      }, err => {
        this.notificationService.success('Cập nhật sản phẩm không thành công !')
      })
    }

  }

  closeDialog() {
    this.dialog.closeAll();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

}
