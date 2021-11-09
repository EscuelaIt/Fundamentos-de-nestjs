import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) { }
  getHello(): string {
    
    return this.configService.get('APP_NAME', 'Mi app');
    throw new NotFoundException('No existe esta ruta');
    return 'Hola Mundo!!!!!!!';
  }
}
