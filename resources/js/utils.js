export const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.visibility = 'visible';
                entry.target.classList.add('rotateXIn');
            }, 250);
        }
    });
});

const findYear = value => value.getFullYear()
const findMonth = value => {
    const number = value.getMonth() + 1;
    let word;
    switch (number) {
        case 1:
            word = 'января';
            break;
        case 2:
            word = 'февраля';
            break;
        case 3:
            word = 'марта';
            break;
        case 4:
            word = 'апреля';
            break;
        case 5:
            word = 'мая';
            break;
        case 6:
            word = 'июня';
            break;
        case 7:
            word = 'июля';
            break;
        case 8:
            word = 'августа';
            break;
        case 9:
            word = 'сентября';
            break;
        case 10:
            word = 'октября';
            break;
        case 11:
            word = 'ноября';
            break;
        case 12:
            word = 'декабря';
            break;
    }
    return word;
}

const findDay = value => value.getDate()

export const defineHumanDate = (machineDate) => {
    const date = new Date(machineDate);
        const year = findYear(date)
        const month = findMonth(date)
        const day = findDay(date)
        return `${day} ${month} ${year}`
}
