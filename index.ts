document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-resume') as HTMLButtonElement;
  const downloadBtn = document.getElementById('download-pdf') as HTMLButtonElement;
  const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
  const resumeContent = document.getElementById('resume-content') as HTMLElement;

  let profilePicBase64: string = '';

 
  profilePicInput.addEventListener('change', () => {
    const file = profilePicInput?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        profilePicBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  });

 
  generateBtn.addEventListener('click', () => {
    const name = (document.getElementById('name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const phone = (document.getElementById('phone') as HTMLInputElement).value.trim();
    const education = (document.getElementById('education') as HTMLTextAreaElement).value.trim();
    const skills = (document.getElementById('skills') as HTMLInputElement).value.trim();
    const work = (document.getElementById('work-experience') as HTMLTextAreaElement).value.trim();

    if (!name || !email || !phone || !education || !skills || !work) {
      alert('Please fill all fields!');
      return;
    }

    // Add content to the resume preview
    resumeContent.innerHTML = `
      ${profilePicBase64 ? `<img src="${profilePicBase64}" alt="Profile Picture">` : ''}
      <h2>${name}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <h3>Education</h3><p>${education}</p>
      <h3>Skills</h3><p>${skills}</p>
      <h3>Work Experience</h3><p>${work}</p>
    `;

    resumeContent.style.display = 'block';
    downloadBtn.style.display = 'inline-block';
  });


  downloadBtn.addEventListener('click', () => {
    const element = document.getElementById('resume-content') as HTMLElement;
    const opt = {
      margin: [10, 10],
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    if (element) {
     
      html2pdf().set(opt).from(element).save();
    }
  });
});
