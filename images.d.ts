type ImageSourcePropType = import('react-native').ImageSourcePropType;

declare module '*.png' {
  const value: ImageSourcePropType;
  export default value;
}
declare module '*.jpg' {
  const value: ImageSourcePropType;
  export default value;
}
declare module '*.jpeg' {
  const value: ImageSourcePropType;
  export default value;
}
declare module '*.gif' {
  const value: ImageSourcePropType;
  export default value;
}
declare module '*.webp' {
  const value: ImageSourcePropType;
  export default value;
}
