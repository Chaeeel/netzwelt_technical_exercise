var jwt = localStorage.getItem("jwt");
if (jwt == null) {
  window.location.href = "login.html";
}

window.onload = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    // Fetch and display hierarchical tree from api
    const treeResponse = await fetch('https://netzwelt-devtest.azurewebsites.net/Territories/All');
    const treeData = await treeResponse.json();
    const territoryTree = document.getElementById('territoryTree');
    displayTree(treeData, territoryTree);
    
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

function logout() {
  localStorage.removeItem("jwt");
  window.location.href = "login.html";
}
