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