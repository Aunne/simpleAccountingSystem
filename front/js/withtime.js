import showtimesearchlist from './showtimesearchlist.js';

export default function () {
    const str = `
    <br>
    從<input type="text" id="time1">到<input type="text" id="time2"><br>
    <select name="sortmethod">
　      <option value="stob">由小到大排列</option>
　      <option value="btos">由大到小排列</option>
    </select><br><br>
    <button id="dotimesearch">搜尋!</button><br>
    `;

    $("#contant").html(str);
    $("#dotimesearch").click(function () {
        let time1 = $("#time1").val();
        let time2 = $("#time2").val();
        if (parseInt(time1) > parseInt(time2)) {
            change = time1;
            time1 = time2;
            time2 = change;
        }

        let data = {
            'time1': time1,
            'time2': time2,
            'sortmethod': $("select[name='sortmethod']").val()
        }
        axios.post("../backend/DoSearchWithTime.php", Qs.stringify(data))
            .then(res => {
                let response = res['data'];
                $("#contant").html(response['message'] + `<div id="showtimesearchlist"></div>`);
                switch (response["status"]) {
                    case 200:
                        showtimesearchlist(response);
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