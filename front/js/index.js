import insert from './insert.js';
import search from './search.js';
import proportion from './proportion.js';
import delete_ from './delete_.js';
import update from './update.js';

$(document).ready(function () {
    const startPage =`
    <button id="insert">新增一筆支出</button>
    <button id="update">修改支出條目</button>
    <button id="delete">刪除支出紀錄</button>
    <button id="search">查詢消費紀錄</button>
    <button id="proportion">顯示消費比重</button>
    <br>
    <div id="contant"></div>
    `;

    $("#root").html(startPage);

    $("#insert").click(insert);
    //做新增支出的事

    $("#search").click(search);
    //做搜尋的事

    $("#proportion").click(proportion);
    //做顯示比重的事

    $("#delete").click(delete_);
    //作刪除的事

    $("#update").click(update);
    //做修改的事
});