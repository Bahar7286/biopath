// Export utilities - browser only, no external libraries
// PDF uses browser print, VCF uses data URI

export interface ProfileData {
  fullName: string;
  bio: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  profession?: string;
  experience?: string;
  repositories?: Array<{
    name: string;
    url: string;
    description?: string;
  }>;
}

/**
 * Export profile as PDF using browser print dialog
 */
export async function exportToPDF(profileData: ProfileData, filename: string = 'profil.pdf') {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${profileData.fullName} - Profil</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 40px; color: #111; background: white; }
    h1 { font-size: 28px; color: #5800d4; margin-bottom: 4px; }
    .username { color: #888; font-size: 14px; margin-bottom: 16px; }
    .bio { color: #444; font-size: 14px; line-height: 1.6; margin-bottom: 24px; padding: 16px; background: #f8f5ff; border-left: 4px solid #5800d4; border-radius: 4px; }
    .section-title { font-size: 16px; font-weight: 700; color: #5800d4; margin: 24px 0 12px; border-bottom: 1px solid #e8e0ff; padding-bottom: 6px; }
    .contact-item { font-size: 13px; color: #444; margin-bottom: 6px; }
    .contact-item span { font-weight: 600; color: #111; }
    .repo { margin-bottom: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; }
    .repo-name { font-weight: 700; font-size: 14px; color: #5800d4; }
    .repo-desc { font-size: 12px; color: #666; margin-top: 4px; }
    .repo-url { font-size: 11px; color: #888; margin-top: 4px; }
    .footer { margin-top: 40px; font-size: 11px; color: #aaa; text-align: center; border-top: 1px solid #eee; padding-top: 16px; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <h1>${profileData.fullName}</h1>
  ${profileData.profession ? `<p class="username">${profileData.profession}${profileData.experience ? ' · ' + profileData.experience : ''}</p>` : ''}
  <p class="bio">${profileData.bio}</p>

  ${(profileData.email || profileData.phone || profileData.location || profileData.website) ? `
  <p class="section-title">İletişim</p>
  ${profileData.email ? `<p class="contact-item"><span>E-posta:</span> ${profileData.email}</p>` : ''}
  ${profileData.phone ? `<p class="contact-item"><span>Telefon:</span> ${profileData.phone}</p>` : ''}
  ${profileData.location ? `<p class="contact-item"><span>Konum:</span> ${profileData.location}</p>` : ''}
  ${profileData.website ? `<p class="contact-item"><span>Web:</span> ${profileData.website}</p>` : ''}
  ` : ''}

  ${profileData.repositories && profileData.repositories.length > 0 ? `
  <p class="section-title">Öne Çıkan Projeler</p>
  ${profileData.repositories.map(repo => `
    <div class="repo">
      <p class="repo-name">${repo.name}</p>
      ${repo.description ? `<p class="repo-desc">${repo.description}</p>` : ''}
      <p class="repo-url">${repo.url}</p>
    </div>
  `).join('')}
  ` : ''}

  <p class="footer">BioPath Pro tarafından oluşturuldu</p>
</body>
</html>`;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Lütfen açılır pencerelere izin verin ve tekrar deneyin.');
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
}

/**
 * Export profile as VCF (vCard)
 */
export function exportToVCF(profileData: ProfileData, filename: string = 'profil.vcf') {
  let vcf = 'BEGIN:VCARD\n';
  vcf += 'VERSION:3.0\n';
  vcf += `FN:${profileData.fullName}\n`;
  vcf += `N:${profileData.fullName.split(' ').reverse().join(';')}\n`;
  if (profileData.email) vcf += `EMAIL;TYPE=INTERNET:${profileData.email}\n`;
  if (profileData.phone) vcf += `TEL:${profileData.phone}\n`;
  if (profileData.location) vcf += `ADR:;;${profileData.location}\n`;
  if (profileData.website) vcf += `URL:${profileData.website}\n`;
  if (profileData.bio) vcf += `NOTE:${profileData.bio}\n`;
  if (profileData.profession) vcf += `TITLE:${profileData.profession}\n`;
  vcf += 'END:VCARD\n';

  const element = document.createElement('a');
  element.setAttribute('href', `data:text/vcard;charset=utf-8,${encodeURIComponent(vcf)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/**
 * Export profile as HTML
 */
export function exportToHTML(profileData: ProfileData): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${profileData.fullName} Profili</title>
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; }
    h1 { color: #5800d4; }
    .bio { color: #666; }
    .project { margin: 12px 0; padding: 12px; border: 1px solid #eee; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>${profileData.fullName}</h1>
  <p class="bio">${profileData.bio}</p>
  ${profileData.email ? `<p>📧 ${profileData.email}</p>` : ''}
  ${profileData.location ? `<p>📍 ${profileData.location}</p>` : ''}
  ${profileData.website ? `<p>🌐 <a href="${profileData.website}">${profileData.website}</a></p>` : ''}
  ${profileData.repositories?.map(r => `<div class="project"><strong>${r.name}</strong><p>${r.description || ''}</p><a href="${r.url}">${r.url}</a></div>`).join('') || ''}
  <p style="color:#aaa;font-size:11px;margin-top:40px;">BioPath Pro tarafından oluşturuldu</p>
</body>
</html>`;
}

/**
 * Generate QR code using Google Charts API (no npm package needed)
 */
export async function generateQRCode(text: string, size: number = 300): Promise<string> {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
}

/**
 * Export as iCal (basic implementation without ical-generator)
 */
export function exportToICal(profileData: ProfileData, filename: string = 'profil.ics') {
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//BioPath Pro//TR',
    'BEGIN:VEVENT',
    `DTSTART:${now}`,
    `DTEND:${now}`,
    `SUMMARY:${profileData.fullName} - Profesyonel Profil`,
    `DESCRIPTION:${profileData.bio}`,
    profileData.website ? `URL:${profileData.website}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\n');

  const element = document.createElement('a');
  element.setAttribute('href', `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
