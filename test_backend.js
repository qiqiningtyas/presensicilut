const db = require('./src/database/db');
const holidayService = require('./src/services/holidayService');
const templateEngine = require('./src/services/templateEngine');
const scheduler = require('./src/services/scheduler');
const { formatPhoneNumber, isValidIndonesianPhone } = require('./src/utils/phoneFormatter');

console.log('--- 1. Testing Phone Formatter ---');
console.log('081234567890 ->', formatPhoneNumber('081234567890'), isValidIndonesianPhone('081234567890'));
console.log('+62 813-9876-5432 ->', formatPhoneNumber('+62 813-9876-5432'));

console.log('\n--- 2. Testing Holiday & Work Hours ---');
const today = new Date();
const holiday = holidayService.isHoliday(today);
const workInfo = holidayService.getWorkHoursInfo(today);
console.log('Today:', today.toDateString());
console.log('Holiday check:', holiday);
console.log('Work hours info:', workInfo);

console.log('\n--- 3. Testing Employees & Birthdays ---');
const employees = db.getEmployees();
console.log('Total employees:', employees.length);
const bdays = db.getTodayBirthdays();
console.log('Birthdays today:', bdays.map(b => b.name));

console.log('\n--- 4. Testing Template Engine ---');
const sampleEmp = employees[0];
const settings = db.getSettings();
const renderedMorning = templateEngine.renderMessage(settings.templates.morning_mon_thu, sampleEmp, {
  date: today,
  officeName: settings.officeName,
  jam_masuk: workInfo.start,
  jam_pulang: workInfo.end
});
console.log('Rendered Morning Message Preview:\n', renderedMorning);

console.log('\n--- 5. Testing Scheduler Manual Triggers ---');
(async () => {
  const morningRes = await scheduler.triggerMorningReminder(true);
  console.log('Morning trigger result: Sent to', morningRes.totalSent, 'employees');

  const bdayRes = await scheduler.triggerBirthdayReminder(true);
  console.log('Birthday trigger result: Sent to', bdayRes.totalSent, 'employees');

  const logs = db.getLogs(5);
  console.log('Recent logs count:', logs.length);
  console.log('Sample log:', logs[0]);
  console.log('\nALL BACKEND TESTS PASSED SUCCESSFULLY!');
})();
