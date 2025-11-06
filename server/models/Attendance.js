import mongoose from 'mongoose';

// Sub-schema for individual meal attendance
const MealAttendanceSchema = new mongoose.Schema(
  {
    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'eveningSnacks', 'dinner'],
      required: true,
    },
    isPresent: {
      type: Boolean,
      default: true,
    },
    markedAt: {
      type: Date,
      default: Date.now,
    },
    markedBy: {
      type: String,
      enum: ['student', 'manager', 'system'],
      default: 'student',
    },
  },
  { _id: false }
);

// Main Attendance Schema
const AttendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student ID is required'],
      index: true,
    },
    messId: {
      type: String,
      required: [true, 'Mess ID is required'],
      index: true,
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      index: true,
    },
    dayOfWeek: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      // REMOVED: required: true (since it's auto-calculated)
    },
    meals: {
      type: [MealAttendanceSchema],
      default: [],
    },
    isOnLeave: {
      type: Boolean,
      default: false,
    },
    leaveReason: {
      type: String,
      enum: ['vacation', 'sick_leave', 'home_visit', 'emergency', 'other'],
    },
    leaveDescription: {
      type: String,
      trim: true,
      maxlength: [500, 'Leave description cannot exceed 500 characters'],
    },
    leaveStartDate: {
      type: Date,
    },
    leaveEndDate: {
      type: Date,
    },
    totalMealsPresent: {
      type: Number,
      default: 0,
      min: 0,
      max: 4,
    },
    totalMealsAbsent: {
      type: Number,
      default: 0,
      min: 0,
      max: 4,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'confirmed',
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for better query performance
AttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });
AttendanceSchema.index({ messId: 1, date: 1 });
AttendanceSchema.index({ studentId: 1, date: 1, messId: 1 });
AttendanceSchema.index({ date: 1, isOnLeave: 1 });

// Pre-save middleware to calculate meal counts and set day of week
AttendanceSchema.pre('save', function (next) {
  // Set day of week from date
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  this.dayOfWeek = days[new Date(this.date).getDay()];
  
  // Calculate meal counts
  if (this.isOnLeave) {
    this.totalMealsPresent = 0;
    this.totalMealsAbsent = 4;
    this.meals = [];
  } else {
    this.totalMealsPresent = this.meals.filter((meal) => meal.isPresent).length;
    this.totalMealsAbsent = this.meals.filter((meal) => !meal.isPresent).length;
  }
  
  next();
});

// Validate leave dates
AttendanceSchema.pre('save', function (next) {
  if (this.isOnLeave && this.leaveStartDate && this.leaveEndDate) {
    if (this.leaveEndDate < this.leaveStartDate) {
      next(new Error('Leave end date must be after start date'));
    }
  }
  next();
});

// Method to mark attendance for a specific meal
AttendanceSchema.methods.markMealAttendance = function (mealType, isPresent, markedBy = 'student') {
  const existingMeal = this.meals.find((meal) => meal.mealType === mealType);
  
  if (existingMeal) {
    existingMeal.isPresent = isPresent;
    existingMeal.markedAt = new Date();
    existingMeal.markedBy = markedBy;
  } else {
    this.meals.push({
      mealType,
      isPresent,
      markedAt: new Date(),
      markedBy,
    });
  }
};

// Static method to get attendance for a student in a date range
AttendanceSchema.statics.getAttendanceByDateRange = async function (studentId, startDate, endDate) {
  return await this.find({
    studentId,
    date: { $gte: startDate, $lte: endDate },
  }).sort({ date: 1 });
};

// Static method to get monthly attendance for a student
AttendanceSchema.statics.getMonthlyAttendance = async function (studentId, month, year) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);
  
  return await this.find({
    studentId,
    date: { $gte: startDate, $lte: endDate },
  })
    .sort({ date: 1 })
    .populate('studentId', 'name email registrationNumber');
};

// Static method to get attendance summary for billing
AttendanceSchema.statics.getAttendanceSummary = async function (studentId, month, year) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);
  
  const attendanceRecords = await this.find({
    studentId,
    date: { $gte: startDate, $lte: endDate },
  });
  
  let totalDays = 0;
  let presentDays = 0;
  let absentDays = 0;
  let totalMealsPresent = 0;
  let totalMealsAbsent = 0;
  
  attendanceRecords.forEach((record) => {
    totalDays++;
    if (record.isOnLeave || record.totalMealsPresent === 0) {
      absentDays++;
    } else {
      presentDays++;
    }
    totalMealsPresent += record.totalMealsPresent;
    totalMealsAbsent += record.totalMealsAbsent;
  });
  
  return {
    totalDays,
    presentDays,
    absentDays,
    totalMealsPresent,
    totalMealsAbsent,
    attendancePercentage: totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0,
  };
};

// Static method to register leave for multiple days
AttendanceSchema.statics.registerLeave = async function (studentId, messId, startDate, endDate, reason, description) {
  const attendanceRecords = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    const existingAttendance = await this.findOne({
      studentId,
      date: new Date(date),
    });
    
    if (existingAttendance) {
      existingAttendance.isOnLeave = true;
      existingAttendance.leaveReason = reason;
      existingAttendance.leaveDescription = description;
      existingAttendance.leaveStartDate = startDate;
      existingAttendance.leaveEndDate = endDate;
      await existingAttendance.save();
      attendanceRecords.push(existingAttendance);
    } else {
      const newAttendance = await this.create({
        studentId,
        messId,
        date: new Date(date),
        isOnLeave: true,
        leaveReason: reason,
        leaveDescription: description,
        leaveStartDate: startDate,
        leaveEndDate: endDate,
      });
      attendanceRecords.push(newAttendance);
    }
  }
  
  return attendanceRecords;
};

// Static method to get mess-wise attendance for a date
AttendanceSchema.statics.getMessAttendance = async function (messId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return await this.find({
    messId,
    date: { $gte: startOfDay, $lte: endOfDay },
  })
    .populate('studentId', 'name registrationNumber hostelId')
    .sort({ studentId: 1 });
};

export default mongoose.model('Attendance', AttendanceSchema);
