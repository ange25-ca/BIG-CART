import '../assets/styles/SectionContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us">
      {/* Información de contacto */}
      <section className="contact-info">
        <h1>Contáctanos</h1>
        <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
        <div className="info-grid">
          <div className="info-item">
            <h2>Dirección</h2>
            <p>Calle Principal 123, Ciudad, País</p>
          </div>
          <div className="info-item">
            <h2>Teléfono</h2>
            <p>+1 (123) 456-7890</p>
          </div>
          <div className="info-item">
            <h2>Email</h2>
            <p>contacto@tuecommerce.com</p>
          </div>
        </div>
      </section>

      {/* Formulario de contacto */}
      <section className="contact-form">
        <h2>Envíanos un Mensaje</h2>
        <form>
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" placeholder="Tu nombre" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Tu email" required />

          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" placeholder="Escribe tu mensaje" required></textarea>

          <button type="submit">Enviar</button>
        </form>
      </section>

      {/* Mapa de Google */}
      <section className="map-container">
        <h2>Nuestra Ubicación</h2>
        <iframe
          title="Ubicación de Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.417239904124!2d144.963057915316!3d-37.8141079797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5775fd9cbb06f0!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1614862565768!5m2!1sen!2sau"
          loading="lazy"
        ></iframe>
      </section>

      {/* Redes sociales */}
      <section className="social-media">
        <h2>Síguenos en Redes Sociales</h2>
        <div className="social-icons">
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-instagram"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
