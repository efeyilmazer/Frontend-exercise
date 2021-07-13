var colorPalette = document.getElementById('color-palette');
var currentElem;

function notification(msg){

    var old_div = document.querySelector('.alert');
    if (old_div){
        old_div.parentNode.removeChild(old_div);
    }

    var div = document.createElement('div');
    div.className = 'alert';
    div.innerHTML = msg;
    document.body.appendChild(div);

    setTimeout(function () {
        div.classList.add('active')
    }, 1);
    setTimeout(function () {
    div.classList.remove('active')
    }, 1000);

}

function generateColorPalette(){
    colorPalette.innerHTML = '';
    for (var i = 1; i <= 5; i++){

        var color = generateColor();

        var li = document.createElement('li');

        var spanColor = document.createElement('span');
        spanColor.className = 'color';
        spanColor.style.setProperty('--color', color);
        var spanText = document.createElement('span');
        spanText.className = 'text';
        spanText.innerText = color;
        var input = document.createElement('input');
        input.name = 'color';
        input.value = color;

        li.appendChild(spanColor);
        li.appendChild(spanText);
        li.appendChild(input);
        colorPalette.appendChild(li);

        li.addEventListener('mouseover', function (e) {
                currentElem = e.target.parentNode;
        });

        li.addEventListener('click', function (e) {
                var targetInput = e.target.parentNode.querySelector('input[name="color"]');
                targetInput .select();
                document.execCommand('copy');
                notification('Color <b>' + targetInput.value  + '</b> copied to your clipboard')
        });

    }
}

function generateColor(){
    var str = 'abcdef0123456789';
    var color = '#';
    for (var i = 0; i <= 5; i++) {
        color += str[Math.floor(Math.random() * str.length)];
    }
    return color;
}

window.addEventListener('keypress', (e) => {
    if (e.keyCode === 32){
        generateColorPalette();
    } else if (e.keyCode === 99 && currentElem){
        let targetInput = currentElem.querySelector('input[name="color"]');
        targetInput.select();
        document.execCommand('copy');
        notification('Color <b>' + targetInput.value  + '</b> copied to your clipboard');
    }
    e.preventDefault();
});

generateColorPalette();