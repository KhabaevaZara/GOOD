const searchInputField = document.getElementById('search-input');
const searchRightIcons = document.querySelector('.search-right-icons');

function updateIconsVisibility() {
    // Если в поле есть текст (без учета пробелов по краям)
    if (searchInputField.value.trim().length > 0) {
        searchRightIcons.classList.add('typing-mode');
    } else {
        // Если поле пустое, возвращаем все кнопки
        searchRightIcons.classList.remove('typing-mode');
    }
}
searchInputField.addEventListener('input', updateIconsVisibility);




// ВК
const keyboardBtn      = document.getElementById('keyboard-btn');
const virtualKeyboard  = document.getElementById('virtual-keyboard');
const vkCloseBtn       = document.getElementById('vk-close');
const searchInput      = document.getElementById('search-input');
const vkKeysContainer  = document.getElementById('vk-keys-container');

const layout = [
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
    ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.'],
    ['Shift', 'Space', 'Backspace']
];

let isShiftActive = false;

function renderKeyboard() {
    vkKeysContainer.innerHTML = '';
    layout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'vk-row';

        row.forEach(key => {
            const keyDiv = document.createElement('div');
            keyDiv.className = 'vk-key';
            keyDiv.textContent = key;

            if (key === 'Space') {
                keyDiv.classList.add('space');
                keyDiv.textContent = '';
            } else if (key === 'Backspace') {
                keyDiv.classList.add('special');
                keyDiv.textContent = '⌫';
            } else if (key === 'Shift') {
                keyDiv.classList.add('special');
                keyDiv.textContent = '⇧';
            }

            keyDiv.addEventListener('click', () => {
                if (key === 'Space') {
                    searchInput.value += ' ';
                } else if (key === 'Backspace') {
                    searchInput.value = searchInput.value.slice(0, -1);
                } else if (key === 'Shift') {
                    isShiftActive = !isShiftActive;
                    keyDiv.style.backgroundColor = isShiftActive ? '#d2e3fc' : '#e8eaed';
                } else {
                    const char = isShiftActive ? key.toUpperCase() : key;
                    searchInput.value += char;
                }
                searchInput.focus();
                
                //  Обновляем видимость кнопок после клика по ВК
                updateIconsVisibility();
            });

            rowDiv.appendChild(keyDiv);
        });
        vkKeysContainer.appendChild(rowDiv);
    });
}

renderKeyboard();

keyboardBtn.addEventListener('click', () => {
    virtualKeyboard.classList.toggle('active');
});

vkCloseBtn.addEventListener('click', () => {
    virtualKeyboard.classList.remove('active');
});




// Мею акка 

const profilePic      = document.querySelector('.profile-pic');
const accountDropdown = document.getElementById('account-dropdown');

profilePic.addEventListener('click', (e) => {
    e.stopPropagation();
    accountDropdown.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!accountDropdown.contains(e.target) && !profilePic.contains(e.target)) {
        accountDropdown.classList.remove('active');
    }
});

document.getElementById('acc-close').addEventListener('click', () => {
    accountDropdown.classList.remove('active');
});

document.querySelector('.acc-promo-close-btn').addEventListener('click', () => {
    document.querySelector('.acc-promo').style.display = 'none';
});





// Камера

const cameraBtn          = document.getElementById('camera-btn');
const imageSearchInput   = document.getElementById('image-search-input');
const imagePreviewOverlay = document.getElementById('image-preview-overlay');
const previewImg         = document.getElementById('preview-img');
const closePreviewBtn    = document.getElementById('close-preview');

cameraBtn.addEventListener('click', () => {
    imageSearchInput.click();
});

imageSearchInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
        previewImg.src = ev.target.result;
        imagePreviewOverlay.classList.add('active');
    };
    reader.readAsDataURL(file);

    // Сброс, чтобы можно было выбрать ту же картинку снова
    imageSearchInput.value = '';
});

closePreviewBtn.addEventListener('click', () => {
    imagePreviewOverlay.classList.remove('active');
});

imagePreviewOverlay.addEventListener('click', (e) => {
    if (e.target === imagePreviewOverlay) {
        imagePreviewOverlay.classList.remove('active');
    }
});




// Смнеа авы 

const avatarUpload    = document.getElementById('avatar-upload');
const modalAvatarImg  = document.getElementById('modal-avatar-img');
const headerProfilePic = document.getElementById('header-profile-pic');
const headerAvatarImg = headerProfilePic ? headerProfilePic.querySelector('img') : null;

function applySavedAvatar() {
    const savedAvatar = localStorage.getItem('user-avatar');
    if (!savedAvatar) return;

    if (modalAvatarImg) modalAvatarImg.src = savedAvatar;

    if (headerAvatarImg) {
        headerAvatarImg.src = savedAvatar;
        headerAvatarImg.style.display = '';
    } else if (headerProfilePic) {
        headerProfilePic.innerHTML = '<img src="' + savedAvatar + '" alt="Профиль">';
    }
}
applySavedAvatar();

avatarUpload.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        const newImageSrc = event.target.result;

        // Обновляем в меню аккаунта
        if (modalAvatarImg) {
            modalAvatarImg.src = newImageSrc;
        } else {
            const wrapper = document.querySelector('.acc-avatar-wrapper');
            if (wrapper) {
                const newImg = document.createElement('img');
                newImg.id  = 'modal-avatar-img';
                newImg.src = newImageSrc;
                wrapper.insertBefore(newImg, wrapper.firstChild);
            }
        }

        // Обновляем в шапке сайта
        const currentHeaderImg = document.querySelector('#header-profile-pic img');
        if (currentHeaderImg) {
            currentHeaderImg.src = newImageSrc;
            currentHeaderImg.style.display = '';
        } else if (headerProfilePic) {
            headerProfilePic.innerHTML = '<img src="' + newImageSrc + '" alt="Профиль">';
        }

        // Сохр localStorage
        try {
            localStorage.setItem('user-avatar', newImageSrc);
        } catch (err) {
            console.warn('Не удалось сохранить аватарку в localStorage (возможно, файл слишком большой):', err);
        }
    };
    reader.readAsDataURL(file);
});