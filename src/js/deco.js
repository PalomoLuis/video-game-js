let mainTitle = document.getElementById('main_title');

const multiColor = (p) => {
    let colors = ['#FF3333', '#FF3386', '#FF33D7', '#D733FF', '#9333FF', '#4F33FF', '#3358FF',
                  '#3396FF', '#33CEFF', '#33FFE9', '#33FFA5', '#33FF61', '#3FFF33', '#83FF33',
                  '#C7FF33', '#FFF933', '#FFC733', '#FF7D33', '#FF3333', '#FF3333', '#FF3386',
                  '#FF33D7', '#D733FF', '#9333FF', '#4F33FF', '#3358FF', '#3396FF', '#33CEFF',
                  '#33FFE9', '#33FFA5', '#33FF61', '#3FFF33', '#83FF33', '#C7FF33', '#FFF933',
                  '#FFC733', '#FF7D33', '#FF3333'];
    let text = p.innerText;
    let newText;
    let tAr = [];
    let newTAr = []
    tAr = text.split('');

    tAr.map((letter, i) => {
        let element = `<span style="color:${colors[i]};">${letter}</span>`;
        newTAr.push(element)
    });
    newText = newTAr.join('');
    return newText;
};

// window.onload = () => {
//     mainTitle.innerHTML = multiColor(mainTitle);
// }