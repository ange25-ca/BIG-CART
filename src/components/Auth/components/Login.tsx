//import '../../Control/assets/styles/login.css';
import '../assets/login.css'
import React, { useState } from 'react';
import { z } from 'zod';
import { encryptData } from '../../Middlewares/encryption';
import axiosInstance from '../../../Api/axiosConfig';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setUserId } from '../../../redux/userSlices';
import { useDispatch } from 'react-redux';
//Iconos del logeo
import userIcon from '../assets/img/user.svg';
import passwordIcon from '../assets/img/lock.svg';
import imgLogin from '../assets/img/BigCardLogin.png'

// Definir el esquema de validación usando Zod
const loginSchema = z.object({
    username: z.string().min(1, { message: "El nombre del usuario es requerido" }),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type FormData = z.infer<typeof loginSchema>;

function Login() {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
    });

    const [formErrors] = useState<z.ZodIssue[] | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);

    // Se llama al dispatch
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Redirección
    const location = useLocation(); // Para acceder a la ubicación antes del login



    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    
    // Función para regresar a la página principal
    const handleLogin = async () => {
        try {
            // Cifrar los datos
            const encryptedUsername = await encryptData(formData.username);
            const encryptedPassword = await encryptData(formData.password);
    
            if (!encryptedUsername || !encryptedPassword) {
                throw new Error('Error de cifrado: Username o Password no definidos');
            }

            // Enviar los datos como un objeto
            const response = await axiosInstance.post('/user/loginUsuario', {
                dataSegura: {
                    username: encryptedUsername,
                    password: encryptedPassword,
                },
            });
    
            const result = response.data;

            if (result && result.token && result.userId) { 
            // Supone que 'token' y 'userId' son las claves en la respuesta del backend
            localStorage.setItem('authToken', result.token); // Guardar el token en localStorage
            dispatch(setUserId(result.userId)); // Despachar el ID del usuario al store de Redux

            setLoginSuccess(true);
            // Redirigir a la ruta almacenada en el estado, o al inicio si no hay ruta previa
            const redirectTo = (location.state as any)?.from || '/';
            navigate(redirectTo);
            //navigate('/'); // Redirigir al usuario después del inicio de sesión
        } else {
            setServerError("La contraseña o usuario son incorrectos");
            setLoginSuccess(false);
        }

        } catch (error) {
            setServerError("Error al iniciar sesión. Inténtalo más tarde.");
            setLoginSuccess(false);
        }
    }; 
    
    return (
        <form className='FormLogin' onSubmit={(event) => event.preventDefault()}>
            <div className='ContentFormLogin'>
                <div className='titleLogin'>
                    <h1>Iniciar sesión</h1>
                </div>
                <div className='name'>
                    <label htmlFor='username'></label>
                    <div className='inputIcon'>
                        <img src={userIcon} alt='User Icon' className='iconUser' />
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        placeholder='Usuario'
                    />
                    </div>
                    {formErrors?.find((issue) => issue.path[0] === 'username') && (
                        <span className='error'>
                            {formErrors.find((issue) => issue.path[0] === 'username')?.message}
                        </span>
                    )}
                </div>
                <div className='password'>
                    <label htmlFor='password'></label>
                    <div className='inputIcon'>
                        <img src={passwordIcon} alt='Pass Icon' className='iconPassword' />
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Contraseña'
                    />
                    </div>
                    {formErrors?.find((issue) => issue.path[0] === 'password') && (
                        <span className='error'>
                            {formErrors.find((issue) => issue.path[0] === 'password')?.message}
                        </span>
                    )}
                </div>
                {serverError && <span className="error">{serverError}</span>}
                {loginSuccess && <span className="success">Inicio de sesión exitoso</span>}
                <div className='buttonAction'>
                    <button className='button_Send' type='button' onClick={handleLogin}>
                        Enviar 
                    </button>
                </div>
                <div className="no-account">
                    <p>Aun no tienes una cuenta? <Link className="signup-link" to="/SignUp">Crea una cuenta aqui</Link></p>
            </div>
            </div>
            <div>
                <img src={imgLogin} className='imgLogin' alt="Decorativo"/>
            </div>
        </form>
    );
}

export default Login;