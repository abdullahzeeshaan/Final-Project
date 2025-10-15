
(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
        publicKey: "qYXu3pDeED71hm0v4",
    });
})();

window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // these IDs from the previous steps
        emailjs.sendForm('service_jqurbss', 'template_mszej68', this)
            .then(() => {
                console.log('SUCCESS!');
            }, (error) => {
                console.log('FAILED...', error);
            });
    });
};
    