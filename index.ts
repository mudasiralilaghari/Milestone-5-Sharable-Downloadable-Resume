document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-resume') as HTMLButtonElement;
  const downloadBtn = document.getElementById('download-pdf') as HTMLButtonElement;
  const copyLinkBtn = document.getElementById('copy-link') as HTMLButtonElement;
  const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
  const resumeContent = document.getElementById('resume-content') as HTMLElement;

  let profilePicBase64 = '';

  profilePicInput.addEventListener('change', () => {
    const file = profilePicInput.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (profilePicBase64 = reader.result as string);
      reader.readAsDataURL(file);
    }
  });

  generateBtn.addEventListener('click', () => {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
    const work = (document.getElementById('work-experience') as HTMLTextAreaElement).value;

    if (!name || !email || !phone || !education || !skills || !work) {
      alert('Please fill all fields!');
      return;
    }

    resumeContent.innerHTML = `
      <div style="max-width: 800px; margin: auto; font-family: Arial, sans-serif; line-height: 1.6;">
        ${profilePicBase64 ? `<img src="${profilePicBase64}" style="width:100px; height:100px; border-radius:50%; margin-bottom: 20px;">` : ''}
        <h2 style="text-align: center;">${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Education</h3><p>${education}</p>
        <h3>Skills</h3><p>${skills}</p>
        <h3>Work Experience</h3><p>${work}</p>
      </div>
    `;

    downloadBtn.style.display = 'inline-block';
    copyLinkBtn.style.display = 'inline-block';

    const uniqueLink = `${window.location.origin}?resume=${encodeURIComponent(JSON.stringify({
      name,
      email,
      phone,
      education,
      skills,
      work,
      profilePicBase64
    }))}`;

    copyLinkBtn.addEventListener('click', () => {
      const tempInput = document.createElement('input');
      tempInput.value = uniqueLink;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      alert('Link copied to clipboard!');
    });
  });

  downloadBtn.addEventListener('click', () => {
    const element = document.getElementById('resume-content');
    if (element) {
      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      html2pdf().set(opt).from(element).save();
    }
  });
});
