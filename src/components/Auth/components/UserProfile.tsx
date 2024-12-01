import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../../../redux/userSlices';
import axiosInstance from '../../../Api/axiosConfig';
import '../assets/UserProfile.css';

const baseURL = 'http://localhost:3000';

interface UserState {
  idUsuario: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  perfilImage: string | null;  // Cambié a perfilImage para que coincida con la respuesta del backend
}

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('authToken');
  const user = useSelector((state: { user: UserState }) => state.user);
  
  const [perfilImage, setPerfilImage] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    address: '',
    email: '',
    username: '',
    phone: '',
    profileImage: '',
  });

  useEffect(() => {
    if (token) {
      axiosInstance.get('/user/obtenerDatosUsuario')
        .then((response) => {
          const data = response.data;
          const relativeImageUrl = data.perfilImagen;
          const imageUrl = relativeImageUrl ? `${baseURL}${relativeImageUrl}` : null;
  
          // Despachar los datos al store de Redux
          dispatch(setUserId({
            idUsuario: data.idUsuario,
            username: data.nombreUsuario,
            email: data.email,
            address: data.direccion,
            phone: data.telefono,
            profileImage: imageUrl,
          }));

          // Prellenar estado local con los datos del usuario
          setUserData({
            address: data.direccion || '',
            email: data.email || '',
            username: data.nombreUsuario || '',
            phone: data.telefono || '',
            profileImage: data.perfilImagen || '',
          });
  
          // Guardar la imagen de perfil en localStorage si es válida
          if (imageUrl) {
            localStorage.setItem('profileImage', imageUrl);
          }
          
          setPerfilImage(imageUrl);  // Actualiza el estado local
        })
        .catch((error) => {
          console.error('Error al obtener los datos del usuario:', error);
        });
    }
  }, [token, dispatch]);
 

  useEffect(() => {
    // Leer la URL de la imagen de perfil de localStorage al cargar el componente
    const storedPerfilImage = localStorage.getItem('profileImage');
    if (storedPerfilImage) {
      setPerfilImage(storedPerfilImage);  // Usar la imagen guardada en localStorage si existe
    }
  }, []);

  useEffect(() => {
  }, [perfilImage]);  // Este efecto se ejecuta cada vez que perfilImage cambia

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setPerfilImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    const fileInput = document.getElementById('perfilImage') as HTMLInputElement;
  
    if (fileInput?.files?.[0]) {
      formData.append('profileImage', fileInput.files[0]); // Manda la imagen
    } else {
      alert('Por favor selecciona una imagen.');
      return;
    }
  
    try {
      const response = await axiosInstance.put(
        `/user/updateDataUser/${user.idUsuario}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // URL completa para la imagen de perfil
      const imageUrl = `${baseURL}${response.data.profileImage}`;
      // Actualizar Redux y localStorage
      dispatch(setUserId({ ...user, profileImage: imageUrl }));
  
      // Actualizar estado local
      setPerfilImage(imageUrl);
  
      alert('Cambio de imagen de perfil correctamente.');
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Hubo un error al subir la imagen. Por favor, inténtalo nuevamente.');
    }
  };

  return (
    <div className="user-profile">
      <h2>Mi Perfil</h2>
      <div className="profile-image-container">
        <label htmlFor="perfilImage" className="profile-image-label"> 
          <img
            src={perfilImage || 'https://via.placeholder.com/150'}  // Se usa la imagen de perfil desde el estado
            alt="Profile"
            className="profile-image"
          />
        </label>
        <input
          type="file"
          id="perfilImage"  // Ajuste a perfilImage
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
