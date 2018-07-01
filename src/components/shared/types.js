import type { ImageStylePropTypes } from 'react-native/Libraries/Image/ImageStylePropTypes';
import type { ImageSourcePropType } from 'react-native/Libraries/Image/ImageSourcePropType';
import type { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import type { EdgeInsetsPropType } from 'react-native/Libraries/StyleSheet/EdgeInsetsPropType';
import type { Element } from 'react';

type StyleId = number;

export type ImageProps = {
  /**
   * > `ImageResizeMode` is an `Enum` for different image resizing modes, set via the
   * > `resizeMode` style property on `Image` components. The values are `contain`, `cover`,
   * > `stretch`, `center`, `repeat`.
   */
  style?: StyleProp<ImageStylePropTypes, StyleId>,
  /**
   * The image source (either a remote URL or a local file resource).
   *
   * This prop can also contain several remote URLs, specified together with
   * their width and height and potentially with scale/other URI arguments.
   * The native side will then choose the best `uri` to display based on the
   * measured size of the image container. A `cache` property can be added to
   * control how networked request interacts with the local cache.
   *
   * The currently supported formats are `png`, `jpg`, `jpeg`, `bmp`, `gif`,
   * `webp` (Android only), `psd` (iOS only).
   */
  source?: ImageSourcePropType,
  /**
   * A static image to display while loading the image source.
   *
   * - `uri` - a string representing the resource identifier for the image, which
   * should be either a local file path or the name of a static image resource
   * (which should be wrapped in the `require('./path/to/image.png')` function).
   * - `width`, `height` - can be specified if known at build time, in which case
   * these will be used to set the default `<Image/>` component dimensions.
   * - `scale` - used to indicate the scale factor of the image. Defaults to 1.0 if
   * unspecified, meaning that one image pixel equates to one display point / DIP.
   * - `number` - Opaque type returned by something like `require('./image.jpg')`.
   *
   * @platform ios
   */
  defaultSource?: ImageSourcePropType,
  /**
   * When true, indicates the image is an accessibility element.
   * @platform ios
   */
  accessible?: boolean,
  /**
   * The text that's read by the screen reader when the user interacts with
   * the image.
   * @platform ios
   */
  accessibilityLabel?: string,
  /**
   * blurRadius: the blur radius of the blur filter added to the image
   */
  blurRadius?: number,
  /**
   * When the image is resized, the corners of the size specified
   * by `capInsets` will stay a fixed size, but the center content and borders
   * of the image will be stretched.  This is useful for creating resizable
   * rounded buttons, shadows, and other resizable assets.  More info in the
   * [official Apple documentation](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIImage_Class/index.html#//apple_ref/occ/instm/UIImage/resizableImageWithCapInsets).
   *
   * @platform ios
   */
  capInsets?: EdgeInsetsPropType,
  /**
   * The mechanism that should be used to resize the image when the image's dimensions
   * differ from the image view's dimensions. Defaults to `auto`.
   *
   * - `auto`: Use heuristics to pick between `resize` and `scale`.
   *
   * - `resize`: A software operation which changes the encoded image in memory before it
   * gets decoded. This should be used instead of `scale` when the image is much larger
   * than the view.
   *
   * - `scale`: The image gets drawn downscaled or upscaled. Compared to `resize`, `scale` is
   * faster (usually hardware accelerated) and produces higher quality images. This
   * should be used if the image is smaller than the view. It should also be used if the
   * image is slightly bigger than the view.
   *
   * More details about `resize` and `scale` can be found at http://frescolib.org/docs/resizing-rotating.html.
   *
   * @platform android
   */
  resizeMethod?: 'auto' | 'resize' | 'scale',
  /**
   * Determines how to resize the image when the frame doesn't match the raw
   * image dimensions.
   *
   * - `cover`: Scale the image uniformly (maintain the image's aspect ratio)
   * so that both dimensions (width and height) of the image will be equal
   * to or larger than the corresponding dimension of the view (minus padding).
   *
   * - `contain`: Scale the image uniformly (maintain the image's aspect ratio)
   * so that both dimensions (width and height) of the image will be equal to
   * or less than the corresponding dimension of the view (minus padding).
   *
   * - `stretch`: Scale width and height independently, This may change the
   * aspect ratio of the src.
   *
   * - `repeat`: Repeat the image to cover the frame of the view. The
   * image will keep it's size and aspect ratio. (iOS only)
   */
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center',
  /**
   * A unique identifier for this element to be used in UI Automation
   * testing scripts.
   */
  testID?: string,
  /**
   * Invoked on mount and layout changes with
   * `{nativeEvent: {layout: {x, y, width, height}}}`.
   */
  onLayout?: Function,
  /**
   * Invoked on load start.
   *
   * e.g., `onLoadStart={(e) => this.setState({loading: true})}`
   */
  onLoadStart?: Function,
  /**
   * Invoked on download progress with `{nativeEvent: {loaded, total}}`.
   * @platform ios
   */
  onProgress?: Function,
  /**
   * Invoked on load error with `{nativeEvent: {error}}`.
   */
  onError?: Function,
  /**
   * Invoked when a partial load of the image is complete. The definition of
   * what constitutes a "partial load" is loader specific though this is meant
   * for progressive JPEG loads.
   * @platform ios
   */
  onPartialLoad?: Function,
  /**
   * Invoked when load completes successfully.
   */
  onLoad?: Function,
  /**
   * Invoked when load either succeeds or fails.
   */
  onLoadEnd?: Function,
  children?: Element<*>,
};
