let called = false;

let rows = document.getElementsByClassName('row');

document.addEventListener('DOMContentLoaded', function () {
    setInterval(function(){
        if (called == false){
            temp();
        }
    }, 500);
});

document.addEventListener('click', temp);

function temp(){
    if (rows != null && rows.length > 0) {

        for (let i = 0; i < rows.length; i++) {

            rows[i].addEventListener('click', function () {
                chowmemail(rows[i]);
            });

        }
    }
    called = true;
}

function chowmemail(row){
    fetch(`/emails/${row.classList[3]}`)
    .then(response => response.json())
    .then(email => {
        showmail(email);

        fetch(`/emails/${row.classList[3]}`, {
            method: 'PUT',
            body: JSON.stringify({
                read: true
            })
        })
    });
}

function showmail(email){
    let div = document.createElement('div');
    let sender = document.createElement('p');
    let to = document.createElement('p');
    let subject = document.createElement('p');
    let date = document.createElement('p');
    let body = document.createElement('p');

    let reply = document.createElement('button');

    sender.innerHTML = `<strong>From</strong>: ${email.sender}`;
    to.innerHTML = `<strong>To</strong>: ${email.recipients}`;
    subject.innerHTML = `<strong>Subject</strong>: ${email.subject}`;
    date.innerHTML = `<strong>Timestamp</strong>: ${email.timestamp}`;
    body.innerHTML = `${email.body}`;
    reply.innerHTML = `Reply`;

    reply.classList.add('btn');
    reply.classList.add('btn-primary');
    reply.classList.add(`${email.id}`);
    reply.classList.add('reply');
    
    div.classList.add('container');

    body.classList.add('border-top');
    body.classList.add('mt-4');
    body.classList.add('pt-3');

    div.appendChild(sender);
    div.appendChild(to);
    div.appendChild(subject);
    div.appendChild(date);
    div.appendChild(reply);
    div.appendChild(body);

    document.getElementById('emails-view').innerHTML = div.outerHTML;
}