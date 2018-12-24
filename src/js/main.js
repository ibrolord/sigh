const navBar = document.querySelector("#nav"); const hamburger = document.querySelector("#hamburger"); const modalList = document.querySelector("#modal-list"); const navItems = document.querySelectorAll(".nav-item"); const section = document.querySelectorAll(".section"); const practiceSpans = document.querySelectorAll(".p_span"); const accordion = document.querySelectorAll(".acc-header"); const contact = document.querySelector(".span-contact"); const form = document.querySelector("#input-form"); const cross = document.querySelector(".cross"); var sections = {}; var fullHeight = {}; var i = 0;[].forEach.call(section, function (e) { sections[e.id] = e.offsetTop; });[].forEach.call(section, function (e) { fullHeight[e.id] = e.offsetTop + e.offsetHeight; }); openForm = (e) => { e.preventDefault(); form.classList.add("display"); form.style.bottom = 104 + "px"; }; closeForm = (e) => { e.preventDefault(); form.classList.remove("display"); }; const scrollDispatcher = () => { var scrollPos = window.pageYOffset; for (i in sections) { const popper = document.querySelector(`#linker-${i}`); popper.classList.remove("active"); if (sections[i] <= scrollPos && scrollPos < fullHeight[i]) { document.querySelector(`a[href*="#${i}"]`).setAttribute("class", "active"); } if (sections[i] >= 3622 && scrollPos > fullHeight[i]) { document.querySelector(`a[href*="#${i}"]`).setAttribute("class", "active"); } } if (scrollPos >= 3) { navBar.classList.add("is-fixed"); } else { navBar.classList.remove("is-fixed"); } if (hamburger.getAttribute("class").includes("open")) { if (scrollPos + 10) { hamburgerClicked(); } } }; const hamburgerClicked = () => { hamburger.classList.toggle("open"); modalList.classList.toggle("open"); }; const spanClicked = e => { key = e.target.id; for (let i = 0; i < practiceSpans.length; i++) { const id = practiceSpans[i].id; const spanBtn = document.querySelector(`#${id}`).classList; const spanDsp = document.querySelector(`#id-${id}`).classList; spanBtn.remove("active"); spanBtn.add("dormant"); spanDsp.add("dormant"); spanDsp.remove("active"); document.querySelector(`#${key}`).classList.remove("dormant"); document.querySelector(`#${key}`).classList.add("active"); document.querySelector(`#id-${key}`).classList.add("active"); } }; for (let i = 0; i < accordion.length; i++) { accordion[i].addEventListener("click", function () { if (accordion[i].classList.length < 2) { accordion.forEach(acc => acc.classList.remove("active")); accordion.forEach(acc => acc.nextElementSibling.classList.remove("active")); accordion.forEach(acc => acc.nextElementSibling.style.maxHeight = 0 + "px"); this.classList.add("active"); this.nextElementSibling.classList.add("active"); this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + "px"; } else { this.nextElementSibling.style.maxHeight = 0 + "px"; this.classList.remove("active"); this.nextElementSibling.classList.remove("active") } }) } contact.addEventListener("click", openForm); cross.addEventListener("click", closeForm); navItems.forEach(navItem => navItem.addEventListener("click", hamburgerClicked)); hamburger.addEventListener("click", hamburgerClicked); window.addEventListener("scroll", scrollDispatcher); practiceSpans.forEach(practiceSpan => practiceSpan.addEventListener("click", spanClicked));

function contactForm(e) {
    e.preventDefault();
    var URL = "https://sjd1orcrme.execute-api.us-east-1.amazonaws.com/Prod/contactform"; 
 
    var Namere = /[A-Za-z]{1}[A-Za-z]/;
    if (!Namere.test($("#name").val())) {
        alert("Name can not be less than 2 characters");
        return;
    }
 
    if ($("#email").val() == "") {
        alert("Please enter your email address");
        return;
    }
   
    if ($("#content").val().length <= 50) {
        alert("Please enter your message and it should be longer than 50 characters");
        return;
    }
 
 
    var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
    if (!reeamil.test($("#email").val())) {
        alert("Please enter a valid email address");
        return;
    }
 
    var name = $("#name").val();
    var email = $("#email").val();
    var content = $("#content").val();
    var data = {
        name: name,
        email: email,
        content: content
    };
 
    $.ajax({
        type: "POST",
        url: "https://sjd1orcrme.execute-api.us-east-1.amazonaws.com/Prod/contactform",
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
 
 
        success: function() {
            // clear form and show a success message
            var SuccessMessage = `<p style="color: #84423a;yte3position: relative;top: -2rem;font-weight: bold;">Message successfully sent!</p>`;
            $(".contact-container").append(SuccessMessage)
            document.getElementById("contactFormi").reset();
            location.reload();
        },
        error: function() {
            // show an error message
            alert("Sorry, message did not send successfully!");
        }
    });
}