import "./Hero.css";
import comillas from "../../utils/images/comillas.svg";
export default function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-title">
        Bienvenidos <br /> a <span className="platita">Platita</span>
      </h1>
      <div className="hero-sub-container">
        <p className="hero-sub">
          Donde conseguís trabajo <br />
          tan rápido como
          <br />
          alguien lo publique
        </p>
        <img src={comillas} alt="comillas" className="hero-comillas" />
      </div>
    </section>
  );
}
