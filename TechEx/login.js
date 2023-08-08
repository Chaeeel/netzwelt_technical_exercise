// var jwt = localStorage.getItem("jwt");
// if (jwt != null) {
//   window.location.href = "./index.html";
// }


// function login() {
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//   const xhttp = new XMLHttpRequest();
//   xhttp.method("POST", "https://netzwelt-devtest.azurewebsites.net/Account/SignIn");
//   xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//   xhttp.send(
//     JSON.stringify({
//       username: username,
//       password: password,
//     })
//   );
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4) {
//       const objects = JSON.parse(this.responseText);
//       console.log(objects);
//       // if (objects["status"] == "ok") {
//         if (responseText.ok) {  
//       localStorage.setItem("jwt", objects["accessToken"]);
//         Swal.fire({
//           text: objects["message"],
//           icon: "success",
//           confirmButtonText: "OK",
//         }).then((result) => {
//           if (result.isConfirmed) {
//             window.location.href = "./index.html";
//           }
//         });
//       } else {
//         Swal.fire({
//           text: objects["message"],
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//       }
//     }
//   };
//   return false;
// }

const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    const response = await fetch('https://www.melivecode.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('userData', JSON.stringify(userData));
        window.location.href = 'index.html';
    } else {
        loginError.textContent = 'Invalid credentials';
    }
});

window.onload = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        window.location.href = 'login.html';
    } else {
        // Fetch and display hierarchical tree from the /Territories/All endpoint
        const treeResponse = await fetch('https://netzwelt-devtest.azurewebsites.net/Territories/All');
        const treeData = await treeResponse.json();
        const territoryTree = document.getElementById('territoryTree');
        displayTree(treeData, territoryTree);
    }
};

function displayTree(node, parentElement) {
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    li.textContent = node.name;
    ul.appendChild(li);

    if (node.children) {
        for (const child of node.children) {
            displayTree(child, ul);
        }
    }

    parentElement.appendChild(ul);
}

