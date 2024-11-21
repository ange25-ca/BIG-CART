import '../assets/signUp.css'
import React, { useState } from 'react';
import { z } from 'zod';
import axiosInstance from '../../../Api/axiosConfig';
import { encryptData } from '../../Middlewares/encryption';
import { Link } from 'react-router-dom';
import { TiThumbsUp } from 'react-icons/ti';

// Definir el esquema de validación usando Zod
const SignUpSchema = z.object({
  username: z.string().min(1, { message: "El nombre del usuario es requerido" }),
  lastname: z.string().min(1, { message: 'El apellido es requerido' }),
  age: z.union([z.string().min(1, { message: 'La edad no puede estar vacía' }), z.number().min(0, { message: 'La edad no puede ser negativa' }).max(120, { message: 'La edad no puede ser mayor de 120' })]), // Permitir cadena vacía o número
  email: z.string().min(8, { message: 'El email es requerido' }),
  phonenumber: z.string().regex(/^\+?\d{10,15}$/, "Número de teléfono no válido"),
  address: z.string().min(10, { message: 'La dirección es obligatoria' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

export type FormData = z.infer<typeof SignUpSchema> & {
    age: string | number; // Permitir tanto número como cadena para evitar conflictos
};

function SignUp() {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        lastname: '',
        age: '' ,
        email: '',
        phonenumber: '',
        address: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState<z.ZodIssue[] | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [signupSuccess, setSignupSuccess] = useState<boolean | null>(null);
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        //Realiza una evaluación del input Age para verificar si es number
        setFormData({ ...formData, [name]: name === 'age' ? (value === "" ? "" : Number(value)): value });
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
                    <h1>Crear una cuenta</h1>
                </div>
                {/* Nombre */}
                <div className='name'>
                    <label htmlFor='username'></label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        placeholder='Usuario'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'username') && (
                        <span className='error'>{formErrors.find((issue) => issue.path[0] === 'username')?.message}</span>
                    )}
                </div>
                {/* Apellido */}
                <div className='lastname'>
                    <label htmlFor='lastname'></label>
                    <input
                        type='text'
                        id='lastname'
                        name='lastname'
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder='Primer apellido'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'lastname') && (
                        <span className='error'>{formErrors.find((issue) => issue.path[0] === 'lastname')?.message}</span>
                    )}
                </div>
                {/* Edad */}
                <div className='age'>
                    <label htmlFor='age'></label>
                    <input
                        type='number'
                        id='age'
                        name='age'
                        value={formData.age}
                        onChange={handleChange}
                        placeholder='Edad'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'age') && (
                        <span className='error'>{formErrors.find((issue) => issue.path[0] === 'age')?.message}</span>
                    )}
                </div>
                {/* Gmail */}
                <div className='email'>
                    <label htmlFor='email'></label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Correo electronico'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'email') && (
                        <span className='error'>{formErrors.find((issue) => issue.path[0] === 'email')?.message}</span>
                    )}
                </div>
                {/* Teléfono */}
                <div className='phonenumber'>
                    <label htmlFor='phonenumber'></label>
                    <input
                        type='text'
                        id='phonenumber'
                        name='phonenumber'
                        value={formData.phonenumber}
                        onChange={handleChange}
                        placeholder='Telefono'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'phonenumber') && (
                        <span className='error'>{formErrors.find((issue) => issue.path[0] === 'phonenumber')?.message}</span>
                    )}
                </div>
                {/* Dirección */}
                <div className='address'>
                    <label htmlFor='address'></label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                        value={formData.address}
                        onChange={handleChange}
                        placeholder='Dirección'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'address') && (
                        <span className='error'>{formErrors.find((issue) => issue.path[0] === 'address')?.message}</span>
                    )}
                </div>
                {/* Contraseña */}
                <div className='password'>
                    <label htmlFor='password'></label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Contraseña'
                    />
                    {formErrors?.find((issue) => issue.path[0] === 'password') && (
                        <span className='error'>{formErrors.find((issue) => issue.path[0] === 'password')?.message}</span>
                    )}
                </div>
                {/* Aceptación de términos */}
                <div className="terms">
                    <label htmlFor="terms">
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                          Acepto los <Link to="/terms"> términos y condiciones </Link>
                    </label>
                    {!termsAccepted && (
                        <span className="errorTerminos"> Debes aceptar los términos y condiciones</span>
                    )}
                </div>

                {serverError && <span className="error">{serverError}</span>}
                {signupSuccess && <span className="success">Registro exitoso</span>}
                {/* Botones de acción */}
                <div className='buttonAction'>
                    <button className='button-send' type='submit'> Crear
                        <TiThumbsUp size={20}/>
                    </button>
                </div>
                <div className="no-account">
                    <p>Ya tiene una cuenta? <Link to="/login">Inicia sesión aqui</Link></p>
                </div>
                </div>
        </form>
    );
}

export default SignUp;
