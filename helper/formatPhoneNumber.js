function formatPhoneNumber(number) {
    // Check if the first character is '0' and remove it
    if (number.startsWith('0')) {
        number = number.substring(1);
    }

    // Add the country code '+58'
    return '+58' + number;
}

export default formatPhoneNumber