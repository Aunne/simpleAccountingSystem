import withtime from './withtime.js';
import withmoney from './withmoney.js';

export default function () {
    //作查詢的事
    const showsearchlist = `
    <br><br>
    <button id="withtime">以時間查詢</button>
    <button id="withmoney">以金額做查詢</button>
    `;

    $("#contant").html(showsearchlist);

    $("#withtime").click(withtime);
    $("#withmoney").click(withmoney);
}