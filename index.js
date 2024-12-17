document.addEventListener('DOMContentLoaded', function () {
    var generateBtn = document.getElementById('generate-resume');
    var downloadBtn = document.getElementById('download-pdf');
    var copyLinkBtn = document.getElementById('copy-link');
    var profilePicInput = document.getElementById('profile-pic');
    var resumeContent = document.getElementById('resume-content');
    var profilePicBase64 = '';
    // Convert image to base64
    profilePicInput.addEventListener('change', function () {
        var _a;
        var file = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader_1 = new FileReader();
            reader_1.onload = function () { return (profilePicBase64 = reader_1.result); };
            reader_1.readAsDataURL(file);
        }
    });
    // Generate Resume Preview
    generateBtn.addEventListener('click', function () {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('education').value;
        var skills = document.getElementById('skills').value;
        var work = document.getElementById('work-experience').value;
        if (!name || !email || !phone || !education || !skills || !work) {
            alert('Please fill all fields!');
            return;
        }
        resumeContent.innerHTML = "\n      ".concat(profilePicBase64 ? "<img src=\"".concat(profilePicBase64, "\" style=\"width:100px; height:100px; border-radius:50%;\">") : '', "\n      <h2>").concat(name, "</h2>\n      <p><strong>Email:</strong> ").concat(email, "</p>\n      <p><strong>Phone:</strong> ").concat(phone, "</p>\n      <h3>Education</h3><p>").concat(education, "</p>\n      <h3>Skills</h3><p>").concat(skills, "</p>\n      <h3>Work Experience</h3><p>").concat(work, "</p>\n    ");
        downloadBtn.style.display = 'inline-block';
        copyLinkBtn.style.display = 'inline-block';
        // Create a unique path link for the resume (this could be replaced with a real backend link generation system)
        var uniqueLink = "".concat(window.location.origin, "?resume=").concat(encodeURIComponent(JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            education: education,
            skills: skills,
            work: work,
            profilePicBase64: profilePicBase64
        })));
        copyLinkBtn.addEventListener('click', function () {
            // Create a temporary input element to copy the unique link to the clipboard
            var tempInput = document.createElement('input');
            tempInput.value = uniqueLink;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            alert('Link copied to clipboard!');
        });
    });
    // Download as PDF using html2pdf.js
    downloadBtn.addEventListener('click', function () {
        var element = document.getElementById('resume-content');
        if (element) {
            html2pdf()
                .from(element)
                .save('resume.pdf');
        }
    });
});
