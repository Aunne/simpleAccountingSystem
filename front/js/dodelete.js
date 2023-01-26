import showupdatelist from './showupdatelist.js';

export default function () {
    let data = {
        "id": $("input[name=id]:checked").val(),
    };
    axios.post("../backend/DoDelete.php", Qs.stringify(data))
        .then(res => {
            let response = res['data'];
            $("#contant").html(response['message'] + `<div id="showupdate"></div>`);
            showupdatelist();
        })
        .catch(err => {
            console.error(err);
        })
}