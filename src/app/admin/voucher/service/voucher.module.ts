export interface IVoucher {
  id: number;
  ma: string;
  ten?: string;
  chietKhau: number | 0;
  hinhThucGiamGia?: boolean;
  thoiGianBatDau?: Date;
  thoiGianKetThuc?: Date;
  moTa?: string;
  trangThai?: number;
  hoaDon?: any;
}
