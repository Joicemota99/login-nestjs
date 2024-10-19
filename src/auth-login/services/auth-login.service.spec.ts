import { Test, TestingModule } from '@nestjs/testing';
import { AuthLoginService } from './auth-login.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import { JwtService } from '@nestjs/jwt';

// Mock User Service
const mockUserService = {
  findByEmail: jest.fn(),
}

// Mock JwtService
const mockJwtService = {
  sign: jest.fn(),
}

describe('AuthLoginService', () => {
  let service: AuthLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthLoginService,
        {
          provide: UserService,
          useValue: mockUserService, // Correção aqui
        },
        {
          provide: JwtService,
          useValue: mockJwtService, // Correção aqui
        }
      ],
    }).compile();

    service = module.get<AuthLoginService>(AuthLoginService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('deve retornar o usuário sem a senha se as credenciais forem válidas', async () => {
      const userMock = { 
        id: 1, 
        email: 'test@example.com',
        senha: 'hashedPassword'
      };
      mockUserService.findByEmail.mockResolvedValue(userMock);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toEqual({
        id: 1,
        email: 'test@example.com',
      });
    });

    it('deve retornar null se as credenciais forem inválidas', async () => {
      mockUserService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser('invalid@example.com', 'password');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('O token precisa retornar para o login validado', async () => {
      const userMock = { id: 1, email: 'test@example.com' };
      jest.spyOn(service, 'validateUser').mockResolvedValue(userMock);
      mockJwtService.sign.mockReturnValue('token'); // Ajustado para usar mockJwtService.sign

      const loginDto = { email: 'test@example.com', senha: 'password' };
      const result = await service.login(loginDto); // Use await aqui

      expect(result).toEqual({ access_token: 'token' });
    });

    it('deve lançar UnauthorizedException se as credenciais forem inválidas', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      const loginDto = { email: 'invalid@example.com', senha: 'password' };

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
