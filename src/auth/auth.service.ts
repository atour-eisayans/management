import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { verifyHash } from '../user/hash/hash';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(identifier: string, password: string) {
    const user = await this.userService.findByIdentifier(identifier);

    if (!user) {
      return null;
    }

    const isValid = await verifyHash(password, user.password);

    if (!isValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  }
}
