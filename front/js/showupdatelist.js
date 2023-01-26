export default function () {
    axios.get("../backend/Doselect.php")
        .then(res => {
            let response = res["data"]

            switch (response["status"]) { //叫json的表單
                case 200:
                    let rows = response['result'];
                    let str = `<table>`;
                    let category

                    rows.forEach(element => {
                        switch (element['category']) {
                            case '0':
                                category = '未定義';
                                break;
                            case '1':
                                category = '食物費';
                                break;
                            case '2':
                                category = '娛樂費';
                                break;
                            case '3':
                                category = '雜費';
                                break;
                        }
                        str += `
                        <tr>
                            <td> ${element['costtime']} </td>
                            <td> ${category} </td >
                            <td> ${element['money']} 元</td>
                            <td> ID:  ${element['id']} </td>
                        </tr > `;
                    });
                    str += `</table > `;
                    $("#showupdate").html(str);

                    break;
                default:
                    $("#showupdate").html(response["message"]);
                    break;
            }
        })
        .catch(err => {
            console.error(err)
        })
}