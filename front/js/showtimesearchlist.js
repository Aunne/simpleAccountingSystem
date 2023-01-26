export default function (response) {
    let list = response['result'];

    if (response['sortmethod'] == 'stob') {
        list.sort(function (a, b) {
            return new Date(a['costtime']) - new Date(b['costtime']);
        });
    } else {
        list.sort(function (a, b) {
            return new Date(b['costtime']) - new Date(a['costtime']);
        });

    }

    let str = `<table border="2">`;
    list.forEach(element => {
        switch (element['category']) {
            case '0':
                element['category'] = "未定義";
                break;
            case '1':
                element['category'] = "食物費";
                break;
            case '2':
                element['category'] = "娛樂費";
                break;
            case '3':
                element['category'] = "雜費";
        }
        str += `
        <tr>
            <td> ${element['category']}</td>
            <td> ${element['money']}</td> 
            <td> ${element['costtime']}</td> 
        </tr>
        `;
    });
    str += `</table>`;
    $("#showtimesearchlist").html(str);
}