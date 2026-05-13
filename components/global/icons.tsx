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

export {
  Fire,
  Fire_2,
  ArrowRight,
  Sun,
  Moon,
  FullArrowRight,
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
};
