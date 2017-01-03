export function getUI(useragent) {
  let ui = 'desktop';

  if (useragent.isMobile || useragent.isTablet) {
    ui = 'mobile';
  } else if (useragent.isDesktop) {
    ui = 'desktop';
  }
  return ui;
}

