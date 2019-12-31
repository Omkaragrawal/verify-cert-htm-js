const form = document.forms[0];
const request = new XMLHttpRequest();
const reply = document.getElementById('reply');

function verify() {
    if (form.checkValidity()) {
        submit(form[0].value.toUpperCase());
        reset();
    }

}

function reset() {
    document.getElementById('reply').hidden=true;
    document.getElementById("VERIFIED").hidden = true;
    document.getElementById("UNVERIFIED").hidden = true;
    document.getElementById('other').hidden = true;

}

function submit(value) {
    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                // console.log(request.response);
                const data = JSON.parse(request.response)
                if (data["verification"] == "VERIFIED") {
                    reset();
                    form.value = '';
                    document.getElementById("cert_id").innerText= data["cert_id"];
                    document.getElementById("name").innerText= data["name"];
                    document.getElementById("clg_name").innerText= data["clg_name"];
                    document.getElementById("camp_name").innerText= data["camp_name"];
                    document.getElementById("issue_date").innerText= data["issue_date"];
                    document.getElementById("comments").innerText= data["comments"];
                    document.getElementById(data["verification"]).hidden = false;
                    reply.hidden = false;
                } else {
                        reset();
                        document.getElementById(request.response).hidden = false;
                        reply.hidden = false;
                        form.value = '';
                }
            } else if (request.status === 403) {
                reset();
                document.getElementById('other').innerText = request.response;
                document.getElementById("UNVERIFIED").hidden=false;
                document.getElementById('other').hidden = false;
                reply.hidden = false;
            }
        } else if (request.status === 500) {
            reset();
            document.getElementById('other').innerText = request.response;
            document.getElementById("UNVERIFIED").hidden=false;
            document.getElementById('other').hidden = false;
            reply.hidden = false;
        };
    }
    request.open('POST', "/verify", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({ value }));
}

window.addEventListener('keydown',function(e){
    if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){
        if(e.target.nodeName=='INPUT'&&e.target.type=='text'){
            e.preventDefault();return false;
        }
    }
},true);