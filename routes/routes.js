//import dependencies
const express = require('express');
//const authMiddleware = require('../middleware/authentication');
const authMiddleware = require('../utils/authenticate');
//const payrollController = require('../controllers/payroll.controller');
const expenseController = require('../controllers/expense.controller');
const profileController = require('../controllers/profile.controller');
const leaveController = require('../controllers/leave.controller');
const deductionsController = require('../controllers/deduction.controller');
const employeeController = require('../controllers/employee.controller');
const salariesController = require('../controllers/salary.controller');
const attendanceController = require('../controllers/attendance.controller');
const timesheetController = require('../controllers/timesheet.controller');
const trainingController = require('../controllers/training.controller');
const timeOffController = require('../controllers/time_off_request.controller');
const payrollSettingsController = require('../controllers/payroll.controller');
const taxController = require('../controllers/tax.controller');
const leaveTypeController = require('../controllers/leave_type.controller');

//import utilities
const { verifySession, authenticate } = require('../utils');
const twofactorMiddleware = require('../utils/twoFactorAuth');
const passwordChecker = require('../utils/passwordChecker');

//import user controller
const userController = require('../controllers/user.controller');

const router = express.Router();

//router.use(authMiddleware.authenticate);

//User Routes

router.post('/signup', passwordChecker.validatePassword, userController.signup);
router.post('/login', userController.login);
router.get('/users/:id/access', authenticate, userController.getAccessToken);
router.patch('/users/:id', authenticate, verifySession, userController.updateUser);
router.post('/logout', verifySession, userController.logout);
router.get('/users',
    //authenticate, 
    //verifySession, 
    userController.getUsers);


//user profile Routes
router.post('/users/:id/profile', profileController.createProfile);
router.put('/users/:id/profile', profileController.updateProfile);
router.get('/users/:id/profile', profileController.getProfileById);
//router.post('/users/:id/profile/picture', profileController.uploadProfilePicture);
router.put('/users/:id/profile/picture', profileController.updateProfilePicture);
router.put('/users/:id/profile/avatar', profileController.updateAvatar)

router.post('/users/twofactor/generate', twofactorMiddleware.generateSecret);
router.post('/users/twofactor/verify', twofactorMiddleware.verifyToken, (req, res) => {
    res.status(200).send({ message: 'Verification successful' });
});


// Payroll routes
// router.post('/payrolls', payrollController.createPayroll);
// router.get('/payrolls', payrollController.getAllPayrolls);
// router.get('/payrolls/:id', payrollController.getPayrollById);
// router.put('/payrolls/:id', payrollController.updatePayroll);
// router.delete('/payrolls/:id', payrollController.deletePayroll);

// Employee routes
router.post('/employees', employeeController.createEmployee);
router.get('/employees', employeeController.getAllEmployees);
router.get('/employees/:id', employeeController.getEmployeeById);
router.put('/employees/:id', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

// Salary routes
router.post('/salaries', salariesController.createSalary);
router.get('/salaries', salariesController.getSalaries);
router.get('/salaries/:id', salariesController.getSalaryById);
router.put('/salaries/:id', salariesController.updateSalary);
router.delete('/salaries/:id', salariesController.deleteSalary);

// Attendance routes
router.post('/attendance', attendanceController.createAttendance);
router.get('/attendance', attendanceController.getAttendances);
router.get('/attendance/:employeeId', attendanceController.getAttendanceByEmployeeId);

// Timesheet routes
router.post('/timesheet', timesheetController.createTimesheet);
router.get('/timesheet', timesheetController.getTimesheets);
router.get('/timesheet/:id', timesheetController.getTimesheetById);

// Deductions routes
router.post('/deductions', deductionsController.createDeduction);
router.get('/deductions', deductionsController.getDeductions);
router.get('/deductions/:id', deductionsController.getDeductionById);
router.put('/deductions/:id', deductionsController.updateDeduction);
router.delete('/deductions/:id', deductionsController.deleteDeduction);


// Leave Type routes
router.post('/leave/types', leaveTypeController.createLeaveType);
router.get('/leave/types', leaveTypeController.getLeaveTypes);
router.get('/leave/types/:id', leaveTypeController.getLeaveTypeById);
router.put('/leave/types/:id', leaveTypeController.updateLeaveType);
router.delete('/leave/types/:id', leaveTypeController.deleteLeaveType);




// Payroll Settings routes
// router.get('/payroll/settings', payrollSettingsController.getPayrollSettings);
// router.put('/payroll/settings', payrollSettingsController.updatePayrollSettings);

// Time Off Request routes
router.post('/time-off/request', timeOffController.createTimeOffRequest);
router.get('/time-off/request', timeOffController.getAllTimeOffRequests);
router.get('/time-off/request/:id', timeOffController.getTimeOffRequestById);
router.put('/time-off/request/:id', timeOffController.updateTimeOffRequest);
router.delete('/time-off/request/:id', timeOffController.deleteTimeOffRequest);

// Training routes
router.post('/training', trainingController.createTraining);
router.get('/training', trainingController.getAllTrainings);
router.get('/training/:id', trainingController.getTrainingById);
router.put('/training/:id', trainingController.updateTraining);
router.delete('/training/:id', trainingController.deleteTraining);

//Leave Routes
router.post('/leave', leaveController.createLeave);
router.get('/leave', leaveController.getAllLeaves);
router.get('/leave/:id', leaveController.getLeaveById);
router.put('/leave/:id', leaveController.updateLeave);
router.delete('/leave/:id', leaveController.deleteLeave);

// Expense routes
router.post('/expenses', expenseController.createExpense);
router.get('/expenses', expenseController.getExpenses);
router.get('/expenses/:id', expenseController.getExpenseById);
router.put('/expenses/:id', expenseController.updateExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);



router.post('/taxes', taxController.createTax);
router.get('/taxes', taxController.getTaxes);
router.get('/taxes/:id', taxController.getTax);
router.put('/taxes/:id', taxController.updateTax);
router.delete('/taxes/:id', taxController.deleteTax);


module.exports = router;
