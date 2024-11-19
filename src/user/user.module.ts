import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { AuthService } from '../auth/auth.service';
import { CustomI18nService } from 'src/common/services/custom-i18n.service';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  // providers: [AuthService, CustomI18nService],
})
export class UserModule {}
