'use strict'
const frm = document.getElementById('form');

function requesthttp( ...value) {
    console.log(value);
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                alert("submitted succesfully");
                console.log(request.response);
                        for (let i = 0; i < frm.elements.length; i++) {
                            frm[i].value = '';
                        }
            } else if (request.status === 403) {
                alert(request.response || request.responseText);
                        for (let i = 0; i < frm.elements.length; i++) {
                            frm[i].value = '';
                        }
            } else if (request.status === 500) {
                alert("Database currently unavailable");
            } else {
                console.log(request.responseText + "\n" + request.response)
            }

        }
    };
    request.open('POST', "/submit", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(value));
    return false;
}

function submit() {
    if (frm.reportValidity()) {
    const values = {
        sName: frm.elements[0].value,
        colName: frm.elements[1].value,
        campName: frm.elements[2].value,
        comments: (frm.elements[3].value === ("" || null)) ? null : frm.elements[3].value
    };
    console.log(values.comments)
    requesthttp(values);
}
 }
