import showupdatelist from './showupdatelist.js';

export default function () {
    let data = {
        'id': $("input[name=id]:checked").val()
    }
    axios.post("../backend/DoSelect.php", Qs.stringify(data))
        .then(res => {
            let response = res['data'];
            switch (response['status']) {
                case 200:
                    let rows = response['result'];
                    let str = `<table>`;
                    let id;
                    rows.forEach(element => {
                        id = element['id'];
                        str += `
                        ID : <div id='id'>${id}</div>
                        日期 : <input type='text' id='costtime' value='${element['costtime']}'><br>
                        金額 : <input type='text' id='money' value='${element['money']}'>  <br>
                        <select name="category">
　                          <option value="0">未定義</option>
　                          <option value="1">食物費</option>
　                          <option value="2">娛樂費</option>
　                          <option value="3">雜費</option>
                        </select><br><br>
                        `;
                    });
                    str += `</table><button id='doUpdate'>修改他!</button><br>`;

                    $("#contant").html(str);
                    $("#doUpdate").click(function () {
                        let data = {
                            'id': parseInt($("#id").text()),
                            'costtime': $("#costtime").val(),
                            'money': $("#money").val(),
                            'category': $("select[name='category']").val()
                        }
                        axios.post("../backend/DoUpdate.php", Qs.stringify(data))
                            .then(res => {
                                let response = res['data'];
                                $("#contant").html(response['message'] + `<div id="showupdate"></div>`);
                                showupdatelist();
                            })
                            .catch(err => {
                                console.log(err);
                            })

                    });


            }

        })
        .catch(err => {
            console.log(err);
        })
}