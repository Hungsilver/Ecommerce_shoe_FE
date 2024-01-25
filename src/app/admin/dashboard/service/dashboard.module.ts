export interface IDataDthu {
    data: any;
    label: string;
    labels: any;
}
export interface IDashBoardShow {
    data: any;
    label: string;
    labels: any;
}
export interface IDashBoardReq {
    ngayThang: string;
    tongDoanhThu: number;
    tongDonHang: number;
}
export interface IDataHeader {
    tongDoanhThu: number;
    tongDonHang: number;
    tbTongDoanhThu: number;
}

export interface IStatsProductReq {
    tenSanPham: string;
    soLuong: number;
    doanhThu: number;
}
export interface IStat {
    tongDonHang: number;
    donHangTaiQuay: number;
    choXacNhan: number;
    choVanChuyen: number;
    dangGiaoHang: number;
    daGiaoHang: number;
    daHuy: number;
    doiHang: number;
}