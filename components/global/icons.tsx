import * as React from "react";
import { useColorScheme } from "nativewind";
import Svg, { SvgProps, Defs, G, Path } from "react-native-svg";

// Definimos una interfaz para las props (opcional pero recomendado en TS)
interface IconProps {
  size?: number | string;
  color?: string;
  [key: string]: any; // Para permitir otras props como style o onPress
}

const Fire_2 = ({ size = 20, color = "#a5401a", ...props }: IconProps) => (
  <Svg
    fill={color}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    data-name="Layer 1"
    {...props}
  >
    <Path d="M8.46777,8.39453l-.00225.00183-.00214.00208ZM18.42188,8.208a1.237,1.237,0,0,0-.23-.17481.99959.99959,0,0,0-1.39941.41114,5.78155,5.78155,0,0,1-1.398,1.77734,8.6636,8.6636,0,0,0,.1333-1.50977,8.71407,8.71407,0,0,0-4.40039-7.582,1.00009,1.00009,0,0,0-1.49121.80567A7.017,7.017,0,0,1,7.165,6.87793l-.23047.1875a8.51269,8.51269,0,0,0-1.9873,1.8623A8.98348,8.98348,0,0,0,8.60254,22.83594.99942.99942,0,0,0,9.98,21.91016a1.04987,1.04987,0,0,0-.0498-.3125,6.977,6.977,0,0,1-.18995-2.58106,9.004,9.004,0,0,0,4.3125,4.0166.997.997,0,0,0,.71534.03809A8.99474,8.99474,0,0,0,18.42188,8.208ZM14.51709,21.03906a6.964,6.964,0,0,1-3.57666-4.40234,8.90781,8.90781,0,0,1-.17969-.96387,1.00025,1.00025,0,0,0-.79931-.84473A.982.982,0,0,0,9.77,14.80957a.99955.99955,0,0,0-.8667.501,8.9586,8.9586,0,0,0-1.20557,4.71777,6.98547,6.98547,0,0,1-1.17529-9.86816,6.55463,6.55463,0,0,1,1.562-1.458.74507.74507,0,0,0,.07422-.05469s.29669-.24548.30683-.2511a8.96766,8.96766,0,0,0,2.89874-4.63269,6.73625,6.73625,0,0,1,1.38623,8.08789,1.00024,1.00024,0,0,0,1.18359,1.418,7.85568,7.85568,0,0,0,3.86231-2.6875,7.00072,7.00072,0,0,1-3.2793,10.457Z" />
  </Svg>
);

const Fire = ({ size = 20, ...props }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    {...props} // Ahora TypeScript sabe que aquí van cosas válidas para un SVG
  >
    <Path
      fill="#FF8F1F"
      d="M266.91 500.44c-168.738 0-213.822-175.898-193.443-291.147c.887-5.016 7.462-6.461 10.327-2.249c8.872 13.04 16.767 31.875 29.848 30.24c19.661-2.458 33.282-175.946 149.807-224.761c3.698-1.549 7.567 1.39 7.161 5.378c-5.762 56.533 28.181 137.468 88.316 137.468c34.472 0 58.058-27.512 69.844-55.142c3.58-8.393 15.843-7.335 17.896 1.556c21.031 91.082 77.25 398.657-179.756 398.657z"
    />
    <Path
      fill="#FFB636"
      d="M207.756 330.827c3.968-3.334 9.992-1.046 10.893 4.058c2.108 11.943 9.04 32.468 31.778 32.468c27.352 0 45.914-75.264 50.782-97.399c.801-3.642 4.35-6.115 8.004-5.372c68.355 13.898 101.59 235.858-48.703 235.858c-109.412 0-84.625-142.839-52.754-169.613zM394.537 90.454c2.409-18.842-31.987 32.693-31.987 32.693s26.223 12.386 31.987-32.693zM47.963 371.456c.725-8.021-9.594-29.497-11.421-20.994c-4.373 20.344 10.696 29.016 11.421 20.994z"
    />
    <Path
      fill="#FFD469"
      d="M323.176 348.596c-2.563-10.69-11.755 14.14-10.6 24.254c1.155 10.113 16.731 1.322 10.6-24.254z"
    />
  </Svg>
);

const ArrowRight = ({ size = 20, fill = "#231F20", ...props }: IconProps) => (
  <Svg height={size} width={size} viewBox="0 0 50 50" {...props}>
    <Path
      fill={fill}
      d="M15.563,40.836c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l15-15 c0.391-0.391,0.391-1.023,0-1.414l-15-15c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l14.293,14.293L15.563,39.422 C15.172,39.813,15.172,40.446,15.563,40.836z"
    />
  </Svg>
);

const Moon = ({ size = 25, fill = "#000000", ...props }: IconProps) => (
  <Svg fill={fill} width={size} height={size} viewBox="0 0 24 24" {...props}>
    <Path
      id="primary"
      d="M21,12A9,9,0,0,1,3.25,14.13,6.9,6.9,0,0,0,8,16,7,7,0,0,0,11.61,3H12A9,9,0,0,1,21,12Z"
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </Svg>
);

const Sun = ({ size = 25, fill = "#0D0D0D", ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm7.071 2.929a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm-14.142 0a1 1 0 0 1 1.414 0l.707.707A1 1 0 0 1 5.636 7.05l-.707-.707a1 1 0 0 1 0-1.414zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-6 4a6 6 0 1 1 12 0 6 6 0 0 1-12 0zm-4 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm17 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1zM5.636 16.95a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707zm11.314 1.414a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707zM12 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1z"
      fill={fill}
    />
  </Svg>
);

const FullArrowRight = ({ size = 20, ...props }: IconProps) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === "dark";

  return (
    <Svg
      fill={!isDarkMode ? `#f4f2ed` : `#141414`}
      width={size}
      height={size}
      viewBox="0 0 15 15"
      {...props}
    >
      <Path d="M8.29289 2.29289C8.68342 1.90237 9.31658 1.90237 9.70711 2.29289L14.2071 6.79289C14.5976 7.18342 14.5976 7.81658 14.2071 8.20711L9.70711 12.7071C9.31658 13.0976 8.68342 13.0976 8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L11 8.5H1.5C0.947715 8.5 0.5 8.05228 0.5 7.5C0.5 6.94772 0.947715 6.5 1.5 6.5H11L8.29289 3.70711C7.90237 3.31658 7.90237 2.68342 8.29289 2.29289Z" />
    </Svg>
  );
};

const Home = ({ size = 20, color, ...props }: IconProps) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === "dark";
  return (
    <Svg
      fill={color || (isDarkMode ? "#9f9f9f" : "#141414")}
      width={size}
      height={size}
      style={{ left: 2 }}
      {...props}
    >
      <Path d="M18 18V7.132l-8-4.8-8 4.8V18h4v-2.75a4 4 0 1 1 8 0V18h4zm-6 2v-4.75a2 2 0 1 0-4 0V20H2a2 2 0 0 1-2-2V7.132a2 2 0 0 1 .971-1.715l8-4.8a2 2 0 0 1 2.058 0l8 4.8A2 2 0 0 1 20 7.132V18a2 2 0 0 1-2 2h-6z" />
    </Svg>
  );
};

const Decks = ({ size = 20, color, ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M2 12.6101H19"
      stroke={color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19 10.28V17.43C18.97 20.28 18.19 21 15.22 21H5.78003C2.76003 21 2 20.2501 2 17.2701V10.28C2 7.58005 2.63 6.71005 5 6.57005C5.24 6.56005 5.50003 6.55005 5.78003 6.55005H15.22C18.24 6.55005 19 7.30005 19 10.28Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 6.73V13.72C22 16.42 21.37 17.29 19 17.43V10.28C19 7.3 18.24 6.55 15.22 6.55H5.78003C5.50003 6.55 5.24 6.56 5 6.57C5.03 3.72 5.81003 3 8.78003 3H18.22C21.24 3 22 3.75 22 6.73Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.25 17.8101H6.96997"
      stroke={color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.10986 17.8101H12.5499"
      stroke={color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const Plus = ({ size = 20, color, ...props }: IconProps) => (
  <Svg
    fill={color || "#000000"}
    width={size}
    height={size}
    viewBox="0 0 15 15"
    {...props}
  >
    <Path
      id="Path_60"
      data-name="Path 60"
      d="M14.5,55H8V48.5a.5.5,0,0,0-1,0V55H.5a.5.5,0,0,0,0,1H7v6.5a.5.5,0,0,0,1,0V56h6.5a.5.5,0,0,0,0-1Z"
      transform="translate(0 -48)"
    />
  </Svg>
);

const MagnifyingGlass = ({ size = 20, color, ...props }: IconProps) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === "dark";
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024" {...props}>
      <Path
        fill={color || (isDarkMode ? "#f4f2ed" : "#141414")}
        d="M795.904 750.72l124.992 124.928a32 32 0 01-45.248 45.248L750.656 795.904a416 416 0 1145.248-45.248zM480 832a352 352 0 100-704 352 352 0 000 704z"
      />
    </Svg>
  );
};

const BackIcon = ({ size = 25, ...props }: IconProps) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill="#9f9f9f"
      {...props}
    >
      <Path
        d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
        fill="#9f9f9f"
      />
    </Svg>
  );
};

const TrashCan = ({ size = 20, ...props }: IconProps) => (
  <Svg
    fill="#de4e4b"
    width={size}
    height={size}
    viewBox="-3 -2 24 24"
    {...props}
  >
    <Path d="M6 2V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-.133l-.68 10.2a3 3 0 0 1-2.993 2.8H5.826a3 3 0 0 1-2.993-2.796L2.137 7H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4zm10 2H2v1h14V4zM4.141 7l.687 10.068a1 1 0 0 0 .998.932h6.368a1 1 0 0 0 .998-.934L13.862 7h-9.72zM7 8a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z" />
  </Svg>
);

const Dots = ({ size = 20, ...props }: IconProps) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === "dark";
  return (
    <Svg
      fill={isDarkMode ? "#9f9f9f" : "#141414"}
      width={size}
      height={size}
      viewBox="0 0 1000 1000"
      {...props}
    >
      <Path d="M244 416q-35 0-59.5 24.5T160 500t24.5 59.5T244 584t59.5-24.5T328 500t-24.5-59.5T244 416zm256 0q-35 0-59.5 24.5T416 500t24.5 59.5 59 24.5 59.5-24.5 25-59.5-25-59.5-60-24.5h1zm256 0q-35 0-59.5 24.5T672 500t24.5 59.5T756 584t59.5-24.5T840 500t-24.5-59.5T756 416z" />
    </Svg>
  );
};

const Pencil = ({ size = 20, ...props }: IconProps) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === "dark";

  return (
    <Svg
      fill={isDarkMode ? "#9f9f9f" : "#141414"}
      width={size}
      height={size}
      viewBox="-2.5 -2.5 24 24"
      preserveAspectRatio="xMinYMin"
      className="jam jam-pencil"
      {...props}
    >
      <Path d="M12.238 5.472L3.2 14.51l-.591 2.016 1.975-.571 9.068-9.068-1.414-1.415zM13.78 3.93l1.414 1.414 1.318-1.318a.5.5 0 0 0 0-.707l-.708-.707a.5.5 0 0 0-.707 0L13.781 3.93zm3.439-2.732l.707.707a2.5 2.5 0 0 1 0 3.535L5.634 17.733l-4.22 1.22a1 1 0 0 1-1.237-1.241l1.248-4.255 12.26-12.26a2.5 2.5 0 0 1 3.535 0z" />
    </Svg>
  );
};

const Export = ({ size = 20, ...props }: IconProps) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === "dark";

  return (
    <Svg
      fill={isDarkMode ? "#9f9f9f" : "#141414"}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path d="M3.293,20.707a1,1,0,0,1,0-1.414L17.586,5H12a1,1,0,0,1,0-2h8a1,1,0,0,1,1,1v8a1,1,0,0,1-2,0V6.414L4.707,20.707a1,1,0,0,1-1.414,0Z" />
    </Svg>
  );
};

const Archive = ({ size = 20, ...props }: IconProps) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === "dark";

  return (
    <Svg
      fill={isDarkMode ? "#9f9f9f" : "#141414"}
      width={size}
      height={size}
      viewBox="-2 -4 24 24"
      preserveAspectRatio="xMinYMin"
      className="jam jam-box"
      {...props}
    >
      <Path d="M3 0h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zm10.874 5a4.002 4.002 0 0 1-7.748 0H2V5h16v2h-4.126zm-2.142 0H8.268a2 2 0 0 0 3.464 0z" />
    </Svg>
  );
};

const Add = ({ size = 20, ...props }: IconProps) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === "dark";

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={isDarkMode ? "#9f9f9f" : "#141414"}
      {...props}
    >
      <Path d="M14 7v1H8v6H7V8H1V7h6V1h1v6h6z" />
    </Svg>
  );
};

const Settings = ({ size = 20, color, ...props }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 256 256" {...props}>
      <Defs />
      <G>
        <Path
          d="M 48.000002,16 H 208 c 17.728,0 32,14.272 32,32 v 160 c 0,17.728 -14.272,32 -32,32 H 48.000002 c -17.728,0 -32,-14.272 -32,-32 V 48 c 0,-17.728 14.272,-32 32,-32 z"
          fill="none"
          stroke={color || "#000000"}
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={4}
          strokeDasharray="none"
          strokeOpacity={1}
        />
        <Path
          d="M 64.000006,64.000001 H 79.999993"
          fill="none"
          stroke={color || "#000000"}
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={4}
          strokeDasharray="none"
          strokeOpacity={1}
        />
        <Path
          transform="rotate(90)"
          d="m 79.999996,-96.000015 a 16,16 0 0 1 -16,16 16,16 0 0 1 -16,-16 16,16 0 0 1 16,-16.000005 16,16 0 0 1 16,16.000005 z"
          fill="none"
          stroke={color || "#000000"}
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={4}
          strokeDasharray="none"
          strokeOpacity={1}
        />
        <Path
          d="m 112.00001,64.000353 79.99997,-3.52e-4"
          fill="none"
          stroke={color || "#000000"}
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={4}
          strokeDasharray="none"
          strokeOpacity={1}
        />
        <Path
          d="M 191.99998,128 H 176"
          fill="none"
          stroke={color || "#000000"}
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={4}
          strokeDasharray="none"
          strokeOpacity={1}
        />
        <Path
          transform="matrix(0,1,1,0,0,0)"
          d="m 144,159.99997 a 16,16 0 0 1 -16,16 16,16 0 0 1 -16,-16 16,16 0 0 1 16,-16 16,16 0 0 1 16,16 z"
          fill="none"
          stroke={color || "#000000"}
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={4}
          strokeDasharray="none"
          strokeOpacity={1}
        />
        <Path
          d="M 143.99998,128.00035 64.000006,128"
          fill="none"
          stroke={color || "#000000"}
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={4}
          strokeDasharray="none"
          strokeOpacity={1}
        />
        <Path
          d="M 64.000006,192.00001 H 79.999993"
          fill="none"
          stroke={color || "#000000"}
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={4}
          strokeDasharray="none"
          strokeOpacity={1}
        />
        <Path
          transform="rotate(90)"
          d="m 208,-96.000015 a 16,16 0 0 1 -16,16 16,16 0 0 1 -16,-16 16,16 0 0 1 16,-16.000005 16,16 0 0 1 16,16.000005 z"
          fill="none"
          stroke={color || "#000000"}
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={4}
          strokeDasharray="none"
          strokeOpacity={1}
        />
        <Path
          d="m 112.00001,192.00036 79.99997,-3.5e-4"
          fill="none"
          stroke={color || "#000000"}
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={4}
          strokeDasharray="none"
          strokeOpacity={1}
        />
      </G>
    </Svg>
  );
};

const Clock = ({ size, ...props }: { size?: number } & SvgProps) => (
  <Svg
    width={size || "800px"}
    height={size || "800px"}
    viewBox="0 0 15 15"
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z"
      fill="#9f9f9f"
    />
  </Svg>
);

const Bell = ({ size, ...props }: { size?: number } & SvgProps) => (
  <Svg
    fill="#9f9f9f"
    width={size || "800px"}
    height={size || "800px"}
    viewBox="-1.5 0 24 24"
    {...props}
  >
    <Path d="m19.945 15.512c-.8-.786-1.619-1.6-1.619-5.44-.005-3.881-2.832-7.101-6.539-7.717l-.046-.006c.165-.237.263-.531.263-.848 0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0 .317.098.611.266.853l-.003-.005c-3.753.623-6.579 3.843-6.584 7.723v.001c0 3.84-.822 4.655-1.619 5.44-.653.577-1.062 1.417-1.062 2.352 0 1.732 1.404 3.135 3.135 3.135h.007 4.36c0 1.657 1.343 3 3 3s3-1.343 3-3h4.363.007c1.732 0 3.135-1.404 3.135-3.135 0-.935-.409-1.775-1.059-2.349l-.003-.003zm-9.441 6.613c-.621-.001-1.124-.504-1.125-1.125h2.251c-.001.621-.505 1.125-1.126 1.125zm7.36-3.376h-14.726c-.487-.003-.881-.398-.881-.886 0-.243.098-.463.256-.623 1.34-1.34 2.418-2.612 2.418-7.17 0-3.077 2.495-5.572 5.572-5.572s5.572 2.495 5.572 5.572c0 4.578 1.089 5.84 2.418 7.17.158.16.256.38.256.623 0 .488-.394.883-.881.886z" />
  </Svg>
);

const Theme = ({ size, ...props }: { size?: number } & SvgProps) => (
  <Svg
    width={size || "24px"}
    height={size || "24px"}
    viewBox="0 0 24 24"
    {...props}
  >
    <G
      id="\uD83D\uDD0D-Product-Icons"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <G id="ic_fluent_dark_theme_24_filled" fill="#9f9f9f" fillRule="nonzero">
        <Path
          d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20 L12,4 C16.418278,4 20,7.581722 20,12 C20,16.418278 16.418278,20 12,20 Z"
          id="\uD83C\uDFA8-Color"
        />
      </G>
    </G>
  </Svg>
);

const Wave = ({ size, ...props }: { size?: number } & SvgProps) => (
  <Svg
    width={size || "800px"}
    height={size || "800px"}
    viewBox="0 -2 20 20"
    {...props}
  >
    <G id="wave" transform="translate(-2 -4)">
      <Path
        id="primary"
        d="M21,11c-2.25,0-2.25,2-4.5,2s-2.25-2-4.5-2-2.25,2-4.5,2S5.25,11,3,11"
        fill="none"
        stroke="#9f9f9f"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path
        id="primary-2"
        data-name="primary"
        d="M3,5C5.25,5,5.25,7,7.5,7S9.75,5,12,5s2.26,2,4.51,2S18.75,5,21,5"
        fill="none"
        stroke="#9f9f9f"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path
        id="primary-3"
        data-name="primary"
        d="M21,17c-2.25,0-2.25,2-4.5,2s-2.25-2-4.5-2-2.25,2-4.5,2S5.25,17,3,17"
        fill="none"
        stroke="#9f9f9f"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </G>
  </Svg>
);

const Quaver = ({ size, ...props }: { size?: number } & SvgProps) => (
  <Svg
    width={size || "800px"}
    height={size || "800px"}
    viewBox="0 0 17 17"
    className="si-glyph si-glyph-music"
    {...props}
  >
    <Defs />
    <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <Path
        d="M7.942,0.751 L6.035,0.042 L6.035,11.139 C5.433,11.089 4.75,11.176 4.111,11.438 C2.517,12.089 1.689,13.655 2.146,14.75 C2.604,15.848 4.175,16.354 5.767,15.703 C6.991,15.203 7.84,14.252 7.951,13.341 L7.943,3.524 C10.57,4.322 12.463,5.197 12.463,7.808 C12.463,8.735 13.983,9.631 13.983,5.996 C13.982,2.904 11.33,1.034 7.942,0.751 L7.942,0.751 Z"
        fill="#9f9f9f"
      />
    </G>
  </Svg>
);

const Padlock = ({ size, ...props }: { size?: number } & SvgProps) => (
  <Svg
    fill="#9f9f9f"
    width={size || "800px"}
    height={size || "800px"}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M17,9V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" />
  </Svg>
);

const Swap = ({
  size,
  fill,
  ...props
}: { size?: number; fill?: string } & SvgProps) => (
  <Svg
    width={size || "800px"}
    height={size || "800px"}
    viewBox="0 0 20 20"
    {...props}
  >
    <Path
      fill={fill || "#9f9f9f"}
      d="M19.29894,13.097555 C19.9200379,13.097555 20.2332042,13.8469628 19.7969407,14.2892722 L14.369746,19.7916791 C14.0983279,20.0668585 13.6553376,20.0697948 13.3802994,19.7982374 C13.1052612,19.52668 13.1023265,19.0834622 13.3737445,18.8082827 L17.6255116,14.497593 L0.703482198,14.497593 C0.317070803,14.497593 0.00382247492,14.1841838 0.00382247492,13.797574 C0.00382247492,13.4109642 0.317070803,13.097555 0.703482198,13.097555 L19.29894,13.097555 Z M6.61970059,0.201762638 C6.89473881,0.473320047 6.89767354,0.91653784 6.62625551,1.19171729 L2.37448841,5.50240698 L19.2965178,5.50240698 C19.6829292,5.50240698 19.9961775,5.81581617 19.9961775,6.20242599 C19.9961775,6.58903581 19.6829292,6.902445 19.2965178,6.902445 L0.701060011,6.902445 C0.0799621139,6.902445 -0.233204177,6.15303716 0.203059275,5.7107278 L5.63025404,0.208320918 C5.90167207,-0.0668585286 6.34466238,-0.0697947706 6.61970059,0.201762638 Z"
    />
  </Svg>
);

const Sum = ({ size, ...props }: { size?: number } & SvgProps) => (
  <Svg
    id="Capa_1"
    width={size || "484.21px"}
    height={size || "484.21px"}
    viewBox="0 0 484.21 484.21"
    fill="#9f9f9f"
    {...props}
  >
    <G>
      <Path d="M395.527,97.043V55.352H124.537l159.46,171.507c9.983,10.749,9.848,27.458-0.319,38.026L126.017,428.861h269.504v-25.18 c0-15.256,12.413-27.668,27.674-27.668c15.256,0,27.681,12.412,27.681,27.668v52.848c0,15.262-12.419,27.681-27.681,27.681H61.014 c-11.106,0-21.107-6.603-25.464-16.834c-4.359-10.226-2.189-22.012,5.509-30.026l184.584-191.964L40.743,46.521 c-7.492-8.068-9.496-19.798-5.101-29.899C40.042,6.525,50.005,0,61.014,0h362.188c15.255,0,27.68,12.413,27.68,27.68v69.363 c0,15.259-12.419,27.677-27.68,27.677C407.94,124.72,395.527,112.308,395.527,97.043z" />
    </G>
  </Svg>
);

const Spark = ({ size, ...props }: { size?: number } & SvgProps) => (
  <Svg
    width={size || "512px"}
    height={size || "512px"}
    viewBox="16 128 384 384"
    fill="#9f9f9f"
    {...props}
  >
    <Path d="M208,512a24.84,24.84,0,0,1-23.34-16l-39.84-103.6a16.06,16.06,0,0,0-9.19-9.19L32,343.34a25,25,0,0,1,0-46.68l103.6-39.84a16.06,16.06,0,0,0,9.19-9.19L184.66,144a25,25,0,0,1,46.68,0l39.84,103.6a16.06,16.06,0,0,0,9.19,9.19l103,39.63A25.49,25.49,0,0,1,400,320.52a24.82,24.82,0,0,1-16,22.82l-103.6,39.84a16.06,16.06,0,0,0-9.19,9.19L231.34,496A24.84,24.84,0,0,1,208,512Zm66.85-254.84h0Z" />
  </Svg>
);

const Order = ({ size, ...props }: { size?: number } & SvgProps) => (
  <Svg
    width={size || "800px"}
    height={size || "800px"}
    viewBox="0 0 18 18"
    id="meteor-icon-kit__solid-bars"
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 9C0 8.1716 0.67157 7.5 1.5 7.5H16.5C17.3284 7.5 18 8.1716 18 9C18 9.8284 17.3284 10.5 16.5 10.5H1.5C0.67157 10.5 0 9.8284 0 9zM0 2C0 1.17157 0.67157 0.5 1.5 0.5H16.5C17.3284 0.5 18 1.17157 18 2C18 2.82843 17.3284 3.5 16.5 3.5H1.5C0.67157 3.5 0 2.82843 0 2zM0 16C0 15.1716 0.67157 14.5 1.5 14.5H16.5C17.3284 14.5 18 15.1716 18 16C18 16.8284 17.3284 17.5 16.5 17.5H1.5C0.67157 17.5 0 16.8284 0 16z"
      fill="#9f9f9f"
    />
  </Svg>
);
const DownArrow = ({ size, ...props }: { size?: number } & SvgProps) => (
  <Svg
    fill="#9f9f9f"
    width={size || "800px"}
    height={size || "800px"}
    viewBox="-1 0 19 19"
    className="cf-icon-svg"
    {...props}
  >
    <Path d="M8.5 15.313a1.026 1.026 0 0 1-.728-.302l-6.8-6.8a1.03 1.03 0 0 1 1.455-1.456L8.5 12.828l6.073-6.073a1.03 1.03 0 0 1 1.455 1.456l-6.8 6.8a1.026 1.026 0 0 1-.728.302z" />
  </Svg>
);

const Sandclock = ({ size, ...props }: { size?: number } & SvgProps) => (
  <Svg
    width={size || "473.068px"}
    height={size || "473.068px"}
    viewBox="0 0 473.068 473.068"
    fill="#9f9f9f"
    {...props}
  >
    <G>
      <G id="Layer_2_32_">
        <G>
          <Path d="M355.498,181.955c8.8-6.139,29.396-20.519,29.396-55.351v-71.77h9.819c4.492,0,8.171-3.679,8.171-8.169v-38.5 c0-4.49-3.679-8.165-8.171-8.165H78.348c-4.494,0-8.164,3.675-8.164,8.165v38.5c0,4.491,3.67,8.169,8.164,8.169h9.822v73.071 c0,34.499,10.506,42.576,29.068,53.89l80.75,49.203v20.984c-20.336,12.23-73.464,44.242-80.429,49.107 c-8.792,6.135-29.388,20.51-29.388,55.352v61.793h-9.822c-4.494,0-8.164,3.676-8.164,8.166v38.498c0,4.49,3.67,8.17,8.164,8.17 h316.365c4.492,0,8.171-3.68,8.171-8.17V426.4c0-4.49-3.679-8.166-8.171-8.166h-9.819v-63.104 c0-34.493-10.506-42.572-29.073-53.885l-80.741-49.202v-20.987C295.41,218.831,348.541,186.822,355.498,181.955z  M252.725,272.859l87.797,53.5c6.749,4.109,10.342,6.373,12.001,9.002c1.996,3.164,2.962,9.627,2.962,19.768v63.104H117.571 v-61.793c0-19.507,9.719-26.289,16.816-31.242c5.545-3.865,54.391-33.389,85.873-52.289c4.422-2.658,7.13-7.441,7.13-12.611 v-37.563c0-5.123-2.667-9.883-7.053-12.55l-87.806-53.504c-6.736-4.105-10.328-6.369-11.991-9.009 c-2-3.156-2.971-9.626-2.971-19.767V54.835h237.915v71.77c0,19.5-9.719,26.288-16.812,31.235 c-5.545,3.872-54.387,33.395-85.873,52.295c-4.426,2.658-7.135,7.442-7.135,12.601v37.563 C245.666,265.431,248.345,270.188,252.725,272.859z" />
          <Path d="M131.553,359.607c-2,1.494-3.099,2.502-3.099,6.07c0,3.574,0,38.018,0,38.018s-0.394,3.707,3.781,3.707 c2.026,0,52.428,0.055,103.912,0.111c51.482-0.057,101.888-0.111,103.907-0.111c4.171,0,3.777-3.707,3.777-3.707 s0-34.442,0-38.018c0-3.568-1.102-4.576-3.094-6.07c-14.13-10.562-76.944-60.125-104.591-60.125 C208.491,299.48,145.674,349.046,131.553,359.607z" />
        </G>
      </G>
    </G>
  </Svg>
);

const Beach = (props: { size?: number } & SvgProps) => (
  <Svg
    width={props.size || "800px"}
    height={props.size || "800px"}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      fill="#9f9f9f"
      d="M10 5.196c1.5-2.598 5.098-2.83 7.696-1.33s4.196 4.732 2.696 7.33l-3.464-2-1.732-1-1.732-1-3.464-2z"
    />
    <Path
      stroke="#9f9f9f"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.696 3.866C15.098 2.366 11.5 2.598 10 5.196l3.464 2m4.232-3.33c2.598 1.5 4.196 4.732 2.696 7.33l-5.196-3m2.5-4.33.5-.866m-.5.866c-1.821.488-2.982 1.165-4.232 3.33m4.232-3.33c.488 1.821.482 3.165-.768 5.33m-1.732-1-1.732-1m1.732 1-3 5.196M3 21l.88-1.056a2.001 2.001 0 0 1 3.139.08v0a2.001 2.001 0 0 0 3.107.118l.19-.218a2.236 2.236 0 0 1 3.367 0l.191.218c.838.957 2.344.9 3.107-.117v0a2.001 2.001 0 0 1 3.14-.08L21 21M6.708 16A7.97 7.97 0 0 1 12 14a7.97 7.97 0 0 1 5.292 2"
    />
  </Svg>
);

export {
  Fire,
  Fire_2,
  ArrowRight,
  FullArrowRight,
  DownArrow,
  Sun,
  Moon,
  Home,
  Decks,
  Plus,
  MagnifyingGlass,
  BackIcon,
  TrashCan,
  Dots,
  Pencil,
  Add,
  Export,
  Archive,
  Settings,
  Padlock,
  Quaver,
  Bell,
  Clock,
  Theme,
  Wave,
  Swap,
  Sum,
  Spark,
  Order,
  Sandclock,
  Beach,
};
