(()=> {
    const text = document.querySelector('textarea');
    const centerDiv = document.querySelector('.centerDiv')
    if(!text) return;
    function gost(e) {
        const gostDiv = document.createElement('div');
        if(e.type === 'focus') {
            gostDiv.innerText = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, consequuntur?';
            gostDiv.classList.add('gostDiv');
            centerDiv.append(gostDiv);
        } else {
            let d = document.querySelector('.gostDiv');
            d.remove();
        }
    }
    text.addEventListener('focus', gost);
    text.addEventListener('blur', gost);
})()