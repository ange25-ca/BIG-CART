import React, { useState } from 'react';
import { z } from 'zod';
import '../../Control/assets/styles/signUp.css';
import back_login from '../../Control/assets/img/back_login.svg';
import send_login from '../../Control/assets/img/user_login.svg';
import axiosInstance from '../../../../axiosConfig';
import { encryptData } from '../../Middlewares/encryption';

// Definir el esquema de validación usando Zod
const SignUpSchema = z.object({
  username: z.string().min(1, { message: "El nombre del usuario es requerido" }),
  lastname: z.string().min(1, { message: 'El apellido es requerido' }),
  age: z.number().min(0, { message: 'La edad no puede ser negativa' }).max(120, { message: 'La edad no puede ser mayor de 120' }),
  email: z.string().min(8, { message: 'El email es requerido' }),
  phonenumber: z.string().regex(/^\+?\d{10,15}$/, "Número de teléfono no válido"),
  address: z.string().min(10, { message: 'La dirección es obligatoria' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

export type FormData = z.infer<typeof SignUpSchema>;

function SignUp() {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        lastname: '',
        age: 0,
        email: '',
        phonenumber: '',
        address: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState<z.ZodIssue[] | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [signupSuccess, setSignupSuccess] = useState<boolean | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: name === 'age' ? Number(value) : value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = SignUpSchema.safeParse(formData);

        if (!result.success) {
            setFormErrors(result.error.issues);
        } else {
            setFormErrors(null);
            console.log('Datos válidos:', result.data);
            try {
                // Cifrar los datos sensibles (password y username)
                const encryptedUsername = await encryptData(formData.username);
                const encryptedLastname = await encryptData(formData.lastname);
                //El campo de Edad se convierte en string para poder cifrarlo
                const encrypytedAge = await encryptData(formData.age.toString());
                const encrypytedEmail = await encryptData(formData.email);
                const encrypytedPhonenumber = await encryptData(formData.phonenumber);
                const encrypytedAddress = await encryptData(formData.address);
                const encryptedPassword = await encryptData(formData.password);
                
                // Enviar los datos como un objeto
                const response = await axiosInstance.post('/user/SignUpUsuario', {
                    dataSegura: {
                    username: encryptedUsername,
                    lastname: encryptedLastname,
                    age: encrypytedAge,
                    email: encrypytedEmail,
                    phonenumber: encrypytedPhonenumber,
                    address: encrypytedAddress,
                    password: encryptedPassword,
                },
            });
                console.log('Respuesta del servidor:', response.data);
                setSignupSuccess(true);
                setServerError(null);
            } catch (error) {
                console.error("Error al registrar:", error);
                setServerError("Error al registrar. Inténtalo de nuevo.");
                setSignupSuccess(false);
            }
        }
    };

    return (
        <form className='FormSignUp' onSubmit={handleSubmit}>
            <div className='ContentFormSignUp'>
                <div className='titleSignUp'>
                    <h1>SIGN UP</h1>
                </div>
                {/* Nombre */}
                <div className='name'>
                    <label htmlFor='username'>Nombre</label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'username') && (
                        <span>{formErrors.find((issue) => issue.path[0] === 'username')?.message}</span>
                    )}
                </div>
                {/* Apellido */}
                <div className='lastname'>
                    <label htmlFor='lastname'>Apellido</label>
                    <input
                        type='text'
                        id='lastname'
                        name='lastname'
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'lastname') && (
                        <span>{formErrors.find((issue) => issue.path[0] === 'lastname')?.message}</span>
                    )}
                </div>
                {/* Edad */}
                <div className='age'>
                    <label htmlFor='age'>Edad</label>
                    <input
                        type='number'
                        id='age'
                        name='age'
                        value={formData.age}
                        onChange={handleChange}
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'age') && (
                        <span>{formErrors.find((issue) => issue.path[0] === 'age')?.message}</span>
                    )}
                </div>
                {/* Email */}
                <div className='email'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'email') && (
                        <span>{formErrors.find((issue) => issue.path[0] === 'email')?.message}</span>
                    )}
                </div>
                {/* Teléfono */}
                <div className='phonenumber'>
                    <label htmlFor='phonenumber'>Teléfono</label>
                    <input
                        type='text'
                        id='phonenumber'
                        name='phonenumber'
                        value={formData.phonenumber}
                        onChange={handleChange}
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'phonenumber') && (
                        <span>{formErrors.find((issue) => issue.path[0] === 'phonenumber')?.message}</span>
                    )}
                </div>
                {/* Dirección */}
                <div className='address'>
                    <label htmlFor='address'>Dirección</label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                        value={formData.address}
                        onChange={handleChange}
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'address') && (
                        <span>{formErrors.find((issue) => issue.path[0] === 'address')?.message}</span>
                    )}
                </div>
                {/* Contraseña */}
                <div className='password'>
                    <label htmlFor='password'>Contraseña</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'password') && (
                        <span>{formErrors.find((issue) => issue.path[0] === 'password')?.message}</span>
                    )}
                </div>
                {serverError && <span className="error">{serverError}</span>}
                {signupSuccess && <span className="success">Registro exitoso</span>}
                {/* Botones de acción */}
                <div className='buttonAction'>
                    <button className='go-back' type='button'>
                        <img src={back_login} alt="Back" />
                    </button>
                    <button className='send' type='submit'>
                        <img src={send_login} alt="Send" />
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SignUp;
