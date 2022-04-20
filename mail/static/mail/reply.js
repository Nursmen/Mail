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