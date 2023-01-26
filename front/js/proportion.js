import showproportion from './showproportion.js';

export default function () {
    const str = `
    輸入要查詢的日期期間<br>
    從<input type="text" id="time1">到<input type="text" id="time2"><br>
    <button id="show">搜尋!</button><br>
    `;
    $("#contant").html(str);
    $("#show").click(showproportion);
}