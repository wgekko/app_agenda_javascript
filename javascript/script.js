//validar datos del formulario antes de agregarlos

function validerForum() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var adress = document.getElementById("adress").value;
    var email = document.getElementById("email").value;

    if (name == "") {
        alert("Verifique nombre ingresado");
        return false;
    }

    if (age == "") {
        alert("Verifique años no puede ser nulo");
        return false
    }
    else if (age < 18) {
        alert("dato invalido debe ser mayor a 18 años");
        return false;
    }

    if (adress == "") {
        alert("Verifique link de linkedIn no debe ser nulo");
        return false;
    }
    if (adress.includes(" https://")){
        alert("Verifique su link de LinkedIn");
        return false;
    }

    if (email == "") {
        alert("Verifique  dirección de Email no debe ser nulo " );
        return false
    }
    else if (!email.includes("@")) {
        alert("Email es inválido");
        return false;
    }
    else if (!email.includes(".")) {
        alert("Email es inválido");
        return false;
    }
    return true;
}
function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";
    peopleList.forEach(function (element, index) {
        html += "<tr>"
        html += "<td>" + element.name + "</td>"
        html += "<td>" + element.age + "</td>"
        html += "<td>" + element.adress + "</td>"
        html += "<td>" + element.email + "</td>"
        html += "<td>" + '<button onclick="borrarData(' +
         index +')" class="btn btn-danger" >Borrar</button><button onclick = "editarData(' +
         index +')" class="btn btn-info m-2" >Editar</button ></td>';
        html += "</tr>";
    });    

    document.querySelector("#crudTable tbody").innerHTML = html;

}
// mostramos todos los datos
document.onload = showData();

// funcion de agregar datos desde el local storage

function addData() {
    // si los datos hna sidos validados
    if (validerForum() == true) {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var adress = document.getElementById("adress").value;
        var email = document.getElementById("email").value;

        var peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name: name,
            age: age,
            adress: adress,
            email: email,
        })

        localStorage.setItem("peopleList", JSON.stringify
            (peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("adress").value = "";
        document.getElementById("email").value = "";
    }
}

// funcion de borrado de datos del local storage
function borrarData(index) {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

// funcion donde se edita y actualiza los datos del local storage

function editarData(index) {
    // 
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("adress").value = peopleList[index].adress;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function () {
        if (validerForum() == true) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].adress = document.getElementById("adress").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData()

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("adress").value = "";
            document.getElementById("email").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }

    }

}