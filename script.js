document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("sidebarToggle");

    // Toggle the sidebar open/closed
    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("open");
    });
});
