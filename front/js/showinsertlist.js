export default function () {
    axios.get("../backend/DoSelect.php")
        .then(res => {
            let list = res['data']['result'];

            list.sort(function (a, b) {
                return parseInt(b['id']) - parseInt(a['id']);
            })
            const target = list['0'];
            const targetyear = target['costtime'].slice(0, 5);
            let summoney = 0;
            let categorymoney = 0;
            let str;

            list.forEach(element => {
                if (element['costtime'].indexOf(targetyear) >= 0 && parseInt(element['month']) == parseInt(target['month']) - 1) {
                    summoney += parseInt(element['money']);
                    if (element['category'] == target['category'])
                        categorymoney += parseInt(element['money']);
                }
            });

            if (categorymoney != 0) {
                str = `
                上個月總金額 : ${summoney} <br>
                佔上個月總金額百分比 : ${target['money'] / summoney * 100}%<br>
                上個月類別總金額 : ${categorymoney} <br>
                佔上個月類別百分比 : ${target['money'] / categorymoney * 100}% <br>
                `;
            } else {
                str = `找不到上個月資料`;
            }
            $("#showinsertdata").html(str);
        })
        .catch(err => {
            console.log(err)
        })
}

