import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';

@Injectable()
export class Hash {
  async crypt(text: string) {
    return hash(text);
  }

  async verify(hash: string, text: string) {
    return verify(hash, text);
  }
}
