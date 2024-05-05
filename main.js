const inputBoxes = document.getElementById('otp_input_boxes_id');
const showOTP = document.getElementById('show_otp');
const matchOTP = document.getElementById('otp_matched');
const expire_otp = document.getElementById('expire_OTP');

let randomValue;

inputBoxes.addEventListener('input', function (e) { 
    let value = e.target.value;
    if (isNaN(value)) { 
        e.target.value = "";
        return;
    }
    const nextElementSibling = e.target.nextElementSibling;
    
    if (nextElementSibling) {
        nextElementSibling.focus();
    } else { 

        const isTrue = validateOTP();
        if (isTrue) {
            expire_otp.style.display = 'none';
        } else { 
            expire_otp.style.display = '';
        }
        
    }

    validateOTP();
})

function expireOTP() { 
    const expireTime = 15000;
    const intervalTime = 1000;

    let slice = expireTime / intervalTime;

    let intervalid = setInterval(() => {
        expire_otp.innerText = `OTP will expire ${slice} second`;
        slice = slice - 1;
    }, intervalTime);

    setTimeout(() => {
        expire_otp.innerText = 'OTP expired';
        clearInterval(intervalid);
        if (validateOTP() === false) { 
            generateOTP();
        }
    }, expireTime);
}


function generateOTP() {
    randomValue = Math.floor(1000 + Math.random() * 9000);
    showOTP.innerText = `OTP: ${randomValue}`;

    expireOTP();
}

function validateOTP() {
    let ValueSring = '';
    [...inputBoxes.children].forEach(item => { 
        ValueSring = ValueSring + item.value;
    })

    const result = (String(randomValue) === ValueSring);

    if (result) {
        matchOTP.innerText = 'OTP Match success'
        matchOTP.classList.remove('fail');
        matchOTP.classList.add('success');
    } else { 
        matchOTP.innerText = 'OTP Match fail';
        matchOTP.classList.remove('success');
        matchOTP.classList.add('fail');
    }

    return result;

}

function init() { 
    setTimeout(generateOTP, 2000);
}

init();