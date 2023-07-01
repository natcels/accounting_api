//import dependencies
const express = require('express');
const authMiddleware = require('../middleware/authentication');
const payrollController = require('../controllers/payroll.controller');
const profileController = require('../controllers/profile.controller');


//import utilities
const { verifySession, authenticate } = require('../utils');
const twofactorMiddleware = require('../utils/twoFactorAuth');
const passwordChecker = require('../utils/passwordChecker');

//import user controller
const userController = require('../controllers/user.controller');

const router = express.Router();

router.use(authMiddleware.authenticate);
//User Routes

router.post('/signup', passwordChecker.validatePassword, userController.signup);
router.post('/login', userController.login);


router.get('/users/:id/access', authenticate, userController.getAccessToken);
router.patch('/users/:id', authenticate, verifySession, userController.updateUser);
router.post('/logout', verifySession, userController.logout);
router.get('/users', authenticate, verifySession, userController.getUsers);


//user profile Routes
router.post('/users/:id/profile', profileController.createProfile);
router.put('/users/:id/profile', profileController.updateProfile);
router.get('/users/:id/profile', profileController.getProfileById);
router.post('/users/:id/profile/picture', profileController.uploadProfilePicture);
router.put('/users/:id/profile/picture', profileController.updateProfilePicture);
router.put('/users/:id/profile/avatar', profileController.updateAvatar)

router.post('/users/twofactor/generate', twofactorMiddleware.generateSecret);
router.post('/users/twofactor/verify', twofactorMiddleware.verifyToken, (req, res) => {
    res.status(200).send({ message: 'Verification successful' });
});


// Payroll routes
router.post('/payrolls', payrollController.createPayroll);
router.get('/payrolls', payrollController.getAllPayrolls);
router.get('/payrolls/:id', payrollController.getPayrollById);
router.put('/payrolls/:id', payrollController.updatePayroll);
router.delete('/payrolls/:id', payrollController.deletePayroll);

// Employee routes
router.post('/employees', payrollController.createEmployee);
router.get('/employees', payrollController.getAllEmployees);
router.get('/employees/:id', payrollController.getEmployeeById);
router.put('/employees/:id', payrollController.updateEmployee);
router.delete('/employees/:id', payrollController.deleteEmployee);

// Salary routes
router.post('/salaries', payrollController.createSalary);
router.get('/salaries', payrollController.getAllSalaries);
router.get('/salaries/:id', payrollController.getSalaryById);
router.put('/salaries/:id', payrollController.updateSalary);
router.delete('/salaries/:id', payrollController.deleteSalary);

// Attendance routes
router.post('/attendance', payrollController.markAttendance);
router.get('/attendance', payrollController.getAllAttendance);
router.get('/attendance/:employeeId', payrollController.getAttendanceByEmployeeId);

// Timesheet routes
router.post('/timesheet', payrollController.submitTimesheet);
router.get('/timesheet', payrollController.getAllTimesheets);
router.get('/timesheet/:id', payrollController.getTimesheetById);

// Deductions routes
router.post('/deductions', payrollController.createDeduction);
router.get('/deductions', payrollController.getAllDeductions);
router.get('/deductions/:id', payrollController.getDeductionById);
router.put('/deductions/:id', payrollController.updateDeduction);
router.delete('/deductions/:id', payrollController.deleteDeduction);

// Expense routes
router.post('/expenses', payrollController.createExpense);
router.get('/expenses', payrollController.getAllExpenses);
router.get('/expenses/:id', payrollController.getExpenseById);
router.put('/expenses/:id', payrollController.updateExpense);
router.delete('/expenses/:id', payrollController.deleteExpense);

// Leave Type routes
router.post('/leave/types', payrollController.createLeaveType);
router.get('/leave/types', payrollController.getAllLeaveTypes);
router.get('/leave/types/:id', payrollController.getLeaveTypeById);
router.put('/leave/types/:id', payrollController.updateLeaveType);
router.delete('/leave/types/:id', payrollController.deleteLeaveType);

// Leave routes
router.post('/leave', payrollController.createLeave);
router.get('/leave', payrollController.getAllLeaves);
router.get('/leave/:id', payrollController.getLeaveById);
router.put('/leave/:id', payrollController.updateLeave);
router.delete('/leave/:id', payrollController.deleteLeave);

// Payroll Settings routes
router.get('/payroll/settings', payrollController.getPayrollSettings);
router.put('/payroll/settings', payrollController.updatePayrollSettings);

// Time Off Request routes
router.post('/time-off/request', payrollController.createTimeOffRequest);
router.get('/time-off/request', payrollController.getAllTimeOffRequests);
router.get('/time-off/request/:id', payrollController.getTimeOffRequestById);
router.put('/time-off/request/:id', payrollController.updateTimeOffRequest);
router.delete('/time-off/request/:id', payrollController.deleteTimeOffRequest);

// Training routes
router.post('/training', payrollController.createTraining);
router.get('/training', payrollController.getAllTrainings);
router.get('/training/:id', payrollController.getTrainingById);
router.put('/training/:id', payrollController.updateTraining);
router.delete('/training/:id', payrollController.deleteTraining);


module.exports = router;
