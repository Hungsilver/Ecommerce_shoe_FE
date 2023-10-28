import { Injectable } from '@angular/core';
import { BaseRequestAbstractService } from 'src/libs/service/request/abstract-api.service';

@Injectable({ providedIn: 'root' })
export class UploadFileService {
    constructor(private baseRequest: BaseRequestAbstractService) { }

    uploadFile() { }
}