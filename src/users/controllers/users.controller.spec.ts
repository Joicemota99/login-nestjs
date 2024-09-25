import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/users.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let userService : UserService;

  const mockUserService = {
    createUser: jest.fn(),
  }

  beforeEach(async () =>{
    const module: TestingModule = await Test.createTestingModule({
      controllers:[UsersController],
      providers: [
        {
          provide:UserService,
          useValue: mockUserService,
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UserService>(UserService)
  });

  describe('criando um usuario', () => {
    it('Criando um user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'teste@hotmail.com',
        nome: 'Joice Teste',
        telefone: 999999999,
        senha: 'SenhaForte123!',
        cargo: 'Desenvolvedora',
      };

      mockUserService.createUser.mockReturnValue(Promise.resolve(createUserDto))

      expect(await controller.create(createUserDto)).toEqual(createUserDto);
      expect(userService.createUser).toHaveBeenCalledWith(createUserDto)
    })
  })
});
