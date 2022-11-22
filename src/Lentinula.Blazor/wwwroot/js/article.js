export function readFile() {
    for(let i = 1; i < 6; i++) {
        document.getElementById(`btn${i}`).addEventListener('click', function() {
            fetch(`files/0${i}.md`)
                .then(async response => {
                    const text = await response.text();
                    // console.log(text)
                    const clean = DOMPurify.sanitize(text);
                    // console.log(clean);
                    // document.getElementById('article').textContent = clean;
                    const html = marked.parse(clean);
                    document.getElementById('article').innerHTML = html;
                });
        })
    }
}
