import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Hash } from 'src/hash/hash';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import { JWTStrategy } from './jwt.strategy';

@Module({
  providers: [Hash, PrismaService, AuthService, JWTStrategy],
  imports: [JwtModule, PassportModule],
  exports: [AuthService, JWTStrategy],
})
export class AuthModule {}
