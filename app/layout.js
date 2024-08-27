export default function RootLayout({ children, backgroundImage }) {
  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }
    : {};

  /* 
    
    The error at the top is "normal". 

    It is caused by layout.js loading faster than page.js and not accepting the background image in time. 

    But after page.js loads, layout.js accepts it and applies it to the page. This should be fixed.

  */

  return (
    <html lang="en">
      <body style={backgroundStyle}>{children}</body>
    </html>
  );
}
