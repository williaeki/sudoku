function deprecated() {
for (i = 1; i <= 81; i++) {
    console.log(i);
    var html = i != 1 ? '<td class=\"' : '<tr><td class=\"';

    switch(i % 9) {
        case(1):
            html += 'table-left';
            break;
        case(3):
        case(6):
        case(9):
            html += 'table-right';
            break;
    }

    if (i % 27 >= 1 && i % 27 <= 9) {
        html += ' table-top';
    } else if (i >= 73 && i <= 81) {
        html += ' table-bottom';
    }

    html += '\"><input type=\"text\" class=\"input\" name=\"input\" inputmode=\"numeric\" maxlength=\"1\" autocomplete=\"off\"></td>';

    if (i % 9 == 0) html += '</tr><tr>';
    console.log(html);
    document.getElementById("user-input-table").innerHTML += html;
}
document.getElementById("user-input-table").innerHTML += "</tr>";
}

function userTable() {
    console.log("userTable() called");
    const table = document.createElement("table");
    table.id = "input-table";
    const tableBody = document.createElement("tbody");
    for (let i = 0; i < 9; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement("td");
            const cellText = document.createElement("input");
            cellText.type = "text";
            cellText.classList.add("input");
            cellText.setAttribute('name', 'input');
            cellText.setAttribute('inputMode', 'numeric');
            cellText.setAttribute('maxLength', '1');
            cellText.setAttribute('autocomplete', 'off');
            cellText.setAttribute('onkeypress', 'return (event.charCode !=8 && event.charCode ==1 || (event.charCode >= 49 && event.charCode <= 57))');
            cellText.setAttribute('value', '');
            switch(j) {
                case(0):
                    cell.classList.add('table-left');
                    break;
                case(2):
                case(5):
                case(8):
                    cell.classList.add('table-right');
                    break;
            }
            switch(i) {
                case(0):
                case(3):
                case(6):
                    cell.classList.add('table-top');
                    break;
                case(8):
                    cell.classList.add('table-bottom');
                    break;
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    document.getElementById("table").appendChild(table);
}

async function solve() {
    console.log("button works");
    const input = document.getElementsByName("input");
    var table = [];
    for (let i = 0; i < input.length; i++) {
        table[i] = input[i].value == '' ? 0 : input[i].value;
        console.log(i + ", " + table[i]);
    }

    const displayTable = document.createElement("table");
    displayTable.id = "display-table";
    const tableBody = document.createElement("tbody");
    for (let i = 0; i < 9; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement("td");
            cell.setAttribute("id", (((i * 9) + j)) + "");
            cell.style.backgroundColor = "white";
            const cellText = document.createTextNode(table[(i * 9) + j] != 0 ? table[(i * 9) + j] : "");
            switch(j) {
                case(0):
                    cell.classList.add('table-left');
                    break;
                case(2):
                case(5):
                case(8):
                    cell.classList.add('table-right');
                    break;
            }
            switch(i) {
                case(0):
                case(3):
                case(6):
                    cell.classList.add('table-top');
                    break;
                case(8):
                    cell.classList.add('table-bottom');
                    break;
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    displayTable.appendChild(tableBody);
    document.getElementById("table").innerHTML = "";
    document.getElementById("table").appendChild(displayTable);

    checkRow(7);

    setTimeout(function() {
      checkBox(0);
    }, 900);
}

async function checkBox(boxIndex) {
    let start = boxIndex * 3;
    let nextBoxStart = (boxIndex + 1) * 3;
    for (let i = start; i <= start + 20; i += (i % 9 >= start && i % 9 < nextBoxStart - 1) ? 1 : 7) {
        const delayInMilliseconds = 100;
        document.getElementById(i).style.backgroundColor = "white";
        setTimeout(function() {
            document.getElementById(i).style.backgroundColor = '#999999';
            console.log(i);
            setTimeout(function() {
                document.getElementById(i).style.backgroundColor = "white";
            }, delayInMilliseconds);
        }, delayInMilliseconds * ((i % 9 >= start && i % 9 < nextBoxStart) ? i % 21 : (i - 9) % 3));
    }
}

async function checkRow(rowIndex) {
    for (let i = rowIndex * 9; i < rowIndex * 9 + 9; i++) {
      const delayInMilliseconds = 100;
      document.getElementById(i).style.backgroundColor = "white";
      setTimeout(function() {
          document.getElementById(i).style.backgroundColor = '#999999';
          setTimeout(function() {
              document.getElementById(i).style.backgroundColor = "white";
          }, delayInMilliseconds);
      }, delayInMilliseconds * (i % 9));
    }
}
