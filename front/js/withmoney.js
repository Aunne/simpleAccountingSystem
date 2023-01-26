import showmoneysearchlist from './showmoneysearchlist.js';

export default function () {
    const str = `
    <br>
    從<input type="text" id="money1">到<input type="text" id="money2"><br>
    <select name="sortmethod">
　      <option value="stob">由小到大排列</option>
　      <option value="btos">由大到小排列</option>
    </select><br><br>
    <button id="domoneysearch">搜尋!</button><br>
    `;

    $("#contant").html(str);
    $("#domoneysearch").click(function () {
        let data = {
            'money1': $("#money1").val(),
            'money2': $("#money2").val(),
            'sortmethod': $("select[name='sortmethod']").val()
        }

        axios.post("../backend/DoSearchWithMoney.php", Qs.stringify(data))
            .then(res => {
                let response = res['data'];
                $("#contant").html(response['message'] + `<div id="showmoneysearchlist"></div>`);
                switch (response["status"]) {
                    case 200:
                        showmoneysearchlist(response);
                        break;
                    default:
                        $("#contant").html(response["message"]);
                }
            })
            .catch(err => {
                console.log(err)
            })

    });
}