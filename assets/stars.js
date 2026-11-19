// Star counts on project cards; hidden unless the GitHub API answers.
document.querySelectorAll('[data-stars]').forEach(function (el) {
    if (!window.fetch) return;
    fetch('https://api.github.com/repos/' + el.getAttribute('data-stars'))
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (repo) {
            if (!repo || !repo.stargazers_count) return;
            el.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 .25a.75.75 0 01.67.42l1.88 3.8 4.2.61a.75.75 0 01.41 1.28l-3.04 2.96.72 4.18a.75.75 0 01-1.09.79L8 12.33l-3.75 1.97a.75.75 0 01-1.09-.79l.72-4.18L.84 6.37a.75.75 0 01.41-1.28l4.2-.61L7.33.67A.75.75 0 018 .25z"/></svg>' + repo.stargazers_count;
            el.hidden = false;
        })
        .catch(function () {});
});
