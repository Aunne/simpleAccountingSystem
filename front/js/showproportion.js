export default function () {
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
    }

    axios.post("../backend/DoProportion.php", Qs.stringify(data))
        .then(res => {
            let response = res['data'];
            $("#contant").html(response['message'] + `<div id="showproportion"></div>`);

            let sum = 0;
            let unknow = 0;
            let food = 0;
            let play = 0;
            let other = 0;

            response['result'].forEach(element => {
                sum += parseInt(element['money']);

                switch (element['category']) {
                    case '0':
                        unknow += parseInt(element['money']);
                        break;
                    case '1':
                        food += parseInt(element['money']);
                        break;
                    case '2':
                        play += parseInt(element['money']);
                        break;
                    case '3':
                        other += parseInt(element['money']);
                        break;
                }
            });

            const str = `
                總金額 : ${sum} <br><br>
                未定義金額 : ${unknow} <br>
                未定義比例 : ${unknow / sum * 100}% <br><br>
                食物費金額 : ${food} <br>
                食物費比例 : ${food / sum * 100}% <br><br>
                娛樂費金額 : ${play} <br>
                娛樂費比例 : ${play / sum * 100}% <br><br>
                雜費金額 : ${other} <br>
                雜費比例 : ${other / sum * 100}%
            `;
            $("#showproportion").html(str);
        })
        .catch(err => {
            console.log(err)
        })
}