type IconProps = {
  className?: string;
  strokeWidth?: number;
};

export function OptimusLogoIcon() {
  return (
    <svg
      width="33"
      height="16"
      viewBox="0 0 64 31"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M18.5 0.0999985C15.5 0.0999985 12.5 1.3 10.4 3.5L3.4 10.5C1.2 12.6 0 15.6 0 18.6C0 24.9 5.1 30.1 11.5 30.1C14.5 30.1 17.5 28.9 19.6 26.7L24.5 21.8L38.7 7.6C39.7 6.6 41.1 6 42.6 6C45 6 47.1 7.6 47.8 9.8L52.3 5.3C50.3 2.1 46.7 0 42.6 0C39.6 0 36.6 1.2 34.5 3.4L15.5 22.4C14.5 23.4 13.1 24 11.6 24C8.6 24 6.1 21.5 6.1 18.5C6.1 17 6.7 15.7 7.7 14.6L14.7 7.6C15.7 6.6 17.1 6 18.6 6C21 6 23.1 7.6 23.8 9.8L28.3 5.3C26.2 2.2 22.6 0.0999985 18.5 0.0999985Z"
        fill="white"
      />
      <path
        d="M35.4998 24.1C36.9998 24.1 38.3998 23.5 39.3998 22.5L58.3998 3.5H63.5V20.3H58.3998V12.1L43.5998 26.7C41.4998 28.9 38.4998 30.1 35.4998 30.1C31.3998 30.1 27.7998 28 25.7998 24.8L30.2998 20.3C30.9998 22.5 33.0998 24.1 35.4998 24.1Z"
        fill="white"
      />
    </svg>
  );
}

export function PortfolioFeatureIcon({
  className,
  strokeWidth = 2,
}: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <g transform="translate(11.999 2.046)">
        <path
          d="M 9.001 9.954 C 9.553 9.954 10.006 9.505 9.951 8.956 C 9.476 4.222 5.732 0.479 0.998 0.005 C 0.448 -0.05 0 0.403 0 0.955 L 0 8.955 C 0 9.507 0.448 9.955 1 9.955 Z"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(1.999 2.83)">
        <path
          d="M 19.211 13.06 C 17.461 17.199 13.165 19.662 8.709 19.082 C 4.253 18.501 0.731 15.019 0.1 10.57 C -0.532 6.121 1.882 1.797 6.001 0"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function OrionFeatureIcon({
  className,
  strokeWidth = 2,
}: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <g transform="translate(12 5)">
        <path
          d="M 0 13 L 0 0"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(9 9)">
        <path
          d="M 6 4 C 4.223 3.481 3.001 1.851 3 0 C 2.999 1.851 1.777 3.481 0 4"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(6 2)">
        <path
          d="M 11.598 4.5 C 12.229 3.408 12.109 2.038 11.298 1.072 C 10.488 0.106 9.159 -0.25 7.974 0.181 C 6.789 0.612 6 1.739 6 3 C 6 1.739 5.211 0.612 4.026 0.181 C 2.841 -0.25 1.513 0.106 0.702 1.072 C -0.109 2.038 -0.229 3.408 0.402 4.5"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(17.997 5.125)">
        <path
          d="M 0 0 C 1.191 0.306 2.175 1.143 2.668 2.27 C 3.161 3.396 3.109 4.687 2.526 5.77"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(18 10.536)">
        <path
          d="M 0 7.464 C 1.81 7.464 3.395 6.248 3.864 4.499 C 4.332 2.751 3.568 0.905 2 0"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(4 17.483)">
        <path
          d="M 15.967 0 C 16.158 1.478 15.512 2.939 14.29 3.792 C 13.069 4.645 11.474 4.749 10.153 4.061 C 8.831 3.373 8.002 2.007 8 0.517 C 7.998 2.007 7.169 3.373 5.847 4.061 C 4.526 4.749 2.931 4.645 1.71 3.792 C 0.488 2.939 -0.158 1.478 0.033 0"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(2 10.536)">
        <path
          d="M 4 7.464 C 2.19 7.464 0.605 6.248 0.137 4.499 C -0.332 2.751 0.432 0.905 2 0"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(2.003 5.125)">
        <path
          d="M 3.004 0 C 1.813 0.306 0.829 1.143 0.336 2.27 C -0.157 3.396 -0.105 4.687 0.478 5.77"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function ExposureFeatureIcon({
  className,
  strokeWidth = 2,
}: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <g transform="translate(2.997 1.997)">
        <path
          d="M 1.003 12.003 C 0.617 12.004 0.265 11.783 0.098 11.434 C -0.069 11.086 -0.02 10.673 0.223 10.373 L 10.123 0.173 C 10.276 -0.004 10.531 -0.051 10.737 0.059 C 10.943 0.169 11.045 0.407 10.983 0.633 L 9.063 6.653 C 8.948 6.96 8.992 7.305 9.18 7.574 C 9.367 7.844 9.675 8.004 10.003 8.003 L 17.003 8.003 C 17.39 8.001 17.742 8.223 17.909 8.571 C 18.076 8.919 18.027 9.333 17.783 9.633 L 7.883 19.833 C 7.73 20.009 7.476 20.056 7.27 19.946 C 7.064 19.836 6.961 19.598 7.023 19.373 L 8.943 13.353 C 9.058 13.045 9.015 12.701 8.827 12.431 C 8.64 12.162 8.332 12.002 8.003 12.003 Z"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function SparklesIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <g transform="translate(1.998 1.998)">
        <path
          d="M 9.019 0.816 C 9.108 0.343 9.521 0 10.002 0 C 10.484 0 10.897 0.343 10.985 0.816 L 12.036 6.374 C 12.189 7.183 12.822 7.816 13.63 7.968 L 19.188 9.019 C 19.662 9.108 20.005 9.521 20.005 10.002 C 20.005 10.484 19.662 10.897 19.188 10.985 L 13.63 12.036 C 12.822 12.189 12.189 12.822 12.036 13.63 L 10.985 19.188 C 10.897 19.662 10.484 20.005 10.002 20.005 C 9.521 20.005 9.108 19.662 9.019 19.188 L 7.968 13.63 C 7.816 12.822 7.183 12.189 6.374 12.036 L 0.816 10.985 C 0.343 10.897 0 10.484 0 10.002 C 0 9.521 0.343 9.108 0.816 9.019 L 6.374 7.968 C 7.183 7.816 7.816 7.183 7.968 6.374 Z"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(20 2)">
        <path
          d="M 0 0 L 0 4"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(18 4)">
        <path
          d="M 4 0 L 0 0"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(2 18)">
        <path
          d="M 0 2 C 0 0.895 0.895 0 2 0 C 3.105 0 4 0.895 4 2 C 4 3.105 3.105 4 2 4 C 0.895 4 0 3.105 0 2 Z"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function GaugeNeedleIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 15 80"
      className={className}
      aria-hidden
    >
      <path
        d="M 7.455 0 C 8.646 0 9.635 0.92 9.721 2.107 L 14.819 72.079 C 15.131 76.357 11.744 80 7.455 80 C 3.165 80 -0.222 76.357 0.09 72.079 L 5.188 2.107 C 5.275 0.92 6.264 0 7.455 0 Z M 7.455 66.521 C 4.115 66.521 1.407 69.228 1.407 72.568 C 1.407 75.908 4.115 78.616 7.455 78.616 C 10.794 78.616 13.502 75.908 13.502 72.568 C 13.502 69.228 10.794 66.521 7.455 66.521 Z"
        fill="currentColor"
      />
    </svg>
  );
}
