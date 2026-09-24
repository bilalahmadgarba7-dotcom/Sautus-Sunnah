exports.handler = async function (event) {

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({
                error: "Method not allowed"
            })
        };
    }

    try {

        const data = JSON.parse(event.body || "{}");

        const question = data.question;

        if (!question) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "Please provide a question."
                })
            };
        }

        /*
         * REAL AI CONNECTION WILL BE ADDED HERE
         *
         * IMPORTANT:
         * Never put your AI API key inside
         * HTML, CSS or frontend JavaScript.
         */

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: "Bilal AI backend is ready.",
                question: question
            })
        };

    } catch (error) {

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Server error."
            })
        };

    }

};