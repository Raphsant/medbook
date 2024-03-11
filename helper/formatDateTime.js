function formatDateTime(dateTimeString) {
    // Create a Date object from the dateTimeString
    let date = new Date(dateTimeString);

    // Options for toLocaleString to get day of the week, date, and time in 12-hour format
    let options = {
        weekday: 'long', // day of the week
        day: '2-digit',  // day in two digits
        month: '2-digit', // month in two digits
        year: '2-digit',  // two-digit year
        hour: 'numeric',  // hour
        minute: 'numeric', // minutes
        hour12: true  // 12-hour format
    };

    // Convert to Spanish locale
    return date.toLocaleString('es-ES', options);
}

export default formatDateTime;