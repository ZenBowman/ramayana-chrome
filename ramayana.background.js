function launch() {
    chrome.app.window.create('ramayana.html', {
	'bounds' : {
	    'width' : 800,
	    'height' : 800
	}
    });
}

chrome.app.runtime.onLaunched.addListener(launch);
