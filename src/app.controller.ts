import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';

@ApiExcludeController()
@Controller()
export class AppController {
  // @ApiExcludeEndpoint()
  @Get()
  getHello(@Res() res: Response): void {
    res.redirect('docs');
  }
}
