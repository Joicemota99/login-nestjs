import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../bd/prisma.service'
import { CreateUserDto } from '../dto/users.dto';
import exp from 'constants';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      create: jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('Criando usuario', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'usuario@example.com',
        nome: 'Usuário Teste',
        telefone: 123456789,
        senha: 'SenhaForte123!',
        cargo: 'Desenvolvedor',
      };

      mockPrismaService.user.create.mockReturnValue(Promise.resolve({id:1, ...createUserDto}))

      
      const resultado = await service.createUser(createUserDto)
      
      expect(resultado).toEqual({id:1, ...createUserDto})
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: createUserDto
      })
    })
  })
})
