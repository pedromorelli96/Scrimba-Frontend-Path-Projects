import twitter_icon from "../assets/Twitter Icon.png";
import facebook_icon from "../assets/Facebook Icon.png";
import instagram_icon from "../assets/Instagram Icon.png";
import github_icon from "../assets/GitHub Icon.png";

export default function Footer() {
    return (
        <div className="footer">
            <img
                src={twitter_icon}
                alt="twitter icon"
                className="twitter-icon"
            />
            <img
                src={facebook_icon}
                alt="facebook icon"
                className="facebook-icon"
            />
            <img
                src={instagram_icon}
                alt="instagram icon"
                className="instagram-icon"
            />
            <img src={github_icon} alt="github icon" className="github-icon" />
        </div>
    );
}
