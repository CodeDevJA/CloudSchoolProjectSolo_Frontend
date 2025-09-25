/* DOM - Document Object Model, 
monitoring the HTML page 
and modifying/manipulating its content at user interaction */
document.addEventListener("DOMContentLoaded", () => {
    /* Creating js-nodes for the form and output messages */
    const form = document.getElementById("js-contact-form");
    const responseMsg = document.getElementById("js-response-msg");
    
    /* monitoring the submit button and its input content when user sends the data on click */
    form.addEventListener("submit", async (event) => {
        /* It stops the browser's default behavior for the event—in this case, the event.preventDefault(); stops the automatic submission and page reload, allowing JavaScript to take control. */
        event.preventDefault();
        
        /* Creating js-nodes for the input-fields */
        const firstname = document.getElementById("js-firstname").value.trim();
        const surname = document.getElementById("js-surname").value.trim();
        const company = document.getElementById("js-company").value.trim();
        const email = document.getElementById("js-email").value.trim();
        
        /* input validation before submit - error handling */
        if (!firstname || !surname || !email || !validateEmail(email)) {
            responseMsg.textContent = "Please fill out all required fields correctly.";
            responseMsg.style.color = "#e57373";
            return;
        }
        
        /* Creating js-nodes/variable for the JSON-object/DTO */
        const payload = {
            firstname,
            surname,
            company,
            email
        };
        
        /* try/catch - error handling */
        try {
            /* Creating a variable for the result(request/response) from the fetch() between the frontend and the backend. fetch() with arguments of bcakend URL and JSON-object (Visitors Submit via HTTP-request POST/Create) */
            const response = await fetch("https://your-azure-function-url/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            
            /* API - HTTP response codes - error handling */
            if (response.ok) {
                responseMsg.textContent = "✅ Registration successful! Thank you.";
                responseMsg.style.color = "#81c784";
                form.reset();
            } else {
                responseMsg.textContent = "❌ Submission failed. Please try again.";
                responseMsg.style.color = "#e57373";
            }
        } catch (error) {
            responseMsg.textContent = "⚠️ An error occurred. Please check your connection.";
            responseMsg.style.color = "#e57373";
        }
    });
    
    /* input validation for email charcters */
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});
