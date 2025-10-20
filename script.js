const imageInput = document.querySelector('.imageInput');
const qualitySlider = document.querySelector('quality');
const qualityLabel = document.querySelector('.qualityLabel');
const compressBtn = document.querySelector('.compressBtn');
const preview = document.querySelector('.preview');
const downloadLink = document.querySelector('.downloadLink');

qualitySlider.addEventListener('input', () => {
    qualityLabel.textContent = `Quality: ${qualitySlider.value}%`;
});

compressBtn.addEventListener('click', compressImage);

function compressImage() {
    const file = imageInput.files[0];

    if (!file) {
        alert("Please select an image file.");
        return;
    }

    const quality = parseInt(qualitySlider.value) / 100;
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function() {
            preview.innerHTML = '<h3>Original Image</h3><img src="'+ img.src + '"/>';

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(function(blob) {
                const compressedUrl = URL.createObjectURL(blob);

                downloadLink.href = compressedUrl;
                downloadLink.download = `compressed_${file.name.replace(/\.[^/.]+$/, "jpg")}`;

                preview.innerHTML += '<h3>Compressed Image</h3><img src="' + compressedUrl + '"/>';
            }, 'image/jpeg', quality);
        }
    }

    reader.readAsDataURL(file);
}