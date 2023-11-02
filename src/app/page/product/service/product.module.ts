import { IProductDetail } from "../../detail/service/detail.module";

export interface IProduct {
  id?: number;
  ma?: string;
  ten?: string;
  anhChinh?: string | null;
  moTa?: string;
  trangThai?: number;
  thuongHieu?: any;
  xuatXu?: any;
  danhMuc?: any;
  listChiTietSanPham: any[];
}


