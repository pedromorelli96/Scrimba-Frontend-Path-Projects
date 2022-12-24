import globe_icon from "../assets/Globe Icon.png";

export default function Header() {
    return (
        <section className="header">
            <img src={globe_icon} alt="header icon" className="header--icon" />
            <p className="header--text">my travel journal.</p>
        </section>
    );
}
