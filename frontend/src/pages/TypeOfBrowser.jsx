import { useEffect, useState } from 'react';
import Bowser from 'bowser';

const BrowserDetector = () => {
    const [browser, setBrowser] = useState("Unknown");

    useEffect(() => {
        const browserInfo = Bowser.parse(window.navigator.userAgent);
        setBrowser(browserInfo.browser.name);
    }, []);

    return browser;
};

export default BrowserDetector;
