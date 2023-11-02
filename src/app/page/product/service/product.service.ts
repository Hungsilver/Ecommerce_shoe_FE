import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './product.module';
import { BaseRequestService } from '../../../../libs/service/request/base-request.service';
import { IReqApi } from 'src/libs/common/interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string = 'product';
  // products: IReqApi<IProduct[]> =
  //   {
  //     content: [
  //       {
  //         id: 1,
  //         ten: "Air Jordan 1 Zoom CMFT 2",
  //         anhChinh: 'sp1.png',
  //         moTa: "Da lộn cao cấp và bọt Công thức 23 đặc trưng của Jordan Brand kết hợp với nhau để mang đến cho bạn chiếc AJ1 sang trọng hơn (và cực kỳ ấm cúng). Bạn không cần phải chơi trò hoặc khi chọn phong cách hoặc sự thoải mái với kiểu này—điều này thật tuyệt, vì bạn xứng đáng có được cả hai.",
  //         trangThai: 0,
  //         thuongHieu: {
  //           id: 2,
  //           ten: "Nike",
  //           trangThai: 0,
  //         },
  //         xuatXu: {
  //           id: 8,
  //           ten: "Nhật Bản",
  //           trangThai: 0,
  //         },
  //         danhMuc: null,
  //       },
  //       {
  //         id: 2,
  //         ten: "GIÀY LG2 SPZL",
  //         anhChinh: 'sp2.png',
  //         moTa: "LG2 lần đầu ra mắt với dòng sản phẩm SS22 SPZL và là phiên bản tiếp nối của Spezial LG nguyên bản từ mùa FW19. Đây là kiểu dáng kết hợp giữa giày bóng quần cổ điển và giày trong nhà.Mẫu Giày LG2 SPZL này có thân giày bằng vải nylon, 3 Sọc in nhung, các chi tiết phủ ngoài bằng da lộn cùng phần lỗ xỏ dây giày và viền gót giày bằng da. Mặt đến bao gồm đế giữa cắt theo khuôn bằng chất liệu EVA, phần bọc mũi giày bất đối xứng và đế ngoài bằng cao su. ",
  //         trangThai: 0,
  //         thuongHieu: {
  //           id: 1,
  //           ten: "Adidas",
  //           trangThai: 0,
  //         },
  //         xuatXu: {
  //           id: 7,
  //           ten: "Việt Nam",
  //           trangThai: 0,
  //         },
  //         danhMuc: null,
  //       },
  //       {
  //         id: 3,
  //         ten: "Chuck 70s Low Cream White",
  //         anhChinh: 'sp3.png',
  //         moTa: "Converse 1970s là 1 trong những dòng sản phẩm bán chạy nhất của Converse.Sunflower là một trong những phối màu hot nhất của dòng Converse 1970s, rất đẹp và dễ phối đồ, đồng thời có 2 bản là cao cổ và thấp cổ",
  //         trangThai: 0,
  //         thuongHieu: {
  //           id: 3,
  //           ten: "Converse",
  //           trangThai: 0,
  //         },
  //         xuatXu: {
  //           id: 2,
  //           ten: "Mỹ",
  //           trangThai: 0,
  //         },
  //         danhMuc: null,
  //       },
  //       {
  //         id: 4,
  //         ten: "Giày Puma Cell Speed Reflective In 371868-01",
  //         anhChinh: 'sp4.png',
  //         moTa: "Giày Puma Cell Speed Reflective In 371868-01 có thiết kế hiện đại và trẻ trung, phù hợp với nhiều đối tượng khác nhau, từ các vận động viên chuyên nghiệp đến những người đam mê thể thao và phong cách đường phố.",
  //         trangThai: 0,
  //         thuongHieu: {
  //           id: 4,
  //           ten: "Puma",
  //           trangThai: 0,
  //         },
  //         xuatXu: {
  //           id: 1,
  //           ten: "Đức",
  //           trangThai: 0,
  //         },
  //         danhMuc: null,
  //       },
  //       {
  //         id: 5,
  //         ten: "VANS AUTHENTIC CLASSIC BLACK/WHITE",
  //         anhChinh: 'sp5.png',
  //         moTa: "Là phiên bản được ưa chuộng nhất trong bộ sưu tập Authentic của VANS với sự kết hợp 2 màu đen trắng dễ phối đồ và custom, đặc biệt là phiên bản cổ nhất có tuổi đời hơn 50 năm, dù vậy vẫn được fan hâm mộ săn đón và được sử dụng khá nhiều với những vận động viên trượt ván chuyên nghiệp. VANS CLASSIC AUTHENTIC BLACK/WHITE được đánh giá là một siêu phẩm cần có khi bạn quyết định sẽ trở thành một tín đồ của nhà VANS đấy!",
  //         trangThai: 0,
  //         thuongHieu: {
  //           id: 5,
  //           ten: "Vans",
  //           trangThai: 0,
  //         },
  //         xuatXu: {
  //           id: 2,
  //           ten: "Mỹ",
  //           trangThai: 0,
  //         },
  //         danhMuc: null,
  //       },
  //       {
  //         id: 6,
  //         ten: "Unisex New Balance chuyển 90/60 giày",
  //         anhChinh: 'sp6.png',
  //         moTa: "Lưới phía trên với lớp phủ da lộn da lợn.Đế giữa mật độ kép có đệm ABZORB và SBS.Logo lưỡi lấy cảm hứng từ viên ngọc ren 991 nguyên bản.Thiết bị CR mờ ở gót chân.Mẫu đế ngoài kim cương lấy cảm hứng từ thiết kế 860 cổ điển.410 gram (14,5 oz)",
  //         trangThai: 0,
  //         thuongHieu: {
  //           id: 6,
  //           ten: "New Balance",
  //           trangThai: 0,
  //         },
  //         xuatXu: {
  //           id: 8,
  //           ten: "Nhật Bản",
  //           trangThai: 0,
  //         },
  //         danhMuc: null,
  //       },
  //       {
  //         id: 7,
  //         ten: "Balenciaga Triple S Trainer Black Red",
  //         anhChinh: 'sp7.png',
  //         moTa: "Đây là thương hiệu thời trang lâu đời nổi tiếng, cao cấp nhất nhì thế giới được thành lập từ năm 1919. Tiếp nối sự thành công, thương hiệu tiếp tục tung ra Triple S – dòng giày đa sắc màu, phá bỏ mọi giới hạn, đủ đẹp, đủ chất để khiến giới mộ điệu lại một lần nữa phải điên đảo Đây là mẫu giày cũng được nhiều người nghệ sĩ thế giới lựa chọn. Tại Việt Nam, giày Triple S được rất nhiều nghệ sĩ nổi tiếng yêu thích.",
  //         trangThai: 0,
  //         thuongHieu: {
  //           id: 7,
  //           ten: "Balenciaga",
  //           trangThai: 0,
  //         },
  //         xuatXu: {
  //           id: 10,
  //           ten: "Hà Lan",
  //           trangThai: 0,
  //         },
  //         danhMuc: null,
  //       },
  //       {
  //         id: 8,
  //         ten: "WALK'N'DIOR PLATFORM SNEAKER",
  //         anhChinh: 'sp8.png',
  //         moTa: "Giày thể thao nền tảng Walk'n'Dior nâng tầm dòng sản phẩm với sự sáng tạo hiện đại. Phần trên thêu bông Dior Oblique màu xanh đậm để lộ phần đế dày thoải mái, lưỡi và dây buộc Christian Dior Paris. Giày thể thao sẽ thêm một nét hiện đại cho bất kỳ vẻ ngoại thoải mái nào.",
  //         trangThai: 0,
  //         thuongHieu: {
  //           id: 8,
  //           ten: "Dior",
  //           trangThai: 0,
  //         },
  //         xuatXu: {
  //           id: 4,
  //           ten: "Pháp",
  //           trangThai: 0,
  //         },
  //         danhMuc: null,
  //       },
  //       {
  //         id: 9,
  //         ten: "Giày Sneaker Nam Dolce & Gabbana D&G NS1 CS1810 AD505",
  //         anhChinh: 'sp9.png',
  //         moTa: "Giày Sneaker Nam Dolce & Gabbana D&G NS1 CS1810 AD505 được làm từ chất liệu 70% polyamide, 20% calf leather, 10% spandex cao cap, bền đẹp trong suốt qua trình sử dụng. Form giày chuẩn từng chi tiết, các đường nét vô cùng tinh tế và sắc xảo",
  //         trangThai: 0,
  //         thuongHieu: {
  //           id: 9,
  //           ten: "Supreme",
  //           trangThai: 0,
  //         },
  //         xuatXu: {
  //           id: 2,
  //           ten: "Mỹ",
  //           trangThai: 0,
  //         },
  //         danhMuc: null,
  //       },
  //       {
  //         id: 10,
  //         ten: "Giày Sneaker Nam Gucci Screener GG Leather Canvas 546551-9Y920-9666",
  //         anhChinh: 'sp10.png',
  //         moTa: "Đôi giày Sneaker Gucci Screener GG Leather Canvas 546551-9Y920-9666 là sự kết hợp của những ảnh hưởng khác nhau trải qua nhiều thập kỷ. Chất liệu được sử dụng là da, 2 bên sườn giày nổi bật với sọc web và logo cổ điển của Gucci tạo nên phong cách thể thao khỏe khoắn, năng động nhưng không kém phân sành điệu",
  //         trangThai: 0,
  //         thuongHieu: {
  //           id: 1,
  //           ten: "Adidas",
  //           trangThai: 0,
  //         },
  //         xuatXu: {
  //           id: 5,
  //           ten: "Ý",
  //           trangThai: 0,
  //         },
  //         danhMuc: null,
  //       },
  //     ],
  //     pageable: {
  //       pageNumber: 0,
  //       pageSize: 10,
  //       sort: {
  //         empty: true,
  //         sorted: false,
  //         unsorted: true,
  //       },
  //       offset: 0,
  //       unpaged: false,
  //       paged: true,
  //     },
  //     last: false,
  //     totalPages: 5,
  //     totalElements: 50,
  //     size: 10,
  //     number: 0,
  //     sort: {
  //       empty: true,
  //       sorted: false,
  //       unsorted: true,
  //     },
  //     first: true,
  //     numberOfElements: 10,
  //     empty: false,
  //   };


  constructor(
    private http: HttpClient,
    private baseRequestService: BaseRequestService
  ) {

  }

  getProducts(params?: any): Promise<IReqApi<IProduct[]>> {
    return new Promise<IReqApi<IProduct[]>>((resolve, reject) => {
      this.baseRequestService.get(`${this.url}`, params).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  getProductById(id: Number): Promise<IProduct> {
    return new Promise<IProduct>((resolve, reject) => {
      this.baseRequestService.get(`${this.url}/${id}`).subscribe(
        (result) => {
          return resolve(result);
        },
        (err) => reject(err)
      );
    });
  }

  filter(params: any): Promise<IReqApi<IProduct[]>> {
    return new Promise<IReqApi<IProduct[]>>((resolve, reject) => {
      this.baseRequestService.get(`${this.url}/filter`, params).subscribe(
        (res) => {
          return resolve(res);
        },
        (err) => reject(err)
      )
    })
  }
}
