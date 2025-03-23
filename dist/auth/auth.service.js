"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const crypto = __importStar(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_service_1 = require("../users/users.service");
const prisma_service_1 = require("../config/prisma-service");
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, prismaService, mailService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.prismaService = prismaService;
        this.mailService = mailService;
    }
    async register(createUserDto) {
        const user = await this.usersService.create(createUserDto);
        return {
            user,
            accessToken: await this.generateToken(user),
        };
    }
    async login(loginAuthDto) {
        const user = await this.usersService.findByEmail(loginAuthDto.email);
        if (!user) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        const isPasswordMatch = await this.usersService.comparePassword(loginAuthDto.password, user.password);
        if (!isPasswordMatch) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        return {
            user,
            accessToken: await this.generateToken(user),
        };
    }
    async me(id) {
        const user = await this.usersService.findOne(id);
        const settings = await this.prismaService.storeSettings.findFirst();
        return { ...user, settings };
    }
    async requestPasswordReset(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetExpires = new Date(Date.now() + 3600000);
        await this.prismaService.user.update({
            where: { email },
            data: { resetToken, resetExpires },
        });
        await this.mailService.sendPasswordResetEmail(user.email, user.firstName + user.lastName, resetToken);
        return { message: 'E-mail de redefinição enviado.' };
    }
    async resetPassword(token, newPassword) {
        const user = await this.prismaService.user.findFirst({
            where: { resetToken: token, resetExpires: { gt: new Date() } },
        });
        if (!user) {
            throw new Error('Token inválido ou expirado.');
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        await this.prismaService.user.update({
            where: { id: user.id },
            data: { password: hashedPassword, resetToken: null, resetExpires: null },
        });
        return { message: 'Senha redefinida com sucesso.' };
    }
    async generateToken(user) {
        const payload = { sub: user.id, user };
        return await this.jwtService.signAsync(payload, {
            privateKey: String(process.env.JWT_SECRET),
            expiresIn: '1d',
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map