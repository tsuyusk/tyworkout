import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { authConfig } from 'src/@config/auth';
import { Hash } from 'src/hash/hash';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyUserDto } from './dto/verify-user.dto';
import { FindByIdDto } from './dto/find-by-id.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private hash: Hash,
    private jwtService: JwtService,
  ) {}

  async findById({ id }: FindByIdDto) {
    return this.prismaService.user.findFirst({
      where: { id },
    });
  }

  async validateUser({ email, password }: VerifyUserDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(
        'The E-mail/Password combination is invalid',
        401,
      );
    }

    if (!(await this.hash.verify(user.password, password))) {
      throw new HttpException(
        'The E-mail/Password combination is invalid',
        401,
      );
    }

    delete user.password;

    return {
      token: await this.generateToken(user),
      user,
    };
  }

  async generateToken(payload: User) {
    const { secret, expiresIn } = authConfig;

    return this.jwtService.sign(
      { id: payload.id },
      {
        secret,
        expiresIn,
      },
    );
  }
}
