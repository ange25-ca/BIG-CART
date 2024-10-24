import React, { useState } from 'react';
import { z } from 'zod';


// Definir el esquema de validación usando Zod
const loginSchema = z.object({
  username: z
  .string()
  .min(1, {message: "El nombre del usuario es requerido"}),
  password: z
  .string()
  .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type FormData = z.infer<typeof loginSchema>;


//Se crea la función validacion del login
function Login() {
    const [formData, setFormData] = useState<FormData>({
        username: '.',
        password: '.',
    }) 

    //Se crea el estado para almacenar los errores
    const [formErrors, setFormErrors] = useState<z.ZodIssue[] | null>(null); 

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const {name, value} = event.target;
        setFormData({ ...formData, [name]: value});
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = loginSchema.safeParse(formData);

        if(!result.success) {
            setFormErrors(result.error.issues); //Almacenar los errores si la validacion falla
        } else {
            setFormErrors(null); 
            //Aqui se debe cambiar para mandar los datos del servidor al formulario
            console.log('Datos válidos:', result.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='username'>Nombre:</label>
                <input
                    type='text'
                    id='username'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                />
                {formErrors?.find((issue) => issue.path[0] === 'username') 
                && (
                    <span>
                        {/** Se muestra el mensaje de error para el campo "name" */}
                        {formErrors.find((issue) => issue.path[0] === 'username') ?.message}
                    </span>
                )}
            </div>
            <div>
                <label htmlFor='password'>Contraseña:</label>
                <input
                    type='text'
                    id='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}                
                />
                
                {formErrors?.find((issue) => issue.path[0] === 'password') 
                && (
                    <span>
                        {/** Se muestra el mensaje de error para el campo "password" */}
                        {formErrors.find((issue) => issue.path[0] === 'password') ?.message}
                    </span>
                )}
            </div>
            <button type='submit'>ENVIAR</button>
        </form>
    )
}

export default Login;