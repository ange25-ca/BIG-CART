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
