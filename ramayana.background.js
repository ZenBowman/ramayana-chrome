function launch() {
    chrome.app.window.create('ramayana.html', {
	'bounds' : {
	    'width' : 1200,
	    'height' : 650
	}
    });
}

chrome.app.runtime.onLaunched.addListener(launch);
