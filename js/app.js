// Get students from browser storage
let students = JSON.parse(localStorage.getItem("students")) || [];


// REGISTER STUDENT
const studentForm = document.getElementById("studentForm");

if (studentForm) {

    studentForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const student = {

            studentId: document.getElementById("studentId").value,
            studentName: document.getElementById("studentName").value,
            dob: document.getElementById("dob").value,
            gender: document.getElementById("gender").value,

            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,

            rollNumber: document.getElementById("rollNumber").value,
            department: document.getElementById("department").value,
            course: document.getElementById("course").value,
            year: document.getElementById("year").value,
            semester: document.getElementById("semester").value,
            college: document.getElementById("college").value,
            university: document.getElementById("university").value,

            tenth: Number(document.getElementById("tenth").value),
            twelfth: Number(document.getElementById("twelfth").value),

            cgpa: Number(document.getElementById("cgpa").value),
            attendance: Number(document.getElementById("attendance").value),
            backlogs: Number(document.getElementById("backlogs").value),
            activeBacklogs: Number(document.getElementById("activeBacklogs").value),

            skills: document.getElementById("skills").value,
            certifications: document.getElementById("certifications").value,
            projects: document.getElementById("projects").value,
            internship: document.getElementById("internship").value
        };


        students.push(student);

        localStorage.setItem("students", JSON.stringify(students));

        document.getElementById("message").textContent =
            "Student registered successfully!";

        studentForm.reset();
    });
}


// DISPLAY STUDENTS
const studentTable = document.getElementById("studentTable");

if (studentTable) {

    if (students.length === 0) {

        document.getElementById("noStudents").textContent =
            "No students registered yet.";

    } else {

        students.forEach(function(student) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.studentId}</td>
                <td>${student.studentName}</td>
                <td>${student.department}</td>
                <td>${student.cgpa}</td>
                <td>${student.attendance}%</td>
                <td>${student.activeBacklogs}</td>
            `;

            studentTable.appendChild(row);
        });
    }
}


// LOAD STUDENTS INTO ELIGIBILITY PAGE
const studentSelect = document.getElementById("studentSelect");

if (studentSelect) {

    students.forEach(function(student) {

        const option = document.createElement("option");

        option.value = student.studentId;
        option.textContent =
            student.studentId + " - " + student.studentName;

        studentSelect.appendChild(option);
    });
}


// CHECK ELIGIBILITY
function checkEligibility() {

    const selectedId =
        document.getElementById("studentSelect").value;

    if (selectedId === "") {

        alert("Please select a student.");

        return;
    }

    const student =
        students.find(s => s.studentId === selectedId);

    if (!student) {

        return;
    }


    let reasons = [];


    // Eligibility criteria
    if (student.cgpa < 7) {
        reasons.push("CGPA below 7.0");
    }

    if (student.attendance < 75) {
        reasons.push("Attendance below 75%");
    }

    if (student.tenth < 60) {
        reasons.push("10th percentage below 60%");
    }

    if (student.twelfth < 60) {
        reasons.push("12th/Diploma percentage below 60%");
    }

    if (student.activeBacklogs > 0) {
        reasons.push("Active backlogs present");
    }


    const result =
        document.getElementById("eligibilityResult");


    if (reasons.length === 0) {

        result.className = "eligible";

        result.innerHTML = `
            <h2>✓ ELIGIBLE</h2>

            <p><strong>Student:</strong>
            ${student.studentName}</p>

            <p>✓ CGPA: ${student.cgpa}</p>

            <p>✓ Attendance: ${student.attendance}%</p>

            <p>✓ 10th Percentage: ${student.tenth}%</p>

            <p>✓ 12th/Diploma Percentage: ${student.twelfth}%</p>

            <p>✓ Active Backlogs: ${student.activeBacklogs}</p>
        `;

    } else {

        result.className = "not-eligible";

        result.innerHTML = `
            <h2>❌ NOT ELIGIBLE</h2>

            <p><strong>Student:</strong>
            ${student.studentName}</p>

            <h3>Reasons:</h3>

            <ul>
                ${reasons.map(reason => `<li>❌ ${reason}</li>`).join("")}
            </ul>
        `;
    }
}


// DASHBOARD
if (document.getElementById("totalStudents")) {

    const total = students.length;

    let eligible = 0;

    let totalCgpa = 0;

    let totalAttendance = 0;


    students.forEach(function(student) {

        totalCgpa += student.cgpa;

        totalAttendance += student.attendance;


        if (
            student.cgpa >= 7 &&
            student.attendance >= 75 &&
            student.tenth >= 60 &&
            student.twelfth >= 60 &&
            student.activeBacklogs === 0
        ) {

            eligible++;
        }
    });


    const notEligible = total - eligible;

    const averageCgpa =
        total > 0 ? (totalCgpa / total).toFixed(2) : 0;

    const averageAttendance =
        total > 0 ? (totalAttendance / total).toFixed(2) : 0;


    document.getElementById("totalStudents").textContent = total;

    document.getElementById("eligibleStudents").textContent = eligible;

    document.getElementById("notEligibleStudents").textContent = notEligible;

    document.getElementById("averageCgpa").textContent = averageCgpa;

    document.getElementById("averageAttendance").textContent =
        averageAttendance + "%";
}