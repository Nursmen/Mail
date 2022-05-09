let isCalled = false;
function check() {
    let checkType = document.querySelector('#emails-view');

    if (checkType.style.display === 'block'){      

        if (checkType.innerHTML == '<h3>Inbox</h3>'){
            fetch('/emails/inbox')
            .then(response => response.json())
            .then(emails => {
                emails.forEach(email => {
                    show(email);
                });
            });

        }

        if (checkType.innerHTML == '<h3>Sent</h3>'){

            fetch('/emails/sent')
            .then(response => response.json())
            .then(emails => {
                emails.forEach(email => {
                    show(email);
                });
            });

        }        

        if (checkType.innerHTML == '<h3>Archive</h3>'){

            fetch('/emails/archive')
            .then(response => response.json())
            .then(emails => {
                emails.forEach(email => {
                    show(email);
                });
            });

        }        
    } 

    isCalled = true;
}

document.addEventListener('DOMContentLoaded', function () {
    function temp(){
        if (isCalled == false){
            check();
        }
    }
    setInterval(temp, 300);
});
document.addEventListener('click', check);

function show(email){
    let div = document.createElement('div');
    let notbutton = document.createElement('div');

    let sender = document.createElement('p');
    let subject = document.createElement('p');
    let date = document.createElement('p');

    let button = document.createElement('button');

    sender.innerHTML = `${email.sender}`;
    subject.innerHTML = `${email.subject}`;
    date.innerHTML = `${email.timestamp}`;

    div.classList.add('container');
    div.classList.add('row');
    div.classList.add('border');

    div.classList.add(`${email.id}`);

    sender.classList.add('col-3');
    sender.classList.add('text-center');

    subject.classList.add('col-4');
    subject.classList.add('text-center');

    date.classList.add('col-3');
    date.classList.add('text-center');

    if (email.archived == true){
        button.classList.add('btn');
        button.classList.add('btn-danger');
        button.classList.add('archived');
        button.innerHTML = 'Archived';
    }
    else{
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.classList.add('archive');
        button.innerHTML = 'Archive';
    }
    button.classList.add('col-2');


    div.appendChild(sender);
    div.appendChild(subject);
    div.appendChild(date);
    
    div.appendChild(button);

    if (email.read == true){
        div.classList.add('bg-secondary');
        div.classList.add('text-white');
    }

    document.querySelector('#emails-view').appendChild(div);
}