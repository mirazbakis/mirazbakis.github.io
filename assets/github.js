// Fills any [data-gh="field"] element with live data from my GitHub profile.
// The HTML ships with the current values, so the page still reads fine if the API is unreachable.
(function () {
    var nodes = document.querySelectorAll('[data-gh]');
    if (!nodes.length || !window.fetch) return;
    fetch('https://api.github.com/users/mirazbakis')
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (u) {
            if (!u) return;
            nodes.forEach(function (el) {
                var key = el.getAttribute('data-gh');
                var val = u[key];
                if (val === null || val === undefined || val === '') return;
                if (key === 'avatar_url') el.src = val + (val.indexOf('?') > -1 ? '&' : '?') + 's=160';
                else el.textContent = val;
            });
        })
        .catch(function () {});
})();
