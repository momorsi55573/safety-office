import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AuthDto, CreateUserDto } from '../utils/dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private db: DbService, private jwt: JwtService) {}

  async signin(dto: AuthDto): Promise<{ access_token: string }> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          userName: dto.userName,
        },
      });

      if (!user) {
        throw new NotFoundException('user incorrect');
      }
      let pwMatches: boolean;

      if (user.password == dto.password) {
        pwMatches = true;
      }
      if (!pwMatches) {
        throw new ForbiddenException('password incorrect');
      }

      return this.signUser(user.id, user.role, user.company, user.userName);
    } catch (e) {
      throw e;
    }
  }

  async creatuser(dto: CreateUserDto) {
    try {
      await this.db.user.create({
        data: {
          userName: dto.userName,
          password: dto.password,
          company: dto.company,
          role: dto.role,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signUser(
    sub: string,
    role,
    company: string,
    userName: string,
  ): Promise<{ access_token: string }> {
    try {
      const payload = {
        id: sub,
        role,
        company,
        userName,
      };
      const token = await this.jwt.signAsync({ payload });

      return {
        access_token: token,
      };
    } catch (e) {
      throw e;
    }
  }
}
