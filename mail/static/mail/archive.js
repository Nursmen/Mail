let calledarchive = false;

document.addEventListener('DOMContentLoaded', function () {
    setInterval(function(){
        if (calledarchive == false){
            temp();
        }
    }, 500);
});

function temp(){    
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(){
            if (button.innerHTML == 'Archive'){
                console.log(button);
            }
        });
    });

    calledarchive = true;
}

