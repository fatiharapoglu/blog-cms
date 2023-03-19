const FormatDate = (props) => {
    const { date } = props;
    const newDate = new Date(date);

    const format = () => {
        return newDate.toLocaleDateString("en-us", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return <>{format()}</>;
};

export default FormatDate;
