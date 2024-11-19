import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  UseFilters,
  Inject,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register-dto';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { CustomExceptionFilter } from 'src/common/filters/custom-http.filter';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';
import { CustomI18nValidationExceptionFilter } from 'src/common/filters/custom-i18n.filter';
import { CustomI18nService } from 'src/common/services/custom-i18n.service';

@Controller('auth')
@UseFilters(
  new CustomExceptionFilter(),
  new CustomI18nValidationExceptionFilter(),
)
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(CustomI18nService) private customI18nService: CustomI18nService,
  ) {}

  @Post('/register')
  async register(@Body() data: RegisterDto) {
    const user = await this.authService.createAccount({
      ...data,
      provider: 'local',
    });
    return user;
  }

  //login with google
  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    return { message: 'Registered Successfully' };
  }

  //redirect after login
  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleRedirect(@Req() req) {
    // return { message: 'Registered ' }
    return {
      message: this.customI18nService.translate('validation.USER_REGISTER'),
      userData: req.user,
    };
  }

  // local login
  @Post('/logIn')
  @UseGuards(LocalAuthGuard)
  localLogin(@Req() req) {
    return req.user;
  }
}
