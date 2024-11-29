import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/userSlices'; // Asegúrate de importar la acción para actualizar el estado de Redux
import { obtenerDatosUsuario } from './api'; // obtener los datos
import '../assets/UserProfile.css'
const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token'); // Obtener el token desde localStorage o de Redux
  const user = useSelector((state: any) => state.user); // Obtén el usuario desde Redux

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    name: '',
    address: '',
    email: '',
    username: '',
    phone: '',
  });

  // Cargar los datos del usuario desde Redux o la API
  useEffect(() => {
    if (token) {
      // Si ya hay un token, obtenemos los datos del usuario de la API
      obtenerDatosUsuario(token)
        .then((data) => {
          // Actualiza los datos del usuario en el estado global de Redux
          dispatch(setUser(data));
          // También puedes prellenar los datos en el formulario
          setUserData({
            name: data.name,
            address: data.address,
            email: data.email,
            username: data.username,
            phone: data.phone,
          });
        })
        .catch((error) => {
          console.error('Error al obtener los datos del usuario:', error);
        });
    }
  }, [token, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos guardados:', userData);
    // Aquí puedes hacer una llamada a la API para actualizar los datos del usuario
    // Por ejemplo: actualizarDatosUsuario(userData)
  };

  return (
    <div className="user-profile">
      <h2>Mi Perfil</h2>
      <div className="profile-image-container">
        <label htmlFor="profileImage" className="profile-image-label">
          <img
            src={profileImage || user.profileImage || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="profile-image"
          />
        </label>
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>

      <form onSubmit={handleSubmit} className="user-info-form">
        <input
          type="text"
          name="name"
          placeholder="Nombre Completo"
          value={userData.name}
          onChange={handleInputChange}
          className="user-input"
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={userData.address}
          onChange={handleInputChange}
          className="user-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={userData.email}
          onChange={handleInputChange}
          className="user-input"
        />
        <input
          type="text"
          name="username"
          placeholder="Nombre de Usuario"
          value={userData.username}
          onChange={handleInputChange}
          className="user-input"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          value={userData.phone}
          onChange={handleInputChange}
          className="user-input"
        />
        <div className="buttons-container">
          <button type="button" className="cancel-button" onClick={() => window.location.href = '/'}>
            Cancelar
          </button>
          <button type="submit" className="save-button">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
