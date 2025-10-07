// workingHours middleware
// options: { startHour: number (inclusive), endHour: number (exclusive) }
module.exports = function workingHours(options) {
  const startHour = options && options.startHour != null ? options.startHour : 9;
  const endHour = options && options.endHour != null ? options.endHour : 17;

  return function (req, res, next) {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours();

    const isWeekday = day >= 1 && day <= 5;
    const inWorkingHours = hour >= startHour && hour < endHour;

    if (isWeekday && inWorkingHours) {
      return next();
    }

    // If not working hours, render closed page
    res.status(200).render('closed', { title: 'We are closed' });
  };
};
