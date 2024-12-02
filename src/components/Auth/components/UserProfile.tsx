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
  phonenumber: string;
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
    phonenumber: '',
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
            phonenumber: data.telefono,
            profileImage: imageUrl,
          }));

          // Prellenar estado local con los datos del usuario
          setUserData({
            address: data.direccion || '',
            email: data.email || '',
            username: data.nombreUsuario || '',
            phonenumber: data.telefono || '',
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
  
    // Creamos un FormData
    const formData = new FormData();
    const fileInput = document.getElementById('perfilImage') as HTMLInputElement;
  
    // Verificar si la imagen ha sido modificada
    if (fileInput?.files?.[0]) {
      formData.append('profileImage', fileInput.files[0]);
    }
  
    // Mapeamos los datos del formulario a los nombres correctos para el backend
    if (userData.username !== user.username) {
      formData.append('username', userData.username);
    }
  
    if (userData.email !== user.email) {
      formData.append('email', userData.email);
    }
  
    if (userData.address !== user.address) {
      formData.append('address', userData.address);
    }
  
    if (userData.phonenumber !== user.phonenumber) {
      formData.append('phonenumber', userData.phonenumber);
    }

    // Verificar si se han hecho cambios
    const hasChanges = Array.from(formData.entries()).length > 0;
    if (!hasChanges) {
      alert('No se han realizado cambios.');
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
  
      // Asignar la nueva URL de la imagen al estado
      const imageUrl = response.data.profileImage ? `${baseURL}${response.data.profileImage}` : perfilImage;
  
      // Actualizar Redux con los nuevos datos
      dispatch(setUserId({
        ...user,
        username: userData.username,
        email: userData.email,
        address: userData.address,
        phonenumber: userData.phonenumber,
        profileImage: imageUrl,
      }));
  
      // Guardar la imagen en localStorage
      if (imageUrl) {
        localStorage.setItem('profileImage', imageUrl);
      }
  
      // Actualizar el estado local de la imagen
      setPerfilImage(imageUrl);
  
      alert('Datos guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Hubo un error al guardar los datos. Por favor, inténtalo nuevamente.');
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
          name="phonenumber"
          placeholder="Teléfono"
          value={userData.phonenumber || ''}
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
