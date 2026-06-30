// =========================
// USERS SYSTEM (LocalStorage)
// =========================

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function setCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
}

// =========================
// REGISTER
// =========================

function registerUser(name, email, password, stage) {

    let users = getUsers();

    let exists = users.find(u => u.email === email);
    if (exists) {
        alert("هذا الحساب موجود بالفعل");
        return;
    }

    let newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        stage: stage,
        role: "student",
        status: "pending"
    };

    users.push(newUser);
    saveUsers(users);

    alert("تم إرسال الطلب - في انتظار موافقة الإدارة");
    window.location.href = "login.html";
}

// =========================
// LOGIN
// =========================

function loginUser(email, password) {

    let users = getUsers();

    let user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert("بيانات غير صحيحة");
        return;
    }

    if (user.status === "pending") {
        alert("حسابك قيد المراجعة");
        return;
    }

    if (user.status === "rejected") {
        alert("تم رفض حسابك");
        return;
    }

    setCurrentUser(user);

    if (user.role === "admin") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "student.html";
    }
}

// =========================
// ADMIN DASHBOARD
// =========================

function loadRequests() {

    let users = getUsers();
    let container = document.getElementById("requests");

    if (!container) return;

    container.innerHTML = "";

    let pending = users.filter(u => u.status === "pending");

    if (pending.length === 0) {
        container.innerHTML = "<p>لا توجد طلبات جديدة</p>";
        return;
    }

    pending.forEach(user => {

        let div = document.createElement("div");

        div.style.border = "1px solid #ccc";
        div.style.padding = "10px";
        div.style.margin = "10px";

        div.innerHTML = `
            <h3>${user.name}</h3>
            <p>${user.email}</p>
            <p>${user.stage}</p>

            <button onclick="approveUser(${user.id})">قبول</button>
            <button onclick="rejectUser(${user.id})">رفض</button>
        `;

        container.appendChild(div);
    });
}

// =========================
// APPROVE / REJECT
// =========================

function approveUser(id) {

    let users = getUsers();

    users = users.map(u => {
        if (u.id === id) {
            u.status = "accepted";
        }
        return u;
    });

    saveUsers(users);
    loadRequests();
}

function rejectUser(id) {

    let users = getUsers();

    users = users.map(u => {
        if (u.id === id) {
            u.status = "rejected";
        }
        return u;
    });

    saveUsers(users);
    loadRequests();
}

// =========================
// STUDENT DASHBOARD
// =========================

function loadStudent() {

    let user = getCurrentUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let stage = document.getElementById("stage");
    let status = document.getElementById("status");

    if (name) name.innerText = user.name;
    if (email) email.innerText = user.email;
    if (stage) stage.innerText = user.stage;
    if (status) status.innerText = user.status;
}

// =========================
// LOGOUT
// =========================

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}