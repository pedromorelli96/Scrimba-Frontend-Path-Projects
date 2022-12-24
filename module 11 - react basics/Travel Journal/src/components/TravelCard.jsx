import marker_icon from "../assets/Marker Icon.png";

export default function TravelCard(props) {
    return (
        <div className="travel-card">
            <div className="travel-card--img-container">
                <img
                    src={props.travelInfo.imageUrl}
                    alt="travel card image"
                    className="travel-card--img"
                />
            </div>
            <div className="travel-card--content">
                <div className="travel-card--location-info">
                    <img
                        src={marker_icon}
                        alt="marker icon"
                        className="travel-card--marker"
                    />
                    <p className="travel-card--location">
                        {props.travelInfo.location}
                    </p>
                    <a
                        href={props.travelInfo.googleMapsUrl}
                        target="_blank"
                        className="travel-card--google-maps"
                    >
                        View on Google Maps
                    </a>
                </div>
                <h2 className="travel-card--title">{props.travelInfo.title}</h2>
                <p className="travel-card--date">
                    {`${props.travelInfo.startDate} - ${props.travelInfo.endDate}`}
                </p>
                <p className="travel-card--description">
                    {props.travelInfo.description}
                </p>
            </div>
        </div>
    );
}
