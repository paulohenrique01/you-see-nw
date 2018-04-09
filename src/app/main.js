
const https = require('https');
const idDivMidia = 'midias';
let arrayResult = [];
getAllMidia();


function getAllMidia() {

    https.get('https://private-7cf60-4youseesocialtest.apiary-mock.com/timeline', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            // alert('end response =>' + JSON.parse(data).explanation);
            this.arrayResult = JSON.parse(data);
            addAllMidia(this.arrayResult);
        });

    }).on("error", (err) => {
        alert("Error: " + err.message);
    });
}

function addAllMidia(arrayMidia) {
    var element = document.getElementById(idDivMidia);
    arrayMidia.forEach(function (item) {
        /*Object.keys(item).forEach(function (key) {
          alert(key + ' : ' + item[key])
        });*/

        addMidia(element, item);
    });
}

function addMidia(element, item) {
    let html = '<div class="menu-item-info-box">'
        + '<span class="menu-item-info-box-icon"><img src="' + item['file'] + '"></span>'
        + '<div class="menu-item-info-box-content">'
        + ' <span class="menu-item-info-box-text">' + item['title'] + '</span>'
        + '<span class="menu-item-info-box-detail">' + item['description'] + '</span>'
        + ' <span class="menu-item-info-box-price">Categoria: ' + item['category'] + '</span>'
        + '<span style="color: #00acd6 " class="menu-item-info-box-detail">Tipo: ' + item['type'] + ' </span>'

        + ' </div>'
        + ' </div>';

    element.innerHTML += html;
}

function removeAllMidia() {
    var element = document.getElementById(idDivMidia);
    element.innerHTML = '';
}

function onChangeCategoria() {
    removeAllMidia();
    onChangeFilter();
    
}

function onChangeTipo() {
    removeAllMidia();
    onChangeFilter();
}

function onChangeFilter(){
    var categoria = document.getElementById('categoria').value;
    var tipo = document.getElementById('tipo').value;    
    if (categoria === 'All' && tipo === 'All') {
        addAllMidia(this.arrayResult);
    } else {
        var values = this.arrayResult.filter(function (el) {
            if (categoria !== 'All' && tipo !== 'All') {
                return el.category === categoria && el.type === tipo;
            }else if(categoria !== 'All'){
                return el.category === categoria;
            }else{
                return  el.type === tipo;
            }
           
        });        
        addAllMidia(values);
    }
}


