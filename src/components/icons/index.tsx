/*
 * SVG Icons
 *
 * @Author: VenDream
 * @Date: 2025-05-09 11:24:30
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

interface IconProps {
  size?: number;
  className?: string;
}

export function ZhFlagIcon(props: IconProps) {
  const { size = 18, className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      width={size}
      height={size}
      className={className}
    >
      <title>ZH_FLAG</title>
      <path
        fill="#DE2910"
        d="M36 27c0 2.209-1.791 4-4 4H4c-2.209 0-4-1.791-4-4V9c0-2.209 1.791-4 4-4h28c2.209 0 4 1.791 4 4v18z"
      />
      <path
        fill="#FFDE02"
        d="M11.136 8.977l.736.356.589-.566-.111.81.72.386-.804.144-.144.804-.386-.72-.81.111.566-.589zm4.665 2.941l-.356.735.566.59-.809-.112-.386.721-.144-.805-.805-.144.721-.386-.112-.809.59.566zm-.957 3.779l.268.772.817.017-.651.493.237.783-.671-.467-.671.467.236-.783-.651-.493.817-.017zm-3.708 3.28l.736.356.589-.566-.111.81.72.386-.804.144-.144.804-.386-.72-.81.111.566-.589zM7 10.951l.929 2.671 2.826.058-2.253 1.708.819 2.706L7 16.479l-2.321 1.615.819-2.706-2.253-1.708 2.826-.058z"
      />
    </svg>
  );
}

export function EnFlagIcon(props: IconProps) {
  const { size = 18, className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      width={size}
      height={size}
      className={className}
    >
      <title>EN_FLAG</title>
      <path
        fill="#00247D"
        d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z"
      />
      <path
        fill="#CF1B2B"
        d="M25.14 23l9.712 6.801c.471-.479.808-1.082.99-1.749L28.627 23H25.14zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943V23zm10-10h2.141l9.711-6.8c-.521-.53-1.188-.909-1.937-1.085L23 12.057V13zm-12.141 0L1.148 6.2C.677 6.68.34 7.282.157 7.949L7.372 13h3.487z"
      />
      <path
        fill="#EEE"
        d="M36 21H21v10h2v-5.836L31.335 31H32c1.117 0 2.126-.461 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36v-2zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21H0zM36 9c0-1.091-.439-2.078-1.148-2.8L25.141 13H23v-.943l9.915-6.942C32.62 5.046 32.316 5 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059V9zM13 5v5.837L4.664 5H4c-1.118 0-2.126.461-2.852 1.2l9.711 6.8H7.372L.157 7.949C.065 8.286 0 8.634 0 9v.059L5.628 13H0v2h15V5h-2z"
      />
      <path fill="#CF1B2B" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z" />
    </svg>
  );
}

export function WeiboIcon(props: IconProps) {
  const { size = 18, className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
    >
      <title>WEIBO_ICON</title>
      <path
        fill="currentColor"
        d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02c-.259-2.609 2.759-5.047 6.74-5.441c3.979-.394 7.413 1.404 7.671 4.018c.259 2.6-2.759 5.049-6.737 5.439l-.002.004zM9.05 17.219c-.384.616-1.208.884-1.829.602c-.612-.279-.793-.991-.406-1.593c.379-.595 1.176-.861 1.793-.601c.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253c-.236-.09-.313-.361-.177-.586c.138-.227.436-.346.672-.24c.239.09.315.36.18.601l.014-.028zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118c-.836 1.704-.026 3.591 1.886 4.21c1.983.64 4.318-.341 5.132-2.179c.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.57-.18-.405-.615c.375-.977.42-1.804 0-2.404c-.781-1.112-2.915-1.053-5.364-.03c0 0-.766.331-.571-.271c.376-1.217.315-2.224-.27-2.809c-1.338-1.337-4.869.045-7.888 3.08C1.309 10.87 0 13.273 0 15.348c0 3.981 5.099 6.395 10.086 6.395c6.536 0 10.888-3.801 10.888-6.82c0-1.822-1.547-2.854-2.915-3.284v.01zm1.908-5.092a3.101 3.101 0 0 0-2.96-.962a.786.786 0 0 0-.616.932a.79.79 0 0 0 .932.602a1.512 1.512 0 0 1 1.442.465c.376.421.466.977.316 1.473a.786.786 0 0 0 .51.992a.813.813 0 0 0 .992-.512a3.108 3.108 0 0 0-.646-3.035l.03.045zm2.418-2.195c-1.576-1.757-3.905-2.419-6.054-1.968a.91.91 0 0 0-.706 1.081a.91.91 0 0 0 1.082.707a4.5 4.5 0 0 1 4.296 1.383a4.533 4.533 0 0 1 .947 4.416a.91.91 0 0 0 .586 1.157c.479.165.991-.104 1.157-.586a6.387 6.387 0 0 0-1.338-6.235l.03.045z"
      />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  const { size = 18, className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 50 50"
      className={className}
    >
      <title>TWITTER_ICON</title>
      <path
        fill="currentColor"
        d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"
      />
    </svg>
  );
}

export function ROTNIcon(props: IconProps) {
  const { size = 18, className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      className={className}
    >
      <title>ROTN_ICON</title>
      <path
        fill="currentColor"
        d="M214.7 209.7a1.89 1.89 0 0 0-.11-.25l-45.48-96.86l20.5-32.18a1.74 1.74 0 0 0 .11-.18a16 16 0 0 0 0-16.46c-.09-.16-.2-.32-.3-.47L168 32.7V8a8 8 0 0 0-16 0v24.42L146.74 39a24 24 0 0 1-37.48 0L104 32.42V8a8 8 0 0 0-16 0v24.7L66.58 63.3c-.1.15-.21.31-.3.47a16 16 0 0 0 0 16.46a1.74 1.74 0 0 0 .11.18l20.5 32.18l-45.48 96.86a1.89 1.89 0 0 0-.11.25A16 16 0 0 0 56 232h144a16 16 0 0 0 14.71-22.3ZM80 72l16.43-23.43l.33.42a40 40 0 0 0 62.48 0l.33-.42L176 72l-20.38 32h-55.23ZM56 216l45.07-96h53.84L200 216Z"
      />
    </svg>
  );
}

export function AndroidIcon(props: IconProps) {
  const { size = 18, className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
    >
      <title>ANDROID_ICON</title>
      <path
        fill="currentColor"
        d="M19 13H5v7h14zm0-2a7 7 0 1 0-14 0zM6.382 3.968A8.96 8.96 0 0 1 12 2c2.125 0 4.078.736 5.618 1.968l1.453-1.453l1.414 1.414l-1.453 1.453A8.96 8.96 0 0 1 21 11v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11c0-2.125.736-4.078 1.968-5.618L3.515 3.93l1.414-1.414zM9 9a1 1 0 1 1 0-2a1 1 0 0 1 0 2m6 0a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
      />
    </svg>
  );
}

export function IosIcon(props: IconProps) {
  const { size = 18, className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
    >
      <title>IOS_ICON</title>
      <path
        d="M16 18H7V4h9m-4.5 18a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m4-21h-8A2.5 2.5 0 0 0 5 3.5v17A2.5 2.5 0 0 0 7.5 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 15.5 1z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WebIcon(props: IconProps) {
  const { size = 18, className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
    >
      <title>WEB_ICON</title>
      <path
        fill="currentColor"
        d="M26 2h4v4h-4zm0 6h4v4h-4zm-6-6h4v4h-4zm0 6h4v4h-4z"
      />
      <path
        fill="currentColor"
        d="M28 16v6H4V6h12V4H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8v4H8v2h16v-2h-4v-4h8a2 2 0 0 0 2-2v-6ZM18 28h-4v-4h4Z"
      />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  const { size = 18, className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
    >
      <title>PLAY_ICON</title>
      <path
        fill="currentColor"
        d="M10 15.577L15.577 12L10 8.423zM4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19z"
      />
    </svg>
  );
}
