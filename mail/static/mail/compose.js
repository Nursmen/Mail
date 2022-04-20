// when form is submitted
// when DOM is loaded
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