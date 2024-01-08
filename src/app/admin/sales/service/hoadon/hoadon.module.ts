import { IHoaDonChiTiet } from '../hoadonchitiet/hoadonchitiet.module';
export interface IHoaDon {
  id?: number;
  tenKhachHang?: string;
  maHoaDon?: string;
  soDienThoai?: string;
  diaChi?: string;
  phuongXa?: string;
  quanHuyen?: string;
  tinhThanh?: string;
  ngayTao?: string;
  ngayCapNhat?: string;
  tongTien?: number;
  tienGiam?: number;
  tongTienSauGiam?: number;
  phiVanChuyen?: number;
  phuongThucThanhToan?: number;
  trangThai?: number;
  phieuGiamGia?: any;
  nhanVien?: any;
  khachHang?: any;
  listHoaDonChiTiet?: any[];
}
// tenKhachHang?: string;
