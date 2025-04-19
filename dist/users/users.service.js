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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const prisma_service_1 = require("../config/prisma-service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const salt = crypto.randomInt(0, 10);
        const hashed_password = await bcrypt.hash(data.password, salt);
        const record = await this.prisma.user.create({
            data: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                password: hashed_password,
                role: 'user',
            },
        });
        delete record.password;
        return record;
    }
    async findAllPaginated({ page = 0, perPage = 10, clientName, }) {
        const skip = page * perPage;
        const users = await this.prisma.user.findMany({
            where: {
                OR: [
                    {
                        firstName: { contains: clientName, mode: 'insensitive' },
                    },
                    {
                        lastName: { contains: clientName, mode: 'insensitive' },
                    },
                ],
            },
            skip,
            take: perPage,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                email: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                createdAt: true,
                id: true,
                orders: {
                    where: {
                        status: {
                            not: client_1.OrderStatus.CANCELED,
                        },
                    },
                    select: { createdAt: true },
                },
            },
        });
        const aggregates = await this.prisma.user.aggregate({
            where: {
                OR: [
                    {
                        firstName: { contains: clientName, mode: 'insensitive' },
                        lastName: { contains: clientName, mode: 'insensitive' },
                    },
                ],
            },
            _count: true,
        });
        return {
            data: users,
            pagination: {
                page,
                perPage,
                total: aggregates._count,
            },
        };
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                createdAt: true,
                firstName: true,
                lastName: true,
                email: true,
                phoneNumber: true,
                role: true,
            },
        });
        return { ...user, email: this.maskEmail(user.email) };
    }
    async findByEmail(email) {
        const record = await this.prisma.user.findUnique({
            where: { email: email },
            select: {
                id: true,
                phoneNumber: true,
                firstName: true,
                lastName: true,
                email: true,
                password: true,
                role: true,
            },
        });
        if (!record)
            return null;
        return record;
    }
    async update(id, updateUserDto) {
        const record = await this.prisma.user.update({
            where: { id: id },
            data: updateUserDto,
        });
        return record;
    }
    async remove(id) {
        return await this.prisma.user.delete({
            where: { id: id },
        });
    }
    async comparePassword(plainText, hashedPassword) {
        return await bcrypt.compare(plainText, hashedPassword);
    }
    maskEmail(email) {
        const emailParts = email.split('@');
        const maskedEmail = `${emailParts[0].slice(0, 3)}${emailParts[0]
            .slice(3, -3)
            .replace(/./g, '*')}@${emailParts[1]}`;
        return maskedEmail;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map