import { UnauthorizedException } from '@nestjs/common';

export class EmailNotConfirmedException extends UnauthorizedException {
  constructor() {
    super(
      'Your e-mail has not been confirmed yet. Please confirm it in order to proceed.',
    );
  }
}
