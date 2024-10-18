import { Test, TestingModule } from '@nestjs/testing';
import { AuthLoginService } from './auth-login.service';
import * as bcrypt from 'bcrypt';

// Mock User Service
const mockUserService = {
  findByEmail: jest.fn(),
}

// Mock JwtService
const mockJwtService = {
  login: jest.fn(),
}

describe('AuthLoginService', () => {
  let service: AuthLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthLoginService],
    }).compile();

    service = module.get<AuthLoginService>(AuthLoginService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', ()=>{
    it('deve retornar o usuário sem a senha se as credenciais forem válidas', async () =>{
      const userMock = { 
        id: 1, 
        email: 'test@example.com',
        senha: 'hashedPassword'
      };
      mockUserService.findByEmail.mockResolvedValue(userMock);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

      const result = await service.validateUser('test@example.com','password');

      expect(result).toEqual({
        id:1,
        email:'test@example.com'
      });

      it('deve retornar null se as credenciais forem inválidas', async () =>{
        mockUserService.findByEmail.mockResolvedValue(null);

        const result = await service.validateUser('invalid@example.com', 'password');
        expect(result).toBeNull();
      })

      
    })
  })
});
