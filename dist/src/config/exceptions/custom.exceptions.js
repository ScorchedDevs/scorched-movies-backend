"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotConfirmedException = void 0;
const common_1 = require("@nestjs/common");
class EmailNotConfirmedException extends common_1.UnauthorizedException {
    constructor() {
        super('Your e-mail has not been confirmed yet. Please confirm it in order to proceed.');
    }
}
exports.EmailNotConfirmedException = EmailNotConfirmedException;
//# sourceMappingURL=custom.exceptions.js.map