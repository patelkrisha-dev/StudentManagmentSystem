

var form = document.getElementById("studentForm");

var table = document.getElementById("studentTable");


var message = document.getElementById("message");

var search = document.getElementById("search");

var students = JSON.parse(localStorage.getItem("students")) || [];


function displayStudents(list) {

    table.innerHTML = "";

    for (var i = 0; i < list.length; i++) {

        var row = table.insertRow();

        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = list[i].name;
        row.insertCell(2).innerHTML = list[i].email;
        row.insertCell(3).innerHTML = list[i].gender;
        row.insertCell(4).innerHTML = list[i].course;
        row.insertCell(5).innerHTML = list[i].city;

        row.insertCell(6).innerHTML =
            '<button class="edit" onclick="editStudent(' + i + ')">Edit</button> ' +
            '<button class="delete" onclick="deleteStudent(' + i + ')">Delete</button>';
    }
}

function saveStudents() {

    localStorage.setItem("students", JSON.stringify(students));

}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var gender = document.getElementById("gender").value;
    var course = document.getElementById("course").value;
    var city = document.getElementById("city").value.trim();

    var editIndex = document.getElementById("editIndex").value;

    var student = {
        name: name,
        email: email,
        gender: gender,
        course: course,
        city: city
    };

   
    if (editIndex === "") {

        students.push(student);
        message.innerHTML = "Student added successfully";

    } else {

        students[editIndex] = student;
        message.innerHTML = "Student updated successfully";

    }

    saveStudents();

    displayStudents(students);

    form.reset();

    document.getElementById("editIndex").value = "";

    document.getElementById("submitBtn").innerHTML = "Add Student";

});


function editStudent(index) {

    var student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("gender").value = student.gender;
    document.getElementById("course").value = student.course;
    document.getElementById("city").value = student.city;

    document.getElementById("editIndex").value = index;

    document.getElementById("submitBtn").innerHTML = "Update Student";

    message.innerHTML = "";

}


function deleteStudent(index) {

    var confirmDelete = confirm("Do you want to delete this student?");

    if (confirmDelete) {

        students.splice(index, 1);

        saveStudents();

        displayStudents(students);

        message.innerHTML = "Student deleted successfully";

    }

}

search.addEventListener("keyup", function() {

    var value = search.value.toLowerCase();

    var filteredStudents = students.filter(function(student) {

        return student.name.toLowerCase().includes(value);

    });

    displayStudents(filteredStudents);

});


displayStudents(students);
