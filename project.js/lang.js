window.onload = function() {
    const fromText = document.getElementById("from-text");
    const toText = document.getElementById("to-text");
    const translateBtn = document.getElementById("translate-btn");
    const swapBtn = document.getElementById("swap-btn");
    const copyBtn = document.getElementById("copy-btn");
    const speechBtn = document.getElementById("speech-btn");
    const stopBtn = document.getElementById("stop-btn"); // Added
    const clearButton = document.getElementById('clearBtn');
    const labelFrom = document.getElementById("label-from");
    const labelTo = document.getElementById("label-to");

    let isKoreanToUrdu = true;

    // Translation Logic
    translateBtn.onclick = function() {
        let text = fromText.value;
        if(!text) return;
        toText.placeholder = "Translating...";
        let fromLang = isKoreanToUrdu ? "ko" : "ur";
        let toLang = isKoreanToUrdu ? "ur" : "ko";

        fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLang}|${toLang}`)
            .then(res => res.json())
            .then(data => {
                toText.value = data.responseData.translatedText;
            });
    };

    // Swap Logic
    swapBtn.onclick = function() {
        isKoreanToUrdu = !isKoreanToUrdu;
        labelFrom.innerText = isKoreanToUrdu ? "Korean" : "Urdu";
        labelTo.innerText = isKoreanToUrdu ? "Urdu" : "Korean";
        fromText.style.direction = isKoreanToUrdu ? "ltr" : "rtl";
        toText.style.direction = isKoreanToUrdu ? "rtl" : "ltr";
    };

    // Speech Logic (Reads Korean or Urdu)
    speechBtn.onclick = function() {
        if(!toText.value) return;
        // Stop any current speech before starting new one
        speechSynthesis.cancel(); 
        
        let utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = isKoreanToUrdu ? "ur-PK" : "ko-KR";
        speechSynthesis.speak(utterance);
    };

    // Stop Logic
    stopBtn.onclick = function() {
        speechSynthesis.cancel();
    };

    // Clear Logic
    clearButton.onclick = function() {
        fromText.value = "";
        toText.value = "";
        toText.placeholder = "Translation...";
        speechSynthesis.cancel(); // Also stop speech if clearing
    };
};

