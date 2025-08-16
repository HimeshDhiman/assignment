
export type AnimationVariant = "circle-blur" | "fade" | "scale";
export type AnimationStart = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface Animation {
  css: string;
  name: string;
}

export function createAnimation(
  variant: AnimationVariant,
  start: AnimationStart,
  url?: string
): Animation {
  let css = "";
  let name = `${variant}-${start}`;

  switch (variant) {
    case "circle-blur":
      css = `
        @keyframes ${name} {
          from {
            clip-path: circle(0% at ${start.replace("-", " ")});
          }
          to {
            clip-path: circle(150% at ${start.replace("-", " ")});
          }
        }
      `;
      break;
    case "fade":
      css = `
        @keyframes ${name} {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      break;
    case "scale":
      css = `
        @keyframes ${name} {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `;
      break;
  }

  return { css, name };
}
