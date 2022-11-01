(()=> {
    const table = document.createElement('table');
    for (let i = 0; i < 10; i++) {
        const tr = document.createElement('tr');
        table.append(tr);
    }
    let row = table.getElementsByTagName('tr');
    for (let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            const td = document.createElement('td');
            row[i].append(td);
        }
    }
    let cell = table.getElementsByTagName('td');
    for(let i = 0; i < cell.length; i++) {
        cell[i].innerText = i + 1;
    }
    document.body.append(table);
})()