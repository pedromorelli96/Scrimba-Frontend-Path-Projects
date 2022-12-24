import TravelCard from "./TravelCard";
import travelData from "../data";

export default function Journal() {
    const travelCards = travelData.map((travelInfo) => {
        return <TravelCard travelInfo={travelInfo} key={travelInfo.id} />;
    });
    return <section className="journal">{travelCards}</section>;
}
