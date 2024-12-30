export function isIos(): boolean {
    const userAgent = window.navigator.userAgent || window.navigator.vendor || (window as any).opera;
    // Detecta dispositivos iOS (iPhone, iPad, iPod)
    return /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
  }
  