import { Test, TestingModule } from '@nestjs/testing';
import { AuthLoginController } from './auth-login.controller';
import { AuthLoginService } from '../services/auth-login.service';
import { LoginDto } from '../dto/login.dto';

describe('AuthLoginController', () => {
  let authController: AuthLoginController;
  let authService: AuthLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthLoginController], // Controlador que estamos usando
      providers: [
        {
          provide: AuthLoginService, // Simula a lógica
          useValue: {
            login:jest.fn(), // Simula o login 
          }
        }
      ]
    }).compile();

    authController = module.get<AuthLoginController>(AuthLoginController);
    authService = module.get<AuthLoginService>(AuthLoginService);
  });

  it('Deve chamar AuthLoginService.login com os dados corretos',async () => {
    const loginDto: LoginDto = { email: 'test@example.com', senha: 'password' };
    const mockToken = { access_token: 'mock-jwt-token'};
    (authService.login as jest.Mock).mockResolvedValue(mockToken);

    const result = await authController.signIn(loginDto);

    expect(authService.login).toHaveBeenCalledWith(loginDto);
    expect(result).toEqual(mockToken)
  });
  
  it('Deve retornar o token JWT', async () =>{
    const mockToken = {access_token:'mock-jwt-token'};
    const loginDto: LoginDto = { email: 'test@example.com', senha: 'password' };

    (authService.login as jest.Mock).mockResolvedValue(mockToken);

    const result = await authController.signIn(loginDto);
    expect(result).toEqual(mockToken)
  })

  it('Deve lançar o mesmo erro do AuthServiceLogin', async () =>{
    const loginDto: LoginDto = { email: 'test@example.com', senha: 'Invalidpassword' };

    (authService.login as jest.Mock).mockRejectedValue(new Error('Credenciais Inválidas'))

    //O teste espera que o signIn lance o erro
    await expect(authController.signIn(loginDto)).rejects.toThrow('Credenciais Inválidas')
  })
});
