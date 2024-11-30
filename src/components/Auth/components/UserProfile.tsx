import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../../../redux/userSlices';
import axiosInstance from '../../../Api/axiosConfig';
import '../assets/UserProfile.css';

interface UserState {
  idUsuario: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  profileImage: string | null;
}

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('authToken');
  const user = useSelector((state: { user: UserState }) => state.user); // Usamos la interfaz UserState
  
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    address: '',
    email: '',
    username: '',
    phone: '',
  });

  // Cargar los datos del usuario desde la API
  useEffect(() => {
    if (token) {
      axiosInstance.get('/user/obtenerDatosUsuario')
        .then((response) => {
          const data = response.data;
          // Despachar datos a Redux
          dispatch(setUserId({
            idUsuario: data.idUsuario,
            username: data.nombreUsuario,
            email: data.email,
            address: data.direccion,
            phone: data.telefono,
            profileImage: data.profileImage,
          }));

          // Prellenar estado local con los datos del usuario
          setUserData({
            address: data.direccion || '',
            email: data.email || '',
            username: data.nombreUsuario || '',
            phone: data.telefono || '',
          });

          setProfileImage(data.profileImage || null);
        })
        .catch((error) => {
          console.error('Error al obtener los datos del usuario:', error);
        });
    }
  }, [token, dispatch]);

  // Sincronizar el estado local con los datos de Redux si cambian
  useEffect(() => {
    if (user) {
      setUserData({
        address: user.address || '',
        email: user.email || '',
        username: user.username || '',
        phone: user.phone || '',
      });
      setProfileImage(user.profileImage || null);
    }
  }, [user]);

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    //Se despacha los datos a Redux
    dispatch(setUserId({
      idUsuario: user.idUsuario,
      ...userData,
      profileImage: profileImage,
    }));
    //Aqui iria el ajuste de ka imagen
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

      <form className="user-info-form" onSubmit={handleSave}>
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={userData.address || ''}
          onChange={handleInputChange}
          className="user-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={userData.email || ''}
          onChange={handleInputChange}
          className="user-input"
        />
        <input
          type="text"
          name="username"
          placeholder="Nombre de Usuario"
          value={userData.username || ''}
          onChange={handleInputChange}
          className="user-input"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          value={userData.phone || ''}
          onChange={handleInputChange}
          className="user-input"
        />
        <div className="buttons-container">
          <button type="button" className="cancel-button" onClick={() => window.location.href = '/'}>Cancelar</button>
          <button type="submit" className="save-button">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
