export default function promiseConfirm(message, approvalLabel = 'YES', denialLabel = 'NO') {
  return new Promise(resolve => {
    const html = `
      <div class="__promise-confirm">
        <div class="__promise-confirm-content">
          <div class="__promise-confirm-content-message">${message}</div>
          <div class="__promise-confirm-content-buttons">
            <button class="__promise-confirm-content-approval-button">${approvalLabel}</button>
            <button class="__promise-confirm-content-denial-button">${denialLabel}</button>
          </div>
        </div>
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    const element = wrapper.querySelector('.__promise-confirm');
    const approvalButton = element.querySelector('.__promise-confirm-content-approval-button');
    const denialButton = element.querySelector('.__promise-confirm-content-denial-button');

    const handleKeyup = event => {
      if (event.keyCode === 27 /* ESC */) {
        element.parentNode.removeChild(element);
        resolve(false);
      }
    };

    approvalButton.addEventListener('keyup', handleKeyup);
    denialButton.addEventListener('keyup', handleKeyup);

    approvalButton.addEventListener('blur', () => {
      denialButton.focus();
    });
    denialButton.addEventListener('blur', () => {
      approvalButton.focus();
    });

    approvalButton.addEventListener('click', () => {
      element.parentNode.removeChild(element);
      resolve(true);
    });
    denialButton.addEventListener('click', () => {
      element.parentNode.removeChild(element);
      resolve(false);
    });

    const parent = document.querySelector('body');
    parent.insertBefore(element, parent.firstChild);
    approvalButton.focus();
  });
}

