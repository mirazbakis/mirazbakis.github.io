// "lately on github": the last few public pushes, newest first.
// The section stays hidden if the GitHub API is unreachable or there's nothing to show.
(function () {
    var list = document.getElementById('activity');
    if (!list || !window.fetch) return;

    function ago(iso) {
        var s = (Date.now() - new Date(iso).getTime()) / 1000;
        if (s < 3600) return Math.max(1, Math.round(s / 60)) + 'm ago';
        if (s < 86400) return Math.round(s / 3600) + 'h ago';
        if (s < 86400 * 30) return Math.round(s / 86400) + 'd ago';
        return Math.round(s / (86400 * 30)) + 'mo ago';
    }
    function el(tag, cls, text) {
        var e = document.createElement(tag);
        if (cls) e.className = cls;
        if (text) e.textContent = text;
        return e;
    }

    fetch('https://api.github.com/users/mirazbakis/events/public?per_page=50')
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (events) {
            if (!events) return;
            var seen = {}, shown = 0;
            events.forEach(function (ev) {
                if (shown >= 5 || ev.type !== 'PushEvent' || seen[ev.repo.name]) return;
                seen[ev.repo.name] = true;
                var commits = (ev.payload && ev.payload.commits) || [];
                var last = commits[commits.length - 1];

                var li = el('li');
                var t = el('time', null, ago(ev.created_at));
                t.dateTime = ev.created_at;
                var what = el('span', 'what');
                what.appendChild(document.createTextNode('pushed to '));
                var a = el('a', null, ev.repo.name.split('/')[1]);
                a.href = 'https://github.com/' + ev.repo.name;
                a.target = '_blank'; a.rel = 'noopener';
                what.appendChild(a);
                if (last && last.message) what.appendChild(el('span', 'msg', last.message.split('\n')[0]));
                li.appendChild(t); li.appendChild(what);
                list.appendChild(li);
                shown++;
            });
            if (shown) document.getElementById('lately').hidden = false;
        })
        .catch(function () {});
})();
