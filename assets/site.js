// Theme toggle and footer year, shared across pages.
(function () {
    var root = document.documentElement;
    var toggle = document.getElementById('theme-toggle');
    if (toggle) {
        var label = function () {
            var dark = root.getAttribute('data-theme') === 'dark';
            toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
        };
        label();
        toggle.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
            label();
        });
    }
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();
