// Get query params from index.html
const params = new URLSearchParams(window.location.search);
const studentName = params.get('studentName');
const rollNo = params.get('rollNo');
const className = params.get('class');
const year = params.get('year');
const semester = params.get('semester');

// Show student details at the top of attendance page
const studentDetailsDiv = document.getElementById('studentDetails');
studentDetailsDiv.innerHTML = `
  <h3>Student Details</h3>
  <p><strong>Name:</strong> ${studentName}</p>
  <p><strong>Roll No:</strong> ${rollNo}</p>
  <p><strong>Class:</strong> ${className}</p>
  <p><strong>Academic Year:</strong> ${year}</p>
  <p><strong>Semester:</strong> ${semester}</p>
`;

function calculateAttendance() {
  const co = parseInt(document.getElementById('co').value) || 0;
  const adsj = parseInt(document.getElementById('adsj').value) || 0;
  const dbms = parseInt(document.getElementById('dbms').value) || 0;
  const wtlab = parseInt(document.getElementById('wtlab').value) || 0;
  const others = parseInt(document.getElementById('others').value) || 0;

  const totalClasses = 23 + 28 + 18 + 17 + 5; // 91
  const attendedClasses = co + adsj + dbms + wtlab + others;

  const percentage = Math.round((attendedClasses / totalClasses) * 100);

  const resultBox = document.getElementById('result');
  resultBox.innerHTML = `
    <h3>Attendance Summary</h3>
    <p><strong>Total Classes:</strong> ${totalClasses}</p>
    <p><strong>Classes Attended:</strong> ${attendedClasses}</p>
    <p><strong>Attendance Percentage:</strong> ${percentage}%</p>
  `;

  if (percentage < 75) {
    resultBox.innerHTML += `<p style="color:red;">⚠️ Short Attendance! Work Hard!</p>`;
  } else {
    resultBox.innerHTML += `<p style="color:green;">✅ Good! Keep it up!</p>`;
  }
}
function saveAttendance() {
  // Get values from inputs
  const studentName = getQueryParam('studentName');
  const rollNo = getQueryParam('rollNo');
  const className = getQueryParam('class');
  const year = getQueryParam('year');
  const semester = getQueryParam('semester');

  const co = parseInt(document.getElementById('co').value) || 0;
  const adsj = parseInt(document.getElementById('adsj').value) || 0;
  const dbms = parseInt(document.getElementById('dbms').value) || 0;
  const wtlab = parseInt(document.getElementById('wtlab').value) || 0;
  const others = parseInt(document.getElementById('others').value) || 0;

  const attendedClasses = co + adsj + dbms + wtlab + others;
  const totalClasses = 23 + 28 + 18 + 17 + 5; // or pull dynamically!
  const percentage = Math.round((attendedClasses / totalClasses) * 100);

  // Add to Firestore
  db.collection("attendanceRecords").add({
    studentName: studentName,
    rollNo: rollNo,
    class: className,
    year: year,
    semester: semester,
    co: co,
    adsj: adsj,
    dbms: dbms,
    wtlab: wtlab,
    others: others,
    totalAttended: attendedClasses,
    totalClasses: totalClasses,
    percentage: percentage
  })
  .then(() => {
    alert("✅ Attendance saved successfully!");
  })
  .catch((error) => {
    alert("❌ Error saving attendance: " + error);
  });
}
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

