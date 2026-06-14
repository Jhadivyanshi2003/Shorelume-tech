import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

export const exportToExcel = async (registrations) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Course Enrollments');

  // Set columns
  worksheet.columns = [
    { header: 'Registration ID', key: 'id', width: 30 },
    { header: 'Student Name', key: 'studentName', width: 20 },
    { header: 'Email', key: 'email', width: 25 },
    { header: 'Phone', key: 'phone', width: 15 },
    { header: 'College', key: 'college', width: 25 },
    { header: 'Branch', key: 'branch', width: 20 },
    { header: 'Year', key: 'year', width: 12 },
    { header: 'Course Enrolled', key: 'courseTitle', width: 35 },
    { header: 'Price Paid (INR)', key: 'price', width: 15 },
    { header: 'Payment Status', key: 'paymentStatus', width: 15 },
    { header: 'Transaction ID', key: 'transactionId', width: 25 },
    { header: 'Enrollment Date', key: 'createdAt', width: 20 }
  ];

  // Populate data rows
  registrations.forEach((reg) => {
    worksheet.addRow({
      id: reg._id.toString(),
      studentName: reg.userId ? reg.userId.name : 'N/A',
      email: reg.userId ? reg.userId.email : 'N/A',
      phone: reg.userId ? reg.userId.phone : 'N/A',
      college: reg.userId ? reg.userId.college : 'N/A',
      branch: reg.userId ? reg.userId.branch : 'N/A',
      year: reg.userId ? reg.userId.year : 'N/A',
      courseTitle: reg.courseId ? reg.courseId.title : 'Deleted Course',
      price: reg.courseId ? reg.courseId.price : 0,
      paymentStatus: reg.paymentStatus,
      transactionId: reg.transactionId || 'N/A',
      createdAt: new Date(reg.createdAt).toLocaleString()
    });
  });

  // Apply styling to the header row (bold, custom background)
  const headerRow = worksheet.getRow(1);
  headerRow.height = 25;
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 11 };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '002060' } // deep navy brand color matching flyer
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  // Add borders to cells
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle' };
      });
    }
  });

  return workbook;
};

export const exportUsersToExcel = async (users) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Registered Students');

  worksheet.columns = [
    { header: 'Student Name', key: 'name', width: 25 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Phone', key: 'phone', width: 18 },
    { header: 'College', key: 'college', width: 30 },
    { header: 'Branch', key: 'branch', width: 25 },
    { header: 'Year', key: 'year', width: 15 },
    { header: 'Role', key: 'role', width: 12 },
    { header: 'Registration Date', key: 'createdAt', width: 22 }
  ];

  users.forEach((u) => {
    worksheet.addRow({
      name: u.name,
      email: u.email,
      phone: u.phone,
      college: u.college,
      branch: u.branch,
      year: u.year,
      role: u.role || 'User',
      createdAt: new Date(u.createdAt).toLocaleString()
    });
  });

  const headerRow = worksheet.getRow(1);
  headerRow.height = 25;
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 11 };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '002060' } // deep navy brand color
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle' };
      });
    }
  });

  return workbook;
};

export const appendUserToExcelFile = async (user) => {
  try {
    const filename = path.resolve('students.xlsx');
    const workbook = new ExcelJS.Workbook();
    let worksheet;

    if (fs.existsSync(filename)) {
      try {
        await workbook.xlsx.readFile(filename);
        worksheet = workbook.getWorksheet('Registered Students');
      } catch (readError) {
        console.error('Error reading students.xlsx, creating clean file:', readError);
      }
    }

    if (!worksheet) {
      worksheet = workbook.addWorksheet('Registered Students');
    }

    // Setup columns if new sheet
    if (!worksheet.columns || worksheet.columns.length === 0) {
      worksheet.columns = [
        { header: 'Student Name', key: 'name', width: 25 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Phone', key: 'phone', width: 18 },
        { header: 'College', key: 'college', width: 30 },
        { header: 'Branch', key: 'branch', width: 25 },
        { header: 'Year', key: 'year', width: 15 },
        { header: 'Role', key: 'role', width: 12 },
        { header: 'Registration Date', key: 'createdAt', width: 22 }
      ];

      const headerRow = worksheet.getRow(1);
      headerRow.height = 25;
      headerRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 11 };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '002060' }
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
    }

    worksheet.addRow([
      user.name,
      user.email,
      user.phone,
      user.college,
      user.branch,
      user.year,
      user.role || 'User',
      new Date(user.createdAt || Date.now()).toLocaleString()
    ]);

    await workbook.xlsx.writeFile(filename);
    console.log(`Successfully appended student data for ${user.email} to students.xlsx`);
  } catch (error) {
    console.error('Failed to append user data to excel:', error);
  }
};

export const appendInternshipToExcelFile = async (application, user, internship) => {
  try {
    const filename = path.resolve('internship_applicants.xlsx');
    const workbook = new ExcelJS.Workbook();
    let worksheet;

    if (fs.existsSync(filename)) {
      try {
        await workbook.xlsx.readFile(filename);
        worksheet = workbook.getWorksheet('Internship Applicants');
      } catch (readError) {
        console.error('Error reading internship_applicants.xlsx, creating clean file:', readError);
      }
    }

    if (!worksheet) {
      worksheet = workbook.addWorksheet('Internship Applicants');
    }

    if (!worksheet.columns || worksheet.columns.length === 0) {
      worksheet.columns = [
        { header: 'Student Name', key: 'name', width: 25 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Phone', key: 'phone', width: 18 },
        { header: 'College', key: 'college', width: 30 },
        { header: 'Branch', key: 'branch', width: 25 },
        { header: 'Year', key: 'year', width: 15 },
        { header: 'Applied Internship', key: 'internshipTitle', width: 35 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Applied Date', key: 'createdAt', width: 22 }
      ];

      const headerRow = worksheet.getRow(1);
      headerRow.height = 25;
      headerRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 11 };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '002060' }
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
    }

    worksheet.addRow([
      user.name,
      user.email,
      user.phone,
      user.college,
      user.branch || 'N/A',
      user.year || 'N/A',
      internship.title,
      application.status || 'Applied',
      new Date(application.createdAt || Date.now()).toLocaleString()
    ]);

    await workbook.xlsx.writeFile(filename);
    console.log(`Successfully appended internship application for ${user.email} to internship_applicants.xlsx`);
  } catch (error) {
    console.error('Failed to append internship application to excel:', error);
  }
};

export const exportInternshipApplicationsToExcel = async (applications) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Internship Applicants');

  worksheet.columns = [
    { header: 'Student Name', key: 'name', width: 25 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Phone', key: 'phone', width: 18 },
    { header: 'College', key: 'college', width: 30 },
    { header: 'Branch', key: 'branch', width: 25 },
    { header: 'Year', key: 'year', width: 15 },
    { header: 'Applied Internship', key: 'internshipTitle', width: 35 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Applied Date', key: 'createdAt', width: 22 }
  ];

  applications.forEach((app) => {
    worksheet.addRow({
      name: app.userId ? app.userId.name : 'N/A',
      email: app.userId ? app.userId.email : 'N/A',
      phone: app.userId ? app.userId.phone : 'N/A',
      college: app.userId ? app.userId.college : 'N/A',
      branch: app.userId ? app.userId.branch : 'N/A',
      year: app.userId ? app.userId.year : 'N/A',
      internshipTitle: app.internshipId ? app.internshipId.title : 'Deleted Position',
      status: app.status || 'Applied',
      createdAt: new Date(app.createdAt).toLocaleString()
    });
  });

  const headerRow = worksheet.getRow(1);
  headerRow.height = 25;
  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 11 };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '002060' }
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle' };
      });
    }
  });

  return workbook;
};

export const updateInternshipStatusInExcelFile = async (userEmail, internshipTitle, newStatus) => {
  try {
    const filename = path.resolve('internship_applicants.xlsx');
    if (!fs.existsSync(filename)) return;

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filename);
    const worksheet = workbook.getWorksheet('Internship Applicants');
    if (!worksheet) return;

    let updated = false;
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const emailCell = row.getCell(2); // Email is column 2
        const titleCell = row.getCell(7); // Applied Internship is column 7
        if (emailCell.value === userEmail && titleCell.value === internshipTitle) {
          row.getCell(8).value = newStatus; // Status is column 8
          updated = true;
        }
      }
    });

    if (updated) {
      await workbook.xlsx.writeFile(filename);
      console.log(`Successfully updated status to ${newStatus} for ${userEmail} in internship_applicants.xlsx`);
    } else {
      console.warn(`Could not find row for ${userEmail} and ${internshipTitle} to update status to ${newStatus}`);
    }
  } catch (error) {
    console.error('Failed to update status in excel:', error);
  }
};
