let x;
let y;
let r;
function checkR() {
    let checkR = false;
        if (document.values.r_name.value!=="err") {
            checkR = true;
        }
        if(!checkR){
            showMessage("Значение R не выбрано");
            return false;
        }
        r=document.values.r_name.value;
        return true;}

function checkY() {
    let yField = $('#y-text');
    let yVal = yField.val().replace(',', '.');
    if (yVal === "") {
        showMessage("Значение Y не введено")
        return false;
    } else if (yVal.match(/^[+-]0$/) || !yVal.match(/^-?[0-9]+\.[0-9]+$/) && !yVal.match(/^-?[0-9]+$/)) {
        showMessage("Значение Y должно быть числом");
        return false;
    }
    if (yVal <= -3 || yVal >= 5) {
        showMessage("Значение Y не входит в интервал (-3,5)");
        return false;
    }
    y = yVal;
    return true;
}

function checkX() {
    let isValid = false;
    $('.active').each(function () {
        isValid = true;

    });
    if (!isValid) {
        showMessage("Значение X не выбрано");
        return false;
    }
    x = document.getElementsByClassName("active")[0].value;
    return true;
}

function checkForm() {
    let xValid = checkX();
    let yValid = checkY();
    let rValid = checkR();
    return xValid && yValid && rValid;
}

function showMessage(message) {
    let errorMessage = document.createElement("div");
    errorMessage.textContent = message;
    $('#errors').append(errorMessage);
}

function clearError() {
    $('#errors').empty();
}

$('#reset').click(function () {
    $('#errors').empty();
    $('#x :button').removeClass("active");
})

function clearTable() {
    let table = "<tr>\n" +
        "        <th>X</th>\n" +
        "        <th>Y</th>\n" +
        "        <th>R</th>\n" +
        "        <th>Текущее время</th>\n" +
        "        <th>Время работы скрипта</th>\n" +
        "        <th>Результат</th>\n" +
        "    </tr>"
    $('#result-table').html(table);
}

$('#form').on('submit', function (event) {
    event.preventDefault();
    clearError();
    if (checkForm()) {
        $.ajax({
            url: "main.php",
            type: 'GET',
            //dataType: 'json',
            data: "X=" + x +"&Y=" + y + "&R=" + r,
            success: function (jsonData) {
                let parseData = JSON.parse(jsonData);
                let row = '<tr>';
                row += '<td>' + parseData.x +'</td>';
                row += '<td>' + parseData.y +'</td>';
                row += '<td>' + parseData.r +'</td>';
                row += '<td>'+ parseData.current + '</td>';
                row += '<td>' + parseData.execution + '</td>';
                row += '<td>' + parseData.result +'</td>';
                row += '</tr>';
                $('#result-table').append(row);
            },
            error: function () {
                alert("ошибка")
            }
        });
    }
})


