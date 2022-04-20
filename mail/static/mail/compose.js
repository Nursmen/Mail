// when form is submitted
// when DOM is loaded
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
        .then(result => {
            if (result.code === 201) {
                console.log('Email sent successfully');
            }
            else {
                console.log('Email not sent');
                console.log(result['error']);
            }
        });
    };
});