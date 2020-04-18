export function getDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`
};

export const getIcon = (cat) => {
    switch (cat) {
        case "Phone":
            return "phone";
        case "Reminder":
            return "calendar";
        case "Meeting":
            return "group";
        case "Assignment":
            return "bar-chart";
        case "To do":
            return "pencil";
        default:
            return "none"
    }
}
