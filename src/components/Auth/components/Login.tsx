//import '../../Control/assets/styles/login.css';
import '../../Control/assets/styles/login.css'
import React, { useState } from 'react';
import { z } from 'zod';
import { encryptData } from '../../Middlewares/encryption';
import axiosInstance from '../../../Api/axiosConfig';
import { Link } from 'react-router-dom';
import { setUserId } from '../../../redux/userSlices';
import { useDispatch } from 'react-redux';

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
            // Procesar la respuesta
            const result = response.data;
            
            // Despachar el ID del usuario al store de Redux
            if (result && result.userId) { 
            // Se supone que userID es la clave de en la respuesta 
                dispatch(setUserId(result.userId));
                setLoginSuccess(true);
            } else {
                setServerError("Error: No se recibió el ID de usuario.");
                setLoginSuccess(false);
            }
        } catch (error) {
            setServerError("Error al iniciar sesión. Inténtalo de nuevo.");
            setLoginSuccess(false);
        }
    }; 

    return (
        <form className='FormLogin' onSubmit={(event) => event.preventDefault()}>
            <div className='ContentFormLogin'>
                <div className='titleLogin'>
                    <h1>LOGIN IN</h1>
                </div>
                <div className='name'>
                    <label htmlFor='username'></label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        placeholder='Username'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'username') && (
                        <span className='error'>
                            {formErrors.find((issue) => issue.path[0] === 'username')?.message}
                        </span>
                    )}
                </div>
                <div className='password'>
                    <label htmlFor='password'></label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Password'
                    />
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
                    <p>Don´t have an account? <Link to="/SignUp">Get BigCart account now</Link></p>
                </div>
            </div>
        </form>
    );
}

export default Login;