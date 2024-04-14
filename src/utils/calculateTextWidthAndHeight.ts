type TextWidthHeight = {
  textContent: string;
  font: string;
  lineHeight?: number;
  translationKey?: string;
  replacements?: { [x: string]: number | string } | (number | string)[];
};

type TextWidthFunc = {
  ({ textContent, font, lineHeight }: TextWidthHeight): {
    width: number;
  };
  canvas: HTMLCanvasElement;
};

// From https://stackoverflow.com/a/21015393
export const calculateTextWidth = ({ textContent, font }: TextWidthHeight) => {
  // if given, use cached canvas for better performance
  // else, create new canvas
  const canvas: HTMLCanvasElement =
    (calculateTextWidth as TextWidthFunc).canvas ??
    ((calculateTextWidth as TextWidthFunc).canvas =
      document.createElement("canvas"));
  const context = canvas.getContext("2d");

  if (context) {
    context.font = font;
  }

  const metrics = context?.measureText(textContent);

  const fontWidth = metrics?.width;

  // From https://stackoverflow.com/a/69904175
  // fallback to using fontSize if fontBoundingBoxAscent isn't available.
  // Should be close enough that you aren't more than a pixel off in most cases.
  // const fontHeight =
  //   (metrics?.fontBoundingBoxAscent && metrics?.fontBoundingBoxDescent
  //     ? metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
  //     : font.fontSize) * lineHeight;

  return {
    width: fontWidth ?? 0,
    //   height: fontHeight ?? 0,
  };
};

export default calculateTextWidth;
