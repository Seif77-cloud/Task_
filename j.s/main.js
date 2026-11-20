const initialStudents = [
  { name: "إنجي", s1: 45, s2: 48, s3: 46, attend: 80 }
];

class Learner {
  constructor(fullName, s1, s2, s3, attend) {
    this.fullName = fullName;
    this.s1 = s1;
    this.s2 = s2;
    this.s3 = s3;
    this.attend = attend;
  }
  calcAvg() {
    return (this.s1 + this.s2 + this.s3) / 3;
  }
  calcStatus() {
    if (this.calcAvg() >= 50 && this.attend >= 75) {
      return "ناجح";
    } else {
      return "راسب";
    }
  }
}

let allLearners = initialStudents.map(d => new Learner(d.name, d.s1, d.s2, d.s3, d.attend));

const txtName = document.getElementById("txtName");
const txtSub1 = document.getElementById("txtSub1");
const txtSub2 = document.getElementById("txtSub2");
const txtSub3 = document.getElementById("txtSub3");
const txtAttend = document.getElementById("txtAttend");
const msgError = document.getElementById("msgError");
const boxStudents = document.getElementById("boxStudents");
const btnSave = document.getElementById("btnSave");
const countBadge = document.getElementById("countBadge");

function showStudents() {
  boxStudents.innerHTML = "";
  allLearners.forEach((st, i) => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML =
      "<h4>" + st.fullName + "</h4>" +
      "<p>المادة 1: " + st.s1 + " | المادة 2: " + st.s2 + " | المادة 3: " + st.s3 + "</p>" +
      "<p>الحضور: " + st.attend + " | المتوسط: " + st.calcAvg().toFixed(1) + " | الحالة: " + st.calcStatus() + "</p>" +
      "<button onclick='deleteStudent(" + i + ")'>حذف</button>";
    boxStudents.appendChild(div);
  });
  countBadge.textContent = allLearners.length + " طالب";
}

function deleteStudent(index) {
  allLearners.splice(index, 1);
  showStudents();
}

btnSave.onclick = function () {
  let name = txtName.value.trim();
  let s1 = Number(txtSub1.value);
  let s2 = Number(txtSub2.value);
  let s3 = Number(txtSub3.value);
  let attend = Number(txtAttend.value);

  if (name == "") {
    msgError.textContent = "اكتب اسم الطالب";
    return;
  }
  if (s1 < 0 || s1 > 100 || s2 < 0 || s2 > 100 || s3 < 0 || s3 > 100) {
    msgError.textContent = "الدرجات لازم تكون من 0 لـ 100";
    return;
  }
  if (attend < 0 || attend > 100) {
    msgError.textContent = "الحضور لازم يكون من 0 لـ 100";
    return;
  }

  msgError.textContent = "";
  let newStudent = new Learner(name, s1, s2, s3, attend);
  allLearners.push(newStudent);
  showStudents();

  txtName.value = "";
  txtSub1.value = "";
  txtSub2.value = "";
  txtSub3.value = "";
  txtAttend.value = "";
};

showStudents();