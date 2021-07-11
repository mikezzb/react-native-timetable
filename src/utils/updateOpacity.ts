const addOpacity = (rgbString: string, opacity: number) =>
  rgbString.replace(/[^,]+(?=\))/, opacity.toString());
export default addOpacity;
