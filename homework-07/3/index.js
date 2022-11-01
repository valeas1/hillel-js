(()=> {
    const img = document.createElement('img')
    let num = Math.floor(Math.random() * 10);
    if(num === 0) {
        num = Math.floor(Math.random() * 10);
    }
    img.setAttribute('src', `img/${num}.jpeg`)
    document.body.append(img);
})()