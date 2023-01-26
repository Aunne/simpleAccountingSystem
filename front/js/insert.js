import showinsertlist from "./showinsertlist.js";

export default function () {
    let str = `
    費用：<input type="text" id="money"><br>
    日期：<input type="text" id="costtime"><br>
    <select name="category">
　      <option value="0">未定義</option>
　      <option value="1">食物費</option>
　      <option value="2">娛樂費</option>
　      <option value="3">雜費</option>
    </select><br><br>
    <button id="doinsert">新增吧!</button><br>
    `;
    $("#contant").html(str);

    $("#doinsert").click(function () {
        let data = {
            'money': $("#money").val(),
            'costtime': $("#costtime").val(),
            'category': $("select[name='category']").val()
        }
        axios.post("../backend/DoInsert.php", Qs.stringify(data))
            .then(res => {
                let response = res['data'];
                $("#contant").html(response['message'] + `<div id="showinsertdata"></div><br><br>`);
                showinsertlist();
            })
            .catch(err => {
                console.log(err)
            })
    });
}