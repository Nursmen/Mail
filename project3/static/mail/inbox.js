document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}


function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}

// ```

// showInbox()


// ```
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

// reply()
let calledreply = false;
let reply = document.getElementsByClassName('reply');

document.addEventListener('DOMContentLoaded', function () {

    setInterval(function(){
        if (calledarchive == false){
            temp();
        }
    }, 500);
});
document.addEventListener('click', temp);

function temp(){    
    if (reply[0] != null) {
        reply[0].addEventListener('click', function () {
            replyfunction(reply[0]);
        });
    }
    calledarchive = true;
}

function replyfunction(reply){
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';

    fetch(`/emails/${reply.classList[2]}`)
    .then(response => response.json())
    .then(email => {
            document.querySelector('#compose-recipients').value = email.sender;
            document.querySelector('#compose-subject').value = `RE: ${email.subject}`;
            document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote: \n\n${email.body}`;
    });
}

// showMail()
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

// compose()
function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('compose-form').onsubmit = function() {
      let data = document.querySelectorAll('.form-control');
      let recipients = data[1].value;
      let subject = data[2].value;
      let message = data[3].value;


      fetch('/emails', {
          method: 'POST',
          body: JSON.stringify({
              recipients: recipients,
              subject: subject,
              body: message
          })
      })
      .then(response => response.json())
      load_mailbox('sent');
      return false;
  };

});

// archive()
let calledarchive = false;

document.addEventListener('DOMContentLoaded', function () {
    setInterval(function(){
        if (calledarchive == false){
            temp();
        }
    }, 500);
});
document.addEventListener('click', temp);

function temp(){    
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(){
            if (button.classList.contains('archive')){
                archive(button);
            }
            if (button.classList.contains('archived')){
                console.log('archived');
                archived(button);
            }
        });
    });

    calledarchive = true;
}

function archive(button){
    let row = button.parentElement;

    fetch(`/emails/${row.classList[3]}`, {
        method: 'PUT',
        body: JSON.stringify({
            archived: true
        })
    })

    location.reload();
}

function archived(button){
    let row = button.parentElement;

    fetch(`/emails/${row.classList[3]}`, {
        method: 'PUT',
        body: JSON.stringify({
            archived: false
        })
    })

    location.reload();
}