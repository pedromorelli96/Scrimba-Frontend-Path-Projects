import profile_picture from "../assets/Profile Picture.png";
import button_email_icon from "../assets/Button Email Icon.png";
import button_linkedin_icon from "../assets/Button Linkedin Icon.png";

export default function Info() {
    return (
        <div className="info">
            <img
                src={profile_picture}
                alt="profile picture"
                className="profile_picute"
            />
            <h1 className="name">Pedro Morelli</h1>
            <h4 className="job-title">Frontend Developer</h4>
            <p className="website-title">pedromorelli.website</p>
            <div className="contact-buttons">
                <a href="#" className="email-btn">
                    <img
                        src={button_email_icon}
                        alt="email icon"
                        className="email-btn-icon"
                    />
                    <p className="email-btn-text">Email</p>
                </a>
                <a href="#" className="linkedin-btn">
                    <img
                        src={button_linkedin_icon}
                        alt="linkedin icon"
                        className="linkedin-btn-icon"
                    />
                    <p className="linkedin-btn-text">Linkedin</p>
                </a>
            </div>
        </div>
    );
}
