const form = document.getElementById("fileForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    //File information is saved
    const fileInput = form.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    //It is checked that there is a file
    if (!file) {
        alert("There is not file");
        return;
    }

    //We pass that information from the file to formData
    const formData = new FormData();
    formData.append("fileCSV", file);

    //Request to send data to database
    try {
        const req = await fetch("http://localhost:3000/upload",{
            method: "POST",
            body: formData,
        });

        if (!req.ok) {
            alert("Error sending file");
            return;
        }

        alert("The file was sent")
    } catch (error) {
        alert("Error", err);
    }
});