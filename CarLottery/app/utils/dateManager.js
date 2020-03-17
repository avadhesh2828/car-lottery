export default class DateManager {
  static getAgeInYears(dateOfBirth) {
    const currentDate = new Date();
    const seconds = (currentDate.getTime() - dateOfBirth.getTime()) / 1000;
    return seconds / (60 * 60 * 24 * 365);
  }

  static dateDiff(dateold, datenew) {
    const ynew = datenew.getFullYear();
    const mnew = datenew.getMonth();
    const dnew = datenew.getDate();
    const yold = dateold.getFullYear();
    const mold = dateold.getMonth();
    const dold = dateold.getDate();
    let diff = ynew - yold;
    if (mold > mnew) diff -= 1;
    else if (mold === mnew) {
      if (dold > dnew) diff -= 1;
    }
    return diff;
  }

  static formatDateToString(date) {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December',
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${day} ${monthNames[monthIndex]} ${year}`;
  }

  static formatDateWithDash(date) {
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    const year = date.getFullYear();
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    return [day, month, year].join('-');
  }

  static formatReverseDateWithDash(date) {
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;
    const year = date.getFullYear();
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    return [year, month, day].join('-');
  }

  static lessThan24Hours(modifiedDate) {
    // const lastDate = modifiedDate.replace(' ', 'T') + 'Z';
    const timeDiff = new Date().getTime() - new Date(modifiedDate).getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    if (daysDiff <= 1) {
      return true;
    }
    return false;
  }
}
