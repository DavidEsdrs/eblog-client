import styled from "styled-components";
import moment from "moment";

const Container = styled.span`
    position: absolute;
    background-color: white;
    padding: 2px 10px;
    border-radius: 10px;
    right: 5px;
    bottom: 5px;
    font-weight: 300;
    font-style: italic;
`;

function DateBadge({ 
    created_at, 
    relative = false, 
    locale="en-GB", 
    format = { year: "numeric", month: "long", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h12" } 
}) {
    const intervalSinceDate = (date) => {
        const startDate = moment(date);
        const endDate = moment(new Date());
        const duration = moment.duration(endDate.diff(startDate));
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        return { days, hours, minutes, seconds };
    }

    const fixDateToTimespan = (date) => {
        const timeSince = intervalSinceDate(date);
        let text = "";
        if(timeSince.days > 0) {
            text = timeSince.days === 1 ? `yersteday` : `${timeSince.days} days ago`

        } else if(timeSince.hours > 0) {
            text = timeSince.hours === 1 ? `last hour` : `${timeSince.hours} hours ago`

        } else if(timeSince.minutes > 0) {
            text = timeSince.minutes === 1 ? `now` : `${timeSince.minutes} minutes ago`
        }
        return text;
    }

    return (  
        <Container>
            {relative ?
                fixDateToTimespan(created_at) : 
                new Date(created_at).toLocaleDateString(locale, format)
            }
        </Container>
    );
}

export { DateBadge };