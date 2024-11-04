//importar el componente a pasar para esa ruta
import AboutUs from '../AboutUs/components/SectionAboutUs.tsx';
import Login from '../Auth/components/Login.tsx';
import Cart from '../Cart/Components/ShopCart.tsx';
import Home from '../Home/components/SectionHome.tsx';
import CatalogsProducts from "../Productos/components/SectionProducts.tsx";
import ContactUs from '../ContactUs/components/SectionContactUs.tsx';
import UserProfile from '../Auth/components/UserProfile.tsx';
import SignUp from '../Auth/components/SignUp.tsx';




// en este caso en vez de renderiza algun mensaje renderizaremos el
// componente importado
// En este array se manejaran todas las rutas y se agregaran las nuevas en caso de que se implementen
const routes = [
    { path: "/", element: <Home /> },
    { path: "/about-us", element: <AboutUs /> },
    { path: "/login", element: <Login /> },
    { path: "/cart", element: <Cart /> },
    { path: "/products", element: <CatalogsProducts /> },
    { path: "/contactus", element: <ContactUs/> },
    { path: "/signUp", element: <SignUp/> },
    {path: "/account", element: <UserProfile/>},
  ];

export default routes;